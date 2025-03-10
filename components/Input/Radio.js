// radio buttons to choose which city the user is from and to show clincs accordingly

import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons"

const Radio = ({ options, checkedValue, onChange, style }) => {
    return (
      <View style={[styles.container, style]}>
        {/* To map/show the radio buttons dynamically */}
        {options.map((option) => {
          let active = checkedValue == option.value;
          return (
          <TouchableOpacity style={active? [styles.radio, styles.activeRadio] : styles.radio}
          onPress={() => {
            onChange(option.value);
          }}
          key={option.value}
          >
          <MaterialIcons name={active ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color={active ? "#64748b" : "#64748b"}/>
          <Text style={ active ? [styles.text, styles.activeText]: styles.text}>{option.label}</Text>
          </TouchableOpacity>
        );
        })}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  clinicView: {
    borderRadius:10,
    alignItems: 'center',
    backgroundColor: "lightblue",
    height: "12.5%",
    width: "90%",
    flexDirection: 'row',
    margin : 10,
    fontSize: 22,    
  },
  radio: {
    height: 50,
    width: "100%",
    flexDirection:"row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: 'FFFFFF',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeRadio: {
    // backgroundColor: "#06b6d4" + "11"
  },
  text : {
    fontSize: 16,
    marginLeft: 15,
    color: "#100850"
  },
  activeText: {
    color: "#100850"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes the image circular
    margin: 10,
  }
});

export default Radio;