# Use an official Node.js runtime as a parent image
FROM node:18.12.1

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Make the app's port available to the host machine
EXPOSE 5002

# Start the app
CMD ["npm", "start"]
