import React, {PureComponent} from "react";
import {Container, Content, WebView} from "../../components";
import {Actions} from "react-native-router-flux";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header,Text} from 'native-base';
//import {CustomButton} from '../demo/demo'
import {View, Image, Dimensions, Platform,TouchableOpacity,ScrollView} from "react-native";
import ShareAlertDialog from "./components/AlertShare";
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import * as WeiboAPI from 'react-native-weibo';
export default class ArticleDetail extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			showSharePop: false,//分享弹窗，默认不显示
		}
	}
	componentWillMount() {
		this.data={};
		request.getJson(urls.apis.ARTICLE_GETSHAREARTICLE, { id:this.props.articleId})
			.then((result) => {
				if(result.ok){
					this.data=result.obj;
					let index=result.obj.img.indexOf(',');
					let im=result.obj.img.slice(0,index);
					if(im){
						if(im.slice(index-3,index)=="gif"){
							this.thumbImage='http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg'
						}else{
							this.thumbImage=urls.apis.IMAGE + '?filePath=' + im
						}
					}else{
						this.thumbImage='http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg'
					}
				}
			});
	}


	wxShare() {
		let data=this.data;
		WeChat.isWXAppInstalled()
			.then((isInstalled) => {
				if (isInstalled) {

					WeChat.shareToSession({
						title:data.title,
						description: '分享自:活动',
						thumbImage:this.thumbImage,
						type: 'news',
						webpageUrl: urls.pages.ARTICLE_GETSHAREARTICLE + '?id=' + this.props.articleId
					})
						.catch((error) => {
							alert(error.message);
						});
				} else {
					tools.showToast('没有安装微信软件，请您安装微信之后再试');
				}
			});
		this.setState({showSharePop: false})



	}
	wxpyqShare(){

		let scope = 'snsapi_userinfo';
		let state = 'wechat_sdk_demo';
		let data=this.data;
		WeChat.isWXAppInstalled()
			.then((isInstalled) => {
				if (isInstalled) {
					WeChat.shareToTimeline({
						title:data.title,
						description: '分享自:活动',
						thumbImage: this.thumbImage,
						type: 'news',
						webpageUrl: urls.pages.ARTICLE_GETSHAREARTICLE + '?id=' + this.props.articleId
					}).then(res => {
						//alert(res)

						//tools.showToast("微信朋友圈")
					})
				} else {
					tools.showToast("没有安装微信软件，请您安装微信之后再试");
				}
			});
		this.setState({showSharePop: false})
	}

	qqShare() {
		let data=this.data;
		QQAPI.shareToQQ({
				type: 'news',
				title:data.title,
				description: '分享自:活动',
				webpageUrl: urls.pages.ARTICLE_GETSHAREARTICLE + '?id=' + this.props.articleId,
				imageUrl:this.thumbImage
			}
		);
		this.setState({showSharePop: false})

	}
	qqkjShare() {
		let data=this.data;
		QQAPI.shareToQzone({
				type: 'news',
				title:data.title,
				description: '分享自:活动',
				webpageUrl: urls.pages.ARTICLE_GETSHAREARTICLE + '?id=' + this.props.articleId,
				imageUrl:this.thumbImage
			}
		);
		this.setState({showSharePop: false})

	}
	wbShare() {
		let data=this.data;
		WeiboAPI.share({
			type: 'image',
			text: '快来看看我分享的内容吧'+urls.pages.ARTICLE_GETSHAREARTICLE + '?id=' + this.props.articleId,
			imageUrl:  this.thumbImage,
		});
		this.setState({showSharePop: false})
	}
	haoyouShare() {
		this.setState({showSharePop: false})

	}
	qzShare() {
		Actions.newDynamic({
            leixing: 3,
            id:this.props.articleId
        })
        this.setState({showSharePop: false})
    }
	onSharePress() {
		this.setState({showSharePop: !this.state.showSharePop})
	}

	render() {
		let {articleId} = this.props;
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => Actions.pop()}>
							<Icon name="ios-arrow-back" style={{color: '#000'}}/>
						</Button>
					</Left>
					<Body>
						<Text style={{color:'#000',fontSize:18,textAlign:"center"}}>资讯详情</Text>
					</Body>
					<Right>
						<TouchableOpacity onPress={() => this.onSharePress()}>
							<Image  resizeMode='contain' style={{width:20,height:20}} source={require('../../assets/share.png')}/>
						</TouchableOpacity>
					</Right>
				</Header>
				<Content white >
					<WebView uri={urls.pages.ARTICLE_GETARTICLE + '?id=' + articleId}/>
				</Content>

				<ShareAlertDialog show={this.state.showSharePop} closeModal={(show) => {
					this.setState({showSharePop: show})
				}}  wxShare = {this.wxShare.bind(this)}  wxpyqShare = {this.wxpyqShare.bind(this)} qqShare = {this.qqShare.bind(this)}
								  qqkjShare = {this.qqkjShare.bind(this)} wbShare = {this.wbShare.bind(this)} haoyouShare={this.haoyouShare.bind(this)} qzShare = {this.qzShare.bind(this)} {...this.props}/>
			</Container>
		)
	}
}
const styles = {
	imgBox:{
		height:80,
		width:'100%',
	},
	view:{
		position:'absolute',
		bottom:0,
		backgroundColor:'#fff',
		width:'100%',
		height:120,
	},
	quxiao:{
		textAlign:"center",
		lineHeight:30,
		fontSize:16,
		color:'#4f4351'
	},
	font:{
		marginTop:4,
		fontSize:12,
		color:'#666'
	},
	line:{
		borderTopWidth:1,
		borderColor:'#9a909d',
		height:40,
		alignItems:'center'
	},
	btn: {
		/*backgroundColor:'pink',*/
		width:100,
		justifyContent:'center',
		alignItems:'center'

	},
	img: {
		width: 40,
		height: 40
	}
};