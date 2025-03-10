// Dynamic Header (based on mockup design)
import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo Image */}
      <Image
        source={require("../../assets/transparentLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
});

export default Header;
