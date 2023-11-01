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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CreateChangeList" component={CreateChangeList} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="CreateChangeItem" component={CreateChangeItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
