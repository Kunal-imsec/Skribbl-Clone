# Deployment Guide

## Backend Deployment (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Set environment variables in Render dashboard:
   ```
   PORT=4000
   CLIENT_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   ```
4. Build command: `npm install`
5. Start command: `npm start` (from server directory)
6. Note the deployment URL (e.g., `https://app-name-xxxx.onrender.com`)

## Frontend Deployment (Vercel)

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repo
3. Configure build settings:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   ```
5. Deploy!

## Testing After Deployment

1. Open your Vercel frontend URL in browser
2. Create a room and verify all game features work:
   - Room creation
   - Player joining
   - Drawing
   - Chat and guessing
   - Round progression
   - Game over screen

## Notes

- Render free tier may have cold starts (~50s first request)
- Vercel frontend will auto-deploy on git push
- For production, consider upgrading Render to paid tier
- Socket.IO connections work across deployed services
