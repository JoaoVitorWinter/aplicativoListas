import { View, Text, StyleSheet } from "react-native";

import Button from './../Button'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ultimate List</Text>
            <Button onPress={() => {navigation.navigate("CreateChangeList")}} text={"Adicionar lista"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 24
    }
});