/**
 * Created by ljunb on 2017/2/22.
 */
import {action, computed, observable, reaction, runInAction} from "mobx";
import Realm from "realm";
import {Actions} from "react-native-router-flux";
import schema from "../realm/schema.js";
import userStore from "./userStore";
import {DeviceEventEmitter} from "react-native";

var callB = () => {
}

class DynamicStore {
    @observable dynamicList = [];
    @observable imgList = [];
    @observable imgUpload = [];
    @observable changeImg = true;
    @observable info = {};
    @observable page = 1;
    @observable refresh = false;
    @observable allLoaded = false;
    @observable newnew = false;
    @observable errorMsg = '';
    @observable nowShow = '';
    @observable dynamicHeadPic = '';
    @observable right = '发表';
    @observable videoPath = '';
    @observable realm = new Realm({
        ...schema,
        path: userStore.loginUser.username + '.realm'
    });

    @action
    fetchDynamicList(options, callback, user_id) {
        this.nowShow = "";
        if (options.firstLoad) {
            callB = callback;
            this.page = 1;
            this.fetchData((res, all) => {
                DeviceEventEmitter.emit('noticeName');
                this.dynamicList = all.slice(0, 5);

                this.page = 2;
                this.allLoadedFun(res.obj.pageCount);
                callback(this.dynamicList, {
                    allLoaded: this.allLoaded
                })
            }, callback, user_id)
        } else if (options.refresh) {
            this.refresh = true;
            this.fetchData((res, all) => {

                if (this.dynamicList.length > 0) {
                    for (var i in res.obj.list) {
                        if (res.obj.list[i].id == this.dynamicList[0].id) {
                            break;
                        }
                    }
                }
                if (i != 0) {
                    let newList = all.slice(0, i);
                    let arr = Array.prototype.slice.call(this.dynamicList, 0)
                    this.dynamicList = newList.concat(arr);
                }
                this.allLoadedFun(res.obj.pageCount);
                callback(this.dynamicList, {
                    allLoaded: this.allLoaded
                });
                this.page--;
                this.refresh = false;
            }, callback, user_id);
        } else if (options.loadMore) {
            // alert(JSON.stringify(this.dynamicList))

            this.page = Math.floor(this.dynamicList.length / 5) + 1;
            let surplus = this.dynamicList.length % 5;
            this.fetchData((res, all) => {
                if (user_id) {
                    this.dynamicList = this.dynamicList.concat(all);
                } else {
                    this.dynamicList = all.slice(0, this.dynamicList.length + res.obj.list.length - surplus);
                }
                this.allLoadedFun(res.obj.pageCount);
                callback(this.dynamicList, {
                    allLoaded: this.allLoaded
                })
            }, callback, user_id)
        }
    }


    @action
    fetchData(cb, callback, user_id) {


        if (user_id) {
            var obj_ajax = {
                page: this.refresh ? 1 : this.page,
                pageSize: 5,
                userId: user_id
            }
        } else {
            var obj_ajax = {
                page: this.refresh ? 1 : this.page,
                pageSize: 5
            }
        }

        request.getJson(urls.apis.DYNAMIC_GETMYDYNAMICSLIST, obj_ajax).then((res) => {
            if (res.obj.list.length > 0) {

                this.page++;
                this.insert(res.obj.list);
                let allList = this.getAll();

                if (user_id) {
                    cb(res, res.obj.list);

                } else {
                    cb(res, allList);
                }
            } else {
                callback([], {
                    allLoaded: true
                })
            }
        })
        // .then(() => {
        //     let allList = this.getAll();
        //     let listRender = allList.slice((this.page - 1) * 5, this.page * 5)
        //     callback(listRender, {
        //         allLoaded: listRender.length < 5 ? true : false,
        //     })
        // })

    }

    @action
    insert(datas) {
        this.realm.write(() => {
            for (let i = 0; i < datas.length; i++) {
                var flag = false;
                for (let j = 0; j < datas[i].praises.length; j++) {
                    if (datas[i].praises[j].id == userStore.loginUser.id) {
                        flag = true
                    }
                }
                this.realm.create('Dynamic', {
                    flag: flag,
                    ...datas[i]
                }, true)
            }
        })
    }

    @action
    getAll() {
        return Array.prototype.slice.call(this.realm.objects('Dynamic').sorted('createTime'), 0).reverse();

    }


    @action
    allLoadedFun(pageCount) {
        this.allLoaded = pageCount < this.page ? true : false
    }


    @action
    show(id, callback) {
        var add = 2;
        var timer = 0;

        if (this.nowShow == id) {
            this.realm.write(() => {
                this.realm.create('Dynamic', {id: id, show: false,}, true)
            });
            add = 1;
        } else {
            this.realm.write(() => {
                this.realm.create('Dynamic', {id: id, show: true,}, true);
                if (this.nowShow != '') {
                    this.realm.create('Dynamic', {id: this.nowShow, show: false,}, true)
                }
            })
        }
        let realm_dynamic = this.realm.objects('Dynamic').sorted('createTime');
        for (var i = 0; i < this.dynamicList.length; i++) {
            if (this.dynamicList[i].id == this.nowShow) {
                this.dynamicList[i] = realm_dynamic.filtered('id="' + this.nowShow + '"')[0];
                if (add == 1) {
                    break;
                }
                timer++;
            }
            if (this.dynamicList[i].id == id) {
                this.dynamicList[i] = realm_dynamic.filtered('id="' + id + '"')[0];
                timer++;
            }
            if (timer == add) {
                break;
            }
        }
        if (this.nowShow == id) {
            this.nowShow = 0;
        } else {
            this.nowShow = id;
        }
        callback(this.dynamicList, {
            allLoaded: this.allLoaded
        });
    }

    @action
    zan(info, callback, from) {
        let realm_dynamic = this.realm.objects('Dynamic').sorted('createTime');
        let data = realm_dynamic.filtered('id="' + info.id + '"')[0];
        let arraySuports = Array.prototype.slice.call(data.praises, 0);
        if (info.flag) {
            for (var j = 0; j < arraySuports.length; j++) {
                if (arraySuports[j].id == userStore.loginUser.id) {
                    arraySuports.splice(j, 1);
                    break;
                }
            }
            request.getJson(urls.apis.DYNAMIC_DELETEDYNAMICPRAISE, {
                dynamicId: info.id,
            })

        } else {
            arraySuports[arraySuports.length] = {
                id: userStore.loginUser.id,
                nickname: userStore.loginUser.nickname,
            };

            request.getJson(urls.apis.DYNAMIC_ADDDYNAMICPRAISE, {
                dynamicId: info.id,
            })
        }
        this.realm.write(() => {
            this.realm.create('Dynamic', {
                id: info.id,
                praises: arraySuports,
                flag: !info.flag,
                show: false,
            }, true)
        });
        for (var i = 0; i < this.dynamicList.length; i++) {
            if (this.dynamicList[i].id == info.id) {
                this.dynamicList[i] = data;
                break;
            }
        }


        this.nowShow = "";
        if (from == 'list') {
            callback(this.dynamicList, {
                allLoaded: this.allLoaded
            });
        } else {
            this.info = data;
        }

    }

    @action
    addComment(event, id, callback, from, user_comment) {
        if (event.nativeEvent.text) {
            let realm_dynamic = this.realm.objects('Dynamic').sorted('createTime');
            let Comments = realm_dynamic.filtered('id="' + id + '"')[0].comments;
            let arrayComments = Array.prototype.slice.call(Comments, 0);
            arrayComments[arrayComments.length] = {
                user: userStore.loginUser,
                content: event.nativeEvent.text,
                atuser: user_comment
            };
            this.realm.write(() => {
                this.realm.create('Dynamic', {
                    id: id,
                    comments: arrayComments,
                    show: false,
                }, true)
            })
            for (var i = 0; i < this.dynamicList.length; i++) {
                if (this.dynamicList[i].id == id) {
                    this.dynamicList[i] = realm_dynamic.filtered('id="' + id + '"')[0];
                    break;
                }
            }
            this.nowShow = "";
            if (from == 'list') {
                callback(this.dynamicList, {
                    allLoaded: this.allLoaded
                });
            } else {
                this.info = realm_dynamic.filtered('id="' + id + '"')[0];
            }
            request.getJson(urls.apis.DYNAMIC_ADDDYNAMICCOMMENT, {
                dynamicId: id,
                content: event.nativeEvent.text,
                atUserId: user_comment ? user_comment.id : ''
            })
        }
    }

    @action
    del(id, callback, from) {
        for (var i = 0; i < this.dynamicList.length; i++) {
            if (this.dynamicList[i].id == id) {
                break;
            }
        }
        this.dynamicList.splice(i, 1);
        if (from == 'list') {
            callback(this.dynamicList)
        } else {
            callback(this.dynamicList)
            Actions.pop()
        }
        this.realm.write(() => {
            var delDynamic = this.realm.objects('Dynamic').filtered('id="' + id + '"');
            this.realm.delete(delDynamic)
        });
        request.getJson(urls.apis.DYNAMIC_DELETEDYNAMIC, {
            dynamicId: id
        })
    }

    @action
    addNewDynamic(text,type,id) {
        if(!type){
            var type = 1;
            var pic = '';
            if (this.imgList.length > 0||this.videoPath) {
                pic = this.imgUpload.join(',');
                type = 2;
            }
        }else{
            var pic = id;
        }
        this.newnew = !this.newnew;

        request.getJson(urls.apis.DYNAMIC_ADDDYNAMIC, {
            content: text,
            path: pic,
            type: type
        }).then((res) => {
            if(!type){
                Actions.pop({refresh: {newnew: this.newnew}})
            }else{
                Actions.pop({refresh: {newnew: this.newnew}})

            }
        })

    }

    @action
    uploadImg(image, array) {
        if (!array) {
            let source = {uri: image.path, width: image.width, height: image.height};
            this.imgList.push(source);
            this.changeImg = !this.changeImg;
            this.right = '上传中';
            let formData = new FormData();
            let file = {uri: image.path, type: 'multipart/form-data', name: 'a.jpg'};
            formData.append("filename", file);
            request.postJson(urls.apis.IMAGE_UPLOAD, formData)
                .then(result => {
                    tools.showToast(JSON.stringify(result))
                    if (result.ok) {
                        this.right = '发表';
                        this.imgUpload.push(result.obj);
                    } else {
                        this.right = '发表';
                        let len = this.imgUpload.length - 1;
                        this.imgList.splice(len, 1);
                        this.changeImg = !this.changeImg;
                        tools.showToast("上传失败")
                    }
                })
        } else {
            let image_len = image.length;
            let formData = new FormData();
            for(let i=0;i<image_len;i++){
                this.imgList.push({uri: image[i].path, width: image[i].width, height: image[i].height});
                let file = {uri: image[i].path, type: 'multipart/form-data', name: 'a.jpg'};
                formData.append("filename", file);
            }
            // tools.showToast(JSON.stringify(imgList_end))
            //
            //
            // this.imgList.concat(imgList_end)
            this.changeImg = !this.changeImg;
            this.right = '上传中';
            request.postJson(urls.apis.IMAGE_UPLOAD, formData)
                .then(result => {
                    if (result.ok) {
                        this.right = '发表';
                        this.imgUpload.push(result.obj);
                    } else {
                        this.right = '发表';
                        let len = this.imgUpload.length - image_len;
                        this.imgList.splice(len, image_len);
                        this.changeImg = !this.changeImg;
                        tools.showToast("上传失败")
                    }
                })
        }
    }

    @action
    delImg(i) {
        this.imgList.splice(i, 1);
        this.imgUpload.splice(i, 1);
        this.changeImg = !this.changeImg;
    }

    @action
    dynamicDetail(info) {
        this.info = info;
    }


    @action
    updateDynamicPhoto(uri, fileName) {
        let formData = new FormData();
        formData.append("filename", {
            uri: uri,
            type: 'multipart/form-data',
            name: fileName
        });
        request.postJson(urls.apis.IMAGE_UPLOAD, formData)
            .then(result => {
                if (result.ok) {
                    // 修改图片路径
                    this.updateDynamicInfo('dynamicPic', result.obj)
                } else {
                    tools.showToast("上传失败")
                }
            })
    }


    @action
    updateDynamicInfo(fieldName, value) {
        let {loginUser} = userStore;
        request.getJson(urls.apis.USER_UPDATEUSERINFO, {
            fieldName,
            value
        }).then(result => {
            if (result.ok) {
                this.fetchPhoto(loginUser.id, loginUser.phone)
            } else {
                tools.showToast("修改失败");
            }
        })
    }

    @action
    fetchPhoto(id, phone, from, obj) {
        request.getJson(urls.apis.USER_GETUSER, {
            id,
            phone
        }).then(result => {
            if (result.ok) {
                if (from == 'user') {
                    let obj_new = {};
                    obj_new = obj;
                    if (result.obj.dynamicPic) {
                        obj_new.picPath = result.obj.dynamicPic;
                    } else {
                        obj_new.picPath = 'none';
                    }
                    Actions.dynamic(obj)
                } else {
                    this.dynamicHeadPic = result.obj.dynamicPic;
                }
                // ...
            } else {
                tools.showToast("修改失败");
            }
        })
    }

    @action
    refreshNewVideo(videoPath) {
        this.videoPath=videoPath;
        // tools.showToast(this.videoPath);
        this.right = '上传中';
        let formData = new FormData();
        formData.append("filename", {
            uri: videoPath,
            type: 'multipart/form-data',
            name: 'a.mp4'
        });
        request.postJson(urls.apis.IMAGE_UPLOAD, formData)
            .then(result => {
                if (result.ok) {
                    this.right = '发表';
                    this.imgUpload.push(result.obj);
                    tools.showToast(JSON.stringify(this.imgUpload))
                } else {
                    tools.showToast("上传失败")
                }
            })
        this.changeImg = !this.changeImg;
    }



    @action
    clearImgList() {
        this.imgList = [];
        this.imgUpload = [];
        this.videoPath='';
    }

    @action
    setAllLoaded() {
        this.allLoaded = false;
    }

    @action
    setPage(page) {
        this.page = page;
    }

    @computed
    get isFetching() {
        return this.dynamicList.length == 0 && this.errorMsg == ''
    }
}
const dynamicStore = new DynamicStore();
export default dynamicStore
