$(document).ready(function () {

    //CONTROLLER
    var controller = new ScrollMagic.Controller();


    //slider visible and hidden at starting
    TweenMax.to('.slideshow-container', 1, {
        opacity: 0,
        onComplete: hidesSliderFirst
    });

    function hidesSliderFirst() {
        var tl = new TimelineLite();
        tl.from('#cycleSlideshow', 1, {
                opacity: 1,
                scale: 0.7,
                ease: Power4.easeIn
            }, 0)
            .to('.slideshow-container', 0, {
                opacity: 1
            }, 0)
            .from('.slide-control', 1, {
                y: 100,
                ease: Power4.easeNone,
                scale: 0.5
            }, "-=0.25");

    } //hidesSliderFirst	

    //Section2
    $('.sectionItems').each(function () {
        var sectionTween = TweenMax.from(this, 1, {
            y: 50,
            ease: Expo.easeInOut,
            scale: 0.5,
            opacity: 0.1
        }); //sectionTween

        sectionScene = new ScrollMagic.Scene({
                triggerHook: 1,
                triggerElement: this,
                reverse: false
            })
            .setTween(sectionTween)
            .addTo(controller) //controller
    }); //each


    //weather and map areas
    var titleAnimation = new TimelineMax();
    titleAnimation
        .from('.typographyTitle h1', 1, {
            ease: Sine.easeOut,
            y: 300,
            scale: 0.5,
            opacity: 0.1
        })
        .from('#search-city', 2, {
            autoAlpha: 0,
            ease: Sine.easeOut
        }, 1); //titleAnimation

    var mapWeather = new ScrollMagic.Scene({
            triggerElement: "#intro1",
            reverse: false
        }) //mapWeather
        .setClassToggle('#intro1', 'showMapWeather')
        .setTween(titleAnimation)
        .addTo(controller);


    //Parallax  and Timeline

    var parallaxTimeLine = new TimelineMax();
    parallaxTimeLine
        .from('#imgBgContent', 0.3, {
            autoAlpha: 0,
            ease: Power0.easeNone
        }, 0.3)
        .from('#parallaxImg', 1, {
            y: '-30%',
            ease: Power0.easeNone
        }, 0);

    var parallaxImg = new ScrollMagic.Scene({
            triggerElement: '#intro3',
            triggerHook: 0.5,
            duration: '100%'
        })
        .setTween(parallaxTimeLine)
        .addTo(controller);

    //Bacgkround color changer
    var bgColor = new TimelineMax();
    bgColor
        .to('#intro4', 1, {
            backgroundColor: 'rgb(55, 87, 208)'
        })
        .to('.fadeIN', 1, {
            color: '#EBE0D3'
        });

    var bgColorScene = new ScrollMagic.Scene({
            triggerElement: '#intro4',
            triggerHook: 0.5,
            ease: Power0.easeNone
        })
        .setTween(bgColor)
        .addTo(controller);
}); //end of ready
