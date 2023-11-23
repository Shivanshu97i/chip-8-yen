import Renderer from "./renderer.js";
import Keyboard from "./keyboard.js";
import Speaker from "./speaker.js";

//Initializing renderer
const ren = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();
//Loop that loops at 60fps
let loop;
let fps = 60, fpsInterval, startTime, now, then, elapsed;
console.log("Chip-8");

function init(){
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    //Test code
    ren.testRender();
    ren.render();

    //requestAnimationFrame used for scheduling animations in the browser. 
    //Used to call a function before the next repaint of the web page. 
    loop = requestAnimationFrame(step);
}

function step(){
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){

    }

    loop = requestAnimationFrame(step);

}

init();