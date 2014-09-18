var touchFunc = function(obj,type,func) {
    //滑动范围在5x5内则做点击处理，s是开始，e是结束
    var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
    var sTime = 0, eTime = 0;
    type = type.toLowerCase();
 
    function getPercentX(tx){
    	return Math.round(10000 * tx / document.body.clientWidth) / 100.0;
    }
    function getPercentY(ty){
    	return Math.round(10000 * ty / document.body.clientHeight) / 100.0;
    }

    obj.addEventListener("touchstart",function(){
        sTime = new Date().getTime();
       	var pageX = event.targetTouches[0].pageX;
       	var pageY = event.targetTouches[0].pageY;
        init.sx = pageX;
        init.sy = pageY;
        init.ex = init.sx;
        init.ey = init.sy;
        if(type.indexOf("start") != -1)
        {
        	func(obj,
        		"start",
        		{
        			"stopEvent":function(){event.stopPropagation()},
        			"stopDefault":function(){event.preventDefault()},
        			"touchX":pageX,
        			"touchY":pageY,
        			"percentX":getPercentX(pageX),
        			"percentY":getPercentY(pageY)
        		}
        	);
        }
    }, false);
 
    obj.addEventListener("touchmove",function() {
        event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
       	var pageX = event.targetTouches[0].pageX;
       	var pageY = event.targetTouches[0].pageY;
        init.ex = pageX;
        init.ey = pageY;
        if(type.indexOf("move")!=-1)
        {
        	func(obj,
        		"move",
        		{
        			"stopEvent":function(){event.stopPropagation()},
        			"stopDefault":function(){event.preventDefault()},
        			"touchX":pageX,
        			"touchY":pageY,
        			"percentX":getPercentX(pageX),
        			"percentY":getPercentY(pageY)
        		}
        	);
        }
    }, false);
 
    obj.addEventListener("touchend",function() {
        var changeX = init.sx - init.ex;
        var changeY = init.sy - init.ey;
        if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>init.y)
        {
            //左右事件
            if(changeX > 0) {
                if(type.indexOf("left")!=-1)
                {
                	func(obj,
                		"left",
                		{
        					"stopEvent":function(){event.stopPropagation()},
        					"stopDefault":function(){event.preventDefault()},
                			"changeX":changeX,
                			"changeY":changeY,
        					"percentX":getPercentX(changeX),
        					"percentY":getPercentY(changeY)
                		}
                	);
                }
            }else{
                if(type.indexOf("right")!=-1)
                {
                	func(obj,
                		"right",
                		{
        					"stopEvent":function(){event.stopPropagation()},
        					"stopDefault":function(){event.preventDefault()},
                			"changeX":changeX,
                			"changeY":changeY,
        					"percentX":getPercentX(changeX),
        					"percentY":getPercentY(changeY)
                		}
                	);
                }
            }
        }
        if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>init.x)
        {
            //上下事件
            if(changeY > 0) {
                if(type.indexOf("top")!=-1)
                {
                	func(obj,
                		"top",
                		{
        					"stopEvent":function(){event.stopPropagation()},
        					"stopDefault":function(){event.preventDefault()},
                			"changeX":changeX,
                			"changeY":changeY,
        					"percentX":getPercentX(changeX),
        					"percentY":getPercentY(changeY)
                		}
                	);
                }
            }else{
                if(type.indexOf("down")!=-1)
                {
                	func(obj,
                		"down",
                		{
        					"stopEvent":function(){event.stopPropagation()},
        					"stopDefault":function(){event.preventDefault()},
                			"changeX":changeX,
                			"changeY":changeY,
        					"percentX":getPercentX(changeX),
        					"percentY":getPercentY(changeY)
                		}
                	);
                }
            }
        }
        if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y)
        {
            eTime = new Date().getTime();
            //点击事件，此处根据时间差细分下
            if((eTime - sTime) > 300) {
                if(type.indexOf("long")!=-1) //长按
                {
                	func(obj,
                		"long",
                		{
        					"stopEvent":function(){event.stopPropagation()},
        					"stopDefault":function(){event.preventDefault()}
                		}
                	);
                }
            }
            else {
                if(type.indexOf("click")!=-1) //当点击处理
                {
                	func(obj,
                		"click",
                		{
        					"stopEvent":function(){event.stopPropagation()},
        					"stopDefault":function(){event.preventDefault()}
                		}
                	);
                }
            }
        }
        if(type.indexOf("end")!=-1) func();
    }, false);
};