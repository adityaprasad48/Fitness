import React from "react";
import { Button, StyleSheet, View } from "react-native";
import database from "./../utils/database";
import MetricCard from "./MetricCard";

export default function EntryDetail({ route, navigation }) {
  const date = route.params.entryId;
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8);
  navigation.setOptions({ headerTitle: `${month}/${day}/${year}` });
  let entry = database[date];
  // const reset = () => {
  //   dispatch(
  //     addEntry({
  //       [date]: null,
  //     })
  //   );
  //   navigation.navigate("Recent");
  // };

  return (
    <View style={styles.container}>
      <MetricCard entry={entry} />
      <Button style={{ margin: 20 }} title="Reset" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
});
