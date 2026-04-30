// Active TOC highlight on scroll
const sections = document.querySelectorAll('.policy-section');
const tocLinks = document.querySelectorAll('.toc-list a');
const observer = new IntersectionObserver((entries) => {
entries.forEach(e => {
    if (e.isIntersecting) {
    tocLinks.forEach(l => l.classList.remove('active'));
    const match = document.querySelector(`.toc-list a[href="#${e.target.id}"]`);
    if (match) match.classList.add('active');
    }
});
}, { rootMargin: '-20% 0px -70% 0px' });
sections.forEach(s => observer.observe(s));

// Scroll animations
const ao = new IntersectionObserver((entries) => {
entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
});
}, { threshold: 0.08 });
document.querySelectorAll('.right-card, .policy-section').forEach((el,i) => {
el.style.opacity='0'; el.style.transform='translateY(16px)';
el.style.transition=`opacity .5s ease ${i*.04}s, transform .5s ease ${i*.04}s`;
ao.observe(el);
});