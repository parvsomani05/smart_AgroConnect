# Smart AgroConnect

Smart AgroConnect is a full-stack web application designed to connect farmers and agricultural professionals through a user-friendly platform. Built using the MERN stack (MongoDB, Express.js, React with Vite, and Node.js) and styled with Tailwind CSS, this application provides role-based authentication and personalized user dashboards.

## Features

- **User Authentication**: Secure registration and login processes with OTP verification.
- **Role-Based Access**: Different user roles (e.g., farmer, agronomist) with tailored dashboards and functionalities.
- **User Dashboards**: Personalized dashboards displaying relevant information based on user roles.
- **Document Uploads**: Users can upload necessary documents during registration.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MongoDB

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up and running.

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your MongoDB connection in `config/db.js`.

4. Start the backend server:
   ```
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Usage

- Access the application in your browser at `http://localhost:3000`.
- Register a new account or log in with existing credentials.
- Explore the dashboard and utilize features based on your user role.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.