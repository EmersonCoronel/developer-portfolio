# Use an official Node.js runtime as a base image (update the version if needed)
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose a port to access your website (e.g., 3000)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
