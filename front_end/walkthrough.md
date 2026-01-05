# HRMS Frontend Implementation Walkthrough

## Overview
I have implemented the frontend structure and key pages for the HRMS system using **React** and **Tailwind CSS**, matching the provided Figma designs.

## Completed Features
- **Project Structure**: Scaffolded the complete directory tree (components, pages, services, etc.).
- **Styling**: Configured Tailwind CSS with custom colors (`primary`, `secondary`) to match the brand.
- **Common Components**: Created reusable components:
  - `Button`, `Input`, `Card`, `Table`, `Modal`, `ImageUpload`.
- **Layouts**: Implemented `MainLayout`, `Sidebar`, and `Header` with role-based navigation.
- **Pages**:
  - **Auth**: `Login` and `Register` pages with form UI.
  - **Admin**: `Dashboard` (Metrics, Charts placeholder), `EmployeeList` (Table view), `Departments` (Grid view).
  - **Routing**: Configured `App.jsx` with `react-router-dom` for navigation between pages.

## Setup Instructions

> [!WARNING]
> The automated dependency installation failed due to file permission issues in your environment. You must run the following command manually:

```bash
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom lucide-react
```

### Running the Project
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173).


## How to View All Pages

Since the app currently handles routing on the frontend without a real backend authentication, you can access any page by manipulating the URL or clicking buttons.


### 1. Authentication (Mock)
The **Login Page** triggers a simulated API call (0.8s delay). Based on the email domain, it assigns a role:
- **Admin**: Log in with any email containing `admin` (e.g., `admin@company.com`) -> Redirects to `/admin/dashboard`.
- **HR**: Log in with any email containing `hr` (e.g., `sarah.hr@company.com`) -> Redirects to `/hr/dashboard`.

- **Employee**: Log in with any other email -> Redirects to `/employee/dashboard`.

### 2. Admin Portal
- **Employees**: The list is now powered by `EmployeeContext`.
- **Leave Management**: View requests at `/admin/leaves`. Approve or reject them to update their status globally.

### 3. HR Portal
- **Dashboard**: Includes a "Pending Leave Requests" widget.
- **Leave Management**: Accessible here as well (same component as Admin).

### 4. Employee Portal
- **Dashboard**: 
  - **Clock In/Out**: Clicking the large button toggles your status and updates the UI (Green/Online).
  - **Quick Actions**: "Request Leave" navigates to the portal.
- **Leave Portal**: Apply for leave and view your history status (Approved/Rejected/Pending).

## How to View All Pages

- **Admin Dashboard**: [http://localhost:5173/admin/dashboard](http://localhost:5173/admin/dashboard)
- **Employee Dashboard**: [http://localhost:5173/employee/dashboard](http://localhost:5173/employee/dashboard)
- **Employee Leave Portal**: [http://localhost:5173/employee/leave](http://localhost:5173/employee/leave)
- **Admin Leave Management**: [http://localhost:5173/admin/leaves](http://localhost:5173/admin/leaves)
- **Admin Payroll**: [http://localhost:5173/admin/payroll](http://localhost:5173/admin/payroll)
- **My Profile**: [http://localhost:5173/profile](http://localhost:5173/profile)

### 5. Payroll
- **Admin**: View total payroll cost and salary history table.
- **Employee**: View personal payslip history and download mock PDFs.

### 6. Profile & Settings
- **Profile**: View and edit personal details like address and phone number. Simulates "Change Password".



### 4. Error Pages
- **404 Not Found**: [http://localhost:5173/random-url](http://localhost:5173/random-url)
  - Try entering any invalid path to see the custom 404 page.

## Verification
- Navigate to `/login` to see the Login page.
- Log in (click "Sign In" - logic is frontend-only routing for now) to see the Admin Dashboard.
- Click "Employees" in the sidebar to view the Employee Directory.
- Click "Departments" to view the Departments grid.
