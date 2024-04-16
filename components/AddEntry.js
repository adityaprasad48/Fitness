import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/entries";
import { getDailyReminderValue, getMetricMetaInfo } from "../utils/helpers";
import { removeEntry, submitEntry } from "./../utils/api";
import { timeToString } from "./../utils/helpers";
import AppSlider from "./AppSlider";
import AppSteppers from "./AppSteppers";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

export default function AddEntry({ alreadyLogged, navigation }) {
  const dispatch = useDispatch();

  const initialState = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  const [state, setState] = useState(initialState);

  function increment(metric) {
    const { max, step } = getMetricMetaInfo(metric);
    const count = state[metric] + step;

    setState({
      ...state,
      [metric]: count > max ? max : count,
    });
  }

  function decrement(metric) {
    const { step } = getMetricMetaInfo(metric);
    const count = state[metric] - step;

    setState({
      ...state,
      [metric]: count < 0 ? 0 : count,
    });
  }

  function slide(metric, value) {
    setState({
      ...state,
      [metric]: value,
    });
  }

  function submit() {
    const key = timeToString();
    // entry is our local state
    const entry = state;

    // Upadate Redux
    dispatch(
      addEntry({
        [key]: entry,
      })
    );

    // Navigate to Home
    navigation.navigate("Recent");

    // Save to LocalStorage
    submitEntry({ key, entry });

    // local Notification
  }

  function reset() {
    const key = timeToString();
    // Upadate Redux
    dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );

    // setState({
    //   run: 0,
    //   bike: 0,
    //   swim: 0,
    //   sleep: 0,
    //   eat: 0,
    // });

    // Route to Home

    // update to LocalStorage
    removeEntry(key);
  }

  const metaInfo = getMetricMetaInfo();

  if (alreadyLogged) {
    return (
      <View style={styles.center}>
        <Ionicons
          name={
            Platform.OS === "ios" ? "ios-happy-outline" : "md-happy-outline"
          }
          size={100}
        />
        <Text>You already logged you information for today</Text>
        <TextButton style={{ padding: 10 }} onPress={reset}>
          Reset
        </TextButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = state[key];

        return (
          <View key={key} style={styles.row}>
            {getIcon()}
            {type === "slider" ? (
              <AppSlider
                value={value}
                onChange={(value) => slide(key, value)}
                {...rest}
              />
            ) : (
              <AppSteppers
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}
      <SubmitBtn onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    alignSelf: "flex-end",
  },
  androidSubmitBtn: {
    backgroundColor: "purple",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
  container: {
    flex: 1,
    minHeight: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
  },
});
