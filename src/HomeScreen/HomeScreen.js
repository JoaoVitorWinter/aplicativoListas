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
    console.log(lists)

    const listsDisplay = useMemo(() => {
        return (
            <View style={{width: "100%", alignItems: "center", gap: 8}}>
                {
                    lists.map((item, index) => {
                        return (
                            <View style={styles.list} key={"" + item + index}>
                                <Text style={{width: 50}}>{item[0]}</Text>
                                <Text>{item[1]}</Text>
                                <View style={{flexDirection: "row", gap: 10}}>
                                    <Pressable onPress={() => {
                                        navigation.navigate("CreateChangeList", {
                                            action: "Editar",
                                            lists: lists,
                                            listIndex: index
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
        setLists(newLists);
    }

    return (
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
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        textAlign: "center",
    },
    list: {
        backgroundColor: "aqua",
        flexDirection: "row",
        width: 350,
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8
    }

});