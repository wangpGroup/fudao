import React, {Component} from "react";
import {StyleSheet, View, ListView, RefreshControl,Alert,ToastAndroid} from "react-native";
import {observer} from "mobx-react/native";
import Loading from "./Loading";
import NoList from "./NoList";
import LoadFooter from "./LoadFooter";
import ArticleItem from "../../article/components/ArticleItem";
import CollectionListStore from "../../../mobx/collectionListStore";

@observer
export default class CollectionList extends Component {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    }
    componentDidMount() {
        CollectionListStore.fetchCollectionList()
    }
    _onRefresh = () => {
        CollectionListStore.isRefreshing = true
        CollectionListStore.fetchCollectionList()
    }
    _onEndReach() {
        if (CollectionListStore.isLastPage) {
            return null
        }
        CollectionListStore.page++
    }
    _renderRow(rowData) {
        return (
            <ArticleItem article={rowData.article}  onLongPress={() =>this.longPress(rowData)} />
        )
    }
    longPress(rowData) {
        Alert.alert('操作提示', '您确定要取消该收藏吗', [
            {text: '取消'},
            {text: '删除', onPress: () => this.removeMyCollection(rowData)},
        ])
    }
    removeMyCollection(rowData) {
        request.getJson(urls.apis.COLLECTION_DELETEMYCOLLECTION, {
            id: rowData.id
        }).then((result) => {
            if(result.ok){
                ToastAndroid.show('删除成功',ToastAndroid.SHORT);
                CollectionListStore.fetchCollectionList()
            }


        });
    }
    _renderFooter() {
        return (
			<LoadFooter isEnd={CollectionListStore.isLastPage}/>
        )
    }
    render() {
        const {isRefreshing, isFetching, collectionList,isNoResult} = CollectionListStore
        return (
			<View style={styles.listView}>
                {!isFetching &&
				<ListView
					dataSource={this.state.dataSource.cloneWithRows(collectionList.slice(0))}
					renderRow={this._renderRow.bind(this)}
					renderFooter={this._renderFooter}
					enableEmptySections
					initialListSize={3}
					onScroll={this._onScroll}
					onEndReached={this._onEndReach}
					onEndReachedThreshold={30}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={this._onRefresh}
							colors={['rgb(217, 51, 58)']}
						/>
                    }
				/>
                }
				<NoList isShow={isNoResult}/>
			</View>
        )
    }

}
const styles = StyleSheet.create({
    listView: {
        flex: 1,
    }
})