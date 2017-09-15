import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Image, Dimensions} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "./components/TabBar";
import Home from "../home/Home";
import Article from "../article/Article";
import Discover from "../discover/Discover";
import My from "../my/My";
import Store from "../store/Store";

const tabTitles = ['资讯', '发现', '动', '商店', '我'];
const tabIcons = ['ios-list-box-outline', 'ios-compass-outline', '', 'ios-appstore-outline', 'ios-person-outline'];
const tabSelectedIcon = ['ios-list-box', 'ios-compass', '', 'ios-appstore', 'ios-person'];
const tabComponents = [Article, Discover, Home, Store, My];

@observer
export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            img: true,
            imgA: false,
            imgB: false,
            num: 2
        }
    }


    componentWillMount() {
        let {page} = this.props
        if (page) {
            this.setState({
                num: page
            })
        }
    }

    componentWillUnmount() {
        this.setState({
            num: 2
        })
    }

    onMsgByCallAndMsg = (msg) => {
        this.setState({
            num: msg
        })
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={()=> <TabBar
                    tabNames={tabTitles}
                    tabIconNames={tabIcons}
                    selectedTabIconNames={tabSelectedIcon}
                    page={this.props.page}/>}
                tabBarPosition='bottom'
                locked
                initialPage={this.state.num}
                page={this.state.num}
                scrollWithoutAnimation
            >
                {tabComponents.map((Component, i) => (
                    <Component key={tabTitles[i]} title={tabTitles[i]} newnew={1} onChangMsg={(msg) => {
                        this.onMsgByCallAndMsg(msg)
                    }}/>
                ))}
            </ScrollableTabView>
        )
    }
}
const styles = {
    container: {
        flexGrow: 1
    },
    tabBarStyle: {},
    sceneStyle: {},
    titleStyle: {
        color: theme.navTabBarTextColor,
        fontSize: 12
    },
    titleStyleSelected: {
        color: theme.navTabBarActiveTextColor
    },
    tabIcon: {
        color: theme.navTabBarTextColor,
        fontSize: 28,
        marginBottom: -3
    },
    tabIconSelected: {
        color: theme.navTabBarActiveTextColor
    },
}