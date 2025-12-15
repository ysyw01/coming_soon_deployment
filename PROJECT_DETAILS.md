# Project Details: Your Sport, Your World (YSYW)

## Overview
**Your Sport, Your World (YSYW)** is a comprehensive web platform designed for sports enthusiasts, athletes, and fans. It serves as a hub for tracking athletes, comparing stats, and engaging with sports content. The application includes a public-facing side for fans and an admin dashboard for content management.

## Tech Stack
This project is built using a modern frontend stack:
- **Framework:** [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & Motion
- **Charts & Data Viz:** [Chart.js](https://www.chartjs.org/), [Recharts](https://recharts.org/)
- **State/Data Fetching:** Axios
- **Smooth Scrolling:** Lenis
- **Icons:** React Icons, Lucide React

## Design System

### Color Scheme
The project uses a distinct color palette defined in `tailwind.config.js`:

| Color Name      | Hex Code  | Usage |
|-----------------|-----------|-------|
| **Primary**     | `#3A1078` | Main brand color (Deep Purple) |
| **Light Primary**| `#4E31AA` | Secondary brand color, hover states |
| **Background**  | `#F7F7F8` | Main application background (Off-white) |
| **Gloss**       | `#3795BD` | Accents and highlights (Blue) |
| **Admin Red**   | `#d92f5b` | Admin interface accents/alerts |
| **Admin Bg**    | `#f4f1ee` | Admin dashboard background |

### Typography
Several custom fonts are integrated for different UI elements:
- **Headings/Display:** `Bruno Ace SC`, `Anton`, `Zain`
- **Body/Text:** `Poppins`, `Instrument Sans`, `Cabin`, `Parkinsans`

## Key Features & Routes

### Public Interface
- **Home** (`/`): Landing page with hero section, featured content, and brand carousel.
- **About Us** (`/about`): Information about the platform and mission.
- **Talents / Athletes** (`/athlete`): Directory of athletes.
- **Athlete Profile** (`/athlete/:id`): Detailed stats, biography, and performance charts for a specific athlete.
- **Athlete Comparison** (`/compare/:pair`): Tool to compare statistics between two athletes.
- **Advertise** (`/adv`): Information for potential advertisers.
- **Collections** (`/collections`): Curated lists or galleries.

### Admin Interface
- **Login** (`/admin/login`): Secure entry point for administrators.
- **Dashboard** (`/admin/dashboard`): Protected route for managing site content (requires authentication).
