import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { ChevronLeftIcon, HeartIcon as Nheart } from 'react-native-heroicons/outline';
import { HeartIcon as Heart } from 'react-native-heroicons/solid'
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../Components/Cast';
import MovieList from '../Components/MovieList';


const { width, height } = Dimensions.get('window');
const MovieScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    let movieName = "Avengers : EndGame";

    const [liked, setLiked] = useState(false);
    const [cast, setCast] = useState([1, 2, 3, 4, 5, 6, 7])
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5, 6, 7])

    const toggleLiked = (e) => {
        e.preventDefault()
        setLiked(prev => !prev)
    }

    useEffect(() => {
        //movie api to be fetched here
    }, [item])
    return (
        <GestureHandlerRootView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                style={styles.container}
            >
                <View style={styles.grid}>
                    <SafeAreaView style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                            <ChevronLeftIcon size="28" strokeWidth={2} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleLiked}>
                            {liked ? <Heart size="35" strokeWidth={1.5} color="red" /> :
                                <Nheart size="35" strokeWidth={1.5} color="white" />}
                        </TouchableOpacity>
                    </SafeAreaView>
                    <View>
                        <Image
                            source={require('../assets/movieposter2.jpeg')}
                            style={{ width: width, height: height * 0.55, borderRadius: 50 }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.4)', 'rgba(23,23,23,1)']}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />
                    </View>
                    <View style={styles.description}>
                        {/*Name of the movie and its one liner description*/}
                        <Text style={styles.title}>{movieName}</Text>
                        <Text style={styles.details}>
                            Realeased  •  2020  •  3hr
                        </Text>
                    </View>
                    <View style={styles.genre}>
                        <Text style={styles.genreDesc}>Action  •</Text>
                        <Text style={styles.genreDesc}>Thrill  •</Text>
                        <Text style={styles.genreDesc}>ScienceFiction</Text>
                    </View>
                    <Text style={styles.about}>
                        Et sed etiam penatibus. Sapien erat aliquam vulputate sodales rhoncus.
                        Sollicitudin quisque, penatibus nibh nec. Eros placerat mus magnis platea
                        viverra volutpat! Euismod lacus metus adipiscing torquent per maecenas lo
                        bortis eget enim class! Sociosqu netus adipiscing etiam justo cursus elit
                        faucibus erat gravida senectus interdum primis. Quam justo sagittis inter
                        dum mollis imperdiet sociosqu mollis nam ultrices aliquet tempor nullam.
                        Felis mollis dignissim hac metus phasellus quis nibh sit vestibulum ac!
                        Lorem commodo enim tristique ipsum nisi condimentum rhoncus lacus risus!
                    </Text>
                </View>
                {/* Cast Component here  */}
                <Cast cast={cast} navigation={navigation} />
                <MovieList title="Also Played In" data={similarMovies} hideSeeall={true} image={require('../assets/movieposter3.jpeg')} />
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default MovieScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(23 23 23)',
        padding: 20,
    },
    grid: {
        paddingBottom: 20
    },
    text: {
        color: 'black'
    },
    icon: {
        backgroundColor: '#eab308',
        borderRadius: 10,
        width: 30,
        padding: 2
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,

    },
    description: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -(height * 0.1)

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Montserrat_400Regular',
        marginBottom: 7,
        textAlign: 'center',
        color: '#fff'

    },
    details: {
        fontSize: 16,
        fontWeight: '300',
        color: '#ffffff'
    },
    genre: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
    },
    genreDesc: {
        paddingRight: 7,
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center'
    },
    about: {
        paddingTop: 15,
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'left',
        color: '#fff'
    }
})