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

        action == "Criar" ? createItem() : editeItem();

        // navigation.navigate("List", {
        //     list: action == "Criar" ? criarItem() : editarItem(),
        //     listIndex: 0
        // });
    }

    const createItem = () => {
        var listsVariable = [...lists];
        var listItems = [...lists[listIndex]];
        listsVariable.splice(listIndex, 1);
        console.log([...listItems[2]])
        listItems[2].length > 0 ? listsVariable.unshift([listItems[0], (new Date().toLocaleString()), [[name ,(new Date().toLocaleString())], ...listItems[2]]]) : listsVariable.unshift([listItems[0], (new Date().toLocaleString()), [[name ,(new Date().toLocaleString())]]]);
        saveLists(listsVariable)
    }

    const editeItem = async () => {
        var listsVariable = lists;
        var listItems = listsVariable[listIndex][2];
        listItems.splice(itemIndex, 1)
        listsVariable.unshift([listsVariable[listIndex][0], (new Date().toLocaleString()), [[name, (new Date().toLocaleString())], ...listItems]])
        listsVariable.splice(listIndex + 1, 1);
        listsVariable = [...listsVariable];
        await saveLists(listsVariable);
    }

    const saveLists = async (lists) => {
        const saveList = lists || "";
        await AsyncStorage.setItem(metadata.LISTS, JSON.stringify(saveList));

        navigation.navigate("List", {
            list: lists,
            listIndex: 0
        });
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