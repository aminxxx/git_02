$(".btn_register").on("click",function(){
	$(".login").hide();
	$(".register").show();
})
$(".btn_return").on("click",function(){
	$(".login").show();
	$(".register").hide();
})
//注册
//先获取所有用户的对象//变成数组
if(window.localStorage.userArr){//判断是否存在
	var array = JSON.parse(window.localStorage.userArr);
}else{
	array = [];//创建一个新数组
}

$(".btn_submit").on("click",function(){
	var username = $("input").eq(2).val();
	var password = $("input").eq(3).val();
	var pt = /^\w{4,20}$/g;
	var pt1 = /^[a-zA-Z\d]{6,20}$/g;
	var str = pt.test(username);
	var str1 = pt1.test(password);
	if(username.trim() == ''){//判断账号格式是否正确
		$(".tips1").html("用户名不能为空");
		$(".tips1").css("display","block");
	}else if(!str){
		$(".tips1").css("display","block");
	}else{
		if(password.trim() == ''){//判断密码格式是否正确
			$(".tips2").html("密码不能为空");
			$(".tips2").css("display","block");
		}else if(!str1){
			$(".tips2").css("display","block");
		}else{
			for(var i =0;i<array.length;i++){
					//判断是否有相同账号
					if(username==array[i].username){
						alert("该账号已存在");
						return;
					}
				}
			//创建对象
			var obj = {username:username,password:password,score:0}
			array.push(obj);
			window.localStorage.userArr=JSON.stringify(array);
			alert("用户创建成功");
		}
	}
})
//账号
$("input").eq(2).on("focus",function(){
	$(".tips1").css("display","none");
})
$("input").eq(3).on("focus",function(){
	$(".tips2").css("display","none");
})



//登录
$(".btn_login").on("click",function(){
	var username = $("input").eq(0).val();
	var password = $("input").eq(1).val();
	
	if(window.localStorage.userArr){
		var array = JSON.parse(window.localStorage.userArr);//获取数据,并转为对象
		var onoff = false;//定义一个开关
		var index = 0;//定义一个下标确定用户
		for(var i=0;i<array.length;i++){
			if(username == array[i].username){//这个账户存在
				onoff = true;
				index = i;
			}else{
				alert("账号不存在！");
			}
		}
		if(onoff){//如果存在
			if(password == array[index].password){
				window.open('index.html',"_self");//打开新页面
			}else{
				alert("输入有误！");
			}
		}
			
	}
	
	
})
login()
//判断曾经是否登录过
function login(){
	if(window.localStorage.userArr){
		var array = JSON.parse(window.localStorage.userArr);//获取数据,并转为对象
		console.log(array)
		
		for(var i=0;i<array.length;i++){
			if(array[i].username&&array[i].password){//判断数据里面是否存在这和账号
				$("input").eq(0).val(array[i].username);//存在,将里面的值赋给它
				$("input").eq(1).val(array[i].password);
			}
		}
		
	}else{
		
		
	}
	
}


