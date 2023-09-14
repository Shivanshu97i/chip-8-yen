class Keyboard{
    constructor(){
        //KeyCode for keyboard keys
        this.KeyMap = {
            49: 0x1, // 1
            50: 0x2, // 2
            51: 0x3, // 3
            52: 0xc, // 4
            81: 0x4, // Q
            87: 0x5, // W
            69: 0x6, // E
            82: 0xD, // R
            65: 0x7, // A
            83: 0x8, // S
            68: 0x9, // D
            70: 0xE, // F
            90: 0xA, // Z
            88: 0x0, // X
            67: 0xB, // C
            86: 0xF  // V
        }

        //Array to keep track of the keys pressed.
        this.keyPressed = [];

        //For instructions that require waiting for the next key presses.
        this.onNextKeyPress = null;
        
        //When a user presses a key.
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        //When a user releases a key.
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);    
    }

    //To check if a certain key is pressed
    isKeyPressed(keyCode){
        //Checks the keyPressed array for the specified keyCode.
        return this.keysPressed[keyCode];
    }
}

export default Keyboard;