# My Google Auth App

A web application with Google authentication integration.

## Installation

1. Clone the repository:
```
git clone https://github.com/phutran-se/my-google-auth-app
cd my-google-auth-app
```

2. Install backend dependencies:
```
npm install
```

3. Install frontend dependencies:
```
cd client
npm install
cd ..
```

## Running the Application

### Backend Server

To start only the backend server:
```
npm start
```

The server will run on http://localhost:5000 by default.

### Frontend Application

To start only the frontend application:
```
npm run client
```

The frontend will run on http://localhost:5173 by default.

### Run Both (Full Application)

To run both backend and frontend simultaneously:
```
npm run dev
```

This command uses concurrently to run both the backend server and frontend application in a single terminal window.