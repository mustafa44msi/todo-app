# 📝 Task Management App (To-Do List)

This is a full-stack task management (to-do list) application built with Node.js, Express, MongoDB, and Electron. It provides a simple interface to create, edit, mark, and delete tasks. Tasks are saved in a MongoDB database and displayed in reverse chronological order (newest first).

## 🚀 Features

- Add new tasks
- Edit existing tasks (via modal)
- Mark tasks as completed
- Delete tasks
- Sort tasks by creation time (newest to oldest)
- Tasks stored in MongoDB
- Desktop app support with **Electron**
- Auto-reloading during development with **Nodemon**

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Desktop App**: Electron
- **Development Tools**: Nodemon

---

## 📦 Installation & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### 2.Install Dependencies

```bash
npm install
```

### 3.Setup Environment Variables
Create a .env file in the root directory:

```.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3000
```

### 4. Run the App in Development Mode (with Nodemon)

```bash
npm run dev
```
This starts the backend server with auto-reloading using nodemon.

### 5. Start Electron (for Desktop App)

```bash
npm start
```
This opens the to-do app in a native desktop window using Electron.





