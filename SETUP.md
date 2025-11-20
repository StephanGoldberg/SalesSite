# Directory Maker Sales Site - Setup Guide

## Overview
This is the complete sales website for Directory Maker, a directory website boilerplate. The site handles product presentation, checkout, and automatic GitHub repository access delivery through a seamless one-time payment system.

## Project Description
The Directory Maker is a web application that allows users to purchase access to a private GitHub repository. It's designed to provide a seamless process for selling and granting access to exclusive code or content stored in a GitHub repository through automated payment processing and GitHub API integration.

## Tech Stack
- **Frontend**: React.js (Create React App)
- **Backend**: Node.js with Express.js (Serverless Functions)
- **Hosting**: Vercel
- **Payment Processing**: Stripe Checkout
- **Database**: Vercel Edge Config (temporary access token storage)
- **GitHub Integration**: Octokit (GitHub API client)
- **Repository Access**: GitHub API

## Key Features
1. One-time payment system for repository access
2. Stripe integration for secure payments
3. Automated GitHub repository access management
4. User-friendly interface for completing purchase
5. Two pricing tiers (Standard & Agency licenses)
6. Automatic email invitations to private repository

## How The Sales Site Works

### User Workflow
1. User visits the site and explores features
2. Clicks "Buy Now" button (either $79 Standard or $499 Agency license)
3. Backend creates Stripe checkout session and stores pending access
4. User redirected to Stripe Checkout and completes payment
5. Stripe sends webhook event to confirm payment
6. Backend updates pending access status
7. User redirected to `/access` page
8. System automatically:
   - Verifies payment with Stripe
   - Generates invitation to private GitHub repository
   - Displays access link to user
9. User receives email invitation from GitHub
10. Backend removes pending access after successful addition

### Main Components

#### Frontend Components
1. **Landing page** - Product information and features
2. **Stripe Checkout integration** - Payment processing
3. **Access page** - Payment verification and GitHub access delivery
4. **Documentation page** - Public product documentation
5. **Legal pages** - Terms, Privacy, License, Contact

#### Backend (Serverless Functions)
1. **Create Checkout Session** (`/api/create-checkout-session`) - Initiates Stripe payment process
2. **Webhook Handler** (`/api/verify-payment`) - Processes Stripe webhook events
3. **Grant Access** (`/api/grant-access`) - Grants repository access after payment confirmation

#### Database
- **Vercel Edge Config** - Stores temporary access tokens and payment status
- Simple key-value storage in the serverless environment
- Automatically handles cleanup of expired sessions

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
│   │   ├── Access.js          # Post-purchase access page (payment verification)
│   │   ├── Documentation.js   # Public docs overview
│   │   ├── TermsOfService.js
│   │   ├── PrivacyPolicy.js
│   │   ├── License.js
│   │   └── Contact.js
│   └── App.js                 # Main routing

backend/
├── api/
│   ├── create-checkout-session.js  # Creates Stripe checkout & stores pending access
│   ├── verify-payment.js           # Handles Stripe webhooks & updates payment status
│   └── grant-access.js             # Adds user to GitHub repo after payment verification
└── lib/
    └── db.js                        # Manages Edge Config data storage
```

### Key Files and Their Functions

#### 1. `frontend/src/pages/Access.js`
**Purpose**: Handles the user interface for checking payment status and displaying GitHub access
- Verifies payment completion via Stripe session ID
- Displays repository invitation link
- Shows error states for failed payments
- Provides instructions for GitHub access

#### 2. `backend/api/create-checkout-session.js`
**Purpose**: Initiates the payment process
- Creates a Stripe checkout session with correct pricing ($79 or $499)
- Generates a unique access token (UUID)
- Generates CSRF protection state parameter
- Stores initial pending access information in Edge Config
- Returns session ID to frontend
- Sets 30-minute expiration for checkout session

#### 3. `backend/api/verify-payment.js`
**Purpose**: Handles Stripe webhook events
- Receives `checkout.session.completed` events from Stripe
- Verifies webhook signature for security
- Updates payment status for pending access in Edge Config
- Confirms successful payment before granting access

#### 4. `backend/api/grant-access.js`
**Purpose**: Grants GitHub repository access
- Verifies payment status from Edge Config
- Uses Octokit to interact with GitHub API
- Sends repository invitation to user's email
- Removes pending access after successful invitation
- Handles errors and rate limiting

#### 5. `backend/lib/db.js`
**Purpose**: Manages data storage
- Interfaces with Vercel Edge Config
- Sets pending access information (token, sessionId, payment status)
- Retrieves access information by token
- Updates payment status
- Handles data cleanup

## Environment Variables Setup

### Required Variables (11 total)

#### 1. GITHUB_ACCESS_TOKEN
**Where to get it:**
- Go to GitHub.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
- Click "Generate new token (classic)"
- Select scopes: `repo` (full control) and `read:user`
- Generate and copy the token
- **Important**: Save it immediately, you won't see it again

**What it does:** Allows the Octokit client to invite users to your private repository

**Used in:** `backend/api/grant-access.js`

#### 2. STRIPE_SECRET_KEY
**Where to get it:**
- Go to Stripe Dashboard → Developers → API Keys
- Copy the "Secret key" (starts with `sk_live_` or `sk_test_`)

**What it does:** Processes payments and verifies transactions

**Used in:** `backend/api/create-checkout-session.js`, `backend/api/verify-payment.js`

#### 3. STRIPE_WEBHOOK_SECRET
**Where to get it:**
- Go to Stripe Dashboard → Developers → Webhooks
- Add endpoint: `https://your-domain.com/api/verify-payment`
- Select events: `checkout.session.completed`
- Copy the "Signing secret" (starts with `whsec_`)

**What it does:** Securely verifies webhook events from Stripe to prevent fraud

**Used in:** `backend/api/verify-payment.js`

#### 4. REACT_APP_STRIPE_PUBLISHABLE_KEY
**Where to get it:**
- Go to Stripe Dashboard → Developers → API Keys
- Copy the "Publishable key" (starts with `pk_live_` or `pk_test_`)

**What it does:** Frontend Stripe integration for checkout

**Used in:** `frontend/src/components/PricingSection.js`, `frontend/src/components/HeroSection.js`

#### 5. EDGE_CONFIG_ID
**Where to get it:**
- In Vercel Dashboard → Storage → Edge Config
- Create new Edge Config or use existing
- Copy the ID (starts with `ecfg_`)

**What it does:** Stores temporary access tokens before payment verification

**Used in:** `backend/lib/db.js`

#### 6. EDGE_CONFIG
**Where to get it:**
- Same as above, but copy the full connection string
- Format: `https://edge-config.vercel.com/ecfg_xxxxx?token=xxxxx`

**What it does:** Connection string for Edge Config database operations

**Used in:** `backend/lib/db.js`

#### 7. REACT_APP_BACKEND_URL
**What to set:**
- Production: `https://your-domain.com/api`
- Change "your-domain.com" to your actual domain

**What it does:** Frontend knows where to send API requests

**Used in:** All frontend components making API calls

#### 8. FRONTEND_URL
**What to set:**
- Production: `https://your-domain.com`
- Change to your actual domain

**What it does:** Backend redirects and CORS configuration

**Used in:** `backend/api/create-checkout-session.js` for success/cancel URLs

#### 9. PUBLIC_URL
**What to set:**
- Simply: `/`

**What it does:** React app routing base path

**Used in:** React Router configuration

#### 10. GITHUB_REPO_OWNER
**What to set:**
- Your GitHub username (the owner of the private repository)
- Example: If repo is `github.com/YourUsername/repo`, use `YourUsername`

**What it does:** Identifies which GitHub account owns the repository

**Used in:** `backend/api/grant-access.js` with Octokit

#### 11. GITHUB_REPO_NAME
**What to set:**
- The name of your private repository containing the boilerplate
- Example: If repo is `github.com/YourUsername/directory-maker-code`, use `directory-maker-code`

**What it does:** Identifies which specific repository to grant access to

**Used in:** `backend/api/grant-access.js` with Octokit

## Deployment Steps

### 1. Transfer Repository
- Fork or transfer this repository to your GitHub account
- Make sure the Directory Maker boilerplate is in a separate private repository
- Verify the GitHub token has admin access to the private repository

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
5. Redeploy the project after adding variables

### 5. Configure Vercel Serverless Functions
The API routes in `backend/api/` will automatically become serverless functions:
- `/api/create-checkout-session` - Payment initiation
- `/api/verify-payment` - Webhook handler
- `/api/grant-access` - Repository access granting

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
6. Test webhook with Stripe CLI (optional):
   ```bash
   stripe listen --forward-to localhost:3000/api/verify-payment
   ```

### 7. Verify Edge Config Setup
1. Go to Vercel Dashboard → Storage → Edge Config
2. Verify the Edge Config is connected to your project
3. Test that the connection string works
4. Check that items can be written/read

### 8. Test the Complete Flow
1. Visit your site
2. Click "Buy Now" on either plan
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify redirect to `/access` page
6. Check that payment is verified
7. Verify GitHub invitation is sent
8. Check Stripe webhook logs
9. Check Vercel function logs

## Important Notes

### GitHub Repository Access
- Users receive an email invitation to the private repository
- They must accept the invitation within 7 days
- GitHub API has rate limits (5000 requests/hour for authenticated requests)
- Failed invitations are logged in Vercel function logs

### Payment Processing
- Standard License: $79 (single project use)
- Agency License: $499 (unlimited client projects)
- All payments are one-time purchases
- No recurring billing
- Checkout sessions expire after 30 minutes
- Payment status is verified via Stripe webhooks

### Data Flow
1. **Create Session**: Access token → Edge Config (pending)
2. **Webhook**: Payment confirmed → Edge Config (paid: true)
3. **Grant Access**: Verify paid status → GitHub invitation → Remove from Edge Config
4. **Cleanup**: Expired sessions auto-cleaned (30 min timeout)

### Security Considerations
- Never commit `.env` files to version control
- Rotate GitHub token if exposed
- Use Stripe webhook signatures for verification
- CSRF protection via state parameter
- Rate limiting handled by Vercel (automatically)
- Keep dependencies updated (npm audit)
- Validate all user inputs
- Use HTTPS only in production

### Customization

#### To change pricing:
1. Update `PricingSection.js` (frontend display prices)
2. Update `create-checkout-session.js` (line 25-26: unit_amount values)
3. Update all marketing copy and documentation
4. Update Stripe product descriptions

#### To change repository:
1. Update `GITHUB_REPO_OWNER` environment variable
2. Update `GITHUB_REPO_NAME` environment variable
3. Ensure new repository is private
4. Ensure GitHub token has admin access to new repository
5. Test access granting with test purchase

#### To add features:
1. Modify React components in `frontend/src/components/`
2. Add new pages in `frontend/src/pages/`
3. Update routing in `App.js`
4. Rebuild and redeploy

## Troubleshooting

### Users not receiving access
- **Check GitHub token**: Verify it hasn't expired (Settings → Developer Settings)
- **Check repository name/owner**: Must match exactly (case-sensitive)
- **Check Stripe webhook**: Verify events are being received
- **Check Vercel logs**: Go to Vercel Dashboard → Functions → Logs
- **Check GitHub rate limits**: API limits may be hit with many users
- **Verify payment status**: Check Edge Config data

### Checkout not working
- **Verify Stripe keys**: Check both publishable and secret keys match
- **Check CORS settings**: Verify FRONTEND_URL is correct
- **Ensure webhook secret matches**: Must match Stripe dashboard
- **Check browser console**: Look for JavaScript errors
- **Test with Stripe CLI**: Use test mode first

### Site not loading
- **Check environment variables**: All 11 must be set
- **Verify build**: Check Vercel deployment logs
- **Check function logs**: Look for errors in serverless functions
- **Test API endpoints**: Use curl or Postman
- **Check DNS settings**: Verify domain is pointing to Vercel

### Webhook issues
- **Verify endpoint URL**: Must be publicly accessible
- **Check webhook secret**: Must match exactly
- **Look at Stripe logs**: Stripe Dashboard → Developers → Webhooks → Events
- **Test webhook signature**: Verify signature validation works
- **Check response times**: Webhooks must respond within 30 seconds

### Edge Config issues
- **Verify connection**: Test Edge Config connection string
- **Check permissions**: Ensure project has access
- **Monitor quota**: Check Edge Config usage limits
- **Test read/write**: Verify data can be stored and retrieved

## API Endpoints Documentation

### POST /api/create-checkout-session
**Purpose**: Creates Stripe checkout session and stores pending access

**Request Body**:
```json
{
  "planType": "standard" | "agency"
}
```

**Response**:
```json
{
  "id": "cs_test_...",
  "token": "uuid-v4-token"
}
```

**Process**:
1. Generates unique access token
2. Creates Stripe checkout session
3. Stores pending access in Edge Config
4. Returns session ID for redirect

### POST /api/verify-payment
**Purpose**: Stripe webhook handler for payment confirmation

**Headers Required**:
- `stripe-signature`: Webhook signature for verification

**Process**:
1. Verifies webhook signature
2. Extracts session data
3. Updates payment status in Edge Config
4. Returns 200 OK

### POST /api/grant-access
**Purpose**: Grants GitHub repository access after payment

**Request Body**:
```json
{
  "token": "uuid-v4-token",
  "sessionId": "cs_test_..."
}
```

**Response**:
```json
{
  "success": true,
  "invitationUrl": "https://github.com/..."
}
```

**Process**:
1. Verifies payment status from Edge Config
2. Uses Octokit to send GitHub invitation
3. Returns invitation URL
4. Cleans up Edge Config data

## Monitoring and Maintenance

### Regular Checks
- Monitor Stripe webhook success rate
- Check GitHub API rate limit usage
- Review Vercel function logs weekly
- Monitor Edge Config usage
- Check for failed invitations
- Review customer support tickets

### Monthly Tasks
- Rotate GitHub access token (security best practice)
- Review and update dependencies
- Check for security vulnerabilities
- Review Stripe transaction fees
- Analyze conversion rates

### Performance Optimization
- Monitor serverless function cold start times
- Optimize Edge Config reads/writes
- Cache static assets
- Minimize bundle size
- Use React.lazy for code splitting

## Support
For technical issues with the sales site, check:
- Vercel deployment logs: Vercel Dashboard → Deployments
- Stripe webhook logs: Stripe Dashboard → Developers → Webhooks
- GitHub API rate limits: Check response headers
- Edge Config status: Vercel Dashboard → Storage
- Function logs: Vercel Dashboard → Functions

## File Locations
- Static assets: `frontend/public/`
- Images: `frontend/public/images/`
- Legal pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- API functions: `backend/api/`
- Utilities: `backend/lib/`

## What's Included
- Complete React sales site with modern UI
- Stripe checkout integration (two pricing tiers)
- Automated GitHub access delivery via Octokit
- Webhook handling for payment verification
- Edge Config temporary storage
- Responsive glass-morphism design
- FAQ section with collapsible answers
- Documentation
- Legal pages 
- Error handling and validation
- Security best practices

## Dependencies
```json
{
  "frontend": {
    "@stripe/stripe-js": "Payment processing",
    "react-router-dom": "Routing",
    "axios": "HTTP client"
  },
  "backend": {
    "stripe": "Payment API",
    "@octokit/rest": "GitHub API client",
    "@vercel/edge-config": "Data storage"
  }
}
```

Good luck with your new business!