import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from '../Components/Button'
import List from "../Components/List";
import metadata from '../storage.metadata.json';

export default function HomeScreen({ route, navigation }) {
    const { listsChange } = route.params;
    const focus = useIsFocused();
    const [lists, setLists] = useState(new Array());

    useEffect(() => {
        getLists();
    }, []);

    useEffect(() => {
        setLists(listsChange);
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
                            // <View style={styles.list} key={"" + item + index}>
                            //     <Text style={{ width: 50 }}>{item[0]}</Text>
                            //     <Text>{item[1]}</Text>
                            //     <View style={{ flexDirection: "row", gap: 10 }}>
                            //         <Pressable onPress={() => {
                            //             navigation.navigate("CreateChangeList", {
                            //                 action: "Editar",
                            //                 lists: lists,
                            //                 listIndex: index
                            //             })
                            //         }}>
                            //             <Text>
                            //                 Editar
                            //             </Text>
                            //         </Pressable>
                            //         <Pressable onPress={() => { removeList(index) }}>
                            //             <Text>
                            //                 X
                            //             </Text>
                            //         </Pressable>
                            //     </View>
                            // </View>

                            <List
                                key={"" + item + index  }
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
    }

});