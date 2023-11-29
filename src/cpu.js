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
    loadRom(romName){
        var self = this;

    // Use fetch to make the HTTP GET request
    fetch('roms/' + romName)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Convert the response to an ArrayBuffer
            return response.arrayBuffer();
        })
        .then(program => {
            // Create a Uint8Array from the ArrayBuffer
            let programArray = new Uint8Array(program);

            // Load the ROM/program into memory
            self.loadRomIntoMemory(programArray);
        })
        .catch(error => {
            // Handle errors
            console.error('Fetch error:', error);
        });
    }

    cycle(){
        //Number of instructions executed per cycle
        for( let i = 0; i<this.speed; i++){
            if(!this.paused){
                //Stores high byte in pc and low byte in pc+1 then combines them with | bitwise operation

                let opcode = (this.memory[this.pc] << 8 | this.memory[this.pc+1]);
                this.executeInstruction(opcode);
            }
        }
        if(!this.paused){
            this.updateTimers();
        }
        this.playSound();
        this.renderer.render();
    }

    updateTimers(){
        // Subtracts 1 from delay timer register until it reaches 0 used for keeping track of certain events to occur
        if(this.delayTimer > 0) {
            this.delayTimer = this.delayTimer - 1;
        }
        
        // Plays sound based on this register
        if(this.soundTimer > 0 ){
            this.soundTimer = this.soundTimer - 1;
        }
    }

    playSound(){
        if(this.soundTimer > 0){
            //440 frequency
            this.speaker.play(440);
        }
        else{
            this.speaker.stop();
        }
    }

    executeInstruction(opcode){
        
        //Every instruction is 2 bytes.
        this.pc = this.pc + 2;

        let x = (opcode & 0x0F00) >> 8; //Lower 4-bits of high byte
        let y = (opcode & 0x00F0) >> 4; //Upper 4-bits of low byte
        
        //Instructions
        switch (opcode & 0xF000) {
    case 0x0000:
        switch (opcode) {
            case 0x00E0:
                this.renderer.clear();
                break;
            case 0x00EE:
                this.pc = this.stack.pop();
                break;
        }

        break;
    case 0x1000:
        this.pc = (opcode & 0xFFF);
        break;
    case 0x2000:
        this.stack.push(this.pc);
        this.pc = (opcode & 0xFFF);
        break;
    case 0x3000:
        if(this.v[x] === (opcode & 0xFF)){
            this.pc += 2;
        }
        break;
    case 0x4000:
        if(this.v[x] !== (opcode & 0xFF)){
            this.pc += 2;
        }

        break;
    case 0x5000:
        if(this.v[x] === this.v[y]){
            this.pc += 2;
        }

        break;
    case 0x6000:
        this.v[x] = (opcode & 0xFF);
        break;
    case 0x7000:
        this.v[x] = this.v[x] + (opcode & 0xFF);
        break;
    case 0x8000:
        switch (opcode & 0xF) {
            case 0x0:
                this.v[x] = this.v[y];
                break;
            case 0x1:
                this.v[x] = this.v[x] | this.v[y];
                break;
            case 0x2:
                this.v[x] = this.v[x] & this.v[y];
                break;
            case 0x3:
                 this.v[x] = this.v[x] ^ this.v[y];
                break;
            case 0x4:
                let sum = (this.v[x] += this.v[y]);
                this.v[0xF] = 0;
                if (sum > 0xFF) {
                this.v[0xF] = 1;
                    }
                this.v[x] = sum;
                break;
            case 0x5:
                this.v[0xF] = 0;
                if(this.v[x] > this.v[y]){
                    this.v[0xF] = 1;
                }
                this.v[x] = this.v[x] - this.v[y];
                break;
            case 0x6:
                this.v[0xF] = this.v[x] & 0x1;
                this.v[x] = this.v[x] >> 1;
                break;
            case 0x7:
                this.v[0xF] = 0;
                if(this.v[y] > this.v[x]) {
                    this.v[0xF] = 1;
                }
                this.v[x] = this.v[y] - this.v[x];
                break;
            case 0xE:
                this.v[0xF] = this.v[x] & 0x80;
                this.v[x] = this.v[x] << 1;
                break;
        }

        break;
    case 0x9000:
        if(this.v[x]!=this.v[y]){
            this.pc +=1;
        }
        break;
    case 0xA000:
        this.i = opcode & 0xFFF;
        break;
    case 0xB000:
        this.pc = (opcode & 0xFFF) + this.v[0];
        break;
    case 0xC000:
        let r = Math.floor(Math.random() * 0xFF);
        this.v[x] = r & (opcode & 0xFF);
        break;
    case 0xD000:
        let width = 8; //width of sprite 8
        let height = opcode & 0xF; // Height is the last digit of opcode 
        this.v[0xF] = 0; // For collision detection erasure of pixels
        
        for(let row = 0; row<height; row++){
            let sprite = this.memory[this.i + row];
                for(let col = 0; col<width; col++){
                    if((sprite & 0x80) > 0){
                        if(this.renderer.setPixel(this.v[x] + col, this.v[y] + row)){
                        this.v[0xF] = 1;
                        }
                    }
                    sprite <<= 1; //Allows to go through every bit of sprite
                } 
        }
        
        break;
    case 0xE000:
        switch (opcode & 0xFF) {
            case 0x9E:
                if(this.keyboard.isKeyPressed(this.v[x])){
                    this.pc += 2;
                }
                break;
            case 0xA1:
                if(!this.keyboard.isKeyPressed(this.v[x])){
                    this.pc += 2;
                }

                break;
        }

        break;
    case 0xF000:
        switch (opcode & 0xFF) {
            case 0x07:
                this.v[x] = this.delayTimer;
                break;
            case 0x0A:
                this.paused = true;

                this.keyboard.onNextKeyPress = function(key) {
                this.v[x] = key;
                this.paused = false;
                }.bind(this);
                break;
            case 0x15:
                this.delayTimer = this.v[x];
                break;
            case 0x18:
                this.soundTimer = this.v[x];
                break;
            case 0x1E:
                this.i = this.i + this.v[x];
                break;
            case 0x29:
                this.i = this.v[x] * 5;
                break;
            case 0x33:
                this.memory[this.i] = parseInt(this.v[x] / 100);
                this.memory[this.i + 1] = parseInt((this.v[x] % 100) / 10);
                this.memory[this.i + 2] = parseInt(this.v[x] % 10);
                break;
            case 0x55:
                for(let k=0; k<=x; k++){
                    this.memory[this.i+k] = this.v[k];
                }
                break;
            case 0x65:
                 for(let k=0; k<=x; k++){
                    this.v[k] = this.memory[this.i+k];
                }
                break;
        }

        break;

    default:
        throw new Error('Unknown opcode ' + opcode);
}

    }
}
export default CPU;
