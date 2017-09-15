import React, {PureComponent} from "react";
import {View,ScrollView,TouchableOpacity} from "react-native";
import {Container, Content, Header,TitleHeader} from "../../components";
import MyPhoto from "./components/MyPhoto";
import MyList from "./components/MyList";

export default class My extends PureComponent {

    render() {
        return (
            <Container>
                <TitleHeader {...this.props}/>
                <Content white>
                    <ScrollView>
                        <MyPhoto/>
                        <MyList />
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}
