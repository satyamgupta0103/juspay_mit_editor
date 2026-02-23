# Scratch-Like Animation Editor 🎯

A mini Scratch-style visual programming interface built with **React + Redux Toolkit**, where users can drag-and-drop blocks to control sprite animations.

---

## 🚀 Live Demo

👉 https://scratch-starter-project-five.vercel.app

---

## 📂 GitHub Repository

👉 https://github.com/satyamgupta0103/juspay_mit_editor

---

## ✨ Features Implemented

### 🟦 Motion Animations

- **Move _n_ steps** (supports positive & negative movement)
- **Turn _n_ degrees**
- **Go to (x, y)** position
- **Repeat animation** block

### 🟪 Looks Animations

- **Say “message” for _n_ seconds**
- **Think “message” for _n_ seconds**

### 🐱 Multiple Sprites Support

- Add multiple sprites dynamically
- Each sprite maintains its **own instruction set**
- Select a sprite to edit its behavior independently
- **Play button runs all sprites simultaneously**

### ⭐ Hero Feature — Collision-Based Animation Swap

When two sprites collide:

- Their animation programs are swapped dynamically

**Example:**

- Sprite A → Move 50 steps
- Sprite B → Move -50 steps
- After collision → behaviors exchange

---

## 🧠 Architecture Overview

The project is structured to simulate a **mini visual programming engine**:

src/
├── components/ → UI (Sidebar, Stage, Sprites)
├── store/ → Redux Toolkit state management
├── engine/ → Interpreter + animation runner
├── hooks/ → Drag & Drop logic
├── blocks/ → Block definitions

### Key Concepts:

- Redux manages sprite state & instruction queues
- Drag-and-drop powered by `react-dnd`
- Custom animation interpreter using `requestAnimationFrame`
- Collision detection triggers runtime behavior swapping

---

## 🛠️ Tech Stack

- React (Functional Components + Hooks)
- Redux Toolkit (State Management)
- React-DnD (Drag & Drop)
- TailwindCSS (Styling)
- Custom Webpack Build (No CRA)
- Vercel (Deployment)

---

## 📦 Getting Started Locally

### 1️⃣ Install Dependencies

npm install

### 2️⃣ Start Development Server

npm start

Open in browser:

http://localhost:3000

### 🏗️ Production Build

npm run build

Build output is generated in the dist/ folder.

### 🎮 How to Use

1. Drag blocks from the Sidebar into the Program Area
2. Select a sprite to assign actions
3. Add multiple sprites if needed
4. Click Play ▶ to execute animations
5. Watch behaviors change when sprites collide

### 📌 Notes

Only the animations specified in the assignment were implemented.

No external animation libraries were used — all animations are custom-built.

Designed to prioritize clarity of architecture and execution model.

### 👨‍💻 Author

Satyam Gupta
