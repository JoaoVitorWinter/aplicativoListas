import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../Components/Button";
import Input from "../Components/Input";
import metadata from '../storage.metadata.json';

export default function CreateChangeScreen({ route, navigation }) {
    const { action, lists, listIndex } = route.params;
    const [name, setName] = useState("");

    const handleClick = () => {
        if (name == "") {
            return alert("Coloque um valor no input!")
        }

        saveLists(lists);
    }
    
    const saveLists = async () => {
        const saveList = (action == "Criar" ? criarLista() : editarLista()) || "";
        await AsyncStorage.setItem(metadata.LISTS, JSON.stringify(saveList));
        navigation.navigate("Home", {
            listsChange: action == "Criar" ? criarLista() : editarLista()
        });
    }

    const criarLista = () => {
        var listsVariable = lists;
        listsVariable = [[name, (new Date().toLocaleString()), new Array()], ...listsVariable];
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
        backgroundColor: "#DED7C4",
        gap: 16,
        paddingVertical: 24,
        minHeight: "100vh" 
    }
});