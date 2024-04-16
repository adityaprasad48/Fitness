import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store";
import EntryDetail from "./components/EntryDetail";
import Tabs from "./components/Tabs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="EntryDetail" component={EntryDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
