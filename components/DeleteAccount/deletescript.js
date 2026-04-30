let currentStep = 1;

function goStep(n) {
// Validate step 1
if (n === 2 && currentStep === 1) {
    const email = document.getElementById('email').value.trim();
    const pass  = document.getElementById('password').value.trim();
    if (!email || !pass) {
    [email ? null : 'email', pass ? null : 'password'].filter(Boolean).forEach(id => {
        document.getElementById(id).classList.add('error');
        setTimeout(() => document.getElementById(id).classList.remove('error'), 1200);
    });
    return;
    }
}
// Validate step 2
if (n === 3 && currentStep === 2) {
    const chosen = document.querySelector('input[name="reason"]:checked');
    if (!chosen) {
    document.getElementById('reasonList').style.outline = '2px solid var(--error)';
    document.getElementById('reasonList').style.borderRadius = '12px';
    setTimeout(() => { document.getElementById('reasonList').style.outline = ''; }, 1200);
    return;
    }
}

// Update tabs
for (let i = 1; i <= 3; i++) {
    const tab = document.getElementById(`tab-${i}`);
    tab.classList.remove('active','done');
    if (i < n)  tab.classList.add('done');
    if (i === n) tab.classList.add('active');
    // update step dot to checkmark if done
    const dot = tab.querySelector('.step-num-sm');
    dot.textContent = i < n ? '✓' : i;
}

// Show correct step
document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
document.getElementById(`step-${n}`).classList.add('active');
currentStep = n;
}

// Toggle other textarea
document.querySelectorAll('input[name="reason"]').forEach(r => {
r.addEventListener('change', () => {
    document.getElementById('otherGroup').style.display = r.value === 'other' ? 'flex' : 'none';
});
});

// Validate confirm step
function checkConfirm() {
const val = document.getElementById('confirmInput').value;
const chk1 = document.getElementById('agreeCheck').checked;
const chk2 = document.getElementById('exportCheck').checked;
document.getElementById('deleteBtn').disabled = !(val === 'DELETE' && chk1 && chk2);
}

// Submit
function submitDeletion() {
document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
document.getElementById('successState').classList.add('visible');
document.querySelectorAll('.steps-nav, #stepsTabs').forEach(e => e.style.display = 'none');
}

// Scroll animations
const ao = new IntersectionObserver((entries) => {
entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
});
}, { threshold: 0.08 });
document.querySelectorAll('.info-card, .alt-card').forEach((el, i) => {
el.style.opacity='0'; el.style.transform='translateY(18px)';
el.style.transition=`opacity .5s ease ${i*0.07}s, transform .5s ease ${i*0.07}s`;
ao.observe(el);
});