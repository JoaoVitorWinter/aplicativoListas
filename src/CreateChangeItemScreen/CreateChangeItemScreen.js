import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../Components/Button";
import Input from "../Components/Input";

export default function CreateChangeItemScreen({ route, navigation }) {
    const { action, lists, listIndex } = route.params;
    const [name, setName] = useState("");
    
    const handleClick = () => {
        if (name == "") {
            return alert("Coloque um valor no input!")
        }
        navigation.navigate("List", {
            list: action == "Criar" ? criarItem() : editarItem(),
            listIndex: listIndex
        });
    }

    const criarItem = () => {
        var listsVariable = lists;
        listsVariable = [[listsVariable[listIndex][0], (new Date().toLocaleString()), [[name, (new Date().toLocaleString())], ...listsVariable[listIndex][2]]], ...listsVariable];
        return listsVariable;
    }

    const editarItem = () => {
        var listsVariable = lists;
        var listItems = listsVariable[listIndex][2];
        listsVariable.splice(listIndex, 1);
        listsVariable.unshift([name, (new Date().toLocaleString()), listItems])
        listsVariable = [...listsVariable];
        return listsVariable;
    }

    return (
        <View style={styles.container}>
            <Input placeholder={"Nome do item"} onChangeText={setName} />
            <Button text={action + " item"} onPress={handleClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 24
    }
});