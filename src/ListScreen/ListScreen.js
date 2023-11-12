import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from '../Components/Button';
import Item from '../Components/Item';
import metadata from '../storage.metadata.json';

export default function ListScreen({ route, navigation }) {
    const { list, listIndex } = route.params;
    const focus = useIsFocused();
    const [useList, setUseList] = useState(["", "", new Array()]);
    const [order, setOrder] = useState("column");

    useEffect(() => {
        getList(listIndex);
    }, [focus]);

    const removeItem = async (index) => {
        var newLists = [...list];
        var newItemList = [...newLists[listIndex][2]];
        newLists.splice(listIndex, 1);
        newItemList.splice(index, 1)
        newLists.unshift([useList[0], (new Date().toLocaleString()), newItemList]);
        await saveLists(newLists);
        navigation.navigate("List", {
            list: newLists,
            listIndex: 0
        });
        getList(0);
    }

    const itemsDisplay = useMemo(() => {
        return (
            <View style={{ width: "100%", alignItems: "center", gap: 8, flexDirection: order }}>
                {
                    useList[2].map((item, index) => {
                        return (
                            <Item
                                key={"" + item + index}
                                name={item[0]}
                                date={item[1]}
                                navigation={navigation}
                                listIndex={listIndex}
                                index={index}
                                list={list[listIndex]}
                                lists={list}
                                setUseList={setUseList}
                                removeItem={removeItem}
                            />
                        )
                    })
                }
            </View>
        )
    }, [useList, order]);

    const saveLists = async (lists) => {
        const saveList = lists || "";
        await AsyncStorage.setItem(metadata.LISTS, JSON.stringify(saveList));
    }

    const getList = async (index) => {
        const getList = await AsyncStorage.getItem(metadata.LISTS);
        if (getList) {
            setUseList(JSON.parse(getList)[index]);
        }
    }

    const reverseOrder = () => {
        order == "column" ? setOrder("column-reverse") : setOrder("column");
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{useList[0]}</Text>
                <Button text={"Adicionar item"} onPress={() => {
                    navigation.navigate("CreateChangeItem", {
                        action: "Criar",
                        lists: list,
                        listIndex: listIndex
                    })
                }} />
                <Pressable onPress={reverseOrder} style={styles.inverter}>
                    <Text style={styles.text}>Inverter ordem</Text>
                </Pressable>
                {
                    itemsDisplay
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
        color: "#E0E2DB"
    }
});