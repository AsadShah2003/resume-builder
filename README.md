# Resume Builder

A modern, responsive Resume Builder application built with **Next.js**, **React**, **Tailwind CSS**, and **Zustand** for state management. It allows users to easily craft professional resumes with a live PDF preview, multiple templates, and dynamic customization options.

## Features

- **Live PDF Preview:** Instantly see how your resume looks as you type, powered by `@react-pdf/renderer` and `react-pdf`.
- **Modern UI:** Built with Tailwind CSS, featuring a clean, responsive layout that works seamlessly across desktop and mobile devices.
- **State Management:** Utilizes Zustand for fast, lightweight, and reliable state management across the application.
- **Customizable Templates:** Switch between different professional templates and customize colors and font sizes.
- **Double-Buffered Rendering:** Employs an advanced double-layer rendering technique to eliminate flickering and provide smooth transitions during live PDF updates.
- **Responsive Design:** A specialized mobile preview and a fully optimized editor layout for all screen sizes.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **PDF Generation:** [@react-pdf/renderer](https://react-pdf.org/) & [react-pdf](https://projects.wojtekmaj.pl/react-pdf/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites

Ensure you have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory.
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## Project Structure

- `app/` - Next.js App Router configuration and main pages.
- `components/` - Reusable UI components including the Editor, Preview, and PDF Templates.
  - `components/editor/` - Contains the main logic for editing sections (Work Experience, Education, Skills, etc.) and the Live Preview panes (`ResumePreview.tsx` & `MobileResumePreview.tsx`).
  - `components/profile/` - Profile management and resume dashboard components.
- `lib/store/` - Zustand store setup (`useResumeStore.ts`).

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
