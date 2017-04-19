

$(document).ready(function(){
$.getJSON( 'js/json/slideshow.json', function(data){
			var template = $('#slideshowtpl').html();
			var html = Mustache.to_html(template, data);
			$('#cycle-slideshow').html(html);   			

			$('#cycle-slideshow').cycle({
				fx: 'fade', 
				timeout: 1000, 
				speed: 300, 
				fit:  0,
				delay: 500,   
				pause: 1,
				prev: '#prevBtn',
				next: '#nextBtn',
				width:  'auto',
				height: 'auto'				
			}); //cycle         	
	});//getJSON
});//ready


