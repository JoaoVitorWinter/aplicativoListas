import { useEffect, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from '../Components/Button';
import Item from '../Components/Item';
import metadata from '../storage.metadata.json';

export default function ListScreen({ route, navigation }) {
    const { list, listIndex } = route.params;
    const focus = useIsFocused();

    useEffect(() => {
        saveLists(list);
    }, [focus]);

    const itemsDisplay = useMemo(() => {
        return (
            <View style={{ width: "100%", alignItems: "center", gap: 8 }}>
                {
                    list[listIndex][2].map((item, index) => {
                        return (
                            <Item
                                key={"" + item + index}
                                name={item[0]}
                                date={item[1]}
                                navigation={navigation}
                                index={index}
                                list={list[listIndex]}
                                lists={list}
                            // setLists={setLists}
                            />
                        )
                    })
                }
            </View>
        )
    }, [list]);

    const saveLists = async () => {
        const saveList = list || "";
        await AsyncStorage.setItem(metadata.LISTS, JSON.stringify(saveList));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{list[listIndex][0]}</Text>
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