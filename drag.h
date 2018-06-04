<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Document</title>
	<style>
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		/*body {
			padding-left: 50px;
		}*/
		.father {
			width: 100%;
			height: 600px;
			display: flex;
			position: relative;
		}
		.father div {
			height: 100%;
		}
		.center {
			width: 10px;
			/*margin-left: -5px;*/
			background-color: #0f0;
		}
		.left {
			width: 250px;
			background-color: #f00;
		}
		.right {
			background-color: #00f;
			width: calc(100% - 260px);
		}
	</style>
</head>
<body>
	<div class="father">
		<div class="left">
			
		</div>
		<div class="center">
			
		</div>
		<div class="right">
			
		</div>
	</div>

<script type="text/javascript">
	function drag (data){
		if(!data.srcDom){
			console.warn("srcDom不可为空");return;
		}
		var obj = {};
		obj.srcDom = document.querySelector(data.srcDom);
		obj.previous = data.left||obj.srcDom.previousElementSibling;
		obj.father = data.father||obj.srcDom.offsetParent;
		obj.next = data.right||obj.srcDom.nextElementSibling;
		
		obj.left = 0;
		obj.srcDomWidth = obj.srcDom.offsetWidth;
		obj.up = function(){
			obj.left = 0;
			obj.father.removeEventListener("mousemove",obj.move);
		}
		obj.srcDom.addEventListener("mouseup",function(){obj.up()});
		obj.father.addEventListener("mouseup",function(){obj.up()});
		obj.warn = function (){
			console.warn("这个插件只支持ie10及以上，2018.6.4开始我们不在支持太低的版本浏览器");
			obj.move = undefined;
		}
		obj.move = function (e){
			if( e.layerX == undefined){
				obj.warn();
				return;
			}
			if(e.buttons == 0){ //优化用户拖动窗口之外又回来的情况
				//console.log(2);
				obj.up();
				return;
			}
			var left = e.layerX - obj.left;
			if(data.min){
				if(left<data.min){
					return;
				}
			}
			if(data.max){
				if(left>data.max){
					return;
				}
			}
			obj.previous.style.width = left +"px";
			obj.next.style.width = "calc(100% - " + obj.srcDomWidth + "px - "+ left +"px)";
		}
		obj.srcDom.addEventListener("mousedown",function(e){
			obj.left = e.offsetX;
			obj.father.addEventListener("mousemove",obj.move)
		},false);
	}
	drag({
		srcDom:".center",
		min:100,
		max:500
	})
</script>
</body>
</html>
