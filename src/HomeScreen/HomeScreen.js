import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from '@rneui/themed';

import Button from '../Components/Button'
import List from "../Components/List";
import metadata from '../storage.metadata.json';

export default function HomeScreen({ route, navigation }) {
    const focus = useIsFocused();
    const [lists, setLists] = useState(new Array());

    useEffect(() => {
        getLists();
    }, [focus]);

    useEffect(() => {
        saveLists();
    }, [lists]);

    const listsDisplay = useMemo(() => {
        return (
            <View style={{ width: "100%", alignItems: "center", gap: 8 }}>
                {
                    lists.map((item, index) => {
                        return (
                            <List
                                key={"" + item + index}
                                name={item[0]}
                                date={item[1]}
                                navigation={navigation}
                                index={index}
                                lists={lists}
                                setLists={setLists} />
                        )
                    })
                }
            </View>
        )
    }, [lists]);


    const saveLists = async () => {
        const saveList = lists || "";
        await AsyncStorage.setItem(metadata.LISTS, JSON.stringify(saveList));
    }

    const getLists = async () => {
        const getList = await AsyncStorage.getItem(metadata.LISTS);
        if (getList) {
            setLists(JSON.parse(getList));
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.title}>Ultimate List</Text>
                <Button
                    onPress={() => {
                        navigation.navigate("CreateChangeList", {
                            action: "Criar",
                            lists: lists,
                        });
                    }}
                    text={"Adicionar lista"} />
                {
                    listsDisplay
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DED7C4",
        gap: 16,
        paddingVertical: 24,
        minHeight: "100vh" 
    },
    title: {
        fontSize: 30,
        textAlign: "center"
    }

});