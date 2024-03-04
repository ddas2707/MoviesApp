import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import PersonScreen from '../screens/PersonScreen'


const Cast = ({ cast, navigation }) => {
    let name = 'RDJ'
    // const navigation = useNavigation()====> use kyu nhi kia
    return (
        <ScrollView style={styles.cast}>
            <Text style={styles.title}>Cast</Text>
            <ScrollView showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                horizontal={true}
            >
                {cast.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Person', PersonScreen)}>
                            <RoundImageCard name={name} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </ScrollView>
    )
}
export default Cast;

const RoundImageCard = ({ name }) => {
    return (
        <View style={styles.card}>
            <Image source={require('../assets/moviestar1.webp')} style={styles.image} />
            <Text style={styles.name}>{
                name.length > 10 ? (name.slice(0, 10) + "...") : name
            }</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    cast: {
        paddingBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Montserrat_400Regular',
        marginBottom: 7,
        color: '#fff'
    },
    card: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        // elevation: 5, // for shadow
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50, // for round shape
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})