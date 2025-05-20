# Stage 1: Build the Go app
FROM golang:1.23-alpine AS builder

# Install build dependencies
RUN apk add --no-cache gcc musl-dev sqlite-dev

# Set working directory inside the container
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

# Install SQLite library
RUN apk --no-cache add sqlite sqlite-libs

# Set the working directory
WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/app .

# Expose the port your Go backend listens on
EXPOSE 8080

# Start the app
CMD ["./app"]