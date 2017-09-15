import React, { Component } from 'react';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';


export default class Store extends Component {

    render() {
        return (
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar />}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarActiveTextColor='#FF0000'>

                <Text style={styles.textStyle} tabLabel='娱乐'>娱乐</Text>
                <Text style={styles.textStyle} tabLabel='科技'>科技</Text>
                <Text style={styles.textStyle} tabLabel='军事'>军事</Text>
                <Text style={styles.textStyle} tabLabel='体育'>体育</Text>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }
});


