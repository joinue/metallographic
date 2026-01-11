import { createClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const jobId = formData.get('jobId') as string
    const resume = formData.get('resume') as File | null
    const coverLetter = formData.get('coverLetter') as File | null

    // Validate required fields
    if (!name || !email || !phone || !jobId || !resume) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get client info for tracking
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || null
    const userAgent = request.headers.get('user-agent') || null

    const supabase = await createClient()
    const adminClient = createAdminClient()

    // Handle "other" job option
    let job: { title: string; location: string } | null = null
    if (jobId === 'other') {
      job = { title: 'Other Position', location: 'Tucson, AZ' }
    } else {
      // Verify job exists and is active
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('title, location')
        .eq('id', jobId)
        .eq('status', 'active')
        .single()

      if (jobError || !jobData) {
        return NextResponse.json(
          { error: 'Invalid or inactive job posting' },
          { status: 400 }
        )
      }
      job = jobData
    }

    // Upload files to Supabase storage
    let resumeUrl: string | null = null
    let coverLetterUrl: string | null = null

    const timestamp = Date.now()
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()

    // Upload resume
    if (resume) {
      const resumeFileName = `applications/${timestamp}_${sanitizedName}_resume.${resume.name.split('.').pop()}`
      const resumeArrayBuffer = await resume.arrayBuffer()
      
      const { data: resumeData, error: resumeError } = await adminClient.storage
        .from('job-applications')
        .upload(resumeFileName, resumeArrayBuffer, {
          contentType: resume.type,
          upsert: false,
        })

      if (resumeError) {
        console.error('Error uploading resume:', resumeError)
        return NextResponse.json(
          { error: 'Failed to upload resume' },
          { status: 500 }
        )
      }

      // Store the file path - we'll generate signed URLs when needed
      // For now, store the full path that can be used with admin client
      resumeUrl = resumeFileName
    }

    // Upload cover letter if provided
    if (coverLetter) {
      const coverLetterFileName = `applications/${timestamp}_${sanitizedName}_cover.${coverLetter.name.split('.').pop()}`
      const coverLetterArrayBuffer = await coverLetter.arrayBuffer()
      
      const { data: coverLetterData, error: coverLetterError } = await adminClient.storage
        .from('job-applications')
        .upload(coverLetterFileName, coverLetterArrayBuffer, {
          contentType: coverLetter.type,
          upsert: false,
        })

      if (coverLetterError) {
        console.error('Error uploading cover letter:', coverLetterError)
        // Don't fail the whole submission if cover letter upload fails
      } else {
        // Store the file path - we'll generate signed URLs when needed
        coverLetterUrl = coverLetterFileName
      }
    }

    // Create application record
    // For "other" job option, we need to handle it differently since job_id is required
    // We'll create a placeholder or use a special UUID
    let finalJobId = jobId
    if (jobId === 'other') {
      // Find or create a placeholder job for "other" applications
      // For now, we'll use a special approach - you might want to create a special "Other" job
      // Or handle this differently based on your needs
      const { data: otherJob } = await supabase
        .from('jobs')
        .select('id')
        .eq('title', 'Other Position')
        .eq('location', 'Tucson, AZ')
        .maybeSingle()
      
      if (otherJob) {
        finalJobId = otherJob.id
      } else {
        // Create a placeholder job for "other" applications
        const { data: newJob, error: jobCreateError } = await supabase
          .from('jobs')
          .insert({
            title: 'Other Position',
            location: 'Tucson, AZ',
            job_type: 'full-time',
            status: 'closed', // Don't show on public page
            summary: 'Placeholder for applications to other positions',
          })
          .select()
          .single()
        
        if (jobCreateError || !newJob) {
          return NextResponse.json(
            { error: 'Failed to process application' },
            { status: 500 }
          )
        }
        finalJobId = newJob.id
      }
    }

    const { data: application, error: applicationError } = await supabase
      .from('job_applications')
      .insert({
        job_id: finalJobId,
        name,
        email: email.toLowerCase().trim(),
        phone,
        resume_url: resumeUrl,
        cover_letter_url: coverLetterUrl,
        status: 'new',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select()
      .single()

    if (applicationError) {
      console.error('Error creating application:', applicationError)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    // Send email notification
    // You can integrate with your email service here (Resend, SendGrid, etc.)
    // For now, we'll log it - you can add email sending later
    try {
      await sendApplicationEmail({
        applicationId: application.id,
        name,
        email,
        phone,
        jobTitle: job.title,
        jobLocation: job.location,
        resumeUrl,
        coverLetterUrl,
      })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // Don't fail the submission if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    })
  } catch (error: any) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Email notification function
// Replace this with your actual email service integration
async function sendApplicationEmail(data: {
  applicationId: string
  name: string
  email: string
  phone: string
  jobTitle: string
  jobLocation: string
  resumeUrl: string | null
  coverLetterUrl: string | null
}) {
  // TODO: Integrate with your email service (Resend, SendGrid, etc.)
  // Example with Resend:
  /*
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: 'careers@materialographic.com',
    to: 'hr@metallographic.com', // or your HR email
    subject: `New Job Application: ${data.jobTitle}`,
    html: `
      <h2>New Job Application</h2>
      <p><strong>Position:</strong> ${data.jobTitle} – ${data.jobLocation}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      ${data.resumeUrl ? `<p><a href="${data.resumeUrl}">View Resume</a></p>` : ''}
      ${data.coverLetterUrl ? `<p><a href="${data.coverLetterUrl}">View Cover Letter</a></p>` : ''}
      <p><strong>Application ID:</strong> ${data.applicationId}</p>
    `,
  })
  */

  // For now, just log it
  console.log('Application email notification:', {
    to: 'hr@metallographic.com', // Replace with your HR email
    subject: `New Job Application: ${data.jobTitle}`,
    data,
  })
  
  // You can also use a mailto link as a fallback:
  const mailtoBody = `New Job Application

Position: ${data.jobTitle} – ${data.jobLocation}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Application ID: ${data.applicationId}
${data.resumeUrl ? `Resume: ${data.resumeUrl}` : ''}
${data.coverLetterUrl ? `Cover Letter: ${data.coverLetterUrl}` : ''}`
  
  // Log the mailto link (you could also trigger a mailto: URL)
  console.log('Mailto link:', `mailto:hr@metallographic.com?subject=New Job Application: ${encodeURIComponent(data.jobTitle)}&body=${encodeURIComponent(mailtoBody)}`)
}

