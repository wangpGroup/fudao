import {AsyncStorage} from "react-native";
import {observable, computed, action} from "mobx";

class ActivityClassifyStore {
    @observable subscribeList = [];
    @observable partActivityList = [];
    @observable groupActivityList = [];
    @observable partOrderList = [];
    @observable groupOrderList = [];
    @observable grouplistId = '';
    @observable partlistId = '';
    @observable activityGroup = {};
    @observable activityDetails = {};

    @observable themeActivityList = [];
    @observable themelistId = '';
    @observable page = '';
    @observable videoPath = '';
    @observable subscribeId = '';
    @observable themeGroup = '';




    @observable partActivityRepositoryList = [];
    @observable groupActivityRepositoryList = [];



    @action
    fetchActivityClassifyList(typeId){
        if(typeId==1){
            request.getJson(urls.apis.GETRECOMMENDACTIVITYLIST,{type:typeId})
            .then((result) => {
                if (result.ok) {
                    this.groupActivityList=result.obj.activityList;
                    this.grouplistId=result.obj.activityList[0].id;
                    request.getJson(urls.apis.GETONEACTTIVITYGROUP,{groupId:this.grouplistId})
                    .then((result) => {
                        if (result.ok) {
                            this.activityGroup=result.obj.activityGroup;
                            this.videoPath=result.obj.activityGroup.activitys[0].video_path;

                        } else {
                            tools.showToast("请求出错！")
                        }
                    });
                } else {
                    tools.showToast("请求出错！")
                }
            });

        }else{
            request.getJson(urls.apis.GETRECOMMENDACTIVITYLIST,{type:typeId})
            .then((result) => {
                if (result.ok) {
                    this.partActivityList=result.obj.activityList;
                    this.partlistId=result.obj.activityList[0].id;
                    request.getJson(urls.apis.GETONEACTTIVITY,{actId:this.partlistId})
                    .then((result) => {
                        if (result.ok) {
                            this.activityDetails=result.obj.activity;

                        } else {
                            tools.showToast("请求出错！")
                        }
                    });
                } else {
                    tools.showToast("请求出错！")
                }
            });

        }
    }

    @action
    fetchSubscribeActivityList(typeId,page,callback){
        this.page=page
        if(typeId==1){

            request.getJson(urls.apis.GETSUBSCRIBEACTIVITYLIST,{type:typeId,page:1})
            .then((result) => {
                if (result.ok) {

                    if(page==result.obj.pageCount){
                        callback(result.obj.subscribeList, {
                            allLoaded: true
                        });
                    }else{
                        callback(result.obj.subscribeList);
                    }


                } else {
                    tools.showToast("请求出错！")
                }
            });
        }else{

            request.getJson(urls.apis.GETSUBSCRIBEACTIVITYLIST,{type:typeId,page:1})
            .then((result) => {
                if (result.ok) {
                    if(page==result.obj.pageCount){
                        callback(result.obj.subscribeList, {
                            allLoaded: true
                        });
                    }else{
                        callback(result.obj.subscribeList);
                    }

                } else {
                    tools.showToast("请求出错！")
                }
            });
        }

    }

    @action
    fetchRefreshSubscribeActivityList(typeId,page,callback){
        if(typeId==1){

            request.getJson(urls.apis.GETSUBSCRIBEACTIVITYLIST,{type:typeId,page,pageSize:6*this.page})
            .then((result) => {
                if (result.ok) {

                    if(page==result.obj.pageCount){
                        callback(result.obj.subscribeList, {
                            allLoaded: true
                        });
                    }else{
                        callback(result.obj.subscribeList);
                    }


                } else {
                    tools.showToast("请求出错！")
                }
            });
        }else{

            request.getJson(urls.apis.GETSUBSCRIBEACTIVITYLIST,{type:typeId,page,pageSize:6*this.page})
            .then((result) => {
                if (result.ok) {
                    if(page==result.obj.pageCount){
                        callback(result.obj.subscribeList, {
                            allLoaded: true
                        });
                    }else{
                        callback(result.obj.subscribeList);
                    }

                } else {
                    tools.showToast("请求出错！")
                }
            });
        }

    }


    @action
    addMySubscribe(typeId,sourceId,callback){

        if(typeId==1){
            request.getJson(urls.apis.ADDMYSUBSCRIBE,{type:typeId,sourceId:sourceId})
            .then((result) => {
                if (result.ok) {
                    tools.showToast("订制成功！")
                    this.subscribeId=result.obj.id;
                    callback(result.obj.id);


                } else {
                    tools.showToast(result.message);
                }
            });
        }else{
            request.getJson(urls.apis.ADDMYSUBSCRIBE,{type:typeId,sourceId:sourceId})
            .then((result) => {
                if (result.ok) {
                    tools.showToast("订制成功！");
                    this.subscribeId=result.obj.id;
                    callback(result.obj.id);


                } else {
                    tools.showToast(result.message)
                }
            });
        }
    }

    @action
    deleteMySubscribe(id){

        request.getJson(urls.apis.DELETEMYSUBSCRIBE,{id:id})
        .then((result) => {
            if (result.ok) {
                tools.showToast("取消成功！")

            } else {
                tools.showToast("请求出错！")
            }
        });
    }

    @action
    getOneActtivity(id){

        request.getJson(urls.apis.GETONEACTTIVITY,{actId:id})
        .then((result) => {
            if (result.ok) {
                // alert(JSON.stringify(result.obj.activity))
                this.activityDetails=result.obj.activity;

            } else {
                tools.showToast("请求出错！")
            }
        });
    }
    @action
    getOneActtivityGroup(id){


        request.getJson(urls.apis.GETONEACTTIVITYGROUP,{groupId:id})
        .then((result) => {
            if (result.ok) {
                this.activityGroup=result.obj.activityGroup;

            } else {
                tools.showToast("请求出错！")
            }
        });
    }
    @action
    getThemeActivityList(id){
        request.getJson(urls.apis.GETTHEMEACTIVITYLIST,{themeId:id})
        .then((result) => {
            if (result.ok) {
                this.themeActivityList = result.obj.activityList;
                this.themelistId = result.obj.activityList[0].id;
                this.activityGroup=result.obj.activityList[0];
            } else {
                tools.showToast("请求出错！")
            }
        });
    }

    @action
    getSearchActivityGroup(text,page,callback){

        request.getJson(urls.apis.GETSEARCHACTIVITYGROUP,{groupName:text,page,pageSize:8})
        .then((result) => {

            if (result.ok) {

                if(page==result.obj.pageCount){
                    callback(result.obj.activityGroupList, {
                        allLoaded: true
                    });
                }else{
                    callback(result.obj.activityGroupList);
                }
            } else {
                tools.showToast("请求出错！")
            }
        });
    }

    @action
    getSearchActivityList(text,position,page,callback){

        request.getJson(urls.apis.GETSEARCHACTIVITYLIST,{name:text,position,page,pageSize:8})
        .then((result) => {

            if (result.ok) {

                if(page==result.obj.pageCount){
                    callback(result.obj.activityList, {
                        allLoaded: true
                    });
                }else{
                    callback(result.obj.activityList);
                }
            } else {
                tools.showToast("请求出错！")
            }
        });
    }







}
const activityClassifyStore = new ActivityClassifyStore();
export default activityClassifyStore