import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../Components/Button";
import Input from "../Components/Input";

export default function CreateChangeScreen({ route, navigation }) {
    const { action, lists } = route.params;
    const [name, setName] = useState("");
    console.log(lists);
    const handleClick = () => {
        if (action == "Criar") {
            criarLista();
        } else {

        }

        navigation.navigate("Home", {
            listsChange: action == "Criar" ? criarLista() : ""
        });
    }

    const criarLista = () => {
        var listsVariable  = lists.lists;
        console.log(listsVariable)
        listsVariable = [...listsVariable, name];
        return listsVariable
    }

    return (
        <View style={styles.container}>
            <Input placeholder={"Nome da lista"} onChangeText={setName}/>
            <Button text={action + " lista"} onPress={handleClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 24
    }
});