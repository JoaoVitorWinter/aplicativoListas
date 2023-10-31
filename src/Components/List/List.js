import { View, Text } from "react-native";

import Button from '../Button';

export default function List(props) {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{props.date}</Text>
            <Button text={"Editar"} onPress={() => {props.navigation.navigate("CreateChangeList", {
                action: "Editar",
                lists: props.lists,
                listIndex: props.index
            })}} />
            <Button text={"X"} onPress={() => {
                props.removeList(props.index);
            }}/>
        </View>
    )
}