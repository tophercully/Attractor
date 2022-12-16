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
  if (key === "t" || key === "T") {
    textured = false
    shade.setUniform("textured", textured)
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

function getTriangleCentroid(arr){
	var centerX = (arr[0].x + arr[1].x + arr[2].x) / 3;
	var centerY = (arr[0].y + arr[1].y + arr[2].y) / 3;
	return createVector(centerX, centerY);
}

////////////////////////////////////////


function bodies() {
  numBodies = randomInt(2, 10)
  if(numBodies == 2) {
    gap = randomVal(3, 5)
  } else {
    gap = randomVal(2, 4)
  }

  startAng = randomVal(0, 360)
  ang = 360/numBodies
  padding = randomVal(-300, 300)
  skew = randomVal(-w/4, w/4)
  backSkew = randomVal(-ang, ang)

  center = createVector(randomVal(marg*2, w-(marg*2)), randomVal(marg*2, h-(marg*2)))
  baseA = ptFromAng(w/2, h/2, (-ang+backSkew)/gap, -w*3)
  baseB = ptFromAng(w/2, h/2, (ang+backSkew)/gap, -w*3)

  p.strokeCap(SQUARE)

  for(let i = 0; i < numBodies; i++) {

    p.fill(chroma(randomVal(0, 255)).alpha(0.1).hex())
    p.stroke(chroma(randomVal(0, 255)).alpha(0.5).hex())
    p.push()
    p.translate(center.x, center.y)
    p.rotate(startAng+(ang*i)+randomVal(-ang*0.2, ang*0.2))
    p.translate(-center.x, -center.y)
    numLayers = 10
    for(let i = 0; i < numLayers; i++) {
      xShadow = fxrand()
      yShadow = fxrand()
      dashSize = randomVal(20, 400)
      p.strokeWeight(randomVal(0.5, 10))
      p.drawingContext.setLineDash([dashSize, dashSize])
      p.drawingContext.shadowOffsetX = map(xShadow, -1, 1, -raised, raised);
      p.drawingContext.shadowOffsetY = map(yShadow, -1, 1, -raised, raised);
      p.drawingContext.shadowBlur = 0;
      p.drawingContext.shadowColor = shadowCol;
      if(i == 0 && circ == 1) {
        p.circle(center.x, center.y, abs(padding)+abs(skew))
      }

      p.triangle(center.x+skew, center.y+padding, baseA.x, baseA.y, baseB.x, baseB.y)
    }
    //newTri(center.x+skew, center.y+padding, baseA.x, baseA.y, baseB.x, baseB.y)
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
p.beginShape()
p.vertex(xB+randomVal(-300, 300), yB+randomVal(300, -300))
p.bezierVertex(xB, yB, xC, yC, xA, yA)
p.endShape(CLOSE)
}

function newTri(xA, yA, xB, yB, xC, yC) {
  ptA = createVector(xA, yA)
  ptB = createVector(xB, yB)
  ptC = createVector(xC, yC)
  centroid = getTriangleCentroid([ptA, ptB, ptC])



  p.push()
  p.translate(centroid.x, centroid.y)
  p.beginShape()
  for(let i = -90; i < 360-90; i+=360/360) {
    sineI = map(i, 0, 360/3, 0, 360)
    siner = map(sin(i*3), -1, 1, -1, 1)
    radY = ptA.dist(centroid)
    radX = ptB.dist(ptC)
    mod = map(pow(siner, 2), 0, pow(1, 2), 0.73, 1)
    x = cos(i)*radX*mod
    y = sin(i)*radY*mod
    p.vertex(x, y)
  }
  p.endShape(CLOSE)
  p.pop()
}
