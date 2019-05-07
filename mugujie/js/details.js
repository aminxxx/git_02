var list = document.getElementsByClassName('cloth_list')[0];
var lis = list.getElementsByTagName('li');
var box = document.getElementsByClassName('mImg')[0];
var mImg = box.getElementsByTagName('img')[0];
var glass = document.getElementsByClassName('glass')[0];
var xImg = glass.getElementsByTagName('img')[0];

for(var i=0;i<lis.length;i++){
	(function(index){
		lis[i].onmouseenter = function(){//鼠标移入
			mImg.src = 'img/c'+index+'.jpg';
			xImg.src = 'img/c'+index+'.jpg';
		}
	})(i)
}
//放大镜
console.log( box.getBoundingClientRect());
box.onmouseenter = function(){//鼠标移入
	var div = document.createElement('div');//创建盒子
	div.className = 'item';//给盒子添加类名
	box.appendChild(div);//插入盒子
	
	glass.style.display = 'block';
	document.onmousemove = function(ev){
		var position = box.getBoundingClientRect();//获取box的位置信息
		var l = position.left;//取出box的left值
		var t = position.top;//取出box的top值
		var x = ev.pageX - l;//鼠标当前的位置减去盒子的差值
		var y = ev.pageY - t;
		var divTop = 0;
		var divLeft = 0;
		//console.log(l,t,x,y);
		
		if(0<=x && x<=(div.offsetWidth/2)){//判断鼠标左侧移动的位置是否在超过小盒子的一半
			divLeft = 0;//没有,小盒子的位置则不变
		}else if(x>(div.offsetWidth/2) && x < (box.offsetWidth-(div.offsetWidth/2))){//判断鼠标移动的位置是否超出了小盒子的一半,并且小于大盒子减掉小盒子的一半的距离
			divLeft = x-(div.offsetWidth/2);//是,则在这两者距离之间运动,并且让鼠标在小盒子里面居中
		}else if(x>(box.offsetWidth-(div.offsetWidth/2))){//判断鼠标
			divLeft = box.offsetWidth-(div.offsetWidth);
		}
		
		if( 0 <=y && y <= (div.offsetHeight/2)){
			
			divTop = 0;
			
		}else if( y >= (div.offsetHeight/2) && y < (box.offsetHeight-(div.offsetHeight/2))){
			divTop = y-(div.offsetHeight/2);
			
		}else if(y>(box.offsetHeight-(div.offsetHeight/2))){
			divTop = box.offsetHeight-(div.offsetHeight);
		}
		div.style.left = divLeft + 'px';
		div.style.top = divTop + 'px';
		
		var xScroll = divLeft/(box.offsetWidth-(div.offsetWidth));
		var yScroll = divTop/(box.offsetHeight-(div.offsetHeight));
		
		var maxW = xImg.offsetWidth - glass.offsetWidth;
		var maxH = xImg.offsetHeight - glass.offsetHeight;
		
		// console.log(maxW,maxH,xScroll,yScroll);
		xImg.style.left = -xScroll*maxW + 'px';
		xImg.style.top = -yScroll*maxH + 'px';
		
	}
	box.onmouseleave = function(){
		document.onmousemove = null;
		glass.style.display = 'none';
		box.removeChild(div);
		//this.getElementsByClassName('item')[0].remove();
	}
}

//购物车加减
count();
function count(){
	var bt1 = document.getElementById("bt1");
	var bt2 = document.getElementById("bt2");
	var text = document.getElementById("num");
	var num = text.value;
	//点击 -
	bt1.onclick = function(){
		if(num==0){
			num = 0;
		}else{
			num--;
		}
		//把值赋回给value
		text.value = num;
	}
	//点击 +
	bt2.onclick = function(){
		num++
		text.value = num;
	}
	
	//获取 被修改过的input框的值
	text.oninput = function(){
		bt1.onclick = function(){
			if(text.value==0){
				text.value = 0;
			}else{
				text.value--;
			}
			//把值赋回给value
			text.value = text.value;
		}
		bt2.onclick = function(){
			text.value++
			text.value = text.value;
		}
	}
}
//点击添加至购物车
function shopCar(){
	//先获取所有用户的对象//变成数组
	if(window.localStorage.infoArr){//判断是否存在
		var arr = JSON.parse(window.localStorage.infoArr);
	}else{
		var arr= [];//创建一个新数组
	}
	
	var obj = {}
	
	
	var cloth_size = document.getElementsByClassName("cloth_size")[0]
	var span = cloth_size.getElementsByTagName("span")[0]
	span.onclick = function(ev){
		if(ev.target.nodeName == 'B'){
			var size = ev.target.innerHTML;
			ev.target.style.border = '2px solid #333';
		}
		//window.localStorage.setItem('size',size);
		obj.size = size;
	}
	
	var cloth_color = document.getElementsByClassName("cloth_color")[0]
	cloth_color.onclick = function(ev){
		if(ev.target.nodeName == 'IMG'){
			ev.target.style.border = '2px solid #999';
			var img = ev.target.getAttribute('src');
		}
		//window.localStorage.setItem('img',img);
		obj.img = img;
	}
	
		
	$(".add").on("click",function(){
		//判断有没有登录
		var html = $(".login a").html();
		console.log(html);
		if(html == '未登录'){
			console.log(1)
			window.open('login.html',"_blank");//打开新页面
		}
		
		
		
		var text = $(".cloth_details h3").html();
		var price = $(".price_num ").html();
		var num = $("#num").val();
		/* window.localStorage.setItem('text',text);
		window.localStorage.setItem('num',num);
		window.localStorage.setItem('price',price); */
		
		obj.text = text;
		obj.num = num;
		obj.price = price;
		arr.push(obj);
		window.localStorage.infoArr=JSON.stringify(arr);
		
		window.open('shopCar.html',"_blank");//打开新页面
		
	})
	$(".now").on("click",function(){
		var text = $(".cloth_details h3").html();
		var price = $(".price_num ").html();
		var num = $("#num").val();
		window.localStorage.setItem('text',text);
		window.localStorage.setItem('num',num);
		window.localStorage.setItem('price',price);
	})
}
shopCar()