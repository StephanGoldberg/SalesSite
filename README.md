# Directory Maker Sales Site

A professional sales website for selling the Directory Maker boilerplate. Built with React and integrated with Stripe for payments and GitHub API for automatic repository access delivery.

## Overview

This is a complete sales platform that:
- Presents the Directory Maker product with modern UI
- Processes payments through Stripe ($79 Standard / $499 Agency)
- Automatically grants GitHub repository access after purchase
- Provides documentation and support pages

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Node.js Serverless Functions (Vercel)
- **Payments**: Stripe Checkout
- **Database**: Vercel Edge Config
- **Hosting**: Vercel
- **Repository Access**: GitHub API

## Quick Start

```bash
# Install dependencies
cd frontend
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run locally
npm start

# Build for production
npm run build
```

## Documentation

- **[SETUP.md](./SETUP.md)** - Complete deployment and configuration guide

## Features

- ✅ Two pricing tiers (Standard & Agency)
- ✅ Stripe payment integration
- ✅ Automatic GitHub repository invitations
- ✅ Modern glass-morphism design
- ✅ Fully responsive
- ✅ SEO optimized
- ✅ Legal pages included

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app
│   └── public/             # Static assets
├── backend/
│   ├── api/                # Serverless functions
│   └── lib/                # Utilities
├── README.md               # This file
└── SETUP.md               # Detailed setup guide
```

## Environment Variables

Required for deployment (see SETUP.md for details):
- Stripe keys (3)
- GitHub credentials (3)
- Edge Config (2)
- URL configuration (3)

Total: 11 environment variables needed