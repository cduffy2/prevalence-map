# VSCode MCP Configuration

## Setup Instructions

The `mcp.json` file contains local configuration for the Figma MCP server and is not committed to git because it contains your personal Figma access token.

### First-time Setup

1. Copy the template file:
   ```bash
   cp .vscode/mcp.json.template .vscode/mcp.json
   ```

2. Edit `.vscode/mcp.json` and replace `YOUR_FIGMA_TOKEN_HERE` with your actual Figma access token

3. The token is also stored in the `.env` file at the project root for use by the application

### Getting a Figma Access Token

1. Go to your Figma account settings
2. Navigate to the "Personal access tokens" section
3. Generate a new token with appropriate permissions
4. Copy the token and update both `.env` and `.vscode/mcp.json`

**Note:** Never commit `.env` or `.vscode/mcp.json` to git - they are both in `.gitignore` to prevent accidental token exposure.
