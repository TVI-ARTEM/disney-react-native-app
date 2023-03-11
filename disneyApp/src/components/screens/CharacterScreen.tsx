import React, {useEffect, useState} from "react";
import {
    ActivityIndicator, BackHandler,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "./Navigation";
import {HOME_SCREEN} from "./routes";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Character} from "../../models/character";
import {getCharacter} from "../../http/disneyAPI/disneyApi";
import SafeAreaView from "react-native-safe-area-view";
import { FAB, Icon } from '@rneui/themed';



type characterScreenProp = StackNavigationProp<StackParamList, `Character`>;
type characterScreenRouteProp = RouteProp<StackParamList, `Character`>;


export default function CharacterScreen() {
    const navigation = useNavigation<characterScreenProp>()
    const route = useRoute<characterScreenRouteProp>()
    const {id} = route.params
    const [character, setCharacter] = useState<Character>({} as Character)
    const [initialized, setInitialized] = useState(false)
    const name = ""
    useEffect(() => {
        getCharacter(id).then(data => {
            setCharacter(data)
            setInitialized(true)
        }).catch(error => {
            console.log(error.response.data)
            navigation.navigate(HOME_SCREEN, {name})
        })
    }, [])


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack()
            return true
        })
        return () => backHandler.remove()
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../images/DisneyBackground.png')} resizeMode={"cover"}
                             style={styles.background} imageStyle={styles.backgroundImage}>
                <View style={styles.item}>
                    <View style={{alignItems: "center", flex: 1}}>
                        <Image source={{uri: character.imageUrl}} style={styles.logo}/>
                    </View>
                    {
                        initialized && (
                            <View style={{alignItems: "flex-start", flex: 1, margin: 5, marginTop: 100}}>

                                <ScrollView>
                                    <Text>
                                        <Text style={styles.name}>Name: </Text>
                                        <Text style={styles.others}>{character.name}</Text>
                                    </Text>

                                    <Text>
                                        <Text style={styles.name}>Films: </Text>
                                        <Text style={styles.others}>{character.films.join(", ")}</Text>
                                    </Text>

                                    <Text>
                                        <Text style={styles.name}>Short Films: </Text>
                                        <Text style={styles.others}>{character.shortFilms.join(", ")}</Text>
                                    </Text>

                                    <Text>
                                        <Text style={styles.name}>Video Games: </Text>
                                        <Text style={styles.others}>{character.videoGames.join(", ")}</Text>
                                    </Text>

                                    <Text>
                                        <Text style={styles.name}>Park Attractions: </Text>
                                        <Text style={styles.others}>{character.parkAttractions.join(", ")}</Text>
                                    </Text>

                                    <Text>
                                        <Text style={styles.name}>Allies: </Text>
                                        <Text style={styles.others}>{character.allies.join(", ")}</Text>
                                    </Text>

                                    <Text>
                                        <Text style={styles.name}>Enemies: </Text>
                                        <Text style={styles.others}>{character.enemies.join(", ")}</Text>
                                    </Text>

                                </ScrollView>
                            </View>

                        )
                    }

                    {
                        !initialized && (
                            <View style={{alignItems: "center", flex: 1, margin: 5}}>
                                <ActivityIndicator size={"large"} color={"#a1b2c3"}/>
                            </View>
                        )
                    }

                </View>

                <FAB style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    marginHorizontal: 10,
                    end: 10,
                    top: 20,
                    justifyContent: "flex-end"
                }}
                     onPress={() => {
                     }
                     }

                     icon={<Icon name={"star"} color={"white"}/>}
                     color={"#ff494d"}

                />
                <FAB style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    marginHorizontal: 10,
                    end: 10,
                    top: 90,

                    justifyContent: "flex-end"
                }}
                     onPress={() => {
                     }
                     }

                     icon={<Icon name={"edit"} color={"white"}/>}
                     color={"#ff494d"}
                >
                </FAB>
            </ImageBackground>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        padding: 5,
        flexDirection: "column",
        borderRadius: 5,
        backgroundColor: `rgba(0, 0, 0, 0.5)`
    },
    name: {
        fontSize: 18,
        margin: 5,
        fontWeight: "bold",
        alignContent: "flex-start",
        color: "white"
    },
    others: {
        fontSize: 18,
        marginStart: 5,
        alignContent: "flex-start",
        color: "rgb(245, 245, 245)"
    },
    logo: {
        margin: 5,
        width: "95%",
        height: undefined,
        aspectRatio: 1,
        resizeMode: "contain",
        marginTop: 20
    },
    background: {
        flex: 1,
        justifyContent: "center",

    },

    backgroundImage: {
        opacity: 0.75,
    }
});