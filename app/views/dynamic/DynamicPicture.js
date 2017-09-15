import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Text, ToastAndroid, TouchableHighlight, TouchableOpacity, Image,Platform} from 'react-native'
import {Actions} from "react-native-router-flux";
import Swiper from 'react-native-swiper'
var images = [];
var index;

/**
 * 动态
 */
@observer
export default class DynamicPicture extends Component {
    render() {
        return (
            <View style={{backgroundColor: '#000'}}>
                {/*<Swiper*/}
                {/*style={{flex: 1}}*/}
                {/*paginationStyle={{bottom: 110}}*/}
                {/*loop={false}*/}
                {/*index={this.props.i}*/}
                {/*dot={<View style={styles.dot}></View>}*/}
                {/*activeDot={<View style={styles.activeDot}></View>}*/}
                {/*>*/}
                {/*{this.props.flag ? this.renderOneImg() : this.renderImg()}*/}
                {/*</Swiper>*/}
                <Swiper style={styles.wrapper}
                        loop={false}
                        paginationStyle={Platform.OS=='ios'?{}:{bottom: 110}}
                        dot={<View style={styles.dot}></View>}
                        index={this.props.i}
                        activeDot={<View style={styles.activeDot}></View>}
                >
                    {/*{this.renderImg()}*/}
                    {this.props.flag ? this.renderOneImg() : this.renderImg()}
                </Swiper>
            </View>
        )
    }

    renderOneImg() {
        return (
            <Image
                style={{flex: 1,}}
                resizeMode={Image.resizeMode.contain}
                source={{uri: this.props.image}}
            >
                <TouchableOpacity onPress={Actions.pop} style={{flex: 1}}>
                </TouchableOpacity>
            </Image>
        )
    }

    renderImg() {
        var images = this.props.image.split(',');
        var imageViews = [];
        for (var i = 0; i < images.length; i++) {
            imageViews.push(
                <Image
                    key={i}
                    style={{flex: 1,}}
                    resizeMode={Image.resizeMode.contain}
                    source={{uri: urls.getImage(images[i], 900, 1220)}}
                >
                    <TouchableOpacity onPress={Actions.pop} style={{flex: 1}}>
                    </TouchableOpacity>
                </Image>
            );
        }
        return imageViews;
    }
}

var styles = StyleSheet.create({

    container: {
        flexGrow: 1
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: 'gray',
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    },
    activeDot: {
        width: 8,
        height: 8,
        backgroundColor: 'orange',
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    },

})

//
// const styles = {
//     container: {
//         flexGrow: 1
//     },
//     dot :{
//         width: 8,
//         height: 8,
//         backgroundColor: 'gray',
//         borderRadius: 4,
//         marginLeft: 3,
//         marginRight: 3
//     },
//     activeDot:{
//         width: 8,
//         height: 8,
//         backgroundColor: 'orange',
//         borderRadius: 4,
//         marginLeft: 3,
//         marginRight: 3
//     }
// }