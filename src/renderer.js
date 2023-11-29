class Renderer{
    constructor(scale){
        this.cols = 64;
        this.rows = 32;
        //Scaling bcoz 64*32 is too small.
        this.scale = scale;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;
        //Array for displaying pixels.
        this.display = new Array(this.cols * this.rows); 
    }
    //Sets pixel value.
    setPixel(x,y){
        //So that if pixel goes out of bound can come from opposite side.

        if(x > this.cols){
            x = x - this.cols;
        }else{
            if(x<0){
                x = x + this.cols; 
            }
        }

        if(y > this.rows){
            y = y - this.rows;
        }else{
            if(y < 0){
                y = y + this.rows;
            }
        }
        //Calculating the memory location where the pixel has to be setted up.
        let pixLoc = x + (y * this.cols);

        //The sprites are xored in Chip-8 display 
        this.display[pixLoc] = this.display[pixLoc] ^ 1; 
        //Returns if a pixel was erased or not.
        return !this.display[pixLoc];
    }
    //Reintializes the array thus reseting the display.
    clear(){
        this.display = new Array(this.cols * this.rows);
    }

    render(){
        //Clears display every render loop.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Looping through the display array
        for(let i=0; i < this.cols *  this.rows; i++){
            let x = (i % this.cols) * this.scale;
            let y = Math.floor(i / this.cols) * this.scale;

            if(this.display[i]){
                //Pixel color black
                this.ctx.fillStyle = '#000';
                //Places a pixel at x,y position with width and height of scale
                this.ctx.fillRect(x,y,this.scale,this.scale);
            }
        }
    }

    
}

export default Renderer;