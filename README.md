# MatrimonialApp

A modern matrimonial web application built with React and Node.js for finding life partners.

## Features

- 👤 User Registration and Authentication
- 📝 Create and Manage Profiles
- 🔍 Advanced Search with Multiple Filters
- 💑 Browse Potential Matches
- 💌 Send Interest to Profiles
- 🔐 Secure JWT-based Authentication
- 📱 Responsive Design

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing
- In-memory database (for demo purposes)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/MidhunGopi/MatrimonialApp.git
cd MatrimonialApp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
cp .env.example .env
```

4. Edit `.env` and update the values if needed.

## Running the Application

### Development Mode

#### Start the Backend Server:
```bash
npm start
```
The server will run on `http://localhost:5000`

#### Start the Frontend (in a new terminal):
```bash
npm run client
```
The React app will run on `http://localhost:3000`

### Production Build

1. Build the React app:
```bash
npm run build
```

2. Set environment to production:
```bash
export NODE_ENV=production
```

3. Start the server:
```bash
npm start
```

The app will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Profiles
- `GET /api/profiles` - Get all profiles (with optional filters)
- `GET /api/profiles/:id` - Get profile by ID
- `POST /api/profiles` - Create a new profile (authenticated)
- `PUT /api/profiles/:id` - Update profile (authenticated)
- `GET /api/profiles/me/profile` - Get current user's profile (authenticated)

### Matches
- `GET /api/matches` - Get user's matches (authenticated)
- `POST /api/matches` - Send match request (authenticated)

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Profile**: Fill in your details to create a matrimonial profile
3. **Browse Profiles**: Search and filter profiles based on your preferences
4. **View Details**: Click on any profile to view complete details
5. **Send Interest**: Express interest in profiles you like
6. **Manage Profile**: View and manage your own profile

## Search Filters

- Gender
- Age Range (Min/Max)
- Religion
- City
- And more...

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Secure API endpoints with middleware
- Input validation

## Future Enhancements

- Profile image upload
- Real-time chat functionality
- Email notifications
- Advanced matching algorithm
- Payment integration for premium features
- Mobile app (React Native)
- Database integration (MongoDB/PostgreSQL)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Midhun Gopi

## Support

For support, email your-email@example.com or open an issue in the repository.