/**
 * Professional Fly-In Animation System
 * 
 * A reusable animation system that adds smooth fly-in effects to elements
 * as they enter the viewport. Uses Intersection Observer for performance.
 * 
 * Usage:
 * Add data-animate="direction" to any element where direction can be:
 * - "fade" (default)
 * - "up"
 * - "down"
 * - "left"
 * - "right"
 * 
 * Optional attributes:
 * - data-animate-delay="200" - delay in milliseconds before animation starts
 * - data-animate-duration="600" - animation duration in milliseconds
 * - data-animate-offset="100" - offset from viewport edge to trigger animation (in pixels)
 */

(function() {
    'use strict';

    // Default configuration
    const defaults = {
        threshold: 0.05, // Trigger when 5% of element is visible (earlier trigger)
        rootMargin: '150px', // Start animation 150px before element enters viewport
        animationDuration: 600,
        animationDelay: 0,
        offset: 150 // Distance from viewport edge to trigger
    };

    // Animation class names
    const ANIMATION_CLASSES = {
        fade: 'animate-fade-in',
        up: 'animate-fly-up',
        down: 'animate-fly-down',
        left: 'animate-fly-left',
        right: 'animate-fly-right'
    };

    /**
     * Initialize animations for all elements with data-animate attribute
     */
    function initAnimations() {
        // Get all elements with data-animate attribute immediately
        // This prevents any flash by hiding elements synchronously
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if (animatedElements.length === 0) {
            return;
        }

        // Immediately ensure all elements are hidden (prevent FOUC)
        animatedElements.forEach(element => {
            element.classList.add('animate-hidden');
            // Force reflow to ensure styles are applied
            void element.offsetHeight;
        });

        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately after a brief delay
            setTimeout(() => {
                animatedElements.forEach(el => {
                    el.classList.add('animate-visible');
                    el.classList.remove('animate-hidden');
                });
            }, 100);
            return;
        }

        // Create Intersection Observer with improved settings
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const direction = element.getAttribute('data-animate') || 'fade';
                    const delay = parseInt(element.getAttribute('data-animate-delay')) || defaults.animationDelay;
                    const duration = parseInt(element.getAttribute('data-animate-duration')) || defaults.animationDuration;
                    const customOffset = parseInt(element.getAttribute('data-animate-offset'));

                    // Set custom duration if specified
                    if (duration !== defaults.animationDuration) {
                        element.style.setProperty('--animation-duration', `${duration}ms`);
                    }

                    // Add delay if specified
                    if (delay > 0) {
                        element.style.setProperty('--animation-delay', `${delay}ms`);
                    }

                    // Apply animation class
                    const animationClass = ANIMATION_CLASSES[direction] || ANIMATION_CLASSES.fade;
                    element.classList.add(animationClass);

                    // Mark as visible (this will override the hidden state)
                    element.classList.add('animate-visible');
                    element.classList.remove('animate-hidden');

                    // Stop observing this element
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: defaults.threshold,
            rootMargin: defaults.rootMargin
        });

        // Observe all animated elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Initialize animations for child elements (e.g., cards in a grid)
     * Useful for staggered animations
     */
    function initStaggeredAnimations(containerSelector, childSelector, direction = 'up', staggerDelay = 100) {
        const containers = document.querySelectorAll(containerSelector);
        
        containers.forEach(container => {
            const children = container.querySelectorAll(childSelector);
            
            children.forEach((child, index) => {
                // Add animation attributes
                child.setAttribute('data-animate', direction);
                child.setAttribute('data-animate-delay', index * staggerDelay);
            });
        });
    }

    // Initialize immediately to prevent FOUC
    // Use requestAnimationFrame to ensure DOM is ready but run as early as possible
    if (document.readyState === 'loading') {
        // Run synchronously on first available frame to hide elements ASAP
        requestAnimationFrame(() => {
            requestAnimationFrame(initAnimations);
        });
        // Also run on DOMContentLoaded as backup
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        // DOM already loaded, run immediately
        requestAnimationFrame(initAnimations);
    }

    // Expose public API for programmatic use
    window.FlyInAnimations = {
        init: initAnimations,
        initStaggered: initStaggeredAnimations
    };
})();

