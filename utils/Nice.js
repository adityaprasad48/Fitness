import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Nice() {
  const info1 = {
    loggedIn: true,
    userName: "arpit",
    favList: [1, 4],
  };

  const info2 = {
    loggedIn: false,
    userName: "aditya",
    favList: [1, 4, 4, 333],
  };

  function add() {
    AsyncStorage.setItem("info_key", JSON.stringify(info1));
    console.warn("add done");
  }

  async function read() {
    const jsonValue = await AsyncStorage.getItem("info_key");
    console.warn(JSON.parse(jsonValue));
    console.warn("read done");
  }

  async function merge() {
    // merge means if change in value then 'chnaged value', and new prop is there then new prop will be added
    await AsyncStorage.mergeItem("info_key", JSON.stringify(info2));
    const information = await AsyncStorage.getItem("info_key");
    console.warn(information);
    console.warn("merge done");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => add()}>
        <Text style={styles.button}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => read()}>
        <Text style={styles.button}>Read</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => merge()}>
        <Text style={styles.button}>Merge</Text>
      </TouchableOpacity>
      {/* <View>{JSON.stringify(read())}</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "green",
    color: "white",
    fontSize: 20,
  },
});
