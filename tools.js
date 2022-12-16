function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}
function randomVal(min, max) {
  return fxrand() * (max - min) + min;
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(fxrand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    save("img.png");
  }
}

function randColor() {
  return chroma(truePal[randomInt(0, truePal.length-1)]).saturate(0).hex()
}

function angBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function ptFromAng(x, y, ang, dis) {
  xC = cos(ang)*dis
  yC = sin(ang)*dis

  return createVector((x+xC), (y+yC))
}

////////////////////////////////////////


function bodies() {
  numBodies = randomInt(2, 10)
  gap = randomVal(2, 4)
  startAng = randomVal(0, 360)
  ang = 360/numBodies
  padding = randomVal(-300, 300)
  skew = randomVal(-w/4, w/4)
  backSkew = randomVal(-ang, ang)

  center = createVector(w/2, h/2)
  baseA = ptFromAng(w/2, h/2, (-ang)/gap, -w*2)
  baseB = ptFromAng(w/2, h/2, (ang)/gap, -w*2)
  p.fill(chroma(randomVal(0, 255)).alpha(0.75).hex())
  for(let i = 0; i < numBodies; i++) {

    p.push()
    p.translate(center.x, center.y)
    p.rotate(startAng+(ang*i))
    p.translate(-center.x, -center.y)

    p.drawingContext.shadowOffsetX = map(xShadow, -1, 1, -raised, raised);
    p.drawingContext.shadowOffsetY = map(yShadow, -1, 1, -raised, raised);
    p.drawingContext.shadowBlur = 1;
    p.drawingContext.shadowColor = shadowCol;
    p.triangle(center.x+skew, center.y+padding, baseA.x, baseA.y, baseB.x, baseB.y)
    p.pop()
  }
}

function gradLUT() {
scl = 100
  for(let y = 0; y < h; y+=w/scl) {
    for(let x = 0; x < w; x+=h/scl) {
      n = map(x, 0, w, 0, 1)
      nY = map(y, 0, h, 0, 1)
      colScale = chroma.scale(truePal.slice(0, numColors)).classes(numColors*tiers)
      hueCol = colScale(nY)
      gradScale = chroma.scale([hilo[0], chroma(hueCol).hex(), hilo[1]]).padding(0.5)


      col = gradScale(n).hex()
      c.stroke(col)
      c.strokeWeight(scl)
      c.point(x, y)
    }

  }
}


function tri(xA, yA, xB, yB, xC, yC) {

}
