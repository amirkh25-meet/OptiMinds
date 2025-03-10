import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Header } from "../Header";

const Welcome = ({ }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.welcomeText}>Hey,{"\n"}welcome to</Text>
      <Image 
        source={require("../../assets/Logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
{/* Signup button */}
      <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate("Sign-up")}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
{/* Login button */}

      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1B3F7", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2A0A5E", 
    textAlign: "left",
    width: "100%",
    position: "relative",
    bottom: "20%",
  },
  logo: {
    width: 180,
    height: 80,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#5A47DE", 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Welcome;
