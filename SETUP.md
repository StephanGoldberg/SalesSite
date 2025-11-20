# Directory Maker Sales Site - Setup Guide

## Overview
This is the complete sales website for Directory Maker, a directory website boilerplate. The site handles product presentation, checkout, and automatic GitHub repository access delivery.

## Tech Stack
- **Frontend**: React (Create React App)
- **Backend**: Node.js API routes
- **Hosting**: Vercel
- **Payment**: Stripe
- **Database**: Vercel Edge Config (for temporary access token storage)
- **Repository Access**: GitHub API

## How The Sales Site Works

### User Flow
1. User visits the site and explores features
2. Clicks "Buy Now" button (either $79 Standard or $499 Agency license)
3. Redirected to Stripe Checkout
4. After successful payment, redirected to `/access` page
5. System automatically:
   - Verifies payment with Stripe
   - Generates invitation to private GitHub repository
   - Displays access link to user

### File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.js           # Navigation bar
│   │   ├── HeroSection.js      # Landing section with CTA
│   │   ├── FeaturesSection.js  # Product features
│   │   ├── ImageGallerySection.js  # Screenshots
│   │   ├── PricingSection.js   # Pricing cards (2 plans)
│   │   ├── VideoSection.js     # Demo video
│   │   ├── FAQSection.js       # FAQ accordion
│   │   └── Footer.js           # Footer links
│   ├── pages/
│   │   ├── Home.js            # Main landing page
│   │   ├── Access.js          # Post-purchase access page
│   │   ├── Documentation.js   # Public docs overview
│   │   ├── TermsOfService.js
│   │   ├── PrivacyPolicy.js
│   │   ├── License.js
│   │   └── Contact.js
│   └── App.js                 # Main routing

backend/
├── api/
│   ├── create-checkout-session.js  # Creates Stripe checkout
│   ├── verify-payment.js           # Verifies Stripe payment
│   └── grant-access.js             # Sends GitHub invitation
└── lib/
    └── db.js                        # Edge Config operations
```

## Environment Variables Setup

### Required Variables (11 total)

#### 1. GITHUB_ACCESS_TOKEN
**Where to get it:**
- Go to GitHub.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
- Click "Generate new token (classic)"
- Select scopes: `repo` (full control) and `read:user`
- Generate and copy the token
- **Important**: Save it immediately, you won't see it again

**What it does:** Allows the site to invite users to your private repository

#### 2. STRIPE_SECRET_KEY
**Where to get it:**
- Go to Stripe Dashboard → Developers → API Keys
- Copy the "Secret key" (starts with `sk_live_` or `sk_test_`)

**What it does:** Processes payments and verifies transactions

#### 3. STRIPE_WEBHOOK_SECRET
**Where to get it:**
- Go to Stripe Dashboard → Developers → Webhooks
- Add endpoint: `https://your-domain.com/api/verify-payment`
- Select events: `checkout.session.completed`
- Copy the "Signing secret" (starts with `whsec_`)

**What it does:** Securely verifies webhook events from Stripe

#### 4. REACT_APP_STRIPE_PUBLISHABLE_KEY
**Where to get it:**
- Go to Stripe Dashboard → Developers → API Keys
- Copy the "Publishable key" (starts with `pk_live_` or `pk_test_`)

**What it does:** Frontend Stripe integration for checkout

#### 5. EDGE_CONFIG_ID
**Where to get it:**
- In Vercel Dashboard → Storage → Edge Config
- Create new Edge Config or use existing
- Copy the ID (starts with `ecfg_`)

**What it does:** Stores temporary access tokens before payment verification

#### 6. EDGE_CONFIG
**Where to get it:**
- Same as above, but copy the full connection string
- Format: `https://edge-config.vercel.com/ecfg_xxxxx?token=xxxxx`

**What it does:** Connection string for Edge Config database

#### 7. REACT_APP_BACKEND_URL
**What to set:**
- Production: `https://your-domain.com/api`
- Change "your-domain.com" to your actual domain

**What it does:** Frontend knows where to send API requests

#### 8. FRONTEND_URL
**What to set:**
- Production: `https://your-domain.com`
- Change to your actual domain

**What it does:** Backend redirects and CORS configuration

#### 9. PUBLIC_URL
**What to set:**
- Simply: `/`

**What it does:** React app routing base path

#### 10. GITHUB_REPO_OWNER
**What to set:**
- Your GitHub username (the owner of the private repository)
- Example: If repo is `github.com/YourUsername/repo`, use `YourUsername`

**What it does:** Identifies which GitHub account owns the repository

#### 11. GITHUB_REPO_NAME
**What to set:**
- The name of your private repository containing the boilerplate
- Example: If repo is `github.com/YourUsername/directory-maker-code`, use `directory-maker-code`

**What it does:** Identifies which specific repository to grant access to

## Deployment Steps

### 1. Transfer Repository
- Fork or transfer this repository to your GitHub account
- Make sure the Directory Maker boilerplate is in a separate private repository

### 2. Domain Transfer
- Transfer domain ownership
- Update domain DNS to point to your Vercel project

### 3. Deploy to Vercel

**Option A: Import from GitHub**
1. Go to Vercel Dashboard
2. Click "Add New" → "Project"
3. Import your Git repository
4. Framework Preset: Create React App
5. Root Directory: `./` (or `frontend/` if structured that way)
6. Build Command: `npm run build`
7. Output Directory: `build`
8. Install Command: `npm install`

**Option B: Vercel CLI**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

### 4. Add Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add all 11 variables listed above
3. Select "Production", "Preview", and "Development" for each
4. Click "Save"

### 5. Configure Vercel Serverless Functions
The API routes in `backend/api/` will automatically become serverless functions:
- `/api/create-checkout-session`
- `/api/verify-payment`
- `/api/grant-access`

Make sure your `vercel.json` includes:
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```

### 6. Set Up Stripe Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/verify-payment`
3. Select event: `checkout.session.completed`
4. Copy webhook signing secret
5. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### 7. Test the Flow
1. Visit your site
2. Click "Buy Now"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Verify you receive GitHub invitation

## Important Notes

### GitHub Repository Access
- Users receive an email invitation to the private repository
- They must accept the invitation within 7 days
- Invitation link is also displayed on the `/access` page

### Payment Processing
- Standard License: $79 (single project use)
- Agency License: $499 (unlimited client projects)
- All payments are one-time purchases
- No recurring billing

### Security Considerations
- Never commit `.env` files
- Rotate GitHub token if exposed
- Use Stripe webhook signatures
- Implement rate limiting if needed
- Keep dependencies updated

### Customization
To change pricing:
1. Update `PricingSection.js` (frontend display)
2. Update `create-checkout-session.js` (actual charge amount)
3. Update all marketing copy

To change repository:
1. Update `GITHUB_REPO_OWNER` and `GITHUB_REPO_NAME` in environment variables
2. Ensure new repository is private
3. Ensure GitHub token has access to new repository

## Troubleshooting

### Users not receiving access
- Check GitHub token permissions
- Verify repository name/owner are correct
- Check Stripe webhook is receiving events
- Look at Vercel function logs

### Checkout not working
- Verify Stripe keys are correct (publishable + secret)
- Check CORS settings in backend
- Ensure webhook secret matches Stripe

### Site not loading
- Check all environment variables are set
- Verify build completed successfully
- Check Vercel function logs for errors

## Support
For technical issues with the sales site, check:
- Vercel deployment logs
- Stripe webhook logs
- GitHub API rate limits
- Edge Config connection

## File Locations
- Static assets: `frontend/public/`
- Images: `frontend/public/images/`
- Legal pages: `frontend/src/pages/`
- Components: `frontend/src/components/`

## What's Included
- Complete React sales site
- Stripe checkout integration
- Automatic GitHub access delivery
- Responsive design
- Glass-morphism UI
- FAQ section
- Documentation page
- Legal pages (Terms, Privacy, License, Contact)

Good luck with your new business!