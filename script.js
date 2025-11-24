// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Animate skill bars on scroll
function animateSkills(){
  document.querySelectorAll('.progress').forEach(bar=>{
    const rect = bar.getBoundingClientRect();
    if(rect.top < window.innerHeight - 60){
      const val = bar.getAttribute('data-value');
      bar.style.width = val + '%';
    }
  });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', ()=>{
  animateSkills();
  animateGauges();
});

// Simple circular gauge animation (pure JS)
function animateGauges(){
  // g1, g2, g3 stroke-dasharray set in HTML initially; we'll animate text and stroke
  const gauges = [
    {id:'g1', value:80},
    {id:'g2', value:70},
    {id:'g3', value:65}
  ];
  gauges.forEach(g=>{
    const el = document.getElementById(g.id);
    if(!el) return;
    // animate stroke-dasharray
    let cur = 0;
    const target = g.value;
    const txt = el.parentNode.querySelector('.percent');
    const inter = setInterval(()=>{
      cur += 2;
      if(cur >= target) cur = target;
      const dash = cur + ',100';
      el.setAttribute('stroke-dasharray', dash);
      if(txt) txt.textContent = cur + '%';
      if(cur === target) clearInterval(inter);
    },18);
  });
}

// Simple animated project card interactions
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mouseenter', ()=>{
    card.style.transform = 'translateY(-8px) scale(1.01)';
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
  });
});

// Tiny analytics-like chart demo (canvas)
(function createMiniChart(){
  try{
    const canvas = document.createElement('canvas');
    canvas.width = 320; canvas.height = 120;
    canvas.style.width = '100%';
    const ctx = canvas.getContext('2d');
    // sample data
    const data = [12,18,10,22,16,24,20];
    const w = canvas.width;
    const h = canvas.height;
    document.querySelectorAll('.mini-dashboard .metrics .metric').forEach((m,i)=>{
      const cvs = canvas.cloneNode();
      cvs.getContext('2d').fillStyle = 'rgba(255,255,255,0.03)';
      cvs.getContext('2d').fillRect(0,0,cvs.width,cvs.height);
      // draw line chart
      const g = cvs.getContext('2d');
      g.beginPath();
      g.strokeStyle = '#8b5cff';
      g.lineWidth = 2;
      data.forEach((v,idx)=>{
        const x = (idx/(data.length-1))*(cvs.width-20)+10;
        const y = cvs.height - (v/30)*cvs.height - 10;
        if(idx===0) g.moveTo(x,y); else g.lineTo(x,y);
      });
      g.stroke();
      m.appendChild(cvs);
    });
  }catch(e){}
})();

// Accessibility: focus outlines for keyboard users
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Tab') document.body.classList.add('tabbing');
});
