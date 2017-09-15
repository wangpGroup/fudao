import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Container, TitleHeader, Content, Loading} from "../../components";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../components/ScrollableTabBar";
import ArticleList from "./components/ArticleList";
import articleStore from "../../mobx/articleStore";

@observer
export default class Article extends Component {

    componentDidMount() {
        articleStore.fetchArticleColumnList()
    }

    render() {
        const {isFetching, articleColumnList} = articleStore;
        return (
            <Container>
                <TitleHeader {...this.props}/>
                <Content white style={{paddingBottom: 50}}>
                    {
                        !isFetching &&
                        <ScrollableTabView
                            renderTabBar={() => (
                                <ScrollableTabBar
                                    activeBackgroundColor='#BEC4DA'
                                    underlineStyle={{height:0}}
                                />)}
                            tabBarPosition='top'
                            scrollWithoutAnimation={false}
                            style={styles.tabView}
                        >
                            {articleColumnList.map((column) => (
                                    <ArticleList
                                        key={column.id}
                                        tabLabel={column.name}
                                        label={column.id}
                                    />
                                )
                            )}
                        </ScrollableTabView>
                    }
                    <Loading isShow={isFetching}/>
                </Content>
            </Container>
        )
    }
}
const styles = {
    tabView: {
        flex: 1,
        flexGrow: 1,
    }
};
