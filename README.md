# Wanderlust

Wanderlust is a full-stack Airbnb clone—crafted to simulate a real-world property rental platform. Users can browse listings, register accounts, publish rental properties, and manage bookings.

# Live Demo
Access the working demo here: https://wanderlust-u5yy.onrender.com

# Features

View, search, and filter property listings
User authentication (sign up, login)
Create, edit, or delete rental listings
Booking workflow and management
Clean UI using EJS templating and CSS.

# Tech Stack

- **Backend**: Node.js + Express.js.
- **Frontend**: EJS for templating, HTML, CSS.
- **Database**: (Assumed) MongoDB (via Mongoose).
- **Project Structure**: Organized into controllers, routes, models, views, utils, and config files (`schema.js`, `cloudconfig.js`, `middleware.js`).

# Project Structure

- ├── controllers/      # Request handlers
- ├── models/            # Database schemas/models
├── routes/            # API and view routes
├── views/             # EJS templates
├── public/            # Static assets (CSS, JS)
├── utils/             # Helper utilities
├── app.js             # Application entry point
├── schema.js          # Data models/schema definitions
├── middleware.js      # Custom middleware
├── cloudconfig.js     # Cloud service configuration (e.g., uploads)
├── package.json
└── README.md
