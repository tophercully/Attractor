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
    if(textured == false) {
      textured = true
    } else if(textured == true) {
      textured = false
    }
    shade.setUniform("textured", textured)
  }
}

function randColor() {
  return chroma(truePal[randomInt(0, truePal.length-1)]).saturate(0).hex()
}

function plusOrMin(x) {
  n = fxrand()
  if(n < 0.5) {
    posNeg = 1
  } else {
    posNeg = -1
  }

  return x*posNeg
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

  if(numBodies == 2) {
    gap = randomVal(3, 5)
  } else {
    gap = randomVal(2, 3)
  }

  startAng = randomVal(0, 360)
  ang = 360/numBodies
  padding = randomVal(0, 200)
  skew = randomVal((-w+(marg*2))/4, (w+(marg*2))/4)
  backSkew = randomVal(-ang, ang)
  triLength = 3

  center = createVector(w/2+randomVal(-300, 300), h/2+randomVal(-300, 300))//createVector(randomVal(marg*2, w-(marg*3)), randomVal(marg*2, h-(marg*3)))
  baseA = ptFromAng(w/2, h/2, (-ang+backSkew)/gap, -w*triLength)
  baseB = ptFromAng(w/2, h/2, (ang+backSkew)/gap, -w*triLength)

  nCap = fxrand()
  if(nCap < 0.5) {
    p.strokeCap(SQUARE)
  } else {
    p.strokeCap(SQUARE)
  }
  p.strokeJoin(ROUND)

  for(let i = 0; i < numBodies; i++) {
    decor = 1//randomInt(0, 1)
    p.fill(chroma(randomVal(0, 255)).alpha(0.2+randomVal(-0.001, 0.001)).hex())
    p.stroke(chroma(randomVal(0, 255)).alpha(0.3+randomVal(-0.001, 0.001)).hex())

    p.push()
    p.translate(center.x, center.y)
    p.rotate(startAng+(ang*i)+randomVal(-ang*0.3, ang*0.3))
    p.translate(-center.x, -center.y)
    numLayers = borderDens
    for(let i = 0; i < numLayers; i++) {
      xShadow = fxrand()
      yShadow = fxrand()
      shadowCol = bgc//chroma(randomVal(0, 255)).alpha((0.5)+randomVal(-0.001, 0.001)).hex()
      raise = raised//randomVal(-raised, raised)//randomVal(-raised, raised)//(map(i, 0, numLayers, 0, raised))*randomVal(0.6, 1.4)
      dashSize = randomVal(minDash, maxDash)
      p.strokeWeight(randomVal(0.5, maxWeight))
      p.drawingContext.setLineDash([dashSize, dashSize])
      p.drawingContext.shadowOffsetX = map(xShadow, -1, 1, -raise, raise);
      p.drawingContext.shadowOffsetY = map(yShadow, -1, 1, -raise, raise);
      p.drawingContext.shadowBlur = 0;
      p.drawingContext.shadowColor = shadowCol;
      circR = center.dist(createVector(center.x+skew, center.y+padding))*randomVal(1, 2)
      if(i == 0 && circ == 1 && padding > 0) {
        p.circle(center.x, center.y, circR)
      }

      if(type == 1) {
        tri(center.x+skew, center.y+padding, baseA.x, baseA.y, baseB.x, baseB.y)
      } else if(type == 2) {
        curveTri(center.x+skew, center.y+padding, baseA.x, baseA.y, baseB.x, baseB.y)

      }


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


function curveTri(xA, yA, xB, yB, xC, yC) {
  if(decor == 1) {
    circle(xA, yA, randomVal(10, 100))
  }
p.beginShape()
//p.vertex(xB+randomVal(-300, 300), yB+randomVal(300, -300))
p.curveVertex(xB, yB)
p.curveVertex(xC, yC)
p.curveVertex(xA, yA)
p.curveVertex(xB, yB)
p.curveVertex(xC, yC)

p.endShape(CLOSE)


}

function tri(xA, yA, xB, yB, xC, yC) {
  if(decor == 1) {
    p.circle(xA, yA, randomVal(10, 200))
  }
p.beginShape()
//p.vertex(xB+randomVal(-300, 300), yB+randomVal(300, -300))
p.vertex(xC, yC)
p.vertex(xB, yB)
p.vertex(xA, yA)
p.endShape(CLOSE)


}

function newTri(xA, yA, xB, yB, xC, yC) {
  ptA = createVector(xA, yA)
  ptB = createVector(xB, yB)
  ptC = createVector(xC, yC)
  centroid = getTriangleCentroid([ptA, ptB, ptC])

  inc = 360/3

  p.push()
  p.translate(centroid.x, centroid.y)
  p.beginShape()
  for(let i = inc-45; i < 360+inc-45; i+=inc) {
    sineI = map(i, 0, 360/3, 0, 360)
    siner = map(sin(i*3), -1, 1, -1, 1)
    radY = ptA.dist(centroid)
    radX = ptB.dist(ptC)
    mod = 1//map(abs(sin(sineI/2)), 0, 1, 0.75, 1)//map((cos(PI / 3) / cos((sineI % (TAU / 3)) - PI / 3)), 0.9, 1, 0, 1)
    //console.log(mod)
    x = cos(i)*(radX*mod)/2
    y = sin(i)*(radY*mod)
    if(mod > 0.9) {
      p.circle(x, y, 100)
    }
    if(i == 0) {
      p.vertex(x, y)
    }
    p.curveVertex(x, y)
  }
  p.endShape(CLOSE)
  p.pop()
}

function tp(startX, startY, wid, hei) {
  offMax = 0//100
  offX = 0//randomInt(-100, 100)
  offY = 0//randomInt(-offMax, offMax)
  p2.copy(p, startX, startY, 1, h, startX+offX, startY+offY, wid, hei)
}

function copier() {
  columns = 3
  nums = shuff([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  cellW = (w-(marg*2))/columns
  for(let i = 0; i < w; i++) {
    sineI = map(i, 0, w, 0, 360)
    hei = map(cos(sineI), -1, 1, 0, h-(marg*2))
    tp(i, marg, 1, hei)
  }
}

function accentShape(x, y, r, bs) {
  numSides = 3
  p.push()
  p.translate(x, y)
  p.beginShape()
  for(let i = bs+90; i < 360+bs+90; i += 360/numSides) {
    xc = cos(i)*r/2
    yc = sin(i)*r/2
    p.vertex(xc, yc)
  }
  p.endShape(CLOSE)
  p.pop()
}
