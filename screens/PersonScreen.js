import { Dimensions, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { ChevronLeftIcon, HeartIcon as Nheart } from 'react-native-heroicons/outline';
import { HeartIcon as Heart } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../Components/MovieList'
import { fetchPersonDetails, fetchPersonMovies, fetchTopratedMovies, image500 } from '../api/moviedb';
import { image342 } from '../api/moviedb';
import { fallbackMoviePoster } from '../api/moviedb';


const { width, height } = Dimensions.get('window')
const PersonScreen = () => {

    const { params: item } = useRoute();

    const navigation = useNavigation()
    const [personliked, setPersonLiked] = useState(false);
    const [personMovies, setPersonMovies] = useState([])
    const [person, setPerson] = useState({})
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoading(false); // Set showLoader to false after 2000 milliseconds (2 seconds)
    //     }, 2000); // Change 2000 to the desired delay in milliseconds
    //     return () => clearTimeout(timer); // Clear the timer when the component unmounts or rerenders
    // }, []); // This effect runs only once when the component mounts

    useEffect(() => {
        setLoading(true)
        // console.log('person', item)
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id)
        //console.log('eror nhi mil rha ', data)
        if (data) setPerson(data)
    }
    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id)
        if (data && data.cast) setPersonMovies(data.cast)
    }

    const toggleLiked = (e) => {
        e.preventDefault()
        setPersonLiked(prev => !prev)
    }
    return (
        <GestureHandlerRootView>
            <ScrollView
                scrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 10, backgroundColor: 'rgb(23 23 23)' }}
                showsHorizontalScrollIndicator={false}
            >
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                        <ChevronLeftIcon size="28" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleLiked}>
                        {personliked ? <Heart size="35" strokeWidth={1.5} color="red" /> :
                            <Nheart size="35" strokeWidth={1.5} color="white" />}
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={styles.grid}>
                    <View style={styles.image}>
                        <Image source={{ uri: image342(person?.profile_path) || fallbackMoviePoster }}
                            style={{ width: width * 0.74, height: height * 0.39, borderRadius: (width * 0.74) / 2 }}
                        />
                    </View>
                </View>
                <View style={styles.data}>
                    <Text style={styles.starName}>{person?.name}</Text>
                    <Text style={styles.location}> East Hampton , New York</Text>
                </View>
                <View style={styles.design}>
                    <View style={styles.bigData}>
                        <View style={styles.bioData}>
                            <Text style={styles.head}>Gender</Text>
                            <Text>{
                                person?.gender == 1 ? 'Female' : 'Male'
                            }</Text>
                        </View>
                        <View style={styles.bioData}>
                            <Text style={styles.head}>D.O.B</Text>
                            <Text>{person?.birthday}</Text>
                        </View>
                        <View style={styles.biodata2}>
                            <Text style={styles.head}>Followers</Text>
                            <Text>{person?.popularity}</Text>
                        </View>
                    </View>
                    <View style={styles.about}>
                        <Text style={{ fontSize: 20, color: '#fff', paddingHorizontal: 20, paddingVertical: 12, fontWeight: '500' }}>BioGraphy</Text>
                        <Text style={styles.biography}>{
                            person?.biography
                        }
                        </Text>
                    </View>
                    <View style={styles.relatedMovies}>
                        <MovieList data={personMovies} title="Related Movies" hideSeeall={false} />
                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>

    )
}
export default PersonScreen

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    icon: {
        backgroundColor: '#eab308',
        borderRadius: 10,
        width: 30,
        padding: 2
    },
    grid: {
        alignItems: 'center',
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.76,
        height: height * 0.40,
        borderRadius: (width * 0.80) / 2,
        backgroundColor: 'white',
        // shadowColor: 'gray',
        // shadowRadius: 60,
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 1,
        // backgroundColor: 'white'
    },
    data: {
        alignItems: 'center'
    },
    starName: {
        paddingTop: 20,
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    },
    location: {
        fontSize: 16,
        lineHeight: 24,
        color: 'rgb(115 115 115)'
    },
    design: {
        alignItems: 'center'
    },
    bigData: {
        marginTop: 20,
        backgroundColor: 'rgb(64 64 64)', /* as bg-neutral-700*/
        marginHorizontal: 5,
        height: 60,
        width: '75%',
        borderRadius: 25,
        padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    bioData: {
        height: '100%',
        width: '33%',
        borderRightWidth: 2,
        borderColor: 'gray',
        alignItems: 'center'
    },
    biodata2: {
        height: '100%',
        width: '33%',
        alignItems: 'center'
    },
    head: {
        fontSize: 15,
        color: '#fff'
    },
    about: {
        marginVertical: 20,
    },
    biography: {
        marginHorizontal: 20
    },
    relatedMovies: {
        paddingHorizontal: 20
    }
})