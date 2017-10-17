const $ = require('jquery');
const appRoot = $('#app');

const STATE = {
    count: 0
};

function view() {
    return [
        "<div><button id='down'> - </button>",
        STATE.count,
        "<button id ='up'> + </button></div>"
    ];
}

function draw() {
    appRoot.html(view());
    attatchHandlers();
}

function attatchHandlers() {
    $('#up').click(function() {
        (STATE.count += 1), draw();
    });

    $('#down').click(function() {
        STATE.count -= 1;
        draw();
    });
}

// Applicaiton State : CHECK
// Application View : CHECK
// Application Update Setup

function main() {
    draw();
}

$(main);

// return [
//     "<div><button id='down'>-</button>",
//     STATE.count,
//     '<button id="up">+</button></div>'
// ].join('');

// $('#up').click(function() {
// STATE.count += 1;
// appRoot.html(view());
// attatchHandlers();
// // });

// $('#down').click(function() {
// STATE.count -= 1;
// appRoot.html(view());
// attatchHandlers();
// });

// appRoot.html(view());
// attatchHandlers();
