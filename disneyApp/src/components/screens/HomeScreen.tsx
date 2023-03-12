import React, {useEffect, useState} from "react";
import {
    ActivityIndicator, BackHandler,
    Button,
    FlatList,
    Image, ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "./Navigation";
import {getCharacters, getFilteredCharacter} from "../../http/disneyAPI/disneyApi";
import {Character} from "../../models/character";
import {CHARACTER_SCREEN, HOME_SCREEN} from "./routes";


type homeScreenProp = StackNavigationProp<StackParamList, `Home`>;
type homeScreenRouteProp = RouteProp<StackParamList, `Home`>;

type ItemProps = { id: number, name: string, imageUrl: string, appearance: string[] }


export default function HomeScreen({}) {
    const [characters, setCharacters] = useState<Character[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [count, setCount] = useState(0)
    const [downloading, setDownloading] = useState(true)
    const [specificCharacter, setSpecificCharacter] = useState(false)
    const navigation = useNavigation<homeScreenProp>()
    const route = useRoute<homeScreenRouteProp>()
    const [names, setNames] = useState<string[]>([])
    const {name} = route.params

    const Item = ({id, name, imageUrl, appearance}: ItemProps) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate(CHARACTER_SCREEN, {id})}>
                <View>
                    <Image source={{uri: imageUrl}} style={styles.logo}/>
                </View>
                <View style={{alignItems: "flex-start", flex: 1}}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.film}>{appearance.join(" ").substring(0, 30) + "..."}</Text>
                </View>
            </TouchableOpacity>

        </View>
    )

    const toSet = (original: Character[], another: Character[]) => {
        const copyOriginal = [...original]
        const copyAnother = [...another]
        for (const character of copyAnother) {
            if (copyOriginal.filter(it => it._id === character._id).length === 0) {
                copyOriginal.push(character)
            }
        }
        return copyOriginal
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (names.length > 1) {
                names.pop()
                const prevName = name.at(-1)
                setNames(names)
                navigation.navigate(HOME_SCREEN, {name: prevName as string})
            }
            return true
        })
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        setDownloading(true)
        getCharacters(page, pageSize).then(data => {
            setCharacters(toSet(characters, data.data))
            setCount(data.count)
            setDownloading(false)
            setSpecificCharacter(false)
        }).catch(error => console.log(error.response.data))
    }, [page, pageSize])


    function initializedAgain() {
        setCharacters([])
        if (page === 1) {
            getCharacters(page, pageSize).then(data => {
                setCharacters(data.data)
                setCount(data.count)
                setDownloading(false)
                setSpecificCharacter(false)
            }).catch(error => console.log(error.response.data))
        } else {
            setPage(1)
        }
    }

    useEffect(() => {
        setNames([...names, name])
        setDownloading(true)
        if (name !== "") {
            getFilteredCharacter(name).then(data => {
                if (data.count === 0 || data.count === undefined) {
                    initializedAgain()
                } else {
                    setCharacters(data.data)
                    setSpecificCharacter(true)
                    setDownloading(false)
                }
            }).catch(error => {
                console.log(error.response.data)
                navigation.navigate(HOME_SCREEN, {name: ""})
            })
        } else {
            initializedAgain();
        }
    }, [name])


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../images/DisneyBackground.png')} resizeMode={"cover"}
                             style={styles.background} imageStyle={styles.backgroundImage}>

                <FlatList data={characters}
                          renderItem={({item}) => <Item id={item._id} name={item.name}
                                                        imageUrl={item.imageUrl}
                                                        appearance={[...item.films, ...item.shortFilms, ...item.videoGames]}/>}
                          keyExtractor={item => item._id.toString()}
                          numColumns={2}
                          style={{backgroundColor: `rgba(0, 0, 0, 0.5)`}}

                          ListFooterComponent={() => (
                              <>

                                  {
                                      count > page && !downloading && !specificCharacter && (
                                          <View style={{flex: 1, alignItems: "center", margin: 10}}>
                                              <View style={{width: "50%"}}>
                                                  <Button
                                                      onPress={() => setPage(page + 1)}
                                                      title={"Load more..."}/>
                                              </View>

                                          </View>
                                      )
                                  }
                                  {
                                      downloading && (
                                          <View style={{alignItems: "center", flex: 1, margin: 5}}>
                                              <ActivityIndicator size={"large"} color={"#a1b2c3"}/>
                                          </View>
                                      )
                                  }
                              </>
                          )}
                />


            </ImageBackground>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        margin: 5,
        flex: 1,
        padding: 5,
        flexDirection: "column",
        borderRadius: 5
    },
    text: {
        fontSize: 18,
        margin: 5,
        fontWeight: "bold",
        alignContent: "flex-start",
        color: "white"
    },
    film: {
        fontSize: 12,
        marginStart: 5,
        alignContent: "flex-start",
        color: "white"

    },
    logo: {
        margin: 5,
        width: "95%",
        height: undefined,
        aspectRatio: 0.7,
        resizeMode: "cover",
        borderRadius: 5,
        overflow: "hidden"
    },
    background: {
        flex: 1,
        justifyContent: "center",

    },

    backgroundImage: {
        opacity: 0.75,
    }
});

