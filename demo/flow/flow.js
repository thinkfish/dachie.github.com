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
				/* '#' + (Math.random() * 0xffffff << 0).toString(16)*/
				height:this.random(100,200)+"px"
			};
			this.arr.push(obj);
		}
		this.render();
	},

	render:function(){
		var that = this;
		var els = document.createDocumentFragment();
		var i = 0;
		var timer = setInterval(function(){
			var el = document.createElement("div");
			el.innerHTML=i+1;
			el.style.backgroundColor = that.arr[i].background;
			el.style.height = that.arr[i].height;
			var p = that.getPosition();
			el.style.top=p.top;
			el.style.left = p.left;
			that.addCache(el);
			els.appendChild(el);
			i++;
			if(i%that.cols==0){
				document.getElementById("flow1").appendChild(els);
				els = document.createDocumentFragment();
			}
			if(!(i<that.arr.length)){
				clearInterval(timer);
				document.getElementById("flow1").appendChild(els);
			}
		}, 300);
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
			var _cache = this.cache.slice(0);
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