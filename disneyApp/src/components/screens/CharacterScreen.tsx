import React, {useContext, useEffect, useState} from "react";
import {
    ActivityIndicator, BackHandler, Button, FlatList,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from "react-native";

import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "./Navigation";
import {AUTH_SCREEN, CHARACTER_SCREEN, HOME_SCREEN} from "./routes";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Character} from "../../models/character";
import {getCharacter} from "../../http/disneyAPI/disneyApi";
import SafeAreaView from "react-native-safe-area-view";
import {BottomSheet, FAB} from '@rneui/themed';
import {Icon} from "@rneui/base";

import {
    addGroupCharacter,
    createComment,
    createGroup, getComments,
    getGroupCharacters,
    getGroups
} from "../../http/serverAPI/characterApi";
import {UserContext} from "../../providers/UserProvider";
import {Group} from "../../models/group";
import {GroupCharacter} from "../../models/groupCharacter";
import {Comment} from "../../models/comment";


type characterScreenProp = StackNavigationProp<StackParamList, `Character`>;
type characterScreenRouteProp = RouteProp<StackParamList, `Character`>;

type ItemProps = { group: Group, character: Character }


const GroupItem = ({group, character}: ItemProps) => {
    const [visible, setVisible] = useState(false)
    const [contains, setContains] = useState(false)
    const [characters, setCharacters] = useState<GroupCharacter[]>([])
    const {user} = useContext(UserContext)
    useEffect(() => {
        getGroupCharacters(user, group)
            .then(data => {
                for (const char of data.groups) {
                    if (char.characterId === character._id) {
                        setContains(true)
                        break
                    }
                }

                setCharacters(data.groups)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }, [])


    return <View style={styles.item}>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View>
                <Text style={{...styles.name, color: "black"}}>{group.name}</Text>
            </View>
        </TouchableOpacity>
        {visible && (
            <>
                {
                    characters.map((item, index) => (
                        <Text style={{...styles.others, color: "black", marginHorizontal: 15, margin: 5}}
                              key={index}>{item.characterName}</Text>
                    ))

                }

                {
                    !contains && (
                        <View style={{flex: 1, alignItems: "center", margin: 15}}>
                            <View style={{width: "50%"}}>
                                <Button
                                    onPress={() => addGroupCharacter(user, group, character._id, character.name)
                                        .then(data => {
                                            setCharacters([...characters, data.group])
                                            setContains(true)
                                        })
                                        .catch(error => console.log(error.response.data))
                                    }
                                    title={"Add"}/>
                            </View>

                        </View>
                    )
                }
            </>


        )
        }

    </View>
}


export default function CharacterScreen() {
    const navigation = useNavigation<characterScreenProp>()
    const route = useRoute<characterScreenRouteProp>()
    const {id} = route.params
    const {user} = useContext(UserContext)
    const [character, setCharacter] = useState<Character>({} as Character)
    const [initialized, setInitialized] = useState(false)
    const [groupVisible, setGroupVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);
    const [groups, setGroups] = useState<Group[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [newGroupName, setNewGroupName] = useState("")
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        getCharacter(id).then(data => {
            setCharacter(data)
            setInitialized(true)
        }).catch(error => {
            console.log(error.response.data)
            navigation.navigate(HOME_SCREEN, {name: ""})
        })
    }, [])


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack()
            return true
        })
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        getGroups(user).then(data => {
            setGroups(data.groups)
        }).catch(error => {
            console.log(error.response.data)
            navigation.navigate(HOME_SCREEN, {name: ""})
        })
    }, [])

    useEffect(() => {
        if (!initialized) {
            return
        }
        getComments(user, character._id).then(data => {
            setComments(data.groups)
        }).catch(error => {
            console.log(error.response.data)
            navigation.navigate(HOME_SCREEN, {name: ""})
        })
    }, [initialized])


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
                         setGroupVisible(true)
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
                         setCommentVisible(true)
                     }
                     }

                     icon={<Icon name={"edit"} color={"white"}/>}
                     color={"#ff494d"}
                >
                </FAB>


                <BottomSheet modalProps={{}} isVisible={groupVisible} onBackdropPress={() => setGroupVisible(false)}
                             containerStyle={{
                                 backgroundColor: "transparent",
                                 maxHeight: "30%",
                                 bottom: "70%",
                                 borderTopLeftRadius: 25,
                                 borderTopRightRadius: 25,
                             }}


                             scrollViewProps={{nestedScrollEnabled: true}}
                >
                    <View style={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                    }}>
                        <View style={{
                            margin: 10,
                            flexDirection: "row",
                            gap: 5,
                            alignContent: "center",
                            marginTop: 25,
                            justifyContent: "center"
                        }}>
                            <TextInput value={newGroupName} onChangeText={setNewGroupName}
                                       placeholder={"Enter group name"}
                                       maxLength={20}
                                       style={{
                                           fontSize: 20,
                                           borderStyle: "solid",
                                           borderWidth: 2,
                                           width: "55%",
                                           paddingHorizontal: 5,
                                           borderRadius: 10
                                       }}
                            />
                            <View style={{width: "25%"}}>
                                <Button title={"Add"}
                                        onPress={() => createGroup(user, newGroupName)
                                            .then(data => {
                                                setGroups([...groups, data.group])
                                            })
                                            .catch(error => console.log(error.response.data))
                                        }/>
                            </View>

                        </View>

                        <View>
                            {
                                groups.map((item, index) => (
                                    <GroupItem group={item} character={character} key={index}/>
                                ))
                            }
                        </View>


                    </View>


                </BottomSheet>

                <BottomSheet modalProps={{}} isVisible={commentVisible} onBackdropPress={() => setCommentVisible(false)}
                             containerStyle={{
                                 backgroundColor: "transparent",
                                 maxHeight: "30%",
                                 bottom: "70%",
                                 borderTopLeftRadius: 25,
                                 borderTopRightRadius: 25,
                             }}

                             scrollViewProps={{nestedScrollEnabled: true}}
                >
                    <View style={{
                        backgroundColor: "white",
                        alignContent: "center",
                        justifyContent: "center",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                    }}>
                        <View style={{
                            margin: 10,
                            gap: 5,
                            alignContent: "center",
                            marginTop: 25,
                            justifyContent: "center"
                        }}>
                            <TextInput value={newComment} onChangeText={setNewComment}
                                       placeholder={"Type Comment"}
                                       multiline={true}
                                       numberOfLines={5}
                                       style={{
                                           fontSize: 20,
                                           borderStyle: "solid",
                                           borderWidth: 2,
                                           width: "80%",
                                           alignSelf: "center",
                                           paddingHorizontal: 5,
                                           borderRadius: 10
                                       }}
                            />
                            <View style={{width: "25%", alignSelf: "center"}}>
                                <Button title={"Add"}
                                        onPress={() =>
                                            createComment(user, newComment, character._id)
                                                .then(data => {
                                                    setComments([...comments, data.group])
                                                })
                                                .catch(error => console.log(error.response.data))
                                        }/>
                            </View>

                        </View>

                        <View>
                            {
                                comments.map((item, index) => (
                                    <Text
                                        style={{
                                            ...styles.others,
                                            color: "black",
                                            marginHorizontal: 15,
                                            margin: 5
                                        }}
                                        key={index}
                                    >{item.comment}</Text>
                                ))
                            }
                        </View>


                    </View>


                </BottomSheet>

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
        paddingHorizontal: 10,
        margin: 5
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