import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
        getList();
    }, [focus]);

    const removeItem = (index) => {
        var newLists = [...list];
        newLists.splice(listIndex, 1);
        console.log([...useList[2]].splice(index, 1))
        newLists.unshift([useList[0], (new Date().toLocaleString()), [...useList[2]].splice(index, 1)])
        console.log(newLists)
        saveLists(newLists);
        setUseList(newLists[0]);
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
                                removeItem = {removeItem}
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

    const getList = async () => {
        const getList = await AsyncStorage.getItem(metadata.LISTS);
        if (getList) {
            console.log(JSON.parse(getList)[listIndex])
            setUseList(JSON.parse(getList)[listIndex]);
        }
    }

    return (
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
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 24
    },
    title: {
        fontSize: 30,
        textAlign: "center"
    }
});