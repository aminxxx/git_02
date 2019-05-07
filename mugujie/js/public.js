
// 打开看有没有登录
var info = window.localStorage.getItem('userArr');


if(info){
	info = JSON.parse(info)[0];
	$('.login a').html(info.username);
	$('.login span').show();
	//退出
	$('.login span').on("click",function(){
		window.localStorage.clear();
		$('.login span').hide();
		$('.login a').html('未登录');
	});
	
}else{
	$('.login a').html('未登录');
	$('.login span').hide();
}





	(function(){
		var about = $(".aboutUs");
		var data = oData.aboutMe.data;//获取数据
		// console.log(oData.aboutMe.data);
		//封装一个创建标签的函数
		function create(arr){
			var oUl = $('<ul>');
			for(var i=0;i<arr.length;i++){
				var li =$('<li><a href="#">'+arr[i].title+'</a></li>')
				oUl.append(li);
			}
			return oUl;
		}
		//新手帮助
		about.append(create(data[32260].list));
		//权益保障
		about.append(create(data[32261].list));
		//支付方式
		about.append(create(data[32262].list));
		//移动客户下载
		about.append(create(data[32263].list));
		//商家服务
		about.append(create(data[132238].list));
		//关于我们
		about.append(create(data[132239].list));
		//公司地址
		var div = $('<div class="about_info">');
		div.html(
				'<h2>'+data[32163].list[11].title+"</h2>"+
				"<p>"+cycle(data[32170].list).substring(0,cycle(data[32170].list).length-2)+'</p>'
		)
		about.append(div)
		//封装一个循环数组数据的函数
		function cycle(arr){
			var str = "";//定义一个空串存放拼接好的数据
			for(var i=0;i<arr.length;i++){
				str += data[32170].list[i].title +data[32170].list[i].subTitle +' | ';
			}
			return str;
		}
		//关于我们的显示隐藏
		$(".header_nav_lis .about_lis").on("mouseenter",function(){
			$(".aboutUs").show();
		})
		$(".header_nav_lis .about_lis").on("mouseleave",function(){
			$(".aboutUs").hide();
		})
	})()
	
	
	
	/* 目录 */
	//封装一个创建标签的函数
	function create_catalog(){
		var data = oData.catalog;
		var market = $('.market');
		// console.log(data[1].list);
		market.append(cycleA("主题市场",data[0].list));
		market.append(cycleA("热门品牌",data[1].list));
		market.append(cycleA("热门品牌",data[2].list));
		//封装一个循环数组数据的函数
		function cycleA(title,arr){
			var str = "";//定义一个空串存放拼接好的数据
			for(var i=1;i<arr.length-1;i++){
				str += '<a href='+arr[i].link+'>'+arr[i].title+'</a>';
			}
			var div = $('<div><h3>'+title+'</h3>'+str+'</div>');
			// console.log(str);
			return div;
		}
		/* 目录的显示隐藏 */
		$(".header_catalog").on("mouseenter",function(){
			$(".market").show();
		})
		$(".market").on("mouseleave",function(){
			$(".market").hide();
		})
	}
	create_catalog()
	/* 搜索提示 */
	function search(){
		var search_info = $(".search_info");
		var data = oData.searchData;
		var data1 = oData.searchData.a[0].list;
		var onoff = true;
		$(".search_info").on("mouseenter mouseleave",function(){
			onoff = !onoff;
		})
		//输入内容触发函数
		$('.search input').on("input",function(){
			var val = this.value;
			var json = data[val];
			$('.search_info').html('');//每次触发函数都先清空再添加
			if(json){
				search_info.append(cycleDiv(json[0].list));
				search_info.append(cycleLi(json));
				// console.log(cycleLi(json));
				$(".search_info").show();
			}else{
				$(".search_info").hide();
			}
		})
		//失去焦点也要隐藏提示框
		$('.search input').on("blur",function(){
			if(onoff){
				$('.search input').val('');
				$(".search_info").hide();
			}
		})
		//获取相关话题的函数
		function cycleDiv(data){
			var div = $('<div class="search_info_about">');
			var str = '';
			for(var i=0;i<data.length;i++){
				str +='<a href='+data[i].link+'><span><img src='+data[i].icon+'></span>'+data[i].total+data[i].desc+'</a>'
			}
			div.html(str);
			return div;
		}
		//创建li
		
		function cycleLi(arr){
			var oUl = $('<ul class="search_lis">');
			var str = '';
			for(var i=1;i<arr.length;i++){
				str +='<li><a href='+arr[i].link+'><p>'+arr[i].tag+'</p><span>'+cycleSpan(arr[i].tags)+'</span></a>';
				
			}
			oUl.html(str);
			return oUl;
		}
		//创建span
		function cycleSpan(arr){
			var str1 = '';
			if(!arr){//判断传进来的数组有没有值
				return '';
			}
			for(var i=1;i<arr.length;i++){
					str1 +='<span>'+arr[i].tag+'</span>'
			}
			return str1
		}
	}
	//二维码的显示隐藏
	$(".show_code").on('mouseenter',function(){
		$('.code').show();
	})
	$(".show_code").on('mouseleave',function(){
		$('.code').hide();
	})
	
	search();

//回到顶部
nav_top()
function nav_top(){
	var iH = window.innerHeight;
	$('.position_nav').css("height",iH);
	$(window).on("resize",function(){//浏览器宽高发生改变触发
		var iH = window.innerHeight;
		$('.position_nav').css("height",iH);
	})
	$(window).on("scroll",function(){//滚动条
		var h = window.pageYOffset;
		if(h>=300){
			$('.position_nav_top').show();
		}else if(h<300){
			$('.position_nav_top').hide();
		}
	})
}
//点击回到顶部
var timer = null;
$('.position_nav_top').on('click',function(){
	timer = setInterval(function(){//开启定时器,每隔多长时间执行一次
		var h = window.pageYOffset;//获取滚动条的高度
		if(h<=0){//判断滚动条的高度有没有达到顶端
			clearInterval(timer);//true,关闭定时器
			return;
		}else{
			h -= 20;//false,每次都往上挪动一点
			window.scrollTo(0,h);//重新设置滚动条的位置
			}
	},1)
	
	
	
	// 登录
})
