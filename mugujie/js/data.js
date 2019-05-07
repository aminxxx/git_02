

var fs = require("fs");

fs.readFile('1.txt',function(err,data){
	
	var b = data.toString();
	//var str = b.replace(/\s+/g,'');
	//var obj = JSON.parse(b);

 	var obj = JSON.parse(b).data[110119].list;
 	//console.log(obj);
	
// 	var arr = [];
// 	var num = -1;
// 	for(var attr in obj){
// // 		if(obj[attr].list.length != 0){
//  			num++;
// // 			//console.log(obj[attr],num)
// // 			arr[num] = {
// // 				list:obj[attr].list
// // 			};
// // 		}
// 		if(num == 2){
// 			arr = obj[attr].list
// 		}
// 		//console.log(obj[attr].list[0])
// 	}
	
//  	console.log(obj[0])
//  	//var str = JSON.stringify(arr)
	    var str = JSON.stringify(obj)

	fs.writeFile('2.txt',str,function(err){
		
	});
	
})

// function fn(arr){
// 	var arr1 = [];
// 	for(var k=0;k<arr1.length;k++){
// 		arr1[k] = {
// 			link:arr[k].link
// 		}
// 	}
// 	
// 	return arr1;
// }
// 
// 
// fs.readFile('1.txt',function(err,data){
// 	var b = data.toString();
// 	var obj = JSON.parse(b);
// 	var arr = [];
// 	
// 	for(var i=0;i<obj.length;i++){
// 		arr[i] = {
// 			list:fn(obj[i].list)
// 		};
// 		
// 		//console.log(obj[i].list.length)
// 		
// 		
// 		
// 	}
// 	var str = JSON.stringify(arr);
// 	console.log(arr)
// 	fs.writeFile('2.js',str,function(err){
// 			
// 	});
// // 	
// })
// 







