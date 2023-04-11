import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { useState } from 'react';

const INITIAL_REGION = {
  latitude: 47.6062,
  longitude: -122.3321,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

export default function App() {
 let [data, setData ] = useState([]);
 
  return (
    <>
      <MapView 
      initialRegion={INITIAL_REGION} 
      style={{ flex: 1 }}
      onDoublePress={e => setData([...data, e.nativeEvent.coordinate])}
      clusterColor='#c951ed'
      >
        {
          data.map((pin, idx) => <Marker key={`pin-${idx}`} coordinate={pin}/>)
        }
        
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
