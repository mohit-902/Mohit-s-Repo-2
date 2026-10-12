# Mohit Rajpurohit - Professional Portfolio Website

A modern, high-performance personal portfolio website built with clean HTML5, CSS3, and vanilla JavaScript. Designed specifically for **Mohit Rajpurohit**, 1st-year B.Tech Electronics & Communication Engineering (ECE) student at JECRC University, Jaipur.

---

## 🌟 Key Highlights & Design System

- **Sophisticated Aesthetics:** Dark navy/charcoal background (`#060a14`) with electric blue (`#2563eb`) and cyan (`#38bdf8`) accents, subtle ambient glows, and glassmorphic card surfaces.
- **Fully Responsive:** Adapts seamlessly across desktop, tablet, and mobile displays with an accessible drawer menu.
- **Zero Build Step:** 100% vanilla web technology. Opens instantly in any browser without needing `npm`, Node.js, or complex compilation.
- **Interactive Profile Photo:** Includes a modern embedded SVG avatar with an in-browser photo upload button that lets you preview your real photo immediately and save it in `localStorage`.
- **Integrated AI Chatbot:** Embedded Botpress AI conversational assistant to answer questions from visitors in real time.
- **Functional Contact & Clipboard Actions:** Direct "Send Email" action with pre-formatted fields, one-click "Copy Email" button with toast notification, and external profile links with `rel="noopener noreferrer"`.
- **Easy to Update:** Cleanly commented code structure that allows you to add new projects, skills, and certifications in minutes.

---

## 📁 Project Structure

```
Mohit Rajpurohit's Portfolio/
├── index.html                   # Main semantic markup
├── css/
│   └── style.css                # Custom CSS design system & responsive styling
├── js/
│   └── main.js                  # Vanilla JS logic (nav, active spy, uploader, copy, toasts)
├── assets/
│   ├── favicon.svg              # Custom modern monogram favicon (MR)
│   └── avatar-placeholder.svg   # Tech-inspired glowing avatar placeholder
└── README.md                    # Documentation & customization guide
```

---

## 🚀 How to View Locally

1. **Direct Browser Launch:**
   - Simply double-click `index.html` in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox**.
2. **Using VS Code Live Server (Optional):**
   - If using VS Code, install the **Live Server** extension, right-click `index.html`, and click **Open with Live Server**.

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

Since your GitHub profile is [github.com/mohit-902](https://github.com/mohit-902), you can host this website online for free in under 2 minutes:

1. Create a new repository named `mohit-902.github.io` (or `portfolio`) on GitHub.
2. Push all files from this folder into the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of professional portfolio"
   git branch -M main
   git remote add origin https://github.com/mohit-902/portfolio.git
   git push -u origin main
   ```
3. Go to **Repository Settings > Pages**.
4. Under **Branch**, select `main` and `/root`, then click **Save**.
5. Your portfolio will be live at `https://mohit-902.github.io/portfolio`!

---

## ✏️ How to Update Sections

### 1. Adding a Permanent Real Profile Photo
- Put your photo in the `assets/` folder (for example, named `profile.jpg`).
- In `index.html` (around line 170), change:
  ```html
  <img id="profile-img" class="photo-img" src="assets/avatar-placeholder.svg" alt="...">
  ```
  to:
  ```html
  <img id="profile-img" class="photo-img" src="assets/profile.jpg" alt="...">
  ```
- *Tip: You can also use the "Upload Photo" button right on the live website to preview your picture instantly!*

### 2. Adding New Projects
- Open `index.html` and scroll to the `<section id="projects">` section.
- Duplicate any `<article class="project-card">` block and update the title, description, tech tags, and GitHub repository links.

### 3. Adding New Skills & Certifications
- In `index.html`, scroll to `<section id="skills">` or `<section id="certifications">`.
- Copy any `<div class="skill-chip">` or `<div class="cert-card">` element and fill in your new skills or certificates.

---

## 📬 Contact & Profiles

- **Email:** [mohitrajpurohit460@gmail.com](mailto:mohitrajpurohit460@gmail.com)
- **GitHub:** [https://github.com/mohit-902](https://github.com/mohit-902)
- **LinkedIn:** [https://www.linkedin.com/in/mohit-rajpurohit-25741a421](https://www.linkedin.com/in/mohit-rajpurohit-25741a421)
- **Location:** Jodhpur, India | Studying in Jaipur, Rajasthan
