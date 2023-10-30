import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

import { useIsFocused } from "@react-navigation/native";

import Button from '../Components/Button'

export default function HomeScreen({ route, navigation }) {
    const { listsChange } = route.params;
    const focus = useIsFocused();
    const [lists, setLists] = useState([""]);

    useEffect(() => {
        setLists(listsChange);
    }, [focus])

    const listsDisplay = useMemo(() => {
        return(
            <View>
                    {
                        lists.map((item, index) => {
                            return (
                                <View key={"" + item + index}>
                                    <Text>{item}</Text>
                                </View>
                            )
                        })
                    }
            </View>
        )
    });

    console.log(listsChange);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ultimate List</Text>
            <Button
                onPress={() => {
                    navigation.navigate("CreateChangeList", {
                        action: "Criar",
                        lists: { lists }
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
    }
});