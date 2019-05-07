//主题市场
function createLi(){
	//console.log(mianMark);
	var data = mianMark.title;
	var market_nav_list = $(".market_nav_list");
		var str = '';
		for(var i=0;i<data.length;i++){
			var obj = mianMark[data[i].categoryDetailPid].data.topic3.list;
			str += '<li index="'+data[i].categoryDetailPid+'"><h3><a href="#">'+data[i].categoryName+'</a></h3>'+
			'<a href="#" style="color:'+obj[1].titleColor+'">'+obj[0].title+'</a><a href="#" style="color:'+obj[1].titleColor+'">'+obj[1].title+'</a><a href="#" style="color:'+obj[1].titleColor+'">'+obj[2].title+'</a></li>';
		}
	market_nav_list.append(str);
	function cycleA(arr){
		var str ="";
		for(var i=0;i<2;i++){
			str += '<a href="#" style="color:"'+arr[i].titleColor+'>'+arr[i].title+'</a>'
		}
		return str;
	}
	//主题市场旁边部分
	var lis = market_nav_list.find('li');
	var market_nav_info = $('.market_nav_info');
	var sideList = $('.sideList')
	var sideList_left = $('.sideList_left');
	var sideList_right = $('.sideList_right');
	
	lis.on('mouseenter',function(){
		sideList_left.html('');
		sideList_right.html('');
		var index = $(this).attr('index');
		var data1 = mianMark[index].data;
		sideList_left.append(cycleDiv(data1));
		var data2 = data1.guessLike.list;
		sideList_right.append(guess(data2));
	})
	$(".market_nav_list").on('mouseenter',function(){
		sideList.show();
	})
	market_nav_info.on('mouseleave',function(){
		sideList.hide();
	})
		
	
	function cycleDiv(obj){
		var arr = [];
		arr.push(obj.topic1,obj.topic2,obj.topic3);
		var str = '';
		for(var i=0;i<arr.length;i++){
			str += '<div class="sideList_left_div">'+
								'<h3>'+
									'<b>'+arr[i].info.title+'</b>'+
									'<span>更多<i>></i></span>'+
								'</h3>'+
								cycleA(arr[i].list)+
							'</div>';
		}
		return str;
	}
	function cycleA(arr){
		var str ='';
		for(var i=0;i<arr.length;i++){
			str +='<a href="#" style="color:'+arr[i].titleColor+'">'+arr[i].title+'</a>';
		}
		return str;
	}
	//猜你喜欢
	function guess(arr){
		var str ='<h4>/猜你喜欢/</h4>';
		for(var i=0;i<arr.length;i++){
			str +='<div>'+
						'<a href="#">'+
							'<img src="'+arr[i].image+'" >'+
							'<span></span>'+
							'<p>'+arr[i].title+'</p>'+
						'</a>'+
					'</div>';
		}
		return str;
	}
}
createLi();

/* 主轮播图 */
mainBanner()
function mainBanner(){
	var data = oDataShopping.banner.mainBanner;
	// console.log(data);
	var str ='';
	for(var i =0;i<data.length;i++){
		str +='<div class="swiper-slide">'+
				'<img src="'+data[i].image+'">'+
			'</div>';	
			
	}
	var num =0;
	function color(){
		num = num%data.length;
		$(".wrap").css("background",data[num].bgColor);
	}
	setInterval(function(){
		num++;
			color();
		},4200)
		
	$('#banner_pic').append(str);
	var mySwiper = new Swiper("#banner",{
			loop : true,//无缝轮播
			autoplay: {
				delay: 4000,//1秒切换一次
		    },
			//autoplay :true,//自动轮播
			pagination: {//分页器
				el: '.swiper-pagination',
			},
		});
}

//倒计时
//时间补0函数
function toTime(n){
	return n>9?n:'0'+n;
}
//封装一个倒计时函数
function countDown(){
	/* 
		future:未来的时间
		obj:计算出来的时间差在哪里写入
		fn：时间到了接下来需要做的事情
	 */
	var timer = null;//存储定时器的编号，方便关闭定时器
	clearInterval(timer);
	timer = setInterval(function(){
		execute();
	},1000)
	//页面加载完先执行
	execute();
	function execute(){
		var date = new Date(1557061586000);//获取未来的时间的字符串，并转为时间
		
		var futureTime = date.getTime();//将获取到的未来时间转为时间戳
		var nowDate = new Date();//获取本机现在的时间
		var nowTime = nowDate.getTime();//转为时间戳
		//计算未来时间到现在的时间的时间差,并转为秒数
		var leftTime = parseInt((futureTime-nowTime)/1000);
		var day = parseInt(leftTime/(60*60*24));//计算天数
		var h = parseInt((leftTime - day*60*60*24)/(60*60));//计算小时
		var min = parseInt((leftTime - day*60*60*24 - h*3600)/60);//计算分钟
		var s = leftTime - day*60*60*24 - h*3600 - min*60;//计算秒
		var rush_time = document.getElementsByClassName('rush_time')[0];
		var spans = rush_time.getElementsByTagName("span");
		//console.log(spans);
		spans[0].innerHTML = (toTime(h));
		spans[1].innerHTML = (toTime(min));
		spans[2].innerHTML = (toTime(s));
		/* var rush_time = $('.rush_time span').eq(0).html(toTime(h));
		var rush_time = $('.rush_time span').eq(1).html(toTime(min));
		var rush_time = $('.rush_time span').eq(2).html(toTime(s)); */
		//在页面显示剩余时间
		//obj.innerHTML = '还剩：'+toTime(day)+'天'+toTime(h)+'时'+toTime(min)+'分'+toTime(s)+'秒';
		//判断时间是否到了，到了则关闭定时器
		if(leftTime == 0){
			//关闭定时器
			clearInterval(timer);
			//倒计时结束之后，是否要执行其他操作。判断传进来的是不是一个函数，是则执行，不是则不执行
			(typeof fn == 'function') && fn();
		}
	}
}
countDown()

//今日必抢
function toDayRob(){
	var data = oDataShopping.toDayRob.banner
	// console.log(data);
	var str ='';
	for(var i=0;i<data.length;i++){
		str +='<div class="swiper-slide rush_clothes">'+
					'<img src="'+data[i].image+'"/>'+
					'<p>'+data[i].title+'</p>'+
					'<span>'+
						'<b>￥'+data[i].salePrice+'</b>'+
						'<del>￥'+data[i].price+'</del>'+
					'</span>'+
				'</div>';
	}
	$("#rush_swiper_pic").append(str);
	var mySwiper = new Swiper("#rush_swiper",{
			loop:true,
			slidesPerView : 5,
			autoplay :true,//自动轮播
			navigation: {//按钮
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
}
toDayRob();

//女装
function womenContentTitle(){
	var data = oDataShopping.womenContentTitle.womenShoes;
	// console.log(data);
	var str='';
	for(var i=0;i<data.length;i++){
		str += '<div class="swiper-slide suit_clothes">'+
					'<img src="'+data[i].image+'">'+
					'<p>'+data[i].title+'</p>'+
					'<span>￥'+data[i].price+'</span>'+
				'</div>';
	}
	
	var data1 = oDataShopping.womenContentTitle.womenStyle;
	// console.log(data1);
	var str1 = '';
	for(var j=0;j<3;j++){
		str1 +='<img src="'+data1[j].image+'">';
	}
	$(".suit_dress_pic").append(str1);
	
	$("#suit_pic").append(str);
	/* var mySwiper = new Swiper("#suit_banner",{
			autoplay :true,//自动轮播
			loop:true,
			slidesPerView: 4,
			navigation: {//按钮
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		}); */
	
	var mySwiper = new Swiper("#suit_banner",{
			loop:true,
			slidesPerView : 4,
			//slidesPerGroup:4,
			autoplay :true,//自动轮播
			navigation: {//按钮
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
		
}
womenContentTitle()
/* 开衫外套 */
$(".suit_dress_clothes img").on('mouseenter',function(){
	$(this).css("marginTop","-3px");
})
$(".suit_dress_clothes img").on('mouseleave',function(){
	$(this).css("marginTop","3px");
})

//女鞋
function femaleBanner(){
	var data = oDataShopping.banner.femaleBanner;
	// console.log(data.length/6);
	var str ='';
	for(var i=1;i<=data.length/6;i++){
		str +='<div class="swiper-slide handbag">'+
					'<ul class="handbag_list">'+femaleBannerLi(i)+'</ul>'+
				'</div>';
	}
	$("#handbag_pic").append(str);
	var mySwiper = new Swiper("#handbag_banner",{
			autoplay :true,//自动轮播
			loop:true,
			slidesPerView: 'auto',
			loopedSlides: 34,
			pagination: {//分页器
				el: '.swiper-pagination',
			},
		});
	
}
//生成li的函数
function femaleBannerLi(num){
	var data = oDataShopping.banner.femaleBanner;
	var str = '';
	for(var j=(6*num-6);j<=(6*num-1);j++){
		str += '<li>'+
					'<a href="#">'+
						'<img src="'+data[j].image+'">'+
						'<p>'+data[j].title+'</p>'+
						'<span>￥'+data[j].price+'</span>'+
					'</a>'+
				'</li>';
	}
	return str;
}
femaleBanner()

//猜你喜欢
function guess(){
	var data = guessData.result.wall.docs;
	var onoff = true;
	var num =1;
	console.log(data);
	guessDiv();
	//生成div图片的函数
	function guessDiv(){
		for(var i=0;i<data.length;i++){
			var div = $('<div class="guess_like_mask">'+
							'<a href="'+data[i].link+'">'+
								'<img src="'+data[i].img+'">'+
								'<strong>找相似</strong>'+
								'<p>'+data[i].title+'</p>'+
								'<span>'+
									'<b>￥'+data[i].price+'</b>'+
									'<del>￥'+data[i].orgPrice+'</del>'+
									'<i>'+data[i].sale+'</i>'+
								'</span>'+
							'</a>'+
						'</div>');
			var li = cycleLi();
			li.append(div);
		}
		onoff = true;
	}
	//获取高度最小的li
	function cycleLi(){
		var lis = $(".guess_like li");
		var min = Infinity;
		var obj = null;
		lis.each(function(i,el){
			var h = el.offsetHeight;
			if(h<min){
				min = h;
				obj = el;
			}
		})
		return $(obj);
	}
	
	
	//懒加载
	getPage(num);
	function getPage(){
		var data = guessData.result.wall.docs;
		var arr = [];
		for(var i=(5*num-5);i<=(5*num-1);i++){//一页渲染15张图片，找出渲染的规律
			if(!data[i]){
				break;
			}
			arr.push(data[i])
		}
		return arr;
	}
	
	$(window).on("scroll",function(){
		// 判断li是否到底
		var minLi = cycleLi();
		// console.log(minLi)
		var pos = minLi[0].getBoundingClientRect().bottom;
		var iH = window.innerHeight;
		if(iH>=pos&&onoff){
			onoff = false;
			num++;
			console.log(2)
			var arr = getPage(num);
			setTimeout(function(){
				createLi(arr,onoff)
			},2000)
		}
		
		//顶部搜索框
		var h = window.pageYOffset;
		if(h>=600){
			$("#location").slideDown();
			$(".market_nav_info").css({
				position:'fixed',
				top : 75,
				left: 356,
				display:'none'
			})
			$('.header_logo').on('mouseenter',function(){
				$(".market_nav_info").show();
				$(".market_nav_list").css('background','rgba(238,247,254,0.8)');
			})
			$('.market_nav_info').on('mouseleave',function(){
				$(".market_nav_info").hide();
			})
			
		}else if(h<600){
			$("#location").slideUp();
			$(".market_nav_info").css({
				position:'absolute',
				top : 42,
				left: 0,
				display:'block'
			})
			$('.market_nav_info').on('mouseleave',function(){
				$(".market_nav_info").show();
			})
		}
	})
	
}
guess()