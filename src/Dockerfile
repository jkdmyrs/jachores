# Use the official Node 18 image as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the local package.json and package-lock.json files to the container's working directory
COPY server/server.js local.settings.json ./

# Inform Docker that the container listens on port 80 at runtime
EXPOSE 80

# Command to run when the container starts
CMD [ "node", "server.js" ]
