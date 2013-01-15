function Tiger(op){
	this.tiger=op.tiger;
	this.timer=[];
};
Tiger.prototype={
	rolling:function(md,x,c){
		md=md.get(0);
		return function(){			
			if(md.scrollTop>=($(md).height()*(c-1))){
				md.scrollTop=0;
			}else{
				md.scrollTop=md.scrollTop+x;
			}
		};
	},
	play:function(){
		var that =this;
		for(var i = 0;i<3;i++){
			that.timer.push(setInterval(that.rolling(that.tiger.filter("div").eq(i),32,10),10));
		}
	},
	_stop:function(md,idx){
		var that =this;
		md=md.get(0);
		clearInterval(that.timer[0]);
		that.timer=that.timer.slice(1);
		md.scrollTop=parseInt(idx)*128;
	},
	stop:function(cb){
		setTimeout(function(){
			cb&&cb();
		},1600);
		var that =this;
		var s = "777".split("");
		setTimeout(function(){
			that._stop(that.tiger.filter("div").eq(0),s[0]);	
			setTimeout(function(){
				that._stop(that.tiger.filter("div").eq(1),s[1]);	
				setTimeout(function(){
					that._stop(that.tiger.filter("div").eq(2),s[2]);				
					},800);
				},800);
		},0);
	}
};