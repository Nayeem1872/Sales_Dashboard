# Sales Dashboard Admin Panel 📊✨

A modern, responsive sales dashboard admin panel built with React, providing comprehensive analytics, customer management, and administrative tools.

---

## 📋 Live (https://sales-dashboard-l78g.vercel.app/)

## 📋 Table of Contents

- [🚀 How to Run the Project](#-how-to-run-the-project)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Login Credentials](#-login-credentials)
- [🌟 Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [💡 Assumptions & Mock Implementation](#-assumptions--mock-implementation)
- [📝 Important Notes](#-important-notes)

---

## 🚀 How to Run the Project

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Nayeem1872/Sales_Dashboard.git
    cd Sales_Dashboard
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn
    ```

### Running the Development Server

1.  **Start the development server:**
    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn dev
    ```

2.  **Open your browser:**
    Navigate to `http://localhost:5173`

### 🔑 Login Credentials

Use the following credentials to log in:

- **Email:** `admin@dot.com`
- **Password:** `123456`

---

## 🌟 Features

- 🔐 **Authentication System:** Cookie-based authentication with protected routes.
- 📊 **Interactive Dashboard:**
  - Real-time data visualization with multiple chart types (bar, line, area, pie).
  - Animated transitions and micro-interactions.
  - Interactive geographical data visualization using React Simple Maps.
  - Tabbed interface for better organization of dashboard content.
- 👥 **Customer Management:** Sortable and filterable customer data table with toggleable column visibility.
- ❓ **FAQ Management:** Create, edit, and delete FAQs.
- 📱 **Responsive Design:** Fully responsive layout adapting to mobile, tablet, and desktop.
- 📄 **Data Export:** Export data to CSV format.
- 🎨 **Elegant UI/UX:**
  - Modern login page with gradient background and frosted glass effect.
  - Responsive sidebar with mobile support and a clear logout option.
- 🔔 **Notifications:** Toast notifications for user actions (e.g., logout).

---

## 🛠️ Technologies Used

- **Frontend Library:** React
- **Build Tool:** Vite
- **Routing:** React Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (built with Radix UI & Tailwind)
- **Animation:** Framer Motion
- **Maps:** React Simple Maps
- **Icons:** Lucide React
- **Date Utility:** date-fns
- **Notifications:** React Hot Toast

---

## 💡 Assumptions & Mock Implementation

This project is built for demonstration purposes and includes certain mock implementations:

1.  **Mock Authentication:**
    The project uses cookie-based authentication with hardcoded mock credentials (`admin@dot.com` / `123456`). In a production environment, this would be replaced with a robust authentication system connected to a backend.

2.  **Local Storage for Data Persistence:**
    FAQ data is stored in the browser's `localStorage` to demonstrate CRUD functionality without a backend. In a real application, API calls to a backend server would manage data persistence.

3.  **Simulated Real-time Data:**
    The dashboard simulates real-time data updates for visualization purposes but does not connect to an actual live data source.

---

## 📝 Important Notes

- This project is intended for **demonstration purposes** and showcases frontend capabilities.
- It uses **mock data** and simulates backend interactions.
- For a production-ready application, you would need to implement:
  - Proper API integration with a backend service.
  - Comprehensive error handling.
  - Enhanced security measures.
  - Database integration for persistent storage.

---
