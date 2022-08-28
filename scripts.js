// environment setup

    const horizontalDimension = 5; // if you change this value, also change it in the style sheet .grid repeat rule
    const verticalDimsension = 8;

    const touchThreshold = 30; // cutoff for how large a swipe distance needs to be to register as a swipe

    var currentX = 1;
    var currentY = 1;

    window.onload = makeGrid;

    function makeGrid() {
        const grid = document.createElement('div');
        grid.className = 'grid';

        for(i = 1; i < verticalDimsension + 1; i++) {
            for(j = 1; j < horizontalDimension + 1; j++) {
                const box = document.createElement('div');
                box.className = 'emptyBox';
                box.id = j + ' ' + i;
                grid.appendChild(box);
            }
        }
        
        const funButton = document.getElementById('funButton');
        document.body.insertBefore(grid, funButton);

        document.getElementById(currentX + ' ' + currentY).className = 'selectedBox';
    }

// event listener setup

    document.onkeydown = checkKey;

    // if key pressed is an arrow key, trigger time iteration event
    function checkKey(e) {
        e = e || window.event;
        let key = Number(e.keyCode);

        if(key == 37 || key == 38 || key == 39 || key == 40)
            triggerEvent(key);
    }

    // used to listen to mobile touches as inputs
    let touchstartX = 0;
    let touchendX = 0;
    let touchstartY = 0;
    let touchendY = 0;

    document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
    })

    document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    checkSwipeDirection()
    })

    // does some math to determine if a mobile touch was a swipe, and in what direction
    function checkSwipeDirection() {
            
        let yDiff = Math.abs(touchendY - touchstartY);
        let xDiff = Math.abs(touchendX - touchstartX);

        // check if the swipe is large enough to count as a swipe
        if(yDiff > touchThreshold || xDiff > touchThreshold)

            // check if the swipe is longer vertically or horizontally
            if(xDiff > yDiff)
                if(touchendX > touchstartX)
                    // swiped right
                    triggerEvent(39);
                else 
                    // swiped left
                    triggerEvent(37);
            else
                if(touchendY > touchstartY)
                    // swiped down
                    triggerEvent(40);
                else
                    // swiped up
                    triggerEvent(38);
    }


// game utility functions

    // does movement in specified direction if movement is available (38, 40, 37, 39 are up/down/left/right, respectively)
    function triggerEvent(direction) {
        
        switch(direction) {

            case 38: // up
                if(currentY > 1 && document.getElementById(currentX + ' ' + (currentY - 1)).className == 'emptyBox') {
                    colorDecay(currentX, currentY); 
                    currentY--; 
                }
                break;

            case 40: // down
                if(currentY < verticalDimsension && document.getElementById(currentX + ' ' + (currentY + 1)).className == 'emptyBox') {
                    colorDecay(currentX, currentY);
                    currentY++;
                }
                break;

            case 37:  // left
                if(currentX > 1 && document.getElementById((currentX - 1) + ' ' + currentY).className == 'emptyBox') {
                    colorDecay(currentX, currentY);
                    currentX--;
                }
                break;

            case 39:  // right
                if(currentX < horizontalDimension && document.getElementById((currentX + 1) + ' ' + currentY).className == 'emptyBox') {
                    colorDecay(currentX, currentY);
                    currentX++;
                }
                break;
        }

        document.getElementById(currentX + ' ' + currentY).className = 'selectedBox';
    }
     

    function colorDecay(x, y) {
        let thisBox = document.getElementById(x + ' ' + y)

        thisBox.className = 'decay1';
        setTimeout(function() {thisBox.className = 'decay2';   },   500);
        setTimeout(function() {thisBox.className = 'decay3';   },  1000);
        setTimeout(function() {thisBox.className = 'emptyBox'; },  1500);
    }

    function funButtonClicked() {
        document.getElementById('text').innerHTML = 'how coulb';
        setTimeout(function() {document.getElementById('text').innerHTML = '';}, 2000);
    }