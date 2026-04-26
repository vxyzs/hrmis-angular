HR Management Information System (HRMIS)
========================================

A web-based **Human Resource Management Information System (HRMIS)** built using **Angular 8** and **Angular Material**.The system automates and manages core HR operations such as employee management, payroll management, recruitment, reporting, and audit logging.

The project is designed as an academic **Management Information System (MIS)** demonstrating:

*   role-based access control
*   reporting & analytics
*   dashboard-based decision support
*   integrated organizational data
*   audit tracking and monitoring

🚀 Features
-----------

### 👤 Employee Management

*   Add, update, delete employees
*   Employee profile management
*   Department integration
*   Employee search & filtering

### 🏢 Department Management

*   Full CRUD operations
*   Department-wise employee tracking

### 🧑‍💼 Candidate Management

*   Candidate tracking system
*   Recruitment pipeline management
*   Candidate status tracking

### 💰 Salary Management

*   Salary records & history
*   Payroll summaries
*   Salary analytics

### 📊 MIS Dashboard & Reports

*   KPI dashboard cards
*   Employee & payroll analytics
*   Candidate pipeline reports
*   Charts using Chart.js
*   CSV export support

### 🔐 Role-Based Access Control

*   Admin
*   HR Manager
*   Employee

### 📝 Audit Logging

*   Tracks Create, Update, Delete operations
*   Timestamp-based activity logs
*   Admin-only audit monitoring

### 🎨 UI Features

*   Angular Material UI
*   Responsive layout
*   Global search    
    
## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | Angular 8 |
| UI Framework | Angular Material |
| Language | TypeScript |
| Charts & Analytics | Chart.js, ng2-charts |
| Forms | Reactive Forms |
| Mock Backend | Angular In-Memory Web API |
| Data Storage | localStorage |
| Unit Testing | Jasmine, Karma |
| Version Control | Git & GitHub |

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── services/
│   │   └── interceptors/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── employees/
│   │   ├── departments/
│   │   ├── candidates/
│   │   ├── salaries/
│   │   ├── reports/
│   │   └── audit-log/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── models/
│   │   ├── pipes/
│   │   └── directives/
│   │
│   └── app.module.ts
│
└── assets/
```

---

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/vxyzs/hrmis-angular.git
cd hrmis-angular
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Run Application

```bash
ng serve -o
```

### 4. Build for Production

```bash
ng build --prod
```

### Unit Testing (Jasmine + Karma)

```bash
ng test
```

👥 User Roles
-------------

RoleAccess LevelAdminFull system accessHR ManagerHR operations & reportsEmployeeSelf-service access only

📌 MIS Functionalities Implemented
----------------------------------

*   Dashboard analytics
*   Reporting & decision support
*   Role-based access control
*   Integrated organizational data
*   Audit trail logging
*   Payroll reporting
*   Candidate pipeline monitoring
*   CSV report export
*   Workflow-based HR operations
    

📖 Academic Purpose
-------------------

This project was developed as an academic **Management Information System (MIS)** project to demonstrate:

*   HR workflow automation
*   organizational data integration
*   reporting systems
*   dashboard analytics
*   access control mechanisms
*   audit and monitoring systems