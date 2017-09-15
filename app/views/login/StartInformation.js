import React, {Component} from "react";
import {View, Image, TouchableOpacity, TouchableHighlight, DatePickerAndroid, Alert, Platform} from "react-native";
import {Thumbnail, Text, Icon} from "native-base";
import {Header, Container, Content} from "../../components";
import {Actions, ActionConst} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import UserButton from "./components/UserButton";
import UserStore from "../../mobx/userStore";
import DatePicker from 'react-native-datepicker';

var Geolocation = require('Geolocation');

@observer
export default class StartInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            sex: null,
            phone: this.props.phone,
        }
    }

    componentWillMount() {
        Geolocation.getCurrentPosition(
            location => {
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                var coord = location.coords.longitude + "," + location.coords.latitude;
                request.getJson('http://api.map.baidu.com/geoconv/v1/', {
                    coords: coord,
                    from: 1,
                    to: 5,
                    ak: 'trLEKMVBCc6MKGemHlUXdyy2'
                }).then((data) => {
                    var coo = data.result[0].y + "," + data.result[0].x;
                    request.getJson('http://api.map.baidu.com/geocoder/v2/', {
                        location: coo,
                        output: 'json',
                        pois: 1,
                        radius: 20,
                        ak: 'trLEKMVBCc6MKGemHlUXdyy2'
                    }).then((data) => {
                        UserStore.location = data.result;
                        UserStore.position.name = UserStore.location.addressComponent.city;
                        UserStore.position.regionId = UserStore.location.addressComponent.adcode;
                    });
                })

            },
            error => {
                tools.showToast("获取位置失败")
                UserStore.position.name = "手动选择位置"
            }
        );
    }

    changeSex(sex) {
        this.setState({
            sex: sex
        })
    }
    alert() {
        Alert.alert(
            '悄悄告诉你:',
            "基本信息保存后不可修改哦，确认提交吗？",
            [
                {text: '取消', onPress: () => null},
                {text: '提交', onPress: () => this.commit()},
            ]
        )
    }
    commit() {
        let {sex, date, phone} = this.state;
        if (sex === null) {
            tools.showToast("请点击选择您的性别")
            return;
        }
        if (UserStore.position.regionId == '') {
            tools.showToast("请点击选择您的位置")
            return;
        }

        request.getJson(urls.apis.USER_SETUSERBASEINFO, {
            phone: phone,
            sex: sex,
            birthday: date,
            regionId: UserStore.position.regionId
        })
            .then((data) => {
                if (data.ok) {
                    UserStore.login(phone, password, () => {
                        UserStore.fetchLoginUser();
                    });
                }
            })

    }
    render() {
        let position = UserStore.position.name;
        return (
            <Container style={styles.container}>
                <Header {...this.props}/>
                <Content padder white>
                    <View style={styles.photo}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.changeSex.bind(this, 1)}
                        >
                            {this.state.sex === 1 ? <Thumbnail large source={require('./assets/m.png')}/> :
                                <Thumbnail large source={require('./assets/m-h.png')}/>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.changeSex.bind(this, 0)}
                        >
                            {this.state.sex === 0 ? <Thumbnail large source={require('./assets/w.png')}/> :
                                <Thumbnail large source={require('./assets/w-h.png')}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 40}}>
                        <Text style={styles.dateText}>请选择您的生日</Text>
                        <View style={styles.dateBox}>
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.date}
                                showIcon={false}
                                mode="date"
                                placeholder={this.state.date}
                                format="YYYY-MM-DD"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{dateInput:styles.datePicker,dateText:styles.pickerText,placeholderText:{color:"#999999"}}}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.position}
                        onPress={() => Actions.cityPick()}>
                        <Icon name='navigate'/>
                        <Text style={styles.positionText}>{position}</Text>
                    </TouchableOpacity>
                    <UserButton text="提交" onPress={this.alert.bind(this)}/>
                </Content>
            </Container>
        )
    };
}
const styles = {
    photo: {
        marginTop: 40,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    datePicker: {
        justifyContent: 'center',
        borderWidth: 0,
    },
    pickerText: {
        fontSize:theme.DefaultFontSize+2,
    },
    dateText: {
        textAlign: 'center',
        fontSize: theme.DefaultFontSize + 2,
    },
    dateBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A1CC00',
        padding: 10,
        marginTop: 30,
    },
    position: {
        marginTop: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionText: {
        marginLeft: 10,
        fontSize: theme.DefaultFontSize - 3,
    },

};



