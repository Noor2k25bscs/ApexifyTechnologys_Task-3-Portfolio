// simple site interactions: menu, typed, progress bars, smooth scroll, contact form

// mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
menuBtn && menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  // show as vertical stack when open on small screens (CSS: you can add .open styles if needed)
  if(nav.classList.contains('open')) {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '10px';
    nav.style.position = 'absolute';
    nav.style.right = '18px';
    nav.style.top = '64px';
    nav.style.background = 'rgba(6,10,15,0.85)';
    nav.style.padding = '12px';
    nav.style.borderRadius = '8px';
  } else {
    nav.style.display = '';
    nav.style.flexDirection = '';
    nav.style.position = '';
    nav.style.background = '';
    nav.style.padding = '';
    nav.style.borderRadius = '';
  }
});

// typed effect (simple, no lib)
const typedEl = document.getElementById('typed');
const words = ['Frontend Developer', 'Web Designer', 'UI/UX Enthusiast'];
let wIndex = 0, chIndex = 0, deleting = false;
function typeLoop(){
  const current = words[wIndex % words.length];
  if(!deleting){
    typedEl.textContent = current.substring(0, chIndex + 1);
    chIndex++;
    if(chIndex === current.length){ deleting = true; setTimeout(typeLoop, 1100); return; }
  } else {
    typedEl.textContent = current.substring(0, chIndex - 1);
    chIndex--;
    if(chIndex === 0){ deleting = false; wIndex++; }
  }
  setTimeout(typeLoop, deleting ? 70 : 120);
}
document.addEventListener('DOMContentLoaded', typeLoop);

// progress bars on scroll into view
const bars = document.querySelectorAll('.progress-bar');
function fillBars(){
  bars.forEach(b => {
    const w = b.getAttribute('data-width') || '0%';
    const rect = b.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80){
      b.style.width = w;
    }
  });
}
window.addEventListener('scroll', fillBars);
window.addEventListener('load', fillBars);

// smooth scrolling + active nav highlight
const links = document.querySelectorAll('.nav-link');
links.forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if(sec) sec.scrollIntoView({behavior:'smooth', block:'start'});
    links.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    // close mobile nav if open
    if(nav.classList.contains('open')) { nav.classList.remove('open'); nav.style.display=''; }
  });
});

// tiny contact form handler
const form = document.getElementById('contact-form');
form && form.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks — your message is sent (demo).');
  form.reset();
});

// set footer year
document.getElementById('year').textContent = new Date().getFullYear();
