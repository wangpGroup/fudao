import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {View,Text,Button} from "native-base";
import {Container, Content, Header} from "../../components";

export default class About extends PureComponent {
    render() {
        return (
            <Container>
                <Header {...this.props}/>
                <Content white padder>
                    <Text style={styles.desc}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        福道健康环是以个人为中心的健康习惯培养APP。帮助您及时了解您的健康状态，发现和解决您的健康问题，全程记录和预估您的变化过程，配以完善的线下服务体系，为您打造基于您个人的全方位健康生态。
                    </Text>
                    <Text style={styles.bold}>关注我们</Text>
                    <Text>官方网站：www.infcn.com.cn</Text>
                    <Text>微信公众号：infcn430374</Text>
                    <Text style={styles.bold}>联系我们</Text>
                    <Text>商务合作：fudao@infcn.com.cn</Text>
                    <View style={styles.statement}>
                        <Button onPress={() => Actions.privacyStatement()}><Text>隐私声明</Text></Button>
                        <Button onPress={() => Actions.userAgreement()}><Text>用户协议</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    desc: {
        lineHeight: 24
    },
    bold: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    statement: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
};