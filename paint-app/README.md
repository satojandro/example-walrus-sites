# Sui Says

A retro-style drawing application inspired by 90s video games. This interactive canvas allows visitors to leave messages, create pixel art, or simply experiment with different drawing tools in a nostalgic environment.

![Sui Says Screenshot](screenshot.png)

## Features

- **Retro Gaming Aesthetic**: Vibrant colors, pixelated elements, and nostalgic 90s video game style
- **Multiple Drawing Tools**: Brush, Line, Rectangle, Circle, and Eraser
- **Color Selection**: Choose any color for your drawings
- **Adjustable Brush Size**: Change the size of your drawing tools
- **Save Functionality**: Save your creations as PNG images
- **Responsive Design**: Works on both desktop and mobile devices
- **Touch Support**: Draw using touch on mobile devices
- **Pixelated Cursor**: Custom cursor for an authentic retro feel

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- For development: Node.js and TypeScript (optional)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/sui-says.git
   cd sui-says
   ```

2. Open `index.html` in your browser to start using the application.

### Development

If you want to modify the TypeScript code:

1. Install TypeScript if you don't have it:
   ```bash
   npm install -g typescript
   ```

2. Make changes to `app.ts`

3. Compile the TypeScript to JavaScript:
   ```bash
   tsc --target es6 app.ts
   ```

## Deployment

### Option 1: Deploy on Walrus Sites

1. Make sure you have the Sui CLI, Walrus CLI, and Walrus Sites CLI installed and configured
2. Add this site to your `publish-config.yaml`:
   ```yaml
   - name: sui-says
     object_id: "your-object-id"  # You'll get this after creating site on Walrus
     path: ./paint-app
   ```
3. Deploy using the Walrus Sites CLI or the `update_all_sites.py` script

### Option 2: Deploy on Any Web Server

Since this is a simple HTML/CSS/JavaScript application, you can deploy it on any web server:

1. Upload all files to your web server
2. No build step required - it's ready to go!

## How to Use

1. **Select a Tool**: Choose from Brush, Line, Rectangle, Circle, or Eraser
2. **Choose a Color**: Click the color picker to select your drawing color
3. **Adjust Size**: Use the slider to change the size of your drawing tool
4. **Draw**: Click and drag on the canvas to draw
5. **Clear Canvas**: Click the "CLEAR" button to start over
6. **Save**: Click "SAVE" to download your creation as a PNG file

## Design Elements

The application features several retro gaming design elements:
- **Pixel Font**: Uses the "Press Start 2P" font for authentic 8-bit typography
- **Vibrant Colors**: Neon pink and blue color scheme reminiscent of arcade games
- **Pixelated Decorations**: Corner elements and dividers with pixel-perfect styling
- **Animated Elements**: Glowing text effects and pulsing icons
- **Grid Background**: Subtle grid pattern reminiscent of graph paper or early digital interfaces

## Customization

You can easily customize this application by:

- Modifying the color scheme in `styles.css`
- Adding new drawing tools in the TypeScript code
- Changing the canvas size or layout
- Adjusting the pixel decorations for different retro styles

## Future Enhancements

Potential improvements:
- Undo/Redo functionality
- Pixel-perfect drawing mode
- Sprite creation tools
- Animated GIF export
- Retro sound effects
- 8-bit music background option

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with TypeScript and HTML5 Canvas
- Created for the Walrus Sites platform
- Pixel font "Press Start 2P" from Google Fonts
- Made by AVB ❤️ | [@avbnear](https://twitter.com/avbnear) 