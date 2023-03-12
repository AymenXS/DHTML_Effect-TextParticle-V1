window.addEventListener("load", function () {
  const textInput = document.getElementById("textInput");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x = Math.random() * this.effect.canvasWidth;
      this.y = 0;
      this.color = color;
      this.originX = x;
      this.originY = y;
      this.size = this.effect.gap;
      this.dx = 0;
      this.dy = 0;
      this.vx = 0;
      this.vy = 0;
      this.force = 0;
      this.angle = 0;
      this.distance = 0;
      this.friction = Math.random() * 0.6 + 0.15;
      this.ease = Math.random() * 0.1 + 0.005;
    }
    draw() {
      this.effect.context.fillStyle = this.color;
      this.effect.context.fillRect(this.x, this.y, this.size, this.size)
    }
    update() {}
  }

  class Effect {
    constructor(context, canvasWidth, canvasHeight) {
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.textX = canvasWidth / 2;
      this.textY = canvasHeight / 2;
      this.fontSize = 80;
      this.lineHeight = this.fontSize * 0.9;
      this.maxTextWidth = this.canvasWidth * 0.8;
      this.textInput = document.getElementById("textInput");
      this.textInput.addEventListener("keyup", (event) => {
        if (event.key !== " ") {
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.wrapText(event.target.value);
        }
      });

      // Particle Text
      this.particles = [];
      this.gap = 3;
      this.mouse = {
        radius: 20000,
        x: 0,
        y: 0,
      };
      window.addEventListener("mousemove", (event) => {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
      });
    }

    wrapText(text) {
      // Canvas Settings
      const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0.3, "red");
      gradient.addColorStop(0.5, "fuchsia");
      gradient.addColorStop(0.7, "yellow");
      this.context.fillStyle = gradient;
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.lineWidth = 3;
      this.context.strokeStyle = "white";
      this.context.font = this.fontSize + "px Helvetica";
      this.context.fillText(text, this.textX, this.textY);
      this.context.strokeText(text, this.textX, this.textY);

      // Break Multiline Text
      let linesArray = [];
      let words = text.split(" ");
      let lineCounter = 0;
      let line = "";
      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        if (this.context.measureText(testLine).width > this.maxTextWidth) {
          line = words[i] + " ";
          lineCounter++;
        } else {
          line = testLine;
        }
        linesArray[lineCounter] = line;
      }

      let textHeight = this.lineHeight * lineCounter;
      this.textY = this.canvasHeight / 2 - textHeight / 2;
      linesArray.forEach((element, index) => {
        this.context.fillText(element, this.textX, this.textY + index * this.lineHeight);
        this.context.strokeText(element, this.textX, this.textY + index * this.lineHeight);
      });
      this.convertToParticles();
    }

    convertToParticles() {
      this.particles = [];
      const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
      for (let y = 0; y < this.canvasHeight; y += this.gap) {
        for (let x = 0; x < this.canvasWidth; x += this.gap) {
          const index = (y * this.canvasWidth + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 0) {
            const red = pixels[index];
            const green = pixels[index];
            const blue = pixels[index];
            const color = "rgb(" + red + "," + green + "," + blue + ")"; // Remember to try to add alpha color as well
          }
        }
      }
    }

    render() {}
  }

  const effect = new Effect(ctx, canvas.width, canvas.height);
  effect.wrapText("Hello, how are you!");
  function animate() {}

  // function wrapText(text) {
  //   let linesArray = [];
  //   let lineCounter = 0;
  //   let line = "";
  //   let words = text.split(" ");
  //   for (let i = 0; i < words.length; i++) {
  //     let testLine = line + words[i] + " ";
  //     if (ctx.measureText(testLine).width > maxTextWidth) {
  //       line = words[i] + " ";
  //       lineCounter++;
  //     } else {
  //       line = testLine;
  //     }
  //     linesArray[lineCounter] = line;
  //   }
  //   let textHeight = lineHeight * lineCounter;
  //   let textY = canvas.height / 2 - textHeight / 2;
  //   linesArray.forEach((element, index) => {
  //     ctx.fillText(element, canvas.width / 2, textY + index * lineHeight);
  //   });
  // }

  // textInput.addEventListener("keyup", function (event) {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   wrapText(event.target.value);
  // });
});
