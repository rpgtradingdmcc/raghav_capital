document.addEventListener("DOMContentLoaded", () => {
    const canvases = document.querySelectorAll(".person-canvas");
  
    canvases.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      const imageSrc = canvas.dataset.image;
  
      if (imageSrc) {
        const img = new Image();
        img.src = imageSrc;
  
        img.onload = () => {
          // Calculate the scaling to preserve the aspect ratio
          const aspectRatio = img.width / img.height;
          let drawWidth, drawHeight;
          let offsetX = 0, offsetY = 0;
  
          if (canvas.width / canvas.height > aspectRatio) {
            drawHeight = canvas.height;
            drawWidth = drawHeight * aspectRatio;
            offsetX = (canvas.width - drawWidth) / 2;
          } else {
            drawWidth = canvas.width;
            drawHeight = drawWidth / aspectRatio;
            offsetY = (canvas.height - drawHeight) / 2;
          }
  
          // Draw the image on the canvas
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2,
            0,
            Math.PI * 2
          );
          ctx.clip();
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          ctx.restore();
        };
  
        img.onerror = () => {
          console.error(`Failed to load image: ${imageSrc}`);
        };
      }
    });
  });
  
  