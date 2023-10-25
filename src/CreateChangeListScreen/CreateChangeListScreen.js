import { StyleSheet, Text, View } from "react-native";
import Button from "../Components/Button";
import Input from "../Components/Input";

export default function CreateChangeScreen({ route, navigation }) {
    const { action } = route.params;
    return (
        <View style={styles.container}>
            <Input />
            <Button text={action + " lista"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 24
    }
});