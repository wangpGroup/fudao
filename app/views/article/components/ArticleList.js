import React, {Component} from "react";
import {ScrollView, ListView, View, Text} from "react-native";
import GiftedListView from "../../../components/GiftedListView";
import ArticleItem from "./ArticleItem";

export default class ArticleList extends Component {

    _onFetch(page = 1, callback, options) {
        let {label} = this.props;
        request.getJson(urls.apis.ARTICLE_GETARTICLELIST, {columnId: label, page})
            .then((result) => {
                if (page === result.obj.pageCount) {
                    callback(result.obj.list, {
                        allLoaded: true
                    });
                } else {
                    callback(result.obj.list);
                }
            });
    }

    _renderRowView(rowData) {
        return (
            <ArticleItem article={rowData}/>
        )
    }

    render() {
        return (
            <GiftedListView
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
                firstLoader={true}
                pagination={true}
                refreshable={true}
                withSections={false}
                enableEmptySections={true}
                locked={true}
            />
        )
    }


}