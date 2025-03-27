# ARNav: Augmented Reality Navigation App

## Project Overview
ARNav is an innovative mobile application that leverages augmented reality to provide intuitive, real-time navigation experiences. By overlaying directional information, points of interest, and navigation cues onto the device's camera view, ARNav transforms how users interact with their environment.

## Features
- Real-time AR navigation overlays
- GPS-based location tracking
- Points of Interest (POI) detection
- Camera-based route visualization
- Offline map support
- Accessibility features

## Technology Stack
- React Native
- Expo AR
- MapBox API
- OpenStreetMap
- React Native Vision Camera
- Expo Location Services

## Prerequisites
- Node.js (v16+)
- npm or Yarn
- Expo CLI
- Android Studio / Xcode
- Smartphone or Emulator

## Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/arnav-app.git
cd arnav-app
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Environment Setup
1. Create a `.env` file in the project root
2. Add the following configurations:
```
MAPBOX_ACCESS_TOKEN=your_mapbox_token
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Running the App
```bash
expo start
# Scan QR code with Expo Go app
```

## Configuration
- Customize `config.js` for app settings
- Modify `constants/` for environmental configurations

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Screenshots
[Placeholder for app screenshots]

## Future Roadmap
- Indoor navigation support
- Machine learning-enhanced AR detection
- Multi-language support
- Offline mode improvements
