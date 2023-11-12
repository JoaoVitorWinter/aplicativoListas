import { Pressable, Text, StyleSheet } from "react-native";


export default function Button(props) {
    return (
        <Pressable style={styles.button} onPress={props.onPress}>
            <Text style={styles.text} >
                {props.text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 80,
        paddingVertical: 16,
        backgroundColor: "#191716",
        borderRadius: 8
    },
    text: {
        color: "#E0E2DB",
        textAlign: "center",
        fontSize: 20
    }
});