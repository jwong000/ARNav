import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const PointsOfInterest = () => {
  const [nearbyPOIs, setNearbyPOIs] = useState([]);

  useEffect(() => {
    const fetchNearbyPOIs = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        // Replace with actual API call to OpenStreetMap or similar service
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
        const data = await response.json();

        const pois = [
          {
            name: data.name || 'Unknown Location',
            type: data.type || 'General',
            distance: 0
          }
        ];

        setNearbyPOIs(pois);
      } catch (error) {
        console.error('POI Fetch Error:', error);
      }
    };

    fetchNearbyPOIs();
  }, []);

  return (
    <View style={styles.poiContainer}>
      {nearbyPOIs.map((poi, index) => (
        <View key={index} style={styles.poiItem}>
          <Text style={styles.poiName}>{poi.name}</Text>
          <Text style={styles.poiType}>{poi.type}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  poiContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 10
  },
  poiItem: {
    marginBottom: 5
  },
  poiName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  poiType: {
    color: 'gray',
    fontSize: 14
  }
});

export default PointsOfInterest;
