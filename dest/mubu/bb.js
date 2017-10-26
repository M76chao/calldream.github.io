var bb = {
	template:"#bb",
	props:["value","index","num"],
	name:"cc",
	data:function () {
		let nm;
		this.num==1?nm=0:nm=this.num+40;
		return {
			bval:[].concat(this.value),
			nm:nm,
		}
	},
	methods:{
		keydown:function(eve){
					if (eve.key==="Enter") {
						eve.preventDefault();
					};
					if (eve.shiftKey===false && eve.key==='Tab') {
						eve.preventDefault();
					};
					if (eve.shiftKey && eve.key==='Tab') {
						eve.preventDefault();
					};						
				},
		keyup:function(old,eve)	{
			//console.log(eve);
			if (eve.key==="Enter") {
				this.bval.splice(old+1,0,'')
				this.$emit('update:value', this.bval);
			}else if (eve.shiftKey===false && eve.key==='Tab') {
				//只有tab键
				let n = this.bval.splice(old,1);
				this.bval.splice(old,0,n);
				this.$emit('update:value', this.bval);
			}else if (eve.shiftKey && eve.key==='Tab') {
				let a = this.bval.splice(old,1).toString();
				//console.log(a);
				this.$emit("stab",[this.index,a]);
			}else {
				this.bval[old]=eve.srcElement.innerText;
				this.$emit('update:value', this.bval);
				console.log(this.value);
			}
			//console.log(app.arr);
		},
		stab:function(e){
			this.bval.splice(e[0]+1,0,e[1])
		}
	},
	watch:{ //以父组件的名义向上一级父组件传值
		bval:function(){
			this.$emit('update:value', this.bval)
		},
		/*value:function(){
			this.bval = [].concat(this.value);
		}*/
	}
}