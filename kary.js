function $k(id) {
    if(id) {
        if(this == window) {
            return new $k(id);
        }
        this.e = document.getElementById(id);
        if(this.e){
        		console.log("Base element found and set with id:"+ id);
            this.startListeningToTouchEvents(id);
        }
        return this;
    }
    else {
        var info = "created by Kamal Kumar. Copyright @2016";
        return info;
    }
}

$k.prototype = {
    about: function() {
        alert(this.e.getAttribute("Id"));
    },
    
    scrollUpAllTheWay: function(){
        this.e.scrollTop = 0;
    },
    
    scrollDownAllTheWay: function(){
         this.e.scrollTop = this.e.scrollHeight;
    },
    
    startListeningToTouchEvents: function(baseElementId){
    	console.log("Started listening to events for the element with id:"+ baseElementId);
        window.addEventListener('load', function(){
            var touchsurface = document.getElementById(baseElementId),
                startX,
                startY,
                dist,
                threshold = 150, //required min distance traveled to be considered swipe
                allowedTime = 200, // maximum time allowed to travel that distance
                elapsedTime,
                startTime

            function handleswipe(isrightswipe){
                if (isrightswipe)
                    touchsurface.innerHTML = 'Congrats, you\'ve made a <span style="color:red">right swipe!</span>'
                else{
                    touchsurface.innerHTML = 'Condition for right swipe not met yet'
                }
            }

            touchsurface.addEventListener('touchstart', function(e){
                touchsurface.innerHTML = ''
                var touchobj = e.changedTouches[0]
                dist = 0
                startX = touchobj.pageX
                startY = touchobj.pageY
                startTime = new Date().getTime() // record time when finger first makes contact with surface
                e.preventDefault()
            }, false)

            touchsurface.addEventListener('touchmove', function(e){
                e.preventDefault() // prevent scrolling when inside DIV
            }, false)

            touchsurface.addEventListener('touchend', function(e){
                var touchobj = e.changedTouches[0]
                dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
                elapsedTime = new Date().getTime() - startTime // get time elapsed
                // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
                var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageX - startX) <= 100)
                handleswipe(swiperightBol)
                e.preventDefault()
            }, false)

        }, false) // end window.onload
        }

    
}




