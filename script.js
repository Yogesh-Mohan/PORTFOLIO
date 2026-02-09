// ================================
// FORCE RESUME DOWNLOAD (WORKS EVERYWHERE)
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadResume');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            // If it's a local file, we want to try and force a download
            // without preventDefault first to allow the 'download' attribute to work.
            // If the browser still opens it, we use programmatic download.

            const pdfPath = 'resume.pdf';
            const fileName = 'YogeshWaraKannan_Resume.pdf';

            // For hosted environments (http/https)
            if (window.location.protocol !== 'file:') {
                e.preventDefault();
                fetch(pdfPath)
                    .then(response => response.blob())
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    })
                    .catch(() => {
                        window.location.href = pdfPath;
                    });
            } else {
                // For local file:// protocol
                // We let the default action happen but ensure the attributes are correct
                downloadBtn.setAttribute('download', fileName);
            }
        });
    }
});


// ================================
// NAVBAR SCROLL EFFECT
// ================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// ================================
// ACTIVE NAV LINK
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);


// ================================
// MOUSE PARALLAX HERO
// ================================
const heroSection = document.querySelector('.hero');
const profileImage = document.querySelector('.profile-image');
const decorativeShapes = document.querySelectorAll('.decorative-shape');

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = heroSection;

        const xPos = (clientX / offsetWidth - 0.5) * 20;
        const yPos = (clientY / offsetHeight - 0.5) * 20;

        if (profileImage) {
            profileImage.style.transform = `translate(${xPos * 0.5}px, ${yPos * 0.5}px)`;
        }

        decorativeShapes.forEach((shape, index) => {
            const multiplier = (index + 1) * 0.3;
            shape.style.transform = `translate(${xPos * multiplier}px, ${yPos * multiplier}px)`;
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        if (profileImage) profileImage.style.transform = 'translate(0, 0)';
        decorativeShapes.forEach(shape => shape.style.transform = 'translate(0, 0)');
    });
}


// ================================
// BUTTON RIPPLE EFFECT
// ================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});


// ================================
// CUSTOM CURSOR
// ================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.appendChild(follower);

let mouseX = 0, mouseY = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    fx += (mouseX - fx) / 10;
    fy += (mouseY - fy) / 10;

    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';

    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, .btn, .social-icon').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        follower.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('cursor-hover');
    });
});


console.log('%c👋 Portfolio Loaded Successfully', 'color:#00D9A3;font-size:16px;font-weight:bold;');
