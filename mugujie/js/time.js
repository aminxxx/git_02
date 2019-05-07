//封装一个倒计时函数
function countDown(future,obj,fn){
	/* 
		future:未来的时间
		obj:计算出来的时间差在哪里写入
		fn：时间到了接下来需要做的事情
	 */
	var timer = null;//存储定时器的编号，方便关闭定时器
	clearInterval(timer);
	timer = setInterval(()=>{
		execute();
	},1000)
	//页面加载完先执行
	execute();
	function execute(){
		var date = new Date(future);//获取未来的时间的字符串，并转为时间
		var futureTime = date.getTime();//将获取到的未来时间转为时间戳
		var nowDate = new Date();//获取本机现在的时间
		var nowTime = nowDate.getTime();//转为时间戳
		//计算未来时间到现在的时间的时间差,并转为秒数
		var leftTime = parseInt((futureTime-nowTime)/1000);
		var day = parseInt(leftTime/(60*60*24));//计算天数
		var h = parseInt((leftTime - day*60*60*24)/(60*60));//计算小时
		var min = parseInt((leftTime - day*60*60*24 - h*3600)/60);//计算分钟
		var s = leftTime - day*60*60*24 - h*3600 - min*60;//计算秒
		//在页面显示剩余时间
		obj.innerHTML = '还剩：'+toTime(day)+'天'+toTime(h)+'时'+toTime(min)+'分'+toTime(s)+'秒';
		//判断时间是否到了，到了则关闭定时器
		if(leftTime == 0){
			//关闭定时器
			clearInterval(timer);
			//倒计时结束之后，是否要执行其他操作。判断传进来的是不是一个函数，是则执行，不是则不执行
			(typeof fn == 'function') && fn();
		}
	}
}