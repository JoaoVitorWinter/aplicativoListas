import { StyleSheet, View, Text, Pressable } from "react-native";

import { Icon } from '@rneui/themed';

export default function Item(props) {
    return (
        <View>
            <Text style={styles.date}>{props.date}</Text>
            <Pressable style={styles.item}>
                <Text style={styles.name}>{props.name}</Text>
                <View style={styles.buttons}>
                    <Pressable onPress={() => {
                        props.navigation.navigate("CreateChangeItem", {
                            action: "Editar",
                            lists: props.lists,
                            listIndex: props.listIndex,
                            itemIndex: props.index

                        })
                    }}>
                        <Icon name="edit" color={"#E0E2DB"} />
                    </Pressable>
                    <Pressable onPress={() => {
                        props.removeItem(props.index);
                    }}>
                        <Icon name="delete" color={"#E0E2DB"} />
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#3D348B",
        flexDirection: "row",
        width: 350,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
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
        width: 225,
        textAlign: "center",
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginBottom: 4,
        fontSize: 16,
        fontWeight: "500"
    }
});