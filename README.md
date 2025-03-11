# Walrus Sites Examples

This repository contains example sites for deployment on the Walrus Sites platform, a decentralized web hosting solution built on the Sui blockchain.

## Projects

- **Sui Says**: A retro-style drawing application inspired by 90s video games
- **Walrus Game**: A simple snake game
- **Capacity**: A capacity planning tool
- **Publish**: A publishing tool

## Local Development

### Preview Sites Locally

To preview your sites locally before deploying to the Sui blockchain, you can use the included local server:

```bash
# Run the local preview server
./local-server.py
```

This will:
1. Start a local HTTP server on port 8000
2. Open your default web browser to http://localhost:8000
3. Show a directory of all available sites
4. Allow you to navigate and test each site

### Making Changes

1. Make changes to your site files
2. Refresh your browser to see the changes
3. Once satisfied, deploy to Walrus Sites

## Deployment

To deploy your sites to Walrus Sites:

1. Make sure you have the Sui CLI, Walrus CLI, and Walrus Sites CLI installed and configured
2. Update the `publish-config.yaml` file with your site information:
   ```yaml
   - name: your-site-name
     object_id: "your-object-id"  # You'll get this after creating site on Walrus
     path: ./your-site-directory
   ```
3. Deploy using the Walrus Sites CLI or the `update_all_sites.py` script

## Requirements

- Python 3.6+ (for local preview server)
- Modern web browser
- Sui CLI (for deployment)
- Walrus CLI (for deployment)
- Walrus Sites CLI (for deployment)

## License

Each project may have its own license. Please check individual project directories for license information.
