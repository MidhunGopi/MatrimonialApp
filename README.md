# MatrimonialApp - Android Mobile Application

A modern matrimonial mobile application built with React Native for Android, designed for finding life partners. Features Indian-themed UI inspired by leading matrimonial platforms like Shaadi.com.

## Features

- 👤 User Registration and Authentication
- 📝 Create and Manage Profiles
- 🔍 Advanced Search with Multiple Filters (Gender, Age, Religion, City)
- 💑 Browse Profiles with Card-based UI
- 💌 Send Interest to Profiles
- 🔐 Secure JWT-based Authentication
- 📱 Native Android Mobile App
- 🎨 Indian-themed UI Design (Pink/Purple/Gold colors)
- 🕉️ Cultural Elements (Traditional colors & icons)

## Tech Stack

### Mobile Frontend
- React Native 0.72.6
- React Navigation (Stack & Bottom Tabs)
- React Native Vector Icons
- React Native Linear Gradient
- AsyncStorage for local data
- Axios for API calls

### Backend (Unchanged)
- Node.js with Express.js
- JWT for authentication
- bcryptjs for password hashing
- In-memory database (production-ready for MongoDB/PostgreSQL migration)
- RESTful API architecture

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android development)
- JDK 11 or higher
- Android SDK (API Level 33)
- Android device or emulator

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

3. Create a `.env` file for backend (optional):
```bash
cp .env.example .env
```

4. Set up Android development environment:
   - Install Android Studio
   - Install Android SDK (API 33)
   - Set up Android emulator or connect physical device

## Running the Application

### Backend Server

Start the backend API server:
```bash
npm run server
```
The server will run on `http://localhost:5000`

For development with auto-reload:
```bash
npm run server:dev
```

### Mobile App (Android)

1. Start Metro bundler:
```bash
npm start
```

2. In a new terminal, run the Android app:
```bash
npm run android
```

This will:
- Build the Android app
- Install it on your emulator/device
- Launch the app

### Development Notes

- Backend API URL is configured in `mobile/src/services/api.js`
- For Android emulator, it uses `10.0.2.2:5000` (emulator's localhost)
- For physical device, update API_URL with your computer's IP address

## Building for Production

### Generate Android APK:

```bash
cd mobile/android
./gradlew assembleRelease
```

APK will be generated at:
`mobile/android/app/build/outputs/apk/release/app-release.apk`

### Generate Android App Bundle (for Play Store):

```bash
cd mobile/android
./gradlew bundleRelease
```

Bundle will be at:
`mobile/android/app/build/outputs/bundle/release/app-release.aab`

**Note**: For production release, you need to:
1. Generate a release keystore
2. Configure signing in `android/app/build.gradle`
3. Update the backend API URL to production server

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

## Design Philosophy

The app follows Indian matrimonial design standards:
- **Colors**: Pink/Magenta (traditional auspicious color), Purple, Orange/Gold
- **Icons**: Including traditional symbols (🕉️ Om, 💕 Hearts)
- **Layout**: Card-based profile browsing similar to leading platforms
- **Typography**: Clear, readable fonts with appropriate hierarchy
- **Navigation**: Bottom tab navigation for easy mobile access

## Future Enhancements

- Profile photo upload with camera integration
- Real-time chat functionality
- Push notifications for matches
- Advanced matching algorithm based on preferences
- Payment integration for premium features
- iOS version
- Database integration (MongoDB/PostgreSQL for production)
- Email verification
- Phone number OTP verification
- Profile verification badges
- More detailed search filters (education, income, height, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Midhun Gopi

## Support

For support, email your-email@example.com or open an issue in the repository.