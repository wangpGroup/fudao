import {AsyncStorage} from "react-native";
import {observable, runInAction, computed, action, reaction} from "mobx";

class FriendStore {
    @observable MyFriendList =[];
    @observable friendNickMap ={};
    @observable errorMsg = '';
    @observable NewFriendList=[];


    @action
    fetchMyFriendList () {
        request.getJson(urls.apis.FRIEND_GETMYFRIENDLIST)
        .then((result) => {
            if (result.ok) {
                this.MyFriendList = result.obj;
                this.MyFriendList .forEach((f) => {
                    this.friendNickMap[f.id] = new Date().getTime()//f.friendNick;
                });
            } else {
                tools.showToast('请求出错！')
            }
        });
    }
    @action
    fetchNewFriendList(){
        request.getJson(urls.apis.FRIEND_GETMYFRIENDAPPLYLIST)
        .then((result) => {
            if (result.ok) {
                this.NewFriendList = result.obj;

            } else {
                tools.showToast('请求出错！')
            }
        });
    }

    @computed
    get isFetching() {
        return this.MyFriendList.length == 0 && this.errorMsg == ''
    }
    @computed
    get isNewFetching() {
        return this.NewFriendList.length == 0 && this.errorMsg == ''
    }
}

const friendStore = new FriendStore()
export default friendStore