import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { useEffect, useState } from 'react';
import { Box, Icon, IconButton, Input, NativeBaseProvider } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const INITIAL_REGION = {
  latitude: 47.6062,
  longitude: -122.3321,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const colorPins = ['red', 'tomato', 'orange', 'yellow', 'gold', 'wheat', 'tan', 'linen', 'green', 'blue', 'navy', 'aqua', 'teal', 'turquoise', 'violet', 'purple', 'plum', 'indigo'];
let color = '';


export default function App() {
  const [data, setData] = useState([]);
  const [mapRegion, setMapRegion] = useState(INITIAL_REGION);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRemoveMarker = (e) => {
    let makerList = [...data];
    console.log('marker coor: ', e.nativeEvent.coordinate);
    makerList = data.filter(pin => e.nativeEvent.coordinate.latitude !== pin.coordinates.latitude && e.nativeEvent.coordinate.longitude !== pin.coordinates.longitude);
    setData(makerList);
  };

  const getCurrentLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('location:----', location);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 8.5,
      longitudeDelta: 8.5,
    });
  };

  useEffect(() => {
    const getLocation = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('location:----', location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 8.5,
        longitudeDelta: 8.5,
      });
    };
    getLocation();
  }, []);

  console.log('mapRegion:---', mapRegion);
  return (
    <>
      <NativeBaseProvider>
        <Box safeArea>
          <Input
            placeholder="Search Places"
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}
            InputRightElement={
              <IconButton
                onPress={() => getCurrentLocation()}
                icon={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="my-location" />} />}
              />
            }
          />
        </Box>

        <MapView
          region={mapRegion}
          style={{ flex: 1 }}
          onLongPress={e => {
            color = colorPins[Math.floor(Math.random() * colorPins.length)];
            markerData = { coordinates: e.nativeEvent.coordinate, pinColor: color };
            setData([...data, markerData])
            console.log(markerData.pinColor);
          }}
          onMarkerPress={e => { handleRemoveMarker(e) }}
          clusterColor={colorPins[Math.floor(Math.random() * colorPins.length)]}
          loadingEnabled={true}
          animationEnabled={true}
        >

          {
            data.map((pin, idx) => <Marker key={`pin-${idx}`} coordinate={pin.coordinates} pinColor={pin.pinColor} />)
          }

        </MapView>

      </NativeBaseProvider>
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
