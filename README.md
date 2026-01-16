# ecoHRMS - Human Resource Management System
---
**ecoHRMS** is a modern, responsive React application designed to streamline workforce management. It handles employee data, departmental structures, payroll processing, leave management, and attendance tracking in a unified dashboard.

[Live Demo](https://humanovahrms-front-end-repo.vercel.app/) 

[Backend Repository](https://github.com/Ian-N-N/humanovahrms_back_end_repo)

## Key Features

### Authentication & Security
* **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for Admin, HR, and Employees.
* **Secure Login:** JWT-based authentication for secure session management.

### Admin & HR Management
* **Employee Management:** Full CRUD capabilities for employee profiles, roles, and departments.
* **Payroll Processing:** Manage payroll cycles, generate salary breakdowns (Tax, NHIF, NSSF), and download reports.
* **Leave & Attendance:** Oversee attendance logs, modify records, and approve/reject leave requests.
* **Analytics Dashboard:** Visual insights on workforce distribution, attendance trends, and salary summaries.
* **Media Management:** Employee photo uploads integrated with Cloudinary.

### Employee Portal
* **Self-Service:** View personal attendance history, payslips, and profile details.
* **Time Tracking:** Digital Clock-in/Clock-out functionality.
* **Leave Management:** Submit time-off requests and track approval status in real-time.
* **Notifications:** Automated email alerts via SendGrid for approvals and updates.
## Tech Stack

* **Frontend Framework:** [React.js](https://reactjs.org/) (Vite)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)

---

## Project Structure

```bash

├── front_end/                  # Root directory for the Frontend application
│   ├── src/                    # (Source) Main code for the React application
│   │   ├── api/                # API configuration (Axios instances)
│   │   ├── assets/             # Static files like images, global SVGs, and fonts
│   │   ├── components/         # Reusable UI parts 
│   │   ├── context/            # React Context files 
│   │   ├── hooks/              # Custom React Hooks 
│   │   ├── pages/              # Full-page components that correspond to specific Routes
│   │   ├── routes/             # Routing configuration 
│   │   ├── services/           # Business logic for API calls 
│   │   ├── store/              # State management setup 
│   │   ├── utils/              # Helper functions 
│   │   ├── App.css             # Component-specific styles for the main App component
│   │   ├── App.jsx             # The root React component 
│   │   ├── index.css           # Global styles and Tailwind CSS directives 
│   │   ├── main.jsx            # Entry point: Mounts the React app to the DOM 
│   ├── .gitignore              # Specifies files Git should ignore 
│   ├── README.md               # Documentation for the frontend 
│   ├── eslint.config.js        # Configuration for finding and fixing code syntax problems
│   ├── index.html              # The main HTML file where the React app is injected
│   ├── package-lock.json       # Locks dependency versions for consistent installs
│   ├── package.json            # Lists project dependencies, scripts (dev, build), and metadata
│   ├── postcss.config.cjs      # Configuration for PostCSS
│   ├── postcss.config.js       # (Alternative extension for PostCSS config)
│   ├── tailwind.config.js      # Customization for Tailwind CSS 
│   ├── tailwind.cjs            # (Alternative extension for Tailwind config)
│   ├── vite.config.js          # Configuration for Vite 
│   ├── walkthrough.md          # Custom guide or notes specific to this project's development
├── node_modules/               # Contains all installed library code 
├── package-lock.json           # Root level dependency lock 
├── package.json                # Root level dependencies 
└── requirements.txt            # Usually for Python/Backend dependencies 
```
## Getting Started

### Prerequisites
Ensure you have **Node.js** (v16+) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ecoHRMS.git](https://github.com/your-username/ecoHRMS.git)
    cd ecoHRMS/front_end
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to the local URL provided by Vite (usually `http://localhost:5173`).

---

##  Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

##  License

Distributed under the MIT License. See `LICENSE` for more information.
