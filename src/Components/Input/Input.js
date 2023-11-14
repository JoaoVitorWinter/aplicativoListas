import { StyleSheet, TextInput } from "react-native";


export default function Input(props) {
    return (
        <TextInput 
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText} placeholderTextColor={"#191716"} />
    );
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 40,
        paddingVertical: 16,
        paddingLeft: 20,
        borderColor: "#191716",
        borderWidth: 2
    }
});