# Sales Dashboard Admin Panel

A modern, responsive sales dashboard built with React, providing comprehensive analytics, customer management, and administrative tools.

## 🚀 How to Run the Project

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/sales-dashboard.git
   cd sales-dashboard
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

   # or

   yarn
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

4. Open your browser and navigate to:
   \`\`\`
   http://localhost:5173
   \`\`\`

### Login Credentials

Use the following credentials to log in:

- Email: `admin@dot.com`
- Password: `123456`

## 🛠️ Technologies Used

- **React** - Frontend library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **React Router** - Routing and navigation for React applications
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components built with Radix UI and Tailwind
- **Framer Motion** - Animation library for React
- **React Simple Maps** - Geographical map components for React
- **Lucide React** - Beautiful & consistent icon set
- **date-fns** - Modern JavaScript date utility library

## 🌟 Features

- **Authentication System** - Cookie-based authentication with protected routes
- **Interactive Dashboard** - Real-time data visualization with multiple chart types
- **Customer Management** - Sortable and filterable customer data table
- **FAQ Management** - Create, edit, and delete FAQs
- **Responsive Design** - Fully responsive layout that works on mobile, tablet, and desktop
- **Data Export** - Export data to CSV format

## 🧩 Assumptions & Extra Features

1. **Mock Authentication** - The project uses cookie-based authentication with mock credentials for demonstration purposes. In a production environment, this would be replaced with a proper authentication system.

2. **Local Storage for Data Persistence** - FAQ data is stored in the browser's localStorage for demonstration. In a real application, this would be replaced with API calls to a backend server.

3. **Enhanced UI/UX Features**:

   - Animated transitions and micro-interactions
   - Elegant login page with gradient background and frosted glass effect
   - Tabbed interface for better organization of dashboard content
   - Real-time data updates simulation
   - Interactive geographical data visualization

4. **Sidebar Navigation** - Implemented a responsive sidebar with mobile support and a logout button at the bottom for easy access.

5. **Advanced Data Visualization** - Multiple chart types (bar, line, area, pie) with interactive tooltips and animations.

6. **Customizable Tables** - Tables with sortable columns, filters, and toggleable column visibility.

## 📝 Notes

- This project is for demonstration purposes and uses mock data.
- The dashboard simulates real-time data updates but doesn't connect to an actual backend.
- For a production application, you would need to implement proper API integration, error handling, and security measures.
