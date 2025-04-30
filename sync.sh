#!/bin/bash

set -e

REMOTE_NAME="hackbg"
SOURCE_BRANCH="feat/delegate"
TARGET_BRANCH="feat/delegate-view"
TMP_DIR=".tmp_delegate_sync"

# Ensure we're on the correct branch
echo "Switching to branch $TARGET_BRANCH..."
git checkout "$TARGET_BRANCH"

# Fetch latest from remote
echo "Fetching latest from $REMOTE_NAME..."
git fetch "$REMOTE_NAME"

# Clean up old temp dir if exists
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

# Export updated contents
echo "Exporting updated files from $REMOTE_NAME/$SOURCE_BRANCH..."
git archive "$REMOTE_NAME/$SOURCE_BRANCH" | tar -x -C "$TMP_DIR"

# Copy files into repo root
cp -r "$TMP_DIR"/* .

# Clean up
rm -rf "$TMP_DIR"

# Stage and commit if there are changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Changes detected. Staging and committing..."
  git add .
  git commit -m "fix: adjusted step 2 and 4"
  echo "✅ Sync complete."
else
  echo "No changes detected. Nothing to commit."
fi
