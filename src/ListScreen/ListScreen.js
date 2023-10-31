import { StyleSheet, View, Text } from 'react-native';

import Button from '../Components/Button';

export default function ListScreen({route, navigation}) {
    const { list, listIndex } = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{list[listIndex][0]}</Text>
            <Button text="Adicionar item" onPress={() => {navigation.navigate("CreateChangeItem")}} />
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