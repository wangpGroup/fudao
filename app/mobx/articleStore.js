import {AsyncStorage} from "react-native";
import {observable,computed, action} from "mobx";

class ArticleStore {
	@observable articleColumnList = []
	@observable errorMsg = ''

	@action
	fetchArticleColumnList() {
		request.getJson(urls.apis.ARTICLE_GETARTICLECOLUMNLIST)
			.then((result) => {
				if (result.ok) {
					this.articleColumnList = result.obj
				} else {
					tools.showToast('请求出错！')
				}
			});
	}

	@computed
	get isFetching() {
		return this.articleColumnList.length == 0 && this.errorMsg == ''
	}
}
const articleStore = new ArticleStore();
export default articleStore