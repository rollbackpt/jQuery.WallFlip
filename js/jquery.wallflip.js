/* 
| Wallflip v0.1
|
| Some licence stuff...
 */

;(function($) {

	/**** Global flag to keep track of fliped elements ****/
	var currentFliped = [];

	/**** Default Options ****/
	var defaults = {
		oneAtTime: true
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
		
		/**** Hard coded test ****/
		mainDiv.addClass("sponsorListHolder");	
		
		var item_config;
		for (var x = 0,y = this.config.items.length; x < y; x++)
		{
			/**** Extend item_default option to prevent undefined options ****/
			item_config = $.extend(true, {}, item_defaults, this.config.items[x]);
			
			mainDiv.append("<div class='sponsor' title='Click to flip'> \
				<div class='sponsorFlip'> \
					<img src='" + item_config.image +"' alt='" + item_config.description + "' /> \
				</div> \
				<div class='sponsorData'> \
					<div class='sponsorDescription'> \
						" + item_config.description + " \
					</div> \
					<div class='sponsorURL'> \
						<a href='" + item_config.link + "' target='_blank'>" + item_config.link_name + "</a> \
					</div> \
				</div> \
			</div>");
			
		}
		
		mainDiv.find(".sponsorFlip").bind("click",function(){
			var elem = $(this);
			
			if(elem.data("flipped") === true){
				/**** Revert Flip ****/
				elem.revertFlip();	
				/**** Unset fliped flags ****/
				elem.data("flipped",false);
				if(config.oneAtTime){currentFliped[mainDiv.attr("id")] = null;}
			}
			else{
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