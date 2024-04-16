import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";
import DateHeader from "./DateHeader";

export default function MetricCard({ date, entry }) {
  return (
    <View>
      {date && <DateHeader date={date} />}

      {entry &&
        Object.keys(entry).map((metric) => {
          const { getIcon, displayName, unit } = getMetricMetaInfo(metric);
          return (
            <View style={styles.metric} key={metric}>
              {getIcon()}
              <View>
                <Text style={{ fontSize: 20 }}>{displayName}</Text>
                <Text style={{ fontSize: 16, color: "gray" }}>
                  {entry[metric]} {unit}
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: "row",
    marginTop: 12,
  },
});
