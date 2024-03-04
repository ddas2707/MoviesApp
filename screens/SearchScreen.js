import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const SearchScreen = () => {
    const navigation = useNavigation()
    const [results, setResults] = useState([1, 2, 3, 4, 5, 6, 7])
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.SearchScreen}>
                <View style={styles.searchbar}>
                    <TextInput placeholder='Search Movies'
                        placeholderTextColor={'lightgray'}
                        style={styles.input} />
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <XMarkIcon size={25} color="white" />
                    </TouchableOpacity>
                </View>
                {results.length > 0 ? <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    <Text style={styles.results}>Results ({results.length})</Text>
                    <View>
                        {results.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => navigation.push('Movie', item)}
                                >
                                    <View style={styles.searchcard}>
                                        <Image source={require('../assets/movieposter4.jpeg')}
                                            style={{ height: height * 0.12, width: width * 0.3, borderRadius: (width * 0.6) / 2 }} />
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.name}>Dr.Strange 2 </Text>
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
                )}
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
        fontSize: 17
    },
    results: {
        fontSize: 16,
        color: '#fff'
    },
    searchcard: {
        height: height * 0.15,
        width: width * 0.9,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 6,
        borderRadius: 60,
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    name: {
        // backgroundColor: 'white',
        marginLeft: 20,
        fontSize: 19

    }
})