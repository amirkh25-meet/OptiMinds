import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { account , ID } from "../DataBases/appwrite";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Button } from '../Buttons';
import { Header } from "../Header";



// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const SignupScreen = ({ }) => {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    // for the schema to resolve the user's data
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // account creation
        const user = await account.create(
            ID.unique(),
            data.email,
            data.password,
            data.name,
        );
        const session = await account.createEmailPasswordSession(data.email, data.password)
        // Alert.alert("Signup Successful", "You can now log in!");
        navigation.dispatch(StackActions.replace('Main'));
        // navigation.navigate('Main');


    } catch (error) {
        console.log("Signup Error:", error.message);
        Alert.alert("Signup Failed", error.message);
    }
    };

    
// for the user to view the password when signing up
  const [showPassword, setShowPassword] = useState(false);

  return (
    
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.fieldLabel}>Name:</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            value={value} 
            onChangeText={onChange} 
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      <Text style={styles.fieldLabel}>Email:</Text>
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
      <Controller
      control={control}
      name="password"
      render={({ field: { onChange, value } }) => (
        <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}>
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            value={value} 
            onChangeText={onChange} 
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
             {/* to view password  */}
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

      <Button  onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>

            <TouchableOpacity style={styles.backButton}
            onPress={() => navigation.navigate("Welcome")}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20,
    backgroundColor: "#D4C2FC"
},
  title: { 
    fontSize: 48, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center",
    color:"#7C69E6"
},
fieldLabel : {
  color: "#100850",
  fontSize: 16
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
  button: { 
    // backgroundColor: "#007bff", 
    // padding: 15, 
    // borderRadius: 5, 
    // alignItems: "center",
    position: "absolute",
    bottom: "20%",
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
  link: { textAlign: "center", 
    marginTop: 10, 
    color: "#100850" },
  error: { color: "red", marginBottom: 10 },
});

export default SignupScreen;