import { View, Text, Platform, StyleSheet } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native-gesture-handler';
import TrendingMovies from '../Components/TrendingMovies';
import MovieList from '../Components/MovieList';
import SearchScreen from './SearchScreen';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/Loading';
import { fetchTopratedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';


const HomeScreen = () => {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6])
    const [topRated, setTopRated] = useState([1, 2, 3])
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoading(false); // Set showLoader to false after 2000 milliseconds (2 seconds)
    //     }, 2000); // Change 2000 to the desired delay in milliseconds
    //     return () => clearTimeout(timer); // Clear the timer when the component unmounts or rerenders
    // }, []); // This effect runs only once when the component mounts

    useEffect(() => {
        getTrendingMovies();
        getUpComingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpComingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcoming(data.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopratedMovies();
        if (data && data.results) setTopRated(data.results)
        setLoading(false)
    }

    const navigation = useNavigation();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View className="flex-1 bg-neutral-800 pt-4">

                <SafeAreaView className="mt-30">
                    <StatusBar
                        backgroundColor="#000000"
                        barStyle="light-content"
                        translucent={false} />
                    <View className="flex-row justify-between items-center mx-4 mt-2 mb-4">
                        <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                        <Text className="text-white text-3xl font-bold">
                            <Text style={styles.heading}>M</Text>ovies
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Trial')}>
                            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                        </TouchableOpacity> */}
                    </View>
                </SafeAreaView>
                {loading ? <Loading /> : <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >

                    {trending.length > 0 && <TrendingMovies data={trending} />}
                    <MovieList title="UpComing" data={upcoming} hideSeeall={true} />
                    <MovieList title="TopRated" data={topRated} hideSeeall={true} />
                </ScrollView>}

            </View>
        </GestureHandlerRootView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    heading: {
        color: "#eab308"
    }
})