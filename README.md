# SHOP.CO E-Commerce Web Application

A high-end MERN stack e-commerce web application with a responsive design, smooth animations, and a rich feature set. Built to match a premium UI design.

## Features

- **Responsive Design**: Adapts beautifully to desktop and mobile screens. Hamburger menu for mobile navigation.
- **Dynamic Frontend**: Built with React.js, Tailwind CSS, Lucide React icons, and Framer Motion for scroll and hover animations.
- **Backend API**: Powered by Node.js, Express, and MongoDB. Includes filtering, sorting, state management, and JWT authentication.
- **Key Pages**:
  - **Home**: Hero section, Brand strip, New Arrivals, Top Selling, Bento-style categories, Testimonials, and Newsletter subscription.
  - **Product Listing**: Advanced filter sidebar (category, price range, rating), sorting, and search capabilities.
  - **Product Detail**: Image gallery, size/color selectors, quantity controls, and Add to Cart functionality.
  - **Cart**: Subtotal calculations, 10% discount, $15 delivery fee, and quantity updates.
  - **Authentication**: JWT-based user login and registration.

## Tech Stack

**Frontend**:
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- Lucide React

**Backend**:
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (running locally or via MongoDB Atlas)

## Step-by-Step Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd c:/Users/XIAOMI/Desktop/Info
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   *Ensure you have a `.env` file in the `backend` directory (already created during generation) with:*
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shopco
   JWT_SECRET=shopco_super_secret_jwt_key_2024
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

## How to Run

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```
   *Server will start on `http://localhost:5000`*

2. **Start the Frontend Development Server** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   *Frontend will be accessible at `http://localhost:5173`*

3. **Optional: Seed the Database**:
   If you want to populate the database with initial products, run:
   ```bash
   cd backend
   npm run seed
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports queries: `category`, `minPrice`, `maxPrice`, `rating`, `sort`, `search`, `page`, `limit`, `isNew`, `isTopSelling`)
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

### Cart
- `GET /api/cart` - Get current cart (session-based)
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update item quantity in cart
- `DELETE /api/cart/:itemId` - Remove an item from the cart
- `DELETE /api/cart/clear` - Clear the entire cart

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and get token
- `GET /api/auth/profile` - Get logged-in user profile

### Newsletter
- `POST /api/newsletter` - Subscribe an email to the newsletter

### Categories
- `GET /api/categories` - Fetch all dress style categories

### Orders
- `POST /api/orders` - Place a new order
- `GET /api/orders/my` - Get logged-in user's orders
- `GET /api/orders/all` - Get all orders (Admin only)

## Bonus Features Implemented
- User Authentication (JWT Login & Registration)
- Session-based unauthenticated cart storage alongside authenticated users.
- Live Product Search by Name
- Global Toast Notifications (Success & Error feedback)
- Product Pagination
