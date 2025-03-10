// Dynamic Button
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <Text style={styles.text}>{props.children}</Text>
        </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 15,
        backgroundColor: "#5A47DE",
    },
    text: {
        fontSize: 16,
        color: "#f9fafb",
    },
});

export default Button;