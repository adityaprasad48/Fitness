// import AppLoading from "expo-app-loading";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCalenderResults } from "../utils/api";
import { addEntry, receiveEntries, selectEntries } from "./../features/entries";
import { timeToString } from "./../utils/helpers";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";

export default function Recent({ navigation }) {
  const dispatch = useDispatch();
  const entries = useSelector(selectEntries);

  useEffect(() => {
    const fetchData = async () => {
      const entries = await fetchCalenderResults();
      dispatch(receiveEntries({ entries }));
      dispatch(addEntry({'hh': 'fff'}))
    };
    fetchData();
  }, []);
  console.log(entries);
  return (
    <FlatList
      data={Object.keys(entries)}
      renderItem={({ item }) => {
        return item === timeToString() ? (
          <View style={styles.item}>
            <DateHeader date={timeToString()} />
            <Text style={styles.noDataText}>
              You didn't log any data on this day.
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            key={item}
            style={styles.item}
            onPress={() => {
              navigation.push("EntryDetail", { entryId: item });
            }}
          >
            <MetricCard key={item} date={item} entry={entries[item]} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(key) => key}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
