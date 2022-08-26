document.body.onload = makeGrid;


function makeGrid() {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(i = 1; i < 6; i++) {
        for(j = 1; j < 6; j++) {
            const button = document.createElement('button');
            button.className = 'box';
            button.id = i + ' ' + j;
            button.onclick = function () {
                button.className = 'box1';
                setTimeout(function() {button.className = 'box2';}, 500);
                setTimeout(function() {button.className = 'box3';},1000);
                setTimeout(function() {button.className = 'box';}, 1500);
            };
            grid.appendChild(button);
        }
    }
    
    const funButton = document.getElementById('funButton');
    document.body.insertBefore(grid, funButton);
}


function clicked() {
    document.getElementById('text').innerHTML = 'how coulb';
    setTimeout(function() {document.getElementById('text').innerHTML = '';}, 2222);
}