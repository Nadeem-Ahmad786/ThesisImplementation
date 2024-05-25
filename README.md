## Social Media Short Video App APIs

This repository contains the APIs developed for enhancing content filtering and personalization in social media short video applications. These APIs provide functionalities for uploading videos with age and tag metadata, fetching and filtering videos based on user preferences, updating tag counts based on user activity, and managing blocked tags.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [APIs](#apis)
  - [Video Upload API](#video-upload-api)
  - [Fetch Single Video API](#fetch-single-video-api)
  - [Fetch Current User Videos API](#fetch-current-user-videos-api)
  - [Filter Videos API](#filter-videos-api)
  - [Watch Video API](#watch-video-api)
  - [Block Tag API](#block-tag-api)
  - [Recently Watched Tags API](#recently-watched-tags-api)
  - [Fetch All Videos API](#fetch-all-videos-api)
- [Setup](#setup)
- [Usage](#usage)
- [Future Work](#future-work)
- [Contributing](#contributing)

## Introduction

This project aims to enhance the user experience in social media short video applications by providing age- and tag-specific content filtering. By leveraging metadata such as age and tags, these APIs help deliver personalized content to users, ensuring they see only relevant and appropriate videos.

## Features

- Upload videos with age and tag metadata
- Fetch and filter videos based on age range and tags
- Update user's tag counts based on watched videos
- Manage blocked tags to exclude unwanted content
- Retrieve most recently watched tags
- Fetch all videos in the system

## System Architecture

The system is built using a microservices architecture to ensure scalability and flexibility. MongoDB is used for data storage due to its ability to handle unstructured data efficiently. Node.js and Express.js are used for handling API requests and responses.

## Technologies Used

- **MongoDB**: Database for storing video metadata and user preferences
- **Node.js**: JavaScript runtime for building the server-side application
- **Express.js**: Web framework for handling API requests and routing

## APIs

### Video Upload API

**Endpoint**: `/api/videos/upload`

**Method**: `POST`

**Description**: Uploads a video with age and tag metadata and updates the user's video list.

### Fetch Single Video API

**Endpoint**: `/api/videos/:id`

**Method**: `GET`

**Description**: Retrieves a single video by its ID.

### Fetch Current User Videos API

**Endpoint**: `/api/videos/currentUser`

**Method**: `GET`

**Description**: Retrieves all videos uploaded by the current user.

### Filter Videos API

**Endpoint**: `/api/videos/filter`

**Method**: `POST`

**Description**: Filters videos based on age range and tags, excluding blocked tags.

### Watch Video API

**Endpoint**: `/api/videos/watch/:videoId`

**Method**: `GET`

**Description**: Updates the user's tag count for the watched video.

### Block Tag API

**Endpoint**: `/api/videos/block-tag`

**Method**: `POST`

**Description**: Blocks a specific tag, preventing content with that tag from appearing in the user's feed.

### Recently Watched Tags API

**Endpoint**: `/api/videos/recent-tags`

**Method**: `GET`

**Description**: Retrieves the user's most recently watched tags.

## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Nadeem-Ahmad786/ThesisImplementation.git
    cd ThesisImplementation
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your MongoDB connection string and other necessary environment variables.
    
    Example:
    ```
    MONGODB_URI=mongodb://localhost:27017/ThesisDB
    PORT=3000
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

## Usage

- Use Postman or any other API client to test the endpoints.
- Refer to the [APIs](#apis) section for details on each API's endpoint, method, and description.

## Future Work

Future enhancements include:

- **Machine Learning Integration**: Implementing algorithms to analyze user preferences and improve content recommendations.
- **User Interface Development**: Creating intuitive interfaces for content creators and viewers to interact with the system.
- **Enhanced Security Measures**: Implementing stronger authentication and authorization protocols.
- **Parent-Child Account Linkage**: Connecting parent and child accounts to allow parents to monitor and control their child's content consumption.

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests.


This README provides a comprehensive overview of your project, guiding users on setup, usage, and future improvements.
