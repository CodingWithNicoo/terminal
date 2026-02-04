// Abrir/cerrar cards
const cards = document.querySelectorAll('.card');
cards.forEach(card=>{
  card.addEventListener('click', ()=>{
    card.classList.toggle('open');
  });
});

// Cambiar tema
const themeBtn = document.getElementById('theme-btn');
let darkMode = false;
themeBtn.addEventListener('click', ()=>{
  darkMode = !darkMode;
  if(darkMode){
    document.documentElement.style.setProperty('--bg','#111');
    document.documentElement.style.setProperty('--text','#f0f0f0');
    document.documentElement.style.setProperty('--card-bg','#222');
    document.documentElement.style.setProperty('--card-border','#555');
    document.documentElement.style.setProperty('--accent','#ff9800');
  } else{
    document.documentElement.style.setProperty('--bg','#f0f0f0');
    document.documentElement.style.setProperty('--text','#111');
    document.documentElement.style.setProperty('--card-bg','#fff');
    document.documentElement.style.setProperty('--card-border','#ccc');
    document.documentElement.style.setProperty('--accent','#4caf50');
  }
});
