import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/Loading';
import { fetchSearchMovies, image185 } from '../api/moviedb';
import { debounce } from 'lodash';
import { searchMovies } from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const SearchScreen = () => {
    const navigation = useNavigation()
    const [results, setResults] = useState([1, 2, 3, 4])
    const [loading, setLoading] = useState(false)

    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
            })
        }
        else {
            setLoading(false)
            setResults([])
        }



    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.SearchScreen}>
                <View style={styles.searchbar}>
                    <TextInput placeholder='Search Movies'
                        onChangeText={handleTextDebounce}
                        placeholderTextColor={'lightgray'}
                        style={styles.input} />
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <XMarkIcon size={25} color="white" />
                    </TouchableOpacity>
                </View>
                {
                    loading ? <Loading /> :
                        results.length > 0 ? <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                        >
                            <Text style={styles.results}>Results ({results.length})</Text>
                            <View style={styles.mainCard}>
                                {results.map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => navigation.push('Movie', item)}
                                        >
                                            <View style={styles.searchcard}>
                                                <View>
                                                    <Image
                                                        source={{ uri: image185(item?.poster_path) }}
                                                        style={{ width: width * 0.44, height: height * 0.3, marginBottom: 3, marginHorizontal: 2, borderRadius: 30 }}
                                                    />
                                                    <Text style={styles.name}> {
                                                        item?.title?.length > 22 ? item.title.slice(0, 22) + "..." : item.title
                                                    }</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })}
                            </View>
                        </ScrollView> : (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../assets/error.png')}
                                    style={{ height: height * 0.4, width: width * 0.5 }}
                                />
                                <Text style={{ fontSize: 27, color: '#000', fontWeight: 'bold' }}>Item Not Found</Text>
                            </View>
                        )
                }


            </SafeAreaView>
        </GestureHandlerRootView>

    )
}

export default SearchScreen

const styles = StyleSheet.create({
    SearchScreen: {
        backgroundColor: 'rgb(38 38 38)',
        display: 'flex',
        flex: 1,
    },
    searchbar: {
        display: 'flex',
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 17,
        marginVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    input: {
        letterSpacing: 0.8,
        color: '#fff',
        fontSize: 17,
    },
    results: {
        fontSize: 16,
        color: '#fff'
    },
    searchcard: {
        backgroundColor: 'rgb(38 38 38)',
        display: 'flex',
        flexDirection: 'row',

    },
    name: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#fff'

    },
    mainCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItmes: 'center'
    }


})