class CPU {
    constructor(renderer, keyboard, speaker) {
       this.renderer = renderer;
       this.keyboard = keyboard;
       this.speaker = speaker;
       
       // 4KB memory
       this.memory = new Uint8Array(4096);

       // 16 8-bit registers
       this.v = new Uint8Array(16);

       // Stores memory addresses
       this.i = 0;

       // Timers
       this.delayTimer = 0;
       this.soundTimer = 0;

       //Program counter
       this.pc = 0x200;

       //Stack
       this.stack = new Array();

       // For instructions that require pausing
       this.paused = false;

       // Execution speed of emulator
       this.speed = 10;

    }
    loadSpritesIntoMemory(){
        //Array of hex values for sprites
        const sprites = [
        0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
        0xF0, 0x80, 0xF0, 0x80, 0x80  // F
    ];
    //Stored each byte in the memory start from 0x000
    for(let i = 0; i< sprites.length; i++){
        this.memory[i] = sprites[i];
    }
    }
    loadRomIntoMemory(program){
        // loading means copying the program from rom to mem starting 0x200
        for(let i = 0; i<program.length; i++){
            this.memory[0x200+i] = program[i];
        }
 
    }
    
}
export default CPU;
