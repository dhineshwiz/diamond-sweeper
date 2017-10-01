var board_row = 8;
var board_col = 8;
var cellNum = 0;
var cellCordinates = {};
var diamond_count = 8;
var diamondSet = {};
global.startApp = function(container) {
    console.log("Here is the container:", container);
    $(document).ready(function() {
        randomGenerators(diamond_count);
        initializeBoard(board_row, board_col);
    });
}

function initializeBoard(board_row, board_col) {
    var table = document.createElement("table");
    table.id = "diamond_container";
    for (var i = 0; i < board_row; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < board_col; j++) {
            var td = document.createElement('td');
            cellCordinates[cellNum] = {
                x: i,
                y: j
            };
            td.className = "cell unknown";
            td.id = cellNum;
            cellNum++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById("game").appendChild(table);
}

function randomGenerators(n) {
    while (Object.keys(diamondSet).length < n) {
        var randomnumber = Math.ceil(Math.random() * 63)
        diamondSet[randomnumber] = randomnumber;
    }
}