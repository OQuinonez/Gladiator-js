const $ = require('jquery');
const other = require('../../lib/other');
const appRoot = $('#app');

// Makes the Gladiator with the basics
// Health, Rage, Damage_low, and damage_high
function Gladiator(health, rage, damageLow, damageHigh) {
    this.health = health;
    this.rage = rage;
    this.damageLow = damageLow;
    this.damageHigh = damageHigh;
}

const player1 = new Gladiator(100, 0, 12, 24);
const player2 = new Gladiator(100, 0, 9, 27);
var whoseTurn = 1;

// Does the basic attack move
// Makes the attacker have a
function attack(attacker, defender) {
    const hit =
        Math.floor(Math.random() * attacker.damageHigh) + attacker.damageLow;
    if (Math.floor(Math.random() * 100) + 1 <= attacker.rage) {
        defender.health = defender.health - hit * 2;
        attacker.rage = 0;
    } else {
        attacker.rage += 15;
        defender.health = defender.health - hit;
    }
    if (defender.health <= 0) {
        defender.health = 0;
    }
}

function heal(attacker) {
    if (attacker.rage >= 10) {
        attacker.health = attacker.health += 5;
        if (attacker.health > 100) {
            attacker.health = 100;
        }
        attacker.rage = attacker.rage - 10;
        if (attacker.rage < 0) {
            attacker.rage = 0;
        }
    }
}

function isDead(attacker) {
    if (attacker.health <= 0) {
        return true;
    } else {
        return false;
    }
}
// *********************************
function combater() {
    if (whoseTurn === 1) {
        return player1;
    } else {
        return player2;
    }
}

function defending() {
    if (whoseTurn === 1) {
        return player2;
    } else {
        return player1;
    }
}

function changeTurn() {
    if (whoseTurn === 1) {
        whoseTurn = 2;
    } else {
        whoseTurn = 1;
    }
}

function attatchHandlers() {
    $('#attack').click(function() {
        attack(combater(), defending());
        changeTurn();
        draw();
    });
    $('#heal').click(function() {
        heal(combater());
        changeTurn();
        draw();
    });
}

function buttonView() {
    return [
        "<div><button id='attack'>Attack</button>",
        "<button id='heal'>Heal</button></div>"
    ].join('');
}
function gladiatorView(player) {
    return [
        '<div><h2>Player Health: ',
        player.health,
        '</h2></div>',
        '<div><h2>Player Rage: ',
        player.rage,
        '</h2></div>',
        '<hr />'
    ].join('');
}

function draw() {
    appRoot.html(
        gladiatorView(player1) + gladiatorView(player2) + buttonView()
    );
    attatchHandlers();
}
// ******************************************************************

// function attatchHandlers() {
//     $('#attack').click(function() {
//         attack(player1, player2);
//         draw();
//     });
//     $('#heal').click(function() {
//         heal(player1);
//         draw();
//     });
// }

// function buttonView() {
//     return [
//         "<div><button id='attack'>Attack</button>",
//         "<button id='heal'>Heal</button></div>"
//     ].join('');
// }

// function draw() {
//     appRoot.html(
//         gladiatorView(player1) + gladiatorView(player2) + buttonView()
//     );
//     attatchHandlers();

function main() {
    draw();
}
$(main);
