import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [name, setName] = useState("DecafDev");
  const [age, setAge] = useState("35");

  const clickHandler = () => {
    if (name == "DecafDev") {
      setName("Bradley");
    } else {
      setName("DecafDev");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="eg. John Doe"
        onChangeText={(val) => setName(val)}
      />

      <Text>Enter Age:</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="eg. 18"
        onChangeText={(val) => setAge(val)}
      />

      <Text>
        Developed by {name}, age: {age}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Update State" onPress={clickHandler} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: "75%",
    borderRadius: 5,
  },
});
