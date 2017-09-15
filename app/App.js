import React, {PureComponent} from "react";
import {StyleProvider} from "native-base";
import getTheme from "../native-base-theme/components";
import GlobalContants from "./common/globalContants";
import Router from './Router'
import * as Wechat from 'react-native-wechat';

export default class App extends PureComponent {
    componentDidMount() {
        // Wechat.registerApp('wx3ea7884b0c372a3c');
        Wechat.registerApp('wxe23aa58309478cd8');
    }

    render() {
        return (
            <StyleProvider style={getTheme(theme)}>
                <Router/>
            </StyleProvider>
        )
    }
}

