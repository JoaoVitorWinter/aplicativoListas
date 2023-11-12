import { StyleSheet, View, Text, Pressable } from "react-native";

import { Icon } from '@rneui/themed';

export default function List(props) {
    const removeList = (index) => {
        var newLists = [...props.lists];
        newLists.splice(index, 1);
        props.setLists(newLists);
    }

    return (
        <View>
            <Text style={styles.date}>{props.date}</Text>
            <Pressable style={styles.list} onPress={() => {
                props.navigation.navigate("List", {
                    list: props.lists,
                    listIndex: props.index
                })
            }}>
                <Text style={styles.name}>{props.name}</Text>
                <View style={styles.buttons}>
                    <Pressable onPress={() => {
                        props.navigation.navigate("CreateChangeList", {
                            action: "Editar",
                            lists: props.lists,
                            listIndex: props.index
                        })
                    }}>
                        <Icon name="edit" color={"#E0E2DB"}/>
                    </Pressable>
                    <Pressable onPress={() => {
                        removeList(props.index);
                    }}>
                        <Icon name="delete" color={"#E0E2DB"}/>
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: "#3D348B",
        flexDirection: "row",
        width: 350,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        padding: 8
    },
    name: {
        fontSize: 16,
        maxWidth: "70%",
        color: "#E0E2DB"
    },
    buttons: {
        flexDirection: "row",
        gap: 10
    },
    date: {
        backgroundColor: "#3D348B",
        color: "#E0E2DB",
        width: "fit-content",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginBottom: 2
    }
});