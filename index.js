import { Scene, Triangle, WebGLRenderer, Shader } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import { Square } from './lib/square.js';
import { Parallelogram } from './lib/parallelogram.js';

import { vec3 } from 'https://cdn.skypack.dev/gl-matrix';


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


const renderer = new WebGLRenderer();
renderer.setSize( 1400, 800 ); //creating our canvas
document.body.appendChild( renderer.domElement );


// variables for implementation
let currentKeyDown  = "t"
let currPrimitiveIndex  = 0
let currMode = 0
let prevMode = 0

let gl = renderer.glContext()
const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use()

const width = gl.canvas.width;
const height = gl.canvas.height;

const sceneL = new Scene(); // On the Left : Reference Scene
const sceneR = new Scene(); // On the Right: Drawing Scene

// Div for seeing current mode, key clicked, primitive selected
let div = document.createElement('div')
div.setAttribute("id", "div1"); 
div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`
document.body.appendChild(div);

function setupReferenceScene(){

    // Creating shapes with  colors
    const shapes = [0,0,0,0,0,0,0]
    shapes[0] = new Triangle(0, 0, [1, 153/255, 0, 1]); 
    shapes[1] = new Triangle(0, 0, [74/255, 134/255, 232/255, 1]); 
    shapes[2] = new Triangle(0, 0, [1,  1,  0, 1]);
    shapes[3] = new Triangle(0, 0, [0, 1, 0, 1]); 
    shapes[4] = new Triangle(0, 0, [0,  1,  1, 1]); 
    shapes[5] = new Square(0, 0, [1, 0, 0, 1]); 
    shapes[6] = new Parallelogram(0, 0, [1, 0, 1, 1]);


    const rotationAxis = vec3.fromValues(0, 0, 1)

    // Translating, rotating and scaling individual shapes to form the initial configuration

    shapes[0].transform.setTranslate(vec3.fromValues(-0.24 + 0.25, 0.32, 0));
    shapes[0].transform.setRotate(rotationAxis,0.78);
    shapes[0].transform.setScale([2, 2,1]);


    shapes[1].transform.setTranslate(vec3.fromValues(0.04 + 0.25, 0.04, 0));
    shapes[1].transform.setRotate(rotationAxis,-0.78);
    shapes[1].transform.setScale([2, 2,1]);


    shapes[2].transform.setTranslate(vec3.fromValues(0.05 + 0.25, -0.38, 0));
    shapes[2].transform.setRotate(rotationAxis,-2.34);
    shapes[2].transform.setScale([1, 1,1]);


    shapes[3].transform.setTranslate(vec3.fromValues(-0.66 + 0.25, -0.38, 0));
    shapes[3].transform.setRotate(rotationAxis,0);
    shapes[3].transform.setScale([1.5, 1.5,1]);


    shapes[4].transform.setTranslate(vec3.fromValues(-0.38 + 0.25, 0.04, 0));
    shapes[4].transform.setRotate(rotationAxis,2.36);
    shapes[4].transform.setScale([1, 1,1]);


    shapes[5].transform.setTranslate([-0.23 +0.25, -0.24, 0]);
    shapes[5].transform.setRotate(rotationAxis,-0.78);
    shapes[5].transform.setScale([1, 1,1]);


    shapes[6].transform.setTranslate([-0.67 +0.25, 0.19, 0]);
    shapes[6].transform.setRotate(rotationAxis,-0.78);
    shapes[6].transform.setScale([1, 1,1]);

    sceneL.primitives = [...shapes]
}
function setupDrawingScene(){

    // Creating shapes with  colors
    const shapes = [0,0,0,0,0,0,0]
    shapes[0] = new Triangle(0, 0, [1, 153/255, 0, 1]); 
    shapes[1] = new Triangle(0, 0, [74/255, 134/255, 232/255, 1]); 
    shapes[2] = new Triangle(0, 0, [1,  1,  0, 1]);
    shapes[3] = new Triangle(0, 0, [0, 1, 0, 1]); 
    shapes[4] = new Triangle(0, 0, [0,  1,  1, 1]); 
    shapes[5] = new Square(0, 0, [1, 0, 0, 1]); 
    shapes[6] = new Parallelogram(0, 0, [1, 0, 1, 1]);


    const rotationAxis = vec3.fromValues(0, 0, 1)

    // Translating, rotating and scaling individual shapes to form a randomized configuration

    shapes[0].transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5),getRandomArbitrary(-0.5,0.5), 0));
    shapes[0].transform.setRotate(rotationAxis,0.78);
    shapes[0].transform.setScale([2, 2,1]);


    shapes[1].transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    shapes[1].transform.setRotate(rotationAxis,-0.78);
    shapes[1].transform.setScale([2, 2,1]);


    shapes[2].transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    shapes[2].transform.setRotate(rotationAxis,-2.34);
    shapes[2].transform.setScale([1, 1,1]);


    shapes[3].transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    shapes[3].transform.setRotate(rotationAxis,0);
    shapes[3].transform.setScale([1.5, 1.5,1]);


    shapes[4].transform.setTranslate(vec3.fromValues(getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0));
    shapes[4].transform.setRotate(rotationAxis,2.36);
    shapes[4].transform.setScale([1, 1,1]);


    shapes[5].transform.setTranslate([getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0]);
    shapes[5].transform.setRotate(rotationAxis,-0.78);
    shapes[5].transform.setScale([1, 1,1]);    


    shapes[6].transform.setTranslate([getRandomArbitrary(-0.5,0.5), getRandomArbitrary(-0.5,0.5), 0]);
    shapes[6].transform.setRotate(rotationAxis,-0.78);
    shapes[6].transform.setScale([1, 1,1]);


    sceneR.primitives = [...shapes]
}



const pointInCanvas = (x, y) => ( //Checking if point lies in our canvas 
    (x > -1 && x < 1) && (y > -1 && y < 1)
  )
  
function getCurrentPrimitive(event) { // Get primitive closest to mouse click position
    let posX = event.offsetX 
    let posY = event.offsetY
    let closestPrimitive = 0
    let distance = 4
    let xy = renderer.mouseToClipCoord(posX-width/2,posY,[width/2,height])
    let x = xy[0]
    let y = xy[1]

    if(posX > width/2 && posX < width && posY < height){
        for (let index = 0; index < sceneR.primitives.length; index++) {
            const primitive = sceneR.primitives[index];
            let centroidXY = primitive.getCentroid()
            let cX = centroidXY[0]
            let cY = centroidXY[1]
            let currDistance =  Math.sqrt((x-cX)*(x-cX) + (y-cY)*(y-cY))
            if(currDistance <= distance){
                distance = currDistance
                closestPrimitive = index
            }
        }
    }
    currPrimitiveIndex = closestPrimitive
}


function renderLoop(){
    // Reference Frame
    {
    renderer.render(sceneL, shader,0, 0, width/2, height,[0,1,0,1]) 
    }


  
    // Drawing Frame
    {
    renderer.render(sceneR, shader,width/2, 0, width/2, height,[1,0,0,1]) 

    if(currentKeyDown === "m") { // Mode switch
        currMode = (currMode +  1) % 4
        let div = document.getElementById("div1")
        div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`
        currentKeyDown = "t"
    }

    if(prevMode === 3 && currMode === 0 ) { // Going from mode-3 (empty canvas) to mode-0 (randomized canvas)
        setupDrawingScene()
        prevMode = 0
    }

    if(currMode === 1) {
        let currPrimitive = sceneR.primitives[currPrimitiveIndex]
        let cXY = currPrimitive.getCentroid()
        let cX = cXY[0]
        let cY = cXY[1]

        let XY = currPrimitive.transform.getTranslate()

        //Checking for key pressed and making sure centroid is within the canvas, and translating/rotating/scaling accordingly
        if(currentKeyDown==="ArrowRight" && pointInCanvas(cX+0.02,cY)){
            currPrimitive.transform.setTranslate(vec3.fromValues(XY[0] + 0.02, XY[1], 0));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="ArrowLeft" && pointInCanvas(cX-0.02,cY)){
            currPrimitive.transform.setTranslate(vec3.fromValues(XY[0] - 0.02, XY[1], 0));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="ArrowUp" && pointInCanvas(cX,cY+0.02)){
            currPrimitive.transform.setTranslate(vec3.fromValues(XY[0] , XY[1] + 0.02, 0));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="ArrowDown" && pointInCanvas(cX,cY-0.02)){
            currPrimitive.transform.setTranslate(vec3.fromValues(XY[0] , XY[1] - 0.02, 0));
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
            currPrimitive.transform.setScale(vec3.fromValues(currPrimitive.transform.getScale()[0] * 1.05, currPrimitive.transform.getScale()[1] * 1.05, 1));
            currentKeyDown = "t"
        }
        if(currentKeyDown==="-"){
            currPrimitive.transform.setScale(vec3.fromValues(currPrimitive.transform.getScale()[0] / 1.05, currPrimitive.transform.getScale()[1] / 1.05, 1));
            currentKeyDown = "t"
        }
        prevMode = 1
    }
    if(currMode === 2){
        let sceneCxy= sceneR.centroid()
        let cX = sceneCxy[0]
        let cY = sceneCxy[1]
        
        // Checking for key pressed and making sure that centroid of the scene is within the canvas, and translating/rotating/scaling accordingly
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

        sceneR.primitives = [] //Emptying the canvas in mode-3
        prevMode = 3
    }
    }
}



setupReferenceScene()
setupDrawingScene()

renderer.setAnimationLoop( renderLoop ); // Starting the render loop



//Event listeners for mouse click and key press
document.addEventListener("click", function(event){ 
    getCurrentPrimitive(event)
    let div = document.getElementById("div1")
    div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`
});
document.addEventListener("keydown", function(event) { 
    currentKeyDown = event.key;
    let div = document.getElementById("div1")
    div.innerText = `Current Mode = M${currMode} \n Current Key Down = ${currentKeyDown} \n Current Primitive Index = ${currPrimitiveIndex}`
});

