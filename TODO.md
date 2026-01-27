# Deployment Setup for MERN Ecommerce Store

## Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set the following environment variables:
   - NODE_ENV: production
   - PORT: (Render will set this automatically)
   - MONGO_URI: Your MongoDB Atlas connection string
   - CLOUDINARY_NAME: Your Cloudinary cloud name
   - CLOUDINARY_API_KEY: Your Cloudinary API key
   - CLOUDINARY_API_SECRET: Your Cloudinary API secret
   - JWT_SECRET: Your JWT secret
   - JWT_EXPIRE: JWT expiration time (e.g., 7d)
   - COOKIE_EXPIRE: Cookie expiration days
   - SMPT_SERVICE: Email service (e.g., gmail)
   - SMPT_MAIL: Your email
   - SMPT_PASSWORD: Your email password or app password
   - SMPT_HOST: SMTP host
   - SMPT_PORT: SMTP port
   - STRIPE_API_KEY: Your Stripe API key
   - STRIPE_SECRET_KEY: Your Stripe secret key
   - FRONTEND_URL: Your Netlify frontend URL (e.g., https://your-app.netlify.app)
4. Build Command: npm install
5. Start Command: npm start

## Frontend (Netlify)
1. Connect your GitHub repository to Netlify.
2. Set the following environment variable:
   - REACT_APP_API_URL: Your Render backend URL (e.g., https://your-backend.onrender.com)
3. Build settings should use the netlify.toml file.

## Database (MongoDB Atlas)
- Ensure your IP whitelist allows access from Render (0.0.0.0/0 for all).
- Create a database user with read/write permissions.

## Testing
1. Deploy backend first.
2. Once backend is live, deploy frontend with the correct REACT_APP_API_URL.
3. Test API calls from frontend to backend.
