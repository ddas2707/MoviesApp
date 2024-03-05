import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import PersonScreen from '../screens/PersonScreen'
import { image185 } from '../api/moviedb'


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
                {Array.isArray(cast) && cast.map((person, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Person', person)}>
                            <RoundImageCard person={person} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </ScrollView>
    )
}
export default Cast;

const RoundImageCard = ({ person }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image185(person?.profile_path) }} style={styles.image} />
            <Text style={styles.name}>{
                person?.name?.length > 10 ? (person?.name?.slice(0, 10) + "...") : person?.name
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