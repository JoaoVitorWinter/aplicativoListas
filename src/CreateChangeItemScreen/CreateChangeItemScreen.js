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
            return alert("Coloque um valor no input!");
        }

        action == "Criar" ? createItem() : editarItem();

        // navigation.navigate("List", {
        //     list: action == "Criar" ? criarItem() : editarItem(),
        //     listIndex: 0
        // });
    }

    const createItem = () => {
        var listsVariable = [...lists];
        var listItems = [...lists[listIndex]];
        listsVariable.splice(listIndex, 1);
        listsVariable.unshift([listItems[0], (new Date().toLocaleString()), [[name ,(new Date().toLocaleString())], ...listItems[2]]]);
        saveLists(listsVariable)
    }

    const saveLists = async (lists) => {
        const saveList = lists || "";
        await AsyncStorage.setItem(metadata.LISTS, JSON.stringify(saveList));

        navigation.navigate("List", {
            list: [lists],
            listIndex: 0
        });
    }

    // const criarItem = async () => {
    //     var listsVariable = lists;
    //     listsVariable = [[listsVariable[listIndex][0], (new Date().toLocaleString()), [[name, (new Date().toLocaleString())], ...listsVariable[listIndex][2]]], ...listsVariable.splice(listIndex, 1)];
    //     await saveLists([...listsVariable]);
    //     console.log
    //     return listsVariable;
    // }

    // const editarItem = async () => {
    //     var listsVariable = lists;
    //     var listItems = listsVariable[listIndex][2];
    //     listsVariable.unshift([listsVariable[listIndex][0], (new Date().toLocaleString()), [[name, (new Date().toLocaleString())],...listItems.splice(itemIndex, 1)]])
    //     listsVariable.splice(listIndex + 1, 1);
    //     listsVariable = [...listsVariable];
    //     await saveLists(listsVariable);
    //     return listsVariable;
    // }

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