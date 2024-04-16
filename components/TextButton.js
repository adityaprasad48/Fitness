import React from "react";
import { Text , StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TextButton({ children, onPress, style = { } }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: 'purple'
  }
})