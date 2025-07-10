# Nailova: Vibrant E-commerce for Nail Accessories
## Project Overview
Nailova is a vibrant and highly responsive e-commerce website designed for selling nail accessories. This project aims to provide a seamless and engaging shopping experience for users, featuring a dynamic frontend built with React and a powerful, scalable backend powered by Django. From browsing products to secure checkout, Nailova offers a complete solution for online retail of nail accessories.

### Features
* Product Catalog:  Browse a wide range of nail accessories with detailed descriptions and high-quality images.

* User Authentication: Secure user registration and login functionalities.

* Shopping Cart: Add, remove, and manage items in your shopping cart.

* Responsive Design: Optimized for various devices, from desktops to mobile phones, ensuring a consistent user experience.

* Search and Filtering: Easily find products using search functionality and various filters.


## Technologies Used
### Frontend (React)
* React: A JavaScript library for building user interfaces.

* React Router DOM: For handling client-side routing (BrowserRouter, Route, Routes).

* Redux & Redux Toolkit: For state management, including createSlice and createAsyncThunk.

* Axios: For making HTTP requests to the backend API.

* Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

### Backend (Django)
* Django: A high-level Python web framework.

* Django REST Framework (DRF): For building powerful Web APIs.

* Python Packages
```asgiref==3.8.1  
certifi==2025.4.26  
charset-normalizer==3.4.2  
Django==5.2.1  
django-cors-headers==4.7.0  
django-filter==25.1  
djangorestframework==3.16.0  
djangorestframework_simplejwt==5.5.0  
idna==3.10  
pillow==11.3.0  
psycopg2==2.9.10  
psycopg2-binary==2.9.10  
PyJWT==2.9.0  
requests==2.32.3  
sqlparse==0.5.3  
tzdata==2025.2  
urllib3==2.4.0  
whitenoise==6.9.0
Database: Likely PostgreSQL for production (based on psycopg2), and SQLite3 for development.
```

* Authentication: JWT-based authentication using djangorestframework_simplejwt.

## Project Structure

project-root

 ├── backend   
 └── frontend

## Setup Instructions
### 1. Backend Setup

```#Navigate to the backend/ directory:
#cd backend/
#Create a virtual environment:
python -m venv venv_backend
source venv_backend/bin/activate  #On Windows: venv_backend\Scripts\activate
#Install Python dependencies:
pip install -r requirements.txt
python manage.py migrate
#Create a superuser (optional but recommended):
python manage.py createsuperuser
#Start the backend server:
python manage.py runserver
#The backend will run at: http://127.0.0.1:8000/
```
### 2. Frontend Setup

Open a new terminal and navigate to the frontend/ directory:

```#cd frontend/
#Install Node.js dependencies:
npm install
#or
yarn install
```
## Configure API endpoint:
Update the API base URL to match your backend (usually http://127.0.0.1:8000/api/) in .env, src/config.js, or another config file.

## Start the frontend development server:

```npm start
#or
yarn start
#The frontend will typically run at: http://localhost:3000/
```
### Important Notes
* Requirements: Make sure all dependencies from requirements.txt and package.json are installed.

* Configuration: Replace placeholder keys or environment values with actual credentials if applicable.

### Troubleshooting:

* Check console logs for backend/frontend errors.

* Ensure both servers are running.

* Confirm that the frontend is correctly pointing to the backend API.

