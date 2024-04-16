import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AppSteppers = ({ max, unit, step, value, onIncrement, onDecrement }) => {
  return (
    <View style={styles.row}>
      {Platform.OS === "ios" ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.iosBtn} onPress={onDecrement}>
            <FontAwesome name="minus" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iosBtn} onPress={onIncrement}>
            <FontAwesome name="plus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.androidBtn} onPress={onDecrement}>
            <Entypo name="minus" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.androidBtn} onPress={onIncrement}>
            <Entypo name="plus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
        <Text style={{ fontSize: 18, color: "gray" }}>{unit}</Text>
      </View>
    </View>
  );
};

export default AppSteppers;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iosBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "black",
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  androidBtn: {
    padding: 5,
    backgroundColor: "purple",
    margin: 5,
    borderRadius: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  metricCounter: {
    width: 85,
    justifyContent: "center",
    alignItems: "center",
  },
});
