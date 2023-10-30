import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/HomeScreen';
import CreateChangeList from './src/CreateChangeListScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} initialParams={{
          listsChange: new Array()
        }}/>
        <Stack.Screen name="CreateChangeList" component={CreateChangeList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
