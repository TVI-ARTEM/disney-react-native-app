import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    ImageBackground,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "./Navigation";
import {HOME_SCREEN} from "./routes";
import {check, login, registration} from "../../http/serverAPI/userApi";
import {UserContext} from "../../providers/UserProvider";
import {User} from "../../models/user";


type authScreenProp = StackNavigationProp<StackParamList, `Auth`>;


export default function AuthScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation<authScreenProp>()
    const {setUser} = useContext(UserContext)

    useEffect(() => {
        check().then(data => {
            setUser(data as User)
            navigation.navigate(HOME_SCREEN, {name: ""})
        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../images/DisneyBackground.png')} resizeMode={"cover"}
                             style={styles.background} imageStyle={styles.backgroundImage}>

                <View style={{alignItems: "center", justifyContent: "center", gap: 10}}>
                    <TextInput value={email} onChangeText={setEmail}
                               placeholder={"Enter email"}
                               maxLength={25}
                               style={styles.input}
                    />

                    <TextInput value={password} onChangeText={setPassword}
                               placeholder={"Enter password"}
                               maxLength={25}
                               secureTextEntry={true}
                               style={{marginBottom: 25, ...styles.input}}
                    />
                    <View style={{width: "50%"}}>
                        <Button title={"Sign In"} onPress={() => {
                            login(email, password).then(data => {
                                setUser(data as User)
                                navigation.navigate(HOME_SCREEN, {name: ""})
                            }).catch(error => console.log(error))
                        }
                        }/>
                    </View>

                    <View style={{width: "50%"}}>
                        <Button title={"Sign Up"} onPress={() => {
                            registration(email, password).then(data => {
                                setUser(data as User)
                                navigation.navigate(HOME_SCREEN, {name: ""})
                            }).catch(error => console.log(error))
                        }
                        }/>
                    </View>

                </View>

            </ImageBackground>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderStyle: "solid",
        borderWidth: 2,
        width: "70%",
        paddingHorizontal: 5,
        borderRadius: 10,
        backgroundColor: "white",
        fontSize: 24,

    },

    background: {
        flex: 1,
        justifyContent: "center",

    },

    backgroundImage: {
        opacity: 0.75,
    }
});

