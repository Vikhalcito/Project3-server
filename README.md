Project3-CaliZenics

Backend server for CaliZenics App, built with Node.js,  Express and using mongoDB. It provides a RESTful API for user authentication, token verification, and CRUD operations.

---

Technologies Used

- Node.js  
- Express.js  
- JSON Web Tokens (JWT)  
- Middleware: `express-jwt`, `cors`, `dotenv`, `morgan`
- Database: MongoDB
---

 API ENDPOINTS

- Authentication Routes

Method	   Route	                Description
POST	      /auth/signup	        Register a new user
POST	      /auth/login	          Log in and receive a JWT token
GET	        /auth/verify	        Verify the validity of a JWT token (protected route)

- Exercises Routes
Method	    Route	                  Description
GET	        /exercises	            Get all exercises
GET	        /exercise/:id	          Get a specific exercise by its ID (requires authentication/admin-user)
POST	      /exercise	              Create a new exercise (requires authentication/admin)
PUT	        /exercise/:id	          Update an existing exercise (requires authentication/admin)
DELETE	    /exercise/:id	          Delete an exercise (requires authentication/admin)

- Exercises Routes
Method	    Route	                  Description
GET	        /routines	              Get all routines (requires authentication/admin-user)
GET	        /routine/:id	          Get a specific routine by its ID (requires authentication/admin-user)
POST	      /routine	              Create a new routine (requires authentication/admin-user)
PUT	        /routine/:id	          Update an existing routine (requires authentication/admin-user)
DELETE	    /routine/:id	          Delete an routine (requires authentication/admin-user)


Installation

BASH 

# Clone the repository
git clone https://github.com/Vikhalcito/Project3-server.git
cd Project3-server

# Install dependencies
npm install

# Create and configure environment variables
.env
# Fill in the following variables:
# PORT=
# DB_URI=
# JWT_SECRET=

# Run in development mode
npm run dev

# Run in production
npm start
