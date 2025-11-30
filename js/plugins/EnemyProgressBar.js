/*:
 * @target MZ
 * @plugindesc Enemy Damage Progress Bar with counter, fixed top-right position
 * @author You
 */

(() => {

// ====== SETTINGS ======

// OPTION 1: Fixed damage required to win (set to 0 to disable)
const FIXED_DAMAGE_TO_WIN = 0; 

// OPTION 2: Multiplier of total enemy HP
const DAMAGE_MULTIPLIER = 1.0; 

// ======================

const BAR_WIDTH = 300;
const BAR_HEIGHT = 40;
const MARGIN = 20;

let totalEnemyMaxHp = 0;
let totalDamageDone = 0;
let damageRequiredToWin = 0;

// Setup at battle start
const _BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    _BattleManager_setup.call(this, troopId, canEscape, canLose);

    totalEnemyMaxHp = 0;
    totalDamageDone = 0;

    $gameTroop.members().forEach(enemy => {
        totalEnemyMaxHp += enemy.mhp;
    });

    if (FIXED_DAMAGE_TO_WIN > 0) {
        damageRequiredToWin = FIXED_DAMAGE_TO_WIN;
    } else {
        damageRequiredToWin = totalEnemyMaxHp * DAMAGE_MULTIPLIER;
    }
};

// Track total damage dealt
const _Game_Enemy_gainHp = Game_Enemy.prototype.gainHp;
Game_Enemy.prototype.gainHp = function(value) {
    if (value < 0) {
        totalDamageDone += Math.abs(value);
    }
    _Game_Enemy_gainHp.call(this, value);
};

// End battle when threshold reached
const _BattleManager_update = BattleManager.update;
BattleManager.update = function() {
    _BattleManager_update.call(this);

    if (this._phase && totalDamageDone >= damageRequiredToWin) {
        this.processVictory();
    }
};

// Draw bar and text
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.call(this);
    this.drawEnemyProgressBar();
};

Scene_Battle.prototype.drawEnemyProgressBar = function() {
    if (!this._enemyHpBar) {
        this._enemyHpBar = new Sprite(new Bitmap(BAR_WIDTH, BAR_HEIGHT));
        this.addChild(this._enemyHpBar);
    }

    // Top-right positioning
    this._enemyHpBar.x = Graphics.width - BAR_WIDTH - MARGIN;
    this._enemyHpBar.y = MARGIN;

    const rate = Math.min(totalDamageDone / damageRequiredToWin, 1);
    const remaining = Math.max(damageRequiredToWin - totalDamageDone, 0);

    const bmp = this._enemyHpBar.bitmap;
    bmp.clear();

    // Bar background
    bmp.fillRect(0, 0, BAR_WIDTH, 20, "#333333");
    bmp.fillRect(0, 0, BAR_WIDTH * rate, 20, "#33ff00ff");

    // Text
    bmp.fontSize = 14;
    bmp.textColor = "#ffffff";
    bmp.drawText(
        `Damage: ${Math.floor(totalDamageDone)} / ${Math.floor(damageRequiredToWin)}  (${Math.floor(remaining)} left)`,
        0,
        20,
        BAR_WIDTH,
        20,
        "center"
    );
};

})();
