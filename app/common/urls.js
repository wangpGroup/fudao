// 接口服务器地址
// const apiPath = 'http://103.254.113.11:9191/api/'; // 开发服务器（外网）
// const apiPath = 'http://192.168.10.69:9191/api/'; // 开发服务器（内网）
const apiPath = 'http://103.254.113.10:9090/api/'; // 生产服务器（外网）
// const apiPath = 'http://192.168.10.165:9090/api/'; // 生产服务器（内网）
// const apiPath = 'http://fudao.infcn.com.cn/api/'; // 生产服务器（外网）
// const apiPath = 'http://192.168.10.165:9191/api/'; // 生产服务器（内网）

// web服务器地址
// const webPath = 'http://103.254.113.11:9191/web/'; // 开发服务器（外网）
// const webPath = 'http://192.168.10.69:9191/web/'; // 开发服务器（内网）
const webPath = 'http://103.254.113.10:9090/web/'; // 生产服务器（外网）
// const webPath = 'http://192.168.10.165:9090/web/'; // 生产服务器（内网）
// const webPath = 'http://fudao.infcn.com.cn/web/'; // 生产服务器（外网）
// const webPath = 'http://192.168.10.165:9191/web/'; // 生产服务器（内网）
//
// 其他
// const webPath = 'http://192.168.3.137:3000/'; // 杨可可
//  const webPath = 'http://192.168.3.204:3000/'; // 王朋
// const webPath = 'http://192.168.3.173:3000/'; // zy
// const webPath = 'http://192.168.3.213:3000/'; // cxx
// const webPath = 'http://192.168.3.184:3000/'; // cxx
// const webPath = 'http://192.168.3.203:3000/'; //



const urls = {
    apiPath,
    webPath,

    /**
     *  页面
     */
    pages: {
        //轮播图
        SWIPER: webPath + 'swiper.html',
        // 隐式声明
        DECLARE: webPath + 'declare.html',
        // 用户协议
        PROTOCOL: webPath + 'protocol.html',
        // 资讯详细
        ARTICLE_GETARTICLE: webPath + 'articleDetail.html',
        // 我的时间
        MY_TIME: webPath + 'myTime.html',
        //修改时间
        MODIFICATION_TIME: webPath + 'modificationTime.html',
        // 健康测评
        HEALTH_APPRAISAL: webPath + 'healthAppraisal.html',
        // 深度自诊
        DEEP_DIAGNOSIS: webPath + 'deepDiagnosis.html',
        // 测试题
        ASSESSMENT_TEST: webPath + 'assessmentTest.html',
        // 健康圈
        HEALTH_CIRCLE: webPath + 'healthCircle.html',
        // 生命周期
        LIFE_CYCLE: webPath + 'lifeCycle.html',
        // ??????
        MY_QUESTION_PERSON: webPath + 'myQuestionPerson.html',
        // 我的位置
        MY_LOCATION: webPath + 'myLocation.html',
        // 获取位置
        GRT_ADDRESS: webPath + 'getAddress.html',
        //首页
        HOME: webPath + 'home.html',
        //我的能量场
        MY_ENERGY: webPath + 'myEnergy.html',
        //自诊
        SELFDIAGNOSIS: webPath + 'selfDiagnosis.html',
        //商城
        SHOP: webPath + 'shop.html',
        // 检测新版本
        LATEST_VERSION: webPath + 'apk/version.json',
    },
    /**
     *  接口
     */
    apis: {
        // 图片接口(ok)
        IMAGE: apiPath + 'ImgApi/getImage',
        IMAGE_UPLOAD: apiPath + 'ImgApi/upload',


        //天气-------------------------------------------------------------------------
		WEATHER_GETWEATHER: apiPath + 'WeatherApi/getWeather',
		WEATHER_GETPM25: apiPath + 'WeatherApi/getPM25',

        // 资讯 ----------------------------------------------------------------------

        //资讯列表
        //资讯列表(ok)
        ARTICLE_GETARTICLELIST: apiPath + 'ArticleApi/getArticleList',
        //获取资讯栏目列表
        ARTICLE_GETARTICLECOLUMNLIST: apiPath + 'ArticleApi/getArticleColumnList',


        // 我的收藏 ----------------------------------------------------------------------

        //获取我的收藏列表
        COLLECTION_GETMYCOLLECTIONLIST: apiPath + 'CollectionApi/getMyCollectionList',
        //删除(取消)我的收藏
        COLLECTION_DELETEMYCOLLECTION: apiPath + 'CollectionApi/deleteMyCollection',


        //获取用户信息
        USER_DETAIL: apiPath + 'app/accountInfoAction!getUserInformationByUserId.action',
        //修改用户信息
        USER_UPDATEUSERINFO: apiPath + 'UserApi/updateUserInfo',
        //搜索用户
        USER_SEARCH: apiPath + 'UserApi/searchUser',
        //修改用户体检信息
        USER_CHECK: apiPath + 'app/userInformationAction!updateResult.action',

        // 好友 ----------------------------------------------------------------------

        //申请加为好友
        FRIEND_APPLYADDFRIEND: apiPath + 'FriendApi/applyAddFriend',
        //同意加为好友
        FRIEND_AGREEADDFRIEND: apiPath + 'FriendApi/agreeAddFriend',
        //好友申请列表
        FRIEND_GETMYFRIENDAPPLYLIST: apiPath + 'FriendApi/getMyFriendApplyList',
        //删除好友
        FRIEND_DELETEMYFRIEND: apiPath + 'FriendApi/deleteMyFriend',
        //我的好友列表
        FRIEND_GETMYFRIENDLIST: apiPath + 'FriendApi/getMyFriendList',
        //修改好友备注
        FRIEND_UPDATEFRIENDREMARK: apiPath + 'FriendApi/updateFriendRemark',


        //搜索------------------------------------------------------------------------
        //全部搜索
        SEARCH_ALL: apiPath + 'SearchApi/searchAll',
        SEARCH_SYMPTOMPROBLEM: apiPath + 'SearchApi/searchSymptomProblem',
        SEARCH_INFORMATION: apiPath + 'SearchApi/searchInformation',
        SEARCH_DAILYMETHOD: apiPath + 'SearchApi/searchDailyMethod',
        SEARCH_FRIENDCIRCLE: apiPath + 'SearchApi/searchFriendsCircle',

		// 注册登录(老)
		//验证手机号
		USER_CHECKPHONEREGISTERED: apiPath + 'UserApi/checkPhoneRegistered',
		//发送验证码
		USER_SENDCODE: apiPath + 'UserApi/sendCode',
		//验证验证码
		USER_CHECKCODE: apiPath + 'UserApi/checkCode',
		//注册
		USER_REGISTER: apiPath + "UserApi/register",
		//登录
		USER_LOGIN: apiPath + "UserApi/login",
		//获取用户信息
		USER_GETLOGINUSER: apiPath + 'UserApi/getLoginUser',
		//获取指定用户信息
		USER_GETUSER: apiPath + 'UserApi/getUser',
		//重置密码
		USER_RESETPASSWORD: apiPath + "UserApi/resetPassword",
		//基本信息
		USER_SETUSERBASEINFO: apiPath + "UserApi/setUserBaseInfo",
		//情绪
		EMOTION_GETEMOTIONFACTOR: apiPath + "EmotionApi/getEmotionFactor",
		EMOTION_GETEMOTIONINTERVENE: apiPath + "EmotionApi/getEmotionIntervene",

		// 注册登录(新)

        /*//检测用户是否存在
         CHECK_PHONE: apiPath + 'checkUserExists',
         //发送验证码
         SEND_CODE: apiPath + "sendMsg",
         //检测验证码
         CHECK_CODE: apiPath + "checkCodeIsOut",
         //用户注册
         REGISTER: apiPath + 'register',
         //用户登录
         LOGIN: apiPath + 'login',
         //修改用户信息
         SAVE_USERINFO: apiPath + 'saveUserInfo',
         //重设密码
         CHANGE_PASSWORD: apiPath + 'changePassword',
         //检测旧密码
         CHECK_PASSWORD: apiPath + 'checkPassword',
         //获取用户信息
         USER_INFO: apiPath + 'userinfo',*/

        // 动态 ---------------------------------------------------------
        //动态列表
        DYNAMIC_GETMYDYNAMICSLIST: apiPath + 'DynamicApi/getMyDynamicsList',
        //添加动态
        DYNAMIC_ADDDYNAMIC: apiPath + 'DynamicApi/addDynamic',
        //删除动态
        DYNAMIC_DELETEDYNAMIC: apiPath + 'DynamicApi/deleteDynamic',
        //添加评论
        DYNAMIC_ADDDYNAMICCOMMENT: apiPath + 'DynamicApi/addDynamicComment',
        //点赞
        DYNAMIC_ADDDYNAMICPRAISE: apiPath + 'DynamicApi/addDynamicPraise',
        //取消点赞
        DYNAMIC_DELETEDYNAMICPRAISE: apiPath + 'DynamicApi/deleteDynamicPraise',

        // 我的问题 ---------------------------------------------------------
        //所有问题
        DISEASE_GETALLDISEASELIST: apiPath + 'DiseaseApi/getAllDiseaseList',
        //用户问题
        DISEASE_GETMYDISEASELIST: apiPath + 'DiseaseApi/getMyDiseaseList',
        //添加我的问题
        DISEASE_ADDMYDISEASE: apiPath + 'DiseaseApi/addMyDisease',
        //删除用户问题
        DISEASE_DELETEMYDISEASE: apiPath + 'DiseaseApi/deleteMyDisease',
        //问题日常疗法
        DISEASE_GETDISEASEDAILYMETHODLIST: apiPath + 'DiseaseApi/getDiseaseDailyMethodList',
        DISEASE_GETDISEASEDAILYMETHODDETAIL: apiPath + 'DiseaseApi/getDiseaseDailyMethodDetail',
        //问题专业疗法
        DISEASE_GETDISEASEPROFESSIONALMETHODLIST: apiPath + 'DiseaseApi/getDiseaseProfessionalMethodList',
        DISEASE_GETDISEASEPROFESSIONALMETHODDETAIL: apiPath + 'DiseaseApi/getDiseaseProfessionalMethodDetail',
        //获取食材
        INGREDIENT_GETINGREDIENT: apiPath + 'IngredientApi/getIngredient',
        //获取菜品列表
        COOKBOOK_GETCOOKBOOKLIST: apiPath + 'CookbookApi/getCookbookList',
        //获取菜品详细
        COOKBOOK_GETCOOKBOOK: apiPath + 'CookbookApi/getCookbook',
       //获取疾病相关经络
        DISEASE_MERIDIANS: apiPath + 'DiseaseApi/getDiseaseMeridians',
        //获取疾病相关穴位
        DISEASE_ACUPOINTS: apiPath + 'DiseaseApi/getDiseaseAcupoints',
        //获取疾病相关器官
        DISEASE_ORGANS: apiPath + 'DiseaseApi/getDiseaseOrgans',
        //获取疾病相关循环系统
        DISEASE_CIRCULATORYSYSTEMS: apiPath + 'DiseaseApi/getDiseaseCirculatorySystems',
        //获取自修相关经络
        EXPECT_MERIDIANS: apiPath + 'ExpectApi/getExpectMeridians',
        //获取自修相关穴位
        EXPECT_ACUPOINTS: apiPath + 'ExpectApi/getExpectAcupoints',
        //获取自修相关器官
        EXPECT_ORGANS: apiPath + 'ExpectApi/getExpectOrgans',
        //获取自修相关循环系统
        EXPECT_CIRCULATORYSYSTEMS: apiPath + 'ExpectApi/getExpectCirculatorySystems',


        // 我的期望 ---------------------------------------------------------
        //所有期望
        EXPECT_GETALLEXPECTLIST: apiPath + 'ExpectApi/getAllExpectList',
        //用户期望
        EXPECT_GETMYEXPECTLIST: apiPath + 'ExpectApi/getMyExpectList',
        //添加用户期望
        EXPECT_ADDMYEXPECT: apiPath + 'ExpectApi/addMyExpect',
        //删除用户期望
        EXPECT_DELETEMYEXPECT: apiPath + 'ExpectApi/deleteMyExpect',
        //期望日常疗法
        EXPECT_GETEXPECTDAILYMETHODLIST: apiPath + 'ExpectApi/getExpectDailyMethodList',
        EXPECT_GETEXPECTDAILYMETHODDETAIL: apiPath + 'ExpectApi/getExpectDailyMethodDetail',

        //期望专业疗法
        EXPECT_GETEXPECTPROFESSIONALMETHODLIST: apiPath + 'ExpectApi/getExpectProfessionalMethodList',
        EXPECT_GETEXPECTPROFESSIONALMETHODDETAIL: apiPath + 'ExpectApi/getExpectProfessionalMethodDetail',

        // 自养 ---------------------------------------------------------
       HEALTH_GETSOLARTERM: apiPath + 'HealthApi/getSolarTerm',
       HEALTH_GETHEALTHDAILYMETHODLIST: apiPath + 'HealthApi/getHealthDailyMethodList',
       HEALTH_GETHEALTHDAILYMETHODDETAIL: apiPath + 'HealthApi/getHealthDailyMethodDetail',

        // 我的能量场 ---------------------------------------------------------

        ENERGY_GETINFORMATIONRESULT: apiPath + '/EnergyApi/getInformationResult',//
        MY_ENEGRYMY_ACTION_INFORMATION: apiPath + 'app/myEnergyAction!informationData.action',//?appid=1
        //获取区县
        REGION_GETCOUNTYLIST: apiPath + 'RegionApi/getCountyList',
        //获取城市列表
        REGION_GETCITYLIST: apiPath + 'RegionApi/getCityList',

        //获取体检结果
        MEDICALEXAMINATION_GETMEDICALINFORMATIONLIST: apiPath + 'MedicalExaminationApi/getMedicalInformationList',
        //修改体检结果
        MEDICALEXAMINATION_UPDATAMEDICALINFORMATIONRESULT: apiPath + 'MedicalExaminationApi/updataMedicalInformationResult',

        // 自诊 ---------------------------------------------------------
        DIAGNOSIS_GETCOMMONDISEASELIST: apiPath + 'DiagnosisApi/getCommonDiseaseList',
        DIAGNOSIS_ADDMYDISEASES: apiPath + 'DiagnosisApi/addMyDiseases',
        DIAGNOSIS_GETQUESTIONNAIRESCORES :apiPath + 'DiagnosisApi/getQuestionnaireScores',
        // 意见反馈 ---------------------------------------------------------
        FEEDBACK_SUBMIT: apiPath + 'FeedbackApi/submit',
        //我的记录
        TIMEPERIODAPI_GETMYRECORD:apiPath+'TimePeriodApi/getMyRecord',


    },
    // 获取图片完整路径
    getImage(filePath, width, height){
        let url = this.apis.IMAGE + '?filePath=' + filePath;
        if (width)
            url += '&w=' + width;
        if (height)
            url += '&h=' + height;
        // console.log(url);
        return url;
    },
};
export default urls;
