import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/HomeScreen';
import CreateChangeList from './src/CreateChangeListScreen'
import List from './src/ListScreen'
import CreateChangeItem from './src/CreateChangeItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#BEB7A4"
        },
        headerTintColor: "#191716"
      }}>
        <Stack.Screen name="Home" component={Home} options={{
          title: "Home"
          }} />
        <Stack.Screen name="CreateChangeList" component={CreateChangeList} options={{title: "Editor de listas"}} />
        <Stack.Screen name="List" component={List} options={{title: "Lista"}} />
        <Stack.Screen name="CreateChangeItem" component={CreateChangeItem} options={{title: "Editor de itens"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
