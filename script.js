// Intersection observer for scroll-triggered animations
const observer = new IntersectionObserver(
(entries) => {
    entries.forEach((e) => {
    if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
    }
    });
},
{ threshold: 0.12 },
);

document
.querySelectorAll(
    ".feature-card, .step, .pillar, .testi-card, .metric-item",
)
.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .2s ease, transform .2s ease";
    observer.observe(el);
});

// Stagger children in grids
document
.querySelectorAll(
    ".features-grid .feature-card, .pillars-grid .pillar, .testi-grid .testi-card",
)
.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.04}s`;
});

// Current year is stamped by /components/loader.js after footer injection.