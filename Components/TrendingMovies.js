import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    return (
        <View style={styles.Container}>
            <Text style={styles.trending}>TrendingMovies</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.7}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}
export default TrendingMovies

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={styles.Carousel}>
                <Image
                    //source={require('../assets/movieposter2.jpeg')}
                    source={{ uri: image500(item.poster_path) }}
                    style={[{
                        height: height * 0.5,
                        width: width * 0.7,
                        borderRadius: 20,
                        overflow: 'hidden'
                    }]} />
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    Container: {
        marginBottom: 15
    },
    trending: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 8
    },
    Carousel: {
        overflow: 'hidden'
    }

})