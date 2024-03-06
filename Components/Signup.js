import {
  View,
  Text,
  NativeBaseProvider,
  Button,
  Heading,
  VStack,
  FormControl,
  Input,
  Box,
} from "native-base";
import { StyleSheet } from "react-native";
import React, { useState } from "react";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://digital-guardian-backend.vercel.app/api/auth/parent/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, contact, password }),
        }
      );

      const data = await response.json();

      // console.log(email);
      // console.log(contact);
      // console.log(password);

      if (response.ok) {
        console.log("User created successfully");
        // Handle success, maybe redirect to another page
        navigation.navigate("ParentDashboard");
      } else {
        console.error("Registration failed:", data.message);
        // Handle failure, display an error message to the user
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading>
          <Text>Welcome</Text>
        </Heading>
        <Text>Sign Up to Continue!</Text>
        <View
          style={{
            marginTop: 10,
            width: 280,
          }}
        >
          <Input
            variant="outline"
            placeholder="User Name"
            style={styles.box}
            onChangeText={(text) => setName(text)}
          />
          <Input
            variant="outline"
            placeholder="Email"
            style={styles.box}
            mt="3"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            variant="outline"
            placeholder="Phone No."
            style={styles.box}
            mt="3"
            onChangeText={(text) => setContact(text)}
          />
          <Input
            variant="outline"
            placeholder="Password"
            style={styles.box}
            mt="3"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button
          mt="3"
          colorScheme="indigo"
          style={styles.btn}
          _text={{
            color: "#fff",
            fontWeight: "medium",
            fontSize: "sm",
          }}
          // onPress={() => navigation.navigate("ParentDashboard")}
          onPress={(e) => handleSubmit(e)}
        >
          Sign up
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    width: 280,
    height: 50,
  },
  btn: {
    width: 280,
    height: 50,
    backgroundColor: "#6A00BF",
  },
});
