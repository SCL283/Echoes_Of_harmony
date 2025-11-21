/*:
 * @target MZ
 * @plugindesc Enemy HP Progress Bar that ends battle when full
 * @author You
 */

(() => {

let totalEnemyMaxHp = 0;
let totalDamageDone = 0;

const _BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    _BattleManager_setup.call(this, troopId, canEscape, canLose);
    totalEnemyMaxHp = 0;
    totalDamageDone = 0;

    $gameTroop.members().forEach(enemy => {
        totalEnemyMaxHp += enemy.mhp;
    });
};

// Track damage
const _Game_Enemy_gainHp = Game_Enemy.prototype.gainHp;
Game_Enemy.prototype.gainHp = function(value) {
    if (value < 0) {
        totalDamageDone += Math.abs(value);
    }
    _Game_Enemy_gainHp.call(this, value);
};

// End battle when bar full
const _BattleManager_update = BattleManager.update;
BattleManager.update = function() {
    _BattleManager_update.call(this);

    if (this._phase && totalDamageDone >= totalEnemyMaxHp) {
        this.processVictory();
    }
};

// Draw bar
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.call(this);
    this.drawEnemyProgressBar();
};

Scene_Battle.prototype.drawEnemyProgressBar = function() {
    if (!this._enemyHpBar) {
        this._enemyHpBar = new Sprite(new Bitmap(300, 24));
        this._enemyHpBar.x = 20;
        this._enemyHpBar.y = 20;
        this.addChild(this._enemyHpBar);
    }

    const rate = Math.min(totalDamageDone / totalEnemyMaxHp, 1);
    const bmp = this._enemyHpBar.bitmap;
    bmp.clear();
    bmp.fillRect(0, 0, 300, 24, "#333333");
    bmp.fillRect(0, 0, 300 * rate, 24, "#ff4444");
};

})();
