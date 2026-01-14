document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels on the page
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        // Check if this is an equipment page carousel
        const isEquipmentCarousel = carousel.querySelector('.carousel-content') !== null;
        
        if (isEquipmentCarousel) {
            // Equipment page carousel initialization
            const content = carousel.querySelector('.carousel-content');
            const items = Array.from(content.children);
            const prevButton = carousel.querySelector('.carousel-prev');
            const nextButton = carousel.querySelector('.carousel-next');
            const description = carousel.querySelector('.carousel-description p');
            
            if (!content || !items.length || !prevButton || !nextButton) return;
            
            let currentIndex = 0;
            
            // Hide buttons if there's only one item
            if (items.length <= 1) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
                return; // Exit early if only one item
            }
            
            // Update carousel display
            function updateCarousel() {
                items.forEach((item, index) => {
                    item.style.display = index === currentIndex ? 'block' : 'none';
                });
                
                // Update description if available
                if (description) {
                    const currentItem = items[currentIndex];
                    description.textContent = currentItem.dataset.description || '';
                }
                
                // Update button states
                prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
                nextButton.style.opacity = currentIndex === items.length - 1 ? '0.5' : '1';
                prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
                nextButton.style.pointerEvents = currentIndex === items.length - 1 ? 'none' : 'auto';
            }
            
            // Event listeners for equipment carousel
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
            
            nextButton.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
            
            // Initialize first display
            updateCarousel();
            
        } else {
            // Homepage carousel initialization
            const track = carousel.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const nextButton = carousel.querySelector('.carousel-next');
            const prevButton = carousel.querySelector('.carousel-prev');
            
            if (!track || !slides.length || !nextButton || !prevButton) return;

            // Hide buttons if there's only one slide
            if (slides.length <= 1) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
                return; // Exit early if only one slide
            }

            // Cache slide width to avoid forced reflow
            let slideWidth = 0;
            const updateSlideWidth = () => {
                slideWidth = slides[0].getBoundingClientRect().width;
            };
            updateSlideWidth();
            let currentIndex = 0;
            
            // Set different slidesToShow based on screen width for homepage carousel
            function getSlidesToShow() {
                return window.innerWidth >= 768 ? 3 : 1;
            }

            let slidesToShow = getSlidesToShow();
            const totalSlides = slides.length;

            // Arrange slides next to each other
            function setSlidePosition(slide, index) {
                slide.style.left = slideWidth * index + 'px';
            }
            slides.forEach(setSlidePosition);

            // Update visibility of navigation buttons
            function updateNavigationButtons() {
                prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
                prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
                
                const lastVisibleSlide = totalSlides - slidesToShow;
                nextButton.style.opacity = currentIndex >= lastVisibleSlide ? '0.5' : '1';
                nextButton.style.pointerEvents = currentIndex >= lastVisibleSlide ? 'none' : 'auto';
            }

            // Move to slide
            function moveToSlide(targetIndex) {
                const lastVisibleSlide = totalSlides - slidesToShow;
                if (targetIndex < 0 || targetIndex > lastVisibleSlide) return;
                
                currentIndex = targetIndex;
                const moveAmount = -slideWidth * currentIndex;
                track.style.transform = `translateX(${moveAmount}px)`;
                updateNavigationButtons();
            }

            // Event listeners for homepage carousel
            nextButton.addEventListener('click', () => {
                moveToSlide(currentIndex + 1);
            });

            prevButton.addEventListener('click', () => {
                moveToSlide(currentIndex - 1);
            });

            // Initialize button states
            updateNavigationButtons();

            // Handle window resize for homepage carousel
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    slidesToShow = getSlidesToShow();
                    currentIndex = 0;
                    updateSlideWidth(); // Update slide width on resize
                    moveToSlide(0);
                    slides.forEach(setSlidePosition);
                }, 250);
            });

            // Add touch support for homepage carousel
            let touchStartX = 0;
            let touchEndX = 0;

            track.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            track.addEventListener('touchmove', (e) => {
                touchEndX = e.touches[0].clientX;
            }, { passive: true });

            track.addEventListener('touchend', () => {
                const difference = touchStartX - touchEndX;
                if (Math.abs(difference) > 50) {
                    if (difference > 0) {
                        moveToSlide(currentIndex + 1);
                    } else {
                        moveToSlide(currentIndex - 1);
                    }
                }
            });

            // Add smooth transitions for homepage carousel
            track.style.transition = 'transform 0.3s ease-in-out';
        }
    });
});
