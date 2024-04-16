import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppSlider = ({ max, unit, step, value, onChange }) => {
  return (
    <View style={styles.row}>
      <Slider
      style={{flex: 1}}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
        <Text style={{ fontSize: 18, color: "gray" }}>{unit}</Text>
      </View>
    </View>
  );
};

export default AppSlider;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  metricCounter: {
    width: 85,
    justifyContent: "center",
    alignItems: "center",
  },
});
