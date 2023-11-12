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
                <Pressable onPress={reverseOrder} style={styles.inverter}>
                    <Text style={styles.text}>Inverter ordem</Text>
                </Pressable>
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
    },
    inverter: {
        marginHorizontal: 24,
        width: "fit-content",
        backgroundColor: "#3D348B",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    text: {
        color: "#E0E2DB",
    }

});