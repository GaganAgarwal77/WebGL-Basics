import { Scene, Triangle, WebGLRenderer, Shader } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import { Square } from './lib/square.js';
import { Parallelogram } from './lib/parallelogram.js';

import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomPosition() {
    return getRandomArbitrary(-1,1)
}
function getRandomColour() {
    return getRandomArbitrary(0,1)
}


const renderer = new WebGLRenderer();
renderer.setSize( 1400, 800 );

let gl = renderer.glContext()
document.body.appendChild( renderer.domElement );


let currentKeyDown  = "t"
let currPrimitiveIndex  = 0
let currMode = 0
let prevMode = 0
const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use()
const width = gl.canvas.width;
const height = gl.canvas.height;


const sceneL = new Scene();
const sceneR = new Scene();

let div = document.createElement('div')
div.setAttribute("id", "div1");
div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`

document.body.appendChild( div);

function setupReferenceScene(){
    const t0 = new Triangle(0,0,[1,153/255,0,1]); // orange
    const t1 = new Triangle(0,0,[74/255,134/255,232/255,1]); // blue
    const t2 = new Triangle(0,0,[1, 1, 0,1]); // yellow
    const t3 = new Triangle(0,0,[0,1,0,1]); // green
    const t4 = new Triangle(0,0,[0, 1, 1,1]); // light blue
    const s1 = new Square(0,0,[1,0,0,1]); // red
    const p1 = new Parallelogram(0,0,[1,0,1,1]); // pink


    const rotationAxis = vec3.fromValues(0, 0, 1)

    t0.transform.setTranslate(vec3.fromValues(-0.24 + 0.25, 0.32, 0));
    t0.transform.setRotate(rotationAxis,0.78);


    t1.transform.setTranslate(vec3.fromValues(0.04 + 0.25, 0.04, 0));
    t1.transform.setRotate(rotationAxis,-0.78);


    t2.transform.setTranslate(vec3.fromValues(0.05 + 0.25, -0.38, 0));
    t2.transform.setRotate(rotationAxis,-2.34);


    t3.transform.setTranslate(vec3.fromValues(-0.66 + 0.25, -0.38, 0));
    t3.transform.setRotate(rotationAxis,0);


    t4.transform.setTranslate(vec3.fromValues(-0.38 + 0.25, 0.04, 0));
    t4.transform.setRotate(rotationAxis,2.36);

    t0.transform.setScale([2, 2,1]);
    t1.transform.setScale([2, 2,1]);
    t2.transform.setScale([1, 1,1]);
    t3.transform.setScale([1.5, 1.5,1]);
    t4.transform.setScale([1, 1,1]);

    s1.transform.setTranslate([-0.23 +0.25, -0.24, 0]);
    s1.transform.setRotate(rotationAxis,-0.78);
    s1.transform.setScale([1, 1,1]);


    p1.transform.setTranslate([-0.67 +0.25, 0.19, 0]);
    p1.transform.setRotate(rotationAxis,-0.78);
    p1.transform.setScale([1, 1,1]);

    sceneL.add(t0);
    sceneL.add(t1);
    sceneL.add(t2);
    sceneL.add(t3);
    sceneL.add(t4);
    sceneL.add(s1);
    sceneL.add(p1);
}
function setupDrawingScene(){
    const t0 = new Triangle(0,0,[1,153/255,0,1]); // orange
    const t1 = new Triangle(0,0,[74/255,134/255,232/255,1]); // blue
    const t2 = new Triangle(0,0,[1, 1, 0,1]); // yellow
    const t3 = new Triangle(0,0,[0,1,0,1]); // green
    const t4 = new Triangle(0,0,[0, 1, 1,1]); // light blue
    const s1 = new Square(0,0,[1,0,0,1]); // red
    const p1 = new Parallelogram(0,0,[1,0,1,1]); // pink


    const rotationAxis = vec3.fromValues(0, 0, 1)

    t0.transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5),getRandomArbitrary(-0.5,0.5), 0));
    t0.transform.setRotate(rotationAxis,0.78);


    t1.transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    t1.transform.setRotate(rotationAxis,-0.78);


    t2.transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    t2.transform.setRotate(rotationAxis,-2.34);


    t3.transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    t3.transform.setRotate(rotationAxis,0);


    t4.transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    t4.transform.setRotate(rotationAxis,2.36);

    t0.transform.setScale([2, 2,1]);
    t1.transform.setScale([2, 2,1]);
    t2.transform.setScale([1, 1,1]);
    t3.transform.setScale([1.5, 1.5,1]);
    t4.transform.setScale([1, 1,1]);

    s1.transform.setTranslate([getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0]);
    s1.transform.setRotate(rotationAxis,-0.78);
    s1.transform.setScale([1, 1,1]);    


    p1.transform.setTranslate([getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0]);
    p1.transform.setRotate(rotationAxis,-0.78);
    p1.transform.setScale([1, 1,1]);

    sceneR.add(t0);
    sceneR.add(t1);
    sceneR.add(t2);
    sceneR.add(t3);
    sceneR.add(t4);
    sceneR.add(s1);
    sceneR.add(p1);
}



const pointInCanvas = (x, y) => (
    (x > -1 && x < 1) && (y > -1 && y < 1)
  )
  
function getCurrentPrimitive(event) {
    let posX = event.offsetX 
    let posY = event.offsetY
    console.log(posX,posY)
    let closestPrimitive = 0
    let distance = 4
    let xy = renderer.mouseToClipCoord(posX-width/2,posY,[width/2,height])
    let x = xy[0]
    let y = xy[1]
    console.log(x,y)

    if(posX > width/2 && posX < width && posY < height){
        for (let index = 0; index < sceneR.primitives.length; index++) {
            const primitive = sceneR.primitives[index];
            let centroidXY = primitive.getCentroid()
            let cX = centroidXY[0]
            let cY = centroidXY[1]
            let currDistance =  Math.sqrt((x-cX)*(x-cX) + (y-cY)*(y-cY))
            console.log("Click",x.toFixed(2),y.toFixed(2))
            console.log("Centroid",cX.toFixed(2),cY.toFixed(2))
            console.log("Distance",currDistance.toFixed(2))
            if(currDistance <= distance){
                distance = currDistance
                closestPrimitive = index
            }
        }
    }
    currPrimitiveIndex = closestPrimitive
}


function renderLoop(){
    //left
    {
    const drawX = 0;
    const drawY = 0;
    const drawWidth = width / 2;
    const drawHeight = height;

    gl.clearColor(0.9,0.9,0.9,1);
    renderer.render(sceneL, shader,drawX, drawY, drawWidth, drawHeight,[0,1,0,1]) 
    }


  
    //right
    {
    const drawX = width / 2;
    const drawY = 0;
    const drawWidth = width / 2;
    const drawHeight = height;

    gl.clearColor(0.9,0.9,0.9,1);
    renderer.render(sceneR, shader,drawX, drawY, drawWidth, drawHeight,[1,0,0,1]) 
    if(currentKeyDown === "m"){
        currMode = (currMode +  1) % 4
        console.log(currMode)
        let div = document.getElementById("div1")
        console.log(div)
        div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`
        currentKeyDown = "t"
    }
    if(prevMode === 3 && currMode === 0 ){
        setupDrawingScene()
        prevMode = 0
    }
    if(currMode === 1){
        let currPrimitive = sceneR.primitives[currPrimitiveIndex]
        let cXY = currPrimitive.getCentroid()
        let cX = cXY[0]
        let cY = cXY[1]
        if(currentKeyDown==="ArrowRight" && pointInCanvas(cX+0.02,cY)){
            currPrimitive.transform.setTranslate(vec3.fromValues(currPrimitive.transform.getTranslate()[0] + 0.02, currPrimitive.transform.getTranslate()[1], 0));
            currentKeyDown = "t"
            
        }
        if(currentKeyDown==="ArrowLeft" && pointInCanvas(cX-0.02,cY)){
            currPrimitive.transform.setTranslate(vec3.fromValues(currPrimitive.transform.getTranslate()[0] - 0.02, currPrimitive.transform.getTranslate()[1], 0));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="ArrowUp" && pointInCanvas(cX,cY+0.02)){
            currPrimitive.transform.setTranslate(vec3.fromValues(currPrimitive.transform.getTranslate()[0] , currPrimitive.transform.getTranslate()[1] + 0.02, 0));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="ArrowDown" && pointInCanvas(cX,cY-0.02)){
            currPrimitive.transform.setTranslate(vec3.fromValues(currPrimitive.transform.getTranslate()[0] , currPrimitive.transform.getTranslate()[1] - 0.02, 0));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="("){
            currPrimitive.transform.setRotate(vec3.fromValues(0, 0, 1), currPrimitive.transform.getRotate() -0.02);
            currentKeyDown = "t"
        }
        if(currentKeyDown===")"){
            currPrimitive.transform.setRotate(vec3.fromValues(0, 0, 1), currPrimitive.transform.getRotate() +0.02);
            currentKeyDown = "t"
        }
        if(currentKeyDown==="+"){
            currPrimitive.transform.setScale(vec3.fromValues(currPrimitive.transform.getScale()[0] * 1.05, currPrimitive.transform.getScale()[0] * 1.05, 1));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="-"){
            currPrimitive.transform.setScale(vec3.fromValues(currPrimitive.transform.getScale()[0] / 1.05, currPrimitive.transform.getScale()[0] / 1.05, 1));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="x"){   
            sceneR.primitives.pop()
            currentKeyDown = "t"
        }

        prevMode = 1
    }
    if(currMode === 2){
        let sceneCxy= sceneR.centroid()
        let cX = sceneCxy[0]
        let cY = sceneCxy[1]
        console.log(cX,cY)
        if(currentKeyDown==="ArrowRight" && pointInCanvas(cX+0.02,cY)){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate(vec3.fromValues(primitive.transform.getTranslate()[0] + 0.02, primitive.transform.getTranslate()[1], 0));
            }
            currentKeyDown = "t"
            
        }
        if(currentKeyDown==="ArrowLeft" && pointInCanvas(cX-0.02,cY)){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate(vec3.fromValues(primitive.transform.getTranslate()[0] - 0.02, primitive.transform.getTranslate()[1], 0));
            }
            currentKeyDown = "t"
        }
        if(currentKeyDown==="ArrowUp" && pointInCanvas(cX,cY+0.02)){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate(vec3.fromValues(primitive.transform.getTranslate()[0], primitive.transform.getTranslate()[1] + 0.02, 0));
            }
            currentKeyDown = "t"
        }
        if(currentKeyDown==="ArrowDown" && pointInCanvas(cX,cY-0.02)){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate(vec3.fromValues(primitive.transform.getTranslate()[0], primitive.transform.getTranslate()[1] - 0.02, 0));
            }
            currentKeyDown = "t"
        }
        if(currentKeyDown==="("){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate([Math.cos(-0.02) * (primitive.transform.getTranslate()[0] - cX) - Math.sin(-0.02) * (primitive.transform.getTranslate()[1] - cY) + cX, Math.sin(-0.02) * (primitive.transform.getTranslate()[0] - cX) + Math.cos(-0.02) * (primitive.transform.getTranslate()[1] - cY) + cY, 0]);
                primitive.transform.setRotate(vec3.fromValues(0,0,1), primitive.transform.getRotate()-0.02);
            }
            currentKeyDown = "t"
        }
        if(currentKeyDown===")"){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate([Math.cos(+0.02) * (primitive.transform.getTranslate()[0] - cX) - Math.sin(+0.02) * (primitive.transform.getTranslate()[1] - cY) + cX, Math.sin(+0.02) * (primitive.transform.getTranslate()[0] - cX) + Math.cos(+0.02) * (primitive.transform.getTranslate()[1] - cY) + cY, 0]);
                primitive.transform.setRotate(vec3.fromValues(0,0,1), primitive.transform.getRotate()+0.02);
            }
            currentKeyDown = "t"
            currentKeyDown = "t"
        }
        if(currentKeyDown==="+"){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate([primitive.transform.getTranslate()[0] * 1.05, primitive.transform.getTranslate()[1] * 1.05, 0])
                primitive.transform.setScale(vec3.fromValues(primitive.transform.getScale()[0] * 1.05, primitive.transform.getScale()[0] * 1.05, 1));
            }
            currentKeyDown = "t"
        }
        if(currentKeyDown==="-"){
            for (let index = 0; index < sceneR.primitives.length; index++) {
                const primitive = sceneR.primitives[index];
                primitive.transform.setTranslate([primitive.transform.getTranslate()[0] / 1.05, primitive.transform.getTranslate()[1] / 1.05, 0])
                primitive.transform.setScale(vec3.fromValues(primitive.transform.getScale()[0] / 1.05, primitive.transform.getScale()[0] / 1.05, 1));
            }
            currentKeyDown = "t"
        }
        prevMode = 2
    }
    if(currMode === 3){

        sceneR.primitives = []
        prevMode = 3
    }
    }
}
setupReferenceScene()
setupDrawingScene()
renderer.setAnimationLoop( renderLoop );


document.addEventListener("click", function(event){
    getCurrentPrimitive(event)
    let div = document.getElementById("div1")
    console.log(div)
    div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`
});
document.addEventListener("keydown", function(event) { console.log(event.key); currentKeyDown = event.key;
    let div = document.getElementById("div1")
    console.log(div)
    div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`
});

