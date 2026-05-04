# 🌍 Wanderlust - Travel Listing App

**Wanderlust** is a full-stack web application designed for travelers to discover, list, and review unique accommodations around the world. Built with the **MVC (Model-View-Controller)** architecture, it features secure authentication, image hosting, and interactive map integration.

---

## 🚀 Live Demo
Check out the live project here: [Wanderlust on Render](https://wanderlust-your-app-name.onrender.com)

---

## ✨ Features

* **User Authentication:** Secure Sign-up and Login using `Passport.js`.
* **Listing Management:** Full CRUD (Create, Read, Update, Delete) functionality for travel listings.
* **Review System:** Users can leave ratings and comments on listings.
* **Image Uploads:** Integrated with **Cloudinary** for cloud-based image storage.
* **Map Integration:** Interactive location visualization using **Mapbox API**.
* **Responsive UI:** Styled with **Bootstrap 5** for a seamless experience on mobile, tablet, and desktop.
* **Error Handling:** Custom error handling and flash messages for a better user experience.

---

## 🛠️ Tech Stack

| Category | Tools |
| :--- | :--- |
| **Frontend** | EJS (Embedded JavaScript), Bootstrap 5, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **Authentication** | Passport.js |
| **Storage** | Cloudinary |
| **Maps** | Mapbox GL JS |

---

## ⚙️ Local Setup

To run this project locally, follow these steps:

### 1. Clone the Repository
git clone [https://github.com/Vikasjoshi008/wanderlust.git](https://github.com/Vikasjoshi008/wanderlust.git)
cd wanderlust

### 2. Install Dependencies
npm install

### 3. Environment Variables
Create a .env file in the root directory and add your credentials:

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAPBOX_TOKEN=your_mapbox_public_token
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key

### 4. Run the App
node app.js
The app will be available at http://localhost:8080.

### 🔧 Deployment & Troubleshooting (Render)

If you encounter the querySrv ENOTFOUND error while deploying to Render:

Whitelist IP: Go to MongoDB Atlas > Network Access > Add IP Address > 0.0.0.0/0 (Allow all).

Verify Secrets: Ensure your ATLASDB_URL is correctly pasted into Render's Environment Variables tab.

Password Encoding: If your DB password contains special characters (like @), encode them (e.g., @ becomes %40).

### 🤝 Contributing
Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

### 📄 License
This project is licensed under the MIT License.

Made with ❤️ by Vikas Joshi  