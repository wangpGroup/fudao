import React, {PureComponent} from 'react';
import {View,Text} from "react-native";
import {Container, Content, Header,TitleHeader} from "../../components";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SubTabBar from './components/SubTabBar';
import Echarts from 'native-echarts';
import CircleProgress from './components/CircleProgress'

export default class Consult extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            subTabNames: ['周一', '二', '三', '四', '五', '六', '日'],
            apple: [5, 8, 7, 10, 4, 0, 5],
            progress: 200,
        }
    }

    render() {
        const option = {
            // tooltip: {
            //     trigger: 'axis'
            // },
            xAxis: {
                boundaryGap: false,
                type: 'category',
                data: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                name: '组数'
            },
            color: ['#7B1F82'],
            series: {
                type: 'line',
                smooth: true,
                data: this.state.apple
            }
        };
        let date = new Date;
        let nowDate = date.getDay() === 0 ? 6 : date.getDay() - 1;
        let weekData = [1, 2, 3, 4, 5, 6, 7]

        return (
            <Container>
                <Header {...this.props}/>
                <Content white>
                    <View style={{alignItems: 'center',marginTop: 20,marginBottom: 20}}>
                        <CircleProgress
                            totalNum={100}
                            progress={70}
                        >
                            <View style={{alignItems: 'center',justifyContent: 'center'}}>
                                <Text>已完成</Text>
                                <Text style={{fontSize: 40}}>7</Text>
                                <Text>今日目标10组</Text>
                            </View>
                        </CircleProgress>
                    </View>
                    <ScrollableTabView
                        renderTabBar={() => <SubTabBar subTabNames={this.state.subTabNames}/>}
                        tabBarPosition='top'
                        style={{height: 300,backgroundColor: theme.toolbarDefaultBg}}
                    >
                        {weekData.map((item, i) =>
                            <Echarts key={i} option={option} height={250} width={theme.deviceWidth} style={{backgroundColor: theme.toolbarDefaultBg}} />
                        )}
                    </ScrollableTabView>
                </Content>
            </Container>
        )

    }
}


