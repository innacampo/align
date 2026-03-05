# ALIGN

**Professional Clarity**

ALIGN is a specialized tool designed to help professionals navigate workplace situations during menopause transitions with grace and authority. Leveraging advanced AI, it provides reframes, scientific context, and professional scripts tailored for various communication channels.

## Features

- **Reframe**: Validates your experience with professional grace and calm authority.
- **Science**: Provides evidence-based neurobiological context for symptoms.
- **Scripts**: Generates ready-to-use professional responses for Email, Slack, or In-Person interactions.

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Express.js (API proxy, rate limiting, security headers)
- **Language**: TypeScript / JavaScript
- **AI Integration**: Google GenAI SDK (Gemini) — server-side only

## Architecture

```
Browser  ──►  Vite (dev) / Static files (prod)
                │
                ▼
         Express Server (/api/generate)
                │
                ▼
         Google Gemini API
```

The Gemini API key **never** reaches the client. All AI requests are proxied through the Express backend server, which also enforces rate limiting, input validation, and security headers.

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm (or yarn/pnpm)
- [Google GenAI API Key](https://aistudio.google.com/apikey)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd align
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run in development mode:
   ```bash
   npm run dev
   ```
   This starts both the Vite dev server (port 3000) and the Express API server (port 8080). The Vite dev server proxies `/api` requests to the backend.

5. Open `http://localhost:3000` in your browser.

### Production

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```
   This serves the built frontend and API from a single Express server on port 8080 (configurable via `PORT` env var).

## Security

- **API key isolation**: Gemini key stays server-side; never bundled into client code
- **Rate limiting**: 30 requests per 15-minute window per IP
- **Input validation**: Length limits, control character stripping
- **Security headers**: Helmet.js (CSP, HSTS, X-Frame-Options, etc.)
- **Body size limit**: 10KB max request body
- **No source maps** in production builds

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) before opening issues or pull requests. Contributions can include bug fixes, new features, documentation improvements, or tests.

## Support & Funding

If you'd like to support development, consider [sponsoring the project](https://github.com/sponsors/<your-github-username>) or visiting our [funding page](https://github.com/<your-github-username>/align/settings/funding). The `.github/FUNDING.yml` file lists available options.

## License

MIT License
