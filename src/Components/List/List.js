import { View, Text, Pressable } from "react-native";

export default function List(props) {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{props.date}</Text>
            <Pressable>
                <Text>
                    Editar
                </Text>
            </Pressable>
            <Pressable>
                <Text>
                    X
                </Text>
            </Pressable>

        </View>
    )
}