#!/bin/bash

# xbar GitHub PR Status Script Installation

# Check arguments
if [ $# -eq 0 ]; then
    echo "Error: GitHub token not specified"
    echo "Usage: $0 <github_token>"
    exit 1
fi

GITHUB_TOKEN="$1"

# Default xbar plugin directory path
XBAR_PLUGIN_DIR="$HOME/Library/Application Support/xbar/plugins"

# Script filename
SCRIPT_NAME="github.10m.ts"

# Check and create plugin directory
if [ ! -d "$XBAR_PLUGIN_DIR" ]; then
    echo "xbar plugin directory not found: $XBAR_PLUGIN_DIR"
    echo "Creating directory..."
    mkdir -p "$XBAR_PLUGIN_DIR"
    if [ $? -eq 0 ]; then
        echo "✓ Directory created: $XBAR_PLUGIN_DIR"
    else
        echo "Error: Failed to create directory"
        exit 1
    fi
fi

# Download script from GitHub
echo "Downloading GitHub PR Status script..."
curl -L -o "$XBAR_PLUGIN_DIR/$SCRIPT_NAME" "https://raw.githubusercontent.com/haradakunihiko/xbar/main/src/github.10m.ts"

# Check download success
if [ $? -eq 0 ]; then
    # Make executable
    chmod +x "$XBAR_PLUGIN_DIR/$SCRIPT_NAME"
    
    # Create vars.json file
    VARS_FILE="$XBAR_PLUGIN_DIR/${SCRIPT_NAME}.vars.json"
    echo "{" > "$VARS_FILE"
    echo "    \"VAR_GITHUB_TOKEN\": \"$GITHUB_TOKEN\"" >> "$VARS_FILE"
    echo "}" >> "$VARS_FILE"
    
    echo "✓ Installation complete: $XBAR_PLUGIN_DIR/$SCRIPT_NAME"
    echo "✓ Configuration file created: $VARS_FILE"
    echo ""
    echo "Next steps:"
    echo "1. Restart xbar"
    echo "2. Check for the new icon in your menu bar"
else
    echo "Error: Failed to download script"
    exit 1
fi
