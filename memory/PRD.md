# Onspotly - PRD

## Problem Statement
Build Onspotly landing page - an Uber-style real-time creator booking platform where users book nearby content creators who shoot, edit, and deliver reels within 30 minutes.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Styling**: Dark theme (#050505), glassmorphism, violet-to-pink gradient accents, Manrope + DM Sans fonts

## User Personas
1. **Event Organizers** - Need last-minute content for parties/celebrations
2. **Small Businesses** - Restaurants, cafes, retail shops needing daily reels
3. **Social Media Creators** - Influencers needing frequent content
4. **Corporate** - Product launches, team events
5. **Wedding Planners** - Behind-the-scenes coverage
6. **Content Creators (Shooters)** - Freelancers wanting to earn by shooting

## Core Requirements
- Hero with strong startup messaging and CTAs
- 7-step "How It Works" visual workflow
- Target audience cards (5 categories)
- Before/After feature comparison (4 features)
- 3-tier pricing ($49, $129, $199)
- US Map with 5 launch cities (Charlotte, Raleigh, Austin, Dallas, Houston)
- Shooter application form (saves to MongoDB + Airtable)
- Early access waitlist form (saves to MongoDB + Airtable)
- Privacy Policy page (full legal content)
- Terms of Service page (full legal content)
- 404 Not Found page with animation
- Terms & Privacy checkbox on both forms
- Smooth scroll navigation, animations, mobile responsive

## What's Been Implemented (Dec 2025 - Mar 2026)
- Multi-page architecture with routes: /, /how-it-works, /features, /pricing, /cities, /become-shooter, /join, /privacy, /terms
- Custom reel-scrolling page transition (phone mockup with scrolling reels, TikTok/Reels style)
- Backend API: POST /api/waitlist, GET /api/waitlist/count, POST /api/shooter-apply
- All forms functional with MongoDB persistence + Airtable sync
- Airtable integration: Waitlist (Name, Email, City) and Shooter (Name, Email, Phone Number, Portfolio Link, Experience, City, Device Type)
- Dark glassmorphism design with gradient accents
- Framer Motion scroll animations throughout
- Mobile responsive with hamburger menu
- Active nav state highlighting for current page
- "Continue Exploring" nav at bottom of each page
- SVG US Map with animated city markers
- Terms of Service page with 11 sections (full legal)
- Privacy Policy page with 10 sections (full legal)
- 404 page with animated floating particles
- Terms & Privacy checkbox on both forms (blocks submission if unchecked)
- Animated "Thank You for Joining Onspotly!" message on waitlist submission
- City field + Device Type dropdown (iPhone 13 to 16e) on shooter form
- All tests passing (100% backend, 100% frontend) - verified Mar 2026

## Key API Endpoints
- POST /api/waitlist - Join waitlist (name, email, city)
- GET /api/waitlist/count - Get waitlist count
- POST /api/shooter-apply - Apply as shooter (name, email, phone, portfolio_link, experience_years, city, device_type)

## Airtable Schema
- **Waitlist Base** (applhmWVQ5dU6HADJ): Name, Email, City
- **Shooter Base** (appXMxTv80BoZiQKL): Name, Email, Phone Number, Portfolio Link (Website / Instagram / YouTube / TikTok), Years of Experience in iPhone Videography, City, Device Type
  - NOTE: User needs to add "City" and "Device Type" columns to Airtable shooter base

## Prioritized Backlog
### P0 (Launch Blockers) - DONE
- All sections implemented and tested

### P1 (High Priority)
- Admin dashboard to view waitlist entries and shooter applications
- Email notifications on form submission (to hello@onspotlyapp.com)
- SEO meta tags and Open Graph tags

### P2 (Medium Priority)
- Animated visual explainer (Customer > Booking > Creator > Delivery)
- Interactive before/after slider comparison
- Google Analytics / event tracking
- App store pre-registration links

### P3 (Nice to Have)
- Blog/content section
- Testimonials section
- FAQ section
- Multi-language support
