import React, { useEffect } from 'react';

function Rain() {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    // Initial canvas setup
    resizeCanvas();

    if (canvas.getContext) {
      const w = canvas.width;
      const h = canvas.height;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      const init = [];
      const maxParts = 1000;
      for (let a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: Math.random() * 1,
          xs: -4 + Math.random() * 4 + 2,
          ys: Math.random() * 10 + 10,
        });
      }

      const particles = [...init];

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let c = 0; c < particles.length; c++) {
          const p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
        }
        move();
      }

      function move() {
        for (let b = 0; b < particles.length; b++) {
          const p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -20;
          }
        }
      }

      const animationId = setInterval(draw, 30);

      return () => {
        // Clear the interval when the component unmounts
        clearInterval(animationId);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []); // Run the effect only once on mount

  return <canvas id="canvas" style={{ backgroundColor: '#5ad5fc', width: '100%', height: '100vh' }}></canvas>;
}

export default Rain;
