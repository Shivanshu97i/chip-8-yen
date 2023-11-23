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
}
export default CPU;
