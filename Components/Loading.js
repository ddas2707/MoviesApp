import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

const Loading = () => {
    return (
        <View style={{ height: height, width: width, flex: 1, backgroundColor: 'rgb(38 38 38)', justifyContent: 'center', alignItems: 'center' }}>
            <Progress.Circle size={60} indeterminate={true} thickness={24} color="#eab308" />
        </View >
    );
}

export default Loading;

const styles = StyleSheet.create({});
