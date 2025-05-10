document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to use
    const chars = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(247, 199, 212, 0.08)"; // Transparent pink fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = "#ffffff"; // White text
      ctx.font = `${fontSize}px monospace`;
  
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
  
        drops[i]++;
      }
    }
  
    setInterval(draw, 50);
  
    // Optional: Make it responsive
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
});
