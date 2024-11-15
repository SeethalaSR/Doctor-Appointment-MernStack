# MediCareBook  
A MERN Stack Doctor Appointment Booking System

---

## Project Overview  
MediCareBook is a web-based application designed to streamline the process of booking and managing doctor appointments. 
It caters to three user roles: **Patients**, **Doctors**, and **Admins**, offering tailored functionalities for each role. 
The application ensures secure data management, intuitive navigation, and seamless interaction between users.

---

## Demo Video

Watch our [Demo Video](https://drive.google.com/drive/folders/16HFlRyuKeZfp3h4kSSR75J02ElpPZk6E?usp=sharing) to see MediCareBook in action!

---

## Key Features  
### For Patients:
- Register and log in to book appointments.
- View available doctors and their specializations.
- Upload medical documents during appointment booking.
- Receive notifications about appointment approval or rejection.

### For Doctors:
- Manage appointment requests by approving or rejecting them.
- Apply for a doctor role by submitting professional details.
- Access a dashboard to view their appointments.

### For Admins:
- Manage user roles and view all registered users.
- Monitor all appointments in the system via the admin panel.

---

## Technologies Used  
### Frontend:
- **React.js**: For building dynamic, interactive user interfaces.
- **HTML/CSS**: For structuring and styling the application.

### Backend:
- **Node.js**: For building server-side logic.
- **Express.js**: For handling APIs and middleware.

### Database:
- **MongoDB**: For storing user, doctor, and appointment data.

### Other Tools:
- **JWT**: For secure authentication.
- **Multer**: For file uploads (e.g., medical reports).
- **Axios**: For API communication.

---

## Installation and Setup

### Prerequisites:
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm (Node Package Manager)

### Steps to Set Up:
1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Navigate to the project directory
3. Install dependencies for both frontend and backend:
   ```bash
    cd client && npm install
    cd ../server && npm install
4.Start MongoDB locally or ensure your cloud instance is active.

## Running the Application

### Frontend:
Navigate to the `frontend` folder and run:

    npm start

The frontend will be available at http://localhost:3000.

### Backend:
Navigate to the `backend` folder and run:

    npm start

The frontend will be available at http://localhost:8000.

---

## Folder Structure
### Frontend (Client):
- /src/components: Contains React components for Patients, Doctors, and Admins.
- /src/pages: Includes pages like Home, Login, Register, and Dashboards.
- /src/styles: Contains CSS files for styling the app.

### Backend (Server):
- /config: MongoDB connection configuration.
- /controllers: Handles logic for user, doctor, and admin operations.
- /routes: Defines API routes for the application.
- /schemas: Mongoose schemas for users, doctors, and appointments.
- /uploads: Stores uploaded files securely.

---

## API Endpoints

### Users
- POST /api/register: Register a new user.
- POST /api/login: Log in as a user.

### Doctors
- GET /api/doctors: Retrieve a list of doctors.
- POST /api/doctors/apply: Apply for a doctor role.

### Appointments
- POST /api/appointments: Book an appointment.
- PUT /api/appointments/approve: Approve an appointment.

---

## Future Enhancements

- Real-time notifications for appointment updates.
- Integrate a payment gateway for appointment fees.
- Add filters to search for doctors by location or specialization.
- Develop a mobile app version for Android and iOS.










