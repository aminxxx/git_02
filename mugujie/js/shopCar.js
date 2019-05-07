$(window).on("scroll",function(){
	//顶部搜索框
	var h = window.pageYOffset;
	if(h>=200){
		$("#location").slideDown();
	}else if(h<200){
		$("#location").slideUp();
	}
})


function info(){
	/* var num = window.localStorage.getItem("num");
	var price = window.localStorage.getItem("price");
	var img = window.localStorage.getItem("img");
	var text = window.localStorage.getItem("text");
	var size = window.localStorage.getItem("size"); */
	
	function count(obj){
		
		var html = '<input type="checkbox">'+
					'<img src="'+obj.img+'">'+
					'<p class="font">'+obj.text+'</p>'+
					'<div class="size">'+
						'<span>颜色：<b>黄色</b></span>'+
						'<span>尺码：<b>'+obj.size+'</b></span>'+
					'</div>'+
					'<span class="sprice">'+obj.price+'</span>'+
					'<p class="cloth_count">'+
						'<button class="btn1">-</button>'+
						'<input type="text" id="num" value="'+obj.num+'">'+
						'<button class="btn2">+</button>'+
					'</p>'+
					'<span class="all_sprice">'+obj.num*(obj.price.substring(1))+'.00</span>'+
					'<i class="del">删除</i>';
					
		var div = $('<div class="cloth">'+html+'</div>');		
			
		$(".wrap").append(div.html(html));
		//减减
		div.find('.btn1').on('click',function(){
			var arr = JSON.parse(window.localStorage.infoArr);
			var index = div.index();
			if(!(arr[index].num == 0)){
				arr[index].num = arr[index].num-1;		
				window.localStorage.infoArr=JSON.stringify(arr);
			}
			arr = JSON.parse(window.localStorage.infoArr);
			$(".wrap").html('');
			for(var i=0;i<arr.length;i++){
				count(arr[i])
			}		
		})
		//加加
		div.find('.btn2').on('click',function(){
			var arr = JSON.parse(window.localStorage.infoArr);
			var index = div.index();
			console.log(index)
			
			arr[index].num = parseInt(arr[index].num)+1;//+没有隐式转换	
			window.localStorage.infoArr=JSON.stringify(arr);
			
			arr = JSON.parse(window.localStorage.infoArr);
			$(".wrap").html('');
			for(var i=0;i<arr.length;i++){
				count(arr[i])
			}		
		})
		//删除
		div.find('.del').on('click',function(){
			var arr = JSON.parse(window.localStorage.infoArr);
			var index = div.index();
			arr.splice(index,1);
			
			window.localStorage.infoArr=JSON.stringify(arr);
			arr = JSON.parse(window.localStorage.infoArr);
			$(".wrap").html('');
			for(var i=0;i<arr.length;i++){
				count(arr[i])
			}		
		})
		
	}
	
	
	
	if(window.localStorage.infoArr){
		var arr = JSON.parse(window.localStorage.infoArr);
		for(var i=0;i<arr.length;i++){
			count(arr[i])
		}
 	}
}
info()
