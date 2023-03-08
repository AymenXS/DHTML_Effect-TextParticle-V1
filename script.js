window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "white";

  ctx.font = "80px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxTextWidth = canvas.width * 0.5;

  function wrapText(text) {
    let linesArray = [];
    let lineCounter = 0;
    let line = "";
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      if (ctx.measureText(testLine).width > maxTextWidth) {
        line = words[i] + " ";
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
      ctx.fillText(testLine, canvas.width / 2, canvas.height / 2 + i * 70);
    }
    linesArray.forEach((element, index) => {
      ctx.fillText(element, canvas.width / 2, canvas.height / 2 + i * 70);
    })
  }

  wrapText("qsdfqsdf qsdfqsdf");
});
