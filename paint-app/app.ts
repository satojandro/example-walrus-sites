// Define types for our application
type Point = {
    x: number;
    y: number;
};

type DrawingTool = 'brush' | 'line' | 'rectangle' | 'circle' | 'eraser';

// Main Paint Application Class
class PaintApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing: boolean = false;
    private lastPoint: Point | null = null;
    private points: Point[] = [];
    private history: ImageData[] = [];
    private historyIndex: number = -1;
    
    // Tool settings
    private currentColor: string = '#000000';
    private currentSize: number = 5;
    private currentTool: DrawingTool = 'brush';
    private startPoint: Point | null = null;
    
    constructor() {
        // Initialize canvas
        this.canvas = document.getElementById('paint-canvas') as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');
        
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        
        this.ctx = ctx;
        
        // Set canvas size
        this.resizeCanvas();
        
        // Initialize UI elements
        this.initializeUI();
        
        // Add event listeners
        this.addEventListeners();
        
        // Save initial state
        this.saveState();
    }
    
    private resizeCanvas(): void {
        // Set canvas size based on container
        const container = document.querySelector('.canvas-container') as HTMLElement;
        const containerWidth = container.clientWidth;
        
        // Set canvas dimensions
        this.canvas.width = Math.min(containerWidth, 800);
        this.canvas.height = 500;
        
        // Fill with white background
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    private initializeUI(): void {
        // Set up color picker
        const colorPicker = document.getElementById('brush-color') as HTMLInputElement;
        colorPicker.addEventListener('change', (e) => {
            this.currentColor = (e.target as HTMLInputElement).value;
        });
        
        // Set up size slider
        const sizeSlider = document.getElementById('brush-size') as HTMLInputElement;
        const sizeDisplay = document.getElementById('size-display') as HTMLSpanElement;
        
        sizeSlider.addEventListener('input', (e) => {
            this.currentSize = parseInt((e.target as HTMLInputElement).value);
            sizeDisplay.textContent = `${this.currentSize}px`;
        });
        
        // Set up tool selector
        const toolSelect = document.getElementById('tool-select') as HTMLSelectElement;
        toolSelect.addEventListener('change', (e) => {
            this.currentTool = (e.target as HTMLSelectElement).value as DrawingTool;
        });
        
        // Set up clear button
        const clearButton = document.getElementById('clear-canvas') as HTMLButtonElement;
        clearButton.addEventListener('click', () => this.clearCanvas());
        
        // Set up save button
        const saveButton = document.getElementById('save-canvas') as HTMLButtonElement;
        saveButton.addEventListener('click', () => this.saveImage());
    }
    
    private addEventListeners(): void {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('mouseout', () => this.handleMouseUp());
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.handleTouchEnd());
        
        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    private getPointFromEvent(e: MouseEvent | Touch): Point {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    private handleMouseDown(e: MouseEvent): void {
        this.isDrawing = true;
        const point = this.getPointFromEvent(e);
        
        if (this.currentTool === 'brush' || this.currentTool === 'eraser') {
            this.lastPoint = point;
            this.points = [point];
        } else {
            // For shapes, store the starting point
            this.startPoint = point;
        }
    }
    
    private handleMouseMove(e: MouseEvent): void {
        if (!this.isDrawing) return;
        
        const point = this.getPointFromEvent(e);
        
        if (this.currentTool === 'brush' || this.currentTool === 'eraser') {
            if (this.lastPoint) {
                this.drawLine(this.lastPoint, point);
                this.lastPoint = point;
                this.points.push(point);
            }
        } else {
            // For shapes, preview by redrawing from saved state
            if (this.startPoint) {
                this.restoreState();
                this.drawShape(this.startPoint, point);
            }
        }
    }
    
    private handleMouseUp(): void {
        if (!this.isDrawing) return;
        
        if (this.currentTool !== 'brush' && this.currentTool !== 'eraser') {
            // For shapes, finalize the shape
            this.saveState();
        } else if (this.points.length > 0) {
            // For brush/eraser, save state after drawing
            this.saveState();
        }
        
        this.isDrawing = false;
        this.lastPoint = null;
        this.startPoint = null;
        this.points = [];
    }
    
    private handleTouchStart(e: TouchEvent): void {
        e.preventDefault(); // Prevent scrolling
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const point = this.getPointFromEvent(touch);
            
            this.isDrawing = true;
            
            if (this.currentTool === 'brush' || this.currentTool === 'eraser') {
                this.lastPoint = point;
                this.points = [point];
            } else {
                // For shapes, store the starting point
                this.startPoint = point;
            }
        }
    }
    
    private handleTouchMove(e: TouchEvent): void {
        e.preventDefault(); // Prevent scrolling
        if (!this.isDrawing || e.touches.length !== 1) return;
        
        const touch = e.touches[0];
        const point = this.getPointFromEvent(touch);
        
        if (this.currentTool === 'brush' || this.currentTool === 'eraser') {
            if (this.lastPoint) {
                this.drawLine(this.lastPoint, point);
                this.lastPoint = point;
                this.points.push(point);
            }
        } else {
            // For shapes, preview by redrawing from saved state
            if (this.startPoint) {
                this.restoreState();
                this.drawShape(this.startPoint, point);
            }
        }
    }
    
    private handleTouchEnd(): void {
        this.handleMouseUp();
    }
    
    private drawLine(start: Point, end: Point): void {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.strokeStyle = this.currentTool === 'eraser' ? '#ffffff' : this.currentColor;
        this.ctx.lineWidth = this.currentSize;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
    }
    
    private drawShape(start: Point, end: Point): void {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = this.currentSize;
        
        switch (this.currentTool) {
            case 'line':
                this.ctx.moveTo(start.x, start.y);
                this.ctx.lineTo(end.x, end.y);
                break;
                
            case 'rectangle':
                const width = end.x - start.x;
                const height = end.y - start.y;
                this.ctx.rect(start.x, start.y, width, height);
                break;
                
            case 'circle':
                const centerX = (start.x + end.x) / 2;
                const centerY = (start.y + end.y) / 2;
                const radius = Math.sqrt(
                    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
                ) / 2;
                this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                break;
        }
        
        this.ctx.stroke();
    }
    
    private clearCanvas(): void {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.saveState();
    }
    
    private saveState(): void {
        // Remove any states after current index if we've gone back in history
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        // Save current state
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.history.push(imageData);
        this.historyIndex = this.history.length - 1;
        
        // Limit history size to prevent memory issues
        if (this.history.length > 20) {
            this.history.shift();
            this.historyIndex--;
        }
    }
    
    private restoreState(): void {
        if (this.historyIndex >= 0 && this.history.length > 0) {
            const imageData = this.history[this.historyIndex];
            this.ctx.putImageData(imageData, 0, 0);
        }
    }
    
    private saveImage(): void {
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'paint-creation.png';
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PaintApp();
}); 