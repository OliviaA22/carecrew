# API Endpoints Documentation

## **🔹 Auth Routes (`/api/auth`)**

| Method | Endpoint | Description |
|--------|------------|-------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Log in a user |
| **GET** | `/api/auth/check-auth` | Check if user is authenticated |
| **POST** | `/api/auth/logout` | Log out a user |

---

## **🔹 Dashboard Routes (`/api/search`)**

| Method | Endpoint | Description |
|--------|------------|-------------|
| **GET** | `/api/search/hospitals` | Get all hospitals (Admin only) |
| **GET** | `/api/search/wards` | Get all wards (Admin only) |
| **GET** | `/api/search/medications` | Get all medications |
| **GET** | `/api/search/dashboard` | Get dashboard data |
| **GET** | `/api/search/medications/:med_id` | Get medication details by ID |
| **GET** | `/api/search/nurses-ward/:ward_id` | Get nurses by ward (Admin only) |
| **GET** | `/api/search/nurses-hospital/:hospital_id` | Get nurses by hospital (Admin only) |

---

## **🔹 Medication Plan Routes (`/api/med-plans`)**

| Method | Endpoint | Description |
|--------|------------|-------------|
| **GET** | `/api/med-plans/` | Get all medication plans |
| **POST** | `/api/med-plans/new-plan` | Create a new medication plan (Admin only) |
| **POST** | `/api/med-plans/:planId/med-items` | Add medications to a plan (Admin only) |
| **POST** | `/api/med-plans/adminstration` | Create a medication administration record |
| **GET** | `/api/med-plans/adminstration` | Get all medication administration records (Admin only) |
| **GET** | `/api/med-plans/adminstration/:id` | Get a specific medication administration record (Admin only) |
| **PUT** | `/api/med-plans/adminstration/:id` | Update a medication administration record |
| **DELETE** | `/api/med-plans/adminstration/:id` | Delete a medication administration record (Admin only) |
| **GET** | `/api/med-plans/:id` | Get a medication plan by ID |
| **PUT** | `/api/med-plans/:planId` | Update a medication plan (Admin only) |
| **DELETE** | `/api/med-plans/:id` | Delete a medication plan (Admin only) |

---

## **🔹 Patient Routes (`/api/patients`)**

| Method | Endpoint | Description |
|--------|------------|-------------|
| **POST** | `/api/patients/new-patient` | Create a new patient (Admin only) |
| **GET** | `/api/patients/` | Get all patients (Admin only) |
| **GET** | `/api/patients/ward/:ward_id` | Get all patients in a specific ward |
| **GET** | `/api/patients/hospital/:hospital_id` | Get all patients in a specific hospital (Admin only) |
| **GET** | `/api/patients/with-medications` | Get patients with their medications |
| **PUT** | `/api/patients/discharge/:id` | Discharge a patient (Admin only) |
| **GET** | `/api/patients/:id` | Get a specific patient by ID |
| **PUT** | `/api/patients/:id` | Update patient details (Admin only) |

---

## **🔹 Shift Routes (`/api/shifts`)**

| Method | Endpoint | Description |
|--------|------------|-------------|
| **GET** | `/api/shifts/` | Get all shifts |
| **POST** | `/api/shifts/start` | Start a shift |
| **POST** | `/api/shifts/end` | End a shift |

---

## **🔹 Notification Routes (`/api/notifications`)**

| Method | Endpoint | Description |
|--------|------------|-------------|
| **GET** | `/api/notifications/` | Get all notifications |
| **PUT** | `/api/notifications/:id/read` | Mark a notification as read |
| **DELETE** | `/api/notifications/:id` | Delete a notification |

---

## **🔹 User Routes (`/api/users`)**

| Method | Endpoint | Description |
|--------|------------|-------------|
| **GET** | `/api/users/` | Get all nurses (Admin only) |
| **POST** | `/api/users/nurse` | Create a new nurse (Admin only) |
| **GET** | `/api/users/:id` | Get a user by ID |
| **PUT** | `/api/users/:id` | Update a user (Admin only) |
| **DELETE** | `/api/users/:id` | Delete a user (Admin only) |

---

### **🚀 Summary**

- **Admin Routes** 🛑: Require authentication & role check (`roleCheck('admin')`).  
- **Authenticated Routes** 🔒: Require `authenticateUser` middleware.  
- **Medication & Patient Management** 💊: `/api/med-plans` and `/api/patients`.  
- **Nurse-related operations** 🏥: `/api/shifts` (for working shifts) and `/api/users` (for managing nurses).  
- **Notifications & Alerts** 🔔: `/api/notifications`.  
- **Dashboard Queries & Search** 📊: `/api/search`.  

---

### 🛠️ **How to Use**

1️⃣ **Ensure authentication** is handled before accessing secured endpoints.  
2️⃣ **Admin-only routes** require special permissions (`roleCheck('admin')`).  
3️⃣ **Use token-based authentication** (JWT stored in cookies or headers).  
4️⃣ **Pass valid data** when creating/updating resources to avoid errors.  
