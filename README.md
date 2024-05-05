# Campaign Management System

Client-side application for campaign management system, developed by Ali Shour and Haifa Naim, two awesome Front-end devs!

## About the Project

This project helps businesses set up and launch promotional and marketing campaigns. Through CMS, businesses can save all customers' data and create SMS (local and international), Email, and WhatsApp campaigns, choosing from prebuilt campaign templates or creating campaigns from scratch.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [pnpm](https://pnpm.io/) (if not installed, easiest way to install it locally is to run: `npm install -g pnpm` )

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iamshour/campaign-management-system
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

   ```
   VITE_APP_API_BASE_URL=YOUR_SERVER_BASE_URL
   ```

   Replace YOUR_SERVER_BASE_URL with the base URL of your server.

### Running the App

To start the development server, run:

```bash
pnpm dev
```

The application will be available at http://localhost:3000 by default.

### Building the App

To build the application for production, run:

```bash
pnpm build
```
