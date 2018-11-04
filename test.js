var QcloudSms = require("qcloudsms_js");

// 短信应用SDK AppID
var appid = 1400146375;  // SDK AppID是1400开头

// 短信应用SDK AppKey
var appkey = "6c10e1f51ebe9db2404452f618c6b0be";

// 需要发送短信的手机号码
var phoneNumbers = ["15083980039"];

// 短信模板ID，需要在短信应用中申请
var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
//templateId 7839 对应的内容是"您的验证码是: {1}"
// 签名
var smsSign = "腾讯云";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);

// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
	if (err) {
		console.log("err: ", err);
	} else {
		console.log("request data: ", res.req);
		console.log("response data: ", resData);
	}
}

var ssender = qcloudsms.SmsSingleSender();
var params = ["5678"];//数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
ssender.sendWithParam(86, phoneNumbers[0], templateId,
	params, smsSign, "", "", callback);  // 签名参数未提供或者为空时，会使用默认签名发送短信
