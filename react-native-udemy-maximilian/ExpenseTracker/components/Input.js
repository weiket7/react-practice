import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Input({ label, style, textInputConfig }) {
  let inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.multiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
  },
  input: {
    backgroundColor: "white",
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top", //same look in android and ios
  },
});

export default Input;
