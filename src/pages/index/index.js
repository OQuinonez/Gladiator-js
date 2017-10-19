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
STATE = {
    whoseTurn: 1,
    points: ''
};

// Does the basic attack move
// Makes the attacker have a
function attack(attacker, defender) {
    const hit =
        Math.floor(Math.random() * attacker.damageHigh) + attacker.damageLow;
    if (Math.floor(Math.random() * 100) + 1 <= attacker.rage) {
        defender.health = defender.health - hit * 2;
        attacker.rage = 0;
        STATE.points = 'Crit hit of ' + hit * 2 + ' Damage!';
    } else {
        attacker.rage += 15;
        defender.health = defender.health - hit;
        STATE.points = 'Regular hit of ' + hit + ' Damage!';
    }
    if (defender.health <= 0) {
        defender.health = 0;
    }
}

function heal(attacker) {
    if (attacker.rage >= 10) {
        attacker.health = attacker.health += 5;
        STATE.points = 'Player healed 5 points.';
        if (attacker.health > 100) {
            attacker.health = 100;
        }
        attacker.rage = attacker.rage - 10;
        if (attacker.rage < 0) {
            attacker.rage = 0;
        }
    }
}

function ragingUp(attacker) {
    attacker.rage += 15;
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
    if (STATE.whoseTurn === 1) {
        return player1;
    } else {
        return player2;
    }
}

function defending() {
    if (STATE.whoseTurn === 1) {
        return player2;
    } else {
        return player1;
    }
}

function changeTurn() {
    if (STATE.whoseTurn === 1) {
        STATE.whoseTurn = 2;
    } else {
        STATE.whoseTurn = 1;
    }
}

function reload(attacker, defender) {
    STATE.points = '';
    STATE.whoseTurn = 1;
    attacker.health = 100;
    defender.health = 100;
    attacker.rage = 0;
    defender.rage = 0;
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
    $('#restart').click(function() {
        reload(combater(), defending());
        draw();
    });
}

// function viewableHealButton(player) {
//     if (player.rage >= 10) {
//         return ["<button id='heal'>Heal</button></div>"].join('');
//     }
// }

function viewableButtons(player) {
    able = [];
    if (isDead(player) == true) {
        able.push('');
    }
    if (player.rage >= 10 && player.health) {
        able.push("<button id='heal'>Heal</button>");
    }
    if (player.health > 0) {
        able.push("<button id='attack'>Attack</button>");
    }
    return able.join('');
}

function buttonView() {
    return [
        STATE.points,
        '<div>',
        viewableButtons(combater()),
        '</div>',
        // "<div><button id='attack'>Attack</button>",
        // viewableHealButton(combater()),
        // '</div>',
        "<div><button id='restart'>Restart</button></div>"
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

function main() {
    draw();
}
$(main);
