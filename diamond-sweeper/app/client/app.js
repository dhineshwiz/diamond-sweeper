var board_row = 8;
var board_col = 8;
var cellNum = 0;
var cellCordinates = {};
var diamond_count = 8;
var diamondSet = {};
var winCount = 0;
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
    document.getElementById("diamond_container").addEventListener("click", clickHandler);
}

function randomGenerators(n) {
    while (Object.keys(diamondSet).length < n) {
        var randomnumber = Math.ceil(Math.random() * 63)
        diamondSet[randomnumber] = randomnumber;
    }
}

function clickHandler(e) {
    if (Object.keys(diamondSet).length) {
        if (e.target.nodeName == 'TD') {
            winCount++;
            if (diamondSet[e.target.id]) {
                e.target.className = "cell diamond disabled";
                delete diamondSet[e.target.id];
                if (Object.keys(diamondSet).length == 0) {
                    $('#winner').modal('show');
                    $('#winScore').empty().text(64 - winCount);
                }
            } else {
                var slope = hint(e.target.id);
                $('td').removeClass('arrow');
                e.target.className = "cell arrow disabled";
                e.target.style["boxShadow"] = 'none';
                e.target.style["transform"] = "rotate(" + slope + "deg)";
            }
        }
    }
}

function minDistance(clicked_id) {
    var distanceMap = {};
    Object.keys(diamondSet).map((id) => {
        distanceMap[id] = Math.abs(cellCordinates[clicked_id].x - cellCordinates[id].x) + Math.abs(cellCordinates[clicked_id].y - cellCordinates[id].y);
    });
    return Object.keys(distanceMap).sort(function(a, b) {
        return distanceMap[a] - distanceMap[b]
    })[0];
}

function hint(clicked_id) {
    var nearestDiamondId = minDistance(clicked_id);
    return (Math.atan2((cellCordinates[nearestDiamondId].x - cellCordinates[clicked_id].x), (cellCordinates[nearestDiamondId].y - cellCordinates[clicked_id].y))) * 180 / Math.PI;
}