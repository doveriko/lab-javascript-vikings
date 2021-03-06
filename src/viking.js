// Soldier
function Soldier(health, strength) {
  this.health = health;
  this.strength = strength;

  Soldier.prototype.attack = function() {
    return this.strength;
  };

  Soldier.prototype.receiveDamage = function(damage) {
    this.health -= damage;
  };
}

// Viking
function Viking(name, health, strength) {
  Soldier.call(this, health, strength);
  this.name = name;
  Viking.prototype.receiveDamage = function(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `${name} has received ${damage} points of damage`;
    } else {
      return `${name} has died in act of combat`;
    }
  };
  Viking.prototype.battleCry = function() {
    return "Odin Owns You All!";
  };
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

// Saxon
function Saxon(health, strength) {
  Soldier.call(this, health, strength);
  Saxon.prototype.receiveDamage = function(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return "A Saxon has died in combat";
    }
  };
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

// War
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];

  War.prototype.addViking = function(Viking) {
    this.vikingArmy.push(Viking);
  };

  War.prototype.addSaxon = function(Saxon) {
    this.saxonArmy.push(Saxon);
  };

  War.prototype.vikingAttack = function() {
    let randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    let randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    let saxonDamage = randomSaxon.receiveDamage(randomViking.strength);

    if (randomSaxon.health <= 0) {
      this.saxonArmy.splice(randomSaxon);
    }

    return saxonDamage;
  };

  War.prototype.saxonAttack = function() {
    let randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    let randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    let vikingDamage = randomViking.receiveDamage(randomSaxon.strength);

    if (randomViking.health <=0) {
      this.vikingArmy.splice(randomViking)
    }

    return vikingDamage;
  };

  War.prototype.showStatus = function() {
    if ((this.saxonArmy.length === 0)) {
      return "Vikings have won the war of the century!";
    } else if ((this.vikingArmy.length === 0)) {
      return "Saxons have fought for their lives and survive another day...";
    } else {
      return "Vikings and Saxons are still in the thick of battle.";
    }
  };
}