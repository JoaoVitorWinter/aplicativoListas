import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from '../Components/Button';
import Item from '../Components/Item';
import metadata from '../storage.metadata.json';

export default function ListScreen({ route, navigation }) {
    const { list, listIndex } = route.params;
    const focus = useIsFocused();
    const [useList, setUseList] = useState(["", "", new Array()]);

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
            <View style={{ width: "100%", alignItems: "center", gap: 8 }}>
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
    }, [useList]);

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
                {
                    itemsDisplay
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginVertical: 24
    },
    title: {
        fontSize: 30,
        textAlign: "center"
    }
});