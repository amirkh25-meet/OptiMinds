import React from "react";
import { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { account } from "../DataBases/appwrite.js";
import { useNavigation, StackActions } from '@react-navigation/native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'; // Install if not already installed
import { Header } from "../Header";
import { Button } from "../Buttons";


// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginScreen = ({ }) => {
  const navigation = useNavigation();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    try {
      const session = await account.createEmailPasswordSession(data.email, data.password);
      const user = await account.get();
      // console.log("Login successful, userID:", user.$id);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace("Main"));
      }, 500);
      // console.log("Navigating to Main...");
      // console.log("Current Navigation State:", navigation.getState());
    } catch (error) {
      // console.log("Login Failed", error.message);
      return { success: false, error: error.message };
    }
  };
  // to show the password
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.fieldLabel}>Email:</Text>
      {/* to manage business logic separately from UI components*/}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            value={value} 
            onChangeText={onChange} 
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.fieldLabel}>Password:</Text>
      {/* to manage business logic separately from UI components*/}
      <Controller
      control={control}
      name="password"
      render={({ field: { onChange, value } }) => (
        <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}>
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            value={value} 
            onChangeText={onChange} 
            secureTextEntry={!showPassword} // Toggle visibility
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
      )}
    />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>

      <TouchableOpacity style={styles.backButton}
      onPress={() => navigation.navigate("Welcome")}>
      <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor:"#D4C2FC" },
  title: {     
    fontSize: 48, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center",
    color:"#7C69E6" },
    fieldLabel : {
      color: "#100850",
      fontSize: 16
    },
    buttonText: { 
      color: "#fff", 
      fontWeight: "bold" ,
      textAlign: "center"
  },
  backButton: {
    position: "relative",
    top: "10%",
    backgroundColor: "#5A47DE",
    width: "15%",
    height: "5%",
    borderRadius: 7,
  },
    input: {
      backgroundColor: "white",
      borderWidth: 1, 
      borderColor: "#ccc", 
      padding: 10, 
      marginBottom: 15, 
      borderRadius: 7,
      height: 45,
      fontSize: 18
  },
  link: { textAlign: "center", marginTop: 10, color: "#007bff" },
  error: { color: "red", marginBottom: 10 },
});

export default LoginScreen;
