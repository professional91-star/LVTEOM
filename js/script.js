// Tree-like Lightning Effect
function createLightningStrike(x, y) {
    // Create screen flash
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    
    // Create main lightning trunk (like tree trunk)
    const mainTrunk = createLightningBranch(x, y, 0, 150, 8, 0.8, 0);
    document.body.appendChild(mainTrunk);
    
    // Create branching system like tree branches
    setTimeout(() => {
        createTreeBranching(x, y, 3); // 3 levels of branching
    }, 100);
    
    // Remove all elements after animation
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
        // Remove all lightning branches
        const allBranches = document.querySelectorAll('.lightning-branch');
        allBranches.forEach(branch => {
            if (branch.parentNode) {
                branch.parentNode.removeChild(branch);
            }
        });
    }, 2000);
}

// Create tree-like branching system
function createTreeBranching(startX, startY, levels) {
    const branches = [];
    
    // Level 1 - Main branches from trunk
    const mainBranches = [
        { angle: -45, length: 120, thickness: 0.7 },
        { angle: 45, length: 130, thickness: 0.7 },
        { angle: -20, length: 100, thickness: 0.6 },
        { angle: 25, length: 110, thickness: 0.6 }
    ];
    
    mainBranches.forEach((branchData, index) => {
        setTimeout(() => {
            const endX = startX + Math.cos(branchData.angle * Math.PI / 180) * branchData.length;
            const endY = startY + Math.sin(branchData.angle * Math.PI / 180) * branchData.length;
            
            const branch = createLightningBranch(
                startX, startY, 
                branchData.angle, 
                branchData.length, 
                6, 
                branchData.thickness,
                index * 50
            );
            document.body.appendChild(branch);
            branches.push({ x: endX, y: endY, level: 1 });
            
            // Level 2 - Secondary branches
            if (levels > 1) {
                setTimeout(() => {
                    createSecondaryBranches(endX, endY, branchData.angle, 2);
                }, 200 + index * 50);
            }
        }, index * 80);
    });
    
    // Random smaller branches from main trunk
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const randomAngle = (Math.random() - 0.5) * 120;
            const randomLength = 60 + Math.random() * 40;
            const randomY = startY + (Math.random() - 0.5) * 100;
            
            const smallBranch = createLightningBranch(
                startX, randomY,
                randomAngle, 
                randomLength, 
                4, 
                0.4,
                i * 30
            );
            document.body.appendChild(smallBranch);
        }, 300 + i * 60);
    }
}

// Create secondary branches (smaller branches from main branches)
function createSecondaryBranches(startX, startY, parentAngle, level) {
    const numSecondary = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numSecondary; i++) {
        setTimeout(() => {
            const angleVariation = (Math.random() - 0.5) * 80;
            const secondaryAngle = parentAngle + angleVariation;
            const secondaryLength = 40 + Math.random() * 30;
            
            const secondaryBranch = createLightningBranch(
                startX, startY,
                secondaryAngle,
                secondaryLength,
                3,
                0.3,
                i * 40
            );
            document.body.appendChild(secondaryBranch);
            
            // Level 3 - Tiny twigs
            if (level > 1) {
                setTimeout(() => {
                    const endX = startX + Math.cos(secondaryAngle * Math.PI / 180) * secondaryLength;
                    const endY = startY + Math.sin(secondaryAngle * Math.PI / 180) * secondaryLength;
                    createTinyTwigs(endX, endY, secondaryAngle);
                }, 150);
            }
        }, i * 60);
    }
}

// Create tiny twigs at the end of branches
function createTinyTwigs(startX, startY, parentAngle) {
    const numTwigs = 1 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numTwigs; i++) {
        setTimeout(() => {
            const twigAngle = parentAngle + (Math.random() - 0.5) * 100;
            const twigLength = 15 + Math.random() * 20;
            
            const twig = createLightningBranch(
                startX, startY,
                twigAngle,
                twigLength,
                2,
                0.2,
                i * 20
            );
            document.body.appendChild(twig);
        }, i * 30);
    }
}

// Create individual lightning branch with tree-like appearance
function createLightningBranch(startX, startY, angle, length, segments, thickness, delay) {
    const branch = document.createElement('div');
    branch.className = 'lightning-branch';
    branch.style.position = 'fixed';
    branch.style.left = startX + 'px';
    branch.style.top = startY + 'px';
    branch.style.transform = 'translate(-50%, -50%)';
    branch.style.pointerEvents = 'none';
    branch.style.zIndex = '9999';
    branch.style.animationDelay = delay + 'ms';
    
    let currentX = 0;
    let currentY = 0;
    const segmentLength = length / segments;
    
    for (let i = 0; i < segments; i++) {
        const segment = document.createElement('div');
        segment.className = 'lightning-segment';
        
        // Add natural branching deviation
        const deviation = (Math.random() - 0.5) * 20;
        const segmentAngle = angle + deviation;
        
        const segmentX = Math.cos(segmentAngle * Math.PI / 180) * segmentLength;
        const segmentY = Math.sin(segmentAngle * Math.PI / 180) * segmentLength;
        
        const nextX = currentX + segmentX;
        const nextY = currentY + segmentY;
        
        // Calculate segment properties
        const segmentActualLength = Math.sqrt(segmentX * segmentX + segmentY * segmentY);
        const segmentThickness = Math.max(1, thickness * (4 - i * 0.3)); // Taper like tree branch
        
        segment.style.position = 'absolute';
        segment.style.width = segmentThickness + 'px';
        segment.style.height = segmentActualLength + 'px';
        segment.style.left = (currentX + segmentX/2) + 'px';
        segment.style.top = (currentY + segmentY/2) + 'px';
        segment.style.transform = `rotate(${Math.atan2(segmentY, segmentX) * 180 / Math.PI + 90}deg)`;
        segment.style.transformOrigin = 'center bottom';
        
        // Branch-like coloring - brighter at trunk, dimmer at tips
        const intensity = 1 - (i / segments) * 0.4;
        segment.style.background = `linear-gradient(to top, 
            rgba(255, 255, 255, ${0.9 * intensity}) 0%,
            rgba(96, 165, 250, ${0.8 * intensity}) 30%,
            rgba(59, 130, 246, ${0.6 * intensity}) 70%,
            rgba(37, 99, 235, ${0.4 * intensity}) 100%
        )`;
        
        segment.style.boxShadow = `
            0 0 ${3 * thickness}px rgba(96, 165, 250, ${0.8 * intensity}),
            0 0 ${6 * thickness}px rgba(59, 130, 246, ${0.6 * intensity}),
            0 0 ${10 * thickness}px rgba(37, 99, 235, ${0.3 * intensity})
        `;
        
        segment.style.filter = `blur(${0.3 * thickness}px)`;
        segment.style.animation = `tree-lightning-flicker ${0.2 + Math.random() * 0.3}s ease-in-out ${(delay + i * 30)}ms`;
        
        branch.appendChild(segment);
        
        currentX = nextX;
        currentY = nextY;
    }
    
    return branch;
}

// Add click event listeners for lightning animation
document.addEventListener('click', function(e) {
    createLightningStrike(e.clientX, e.clientY);
});

// Add touch event for mobile devices
document.addEventListener('touchend', function(e) {
    if (e.changedTouches && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        createLightningStrike(touch.clientX, touch.clientY);
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change hamburger icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .tech-item, .about-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    
    if (sliderTrack && slides.length > 0) {
        let isPaused = false;
        
        // Hover pause functionality
        sliderTrack.addEventListener('mouseenter', () => {
            isPaused = true;
            sliderTrack.style.animationPlayState = 'paused';
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            isPaused = false;
            sliderTrack.style.animationPlayState = 'running';
        });
        
        // Individual slide hover effects
        slides.forEach((slide, index) => {
            slide.addEventListener('mouseenter', () => {
                slide.style.transform = 'scale(1.05)';
                slide.style.zIndex = '10';
                
                // Add glow effect
                slide.style.boxShadow = '0 15px 40px rgba(37, 99, 235, 0.6)';
            });
            
            slide.addEventListener('mouseleave', () => {
                slide.style.transform = 'scale(1)';
                slide.style.zIndex = '1';
                slide.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
            });
        });
        
        // Touch events for mobile
        let startX = 0;
        let currentX = 0;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            sliderTrack.style.animationPlayState = 'paused';
        });
        
        sliderTrack.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            
            // Optional: Add drag effect here
        });
        
        sliderTrack.addEventListener('touchend', () => {
            sliderTrack.style.animationPlayState = 'running';
        });
    }
});

// Contact form handling with EmailJS
const contactForm = document.querySelector('.contact-form');

// EmailJS configuration
emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS public key'inizi buraya ekleyin

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_name: 'LVT Elektrik Otomasyon',
        reply_to: formData.get('email')
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            
            // Fallback: Create mailto link
            const mailtoLink = createMailtoLink(templateParams);
            
            if (confirm('Email servisi şu anda kullanılamıyor. Email istemcinizi açmak ister misiniz?')) {
                window.location.href = mailtoLink;
                showNotification('Email istemciniz açıldı. Mesajınızı oradan gönderebilirsiniz.', 'info');
            } else {
                showNotification('Email gönderiminde bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
            }
        })
        .finally(function() {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Create mailto link as fallback
function createMailtoLink(params) {
    const email = 'info@lvt-eom.com'; // Şirket email adresi
    const subject = encodeURIComponent(`Website İletişim: ${params.subject}`);
    const body = encodeURIComponent(`
İsim: ${params.from_name}
Email: ${params.from_email}
Telefon: ${params.phone || 'Belirtilmemiş'}

Konu: ${params.subject}

Mesaj:
${params.message}

---
Bu mesaj ${window.location.hostname} web sitesinden gönderilmiştir.
    `);
    
    return `mailto:${email}?subject=${subject}&body=${body}`;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let iconClass = 'info-circle';
    if (type === 'success') iconClass = 'check-circle';
    else if (type === 'error') iconClass = 'exclamation-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconClass}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    let bgColor = '#007bff';
    if (type === 'success') bgColor = '#28a745';
    else if (type === 'error') bgColor = '#dc3545';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Parallax effect for hero section with enhanced tech movement
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shapes .shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.15);
        const rotation = scrolled * (0.05 + index * 0.02);
        const scale = 1 + Math.sin(scrolled * 0.01) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg) scale(${scale})`;
    });
    
    // Add tech grid animation on scroll
    const techGrid = document.querySelector('body::after');
    if (techGrid) {
        document.body.style.setProperty('--grid-offset', `${scrolled * 0.1}px`);
    }
});

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#2563eb';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Initialize matrix rain on load
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
});

// Tech cursor trail effect
let trail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (trail.length > trailLength) {
        trail.shift();
    }
    
    // Remove old trail elements
    document.querySelectorAll('.cursor-trail').forEach(el => {
        if (Date.now() - el.dataset.time > 1000) {
            el.remove();
        }
    });
    
    // Create new trail element
    const trailElement = document.createElement('div');
    trailElement.className = 'cursor-trail';
    trailElement.dataset.time = Date.now();
    trailElement.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #2563eb;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        box-shadow: 0 0 10px #2563eb;
        animation: trail-fade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trailElement);
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroDescription.style.transition = 'all 0.8s ease';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroButtons.style.transition = 'all 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 600);
    }
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation and tech effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes trail-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    @keyframes tech-pulse {
        0%, 100% {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        50% {
            box-shadow: 0 0 30px rgba(37, 99, 235, 0.6), 0 0 40px rgba(245, 158, 11, 0.3);
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .cursor-trail {
        animation: trail-fade 1s ease-out forwards;
    }
    
    /* Tech loading animation */
    .tech-loading {
        position: relative;
    }
    
    .tech-loading::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.3), transparent);
        animation: tech-scan 2s ease-in-out infinite;
    }
    
    @keyframes tech-scan {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    /* Holographic effect */
    .holographic {
        background: linear-gradient(45deg, transparent 30%, rgba(37, 99, 235, 0.1) 50%, transparent 70%);
        background-size: 20px 20px;
        animation: hologram 3s linear infinite;
    }
    
    @keyframes hologram {
        0% { background-position: 0% 0%; }
        100% { background-position: 100% 100%; }
    }
`;
document.head.appendChild(style);

// Instagram API Integration
class InstagramAPI {
    constructor() {
        // Instagram Basic Display API yapılandırması
        this.accessToken = null;
        this.userId = null;
        this.instagramUsername = 'lvt_eom';
        
        // Demo veriler (gerçek API bağlantısı kurulana kadar)
        this.demoData = {
            profile: {
                username: 'lvt_eom',
                name: 'LVT Elektrik Otomasyon',
                bio: '⚡ Elektrik & Otomasyon Uzmanı\n🔌 SCADA & PLC Çözümleri\n🏭 Endüstriyel Sistemler\n📍 Türkiye',
                followers: 1547,
                following: 234,
                posts: 127,
                profilePicture: 'images/logo.png'
            },
            posts: [
                {
                    id: '1',
                    media_url: 'images/1.png',
                    caption: '🏭 Yeni SCADA projemiz başarıyla tamamlandı! Endüstri 4.0 teknolojileri ile modern otomasyon çözümleri. #scada #otomasyon #endüstri40',
                    like_count: 127,
                    comments_count: 18,
                    timestamp: '2024-10-09T10:30:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-microchip',
                    description: 'SCADA Proje'
                },
                {
                    id: '2',
                    media_url: 'images/2.png',
                    caption: '⚡ Hidroelektrik santral bakım ve modernizasyon çalışmaları devam ediyor. Güvenli enerji üretimi için kaliteli hizmet! #hidroelektrik #enerji #bakım',
                    like_count: 198,
                    comments_count: 24,
                    timestamp: '2024-10-07T14:20:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-bolt',
                    description: 'Hidroelektrik Bakım'
                },
                {
                    id: '3',
                    media_url: 'images/3.jpg',
                    caption: '🔧 PLC programlama ve sistem entegrasyonu çalışmaları. Yüksek teknoloji, güvenilir çözümler. #plc #programlama #otomasyon',
                    like_count: 89,
                    comments_count: 12,
                    timestamp: '2024-10-05T09:15:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-cogs',
                    description: 'PLC Programlama'
                },
                {
                    id: '4',
                    media_url: 'images/4.jpg',
                    caption: '🏗️ Endüstriyel tesis elektrik altyapı çalışmaları. Profesyonel ekip, kaliteli malzemeler, zamanında teslimat! #elektrik #endüstri #altyapı',
                    like_count: 156,
                    comments_count: 31,
                    timestamp: '2024-10-03T16:45:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-industry',
                    description: 'Endüstriyel Elektrik'
                },
                {
                    id: '5',
                    media_url: 'images/5.png',
                    caption: '💻 Yazılım geliştirme ve SCADA entegrasyonu. Modern teknolojiler ile akıllı sistemler. #yazılım #scada #teknoloji',
                    like_count: 78,
                    comments_count: 15,
                    timestamp: '2024-10-01T11:30:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-laptop-code',
                    description: 'Yazılım Geliştirme'
                },
                {
                    id: '6',
                    media_url: 'images/6.jpg',
                    caption: '⚙️ Governor sistemleri imalat ve bakım hizmetleri. Türbin kontrolü için güvenilir çözümler. #governor #türbin #kontrol',
                    like_count: 143,
                    comments_count: 22,
                    timestamp: '2024-09-28T13:20:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-water',
                    description: 'Governor Sistemleri'
                },
                {
                    id: '7',
                    media_url: 'images/8.jpg',
                    caption: '🔌 Elektrik pano montajı ve kablolama işlemleri. Profesyonel kurulum ve güvenlik standartları. #elektrikpano #montaj #güvenlik',
                    like_count: 92,
                    comments_count: 14,
                    timestamp: '2024-09-25T09:45:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-plug',
                    description: 'Elektrik Pano Montajı'
                },
                {
                    id: '8',
                    media_url: 'images/9.jpg',
                    caption: '🏗️ Saha çalışması ve teknik destek hizmetleri. Uzman ekibimizle 7/24 müşteri desteği. #sahaçalışması #teknikdestek #hizmet',
                    like_count: 167,
                    comments_count: 28,
                    timestamp: '2024-09-22T14:30:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-tools',
                    description: 'Saha Çalışması'
                }
            ]
        };
        
        this.init();
    }
    
    async init() {
        try {
            // Gerçek API bağlantısını kontrol et
            await this.checkAPIConnection();
            
            // Instagram verilerini yükle
            await this.loadInstagramData();
            
        } catch (error) {
            console.log('Instagram API bağlantısı bulunamadı, demo veriler kullanılıyor');
            this.loadDemoData();
        }
    }
    
    async checkAPIConnection() {
        // Instagram Basic Display API bağlantısını kontrol et
        // Bu bölüm gerçek API anahtarı ile güncellenmelidir
        
        /*
        Gerçek API kullanımı için:
        1. Instagram Developer hesabı oluşturun
        2. Uygulama kaydedin
        3. Access token alın
        4. Aşağıdaki kodu güncelleyin:
        
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${this.accessToken}`);
        if (!response.ok) throw new Error('API bağlantısı başarısız');
        */
        
        throw new Error('Demo mode'); // Şimdilik demo modda çalış
    }
    
    async loadInstagramData() {
        try {
            // Profil bilgilerini al
            const profileResponse = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${this.accessToken}`);
            const profileData = await profileResponse.json();
            
            // Son paylaşımları al
            const mediaResponse = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=6&access_token=${this.accessToken}`);
            const mediaData = await mediaResponse.json();
            
            this.updateProfile(profileData);
            this.updatePosts(mediaData.data);
            
        } catch (error) {
            console.error('Instagram verisi yüklenirken hata:', error);
            this.loadDemoData();
        }
    }
    
    loadDemoData() {
        this.updateProfile(this.demoData.profile);
        this.updatePosts(this.demoData.posts);
    }
    
    updateProfile(profileData) {
        const profileImg = document.querySelector('.profile-img');
        const profileName = document.querySelector('.profile-name');
        const profileDescription = document.querySelector('.profile-description');
        
        if (profileImg && profileData.profilePicture) {
            profileImg.src = profileData.profilePicture;
            profileImg.alt = profileData.name || profileData.username;
        }
        
        if (profileName) {
            profileName.textContent = profileData.name || `@${profileData.username}`;
        }
        
        if (profileDescription && profileData.bio) {
            profileDescription.innerHTML = profileData.bio.replace(/\n/g, '<br>');
        }
    }
    
    updatePosts(posts) {
        const feedGrid = document.querySelector('.feed-grid');
        if (!feedGrid) return;
        
        feedGrid.innerHTML = ''; // Mevcut postları temizle
        
        posts.slice(0, 8).forEach((post, index) => {
            const postElement = this.createPostElement(post, index);
            feedGrid.appendChild(postElement);
        });
    }
    
    createPostElement(post, index) {
        const postDiv = document.createElement('div');
        postDiv.className = 'instagram-post';
        postDiv.setAttribute('data-index', index);
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'post-image';
        
        if (post.media_url) {
            const img = document.createElement('img');
            img.src = post.media_url;
            img.alt = post.description || 'Instagram paylaşımı';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.transition = 'transform 0.3s ease';
            imageDiv.appendChild(img);
        } else {
            // Demo icon göster
            const icon = document.createElement('i');
            icon.className = post.icon || 'fas fa-image';
            icon.style.fontSize = '3rem';
            icon.style.color = 'var(--primary-color)';
            imageDiv.appendChild(icon);
        }
        
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'post-overlay';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'post-content';
        
        // Post başlık
        if (post.description) {
            const titleDiv = document.createElement('div');
            titleDiv.className = 'post-title';
            titleDiv.textContent = post.description;
            contentDiv.appendChild(titleDiv);
        }
        
        const statsDiv = document.createElement('div');
        statsDiv.className = 'post-stats';
        
        const likesSpan = document.createElement('span');
        likesSpan.className = 'stat-item';
        likesSpan.innerHTML = `<i class="fas fa-heart"></i> ${post.like_count || Math.floor(Math.random() * 100) + 20}`;
        
        const commentsSpan = document.createElement('span');
        commentsSpan.className = 'stat-item';
        commentsSpan.innerHTML = `<i class="fas fa-comment"></i> ${post.comments_count || Math.floor(Math.random() * 20) + 3}`;
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'post-date';
        const date = new Date(post.timestamp);
        dateSpan.textContent = date.toLocaleDateString('tr-TR');
        
        statsDiv.appendChild(likesSpan);
        statsDiv.appendChild(commentsSpan);
        contentDiv.appendChild(statsDiv);
        contentDiv.appendChild(dateSpan);
        
        overlayDiv.appendChild(contentDiv);
        
        postDiv.appendChild(imageDiv);
        postDiv.appendChild(overlayDiv);
        
        // Hover efektleri
        postDiv.addEventListener('mouseenter', () => {
            const img = postDiv.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
            overlayDiv.style.opacity = '1';
        });
        
        postDiv.addEventListener('mouseleave', () => {
            const img = postDiv.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
            overlayDiv.style.opacity = '0';
        });
        
        // Tıklama olayı ekle
        postDiv.addEventListener('click', () => {
            this.openPostModal(post);
        });
        
        // Giriş animasyonu
        setTimeout(() => {
            postDiv.style.opacity = '1';
            postDiv.style.transform = 'translateY(0)';
        }, index * 100);
        
        return postDiv;
    }
    
    openPostModal(post) {
        // Modal oluştur
        const modal = document.createElement('div');
        modal.className = 'instagram-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-profile">
                        <img src="${this.demoData.profile.profilePicture}" alt="Profile" class="modal-profile-img">
                        <span class="modal-username">@${this.demoData.profile.username}</span>
                    </div>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-image">
                    ${post.media_url ? 
                        `<img src="${post.media_url}" alt="${post.description}">` : 
                        `<div class="modal-icon"><i class="${post.icon}"></i></div>`
                    }
                </div>
                <div class="modal-body">
                    <div class="modal-stats">
                        <span><i class="fas fa-heart"></i> ${post.like_count}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments_count}</span>
                    </div>
                    <p class="modal-caption">${post.caption}</p>
                    <div class="modal-actions">
                        <button class="modal-btn" onclick="window.open('https://instagram.com/lvt_eom', '_blank')">
                            <i class="fab fa-instagram"></i> Instagram'da Gör
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Modal stillerini ekle
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Animasyon
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Kapatma olayları
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // ESC tuşu ile kapatma
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }
    
    // Gerçek zamanlı güncelleme ve live badge
    startAutoRefresh() {
        // Live badge ekle
        this.addLiveBadge();
        
        // 30 saniyede bir güncelle (demo için hızlı)
        setInterval(() => {
            this.showRefreshIndicator();
            setTimeout(() => {
                this.updateRandomStats();
                this.hideRefreshIndicator();
            }, 2000);
        }, 30000);
    }
    
    addLiveBadge() {
        const instagramSection = document.querySelector('#instagram');
        if (instagramSection && !instagramSection.querySelector('.instagram-live-badge')) {
            const liveBadge = document.createElement('div');
            liveBadge.className = 'instagram-live-badge';
            liveBadge.innerHTML = '<i class="fas fa-circle"></i> CANLI';
            instagramSection.style.position = 'relative';
            instagramSection.appendChild(liveBadge);
        }
    }
    
    showRefreshIndicator() {
        const instagramSection = document.querySelector('#instagram');
        let indicator = instagramSection.querySelector('.instagram-refresh');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'instagram-refresh';
            indicator.innerHTML = '<i class="fas fa-sync"></i> Güncelleniyor...';
            instagramSection.appendChild(indicator);
        }
        
        indicator.classList.add('active');
    }
    
    hideRefreshIndicator() {
        const indicator = document.querySelector('.instagram-refresh');
        if (indicator) {
            indicator.classList.remove('active');
        }
    }
    
    updateRandomStats() {
        // Rastgele istatistikleri güncelle (canlı his vermek için)
        const posts = document.querySelectorAll('.instagram-post .stat-item');
        posts.forEach(stat => {
            const heartStat = stat.querySelector('i.fa-heart');
            if (heartStat) {
                const currentLikes = parseInt(stat.textContent.match(/\d+/)[0]);
                const newLikes = currentLikes + Math.floor(Math.random() * 3);
                stat.innerHTML = `<i class="fas fa-heart"></i> ${newLikes}`;
            }
        });
        
        // Takipçi sayısını güncelle
        this.demoData.profile.followers += Math.floor(Math.random() * 5);
        const profileInfo = document.querySelector('.profile-description');
        if (profileInfo) {
            // Subtle güncelleme efekti ekle
            profileInfo.style.opacity = '0.8';
            setTimeout(() => {
                profileInfo.style.opacity = '1';
            }, 500);
        }
    }
}

// Instagram API'yi başlat
document.addEventListener('DOMContentLoaded', () => {
    const instagramAPI = new InstagramAPI();
    
    // Auto-refresh ve live özelliklerini başlat
    setTimeout(() => {
        instagramAPI.startAutoRefresh();
    }, 2000);
    
    // Otomatik yenileme başlat (opsiyonel)
    // instagramAPI.startAutoRefresh();
});

// Instagram OAuth yetkilendirme fonksiyonu
function connectInstagram() {
    const clientId = 'YOUR_INSTAGRAM_APP_ID'; // Instagram App ID'nizi buraya ekleyin
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = 'user_profile,user_media';
    
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    
    window.location.href = authUrl;
}

// URL'den authorization code'u al ve access token'a çevir
async function handleInstagramCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        try {
            // Access token al
            const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: 'YOUR_INSTAGRAM_APP_ID',
                    client_secret: 'YOUR_INSTAGRAM_APP_SECRET',
                    grant_type: 'authorization_code',
                    redirect_uri: window.location.origin,
                    code: code
                })
            });
            
            const tokenData = await tokenResponse.json();
            
            if (tokenData.access_token) {
                localStorage.setItem('instagram_access_token', tokenData.access_token);
                localStorage.setItem('instagram_user_id', tokenData.user_id);
                
                // Sayfayı yenile ve Instagram verilerini yükle
                window.location.href = window.location.pathname;
            }
        } catch (error) {
            console.error('Instagram token alınırken hata:', error);
        }
    }
}

// ================================
// Simple Catalog Functions
// ================================

// Simple catalog button - no complex functions needed
function openCatalog() {
    window.open('catalog/LVT-EOM.pdf', '_blank');
}

// Initialize FlipHTML5 viewer
function initFlipViewer() {
    flipbook = document.getElementById('flipbook');
    if (!flipbook) return;
    
    // Initialize pages
    initializePages();
    
    // Event listeners
    const prevBtn = document.getElementById('flipPrevPage');
    const nextBtn = document.getElementById('flipNextPage');
    const autoPlayBtn = document.getElementById('flipAutoPlay');
    const zoomInBtn = document.getElementById('flipZoomIn');
    const zoomOutBtn = document.getElementById('flipZoomOut');
    const fullscreenBtn = document.getElementById('flipFullscreen');
    const bookmarkBtn = document.getElementById('flipBookmark');
    
    if (prevBtn) prevBtn.addEventListener('click', flipPreviousPage);
    if (nextBtn) nextBtn.addEventListener('click', flipNextPage);
    if (autoPlayBtn) autoPlayBtn.addEventListener('click', toggleAutoPlay);
    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomInFlip);
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOutFlip);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFlipFullscreen);
    if (bookmarkBtn) bookmarkBtn.addEventListener('click', toggleBookmark);
    
    // Add page click events
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.addEventListener('click', (e) => {
            if (e.target.classList.contains('page')) {
                if (index < totalPages / 2) {
                    flipPreviousPage();
                } else {
                    flipNextPage();
                }
            }
        });
    });
    
    updateFlipNavigation();
}

// Initialize pages setup
function initializePages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        if (index > 0) {
            page.style.zIndex = totalPages - index;
        }
    });
    updatePageInfo();
}

// Flip to previous page
function flipPreviousPage() {
    if (currentPage <= 1) return;
    
    const pages = document.querySelectorAll('.page');
    const currentPageEl = pages[currentPage - 1];
    
    if (currentPageEl) {
        currentPageEl.classList.remove('flipped');
        currentPage--;
        updateFlipNavigation();
        updatePageInfo();
        
        // Add flip sound effect (optional)
        playFlipSound();
    }
}

// Flip to next page
function flipNextPage() {
    if (currentPage >= totalPages) return;
    
    const pages = document.querySelectorAll('.page');
    const nextPageEl = pages[currentPage];
    
    if (nextPageEl) {
        nextPageEl.classList.add('flipped');
        currentPage++;
        updateFlipNavigation();
        updatePageInfo();
        
        // Add flip sound effect (optional)
        playFlipSound();
    }
}

// Update navigation buttons
function updateFlipNavigation() {
    const prevBtn = document.getElementById('flipPrevPage');
    const nextBtn = document.getElementById('flipNextPage');
    
    if (prevBtn) prevBtn.disabled = (currentPage <= 1);
    if (nextBtn) nextBtn.disabled = (currentPage >= totalPages);
}

// Update page information
function updatePageInfo() {
    const currentPageSpan = document.getElementById('currentFlipPage');
    const totalPagesSpan = document.getElementById('totalFlipPages');
    
    if (currentPageSpan) currentPageSpan.textContent = currentPage;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
}

// Toggle auto play
function toggleAutoPlay() {
    const autoPlayBtn = document.getElementById('flipAutoPlay');
    const icon = autoPlayBtn.querySelector('i');
    
    if (isAutoPlaying) {
        clearInterval(autoPlayInterval);
        isAutoPlaying = false;
        icon.className = 'fas fa-play';
        autoPlayBtn.innerHTML = '<i class="fas fa-play"></i> Oto';
    } else {
        autoPlayInterval = setInterval(() => {
            if (currentPage >= totalPages) {
                // Reset to beginning
                resetToFirstPage();
            } else {
                flipNextPage();
            }
        }, 3000);
        isAutoPlaying = true;
        icon.className = 'fas fa-pause';
        autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i> Durdur';
    }
}

// Reset to first page
function resetToFirstPage() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('flipped');
    });
    currentPage = 1;
    updateFlipNavigation();
    updatePageInfo();
}

// Render a page
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({scale: scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    // Update page number
    document.getElementById('pageNumber').value = num;
}

// Queue render page
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Previous page
function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
    updateNavButtons();
}

// Next page
function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
    updateNavButtons();
}

// Zoom in
function onZoomIn() {
    scale += 0.2;
    if (scale > 3.0) scale = 3.0;
    queueRenderPage(pageNum);
    updateZoomLevel();
}

// Zoom out
function onZoomOut() {
    scale -= 0.2;
    if (scale < 0.5) scale = 0.5;
    queueRenderPage(pageNum);
    updateZoomLevel();
}

// Page number change
function onPageNumberChange() {
    const input = document.getElementById('pageNumber');
    const newPageNum = parseInt(input.value);
    
    if (newPageNum >= 1 && newPageNum <= pdfDoc.numPages && newPageNum !== pageNum) {
        pageNum = newPageNum;
        queueRenderPage(pageNum);
        updateNavButtons();
    } else {
        input.value = pageNum; // Reset to current page if invalid
    }
}

// Update navigation buttons
function updateNavButtons() {
    document.getElementById('prevPage').disabled = (pageNum <= 1);
    document.getElementById('nextPage').disabled = (pageNum >= pdfDoc.numPages);
}

// Update zoom level display
function updateZoomLevel() {
    document.getElementById('zoomLevel').textContent = Math.round(scale * 100);
}

// Toggle fullscreen for PDF viewer
function togglePDFFullscreen() {
    const container = document.querySelector('.pdfjs-container');
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
        }
    }
}

// Download catalog
function downloadCatalog() {
    const link = document.createElement('a');
    link.href = 'catalog/LVT-EOM.pdf';
    link.download = 'LVT-EOM-Katalog-2025.pdf';
    link.click();
    
    // Show download notification
    showNotification('Katalog indiriliyor...', 'info');
}

// Magazine loading animation
function showMagazineLoading() {
    const modal = document.getElementById('magazine-modal');
    const loadingHtml = `
        <div class="pdf-loading">
            <i class="fas fa-spinner"></i>
            <span>Katalog yükleniyor...</span>
        </div>
    `;
    
    const pdfContainer = modal.querySelector('.pdf-container-modal');
    if (pdfContainer) {
        pdfContainer.innerHTML = loadingHtml;
    }
}

// Zoom functions for FlipHTML5
function zoomInFlip() {
    const flipbook = document.getElementById('flipbook');
    if (flipbook) {
        const currentScale = flipbook.style.transform.match(/scale\(([\d.]+)\)/);
        const scale = currentScale ? parseFloat(currentScale[1]) : 1;
        const newScale = Math.min(scale + 0.1, 1.5);
        flipbook.style.transform = `scale(${newScale})`;
    }
}

function zoomOutFlip() {
    const flipbook = document.getElementById('flipbook');
    if (flipbook) {
        const currentScale = flipbook.style.transform.match(/scale\(([\d.]+)\)/);
        const scale = currentScale ? parseFloat(currentScale[1]) : 1;
        const newScale = Math.max(scale - 0.1, 0.7);
        flipbook.style.transform = `scale(${newScale})`;
    }
}

// Toggle fullscreen for FlipHTML5
function toggleFlipFullscreen() {
    const container = document.querySelector('.fliphtml5-container');
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Toggle bookmark
function toggleBookmark() {
    const bookmarkBtn = document.getElementById('flipBookmark');
    const icon = bookmarkBtn.querySelector('i');
    
    if (icon.classList.contains('fas')) {
        icon.className = 'far fa-bookmark';
        localStorage.setItem('catalogBookmark', currentPage);
        showNotification('Sayfa yer imlerine eklendi!', 'success');
    } else {
        icon.className = 'fas fa-bookmark';
        localStorage.removeItem('catalogBookmark');
        showNotification('Yer imi kaldırıldı!', 'info');
    }
}

// Play flip sound effect
function playFlipSound() {
    // Create audio context for flip sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Silently fail if audio context is not supported
        console.log('Ses efekti desteklenmiyor');
    }
}

// Initialize catalog interactions
document.addEventListener('DOMContentLoaded', function() {
    // Simple catalog initialization
    console.log('Catalog section loaded successfully');
    
    // Add click tracking for catalog buttons
    const catalogBtns = document.querySelectorAll('.catalog-btn');
    catalogBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Catalog button clicked:', this.textContent.trim());
        });
    });
    
    // Add keyboard navigation for catalog
    document.addEventListener('keydown', function(e) {
        // Only handle keys when catalog section is in view
        const catalogSection = document.getElementById('catalog');
        if (catalogSection && isElementInViewport(catalogSection)) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevCatalogPage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextCatalogPage();
                    break;
            }
        }
    });
    
    // Add smooth scroll to catalog when navigation is used
    const catalogNavButtons = document.querySelectorAll('.catalog-navigation .nav-btn');
    catalogNavButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const catalogSection = document.getElementById('catalog');
            if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Touch gestures for catalog pages
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    const catalogContainer = document.querySelector('.catalog-container');
    if (catalogContainer && isElementInViewport(catalogContainer)) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function(e) {
    const catalogContainer = document.querySelector('.catalog-container');
    if (catalogContainer && isElementInViewport(catalogContainer)) {
        touchEndX = e.changedTouches[0].screenX;
        handleCatalogSwipe();
    }
});

function handleCatalogSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextCatalogPage(); // Swipe left = next page
        } else {
            prevCatalogPage(); // Swipe right = previous page
        }
    }
}

// Auto-advance pages (optional)
function startCatalogAutoplay() {
    setInterval(() => {
        if (currentCatalogPage < totalCatalogPages) {
            nextCatalogPage();
        } else {
            showCatalogPage(1); // Reset to first page
        }
    }, 10000); // 10 seconds per page
}

// Uncomment to enable auto-advance
// startCatalogAutoplay();

// Basit 6'lı Grid Slider
class SimpleGridSlider {
    constructor() {
        console.log('SimpleGridSlider constructor started');
        this.container = document.getElementById('imageGridSlider');
        console.log('Container found:', this.container);
        
        this.allImages = [
            '1.png', '2.png', '3.jpg', '4.jpg', '5.png', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
            'a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg', 'g.jpg', 'h.jpg', 
            'k.jpg', 'l.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', 
            '16.jpg', '17.jpg', '18.jpg'
        ];
        
        // 6 fotoğraflık gruplar oluştur
        this.imageGroups = [];
        for (let i = 0; i < this.allImages.length; i += 6) {
            this.imageGroups.push(this.allImages.slice(i, i + 6));
        }
        console.log('Created', this.imageGroups.length, 'groups:', this.imageGroups);
        
        this.currentGroupIndex = 0;
        this.intervalId = null;
        
        if (this.container) {
            console.log('Container exists, starting slideshow');
            this.startSlideshow();
        } else {
            console.error('Container NOT found!');
        }
    }
    
    startSlideshow() {
        console.log('Starting slideshow with', this.imageGroups.length, 'groups');
        this.showGroup();
        
        // Interval'i temizle ve yeniden başlat
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            console.log('Interval triggered - switching to next group');
            this.nextGroup();
        }, 1000); // 1 saniye geçiş
        
        console.log('Slideshow started, interval ID:', this.intervalId);
    }
    
    showGroup() {
        console.log('Showing group:', this.currentGroupIndex);
        const currentGroup = this.imageGroups[this.currentGroupIndex];
        console.log('Current images:', currentGroup);
        
        // Önce eski container'ı temizle
        this.container.innerHTML = '';
        
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        
        currentGroup.forEach((imageName, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            
            const img = document.createElement('img');
            img.src = `images/${imageName}`;
            img.alt = `LVT Elektrik Otomasyon - Proje ${index + 1}`;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            gridItem.appendChild(img);
            gridContainer.appendChild(gridItem);
        });
        
        this.container.appendChild(gridContainer);
        
        // Active class ekle
        setTimeout(() => {
            gridContainer.classList.add('active');
        }, 50);
    }
    
    nextGroup() {
        const oldIndex = this.currentGroupIndex;
        this.currentGroupIndex = (this.currentGroupIndex + 1) % this.imageGroups.length;
        console.log(`Group changed: ${oldIndex} -> ${this.currentGroupIndex}`);
        this.showGroup();
    }

}

// Initialize simple grid slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating SimpleGridSlider');
    const slider = new SimpleGridSlider();
    
    // Fallback test - eğer 3 saniye sonra geçiş yoksa manuel test
    setTimeout(() => {
        console.log('Testing manual group switch after 3 seconds');
        if (slider && typeof slider.nextGroup === 'function') {
            slider.nextGroup();
        }
    }, 3000);
});