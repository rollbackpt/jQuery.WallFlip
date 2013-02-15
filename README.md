# jQuery WallFlip Plugin v0.1 #


**Include the dependencies**

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js"></script>

**Include the library**

    <script src="jquery.flip.min.js"></script>
    <script src="jquery.wallflip.js"></script>

**jQuery.WallFlip**

```html
<div id="wallflip1"></div>

<script>
    $(function () {
    	$("#wallflip1").wallflip({
    		oneAtTime: true,
    		items: [
    			{
    				image: "img/items/img1.png",
    				description: "Check this site.",
    				link: "http://site1.com",
    				link_name: "Site1"
    			},
    			{
    				image: "img/items/img2.png",
    				description: "Check this site.",
    				link: "http://site2.com",
    				link_name: "Site2"
    			},
    			{
    				image: "img/items/img3.png"
    			}
    		]
    	});
    });
</script>
```

## Options

* oneAtTime 
   - true to only allow one element to be flipped at a time
   - false to allow any number of elements to be flipped at a time
* items
   - image (Image url. Ex: images/myimage.jpg)
   - description 
   - link (Link url. Ex: http://www.google.pt)
   - link_name (Name to be displayed by the anchor tag containing the link)