
# 🌸 Cute To-Do List 🐰

Welcome to the **cutest To-Do List ever**! 🎀 This app is **playful, colorful, and fully functional** with a frontend, backend, and database integration — perfect for tracking tasks while having fun!

---

## 💖 Features

* Add, edit, delete, and complete tasks ✅
* **Cute emoji priorities**:

  * Low 🍃
  * Medium 🌼
  * High 🌟
* **Due dates** 📅
* **Progress bar** shows your task completion 💪
* **Dark/Light mode toggle** with 🌞 / 🌙
* Online/offline support 🔓🔒 (works even without internet!)
* Local storage fallback for offline use 💾
* Fully responsive design for mobile & desktop 📱💻

---

## 🛠️ Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Frontend   | HTML, CSS, JavaScript (Vanilla)                           |
| Backend    | Node.js, Express.js                                       |
| Database   | MongoDB / LocalStorage (offline fallback)                 |
| Deployment | GitHub Pages 
---

## ⚙️ Architecture

1. **Frontend (`index.html`, `style.css`, `app.js`)**

   * Handles UI, user interactions, dark/light mode, emoji priorities, progress bar, offline/online detection
   * Communicates with backend via REST API (`/tasks`, `/tasks/add`, `/tasks/update/:id`, `/tasks/delete/:id`)

2. **Backend (`server.js`)**

   * Node.js + Express server exposing RESTful endpoints
   * Connects to MongoDB for persistent storage
   * Handles CRUD operations (Create, Read, Update, Delete)

3. **Database (`models/task.js`)**

   * Task schema: `{ text: String, priority: String, dueDate: String, completed: Boolean }`
   * LocalStorage fallback ensures offline usage

---

## 🚀 How to Run Locally

### **1️⃣ Start MongoDB**


# 🟢 Terminal 1
mongosh


### **2️⃣ Start Backend Server**

# 🔵 Terminal 2
cd backend
npm install       # only first time
node server.js


Output should show:


🚀 Server running on http://localhost:5001
✅ MongoDB connected


---

### **3️⃣ Start Frontend**


# 🟣 Terminal 3
cd frontend

live-server


Access in browser: `http://127.0.0.1:5001`

---

### **✅ Summary**

* 🟢 Terminal 1 → MongoDB
* 🔵 Terminal 2 → Backend API
* 🟣 Terminal 3 → Frontend UI

---

## 🔧 API Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/tasks`            | Fetch all tasks     |
| POST   | `/tasks/add`        | Add a new task      |
| PUT    | `/tasks/update/:id` | Update a task by ID |
| DELETE | `/tasks/delete/:id` | Delete a task by ID |

---

## 🎨 Screenshots

![Cute Todo Screenshot]((https://drive.google.com/drive/folders/1DJQaEL-4xieXgoU2XmpbW0iMdCoZ6Ub8?usp=drive_link))

---

## ✨ Usage Tips

* Press **Enter** to quickly add a task
* Toggle **🌞/🌙** for day/night mode
* Click on task **checkbox** to mark complete
* Hover on **buttons** to see playful animations





