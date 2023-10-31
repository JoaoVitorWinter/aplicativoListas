import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../Components/Button";
import Input from "../Components/Input";

export default function CreateChangeScreen({ route, navigation }) {
    const { action, lists, listIndex } = route.params;
    const [name, setName] = useState("");

    const handleClick = () => {
        if (name == "") {
            return alert("Coloque um valor no input!")
        }
        navigation.navigate("Home", {
            listsChange: action == "Criar" ? criarLista() : editarLista()
        });
    }

    const criarLista = () => {
        var listsVariable = lists;
        listsVariable = [[name, (new Date().toLocaleString()), []], ...listsVariable];
        return listsVariable;
    }

    const editarLista = () => {
        var listsVariable = lists;
        var listItems = listsVariable[listIndex][2];
        listsVariable.splice(listIndex, 1);
        listsVariable.unshift([name, (new Date().toLocaleString()), listItems])
        listsVariable = [...listsVariable];
        return listsVariable;
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