# Use official Bun image for Node.js + Bun
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the project files
COPY . .

# Build TypeScript (if needed)
RUN bun run tsc

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start the backend (adjust entrypoint if needed)
CMD ["bun", "run", "start"]
