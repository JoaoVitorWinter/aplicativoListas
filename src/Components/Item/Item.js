import { StyleSheet, View, Text, Pressable } from "react-native";

import { Icon } from '@rneui/themed';

export default function Item(props) {
    return (
        <View>
            <Text>{props.date}</Text>
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
    }
});