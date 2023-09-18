class Speaker {
    constructor() {
        //Web API for web browser to use Audio
        const audioContext = window.AudioContext || window.webkitAudioCntext;
        this.audioCtx = new audioContext();
       
        //Audio Control 
        this.gain = this.audioCtx.createGain();
        //Final destination of audio processing such as speaker meanin where the sound will be played
        this.finish = this.audioCtx.destination;
        //Connects the gain to the audio output
        this.gain.connect(this.finish);

    }
    //Playing the sound.
    play(frequency) {
        //Checks if the audio processing has been made and checks so that there isn't a oscillator already present.
        if(this.audioCtx && !this.oscillator){
            //Sound generator that can produce waveforms.
            this.oscillator = this.audioCtx.createOscillator();

            //Sets the frequency of the audio
            this.oscillator.frequency.setValueAtTime(frequency || 440, this.audioCtx.currentTime);

            //Sets the waveform for sound
            this.oscillator.type = 'square';

            //Connects the oscillator to the gain to produce sound
            this.oscillator.connect(this.gain);
            this.oscillator.start();
        }

    }
    //For stopping the sound
    stop(){
        if(this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    }
}

export default Speaker;