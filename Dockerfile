# Stage 1: Development
FROM node:16-alpine as development

# Create app directory
WORKDIR /app

# Copy package files and prisma directory
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy node modules and package files
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package*.json ./

# Copy the built app and other necessary files
COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma
COPY --from=development /app/tsconfig.json ./tsconfig.json
COPY --from=development /app/nodemon.json ./nodemon.json

# Expose the port your app will run on
EXPOSE 5000

# Run the app
CMD [ "npm", "run", "dev:migrate:dev"]
