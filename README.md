# 💸 BrokeWho?

**BrokeWho?** is a full-stack expense tracking application that helps users track their spending, visualize expenses, and receive automated monthly email reports — all with secure authentication and user-controlled preferences.

---

## ✨ Features

* 🔐 User authentication with email verification
* 💰 Add, view, and delete expenses
* 📊 Interactive dashboard with expense analytics and pie chart
* ⬇️ Download expense charts as images
* ✉️ Automated monthly email expense reports (opt-in)
* 🌓 Light / Dark mode with persistent theme preference
* ⚙️ User preferences onboarding flow

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript
* Chart.js

### Backend

* Node.js
* Express.js
* SQLite
* JWT Authentication
* Nodemailer
* Node-Cron

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/nimbus-31/BrokeWho.git
cd BrokeWho
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

### 4️⃣ Start the server

```bash
node server.js
```

Visit the app at:

```
http://localhost:3001
```

---

## 📬 Monthly Email Reports

* Emails are sent automatically on the *1st of every month*
* Users can opt in or out during onboarding
* Each email includes:

  * Monthly expense summary
  * Attached expense chart image

---

## 📂 Project Structure

```
├── controllers
├── routes
├── middleware
├── services
├── cron
├── config
├── public
├── server.js
└── README.md
```

---

## 🧠 Future Improvements

* CSV export functionality
* Edit preferences page
* Budget limits and spending alerts
* Cloud deployment (Render / Railway)

---

## 👤 Author

Built with ❤️ by Nimbus
