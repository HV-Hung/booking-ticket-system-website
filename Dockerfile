# Use the official Node.js image as the base image
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package.json .

# Install the project dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

ARG VITE_BACKEND_URL

# Use ARG in the build process (e.g., in your application code)
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
# Build the React app using Vite
RUN yarn build

# Use the official Nginx image as the base image for the final stage
FROM nginx:alpine

# Copy the Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built files from the builder stage to the nginx container
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the container's port (default for Nginx is 80)
EXPOSE 80

# Start the Nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]