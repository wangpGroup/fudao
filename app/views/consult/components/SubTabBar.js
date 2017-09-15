/**
 * Created by zhang on 2016/8/19.
 */
'use strict';

import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

class SubTabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    renderTabOption(tab, i) {
        // let color = this.props.activeTab == i ? "#000" : "#000"; // 判断i是否是当前选中的tab，设置不同的颜色
        let backgroundColor = this.props.activeTab == i ? "#fff" : theme.contentBgColor; // 判断i是否是当前选中的tab，设置不同的颜色
        // let fontSize = this.props.activeTab == i ? 15 : 13; // 判断i是否是当前选中的tab，设置不同的颜色
        let date = new Date();
        let nowDate = date.getDay() === 0 ? 6 : date.getDay() - 1;
        return (
            <TouchableOpacity
                key={i}
                onPress={() => this.props.goToPage(i)}
                style={styles.tab}
                activeOpacity={1}
                disabled={i <= nowDate ? false : true}
            >
                <View style={[styles.item,{backgroundColor: backgroundColor,}]}>
                    <Text style={{color: i <= nowDate ? '#666' : '#999', fontSize: 13}}>
                        {this.props.subTabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: 36,
        height: 50,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default SubTabBar;