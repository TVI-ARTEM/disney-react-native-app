import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "./Navigation";
import {CHARACTER_SCREEN, HOME_SCREEN} from "./routes";
import {useNavigation} from "@react-navigation/native";


type characterScreenProp = StackNavigationProp<StackParamList, `Home`>;


export default function Character() {
    const navigation = useNavigation<characterScreenProp>()

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
            <Button title={"GO TO HOME"}
                    onPress={() => {
                        navigation.navigate(HOME_SCREEN)
                    }
                    }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});