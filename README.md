<div align="center">

![English Janala Banner](https://capsule-render.vercel.app/api?type=waving&color=0:0a1628,50:0f3460,100:16213e&height=200&section=header&text=English%20Janala&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Interactive%20English%20Vocabulary%20Learning%20Platform&descAlignY=58&descSize=18&descColor=38bdf8&animation=fadeIn)

</div>

<div align="center">

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-0ea5e9?style=for-the-badge&logoColor=white)](https://english-janala-azure.vercel.app)
[![Repo](https://img.shields.io/badge/GitHub_Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mushfiq599/English-Janala)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

</div>

---

## 📌 Project Overview

**English Janala** (ইংলিশ জানালা) is a full-featured, production-ready English vocabulary learning platform designed for learners of all ages — from curious kids (age 5+) to adult IELTS and TOEFL candidates.

The platform delivers a **fully personalized learning experience** based on the user's age group. Children get a map-based adventure UI with confetti rewards, teens get a challenge-focused interface, and adults get a clean scholar mode with exam-prep packs. Each age group sees a different theme, tone, and difficulty level — all from the same codebase.

Built with **Next.js App Router**, **TypeScript**, **MongoDB**, and **Firebase Authentication**, English Janala is deployed on **Vercel** and optimized for SEO with full Open Graph and Twitter Card support.

🌐 **Live:** [english-janala-azure.vercel.app](https://english-janala-azure.vercel.app)

---

## 🖼️ Screenshots

> **Home Page — Hero Section**
![Home Page](./screenshots/homepage.png)

> **Quiz Mode**
![Quiz Mode](./screenshots/lesson.png)

> **Lesson Page**
![Lesson Page](./screenshots/profile.png)

> **Leaderboard**
![Leaderboard](./screenshots/leaderboard.png)

> **Flashcard Mode**
![Flashcards](./screenshots/flashcard.png)

---

## ✨ Main Features

### 🎓 Learning Modes
- 📖 **Lesson Journey** — structured lessons from Basic Vocabulary to IELTS/TOEFL level, each building on the last
- 🃏 **Flashcard Mode** — flip-card vocabulary review for quick memorization
- ❓ **Quiz Mode** — multiple choice, fill-in-the-blank, and more
- ⌨️ **Typing Challenge** — type the word from memory — the hardest mode
- 🎓 **Exam Preparation** — dedicated packs for AWL, IELTS, TOEFL, and Advanced learners

### 🧒 Age-Based Personalization
- 👶 **Kids (5–12)** — map-pin adventure UI, confetti rewards, large fonts, playful tone
- 🧑 **Teens (13–17)** — challenge-focused interface, typing mode, competitive leaderboard
- 👩 **Adults (18+)** — clean scholar mode, exam packs, academic word lists

### 📊 Progress & Engagement
- 📈 **Progress Tracking** — see exactly how many words learned per lesson
- 🔖 **Saved Words** — personal vocabulary collection, accessible anytime
- 🏆 **Leaderboard** — compete with learners worldwide, climb the global ranks
- 📅 **Word of the Day** — daily new vocabulary with meaning and example

### 🔊 Audio & Pronunciation
- 🔈 **Native Pronunciation** — hear every word spoken in natural English
- 🎧 **Instant audio feedback** — practice until pronunciation is perfect

### 🌐 Platform & SEO
- ⚡ **Next.js App Router** with server-side rendering for fast page loads
- 🔍 **Full SEO** — meta tags, Open Graph image, Twitter Card, sitemap
- 📱 **Fully responsive** — mobile, tablet, and desktop optimized
- 🔐 **Firebase Authentication** — email/password and Google OAuth login
- 🌙 **Age-adaptive theming** — UI changes based on user profile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14+ (App Router) | Framework, SSR, routing, API routes |
| TypeScript | Type-safe codebase |
| Tailwind CSS | Styling and responsive design |
| MongoDB | Database — lessons, words, user progress |
| Firebase Authentication | User auth — email/password + Google OAuth |
| Vercel | Deployment and hosting |
| Next.js API Routes | Backend API endpoints |

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.4.5",
    "firebase": "^10.12.0",
    "mongodb": "^6.7.0",
    "tailwindcss": "^3.4.4",
    "react-icons": "^5.2.1",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0"
  }
}
```

---

## ⚙️ Local Setup Guide

### Prerequisites
- Node.js v18+ installed
- MongoDB Atlas account
- Firebase project created
- Git installed

---

### 1. Clone the repository

```bash
git clone https://github.com/Mushfiq599/English-Janala.git
cd English-Janala
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/english-janala

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 4. Run the development server

```bash
npm run dev
```

App will run at: `http://localhost:3000`

---

### 5. Demo credentials (for testing)

| Role | Email | Password |
|---|---|---|
| Adult learner | adult@demo.com | Demo@12345 |
| Teen learner | teen@demo.com | Demo@12345 |
| Kids account | kids@demo.com | Demo@12345 |

*(Update with your actual demo credentials)*

---

## 🗂️ Project Structure

```
english-janala/
├── app/                    # Next.js App Router pages
│   ├── lesson/             # Lesson pages
│   ├── quiz/               # Quiz mode
│   ├── flashcards/         # Flashcard mode
│   ├── typing/             # Typing challenge
│   ├── exam-prep/          # IELTS/TOEFL packs
│   ├── leaderboard/        # Global leaderboard
│   ├── saved/              # Saved words
│   └── api/                # API routes
├── components/             # Reusable UI components
├── lib/                    # MongoDB connection, utilities
├── types/                  # TypeScript types
└── public/                 # Static assets
```

---

## 🌐 Live Link & Relevant Links

| Resource | Link |
|---|---|
| 🌐 Live Site | [english-janala-azure.vercel.app](https://english-janala-azure.vercel.app) |
| 💻 GitHub Repo | [github.com/Mushfiq599/English-Janala](https://github.com/Mushfiq599/English-Janala) |
| 🔥 Firebase Console | [firebase.google.com](https://firebase.google.com) |
| 🍃 MongoDB Atlas | [mongodb.com/atlas](https://mongodb.com/atlas) |
| ☁️ Vercel | [vercel.com](https://vercel.com) |

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0a1628,50:0f3460,100:16213e&height=100&section=footer)

</div>
