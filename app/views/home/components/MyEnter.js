//noinspection JSAnnotator
import React, {PureComponent} from "react";
import {Text, Button} from "native-base";
import {View, Image, DeviceEventEmitter, TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
import Index from "../../index/Index"

/**
 * 我的情绪
 */
export default  class MyEnter extends PureComponent {
	constructor(props) {
		super(props);
	}


	render() {

		let itemStyle = Object.assign({}, styles.button, styles.mgl);
		return (
			<View>
				<View style={styles.View}>
					<Button style={itemStyle} transparent onPress={()=>{Actions.activity({title:'开会时'})}}>
						<Image source={require('../image/kaihui.png')} style={{width:49,height:50}}/>
					</Button>
					<Button style={itemStyle} transparent onPress={()=>{Actions.activity({title:'在家时'})}}>
						<Image source={require('../image/zaijia.png')} style={{width:49,height:51}}/>
					</Button>
				</View>
				<View style={styles.View}>

					<Button style={itemStyle} transparent onPress={()=>{Actions.activity({title:'通话时'})}}>
						<Image source={require('../image/tonghua.png')} style={{width:49,height:51}}/>
					</Button>
					<Button style={itemStyle} transparent onPress={()=>this.props.onChangMsg(1)}>
						<Image source={require('../image/qita.png')} style={{width:66,height:49}}/>
					</Button>
				</View>
			</View>

		)
	}
}

const styles = {
	zi:{
		color:'#f0c728'
	},
	View: {
		flexDirection: 'row',
		marginTop: 1

	},
	button: {
		flexDirection: 'row',
		height: 70,
		justifyContent: 'center',
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',


	},
	mgl: {
		marginLeft: 1
	},
	mgl10: {
		marginLeft: 6
	},
	text: {
		color: '#fff'
	},
	badge: {
		backgroundColor: '#AED9E5',
		paddingTop: 6,
		paddingBottom: 6,
		paddingLeft: 6,
		paddingRight: 6,
		borderRadius: 48,
	},
	image: {
		width: 60,
		height: 40,
	},
	color2: {
		backgroundColor: '#E5B2A8',
	},
	color3: {
		backgroundColor: '#D5E1AF',
	},
	color4: {
		backgroundColor: '#CABBD3',
	},
};
function bindAction(dispatch) {
	return {};
}
