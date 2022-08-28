// environment setup

    // these are the default values for mobile. If accessed on desktop this should be reversed by mobileCheck
    let horizontalDimension = 5;
    let verticalDimsension = 9;

    const touchThreshold = 30; // cutoff for how large a swipe distance needs to be to register as a swipe

    mobileCheck();
    var currentX = Math.floor(horizontalDimension / 2) + 1;
    var currentY = Math.floor(verticalDimsension / 2) + 1;

    // checks to see if the device is mobile or desktop. if on desktop, swap the grid
    function mobileCheck() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        if(!check) {
            let horizontal = horizontalDimension;
            let vertical = verticalDimsension;
            horizontalDimension = vertical;
            verticalDimsension = horizontal;
        } 
      };

    // on load, makes grid, initializes frame and snake start location
    window.onload = function() {

        const grid = document.createElement('div');
        grid.className = 'grid';
                
        // edit number of columns for dynamic sizing
        let gridTemplateColumns = '15vmin';
        for(i = 0; i < horizontalDimension - 1; i++)
            gridTemplateColumns += ' 15vmin';
        grid.style.gridTemplateColumns = gridTemplateColumns;

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

    let firstEvent = true;

    // does movement in specified direction if movement is available (38, 40, 37, 39 are up/down/left/right, respectively)
    function triggerEvent(direction) {
        
        if(firstEvent)
            document.getElementById('funButton').innerHTML = 'Don\'t click me';

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