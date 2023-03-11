import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import CharacterScreen from "./CharacterScreen";
import {CHARACTER_SCREEN, HOME_SCREEN} from "./routes";


export type StackParamList = {
    Home: undefined;
    Character: {id: number};
};

const Stack = createStackNavigator<StackParamList>();

export default function Navigation() {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name={CHARACTER_SCREEN}
                              component={CharacterScreen}
                              initialParams={{id: 6}}
                              options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}