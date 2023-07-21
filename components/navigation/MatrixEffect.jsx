// components/MatrixEffect.js
import React, { useEffect } from 'react';

const MatrixEffect = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas');
    const context = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const binary = '01';
    const columns = canvas.width / 10;

    const drops = [];
    for(let i = 0; i < columns; i++)
      drops[i] = 1;

    function draw() {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0f0';
      context.font = '10px arial';

      for(let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)];

        context.fillText(text, i * 10, drops[i] * 10);

        if(drops[i] * 10 > canvas.height && Math.random() > 0.975)
          drops[i] = 0;

        drops[i]++;
      }
    }

    setInterval(draw, 33);
  }, []);

  return (
    <canvas id="matrixCanvas" style={{ position: 'fixed', top: 0, left: 0 }} />
  );
};

export default MatrixEffect;
