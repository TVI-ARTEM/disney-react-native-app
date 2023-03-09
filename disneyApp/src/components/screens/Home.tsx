import React, {useEffect, useState} from "react";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "./Navigation";
import {CHARACTER_SCREEN} from "./routes";
import {getCharacters} from "../../http/disneyAPI/disneyApi";


type homeScreenProp = StackNavigationProp<StackParamList, `Home`>;


export default function Home({}) {
    const [text, setText] = useState("")
    const navigation = useNavigation<homeScreenProp>()
    useEffect(() => {
        getCharacters(1, 10).then(data => {
            setText(data.json)
        }).catch(error => console.log(error.response.data))
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={{padding: 10}}>{text}</Text>

                <Button title={"GO TO CHARACTER"}
                        onPress={() => {
                            navigation.navigate(CHARACTER_SCREEN)
                        }
                        }
                />
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
});

