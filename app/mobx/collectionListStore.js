import {observable, runInAction, computed, action, reaction} from "mobx";

class CollectionListStore {
    @observable collectionList = []
    @observable page = 1
    @observable pageCount = 1
    @observable isRefreshing = false
    @observable errorMsg = ''


    @action
    fetchCollectionList = async () => {
        try {
            if (this.isRefreshing) this.page = 1
            const result = await this._fetchDataFromUrl()
            runInAction(() => {
                this.isRefreshing = false
                this.errorMsg = ''

                this.pageCount = result.pageCount
                if (this.page == 1) {
                    this.collectionList.replace(result.list)
                } else {
                    this.collectionList.splice(this.collectionList.length, 0, ...result.list);
                }
            })
        } catch (error) {
            this.errorMsg = error
        }
    }

    @computed
    get isFetching() {
        return this.collectionList.length == 0 && this.errorMsg == ''
    }

    @computed
    get isNoResult() {
        return this.collectionList.length !== 0
    }

    @computed
    get isLoadMore() {
        return this.page != 1
    }

    @computed
    get isLastPage() {
        return this.page == this.pageCount
    }

    _fetchDataFromUrl() {
        return new Promise((resolve, reject) => {
            request.getJson(urls.apis.COLLECTION_GETMYCOLLECTIONLIST, {
                page: this.page
            })
                .then((result) => {
                    if (result.ok) {
                        resolve(result.obj)
                    }
                })
        })
    }
}
const collectionListStore = new CollectionListStore()

reaction(
    () => collectionListStore.page,
    () => collectionListStore.fetchCollectionList()
)

export default collectionListStore