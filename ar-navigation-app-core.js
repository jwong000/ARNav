import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Camera } from 'expo-camera';
import { AR } from 'expo-ar-module';

// Mapbox token configuration
MapboxGL.setAccessToken('YOUR_MAPBOX_ACCESS_TOKEN');

const ARNavigationApp = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location Permission Denied');
        return;
      }

      // Request camera permissions
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const calculateRoute = async (start, end) => {
    try {
      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?access_token=YOUR_MAPBOX_ACCESS_TOKEN`);
      const data = await response.json();
      setRoute(data.routes[0]);
    } catch (error) {
      console.error('Route calculation error:', error);
    }
  };

  const renderAROverlay = () => {
    if (!route) return null;

    return route.legs[0].steps.map((step, index) => (
      <AR.Anchor 
        key={index}
        position={{
          x: step.maneuver.location[0],
          y: step.maneuver.location[1],
          z: 0
        }}
      >
        <Text style={styles.arText}>{step.maneuver.instruction}</Text>
      </AR.Anchor>
    ));
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back}>
        {location && (
          <MapboxGL.MapView 
            style={styles.map}
            centerCoordinate={[location.longitude, location.latitude]}
          >
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
        )}
        
        {renderAROverlay()}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  camera: {
    flex: 1,
    width: '100%'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5
  },
  arText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 5,
    borderRadius: 5
  }
});

export default ARNavigationApp;
