function path(dom1,dom2){
	let x1 = dom1.data("x");
	let y1 = dom1.data("y");
	let x2 = dom2.data("x");
	let y2 = dom2.data("y");
	if (x1==x2 || y1==y2) {
		if (path0(x1,y1,x2,y2)) {//在一条直线，并且中间没格子挡着
			return true
		}else{
			return path0_2(x1,y1,x2,y2);//在一条直线，但是转了两次弯
		}
	}else {
		if (path1(x1,y1,x2,y2)) { //不在直线上，但是只转了一次弯
			return true
		}else {
			return path2_inside (x1,y1,x2,y2)
		}
	}

	function path0(x1,y1,x2,y2){//在一条直线，并且不考虑转弯的情况
		let bool = "";
		let equal =  "";
		let max ;
		if (x1==x2) {
			equal = 1;
			max = y1-y2>0?y1:y2;
			bool = Math.abs(y1-y2)
		}else if (y1==y2) {
			max = x1-x2>0?x1:x2;
			bool = Math.abs(x1-x2)
		}

		if (bool==1) { //判断特殊情况：相邻
			return true
		}else if (typeof bool =="number") { //这样写是为了担心程序错误引用这个函数，造成报错
			if (equal==1) {//判断是X轴相等还是Y轴相等
				//console.log("x相等");
				for(var i = 1; i < bool; i++){
					if (!$(`.x${x1}y${max-i}`).hasClass("over")) {
						return false
					}
				}
				return true
			}else{
				//console.log("y相等");
				for(var i = 1; i < bool; i++){
					if (!$(`.x${max-i}y${y1}`).hasClass("over")) {
						return false
					}
				}
				return true
			}
		}else{
			return false
		}
	}
	function path0_2 (x1,y1,x2,y2) {
		if (x1==x2) {
			if (x1 == 1 ||x1 == 10) {
				return true
			}
			for(var i = -x1+1; i < 10-x1; i++){//这样就可以从0-10全部判断
				if (i==0) {
					continue//跳出本次循环
				}
				if ($(`.x${x1+i}y${y1}`).hasClass("over") && $(`.x${x2+i}y${y2}`).hasClass("over")) {
					if (path0( x1+i, y1, x2+i), y2) {
						return true
					}
				}
			}
			return false
		}else if (y1==y2) {
			if (y1 == 1 ||y1 == 10) {
				return true
			}
			for(var i = -y1+1; i < 10-y1; i++){
				if (i==0) {
					continue//跳出本次循环
				}
				if ($(`.x${x1}y${y1+i}`).hasClass("over") && $(`.x${x2}y${y2+i}`).hasClass("over")) {
					if (path0( x1, y1+i, x2, y2+i)) {
						return true
					}
				}
			}
			return false
		}
	}
	function path1(x1,y1,x2,y2){
		//这个函数是判断只有一次转弯的情况
		let left,right;
		if (x1>x2) {//判断谁在左右
			left={x:x2,y:y2}
			right={x:x1,y:y1}
		}else{
			left={x:x1,y:y1}
			right={x:x2,y:y2}
		}
		//第二步，判断路径
		//一个弯，肯定是X+Y轴的形式，所以，此处只判断X轴更改，判断Y轴相同的情况
		//
		//此处是不断改变两个dom的X轴的坐标来判断
		//
		//另一种是改变一个dom的XY轴来判断
		//
		for(var i = 1;i<=right.x-left.x;i++){
			//先走left
			if (!$(`.x${left.x+i}y${left.y}`).hasClass("over")) {
				break;
			}
			if (left.x+i == right.x) {
				if (path0(left.x+i,left.y,right.x,right.y)) {
					return true
				}
			}
		}
		for(var i = 1;i<=right.x-left.x;i++){
			//再走right
			if (!$(`.x${right.x-i}y${right.y}`).hasClass("over")) {
				break;
			}
			if (left.x == right.x-i) {
				if (path0(left.x,left.y,right.x-i,right.y)) {
					return true
				}
			}
		}
		return false
	}
	function path2_inside (x1,y1,x2,y2){
		//思路
		//两个弯有两种组合情况，yxy，xyx；
		//这样就不能使用之前的方法，更改两个dom的X值，
		//现在尝试第二种方法，更改一个dom的x，y轴，来判断能不能形成直角
		//
		//
		//先横着走
		let i;
		let str = "";
		let min = max = true;
		for(i = 1 ; i < 10; i++){//这样就可以从0-10全部判断
			if (min) {
				str = `.x${x1-i}y${y1}`;
				if (!$(str)) {
					continue
				}
				if ($(str).hasClass("over")) {
					if (path1( x1-i, y1, x2, y2)) {
						return true
					}
				}else {
					min = false;
				}
			}
			if (max) {
				str = `.x${x1+i}y${y1}`;
				if (!$(str)) {
					continue
				}
				if ($(str).hasClass("over")) {
					if (path1( x1+i, y1, x2, y2)) {
						return true
					}
				}else {
					max = false;
				}
			}
			if (max==false&&min==false) {
				min = max = true;
				break;
			}
		}
		//再竖着走
		for(i = 1; i<10; i++){
			if (min) {
				str = `.x${x1}y${y1-i}`;

				if ($(str).hasClass("over")) {
					if (path1( x1, y1-i, x2, y2)) {
						return true
					}
				}else {
					min = false;
				}
			}
			if (max) {
				str = `.x${x1}y${y1+i}`;
				if ($(str).hasClass("over")) {
					if (path1( x1, y1+i, x2, y2)) {
						return true
					}
				}else {
					max = false;
				}
			}
			if (max==false&&min==false) {
				break;
			}
		}
		return false
	}
}