/* 
| jQuery.Wallflip v0.2
| 
| Copyright (c) 2013 João Ribeiro
|
| Contribuitions
| - Design and inspiration from the tutorial made by Martin Angelov (http://tutorialzine.com/2010/03/sponsor-wall-flip-jquery-css/)
| - Built on top of flip plugin from Luca Manno (http://lab.smashup.it/flip/)
| - Also a lot of credit to jQuery and jQuery UI Team
|
| Licenced under MIT Licence (See LICENCE file for more information)
 */

;(function($) {

	/**** Global flag to keep track of fliped elements ****/
	var currentFliped = [];
	/**** Global flag to keep track of running animations (prevent multiple clicks) ****/
	var animationRunning = [];

	/**** Default Options ****/
	var defaults = {
		oneAtTime: true,
		fontSize: null,
		fontFamily: null,
		fontStyle: null	
	};
	
	var item_defaults = {
		image: "",
		description: "",
		link: "",
		link_name: ""
	};

	/**** Constructor Function ****/
	function Wallflip(element, options){
		currentFliped[element.attr("id")] = null;
		this.config = $.extend(true, {}, defaults, options);
		this.element = element;
		this.init();
	}
	
	/**** Init Function ****/
	Wallflip.prototype.init = function() {
		var mainDiv = this.element;
		var config = this.config;
		var item_config, unique_class;
		
		mainDiv.addClass("sponsorListHolder");
		
		/**** Generate unique class name to each plugin to allow different styling between plugins ****/
		unique_class = "wallFlipData" + new Date().getTime();
		
		for (var x = 0,y = this.config.items.length; x < y; x++)
		{
			/**** Extend item_default option to prevent undefined options ****/
			item_config = $.extend(true, {}, item_defaults, this.config.items[x]);
			
			mainDiv.append("<div class='sponsor' title='Click to flip'> \
				<div class='sponsorFlip'> \
					<img src='" + item_config.image +"' alt='" + item_config.description + "' /> \
				</div> \
				<div class='sponsorData'> \
					<div class='sponsorDescription " + unique_class + "'> \
						" + item_config.description + " \
					</div> \
					<div class='sponsorURL " + unique_class + "'> \
						<a href='" + item_config.link + "' target='_blank'>" + item_config.link_name + "</a> \
					</div> \
				</div> \
			</div>");
		}
		
		if(config.fontSize !== null){$("." + unique_class).css({"font-size" : config.fontSize.replace(" ", "")});}
		if(config.fontFamily !== null){$("." + unique_class).css({"font-family" : config.fontFamily});}
		if(config.fontStyle !== null){$("." + unique_class).css({"font-style" : config.fontStyle});}
		
		mainDiv.find(".sponsorFlip").bind("click",function(){
			var elem = $(this);
			
			if(elem.data("flipped") === true){
				/**** Revert Flip ****/
				elem.revertFlip();	
				/**** Unset fliped flags ****/
				elem.data("flipped",false);
				if(config.oneAtTime){currentFliped[mainDiv.attr("id")] = null;}
			}
			else if(animationRunning[mainDiv.attr("id")] !== true || !config.oneAtTime){
				/**** Revert flip other fliped elements before flip the new one ****/
				if(currentFliped[mainDiv.attr("id")] != null && config.oneAtTime)
				{
					currentFliped[mainDiv.attr("id")].revertFlip();
					currentFliped[mainDiv.attr("id")].data("flipped",false);
				}
				/**** Flip the element ****/
				elem.flip({
					direction:"lr",
					speed: 350,
					onBefore: function(){
						/**** Fill the hidden back area ****/
						elem.html(elem.siblings(".sponsorData").html());
						if(config.oneAtTime){animationRunning[mainDiv.attr("id")] = true;}
					},
					onEnd: function(){
						if(config.oneAtTime){animationRunning[mainDiv.attr("id")] = false;}
					}
				});
				/**** Set the fliped flags ****/
				elem.data("flipped",true);
				if(config.oneAtTime){currentFliped[mainDiv.attr("id")] = elem;}
			}
			
		});	
	}
	
	/**** Main Plugin Function ****/
	$.fn.wallflip = function(options) {
		new Wallflip(this, options);
		return this;
	};
	
}(jQuery));