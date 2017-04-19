(function() {
    $(window).on('load', function() {

        //body overflow
        document.getElementById('preloaderBody').style.overflow = "hidden";
        var elem = document.getElementById('progressData');
        var preloaderContainer = document.getElementById("loader-wrapper");
        var counter = 0;
        var id = setInterval(frame, 1);

        function frame() {
            if (counter >= 100) {
                clearInterval(id);
                TweenMax.to('#loader-wrapper', 0.5, {
                    scale: 0.5,
                    autoAlpha: 0,
                    ease: Power3.easeInOut
                }); //TweenMax

                //body overflow
                document.getElementById('preloaderBody').style.overflow = "visible";
            } else {
                counter++;
                elem.innerHTML = (counter + '%');
            } //else
        } //end of frame	
    }); //end of window load
})(); //self invoke
