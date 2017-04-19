
$(document).ready(function(){
	
	//addding timeout because the object not yet been loaded
	
	var movingObjCar = function(){
		//car animation
		var car = $('#movingCar');
		var carGoToLeft = $('.theExplore').width();

		var animateCar = new TimelineMax();
		animateCar.to(car, 30, {
		x: carGoToLeft - 32 + 'px',
		onComplete:carIsStop
		});//animateCar

		function carIsStop(){
			animateCar.repeatDelay(1);
			animateCar.repeat('true');
			}//carIsStop
			
			
	
				
	};//movingObjCar
	setTimeout(movingObjCar, 1000);//setTimeout	
});//ready