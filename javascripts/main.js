$(function(){
	$("ul.tabs li").bind("mouseover",function(){
			var $that = $(this);
			var idx = $that.index();
			$that.addClass("cur").siblings().removeClass("cur");
			$that.parents(".tabs").next().children().eq(idx).show().siblings().hide();
	});
	$("ul.tabs li:first").mouseover();
});
