function init (){
	createSmall();
	createImg();
}

function createSmall(){
	let smallX,smallY ;
	let conter = $("#conter");
	for(var i=0;i<=11;i++){
		smallY = document.createElement("div");
		smallY.data({y:10-i}).className= "x";
		for(var j =0;j<=11;j++){
			
			//
			//addPath
			smallX = document.createElement("div");
			if (i==0 ||i==11||j==0||j==11) {
				smallX.data({y:11-i,x:j}).className="over bgc "+`x${j}y${11-i}`;
			}else {
				smallX.data({y:11-i,x:j}).className="noimg "+`x${j}y${11-i}`;
				smallX.onclick = smallClick;
			}
			smallY.appendChild(smallX);
		}
		conter.appendChild(smallY);
	}
}
var imgArr = { //这个是类名的集合，kay不重要，值需要和css的值配合相等
	a:"a",
	b:"b",
	c:"c",
	d:"d",
	e:"e",
	f:"f",
	g:"g",
	f:"f"
}
function createImg(){
	let yArr = $(".noimg","All");
	let kArr = [];
	for(var k in imgArr){
		kArr.push(k);
	}
	k = kArr[random(kArr.length-1)];
	yArr[yArr.length-1].addClass(imgArr[k]).removeClass("noimg").data({setImg:true,src:imgArr[k]});
	if (yArr.length>2) {
		yArr[random(0,yArr.length-2)].addClass(imgArr[k]).removeClass("noimg").data({setImg:true,src:imgArr[k]});
		createImg()
	}else{
		yArr[0].addClass(imgArr[k]).removeClass("noimg").data({setImg:true,src:imgArr[k]});
	}
}

var first , last;
function smallClick (){
	if (first) {
		if (first==this) { //判断重复点击
			return
		}
		if (first.data("src")==this.data("src")) {
			if (path(first,this)) {
				first.addClass("over");
				this.addClass("over");
			}
		}
		first.id = "";
		first = undefined;
		if ($(".over","All").length==100) {
			console.log("winner");
		}
	}else{
		this.id = "focus";
		first=this;
	}
}