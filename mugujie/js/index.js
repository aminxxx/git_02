function center(){
	$(".content_pic img").attr("src",oData.contentCenterBig.list[0].img);
	$(".content_info").css("background","url("+oData.bjGfi+") no-repeat");//
	//购物商城
	var commodity = $(".content_info_commodity");
	var data = oData.shopping[0].list;
	function createDiv(data){
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<div><a href='+data[i].link+'><img src='+data[i].cateIcon+'><p>'+data[i].cateName+'</p></a></div>'
		}
		return str;
	}
	commodity.append(createDiv(data));
	//购物商城文字
	var font = $(".content_info_font");
	var data1 = oData.shopping[1].list;
	function createA(arr){
		var str = '';
		for(var i=0;i<arr.length;i++){
			if(arr[i].icon.trim()){
				str += '<a href="'+arr[i].link+'" style="color:'+arr[i].color+'">'+arr[i].word+'<span style="background:url('+arr[i].icon+')"></span></a>';
			}else{
				str += '<a href="'+arr[i].link+'" style="color:'+arr[i].color+'">'+arr[i].word+'</a>';
			}
			// str +='<a href="#">扣除积分</a>'
		}
		return str;
	}
	font.append(createA(data1));
	
}
center();

//左侧瀑布流式
function left(){
	// console.log(oData.contentRigth,oData.contentLeft,oData.contentCenter);
	var num = 1;
	var arr1 = getPage(num,oData.contentLeft);
	var onoff = true;
	console.log(arr1)
	cycleLi(arr1,onoff)
	/* 滚动条  */
	$(window).on("scroll",function(){
		// 判断li是否到底
		var minLi = getLi('.wrap_left li')[0];
		var pos = minLi.getBoundingClientRect().bottom;
		var iH = window.innerHeight;
		if(iH>=pos&&onoff){
			onoff = false;
			num++;
			var arr1 = getPage(num,oData.contentLeft);
			setTimeout(function(){
				cycleLi(arr1,onoff)
			},2000)
		}
		
		//顶部搜索框
		var h = window.pageYOffset;
		if(h>=200){
			$("#location").slideDown();
		}else if(h<200){
			$("#location").slideUp();
		}
		//回到顶部
		if(h>=1000){
			$('.getTop').show();
		}else if(h<1000){
			$('.getTop').hide();
		}
	})
}
left();
//点击回到顶部
var timer = null;
$('.getTop').on('click',function(){
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
})
function cycleLi(arr,onoff){
	for(var i=0;i<arr.length;i++){
		if(arr[i].modelData.data){
			var obj = arr[i].modelData.data;
			var div = $('<div class="shade">'+
						'<a href="#">'+
							'<img src="'+obj.cover+'">'+
							'<div class="shadeLogo">'+createImg(obj.brandInfo)+
							'</div>'+
							'<span></span>'+
							'<div class="shade_son">'+
								'<b><i>'+obj.cFav+'</i></b>'+
								'<b></b>'+
								'<p>'+obj.content+'</p>'+
							'</div>'+
						'</a>'+
					'</div>');
		}
		if(arr[i].modelData.ctList){
			var obj1 = arr[i].modelData.ctList[0];
			var div = $('<div class="shade">'+
						'<a href="#">'+
							'<img src="'+obj1.cover+'">'+
							'<div class="shadeLogo">'+createImg(obj.brandInfo)+
							'</div>'+
						'</a>'+
					'</div>');
		}
		
		//鼠标经过动画
		div.on('mouseenter',function(){
			$(this).css("top","-3px");
		})
		div.on('mouseleave',function(){
			$(this).css("top","3px");
		})
		//点赞部分的显示隐藏
		div.on('mouseenter',function(){
			$(this).find('.shade_son').show();
		})
		div.on('mouseleave',function(){
			$(this).find('.shade_son').hide();
		})
		
		var li = getLi('.wrap_left li');
		li.append(div);
		// console.log(li);
	}
	onoff = true;		
}
//获取最小li的函数
function getLi(item){
	var lis = $(item);
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
//生成img的函数
function createImg(arr){
	var str = '';
	if(!arr){
		return '';
	}
	for(var i=0;i<arr.length;i++){
		str+= '<img src="'+arr[i].brandLogo+'"/><i>'+arr[i].brandName+'</i>';
	}
	return str;
	console.log(str);
}
// 获取第几页的数据,一页15条数据
	function getPage(num,data){
		var data = data;
		// console.log(data);
		/*
			1 : 0-14      15*i-15   15*i-1
		*/
	   var arr = [];
		for(var i=(15*num-15);i<=(15*num-1);i++){//一页渲染15张图片，找出渲染的规律
			if(!data[i]){
				break;
			}
			arr.push(data[i])
		}
		return arr;
	}
	
	
	
	
//右边瀑布流
function right(){
	var num = 1;
	var arr2 = getPage(num,oData.contentRigth);
	var onoff = true;
	createLi(arr2,onoff)
	$(window).on("scroll",function(){
		// 判断li是否到底
		var minLi = getLi('.wrap_right li')[0];
		// console.log(minLi)
		var pos = minLi.getBoundingClientRect().bottom;
		var iH = window.innerHeight;
		if(iH>=pos&&onoff){
			onoff = false;
			num++;
			var arr2 = getPage(num,oData.contentRigth);
			setTimeout(function(){
				createLi(arr2,onoff)
			},2000)
		}
	})
	
}
right();
function createLi(arr,onoff){
	for(var i=0;i<arr.length;i++){
		if(arr[i].modelData.data){
			var obj = arr[i].modelData.data;
			var div = $('<div class="shade">'+
						'<a href="#">'+
							'<img src="'+obj.cover+'">'+
							'<div class="shadeLogo">'+createImg(obj.brandInfo)+
							'</div>'+
							'<span></span>'+
							'<div class="shade_son">'+
								'<b><i>'+obj.cFav+'</i></b>'+
								'<b></b>'+
								'<p>'+obj.content+'</p>'+
							'</div>'+
						'</a>'+
					'</div>');
		}
		if(arr[i].modelData.ctList){
			var obj1 = arr[i].modelData.ctList[0];
			var div = $('<div class="shade">'+
						'<a href="#">'+
							'<img src="'+obj1.cover+'">'+
							'<div class="shadeLogo">'+createImg(obj.brandInfo)+
							'</div>'+
						'</a>'+
					'</div>');
		}
		//鼠标经过动画
		div.on('mouseenter',function(){
			$(this).css("top","-3px");
		})
		div.on('mouseleave',function(){
			$(this).css("top","3px");
		})
		//点赞部分的显示隐藏
		div.on('mouseenter',function(){
			$(this).find('.shade_son').show();
		})
		div.on('mouseleave',function(){
			$(this).find('.shade_son').hide();
		})
		var li = getLi('.wrap_right li');
		li.append(div);
		// console.log(li)
	}
	onoff = true;		
}

//中间的瀑布流
function middle(){
	var num = 1;
	var arr3 = getPage(num,oData.contentCenter);
	console.log(arr3);
	var onoff = true;
	createCenterLi(arr3,onoff)
	$(window).on("scroll",function(){
		// 判断li是否到底
		var minLi = getLi('.wrap_right li')[0];
		// console.log(minLi)
		var pos = minLi.getBoundingClientRect().bottom;
		var iH = window.innerHeight;
		if(iH>=pos&&onoff){
			onoff = false;
			num++;
			var arr3 = getPage(num,oData.contentCenter);
			setTimeout(function(){
				createCenterLi(arr3,onoff)
			},2000)
		}
	})
	
}
middle();
function createCenterLi(arr,onoff){
	for(var i=0;i<arr.length;i++){
		if(arr[i].modelData.data){
			var obj = arr[i].modelData.data;
			var div = $('<div class="shade">'+
						'<a href="#">'+
							'<img src="'+obj.cover+'">'+
							'<div class="shadeLogo">'+createImg(obj.brandInfo)+
							'</div>'+
							'<span></span>'+
							'<div class="shade_son">'+
								'<b><i>'+obj.cFav+'</i></b>'+
								'<b></b>'+
								'<p>'+obj.content+'</p>'+
							'</div>'+
						'</a>'+
					'</div>');
		}
		if(arr[i].modelData.ctList){
			var obj1 = arr[i].modelData.ctList[0];
			var div = $('<div class="shade">'+
						'<a href="#">'+
							'<img src="'+obj1.cover+'">'+
							'</div>'+
						'</a>'+
					'</div>');
		}
		//鼠标经过动画
		div.on('mouseenter',function(){
			$(this).css("top","-3px");
		})
		div.on('mouseleave',function(){
			$(this).css("top","3px");
		})
		//点赞部分的显示隐藏
		div.on('mouseenter',function(){
			$(this).find('.shade_son').show();
		})
		div.on('mouseleave',function(){
			$(this).find('.shade_son').hide();
		})
		var li = getLi('.wrap_middle li');
		li.append(div);
		// console.log(li)
	}
	onoff = true;		
}