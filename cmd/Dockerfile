# Stage 1: Build the Go app
FROM golang:1.23-alpine AS builder

# Install build dependencies
RUN apk add --no-cache gcc musl-dev sqlite-dev

# Set working directory
WORKDIR /app

# Copy all files into the container
COPY . .

# Download Go dependencies
RUN go mod download

# Build the Go app with CGO enabled
RUN CGO_ENABLED=1 GOOS=linux go build -o app ./cmd

# -------------------------------------------------------------

# Stage 2: Run the app using a lightweight image
FROM alpine:latest

# Install SQLite runtime
RUN apk --no-cache add sqlite sqlite-libs

# Set working directory
WORKDIR /app

# Ensure data directory exists
RUN mkdir -p /app/data

# Copy compiled binary from builder stage
COPY --from=builder /app/app .
COPY --from=builder /app/internal /app/internal

# Optional: Copy static files, configs, templates, etc. if used
# COPY --from=builder /app/templates /app/templates

# Expose port
EXPOSE 8080

# Start the app
CMD ["./app"]
