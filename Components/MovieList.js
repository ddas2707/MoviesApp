import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window')

const MovieList = ({ data, title, image, hideSeeall }) => {
    let movieName = 'ThorLoveandThunder';
    const navigation = useNavigation();
    return (
        <View style={styles.Container}>
            <View style={styles.List}>
                <Text style={styles.heading}>{title}</Text>
                {hideSeeall ? <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity> : null}

            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                horizontal={true}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}>
                                <View style={styles.movies}>
                                    <Image
                                        source={image}
                                        style={{
                                            height: height * 0.25,
                                            width: width * 0.34,
                                            borderRadius: 20
                                        }}
                                    />
                                    <Text style={styles.movieTitle}>{
                                        movieName.length > 16 ? movieName.slice(0, 16) + "..." : movieName
                                    }</Text>

                                </View>

                            </TouchableWithoutFeedback>

                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default MovieList;
const styles = StyleSheet.create({
    Container: {
        marginBottom: 4,
    },
    List: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
    },
    seeAll: {
        fontSize: 20,
        fontWeight: '600',
        color: '#eab308',
    },
    scrollViewContent: {
        paddingHorizontal: 5,
    },
    movies: {
        justifyContent: 'space-between',
        marginRight: 2,
        marginTop: 10,
        marginRight: 10
    },

    movieTitle: {
        margin: 4
    },

})