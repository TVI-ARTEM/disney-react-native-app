import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import Home from "./Home";
import Character from "./Character";
import {CHARACTER_SCREEN, HOME_SCREEN} from "./routes";


export type StackParamList = {
    Home: undefined;
    Character: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function Navigation() {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={HOME_SCREEN} component={Home} options={{headerShown: false}}/>
                <Stack.Screen name={CHARACTER_SCREEN} component={Character} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}