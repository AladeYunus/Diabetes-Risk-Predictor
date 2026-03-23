# Future Roadmap

Features planned but not yet implemented. These require backend infrastructure.

## Priority 1 — Backend API
- [ ] Deploy FastAPI prediction API (Railway or Render)
- [ ] Add rate limiting (5 free predictions/day by IP)
- [ ] Health check endpoint
- [ ] CORS configuration for production domain

## Priority 2 — User Accounts
- [ ] Sign-up / login (email + password or OAuth)
- [ ] User dashboard with prediction history
- [ ] Session management

## Priority 3 — Payments (Stripe)
- [ ] Stripe integration with £ GBP pricing
- [ ] Free tier: 5 predictions/day
- [ ] Pro tier: £9/mo unlimited predictions + API access
- [ ] Annual plan: £90/year (save £18)
- [ ] Checkout flow + success/cancel pages
- [ ] Webhook handler for payment events
- [ ] Stripe Tax for UK VAT
- [ ] Customer billing portal

## Priority 4 — Enhanced Model
- [ ] Train on larger, more diverse dataset
- [ ] Add XGBoost / Random Forest ensemble
- [ ] Feature importance visualisation
- [ ] Confidence intervals on predictions

## Priority 5 — Infrastructure
- [ ] Custom domain (e.g. diabetespredict.co.uk)
- [ ] SSL certificate
- [ ] Error monitoring (Sentry)
- [ ] Uptime monitoring
- [ ] GitHub Actions CI/CD pipeline

## Priority 6 — Growth
- [ ] Email capture for newsletter
- [ ] SEO meta tags + sitemap.xml
- [ ] Google Analytics (with cookie consent)
- [ ] Social sharing cards (Open Graph)
- [ ] Blog with health content
- [ ] Mobile-responsive improvements

## Priority 7 — UK Compliance (for paid tier)
- [ ] ICO registration (required once processing personal data)
- [ ] Data Processing Agreement with hosting provider
- [ ] Cookie policy page (separate from privacy policy)
- [ ] Refund policy page
- [ ] DPIA (Data Protection Impact Assessment) for health data
