function Flow(opt){
	this.arr = [];
	this.cache=[];
	this.cols = opt.cols;
	this.count = opt.count;
}
Flow.prototype={

	random:function(min, max) {
	    if (max == null) {
	      	max = min;
	      	min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	},

	init:function(){
		for (var i = 0; i < this.count; i++) {
			var obj = {
				background:"rgb("+this.random(0,255)+","+this.random(0,255)+","+this.random(0,255)+")",
				height:this.random(100,200)+"px"
			};
			this.arr.push(obj);
		}
		this.render();
	},

	render:function(){
		for (var i = 0; i < this.arr.length; i++) {
			var el = document.createElement("div");
			el.innerHTML=i+1;
			el.style.backgroundColor = this.arr[i].background;
			el.style.height = this.arr[i].height;
			var p = this.getPosition();
			el.style.top=p.top;
			el.style.left = p.left;
			this.addCache(el);
			document.getElementById("flow1").appendChild(el);
		}
	},

	addCache:function(el){
		if(this.cache.length<this.cols){
			this.cache.push(el);
		}else{
			this.cache.push(el);
			this.cache.shift();
		}
		return this.cache;
	},

	getPosition:function(){
		var l = this.cache.length;
		if(l==0)
			return {top:0,left:0};
		if(l<this.cols){
			return {top:this.cache[l-1].style.top,left:(parseInt(this.cache[l-1].style.left)+960/this.cols)+"px"};
		}else{
			var _cache = this.cache;
			_cache.sort(function(x,y){
				var _x = parseInt(x.style.top)+parseInt(x.style.height);
				var _y = parseInt(y.style.top)+parseInt(y.style.height);
				return _x >	_y;
			});
			var _top  = parseInt(_cache[0].style.top)+parseInt(_cache[0].style.height);
			return {top:_top+"px",left:_cache[0].style.left};
		}
	}

};

var flow = new Flow({
	cols:5,
	count:100
});
flow.init();