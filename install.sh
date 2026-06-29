#!/bin/bash

# xbar GitHub PR Status Script Installation

# Default xbar plugin directory path
XBAR_PLUGIN_DIR="$HOME/Library/Application Support/xbar/plugins"

# Script filename
SCRIPT_NAME="github.10m.ts"

# Check GitHub CLI (gh) is installed
if ! command -v gh >/dev/null 2>&1; then
    echo "Error: GitHub CLI (gh) is not installed"
    echo "Install it first, e.g.: brew install gh"
    exit 1
fi

# Check gh is authenticated
if ! gh auth status >/dev/null 2>&1; then
    echo "Error: GitHub CLI (gh) is not authenticated"
    echo "Run the following and try again: gh auth login"
    exit 1
fi

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

    echo "✓ Installation complete: $XBAR_PLUGIN_DIR/$SCRIPT_NAME"
    echo ""
    echo "Next steps:"
    echo "1. Restart xbar"
    echo "2. Check for the new icon in your menu bar"
else
    echo "Error: Failed to download script"
    exit 1
fi
