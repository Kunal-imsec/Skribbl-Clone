# Skribbl.io Clone - Deployment Ready ✅

## Quick Deployment Steps

### 1. Backend (Render)
```bash
# On Render Dashboard:
- New Web Service
- Connect GitHub repo
- Root Directory: server
- Build: npm install
- Start: npm start
- Environment: 
  PORT=4000
  CLIENT_URL=<your-vercel-url>
  NODE_ENV=production
```

### 2. Frontend (Vercel)
```bash
# On Vercel Dashboard:
- Import Project
- Root Directory: client
- Build: npm run build
- Output: dist
- Environment:
  VITE_BACKEND_URL=<your-render-url>
```

### Environment Variables

**Server (.env)**
- `PORT` - Server port (default: 4000)
- `CLIENT_URL` - Frontend URL for CORS
- `NODE_ENV` - Set to `production`

**Client (.env.local)**
- `VITE_BACKEND_URL` - Backend socket.io URL

## Project Structure
```
skribbl.io-clone/
├── server/          (Express + Socket.IO)
│   ├── index.js
│   ├── classes/
│   └── package.json
├── client/          (React + TypeScript)
│   ├── src/
│   ├── vite.config.ts
│   └── package.json
```

## Features
✅ Real-time drawing & guessing game
✅ Multi-player support
✅ Chat system
✅ Score tracking
✅ Customizable game settings
✅ Auto word selection on timeout
✅ Exact round counting

## Testing After Deploy
1. Open frontend URL
2. Create/join rooms
3. Play a full game
4. Verify all rounds complete correctly
