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

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Show success message (in a real application, you would send this to a server)
    showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
    
    // Reset form
    this.reset();
});

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
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
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
        this.instagramUsername = 'lvtelektrikotomasyon';
        
        // Demo veriler (gerçek API bağlantısı kurulana kadar)
        this.demoData = {
            profile: {
                username: 'lvtelektrikotomasyon',
                name: 'LVT Elektrik Otomasyon',
                bio: '⚡ Elektrik & Otomasyon Uzmanı\n🔌 SCADA & PLC Çözümleri\n🏭 Endüstriyel Sistemler',
                followers: 1250,
                following: 180,
                posts: 95,
                profilePicture: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiNFMTE5Njgi/+PC9yZWN0Pgo8dGV4dCB4PSI2MCIgeT0iNzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MVlQ8L3RleHQ+Cjwvc3ZnPgo='
            },
            posts: [
                {
                    id: '1',
                    media_url: null,
                    caption: 'Yeni SCADA projemiz tamamlandı! 🏭⚡',
                    like_count: 67,
                    comments_count: 12,
                    timestamp: '2024-03-15T10:30:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-microchip'
                },
                {
                    id: '2',
                    media_url: null,
                    caption: 'PLC programlama eğitimi başladı! 💻',
                    like_count: 89,
                    comments_count: 15,
                    timestamp: '2024-03-12T14:20:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-bolt'
                },
                {
                    id: '3',
                    media_url: null,
                    caption: 'Hidroelektrik santral bakım çalışmaları ⚡🔧',
                    like_count: 124,
                    comments_count: 23,
                    timestamp: '2024-03-10T09:15:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-cogs'
                },
                {
                    id: '4',
                    media_url: null,
                    caption: 'Yeni ekipman teslimatı! 📦⚡',
                    like_count: 45,
                    comments_count: 8,
                    timestamp: '2024-03-08T16:45:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-tools'
                },
                {
                    id: '5',
                    media_url: null,
                    caption: 'Elektrik panosu montaj çalışması 🔌',
                    like_count: 78,
                    comments_count: 11,
                    timestamp: '2024-03-06T11:30:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-plug'
                },
                {
                    id: '6',
                    media_url: null,
                    caption: 'Otomasyon sistemi devreye alındı! 🤖⚡',
                    like_count: 156,
                    comments_count: 28,
                    timestamp: '2024-03-04T13:20:00Z',
                    media_type: 'IMAGE',
                    icon: 'fas fa-robot'
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
        
        posts.slice(0, 6).forEach((post, index) => {
            const postElement = this.createPostElement(post, index);
            feedGrid.appendChild(postElement);
        });
    }
    
    createPostElement(post, index) {
        const postDiv = document.createElement('div');
        postDiv.className = 'instagram-post';
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'post-image';
        
        if (post.media_url) {
            const img = document.createElement('img');
            img.src = post.thumbnail_url || post.media_url;
            img.alt = post.caption || 'Instagram paylaşımı';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            imageDiv.appendChild(img);
        } else {
            // Demo icon göster
            const icon = document.createElement('i');
            icon.className = post.icon || 'fas fa-image';
            imageDiv.appendChild(icon);
        }
        
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'post-overlay';
        
        const statsDiv = document.createElement('div');
        statsDiv.className = 'post-stats';
        
        const likesSpan = document.createElement('span');
        likesSpan.innerHTML = `<i class="fas fa-heart"></i> ${post.like_count || Math.floor(Math.random() * 100) + 20}`;
        
        const commentsSpan = document.createElement('span');
        commentsSpan.innerHTML = `<i class="fas fa-comment"></i> ${post.comments_count || Math.floor(Math.random() * 20) + 3}`;
        
        statsDiv.appendChild(likesSpan);
        statsDiv.appendChild(commentsSpan);
        overlayDiv.appendChild(statsDiv);
        
        postDiv.appendChild(imageDiv);
        postDiv.appendChild(overlayDiv);
        
        // Tıklama olayı ekle
        postDiv.addEventListener('click', () => {
            if (post.permalink) {
                window.open(post.permalink, '_blank');
            } else {
                window.open(`https://instagram.com/${this.instagramUsername}`, '_blank');
            }
        });
        
        return postDiv;
    }
    
    // Gerçek zamanlı güncelleme (opsiyonel)
    startAutoRefresh() {
        setInterval(() => {
            this.loadInstagramData();
        }, 300000); // 5 dakikada bir güncelle
    }
}

// Instagram API'yi başlat
document.addEventListener('DOMContentLoaded', () => {
    const instagramAPI = new InstagramAPI();
    
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