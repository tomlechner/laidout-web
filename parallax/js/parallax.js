


//    //non-jquery stuff:
//	window.addEventListener("mousemove", MouseMove);
//
//	function HasClass(element, classname)
//	{
//		if (!element || !element.className || !element.className.split) return false;
//		//if(document.getElementById("hello")
//		return element.className.split(" ").indexOf(classname) > -1;
//	}
//
//	function MouseMove(event) 
//	{
//		//if (HasClass(event.target, "comicsContainer") || HasClass(event.target.parentElement, "images")) {
//		if (HasClass(event.target, "comicsContainer")) {
//
//			var x = (event.pageX - event.target.offsetLeft)/event.target.clientWidth;
//			var y = (event.pageY - event.target.offsetTop) /event.target.clientHeight;
//
//			//console.log("mouse move", x,y, event.target.clientWidth, event.target.clientHeight);
//			//console.log("mouse move", x,y , event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop,event.target.clientWidth, event.target.clientHeight, event);
//
//			var i = 0;
//			$(event.target).children().each( function() {
//				//console.log(this.offsetLeft);
//				$(this).css({top: i*20, left: i / 5 * x * event.target.clientWidth});
//				//this.offsetLeft = i * 5 * x;
//				i++;
//			});
//		}
//	}

	$(document).ready(function(){
		//initialize svg based boxes
		var boxes = $(".parallaxSvg");

		boxes.each(function(index, box) {
			//console.log("box: ",index,box);

			var minz = 0, maxz = 0;
			$(box).children().each(function(index, child) {
				var jchild = $(child);
				if (jchild.hasClass("parallax1")) {
				 	var o = $(child);
					var z = o.data("z");
					if (z < minz) minz = z;
					if (z > maxz) maxz = z;
					//console.log("box child", child, index);

					o.data("origLeft", o.attr("x")).data("origTop", o.attr("y"));

				} else if (jchild.hasClass("parallaxBG")) {
				}
			});
			console.log("minz",minz,"maxz",maxz);
			$(box).data("minz", minz).data("maxz", maxz);
		});

		//initialize pure html element based boxes
		$(".comicsContainer").each(function(index, cont) {
			$(cont).children().each(function() {
				var j = $(this);
				j.data("origTop", j.css("top")).data("origLeft", j.css("left"));

				console.log("child of comicsContainer", j, j.css("top"), j.css("left"));
			});
		});

		$(document).mousemove(function(ev) {
			var jev = $(ev.target);
			//console.log(ev);

			if (jev.hasClass("parallaxSvg")) {
				//console.log("ev.target is parallelbox: ",ev.target);
				jev.target.children().each(function() {
					var o = $(this);
					if (!o.hasClass("parallax1")) return;
					o.attr("x", o.attr("x")+.01);
				});

			} else if (jev.hasClass("parallaxBG")) { //svg elements
				var p = jev.parent();
				p.children().each(function() {
					var o = $(this);
					if (!o.hasClass("parallax1")) return;

					var svg = o;
					while (svg && !svg.is("svg")) svg = svg.parent();
					//console.log("svg", svg, "width:", svg.position(), svg.width(),svg.height());

					var z = o.data("z");
					var pos = svg.offset();

					var w = svg.width();
					var h = svg.height();
					var x = (ev.pageX - pos.left)/w; //so 0..1 covering the box
					var y = (ev.pageY - pos.top) /h;

					//console.log(ev.pageX, ev.pageY, ev.target.offsetLeft, ev.target.offsetTop, "x,y",x,y);

					//o.attr("x", parseFloat(o.attr("x"))+.1*z);

					o.attr("y", parseFloat(o.data("origTop"))  + (y-.5)*z*h/50)
					 .attr("x", parseFloat(o.data("origLeft")) + (x-.5)*z*w/50);
				});

			} else if (jev.hasClass("comicsContainer")) {

				var x = (ev.pageX - ev.target.offsetLeft)/ev.target.clientWidth; //so 0..1 covering the box
				var y = (ev.pageY - ev.target.offsetTop) /ev.target.clientHeight;

				//console.log("mouse move", x,y, event.target.clientWidth, event.target.clientHeight);
				//console.log("mouse move", x,y , event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop,event.target.clientWidth, event.target.clientHeight, event);

				var i = 0;
				$(ev.target).children().each( function() {
					//console.log(this.offsetLeft);
					var j= $(this);
					var z = j.data("z");
					var origTop  = parseInt(j.data("origTop"), 10);
					var origLeft = parseInt(j.data("origLeft"), 10);
					//console.log("top,left", origTop, parseInt(origTop,10), origLeft, parseInt(origLeft,10));
					//$(this).css({top: i*20, left: i / 5 * x * ev.target.clientWidth});
					
					$(this).css({top: origTop + (y-.5)*z*ev.target.clientHeight/50, left: origLeft + (x-.5)*z* ev.target.clientWidth/50});

					i++;
				});
			}
		});
	});

