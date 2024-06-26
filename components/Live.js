import { Foundation } from "@expo/vector-icons";
import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { calculateDirection } from "../utils/helpers";

export default function Live() {
  const [state, setState] = useState({
    coords: null,
    status: "undetermined",
    direction: "",
  });

  const [bounce, setBounce] = useState(new Animated.Value(1));

  // useEffect(() => {
  //   Permissions.getAsync(Permissions.LOCATION)
  //     .then(({ status }) => {
  //       if (status === "granted") {
  //         return setLocation();
  //       }

  //       setState({ ...state, status });
  //     })
  //     .catch((err) => {
  //       console.log("Error getting Location permission ", err);
  //       setState({ ...state, status: "undetermined" });
  //     });
  // }, []);

  async function askPermission() {
    console.log('called');
    // const { status } = await Permissions.getAsync(Permissions.LOCATION);

    // if (status === "granted") {
    //   console.log("permission granted");
    //   return this.setLocation();
    // }

    // setState({ ...state, status });
  }

  const { status, coords, direction } = state;

  function setLocation() {
    Location.watchPositionAsync(
      {
        enableHighAccuraty: true,
        timeInterval: 1,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const newDirection = calculateDirection(coords.heading);
        const { direction } = state;

        if (newDirection !== direction) {
          Animated.sequence([
            Animated.timing(bounce, { duration: 200, toValue: 1.04 }),
            Animated.spring(bounce, { toValue: 1, friction: 4 }),
          ]).start();
        }

        setState({
          ...state,
          coords,
          status: "granted",
          direction: newDirection,
        });
      }
    );
  }

  if (status === null) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (status === "denied") {
    return (
      <View style={styles.center}>
        <Foundation name="alert" size={50} />
        <Text>
          You denied your location. You can fix this by visiting your settings
          and enabling location services for this app.
        </Text>
      </View>
    );
  }

  if (status === "undetermined") {
    return (
      <View style={styles.center}>
        <Foundation name="alert" size={50} />
        <Text>You need to enable location services for this app.</Text>
        <TouchableOpacity style={styles.button} onPress={askPermission}>
          <Text style={styles.buttonText} onPress={askPermission}>
            Enable
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.directionContainer}>
        <Text style={styles.header}>You're heading</Text>
        <Animated.Text
          style={[styles.direction, { transform: [{ scale: bounce }] }]}
        >
          {direction}
        </Animated.Text>
      </View>
      <View style={styles.metricContainer}>
        <View style={styles.metric}>
          <Text style={[styles.header, { color: "white" }]}>Altitude</Text>
          <Text style={[styles.subHeader, { color: "white" }]}>
            {Math.round(coords.altitude * 3.2808)} Feet
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.header, { color: "white" }]}>Speed</Text>
          <Text style={[styles.subHeader, { color: "white" }]}>
            {(coords.speed * 2.2369).toFixed(1)} MPH
          </Text>
          <Text style={{ color: "white" }}>{JSON.stringify(state)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    alignSelf: "center",
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 35,
    textAlign: "center",
  },
  direction: {
    color: "blue",
    fontSize: 120,
    textAlign: "center",
  },
  metricContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "blue",
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
  },
});
