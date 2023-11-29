import Renderer from "./renderer.js";
import Keyboard from "./keyboard.js";
import Speaker from "./speaker.js";
import CPU from "./cpu.js";

//Initializing renderer
const renderer = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker);
//Loop that loops at 60fps
let loop;
let fps = 60, fpsInterval, startTime, now, then, elapsed;
console.log("Chip-8");

function init(){
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    //Test code
    // ren.testRender();
    // ren.render();

    //requestAnimationFrame used for scheduling animations in the browser. 
    //Used to call a function before the next repaint of the web page. 
    // loop = requestAnimationFrame(step);

    cpu.loadSpritesIntoMemory(); 
    cpu.loadRom('pumpkindressup.ch8'); //Change rom here
    loop = requestAnimationFrame(step);
}

function step(){
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        cpu.cycle();
    }

    loop = requestAnimationFrame(step);

}

init();