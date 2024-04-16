import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AddEntry from "./AddEntry";
import Live from "./Live";
import Recent from "./Recent";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "AddEntry") {
            return (
              <FontAwesome
                name="bookmark"
                // change color on focus
                color="purple"
                size={35}
              />
            );
          } else if (route.name === "Recent") {
            return <FontAwesome name="plus-square" color="purple" size={35} />;
          } else if (route.name === "Live") {
            return (
              <MaterialCommunityIcons
                name="speedometer"
                color="purple"
                size={35}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "gray",
        style: {
          height: 56,
          backgroundColor: "white",
          shadowColor: "rgba(0,0,0,0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tab.Screen name="Recent" component={Recent} />
      <Tab.Screen name="AddEntry" component={AddEntry} />
      <Tab.Screen name="Live" component={Live} />
    </Tab.Navigator>
  );
}
