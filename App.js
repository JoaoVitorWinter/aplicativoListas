import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage  from "@react-native-async-storage/async-storage";

import Home from './src/HomeScreen';
import CreateChangeList from './src/CreateChangeListScreen'
import List from './src/ListScreen'
import metadata from './src/storage.metadata.json';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} initialParams={{
          listsChange: new Array()
        }}/>
        <Stack.Screen name="CreateChangeList" component={CreateChangeList} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
