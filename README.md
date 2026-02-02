# 🚀 Task Manager with GSAP Animations

A responsive, high-performance task management application built with Vanilla JavaScript. This project features a custom-built "Sync Slide" animation system that handles complex DOM transitions seamlessly without relying on heavy frameworks.

![Application Demo](path/to/your-demo.gif)

## ✨ Key Features

* **Smart Animations:** Tasks physically "fly" from the Pending list to the Completed list using a custom FLIP-style animation technique.
* **Dual-Mode Logic:**
    * *Instant Mode:* Adds and deletes tasks immediately for snappy performance.
    * *Cinematic Mode:* Delays data updates during task completion to allow for visual transitions.
* **Persistent State:** Uses `localStorage` to save your tasks and completion status between sessions.
* **Glassmorphism UI:** Modern styling with backdrop filters and SVG path animations.
* **Responsive Scrolling:** Custom scroll logic ensures the input field remains accessible while lists expand.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3, JavaScript (ES6+)
* **Animation:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
* **Styling:** Bootstrap 5 (Grid/Utilities) + Custom CSS
* **Icons:** Lucide Icons (SVG)

## 🧠 Logic & Architecture

The application uses a specific architectural pattern to handle the "Chicken and Egg" problem of animating elements that are being deleted from the DOM:

1.  **Ghost Element Strategy:** When checking a task, the app constructs a temporary "Ghost" element manually.
2.  **Timeline Synchronization:** A GSAP Timeline synchronizes the exit animation of the active task with the entrance animation of the ghost task.
3.  **Deferred Data Update:** The actual array manipulation and LocalStorage update occur inside the `onComplete` callback, ensuring the visual experience never breaks the data integrity.

## 📦 How to Run

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Yousef19-dev/Task-Manager-GSAP.git](https://github.com/Yousef19-dev/Task-Manager-GSAP.git)
    ```
2.  Open `index.html` in your browser.
3.  Start adding tasks!

---
*Developed by [Yousef](https://github.com/Yousef19-dev)*