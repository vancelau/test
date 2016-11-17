window.onload = function () {
	var dom = document.getElementById('clock');//得到clock的dom对象
	var ctx = dom.getContext('2d');//得到一个提供了用于在画布上绘图的方法和属性的对象
	var width = ctx.canvas.width;//得到画布的宽度
	var height = ctx.canvas.height;//得到画布的高度
	var r = width/2;//半径
	var rem = width/200;//改变画布宽度的比例

	// 画出时钟背景
	function darwBackground() {
		ctx.save();//保存未转移中心点的
		//绘制外圆
		ctx.translate(r,r);//转移画布中心点到(r,r),即圆心
		ctx.beginPath();//起始路径
		ctx.lineWidth = 10*rem;//设置画线宽度
		ctx.arc(0,0,r-5*rem,0,2*Math.PI,false);//设置一个半径为r-5的圆
		ctx.stroke();//绘制已定义的路径

		//绘制数字
		var i = 0;
		var hNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];//定义时钟数字数组
		for(i in hNumbers){//遍历数组
			var rad = 2 * Math.PI / 12 *i;//每个数字相对开始角对应的角度
			var x = (r-22*rem) * Math.cos(rad);//每个数字相对圆心的x值
			var y = (r-22*rem) * Math.sin(rad);//每个数字相对圆心的y值
			ctx.font = 14*rem + "px Arial";//设置字体大小和类型
			ctx.textAlign = "center";//设置字体左右居中
			ctx.textBaseline = "middle";//设置字体上下居中
			ctx.beginPath();//其实路径
			ctx.fillText(hNumbers[i],x,y);//绘制被填充的文本
		}

		//绘制圆点,方法同上
		for (var j = 0; j < 60; j++) {
			var rad = 2 * Math.PI / 60 *j;
			var x = (r-13*rem) * Math.cos(rad);
			var y = (r-13*rem) * Math.sin(rad);
			ctx.beginPath();
			if (j%5==0) {
				ctx.fillStyle = "#000";
				ctx.arc(x,y,2*rem,0,2*Math.PI,false);
			}
			else{
				ctx.fillStyle = "#ccc";
				ctx.arc(x,y,2*rem,0,2*Math.PI,false);				
			}
			ctx.fill();
		}

	}

	//绘制时针
	function darwHour(hour, minute) {
		ctx.save();//保存未转动的状态
		var rad = 2 * Math.PI / 12 * hour;//小时对应的角度
		var mrad = 2 * Math.PI / 12 / 60 * minute;//每小时内的分钟角度
		ctx.beginPath();
		ctx.rotate(rad + mrad);//转动角度
		ctx.lineWidth = 5*rem;
		ctx.lineCap = "round";//设置线条端点样式
		ctx.moveTo(0,10*rem);//线条起始点
		ctx.lineTo(0,-r/2-5*rem);//线条结束点			
		ctx.stroke();//绘制已定义路线
		ctx.restore();//返回保存未转动的状态
	}

	//绘制分针 方法同上
	function darwMinute(minute) {
		ctx.save();
		var rad = 2 * Math.PI / 60 * minute;
		ctx.beginPath();
		ctx.rotate(rad);
		ctx.strokeStyle = "#ccc";
		ctx.lineWidth = 3*rem;
		ctx.lineCap = "round";
		ctx.moveTo(0,10*rem);
		ctx.lineTo(0,-r/2-15*rem);			
		ctx.stroke();
		ctx.restore();
	}

	//绘制秒针 使用填充方法
	function darwSecond(second) {
		ctx.save();
		var rad = 2 * Math.PI / 60 * second;
		ctx.beginPath();
		ctx.rotate(rad);
		ctx.fillStyle = "#c14543";
		ctx.moveTo(-2*rem,10*rem);
		ctx.lineTo(2*rem,10*rem);
		ctx.lineTo(1*rem,-r/2-25*rem);
		ctx.lineTo(-1*rem,-r/2-25*rem);			
		ctx.fill();
		ctx.restore();
	}

	//绘制中心圆点
	function darwPoint() {
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.arc(0,0,3*rem,0,2*Math.PI,false);
		ctx.fill();
	}

	//绘制整个时钟	
	function darw() {		
		ctx.clearRect(0,0,width,height);//先清除画布
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		darwBackground();
		darwHour(hour, minute);
		darwMinute(minute);
		darwSecond(second);
		darwPoint();
		ctx.restore();//返回保存未转移中心点的状态
	}

	//设置每1000毫秒调用darw函数
	setInterval(darw, 1000);
}
