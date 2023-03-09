import {createStackNavigator} from '@react-navigation/stack';
import Home from "./Home";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Character" component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}