# EZ-Assi Cards Management System

## Description

This project is an Angular-based web application integrated with a NodeJS backend and a MariaDB database. It features a responsive design, infinite scrolling, and full CRUD capabilities.

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- Angular CLI installed (`npm install -g @angular/cli`)
- MariaDB or MySQL installed

### Database Setup

1. Start your MariaDB server.
2. Run the `MariaScript.sql` script to create the database and initial tables:

### Server Setup

1. Navigate to the `server` directory.
2. Install dependencies: `npm install`.
3. Start the server: `node index.js`.

### Frontend Setup

1. From the root directory, install Angular dependencies: `npm install`.
2. Serve the Angular application: `ng serve`.
3. Open `http://localhost:4200` in your browser.

## Features

- **Create New Card**: Click the "Add Card" button.
- **Edit Card**: Edit by clicking the edit icon.
- **Delete Card**: Remove by clicking the delete icon.
- **Infinite Scroll**: Scroll down to load more cards. If it doesn't work, try scrolling up slightly then down again.

## Testing

Use Postman or a similar tool to test API endpoints.

There is a collection in the root folder named cards.postman_collection.json you can use to import with postman.
