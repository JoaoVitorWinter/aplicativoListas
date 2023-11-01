import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Item(props) {
    const removeItem = (index) => {
        var newList = [...props.list];
        newList[2].splice(index, 1);
        console.log(newList)
        // props.setLists(newLists);
        props.list = newList;
    }

    return (
        <View>
            <Text>{props.date}</Text>
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
                        <Text>
                            Editar
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        removeItem(props.index);
                    }}>
                        <Text>
                            X
                        </Text>
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: "aqua",
        flexDirection: "row",
        // flexWrap: "wrap",
        width: 350,
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
    },
    name: {
        maxWidth: "70%"
    },
    buttons: {
        flexDirection: "row",
        gap: 10
    }
});