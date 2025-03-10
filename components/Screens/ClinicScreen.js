// Show the list of clincs
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Radio } from  "../Input/";
import { Button } from '../Buttons/index';
import { Header } from "../Header";

// Clinic dynamic display component
const DynamicClinicDisplay = ({ Name, Location, Hours, Doctors, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.clinicView}>
        <View>
          <Text style={styles.preText}>{Name}</Text>
          <Text style={styles.preText}>Location <Text style={styles.clinicText}>{Location}</Text> </Text>
          <Text style={styles.preText}>Hours <Text style={styles.clinicText}>{Hours}</Text></Text>
          <Text style={styles.preText}>Run by <Text style={styles.clinicText}>{Doctors}</Text></Text>

        </View>
      </View>
    </TouchableOpacity>
  );
};

// Sample clinics data
const clinicsData = [
  { 
    Name: "Jerusalem Clinic 1", 
    Location: "Street A", 
    City: "Jerusalem", 
    Hours: "9 AM - 5 PM", 
    Doctors: ["Dr. Smith"],

  },
  { 
    Name: "Jerusalem Clinic 2", 
    Location: "Street B", 
    City: "Jerusalem", 
    Hours: "10 AM - 6 PM", 
    Doctors: ["Dr. Adams"],

  },
  // Other clinic data...
  { 
    Name: "Nazareth Clinic 1", 
    Location: "Street X", 
    City: "Nazareth", 
    Hours: "8 AM - 4 PM", 
    Doctors: ["Dr. Wilson"],

  },
  { 
    Name: "Haifa Clinic 1", 
    Location: "Street Y", 
    City: "Haifa", 
    Hours: "7 AM - 3 PM", 
    Doctors: ["Dr. Miller"],

  },
];

const ClinicsScreen = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [showClinics, setShowClinics] = useState(false);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);

  // Filter clinics when city or showClinics state changes
  useEffect(() => {
    if (city && showClinics) {
      const clinics = clinicsData.filter(clinic => clinic.City === city);
      setFilteredClinics(clinics);
    }
  }, [city, showClinics]);

  // Handle selection of a city  // Shows the modal with clinic details
  // const handleClinicClick = (clinic) => {
  //   setSelectedClinic(clinic);
  //   setIsModalVisible(true);
  // };

  // Closes the modal
  // const handleCloseModal = () => {
  //   setIsModalVisible(false);
  //   setSelectedClinic(null);
  // };
  const handleCitySelection = () => {
    if (city) {
      setShowClinics(true);
    } else {
      alert("Please select a city first!");
    }
  };

  // Reset selection and go back to city selection
  const handleReset = () => {
    setShowClinics(false);
    setCity("");
  };

// try catch to fetch error more easily
  try {
    return (
      <ScrollView style={styles.container}>
        <Header/>
        {!showClinics ? (
          // City selection section - shown initially or after reset
          <View style={styles.sectionContainer}>
            <Text style={styles.mainHeader}>Where do you live?</Text>
            {/* Radio data */}
            <Radio
              options={[
                { label: "Jerusalem", value: "Jerusalem" },
                { label: "Nazareth", value: "Nazareth" },
                { label: "Haifa", value: "Haifa" },
                { label: "Tel Aviv", value: "Tel Aviv" },
                { label: "Akko", value: "Akko" },
                { label: "Safad", value: "Safad" },
                { label: "Negev", value: "Negev" },
                { label: "Eilat", value: "Eilat" },
              ]}
              checkedValue={city}
              onChange={setCity}
              style={{ 
                marginBottom: 15,
               }}
            />

            
            <Button onPress={handleCitySelection}>
              <Text style={styles.findClincText}>Find Clinics</Text>
            </Button>
          </View>
        ) : (
          
          // Clinics section that is shown after city is selected
          <View style={styles.sectionContainer}>
            
            <View style={styles.headerContainer}>
              <Text style={styles.clinicsHeader}>Clinics in {city}</Text>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleReset}
              >
                <Text style={styles.backButtonText}>Change City</Text>
              </TouchableOpacity>
            </View>

            {filteredClinics.length > 0 ? (
              // Display clinics for the selected city
              filteredClinics.map((clinic, index) => (
                <DynamicClinicDisplay
                  key={index}
                  {...clinic}
                />
              ))
            ) : (
              <Text style={styles.noClinics}>No clinics available in {city}.</Text>
            )}

          </View>
        )}
      </ScrollView>
    );
  } catch (error) {
    // This helps during development to pinpoint exactly which component is causing the issue
    console.error("Error rendering ClinicsScreen:", error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong with the Clinics screen.</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D4C2FC",
  },
  sectionContainer: {
    padding: 20,
    paddingTop: 60,
  },
  mainHeader: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7C69E6",
    textTransform: "uppercase"
  },
  header: {
    marginBottom: 15,
    fontSize: 16,
    color: "#7C69E6",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  clinicsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7C69E6",
  },
  clinicText: {
    color: "#5A47DE",
    fontSize: 17,
  },
  preText: {
    color: "#100850",
    fontSize: 17,
  },
  findClinic:{
    // position: 'absolute',
    // bottom: 50,
    backgroundColor: '#5A47DE',
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  findClincText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    position: "relative",
    left: "30%"
  },
  backButton: {
    padding: 8,
    backgroundColor: "#5A47DE",
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  clinicView: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  noClinics: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
    marginTop: 20,
  },
});

export default ClinicsScreen;