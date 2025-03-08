# Lead Manager API

A RESTful API for managing leads built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Make sure MongoDB service is running)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```bash
MONGO_URI=mongodb://localhost:27017/leadmanager
PORT=5000
```

## Running the Application

For development (with auto-reload):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Leads

- **POST** `/api/leads` - Create a new lead
  - Body: `{ "name": "string", "email": "string", "status": "string" }`
  - Status options: ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"]

- **GET** `/api/leads` - Get all leads

- **GET** `/api/leads/:id` - Get a specific lead

- **PUT** `/api/leads/:id` - Update a lead
  - Body: `{ "name": "string", "email": "string", "status": "string" }`

- **DELETE** `/api/leads/:id` - Delete a lead

## Response Format

### Success Response
```json
{
  "success": true,
  "data": <response_data>,
  "message": <success_message>
}
```

### Error Response
```json
{
  "success": false,
  "message": <error_message>,
  "error": <error_details>
}
```

## Validation

The API includes validation for:
- Name (required, 2-100 characters)
- Email (required, valid email format)
- Status (must be one of the predefined options)

## Error Handling

- Duplicate email addresses are caught and return appropriate error messages
- Invalid MongoDB IDs return 404 errors
- Validation errors return detailed error messages 