import { View, Text, StyleSheet } from "react-native";

import Button from '../Components/Button'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ultimate List</Text>
            <Button
                onPress={() => {
                    navigation.navigate("CreateChangeList", {
                        action: "Criar"
                    });
                }}
                text={"Adicionar lista"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 24
    },
    title: {
        fontSize: 30,
        textAlign: "center",
    }
});