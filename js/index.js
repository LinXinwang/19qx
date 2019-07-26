//=============下面是 cordova框架要使用的变量 =============
var accountVersion = "";
var cAppVersion = "";
//=======================================================

//===================下面是普通全局变量 ===================
var _model = "";
var _chip = "";
var _mac = "";
var _emmcCID = "";
var _udid = "";
var _cVersion = "";
var _cSize = "";
var _cSdk = "";
var _cBrand = "";
var _cFMode = "Default";
var _appversion = "";
var _qsource = "yinhe";
var _userKeyId0 = "";
var _openId = null;
var _mobile = null;
var _nickName = null;
var _loginstatus = false;
var _user_flag = null;
var _accessToken = null;
var needQQ = false;
var _tencentWay = "";

var _actionId = 150;	//主活动的id
var _curFocusId = null;
var startLoginFlag = false;
var changeLoginFlag = false;
var hasAllowanceAward = false; //记录是否有津贴
var hasCouponAward = false; //记录是否有神券
var dialogTime = null;

var answerRightFlag = null;		// 视频答题回答正确标志

//var adressIp = "https://restful.skysrt.com";
//var allowanceUrl = "https://jintie.coocaa.com/api/subsidy/v1/query-userSubsidyInfo-byToken"
//var allowanceClientId = "YS_RELEASE";
//var enurl = "https://webapp.skysrt.com/activity618/Address/index.html?";
//var freePageUrl = "https://webapp.skysrt.com/activity618/Relate/free.html?";
//var screenUrl = "https://webapp.skysrt.com/screen/index.html?";
//var mangguoTv = "https://club.mgtv.com/tvos/xcm/index.html";

var adressIp = "http://beta.restful.lottery.coocaatv.com";
var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//实体奖url
var thisBaseUrl = "http://beta.webapp.skysrt.com/lqq/y19edu/";
var runmode = "debug";			// release

var dataObj = {};//我的奖励数据
var _arr1 = new Array(); //红包
var _arr2 = new Array(); //实体将
var _arr3 = new Array(); //优惠券
var _arr4 = new Array(); //实物奖

coocaaApp.bindEvents("menubutton", function() {
    console.log("this menuButton>>>>>>>>>new>>>>>>>>>")
});

coocaaApp.bindEvents("backbuttondown", function() {
    console.log("this backbuttondown>>>>>>>>>new>>>>>>>>>");
    handleBackButtonFunc();
    //navigator.app.exitApp();
});

coocaaApp.bindEvents("homebutton", function() {
    console.log("this homebutton>>>>>>>>>new>>>>>>>>>");
    
    navigator.app.exitApp();
});

coocaaApp.bindEvents("resume", function() {
	console.log("on resume");
	
	activityStartTime = new Date().getTime();
	
	console.log(startLoginFlag);
	console.log(changeLoginFlag);
	if(startLoginFlag && changeLoginFlag){
        console.log("登录成功");
        startLoginFlag = false;
        changeLoginFlag = false;
		if ($("#myAwardPage").css("display") == "block") {
            console.log(_curHomeBtn);
            $("#" + _curHomeBtn).trigger("itemClick");
            if($("#myAwardBox").css("display") == "block"){
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-有奖品","page_type":"登录成功","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-有奖品', '登录成功', '', '']);
            }else{
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-无奖品","page_type":"登录成功","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-无奖品', '登录成功', '', '']);
            }
        }else{
        	//TODO:主页面启登录的结果的日志项提交；
        	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"解救冰冻物体后有奖弹窗","page_type":"登录成功","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        	_czc.push(['_trackEvent', '登录弹窗', '解救冰冻物体后有奖弹窗', '登录成功', '', '']);
			
			pageResume();
        }
    }else if (startLoginFlag) {
        console.log("登录失败");
        startLoginFlag = false;
        changeLoginFlag = false;
        if ($("#myAwardPage").css("display") == "block") {
            console.log(_curHomeBtn);
            $("#" + _curHomeBtn).trigger("itemClick");
            if($("#myAwardBox").css("display") == "block"){
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-有奖品","page_type":"登录失败","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-有奖品', '登录失败', '', '']);
            }else{
            	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"我的奖品页-无奖品","page_type":"登录失败","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        		_czc.push(['_trackEvent', '登录弹窗', '我的奖品页-无奖品', '登录失败', '', '']);
            }
        }else{
        	//TODO:主页面启登录的结果的日志项提交；
        	sentLog("result_event_new", '{"page_name":"登录弹窗","parent_page":"解救冰冻物体后有奖弹窗","page_type":"登录失败","activity_type":"2019教育暑期活动","activity_name":"2019教育暑期活动","OPEN_ID":"'+_openId+'"}');
        	_czc.push(['_trackEvent', '登录弹窗', '解救冰冻物体后有奖弹窗', '登录失败', '', '']);
			
			pageResume();
        }
    }else{
    	pageResume();
    }
});

coocaaApp.bindEvents("pause", function() {
	console.log("on pause");
	autoFillLogData5();
	webDataLog("result_event_new", logdata5);
});

coocaaApp.ready=function() {
    console.log("this is todo function----------");
};

coocaaApp.triggleButton=function() {
	setTimeout(updateMainPageBeforeInit, 1);
    _appversion = accountVersion;
	processUrlParam();
	
    listenUserChange();
    buttonInitBefore();
    getDeviceInfo();
};

//保留小数
function toDecimal(x) {
    var val = Number(x);
    if(!isNaN(parseFloat(val))) {
        val = val.toFixed(2);//把 Number 四舍五入为指定小数位数的数字。
    }
    val = Number(val);
    return  val;
}
//优惠券的领取并跳转
function sendPrizes(oAwardId, oRememberId, oType, oUserKeyId, oActiveId, oQsource) {
	console.log(oAwardId + "--" + oRememberId + "--" + oUserKeyId + "--" + oType + "--" + oActiveId);
	if(oQsource != "tencent") {
		oQsource = "iqiyi";
	}
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: adressIp + "/v4/lottery/verify/receive",
		data: {
			"cUDID": oUserKeyId,
			"activeId": oActiveId,
			"awardId": oAwardId,
			"rememberId": oRememberId,
			"awardTypeId": oType,
			"userKeyId": oUserKeyId,
			"MAC": _mac,
			"cOpenId": _openId,
			"source": oQsource
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				if (oType == "5") {
					var couponDetail = data.data.couponInfo.couponDetail;
					console.log(couponDetail);
					if(couponDetail == 1) { //已配置
						var data_a = data.data.couponInfo.onclickData;
						var packageName = JSON.parse(data_a).packageName;
						var byvalue = JSON.parse(data_a).byvalue;
						var bywhat = JSON.parse(data_a).bywhat;
						var obj = JSON.parse(data_a).param;
						var sources = new Array();
						for(var key in obj) {
							var px = {};
							px[key] = obj[key];
							sources.push(px);
						}
						sources = JSON.stringify(sources);
						console.log(packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
						console.log("跳转使用页面");
						coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
							console.log(error);
						});
					} else {
						console.log("未配置");
					}
				} else if(oType == "1"){
					var taskId = "";
                	if (_qsource == "tencent") {
                		taskId = "103177";
                	} else{
                		taskId = "103178";
                	}
                	coocaaosapi.startHomeCommonList(taskId,function(){},function(){});
				}
			} else {
				console.log("优惠券/体验券激活失败,需要给出激活失败的提示.");
			}
		},
		error: function() {
			console.log("获取失败");
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});

}
function buttonInitAfter() {}
//绘制二维码
function drawQrcode(id, url, wh) {
    document.getElementById(id).innerHTML = "";
    var qrcode = new QRCode(document.getElementById(id), {
        width: wh,
        height: wh
    });
    qrcode.makeCode(url);
}
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2], 'utf-8');
	return null; //返回参数值
}

function webDataLog(logname, dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log(logname + "--" + _dataString);
	coocaaosapi.notifyJSLogInfo(logname, _dataString, function(message) {console.log(message);}, function(error) {console.log(error);});
}

function sentLog(eventid,datalist) {
    coocaaosapi.notifyJSLogInfo(eventid, datalist, function(message) { console.log(message); }, function(error) { console.log(error); });
}
