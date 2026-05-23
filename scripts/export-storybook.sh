#!/bin/bash
# Script per esportare la build statica di Storybook in simonegentili.com

# Costanti
STORYBOOK_DIR="storybook-static"
DEST_DIR="../simonegentili.com/public/storybook"

# Build Storybook
npm run build-storybook

# Crea la cartella di destinazione se non esiste
mkdir -p "$DEST_DIR"

# Copia la build statica
cp -r "$STORYBOOK_DIR"/* "$DEST_DIR"/

echo "Storybook esportato in $DEST_DIR"
