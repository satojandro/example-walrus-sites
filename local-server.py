#!/usr/bin/env python3
"""
Simple HTTP Server for previewing Walrus Sites locally.
Run this script from the root directory of your project.
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse, parse_qs
import sys

# Configuration
PORT = 8000
DIRECTORY = os.getcwd()  # Current directory

class WalrusSitesHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler for serving Walrus Sites with proper MIME types."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def do_GET(self):
        """Handle GET requests with special handling for root path."""
        parsed_path = urlparse(self.path)
        
        # If accessing root, show a directory listing with links to sites
        if parsed_path.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            # Get all directories that could be sites
            site_dirs = [d for d in os.listdir(DIRECTORY) 
                        if os.path.isdir(os.path.join(DIRECTORY, d)) and 
                        not d.startswith('.')]
            
            # Create HTML for the directory listing
            html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Walrus Sites Local Preview</title>
                <style>
                    body {{
                        font-family: 'Press Start 2P', system-ui, -apple-system, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #120458;
                        color: white;
                    }}
                    h1 {{
                        color: #ff00a0;
                        text-align: center;
                        margin-bottom: 30px;
                        text-shadow: 3px 3px 0 #000;
                    }}
                    .sites {{
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 20px;
                    }}
                    .site-card {{
                        background-color: #2a0f82;
                        border: 4px solid #000;
                        box-shadow: 0 0 0 4px #ff00a0, 0 0 0 8px #00b3ff;
                        padding: 15px;
                        border-radius: 8px;
                        text-align: center;
                        transition: transform 0.2s;
                    }}
                    .site-card:hover {{
                        transform: translateY(-5px);
                    }}
                    a {{
                        color: #00b3ff;
                        text-decoration: none;
                        display: block;
                        padding: 10px;
                        font-weight: bold;
                    }}
                    a:hover {{
                        color: #ff00a0;
                    }}
                    .footer {{
                        margin-top: 40px;
                        text-align: center;
                        font-size: 0.8em;
                        border-top: 2px solid #ff00a0;
                        padding-top: 20px;
                    }}
                </style>
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
            </head>
            <body>
                <h1>Walrus Sites Local Preview</h1>
                <div class="sites">
            """
            
            # Add each site directory as a card
            for site in site_dirs:
                site_path = f"/{site}/"
                html += f"""
                    <div class="site-card">
                        <a href="{site_path}">{site}</a>
                    </div>
                """
            
            html += """
                </div>
                <div class="footer">
                    Local preview server for Walrus Sites development
                </div>
            </body>
            </html>
            """
            
            self.wfile.write(html.encode())
            return
        
        # Otherwise, serve files normally
        return super().do_GET()

def run_server():
    """Run the HTTP server and open the browser."""
    handler = WalrusSitesHandler
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        
        # Open browser automatically
        webbrowser.open(f"http://localhost:{PORT}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped by user")
            httpd.server_close()

if __name__ == "__main__":
    run_server() 