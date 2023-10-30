import { StyleSheet, TextInput } from "react-native";


export default function Input(props) {
    return (
        <TextInput 
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText} />
    );
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 40,
        paddingVertical: 16,
        paddingLeft: 20,
        borderColor: "#FCA311",
        borderWidth: 1,
        borderRadius: 8,
    }
});