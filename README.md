# ALIGN

**Professional Clarity**

ALIGN is a specialized tool designed to help professionals navigate workplace situations during menopause transitions with grace and authority. Leveraging advanced AI, it provides reframes, scientific context, and professional scripts tailored for various communication channels.

## Features

- **Reframe**: Validates your experience with professional grace and calm authority.
- **Science**: Provides evidence-based neurobiological context for symptoms.
- **Scripts**: Generates ready-to-use professional responses for Email, Slack, or In-Person interactions.

## Tech Stack

- **Frontend**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (Gemini)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (or yarn/pnpm)
- Google GenAI API Key

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd align
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Google GenAI API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
   Note: The application is configured to read `GEMINI_API_KEY` from the environment and expose it as `process.env.API_KEY` to the client.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local server address (usually `http://localhost:3000`).

## Usage

1. Enter a description of your workplace situation in the input field.
2. Click "Generate".
3. Review the Reframe, Science explanation, and suggested Scripts.
4. Copy the script that best fits your needs.

## License

MIT License
