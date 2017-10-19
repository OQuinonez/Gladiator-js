const $ = require('jquery');
const other = require('../../lib/other');
const appRoot = $('#app');

// Makes the Gladiator with the basics
// Health, Rage, Damage_low, and damage_high
function Gladiator(name, health, rage, damageLow, damageHigh) {
    this.name = name;
    this.health = health;
    this.rage = rage;
    this.damageLow = damageLow;
    this.damageHigh = damageHigh;
}

const player1 = new Gladiator('Ryu', 100, 0, 12, 24);
const player2 = new Gladiator('Ken', 100, 0, 9, 27);
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

// Heals Gladiator
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
// Another move more powerful than a regular attack
function haduken(attacker, defender) {
    const hdkn = Math.floor(Math.random() * 60) + 40;
    if (attacker.rage >= 40) {
        defender.health -= hdkn;
        attacker.rage = 0;
        STATE.points = 'Haduken! ' + hdkn + ' Damage!';
    }
    if (defender.health <= 0) {
        defender.health = 0;
    }
}
//Skips turn and add 20 rage to the user
function ragingUp(attacker) {
    if (attacker.rage >= 100) {
        attacker.rage = 100;
    } else {
        attacker.rage += 15;
    }
}
//Checks if player is dead
function isDead(attacker) {
    if (attacker.health <= 0) {
        return true;
    } else {
        return false;
    }
}
// ********************************* USED FOR THE PAGE

//Checks if it is player one's turn
function combater() {
    if (STATE.whoseTurn === 1) {
        return player1;
    } else {
        return player2;
    }
}
//Checks if it is player two's turn
function defending() {
    if (STATE.whoseTurn === 1) {
        return player2;
    } else {
        return player1;
    }
}
// Changes turn for the user
function changeTurn() {
    if (STATE.whoseTurn === 1) {
        STATE.whoseTurn = 2;
    } else {
        STATE.whoseTurn = 1;
    }
}
// Starts both players like new with both at 100 health and 0 rage
function reload(attacker, defender) {
    STATE.points = '';
    STATE.whoseTurn = 1;
    attacker.health = 100;
    defender.health = 100;
    attacker.rage = 0;
    defender.rage = 0;
}

// Makes the buttons do what they are suppose to do
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
    $('#rage').click(function() {
        ragingUp(combater());
        changeTurn();
        draw();
    });
    $('#hadukening').click(function() {
        haduken(combater(), defending());
        changeTurn();
        draw();
    });
}

// Makes the buttons viewable under certain
// circumstances for the user
function viewableButtons(player) {
    able = [];
    if (isDead(player) == true) {
        able.push('');
    }
    if (player.rage >= 10 && player.health > 0) {
        able.push("<button id='heal'>Heal</button>");
    }
    if (player.rage > 40 && player.health > 0) {
        able.push("<button id='hadukening'>Haduken</button>");
    }
    if (player.health > 0) {
        able.push("<button id='attack'>Attack</button>");
        able.push("<button id='rage'>Increase Rage</button> ");
    }
    return able.join('');
}

// Apply the function which lets the users see which
// button is usable
function buttonView() {
    return [
        STATE.points,
        '<div>',
        viewableButtons(combater()),
        '</div>',
        "<div><button id='restart'>Restart</button></div>"
    ].join('');
}
// Displays the health, name, and rage
// of the Gladiators to the user
function gladiatorView(player) {
    return [
        '<div><h2>Name: ',
        player.name,
        '</h2></div>',
        '<div><h2>Player Health: ',
        player.health,
        '</h2></div>',
        '<div><h2>Player Rage: ',
        player.rage,
        '</h2></div>',
        '<hr />'
    ].join('');
}

// Draws everything being used in the html page
function draw() {
    appRoot.html(
        gladiatorView(player1) + gladiatorView(player2) + buttonView()
    );
    attatchHandlers();
}
// *****************************************************************

//Main function which connects everything to the html page
function main() {
    draw();
}
$(main);
