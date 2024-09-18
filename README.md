
# Chip-8 Emulator

This project is a web-based Chip-8 emulator implemented using JavaScript, HTML, and CSS. It allows you to load and play classic Chip-8 games directly in the browser. The emulator mimics the functionality of the original Chip-8 virtual machine, including graphical rendering, keyboard input, and sound.

## Features
- **Web-based Emulator:** Play Chip-8 games directly in the browser without any installation.
- **Graphical Display:** Renders the Chip-8 display (64x32 pixels) using the HTML `<canvas>` element.
- **Keyboard Input Handling:** Maps Chip-8 keys to the modern keyboard for easy gameplay.
- **Sound Support:** Provides sound effects for games that include audio feedback.
- **Game Loader:** Allows you to load custom Chip-8 ROMs to play.

## Technologies Used
- **JavaScript:** For the core emulator logic and game execution.
- **HTML5 Canvas:** For rendering the Chip-8 graphical output.
- **CSS3:** For styling the emulator interface.

## Project Structure
- **`index.html`**: The main HTML file that structures the emulator interface.
- **`style.css`**: CSS file for styling the page.
- **`chip8.js`**: JavaScript file that contains the emulator logic (fetch, decode, and execute instructions).
- **`roms/`**: A folder containing example Chip-8 ROMs that can be loaded and played.

## How to Run Locally

1. Clone the repository:
   \`\`\`
   git clone https://github.com/Shivanshu97i/chip-8-yen.git
   \`\`\`

2. Open `index.html` in your browser:
   - Simply double-click on the `index.html` file to open it in your default web browser.
   - Alternatively, you can serve the project using a local server (like using [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VSCode).

3. Play the Game:
   - Use your keyboard to control the game. The Chip-8 keys are mapped to modern keyboard keys as shown below.

## Keyboard Controls
The Chip-8 originally used a 16-key hexadecimal keyboard. These have been mapped to the modern keyboard as follows:

| Chip-8 Key | Modern Key |
|------------|------------|
| 1          | 1          |
| 2          | 2          |
| 3          | 3          |
| C          | 4          |
| 4          | Q          |
| 5          | W          |
| 6          | E          |
| D          | R          |
| 7          | A          |
| 8          | S          |
| 9          | D          |
| E          | F          |
| A          | Z          |
| 0          | X          |
| B          | C          |
| F          | V          |

## Games Tested
- **Pumpkindressup**
-  **BLITZ**

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
