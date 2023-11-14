import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from '@rneui/themed';

import Button from '../Components/Button'
import List from "../Components/List";
import metadata from '../storage.metadata.json';

export default function HomeScreen({ route, navigation }) {
    const focus = useIsFocused();
    const [lists, setLists] = useState(new Array());
    const [order, setOrder] = useState("column");

    useEffect(() => {
        getLists();
    }, [focus]);

    useEffect(() => {
        saveLists();
    }, [lists]);

    const listsDisplay = useMemo(() => {
        return (
            <View style={{ width: "100%", alignItems: "center", gap: 8, flexDirection: order }}>
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
    }, [lists, order]);


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

    const reverseOrder = () => {
        order == "column" ? setOrder("column-reverse") : setOrder("column");
    }

    return (
        <ScrollView style={{ height: "100%", backgroundColor: "#DED7C4" }}>
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
                <View style={styles.modifiers}>
                    <Pressable onPress={reverseOrder} style={styles.inverter}>
                        <Text style={styles.text}>Inverter ordem</Text>
                    </Pressable>
                </View>
                {
                    listsDisplay
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingVertical: 24
    },
    title: {
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center"
    },
    modifiers: {
        width: "100%",
        alignItems: "center"
    },
    inverter: {
        width: 125,
        backgroundColor: "#3D348B",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    text: {
        color: "#E0E2DB",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500"
    }

});