# English Janala — Interactive English Vocabulary Learning Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-english--janala--azure.vercel.app-0ea5e9?style=for-the-badge&logo=vercel)](https://english-janala-azure.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)

> An interactive English vocabulary learning platform for ages 5–30.
> From curious kids to IELTS and TOEFL candidates — one platform, three completely different experiences.

---

## Live Demo

**[https://english-janala-azure.vercel.app](https://english-janala-azure.vercel.app)**

---

## The Idea

This project started as a simple vanilla HTML/CSS/JavaScript assignment during my first weeks of learning web development. After completing a full-stack programme, I rebuilt it entirely from scratch as a production-grade Next.js application.

The core idea: a single vocabulary learning platform that adapts its entire visual experience based on the learner's age. A 9-year-old and a 24-year-old IELTS candidate should both feel like the app was built specifically for them.

---

## Age-Adaptive Theme System

The platform automatically assigns a theme tier based on date of birth at signup:

| Age | Tier | Theme |
|-----|------|-------|
| 5–12 | Young Explorer | Warm parchment, gold accents, map-pin lessons, treasure chest saves, confetti rewards |
| 13–17 | Teen Explorer | Dark slate, cyan accents, game-style UI, competitive leaderboard focus |
| 18+ | Scholar | Clean minimal, sky blue, IELTS/TOEFL badges, professional layout |

---

## Features

### Learning Modes
- **Lesson Mode** — 7 structured vocabulary lessons with word cards, meanings, pronunciation, and examples
- **Flashcard Mode** — Flip cards to reveal meanings, mark Got It or Review Again, review missed words
- **Quiz Mode** — 10 multiple choice questions per lesson, instant feedback, score history saved
- **Typing Challenge** — See the meaning, type the word from memory. 30 second timer per word
- **Exam Prep** — 4 curated packs: Academic Word List, IELTS Core, TOEFL Essential, Advanced C1-C2

### Personalization
- Age-based adaptive theming across the entire app
- Personalized hero section for logged-in users
- Saved words collection with print/export
- Per-lesson progress tracking
- Daily learning streak with header badge

### Gamification
- 12 achievement badges with unlock animations
- Global leaderboard ranked by words seen
- Daily streak system with Firestore persistence
- Confetti rewards for perfect scores (kids tier)
- Character reactions on quiz answers (kids tier)

### Technical
- Full-text search across all vocabulary words with debounce
- Free Dictionary API integration for rich definitions, audio pronunciation, antonyms
- Word of the Day on landing page
- PWA with offline caching via next-pwa
- SEO metadata, sitemap, robots.txt, OG image

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 with CSS custom properties |
| Animation | Framer Motion |
| Auth | Firebase Authentication (Email + Google) |
| Database | Firestore |
| Dictionary | Free Dictionary API |
| Vocabulary | Programming Hero Open API |
| Icons | React Icons (Feather) |
| Deployment | Vercel |
| PWA | next-pwa |

---

## Project Structure

app/
page.tsx → Landing page
lesson/ → Lesson grid + word cards
flashcards/ → Flashcard study mode
quiz/ → Multiple choice quiz
typing/ → Typing challenge
exam-prep/ → IELTS/TOEFL vocabulary packs
saved/ → Saved word collection
profile/ → Stats, streak, badges, quiz history
leaderboard/ → Global rankings
settings/ → Profile editing, account deletion
about/ → Project information
privacy/ → Privacy policy

components/
landing/ → Hero slider, features, how it works, stats, CTA
lesson/ → Lesson grid, word cards, search, summary bar
quiz/ → Quiz card, results, lesson picker
flashcard/ → Flip card, results, lesson picker
typing/ → Typing card, results, lesson picker
exam/ → Exam pack cards, word cards
profile/ → Badge grid, quiz history
shared/ → Toast, confetti, scroll to top, print button
layout/ → Header, footer

lib/
firebase.ts → Firebase init
api.ts → Programming Hero API + Free Dictionary API
userProfile.ts → Profile CRUD + streak logic
savedWords.ts → Saved word Firestore operations
progress.ts → Lesson progress tracking
quizScores.ts → Quiz score persistence
badges.ts → Badge definitions and unlock logic
leaderboard.ts → Leaderboard read/write
examWords.ts → Curated exam vocabulary lists
search.ts → Cross-lesson word search
wordOfTheDay.ts → Daily word selection

context/
AuthContext.tsx → Firebase auth state
ProfileContext.tsx → User profile + theme tier + streak
ThemeContext.tsx → Dark mode toggle

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
git clone https://github.com/Mushfiq599/English-Janala.git
cd English-Janala
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id


### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

---

## Firestore Security Rules

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /users/{userId}/{document=**} {
allow read, write: if request.auth != null && request.auth.uid == userId;
}
match /leaderboard/{userId} {
allow read: if true;
allow write: if request.auth != null && request.auth.uid == userId;
}
}
}


---

## Origin Story

The original version of this project was a Programming Hero bootcamp assignment — a single `index.html` with vanilla JS that fetched vocabulary words from an API. It had a fake login form that did nothing and placeholder nav links that went nowhere.

After completing the bootcamp and building several full-stack projects, I came back to this assignment and rebuilt it properly. Every feature was built from scratch. The original assignment is preserved in the git history.

---

## Author

**Mushfiqur Rahman**
BSc CSE — BGCTUB, Chattogram, Bangladesh
Full-stack developer | Next.js · React · Firebase · MongoDB · Express

- GitHub: [@Mushfiq599](https://github.com/Mushfiq599)
- Live project: [english-janala-azure.vercel.app](https://english-janala-azure.vercel.app)

---

## License

MIT — free to use, modify, and distribute.