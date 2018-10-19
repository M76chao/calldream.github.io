function $() {
	return arguments.length==1?document.querySelector(arguments[0]):document.querySelectorAll(arguments[0])
}
function random (){
	//不传参数随机出现0-10
	//传一个参数的时候，代表0-max
	//传两个参数的时候，代表min-max
	var arr = [0,1,2,3,4,5,6,7,8,9,10];
	var index ;
	function max(){
		var j = Math.round(Math.random()*10)/10;
		if(Math.floor(j * 12)==12){
			max();
		}else{
			index = Math.floor(j * 12);
		}
	}
	max();
	let s = arr[index];
	if (arguments.length==0) {
		return s;
	}else if (arguments.length==1) {
		//这么做增加随机出现概率
		let fudon = Math.floor(s/10*(arguments[0]+1));
		if (fudon == arguments[0]+1) {
			return random(arguments[0])
		}else{
			return fudon
		}
	}else {
		//貌似js机制有问题，算术最后会出现问题，
		return Math.floor(s/10 * ( arguments[1] - arguments[0] ) + arguments[0])
	}
}
$("div").__proto__.data = function(argument) {
		if(typeof argument == "string"){
			if (typeof this.dataText !== "undefined") {
				return this.dataText[argument];
			}
		}
		if(typeof argument == "object"){
			if (typeof this.dataText == "undefined") {
				this.dataText = argument;
			}else{
				//合并对象assign方法，ie11及以下不支持
				this.dataText = Object.assign(this.dataText,argument);
			}
		}
		return this;
	};
$("div").__proto__.addClass = function() {
	if (arguments.length==0) {
		console.log("addClass方法需要参数");
		return this;
	}
	let clArr = this.className.split(" ");
	let newClassName = [];
	for(var k in arguments ){
		let bool = true ;
		for(var j in clArr ){
			if (arguments[k]==clArr[j]) {
				bool = false;
			}
		}
		if (bool) {
			newClassName.push(arguments[k])
		}
	}
	this.className = clArr.join(" ") + " " +  newClassName.join(" ");
	return this;
};
$("div").__proto__.removeClass = function() {
	if (arguments.length==0) {
		console.log("removeClass方法需要参数");
		return this;
	}
	let clArr = this.className.split(" ");
	var del = 0;
	for(var k in arguments ){
		del = clArr.indexOf(arguments[k])
		if (del>=0) {
			clArr[del]="";
		}else{
			console.log("原class中没有："+arguments[k]);
		}
	}
	this.className = clArr.join(" ") ;
	return this;
};
$("div").__proto__.hasClass = function() {
	if (arguments.length==0) {
		console.log("hasClass方法需要参数");
		return this;
	}
	let clArr = this.className.split(" ");
	let del = false;
	if (clArr.indexOf(arguments[0])>=0) {
		del = true;
	}else{
		del = false;
	}
	return del;
};