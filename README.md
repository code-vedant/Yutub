# YUTUB V2.0 : The Content Hub

## Introduction

V2.0 : The site comes with features of watching videos, photos and posts by various content creator with also give ability to you to be one. THE CONTENT HUB. The frontend caters all the necessory features and accessiblity for the user to have a better experience while the backend handle all the requests with custom apis and routes.

V1.0 :Yutub is my first full-stack web development project, and I have been working on it for a couple of months.
The frontend design is inspired by the YouTube website.The backend of Yutub is based on the YT backend learning series by Channel Chai aur Code, taught by Hitesh Chaudhary. I have made some upgrades and added additional functions to enhance its capabilities.

## Technologies Used

- **Frontend:** React, Axios, React icons
- **Backend:** Node.js, Mongoose, Multer
- **Cloud Storage:** Cloudinary
- **Full-Stack:** MERN (MongoDB, Express, React, Node.js)
- **Authentication:** JWT (JSON Web Tokens)

## Difference Between V1.0 and V2.0

| Feature/Aspect         | V1.0                                                                 | V2.0                                                                 |
|------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|
| **Project Scope**      | Basic video-sharing platform inspired by YouTube                     | Full content hub with videos, photos, and posts                     |
| **User Roles**         | Primarily consumer of content                                        | Both content consumers and creators                                 |
| **Frontend Design**    | Inspired by YouTube, basic features                                  | Improved accessibility and UI/UX                                    |
| **Media Types**        | Only videos                                                          | Videos, photos, and text posts                                      |
| **Backend**            | Based on *Chai aur Code* tutorial (YT clone)                         | Custom APIs and routes built top of v1                              |
| **Functionality**      | CRUD operations for videos                                           | Extended to handle multi-content types and user-generated content   |
| **Cloud Storage**      | Basic Cloudinary usage                                               | Structured and optimized Cloudinary usage for multiple content types|
| **Custom Features**    | Basic video upload and watch features                                | Full studio/dashboard, content tabs, post creation features         |


## Environment Setup

### `.env` File

#### Backend

Create a `.env` file inside the `backend/` folder with the following variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=""
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=expiry_time
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file inside the `frontend/` folder with the following variables:

```env
VITE_API_URL=http://localhost:8000/api/v1
```


