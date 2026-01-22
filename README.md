# development-platforms-ca

## DungeonNews

A simple news platform built as part of the Development Platforms course.
Users can browse articles publicly, while authenticated users can create, view, and delete their own articles.

The project focuses on clear structure, secure data handling, and learning how frontend and backend work together.

## Installation 
1. Clone the repository
2. Open the project in VS Code
3. Run the project using Live Server or another local server
4. When registering a new user, you must confirm the account via the email sent by Supabase before logging in.
5. The project is deployed on Netlify and can be accessed via the provided link.
        https://endearing-squirrel-a302a6.netlify.app/

## Tech Stack
- HTML
- CSS
- JavaScript
- Supabase
     - Authentication
     - Database
     - Row Level Security (RLS)

## Features
- Public users can read articles
- Authenticated users can:
     - Register and log in
     - Create articles
     - Delete their own articles
- Articles are linked to the logged-in user
- Category filtering
- Separate article detail page

## Motivation
### Why I chose Option 2 (Supabase)
I chose Option 2 because I enjoy working with front-end and wanted to understand how a full-stack application works without building a back-end from scratch.
Supabase made it possible to focus on learning authentication, database structure, and security while still writing front-end code I’m comfortable with.

## What I liked
I really enjoyed:
     - Seeing data flow from database to front-end
     - Working with authentication and ownership
     - Fixing things step by step and understanding why something broke
It was very motivating to see features come together one by one.

### What I found difficult
The most difficult parts were:
     - Row Level Security (RLS)
     - Foreign key relationships
     - Understanding where errors came from when something didn’t work
Taking things slowly and testing often helped a lot.

### Supabase vs custom API
Supabase removed a lot of setup work and made it possible to focus on building the application itself.
A custom API would provide more control, but would also require more backend experience and time.
For this assignment, Supabase was a good and practical choice.

### Notes 
This project was built incrementally with frequent commits and testing.
The goal was learning and understanding, not rushing to finish.