#!/bin/bash

# This script is used to initialize the k8s environment for the application.

# Exit immediately if a command exits with a non-zero status.
set -e

# Get the project name
project_name=$(basename "$(cd .. && pwd)")
export project_name

# Create the namespace for the application
kubectl create namespace "${project_name}-develop" || { echo "Error creating ${project_name}-develop namespace"; exit 1; }
kubectl create namespace "${project_name}-qa" || { echo "Error creating ${project_name}-qa namespace"; exit 1; }

# Get the username and token for the bot account
echo "Enter the username for the bot account: " && read -r BOT_USERNAME && export BOT_USERNAME
echo "Enter the token for the bot account: " && read -rs BOT_TOKEN && export BOT_TOKEN

# Create the secret for the application
kubectl create secret docker-registry gitlab-registry --docker-server=https://registry.gitlab.com --docker-username="${BOT_USERNAME}" --docker-password="${BOT_TOKEN}" --docker-email="${BOT_USERNAME}"@noreply.gitlab.com -n "${project_name}-develop" || { echo "Error creating secret for ${project_name}-develop namespace"; exit 1; }
kubectl create secret docker-registry gitlab-registry --docker-server=https://registry.gitlab.com --docker-username="${BOT_USERNAME}" --docker-password="${BOT_TOKEN}" --docker-email="${BOT_USERNAME}"@noreply.gitlab.com -n "${project_name}-qa" || { echo "Error creating secret for ${project_name}-qa namespace"; exit 1; }

# Clean up

unset project_name
unset BOT_USERNAME
unset BOT_TOKEN

echo "Done!"
