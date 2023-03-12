import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import CharacterScreen from "./CharacterScreen";
import {AUTH_SCREEN, CHARACTER_SCREEN, HOME_SCREEN} from "./routes";
import {Button, TextInput, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import AuthScreen from "./AuthScreen";
import {Icon} from "@rneui/base";
import {logout} from "../../http/serverAPI/userApi";
import {UserContext} from "../../providers/UserProvider";


export type StackParamList = {
    Auth: undefined;
    Home: { name: string };
    Character: { id: number };
};

const Stack = createStackNavigator<StackParamList>();

export default function Navigation() {
    const [searchText, setSearchText] = useState("")
    const {user, setUser} = useContext(UserContext)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={AUTH_SCREEN}
                    component={AuthScreen}
                    options={{headerShown: true, headerTitle: "Disney"}}
                />
                <Stack.Group screenOptions={({navigation}) => ({
                    headerLeft: () => <View style={{marginStart: 10, flexDirection: "row", gap: 5}}>
                        <TextInput value={searchText} onChangeText={setSearchText}
                                   placeholder={"Enter character name"}
                                   maxLength={20}
                                   style={{
                                       borderStyle: "solid",
                                       borderWidth: 2,
                                       width: "55%",
                                       paddingHorizontal: 5,
                                       borderRadius: 10
                                   }}
                        />
                        <Button title={"Search"} onPress={() => {
                            navigation.setParams({name: searchText})
                        }
                        }/>
                    </View>,
                    headerRight: () =>
                        <TouchableOpacity
                            onPress={() =>
                                logout(user.email)
                                    .catch(error => console.log(error.response.data))
                                    .finally(() => {
                                        setUser({email: ""})
                                        navigation.navigate(AUTH_SCREEN)
                                    })}>
                            <Icon name={"logout"} style={{marginEnd: 10}}/>
                        </TouchableOpacity>
                })}>
                    <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={{
                        headerShown: true, headerTitle: "",
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