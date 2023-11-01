import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../Components/Button";
import Input from "../Components/Input";
import metadata from '../storage.metadata.json';

export default function CreateChangeItemScreen({ route, navigation }) {
    const { action, lists, listIndex, itemIndex } = route.params;
    const [name, setName] = useState("");
    
    const handleClick = () => {
        if (name == "") {
            return alert("Coloque um valor no input!")
        }

        navigation.navigate("List", {
            list: action == "Criar" ? criarItem() : editarItem(),
            listIndex: 0
        });
    }

    const saveLists = async (lists) => {
        const saveList = [...lists] || "";
        await AsyncStorage.setItem(metadata.LISTS, JSON.stringify(saveList));
    }

    const criarItem = async () => {
        var listsVariable = [...lists];
        console.log([...lists])
        console.log(listsVariable)
        listsVariable = [[listsVariable[listIndex][0], (new Date().toLocaleString()), [[name, (new Date().toLocaleString())], ...listsVariable[listIndex][2]]], ...listsVariable.splice(listIndex, 1)];
        await saveLists(lists);
        return listsVariable;
    }

    const editarItem = async () => {
        var listsVariable = lists;
        var listItems = listsVariable[listIndex][2];
        listsVariable.unshift([listsVariable[listIndex][0], (new Date().toLocaleString()), [[name, (new Date().toLocaleString())],...listItems.splice(itemIndex, 1)]])
        listsVariable.splice(listIndex + 1, 1);
        listsVariable = [...listsVariable];
        await saveLists(lists);
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