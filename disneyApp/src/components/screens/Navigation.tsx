import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import CharacterScreen from "./CharacterScreen";
import {CHARACTER_SCREEN, HOME_SCREEN} from "./routes";
import {Button, TextInput, View} from "react-native";
import React, {useState} from "react";


export type StackParamList = {
    Home: {name: string};
    Character: { id: number };
};

const Stack = createStackNavigator<StackParamList>();

export default function Navigation() {
    const [searchText, setSearchText] = useState("")

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={({navigation}) => ({
                    headerRight: () => <View style={{marginEnd: 10, flexDirection: "row", gap: 5}}>
                        <TextInput value={searchText} onChangeText={setSearchText}
                                   placeholder={"Enter character name"}
                                   maxLength={20}
                                   style={{borderStyle: "solid", borderWidth: 2, width: "55%", paddingHorizontal: 5, borderRadius: 10}}
                        />
                        <Button title={"Search"} onPress={() => {
                            navigation.setParams({name: searchText})
                        }
                        }/>
                    </View>
                })}>
                    <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={{
                        headerShown: true, headerTitle: "DISNEY",
                    }}
                    initialParams={{name: ""}}
                    />
                </Stack.Group>
                <Stack.Screen name={CHARACTER_SCREEN}
                              component={CharacterScreen}
                              initialParams={{id: 6}}
                              options={{headerShown: true, headerTitle: "Character"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}