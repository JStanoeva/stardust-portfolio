export function createStars() {
  const container = document.getElementById('star-container');
  if (!container) {
    console.error('Star container not found!');
    return;
  }
  container.innerHTML = '';
  const numStars = window.innerWidth < 768 ? 200 : 1000;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2.5}s`;
    const size = Math.random() * 1.5 + 0.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(star);
  }
}
