#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

//textures and uniforms from p5
uniform sampler2D p;
uniform sampler2D c;
uniform vec2 u_resolution;
uniform float seed;
uniform bool textured;
uniform vec3 bgc;
uniform float marg;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}



float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm(in vec2 st){
    // Initial values
    float value=0.;
    float amplitude=.5;
    float frequency=0.;
    //
    // Loop of octaves
    for(int i=0;i<OCTAVES;i++){
        value+=amplitude*noise(st);
        st*=5.0;
        amplitude*=.5;
    }
    return value;
}

mat2 rotate(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

void main() {
  vec2 uv = vTexCoord*u_resolution;
  vec2 st = vTexCoord;
  vec2 stB = vTexCoord;
  vec2 stPaper = vTexCoord;
  vec2 stWave = vTexCoord;



  //flip the upside down image
  st.y = 1.0 - st.y;

  stPaper.y*= 10.0;
  stPaper.x*= 0.5;
  stPaper.xy *= 150.0;
  stPaper.xy *= rotate(0.7853981633974483);


  //form noise
  if(st.x > 0.0) {
    st.xy += map(random(st.xy), 0.0, 1.0, -0.0001, 0.0001);
  }
  
  float warp = map(noise(seed+st.xy*5.0), 0.0, 1.0, -0.005, 0.005);
  float warpPaper = map(fbm(seed+stPaper.xy), 0.0, 1.0, -0.005, 0.005);
  float wave = map(sin(st.x*600.0), -1.0, 1.0, -1.0/1000.0, 1.0/1000.0);
  stWave.y += wave;
  st.xy += warp;
  //st.xy += warpPaper;
  //stB.xy += warpPaper;
  //st.xy += warp;

  vec3 color = vec3(0.0);
  vec3 final = vec3(0.0);
  vec4 texP = texture2D(p, st);
  vec4 texC = texture2D(c, st);
  vec2 lum = vec2((texP.r + texP.g + texP.b)/3.0, (texP.r + texP.g + texP.b)/3.0);

  vec4 colVal = texture2D(c, lum);
  color = colVal.rgb;
  if(texP.rgb == bgc.rgb) {
    color.rgb = bgc.rgb;
  }

  //color noise
 

  //stPaper.xy *= rotate(0.7853981633974483*2.0);
    float damageThresh = fbm(seed+stPaper.xy);
    float damageDark = 1.0-damageThresh;
    float accentNoise = noise(seed+stPaper.xy*1000.0);

    // color+= step(0.6, damageThresh)*0.01;
    // color-= step(0.6, damageDark)*0.01;
    //color+= step(0.5, accentNoise)*1.0;


  //color = vec3(texP.r, texP.g, texP.b);

  //Draw margin
  float margX = marg;
  float margY = margX*0.8;
  if(stB.x < margX || stB.x > 1.0-margX || stB.y < margY || stB.y > 1.0-margY) {
    color = vec3(bgc.r, bgc.g, bgc.b);
  }
  float nWave = sin(stWave.y*1000.0);
  float oppNWave = 1.0-nWave;

  //color+= step(0.9, oppNWave)*0.025;
  float noiseGray = 0.0;
 
  float brightnessNow = (color.r, color.g, color.b)/3.0;
  float blackPt = 0.1;
  float whitePt = -0.2;
  float contrastAdd = 0.0;
  float contrastMult = 1.0;
  if(st.y > 0.0) {
    contrastAdd = map(brightnessNow, 0.0, 1.0, blackPt, whitePt);
    contrastMult = 1.1;
  }
   if(textured == true) {
    //color-= step(0.9, nWave)*0.03;
    //color+= step(0.65, damageThresh)*0.015;
    // color-= step(0.65, damageDark)*0.015;
    noiseGray = map(random(stWave.xy), 0.0, 1.0, -0.075, 0.075);
  }
  float avg = (color.r+color.g+color.b)/3.0;
  final = vec3(avg, avg, avg);

  gl_FragColor = vec4(((color.rgb*contrastMult)+contrastAdd)+noiseGray, 1.0);
}
