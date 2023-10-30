import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { useIsFocused } from "@react-navigation/native";

import Button from '../Components/Button'
import List from "../Components/List";

export default function HomeScreen({ route, navigation }) {
    const { listsChange } = route.params;
    const focus = useIsFocused();
    const [lists, setLists] = useState(new Array());

    useEffect(() => {
        setLists(listsChange);
    }, [focus])

    const listsDisplay = useMemo(() => {
        return (
            <View>
                {
                    lists.map((item, index) => {
                        return (
                            <View style={styles.list} key={"" + item + index}>
                                <Text>{item}</Text>
                                <Text>30 08 2005</Text>
                                <View style={{flexDirection: "row", gap: 10}}>
                                    <Pressable onPress={() => {
                                        navigation.navigate("CreateChangeList", {
                                            action: "Editar"
                                        })
                                    }}>
                                        <Text>
                                            Editar
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={() => { removeList(index) }}>
                                        <Text>
                                            X
                                        </Text>
                                    </Pressable>
                                </View>
                                {/* <List
                                    name={item}
                                    date={() => { (new Date()).toString() }}
                                    navigation={navigation}
                                    removeList={removeList}
                                    index={index} /> */}
                            </View>
                        )
                    })
                }
            </View>
        )
    }, [lists]);

    const removeList = (index) => {
        var newLists = [...lists];
        newLists.splice(index, 1);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ultimate List</Text>
            <Button
                onPress={() => {
                    navigation.navigate("CreateChangeList", {
                        action: "Criar",
                        lists: lists
                    });
                }}
                text={"Adicionar lista"} />
            {
                listsDisplay
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 24
    },
    title: {
        fontSize: 30,
        textAlign: "center",
    },
    list: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-evenly",
        borderColor: "black",
        borderWidth: 1,
        padding: 8
    }

});