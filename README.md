# Saksbehandler Pro

A modern web application for automated document analysis and processing, specifically designed for handling Norwegian welfare (NAV) case documents.

## Overview

Saksbehandler Pro consists of two main parts:

1. A React-based frontend for document upload and visualization
2. A Python-based backend development environment for document processing (located in `backend_development/`)

## Quick Start - Frontend Demo

The frontend is a standalone React application that demonstrates the UI flow with mock data.

### Prerequisites

- Node.js (v16 or higher)
- npm or bun

### Installation

```bash
# Install dependencies
npm install
# or using bun
bun install
```

### Running the Frontend

```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

### Frontend Features

- Dark mode UI with smooth animations
- Document upload interface
- Mock document analysis visualization

## Backend Development Environment

The complete backend logic and notebooks can be found in the `backend_development/` directory:

```
backend_development/
├── data/                  # Sample PDF documents
├── llm/                   # LLM integration modules
├── response/             # Mock response templates
├── utils/               # PDF processing utilities
└── pdf_synthesizer_app.ipynb  # Main development notebook
```

### Key Components in Backend Development

1. **PDF Processing**

   - Located in `backend_development/utils/`
   - Handles PDF text extraction and analysis
   - Uses PyMuPDF for reliable text extraction

2. **LLM Integration**

   - Located in `backend_development/llm/`
   - OpenAI GPT integration for document analysis
   - Configurable prompts and parameters

3. **Development Notebook**
   - `pdf_synthesizer_app.ipynb` contains the core logic
   - Demonstrates the complete workflow
   - Includes examples and test cases

### Environment Variables

The project uses environment variables for configuration. Copy `.env.example` to create your own `.env`:

```bash
cp .env.example .env
```

Required variables:

```
OPENAI_ORGANIZATION=your-org-id
OPENAI_API_KEY=your-api-key
```

## Project Structure

```
saksbehandler-pro/
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── pages/           # Page components
│   └── styles/          # CSS and styling
├── backend_development/  # Backend development environment
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Development Status

The project is currently in development with:

- ✅ Mockup frontend demo with UI flow
- ✅ Backend code in `backend_development/` notebook to combie PDFs and generate a joint documenet with citation links 

