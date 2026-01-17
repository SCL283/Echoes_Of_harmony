//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.89;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.89] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x5af19b=_0x4b94;(function(_0x20b950,_0x22df39){const _0x3d48ec=_0x4b94,_0x39acc1=_0x20b950();while(!![]){try{const _0x362d86=parseInt(_0x3d48ec(0x751))/0x1*(-parseInt(_0x3d48ec(0x7ec))/0x2)+parseInt(_0x3d48ec(0x31b))/0x3+parseInt(_0x3d48ec(0x946))/0x4*(-parseInt(_0x3d48ec(0x3ab))/0x5)+parseInt(_0x3d48ec(0x217))/0x6*(-parseInt(_0x3d48ec(0x6c3))/0x7)+-parseInt(_0x3d48ec(0x2c4))/0x8+parseInt(_0x3d48ec(0x761))/0x9*(-parseInt(_0x3d48ec(0x769))/0xa)+parseInt(_0x3d48ec(0x552))/0xb*(parseInt(_0x3d48ec(0x6a6))/0xc);if(_0x362d86===_0x22df39)break;else _0x39acc1['push'](_0x39acc1['shift']());}catch(_0x24523d){_0x39acc1['push'](_0x39acc1['shift']());}}}(_0x266f,0xeca3d));var label=_0x5af19b(0x585),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5af19b(0x4fc)](function(_0x5611cc){const _0x593b9c=_0x5af19b;return _0x5611cc[_0x593b9c(0x7c8)]&&_0x5611cc[_0x593b9c(0x584)][_0x593b9c(0x319)]('['+label+']');})[0x0];VisuMZ[label][_0x5af19b(0x47e)]=VisuMZ[label][_0x5af19b(0x47e)]||{},VisuMZ[_0x5af19b(0x54d)]=function(_0x22c98e,_0x7eed01){const _0x1ddf96=_0x5af19b;for(const _0x2f400f in _0x7eed01){if(_0x2f400f[_0x1ddf96(0x37b)](/(.*):(.*)/i)){const _0x2d7763=String(RegExp['$1']),_0xcb3fd9=String(RegExp['$2'])[_0x1ddf96(0x49d)]()[_0x1ddf96(0x254)]();let _0x419b85,_0x3a01ec,_0x591741;switch(_0xcb3fd9){case'NUM':_0x419b85=_0x7eed01[_0x2f400f]!==''?Number(_0x7eed01[_0x2f400f]):0x0;break;case _0x1ddf96(0x872):_0x3a01ec=_0x7eed01[_0x2f400f]!==''?JSON[_0x1ddf96(0x66c)](_0x7eed01[_0x2f400f]):[],_0x419b85=_0x3a01ec[_0x1ddf96(0x156)](_0x1b7ff1=>Number(_0x1b7ff1));break;case _0x1ddf96(0x6f7):_0x419b85=_0x7eed01[_0x2f400f]!==''?eval(_0x7eed01[_0x2f400f]):null;break;case _0x1ddf96(0x43b):_0x3a01ec=_0x7eed01[_0x2f400f]!==''?JSON[_0x1ddf96(0x66c)](_0x7eed01[_0x2f400f]):[],_0x419b85=_0x3a01ec[_0x1ddf96(0x156)](_0x1c1300=>eval(_0x1c1300));break;case _0x1ddf96(0x549):_0x419b85=_0x7eed01[_0x2f400f]!==''?JSON[_0x1ddf96(0x66c)](_0x7eed01[_0x2f400f]):'';break;case _0x1ddf96(0x753):_0x3a01ec=_0x7eed01[_0x2f400f]!==''?JSON['parse'](_0x7eed01[_0x2f400f]):[],_0x419b85=_0x3a01ec[_0x1ddf96(0x156)](_0x31cb84=>JSON['parse'](_0x31cb84));break;case _0x1ddf96(0x72b):_0x419b85=_0x7eed01[_0x2f400f]!==''?new Function(JSON[_0x1ddf96(0x66c)](_0x7eed01[_0x2f400f])):new Function(_0x1ddf96(0x52d));break;case _0x1ddf96(0x248):_0x3a01ec=_0x7eed01[_0x2f400f]!==''?JSON[_0x1ddf96(0x66c)](_0x7eed01[_0x2f400f]):[],_0x419b85=_0x3a01ec[_0x1ddf96(0x156)](_0x4230f9=>new Function(JSON['parse'](_0x4230f9)));break;case _0x1ddf96(0x2a5):_0x419b85=_0x7eed01[_0x2f400f]!==''?String(_0x7eed01[_0x2f400f]):'';break;case _0x1ddf96(0x32a):_0x3a01ec=_0x7eed01[_0x2f400f]!==''?JSON['parse'](_0x7eed01[_0x2f400f]):[],_0x419b85=_0x3a01ec[_0x1ddf96(0x156)](_0x1472b7=>String(_0x1472b7));break;case _0x1ddf96(0x576):_0x591741=_0x7eed01[_0x2f400f]!==''?JSON[_0x1ddf96(0x66c)](_0x7eed01[_0x2f400f]):{},_0x22c98e[_0x2d7763]={},VisuMZ['ConvertParams'](_0x22c98e[_0x2d7763],_0x591741);continue;case _0x1ddf96(0x56b):_0x3a01ec=_0x7eed01[_0x2f400f]!==''?JSON['parse'](_0x7eed01[_0x2f400f]):[],_0x419b85=_0x3a01ec['map'](_0x2c40ef=>VisuMZ[_0x1ddf96(0x54d)]({},JSON['parse'](_0x2c40ef)));break;default:continue;}_0x22c98e[_0x2d7763]=_0x419b85;}}return _0x22c98e;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x534)]=SceneManager['exit'],SceneManager[_0x5af19b(0x358)]=function(){const _0x433f1d=_0x5af19b;VisuMZ[_0x433f1d(0x585)][_0x433f1d(0x534)][_0x433f1d(0x535)](this);if(Utils['RPGMAKER_VERSION']>=_0x433f1d(0x6e3)){if(typeof nw==='object')nw[_0x433f1d(0x74f)]['quit']();}},(_0x3a9059=>{const _0xbccecb=_0x5af19b,_0x1642ac=_0x3a9059[_0xbccecb(0x678)];for(const _0x6bcfab of dependencies){if(!Imported[_0x6bcfab]){alert(_0xbccecb(0x451)['format'](_0x1642ac,_0x6bcfab)),SceneManager['exit']();break;}}const _0x54faaa=_0x3a9059['description'];if(_0x54faaa[_0xbccecb(0x37b)](/\[Version[ ](.*?)\]/i)){const _0x5c3bd5=Number(RegExp['$1']);_0x5c3bd5!==VisuMZ[label][_0xbccecb(0x4f7)]&&(alert(_0xbccecb(0x6d8)[_0xbccecb(0x8b9)](_0x1642ac,_0x5c3bd5)),SceneManager[_0xbccecb(0x358)]());}if(_0x54faaa['match'](/\[Tier[ ](\d+)\]/i)){const _0x1ee63c=Number(RegExp['$1']);_0x1ee63c<tier?(alert(_0xbccecb(0x77b)[_0xbccecb(0x8b9)](_0x1642ac,_0x1ee63c,tier)),SceneManager[_0xbccecb(0x358)]()):tier=Math[_0xbccecb(0x689)](_0x1ee63c,tier);}VisuMZ[_0xbccecb(0x54d)](VisuMZ[label]['Settings'],_0x3a9059[_0xbccecb(0x533)]);})(pluginData),((()=>{const _0x4f4813=_0x5af19b;if(VisuMZ['CoreEngine']['Settings'][_0x4f4813(0x2cf)]['SubfolderParse']??!![])for(const _0x45d261 in $plugins){const _0x4ceff8=$plugins[_0x45d261];_0x4ceff8[_0x4f4813(0x678)]['match'](/(.*)\/(.*)/i)&&(_0x4ceff8[_0x4f4813(0x678)]=String(RegExp['$2'][_0x4f4813(0x254)]()));}})()),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x433),_0x5e1058=>{const _0x18b14b=_0x5af19b;if(!SceneManager[_0x18b14b(0x4ff)])return;if(!SceneManager[_0x18b14b(0x4ff)][_0x18b14b(0x830)])return;VisuMZ[_0x18b14b(0x54d)](_0x5e1058,_0x5e1058);const _0x1d00a5=Math[_0x18b14b(0x548)](_0x5e1058[_0x18b14b(0x5a9)]),_0x5e011a=Math[_0x18b14b(0x548)](_0x5e1058[_0x18b14b(0x8b5)]);$gameTemp[_0x18b14b(0x184)](_0x1d00a5,_0x5e011a,_0x5e1058[_0x18b14b(0x92e)],_0x5e1058[_0x18b14b(0x5f0)],_0x5e1058[_0x18b14b(0x41a)]);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],'AudioChangeBgmVolume',_0xf2f3f9=>{const _0x19b392=_0x5af19b;VisuMZ['ConvertParams'](_0xf2f3f9,_0xf2f3f9);const _0xb051be=Math[_0x19b392(0x548)](_0xf2f3f9[_0x19b392(0x4bf)])[_0x19b392(0x767)](0x0,0x64),_0x50a09f=AudioManager['_currentBgm'];_0x50a09f&&(_0x50a09f[_0x19b392(0x4bf)]=_0xb051be,_0x50a09f[_0x19b392(0x180)]=AudioManager[_0x19b392(0x4fe)]['seek'](),AudioManager[_0x19b392(0x388)](_0x50a09f),AudioManager[_0x19b392(0x8c9)](_0x50a09f,_0x50a09f['pos']),AudioManager[_0x19b392(0x4fe)][_0x19b392(0x537)](_0x50a09f[_0x19b392(0x180)]));}),PluginManager[_0x5af19b(0x1cc)](pluginData['name'],_0x5af19b(0x18f),_0x55bde4=>{const _0x1402ed=_0x5af19b;VisuMZ[_0x1402ed(0x54d)](_0x55bde4,_0x55bde4);const _0x1d752d=Math[_0x1402ed(0x548)](_0x55bde4[_0x1402ed(0x2af)])[_0x1402ed(0x767)](0x32,0x96),_0x47504c=AudioManager[_0x1402ed(0x4cd)];_0x47504c&&(_0x47504c[_0x1402ed(0x2af)]=_0x1d752d,_0x47504c['pos']=AudioManager['_bgmBuffer'][_0x1402ed(0x361)](),AudioManager[_0x1402ed(0x388)](_0x47504c),AudioManager[_0x1402ed(0x8c9)](_0x47504c,_0x47504c[_0x1402ed(0x180)]),AudioManager[_0x1402ed(0x4fe)][_0x1402ed(0x537)](_0x47504c[_0x1402ed(0x180)]));}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],'AudioChangeBgmPan',_0x26b1e5=>{const _0x44c29a=_0x5af19b;VisuMZ[_0x44c29a(0x54d)](_0x26b1e5,_0x26b1e5);const _0x128f64=Math[_0x44c29a(0x548)](_0x26b1e5[_0x44c29a(0x1c5)])[_0x44c29a(0x767)](-0x64,0x64),_0x3740b7=AudioManager[_0x44c29a(0x4cd)];_0x3740b7&&(_0x3740b7[_0x44c29a(0x1c5)]=_0x128f64,_0x3740b7[_0x44c29a(0x180)]=AudioManager[_0x44c29a(0x4fe)]['seek'](),AudioManager[_0x44c29a(0x388)](_0x3740b7),AudioManager['playBgm'](_0x3740b7,_0x3740b7[_0x44c29a(0x180)]),AudioManager[_0x44c29a(0x4fe)][_0x44c29a(0x537)](_0x3740b7['pos']));}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x6a8),_0x2f90fb=>{const _0x313d02=_0x5af19b;VisuMZ[_0x313d02(0x54d)](_0x2f90fb,_0x2f90fb);const _0x50e7c1=Math[_0x313d02(0x548)](_0x2f90fb['volume'])[_0x313d02(0x767)](0x0,0x64),_0x55a7ad=AudioManager[_0x313d02(0x5c6)];_0x55a7ad&&(_0x55a7ad[_0x313d02(0x4bf)]=_0x50e7c1,_0x55a7ad['pos']=AudioManager['_bgsBuffer'][_0x313d02(0x361)](),AudioManager[_0x313d02(0x30d)](_0x55a7ad),AudioManager[_0x313d02(0x626)](_0x55a7ad,_0x55a7ad[_0x313d02(0x180)]),AudioManager[_0x313d02(0x4ea)][_0x313d02(0x537)](_0x55a7ad[_0x313d02(0x180)]));}),PluginManager[_0x5af19b(0x1cc)](pluginData['name'],_0x5af19b(0x93b),_0x1c042b=>{const _0xc15e18=_0x5af19b;VisuMZ[_0xc15e18(0x54d)](_0x1c042b,_0x1c042b);const _0x488a12=Math[_0xc15e18(0x548)](_0x1c042b[_0xc15e18(0x2af)])[_0xc15e18(0x767)](0x32,0x96),_0xf134e9=AudioManager['_currentBgs'];_0xf134e9&&(_0xf134e9[_0xc15e18(0x2af)]=_0x488a12,_0xf134e9[_0xc15e18(0x180)]=AudioManager['_bgsBuffer']['seek'](),AudioManager[_0xc15e18(0x30d)](_0xf134e9),AudioManager['playBgs'](_0xf134e9,_0xf134e9['pos']),AudioManager[_0xc15e18(0x4ea)][_0xc15e18(0x537)](_0xf134e9[_0xc15e18(0x180)]));}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x14d),_0x3c1dd4=>{const _0x4778aa=_0x5af19b;VisuMZ['ConvertParams'](_0x3c1dd4,_0x3c1dd4);const _0x32e9e0=Math[_0x4778aa(0x548)](_0x3c1dd4['pan'])['clamp'](-0x64,0x64),_0x15e32f=AudioManager[_0x4778aa(0x5c6)];_0x15e32f&&(_0x15e32f['pan']=_0x32e9e0,_0x15e32f[_0x4778aa(0x180)]=AudioManager['_bgsBuffer'][_0x4778aa(0x361)](),AudioManager[_0x4778aa(0x30d)](_0x15e32f),AudioManager[_0x4778aa(0x626)](_0x15e32f,_0x15e32f['pos']),AudioManager[_0x4778aa(0x4ea)]['_startPlaying'](_0x15e32f[_0x4778aa(0x180)]));}),PluginManager['registerCommand'](pluginData['name'],_0x5af19b(0x16d),_0x1d7072=>{const _0x88560e=_0x5af19b;if(!$gameTemp['isPlaytest']())return;const _0x5b59e3=Input[_0x88560e(0x527)]();console[_0x88560e(0x615)](_0x5b59e3);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x574),_0x33a5c7=>{const _0x340ced=_0x5af19b;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x340ced(0x818)]())return;SceneManager[_0x340ced(0x4ff)][_0x340ced(0x8e8)]=![],VisuMZ[_0x340ced(0x585)][_0x340ced(0x18b)]();}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x58b),_0x48d6ec=>{const _0x19aa6a=_0x5af19b;if(!$gameTemp[_0x19aa6a(0x75a)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x19aa6a(0x4ff)]['_active']=![],VisuMZ[_0x19aa6a(0x585)]['ExportStrFromAllTroops']();}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x297),_0x36f649=>{const _0x5724e4=_0x5af19b;if(!$gameTemp[_0x5724e4(0x75a)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x5724e4(0x54d)](_0x36f649,_0x36f649);const _0x24e1a0=_0x5724e4(0x154)['format']($gameMap['mapId']()[_0x5724e4(0x351)](0x3)),_0x2921b5=VisuMZ[_0x5724e4(0x585)]['ExtractStrFromMap']($gameMap[_0x5724e4(0x211)]());VisuMZ[_0x5724e4(0x585)][_0x5724e4(0x462)](_0x2921b5,_0x24e1a0,!![]);}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x583),_0x2c2a26=>{const _0x58a1e2=_0x5af19b;if(!$gameTemp[_0x58a1e2(0x75a)]())return;if(!Utils[_0x58a1e2(0x818)]())return;if(!$gameParty[_0x58a1e2(0x352)]())return;VisuMZ[_0x58a1e2(0x54d)](_0x2c2a26,_0x2c2a26);const _0x73c62c=_0x58a1e2(0x4eb)[_0x58a1e2(0x8b9)]($gameTroop[_0x58a1e2(0x4a0)][_0x58a1e2(0x351)](0x4)),_0x26cb15=VisuMZ[_0x58a1e2(0x585)][_0x58a1e2(0x52a)]($gameTroop['_troopId']);VisuMZ['CoreEngine']['ExportString'](_0x26cb15,_0x73c62c,!![]);}),VisuMZ[_0x5af19b(0x585)]['ExportString']=function(_0x2bfb9f,_0xcf09b6,_0x1ef063){const _0x4f2b55=_0x5af19b,_0x1928cd=require('fs');let _0x44c989=_0x4f2b55(0x371)[_0x4f2b55(0x8b9)](_0xcf09b6||'0');_0x1928cd[_0x4f2b55(0x51d)](_0x44c989,_0x2bfb9f,_0x47d0f9=>{const _0x169736=_0x4f2b55;if(_0x47d0f9)throw err;else _0x1ef063&&alert(_0x169736(0x50c)['format'](_0x44c989));});},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x18b)]=function(){const _0x541485=_0x5af19b,_0x152d94=[];for(const _0x328700 of $dataMapInfos){if(!_0x328700)continue;_0x152d94[_0x541485(0x3a5)](_0x328700['id']);}const _0x34911b=_0x152d94[_0x541485(0x35d)]*0x64+Math['randomInt'](0x64);alert(_0x541485(0x785)[_0x541485(0x8b9)](_0x34911b)),this['_storedMapText']=[],this['_currentMap']=$dataMap;for(const _0x2a9b62 of _0x152d94){VisuMZ[_0x541485(0x585)][_0x541485(0x91d)](_0x2a9b62);}setTimeout(VisuMZ['CoreEngine'][_0x541485(0x1d3)][_0x541485(0x48b)](this),_0x34911b);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x91d)]=function(_0x55a06e){const _0x1d12fd=_0x5af19b,_0x242779=_0x1d12fd(0x545)['format'](_0x55a06e['padZero'](0x3)),_0x32c414=new XMLHttpRequest(),_0x59213f=_0x1d12fd(0x917)+_0x242779;_0x32c414[_0x1d12fd(0x338)](_0x1d12fd(0x8e6),_0x59213f),_0x32c414[_0x1d12fd(0x80e)](_0x1d12fd(0x1c9)),_0x32c414['onload']=()=>this[_0x1d12fd(0x8b8)](_0x32c414,_0x55a06e,_0x242779,_0x59213f),_0x32c414['onerror']=()=>DataManager[_0x1d12fd(0x4a6)](_0x1d12fd(0x709),_0x242779,_0x59213f),_0x32c414[_0x1d12fd(0x662)]();},VisuMZ['CoreEngine'][_0x5af19b(0x8b8)]=function(_0x8f5296,_0x79710e,_0x156363,_0x89359e){const _0x4f966a=_0x5af19b;$dataMap=JSON[_0x4f966a(0x66c)](_0x8f5296[_0x4f966a(0x469)]),DataManager[_0x4f966a(0x861)]($dataMap),this[_0x4f966a(0x891)][_0x79710e]=VisuMZ[_0x4f966a(0x585)][_0x4f966a(0x859)](_0x79710e),$dataMap=this[_0x4f966a(0x146)];},VisuMZ[_0x5af19b(0x585)]['exportAllMapStrings']=function(){const _0x153785=_0x5af19b,_0x3d05d9=_0x153785(0x1a8);this[_0x153785(0x891)][_0x153785(0x5df)](undefined)[_0x153785(0x5df)]('')[_0x153785(0x5df)](null);const _0x3effc8=this[_0x153785(0x891)][_0x153785(0x502)](_0x153785(0x87a))[_0x153785(0x254)]();VisuMZ[_0x153785(0x585)][_0x153785(0x462)](_0x3effc8,_0x3d05d9,!![]),SceneManager[_0x153785(0x4ff)]['_active']=!![];},VisuMZ['CoreEngine']['ExtractStrFromMap']=function(_0xdcd6ec){const _0x43f834=_0x5af19b;if(!$dataMap)return'';let _0x3490da='█'[_0x43f834(0x85e)](0x46)+'\x0a\x0a',_0x35befd='═'[_0x43f834(0x85e)](0x46)+'\x0a\x0a',_0x2152c1='';this['_commonEventLayers']=0x0;for(const _0x6a2dc5 of $dataMap[_0x43f834(0x7e2)]){if(!_0x6a2dc5)continue;let _0x3efab0=_0x6a2dc5['id'],_0x3efa45=_0x6a2dc5['name'],_0x5d20b6=_0x6a2dc5[_0x43f834(0x415)];for(const _0xece754 of _0x5d20b6){const _0x5a985c=_0x5d20b6[_0x43f834(0x840)](_0xece754)+0x1;let _0xb49dd1=_0x35befd+_0x43f834(0x86e),_0x372456=VisuMZ[_0x43f834(0x585)][_0x43f834(0x4b5)](_0xece754['list']);if(_0x372456[_0x43f834(0x35d)]>0x0){if(_0x2152c1[_0x43f834(0x35d)]>0x0)_0x2152c1+=_0x35befd+_0x43f834(0x87a);else{const _0x33ffe1=$dataMapInfos[_0xdcd6ec][_0x43f834(0x678)];_0x2152c1+=_0x3490da+_0x43f834(0x38e)[_0x43f834(0x8b9)](_0xdcd6ec,_0x33ffe1||'Unnamed')+_0x3490da;}_0x2152c1+=_0xb49dd1[_0x43f834(0x8b9)](_0x3efab0,_0x3efa45,_0x5a985c,_0x372456);}}}return _0x2152c1[_0x43f834(0x35d)]>0x0&&(_0x2152c1+=_0x35befd),_0x2152c1;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x852)]=function(){const _0x4aaf42=_0x5af19b,_0x5e4073=$dataTroops['length']*0xa+Math[_0x4aaf42(0x49b)](0xa);alert(_0x4aaf42(0x8fa)[_0x4aaf42(0x8b9)](_0x5e4073));const _0x35284c=[];for(const _0x2ac77c of $dataTroops){if(!_0x2ac77c)continue;const _0x462bcb=_0x2ac77c['id'];_0x35284c[_0x462bcb]=VisuMZ[_0x4aaf42(0x585)]['ExtractStrFromTroop'](_0x462bcb);}setTimeout(VisuMZ[_0x4aaf42(0x585)]['exportAllTroopStrings'][_0x4aaf42(0x48b)](this,_0x35284c),_0x5e4073);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x52a)]=function(_0x1397bb){const _0x45fae9=_0x5af19b;if(!$dataTroops[_0x1397bb])return'';let _0x2a45df='█'[_0x45fae9(0x85e)](0x46)+'\x0a\x0a',_0x5c47b2='═'[_0x45fae9(0x85e)](0x46)+'\x0a\x0a',_0x50adc2='';this[_0x45fae9(0x5d3)]=0x0;const _0x117d66=$dataTroops[_0x1397bb];let _0x55a080=_0x117d66[_0x45fae9(0x415)];for(const _0x2c014f of _0x55a080){const _0x592bcd=_0x55a080['indexOf'](_0x2c014f)+0x1;let _0x4f6c6a=_0x5c47b2+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x2eece1=VisuMZ[_0x45fae9(0x585)][_0x45fae9(0x4b5)](_0x2c014f[_0x45fae9(0x7c1)]);_0x2eece1[_0x45fae9(0x35d)]>0x0&&(_0x50adc2['length']>0x0?_0x50adc2+=_0x5c47b2+'\x0a\x0a\x0a\x0a\x0a':_0x50adc2+=_0x2a45df+_0x45fae9(0x2bf)['format'](_0x1397bb,_0x117d66['name']||_0x45fae9(0x59e))+_0x2a45df,_0x50adc2+=_0x4f6c6a[_0x45fae9(0x8b9)](_0x592bcd,_0x2eece1));}return _0x50adc2[_0x45fae9(0x35d)]>0x0&&(_0x50adc2+=_0x5c47b2),_0x50adc2;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x645)]=function(_0x306067){const _0x235c90=_0x5af19b,_0x4dba29=_0x235c90(0x4ce);_0x306067[_0x235c90(0x5df)](undefined)['remove']('')['remove'](null);const _0x5387e1=_0x306067[_0x235c90(0x502)](_0x235c90(0x87a))[_0x235c90(0x254)]();VisuMZ['CoreEngine'][_0x235c90(0x462)](_0x5387e1,_0x4dba29,!![]),SceneManager[_0x235c90(0x4ff)][_0x235c90(0x8e8)]=!![];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4b5)]=function(_0x142553){const _0x505898=_0x5af19b;let _0x28650e='\x0a'+'─'[_0x505898(0x85e)](0x46)+'\x0a',_0x2ca062='\x0a'+'┄'[_0x505898(0x85e)](0x46)+'\x0a',_0x19c4fa='';for(const _0x3e1db7 of _0x142553){if(!_0x3e1db7)continue;if(_0x3e1db7['code']===0x65)_0x19c4fa+=_0x28650e+'\x0a',_0x19c4fa+=_0x505898(0x2a4),_0x3e1db7[_0x505898(0x533)][0x4]!==''&&_0x3e1db7[_0x505898(0x533)][0x4]!==undefined&&(_0x19c4fa+='【%1】\x0a'[_0x505898(0x8b9)](_0x3e1db7[_0x505898(0x533)][0x4]));else{if(_0x3e1db7['code']===0x191)_0x19c4fa+=_0x505898(0x7df)['format'](_0x3e1db7['parameters'][0x0]);else{if(_0x3e1db7[_0x505898(0x5fb)]===0x192)_0x19c4fa+=_0x28650e,_0x19c4fa+=_0x505898(0x5d7)['format'](_0x2ca062,_0x3e1db7[_0x505898(0x533)][0x0]+0x1,_0x3e1db7[_0x505898(0x533)][0x1]);else{if(_0x3e1db7[_0x505898(0x5fb)]===0x193)_0x19c4fa+=_0x28650e,_0x19c4fa+='%1〘Choice\x20Cancel〙%1'[_0x505898(0x8b9)](_0x2ca062);else{if(_0x3e1db7[_0x505898(0x5fb)]===0x194)_0x19c4fa+=_0x28650e,_0x19c4fa+=_0x505898(0x89d)[_0x505898(0x8b9)](_0x2ca062);else{if(_0x3e1db7[_0x505898(0x5fb)]===0x69)_0x19c4fa+=_0x28650e+'\x0a',_0x19c4fa+=_0x505898(0x5b7);else{if(_0x3e1db7[_0x505898(0x5fb)]===0x6c)_0x19c4fa+=_0x28650e+'\x0a',_0x19c4fa+=_0x505898(0x7e5)['format'](_0x3e1db7[_0x505898(0x533)][0x0]);else{if(_0x3e1db7[_0x505898(0x5fb)]===0x198)_0x19c4fa+='%1\x0a'[_0x505898(0x8b9)](_0x3e1db7[_0x505898(0x533)][0x0]);else{if(_0x3e1db7[_0x505898(0x5fb)]===0x75){const _0x42a4cc=$dataCommonEvents[_0x3e1db7['parameters'][0x0]];if(_0x42a4cc&&this[_0x505898(0x5d3)]<=0xa){this[_0x505898(0x5d3)]++;let _0x436f5e=VisuMZ[_0x505898(0x585)]['ExtractStrFromList'](_0x42a4cc[_0x505898(0x7c1)]);_0x436f5e[_0x505898(0x35d)]>0x0&&(_0x19c4fa+=_0x28650e,_0x19c4fa+=_0x2ca062,_0x19c4fa+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'['format'](_0x42a4cc['id'],_0x42a4cc[_0x505898(0x678)]),_0x19c4fa+=_0x2ca062,_0x19c4fa+=_0x436f5e,_0x19c4fa+=_0x2ca062,_0x19c4fa+=_0x505898(0x7c0)['format'](_0x42a4cc['id'],_0x42a4cc[_0x505898(0x678)]),_0x19c4fa+=_0x2ca062),this[_0x505898(0x5d3)]--;}}}}}}}}}}}return _0x19c4fa[_0x505898(0x35d)]>0x0&&(_0x19c4fa+=_0x28650e),_0x19c4fa;},PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x6ea),_0x255b5b=>{const _0x16b11e=_0x5af19b;VisuMZ[_0x16b11e(0x54d)](_0x255b5b,_0x255b5b);const _0x1684ad=_0x255b5b['URL'];VisuMZ[_0x16b11e(0x219)](_0x1684ad);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x6f3),_0x5a6fb7=>{const _0x17e463=_0x5af19b;VisuMZ['ConvertParams'](_0x5a6fb7,_0x5a6fb7);const _0x3c09ab=_0x5a6fb7[_0x17e463(0x741)]||0x0;$gameParty[_0x17e463(0x8bd)](_0x3c09ab);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x1a1),_0x4ba385=>{const _0x3dac7a=_0x5af19b;if(!SceneManager[_0x3dac7a(0x4de)]())return;VisuMZ[_0x3dac7a(0x54d)](_0x4ba385,_0x4ba385);const _0x1cc0ee=_0x4ba385[_0x3dac7a(0x8be)];SceneManager['_scene']['playOnceParallelInterpreter'](_0x1cc0ee);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x6d0),_0x4429bc=>{const _0x56e76c=_0x5af19b;if(!$gameTemp[_0x56e76c(0x75a)]())return;if(!Utils[_0x56e76c(0x818)]())return;VisuMZ[_0x56e76c(0x54d)](_0x4429bc,_0x4429bc);const _0x3c1d53=_0x4429bc[_0x56e76c(0x269)]||0x1;$gameTemp[_0x56e76c(0x630)]=_0x3c1d53;}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],'PictureEasingType',_0x1678cf=>{const _0x113f3a=_0x5af19b;VisuMZ['ConvertParams'](_0x1678cf,_0x1678cf);const _0x74be1f=_0x1678cf['pictureId']||0x1,_0x5804e5=_0x1678cf[_0x113f3a(0x89c)]||_0x113f3a(0x2c5),_0x5a596b=$gameScreen[_0x113f3a(0x813)](_0x74be1f);_0x5a596b&&_0x5a596b[_0x113f3a(0x5e8)](_0x5804e5);}),PluginManager[_0x5af19b(0x1cc)](pluginData['name'],_0x5af19b(0x4db),_0x12bef0=>{const _0x41b87f=_0x5af19b;for(let _0x3cf039=0x1;_0x3cf039<=$gameScreen[_0x41b87f(0x7b0)]();_0x3cf039++){$gameScreen[_0x41b87f(0x80d)](_0x3cf039);}}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x48c),_0x36d3d3=>{const _0x5dbb2a=_0x5af19b;VisuMZ['ConvertParams'](_0x36d3d3,_0x36d3d3);const _0x11dae1=Math[_0x5dbb2a(0x2fc)](_0x36d3d3[_0x5dbb2a(0x7ef)],_0x36d3d3['EndingID']),_0x44e3d5=Math['max'](_0x36d3d3[_0x5dbb2a(0x7ef)],_0x36d3d3['EndingID']);for(let _0x10df46=_0x11dae1;_0x10df46<=_0x44e3d5;_0x10df46++){$gameScreen[_0x5dbb2a(0x80d)](_0x10df46);}}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x4c7),_0x4e31fb=>{const _0x270bf3=_0x5af19b;VisuMZ[_0x270bf3(0x54d)](_0x4e31fb,_0x4e31fb);const _0x1b9e15=Math['round'](_0x4e31fb['PictureID'])[_0x270bf3(0x767)](0x1,0x64),_0x1ea08e=-Number(_0x4e31fb['AdjustAngle']||0x0),_0x6c7cb4=Math['max'](_0x4e31fb[_0x270bf3(0x7db)]||0x0,0x0),_0x2e4fe5=_0x4e31fb['easingType']||_0x270bf3(0x2c5),_0x26cdea=_0x4e31fb[_0x270bf3(0x913)],_0x3a3df3=$gameScreen['picture'](_0x1b9e15);if(!_0x3a3df3)return;_0x3a3df3['changeAnglePlusData'](_0x1ea08e,_0x6c7cb4,_0x2e4fe5);if(_0x26cdea){const _0x298f2f=$gameTemp[_0x270bf3(0x890)]();if(_0x298f2f)_0x298f2f[_0x270bf3(0x8f2)](_0x6c7cb4);}}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x933),_0x54612e=>{const _0xd2f193=_0x5af19b;VisuMZ['ConvertParams'](_0x54612e,_0x54612e);const _0x9f86d0=Math['round'](_0x54612e[_0xd2f193(0x269)])[_0xd2f193(0x767)](0x1,0x64),_0x32da37=-Number(_0x54612e[_0xd2f193(0x3e6)]||0x0),_0x99ed05=Math['max'](_0x54612e[_0xd2f193(0x7db)]||0x0,0x0),_0x552f75=_0x54612e[_0xd2f193(0x89c)]||_0xd2f193(0x2c5),_0x248605=_0x54612e[_0xd2f193(0x913)],_0x14c56e=$gameScreen[_0xd2f193(0x813)](_0x9f86d0);if(!_0x14c56e)return;_0x14c56e['setAnglePlusData'](_0x32da37,_0x99ed05,_0x552f75);if(_0x248605){const _0x521a88=$gameTemp['getLastPluginCommandInterpreter']();if(_0x521a88)_0x521a88['wait'](_0x99ed05);}}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x4a7),_0x8d69b0=>{const _0x2fb0da=_0x5af19b;VisuMZ['ConvertParams'](_0x8d69b0,_0x8d69b0);const _0x26c353=Math[_0x2fb0da(0x548)](_0x8d69b0['PictureID'])['clamp'](0x1,0x64),_0x5c4d54=_0x8d69b0['Settings'],_0x586e32=_0x5c4d54[_0x2fb0da(0x60b)][_0x2fb0da(0x767)](0x0,0x1),_0x2f5faa=Math[_0x2fb0da(0x548)](_0x5c4d54[_0x2fb0da(0x65b)]||0x0),_0x1cd8a4=Math[_0x2fb0da(0x548)](_0x5c4d54[_0x2fb0da(0x50d)]||0x0),_0x44e369=Math['round'](_0x5c4d54[_0x2fb0da(0x680)]||0x0),_0x1566ce=Math['round'](_0x5c4d54[_0x2fb0da(0x719)]||0x0),_0x2bb137=Math[_0x2fb0da(0x548)](_0x5c4d54[_0x2fb0da(0x85c)])[_0x2fb0da(0x767)](0x0,0xff),_0x374712=_0x5c4d54[_0x2fb0da(0x57e)],_0x572f70='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x1c94a7=_0x8d69b0['Smooth']?'Smooth':'Pixelated',_0x56ae81=_0x572f70[_0x2fb0da(0x8b9)](_0x8d69b0[_0x2fb0da(0x17d)],_0x1c94a7);$gameScreen[_0x2fb0da(0x1ee)](_0x26c353,_0x56ae81,_0x586e32,_0x2f5faa,_0x1cd8a4,_0x44e369,_0x1566ce,_0x2bb137,_0x374712);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x44c),_0x160796=>{const _0x2740cf=_0x5af19b;VisuMZ['ConvertParams'](_0x160796,_0x160796);const _0x1fd58e=_0x160796['Type']||'random',_0x3d5975=_0x160796[_0x2740cf(0x8d6)]['clamp'](0x1,0x9),_0x1cbaa0=_0x160796[_0x2740cf(0x8da)][_0x2740cf(0x767)](0x1,0x9),_0x1f6221=_0x160796[_0x2740cf(0x7db)]||0x1,_0x1f8cf0=_0x160796[_0x2740cf(0x913)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x1fd58e),$gameScreen[_0x2740cf(0x677)](_0x3d5975,_0x1cbaa0,_0x1f6221);if(_0x1f8cf0){const _0x5839cd=$gameTemp[_0x2740cf(0x890)]();if(_0x5839cd)_0x5839cd[_0x2740cf(0x8f2)](_0x1f6221);}}),PluginManager[_0x5af19b(0x1cc)](pluginData['name'],'SwitchRandomizeOne',_0x2535e5=>{const _0x1e7034=_0x5af19b;if($gameParty[_0x1e7034(0x352)]())return;VisuMZ['ConvertParams'](_0x2535e5,_0x2535e5);const _0x184ebd=_0x2535e5['IDs'],_0x20bcc2=(_0x2535e5[_0x1e7034(0x5b9)]||0x0)/0x64;for(const _0x3dd21d of _0x184ebd){const _0x580ef8=Math[_0x1e7034(0x186)]()<=_0x20bcc2;$gameSwitches['setValue'](_0x3dd21d,_0x580ef8);}}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],'SwitchRandomizeRange',_0xc881b5=>{const _0x325d71=_0x5af19b;if($gameParty[_0x325d71(0x352)]())return;VisuMZ[_0x325d71(0x54d)](_0xc881b5,_0xc881b5);const _0x4887dc=Math[_0x325d71(0x2fc)](_0xc881b5[_0x325d71(0x7ef)],_0xc881b5[_0x325d71(0x306)]),_0x558d6f=Math[_0x325d71(0x689)](_0xc881b5[_0x325d71(0x7ef)],_0xc881b5[_0x325d71(0x306)]),_0x651407=(_0xc881b5[_0x325d71(0x5b9)]||0x0)/0x64;for(let _0x1dc5fb=_0x4887dc;_0x1dc5fb<=_0x558d6f;_0x1dc5fb++){const _0x394070=Math[_0x325d71(0x186)]()<=_0x651407;$gameSwitches[_0x325d71(0x2e2)](_0x1dc5fb,_0x394070);}}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x744),_0x52975d=>{const _0x113651=_0x5af19b;if($gameParty[_0x113651(0x352)]())return;VisuMZ[_0x113651(0x54d)](_0x52975d,_0x52975d);const _0x5ea75d=_0x52975d[_0x113651(0x895)];for(const _0x3bd657 of _0x5ea75d){const _0x45e0a5=$gameSwitches[_0x113651(0x741)](_0x3bd657);$gameSwitches[_0x113651(0x2e2)](_0x3bd657,!_0x45e0a5);}}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x612),_0x9c5d47=>{const _0x25b898=_0x5af19b;if($gameParty[_0x25b898(0x352)]())return;VisuMZ[_0x25b898(0x54d)](_0x9c5d47,_0x9c5d47);const _0x1df2e0=Math['min'](_0x9c5d47[_0x25b898(0x7ef)],_0x9c5d47[_0x25b898(0x306)]),_0xc856f2=Math['max'](_0x9c5d47['StartID'],_0x9c5d47[_0x25b898(0x306)]);for(let _0x3bc9b9=_0x1df2e0;_0x3bc9b9<=_0xc856f2;_0x3bc9b9++){const _0x470196=$gameSwitches[_0x25b898(0x741)](_0x3bc9b9);$gameSwitches[_0x25b898(0x2e2)](_0x3bc9b9,!_0x470196);}}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x4b7),_0x50c687=>{const _0x2694e2=_0x5af19b;VisuMZ['ConvertParams'](_0x50c687,_0x50c687);const _0x188824=_0x50c687[_0x2694e2(0x88b)]||0x1;$gameSystem[_0x2694e2(0x490)](_0x188824);}),PluginManager[_0x5af19b(0x1cc)](pluginData['name'],_0x5af19b(0x466),_0x4148f2=>{const _0x155862=_0x5af19b;if($gameParty['inBattle']())return;VisuMZ[_0x155862(0x54d)](_0x4148f2,_0x4148f2);const _0x248602=_0x4148f2[_0x155862(0x88b)];if(_0x248602[_0x155862(0x37b)](/Front/i))$gameSystem[_0x155862(0x86c)](![]);else _0x248602[_0x155862(0x37b)](/Side/i)?$gameSystem[_0x155862(0x86c)](!![]):$gameSystem['setSideView'](!$gameSystem[_0x155862(0x865)]());}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x5c2),_0x3f266f=>{const _0xa440b4=_0x5af19b;if($gameParty[_0xa440b4(0x352)]())return;VisuMZ['ConvertParams'](_0x3f266f,_0x3f266f);const _0x168dc3=['bgm',_0xa440b4(0x730),'me','se'];for(const _0x2d2544 of _0x168dc3){const _0x2e9a2c=_0x3f266f[_0x2d2544],_0x14534a=_0xa440b4(0x508)[_0xa440b4(0x8b9)](_0x2d2544);for(const _0x555177 of _0x2e9a2c){AudioManager[_0xa440b4(0x641)](_0x14534a,_0x555177);}}}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x7d4),_0xa36f3e=>{const _0x3eae4c=_0x5af19b;if($gameParty[_0x3eae4c(0x352)]())return;VisuMZ[_0x3eae4c(0x54d)](_0xa36f3e,_0xa36f3e);const _0x3faed0=[_0x3eae4c(0x45c),_0x3eae4c(0x44b),_0x3eae4c(0x332),_0x3eae4c(0x92b),_0x3eae4c(0x60c),_0x3eae4c(0x7fa),_0x3eae4c(0x822),_0x3eae4c(0x304),'sv_actors',_0x3eae4c(0x5cd),_0x3eae4c(0x566),_0x3eae4c(0x405),'titles1',_0x3eae4c(0x4df)];for(const _0x3b231c of _0x3faed0){const _0x189efe=_0xa36f3e[_0x3b231c],_0x26e8de=_0x3eae4c(0x39d)[_0x3eae4c(0x8b9)](_0x3b231c);for(const _0x3695d8 of _0x189efe){ImageManager[_0x3eae4c(0x37a)](_0x26e8de,_0x3695d8);}}}),PluginManager['registerCommand'](pluginData[_0x5af19b(0x678)],_0x5af19b(0x606),_0x242640=>{const _0x304fbd=_0x5af19b;if($gameParty[_0x304fbd(0x352)]())return;VisuMZ[_0x304fbd(0x54d)](_0x242640,_0x242640);const _0x54902e=_0x242640[_0x304fbd(0x88b)]['toUpperCase']()['trim'](),_0x4fdd0=VisuMZ[_0x304fbd(0x585)][_0x304fbd(0x22a)](_0x54902e);$gameSystem[_0x304fbd(0x367)](_0x4fdd0);}),VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x22a)]=function(_0x46b949){const _0x4d40eb=_0x5af19b;_0x46b949=_0x46b949||'DATABASE',_0x46b949=String(_0x46b949)['toUpperCase']()[_0x4d40eb(0x254)]();switch(_0x46b949){case _0x4d40eb(0x2c3):return 0x0;case _0x4d40eb(0x51a):Imported[_0x4d40eb(0x51e)]&&(ConfigManager[_0x4d40eb(0x659)]=!![]);return 0x1;case _0x4d40eb(0x93e):Imported[_0x4d40eb(0x51e)]&&(ConfigManager[_0x4d40eb(0x659)]=![]);return 0x2;case'CTB':if(Imported[_0x4d40eb(0x1ea)])return _0x4d40eb(0x5e0);break;case _0x4d40eb(0x4d0):if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x4d40eb(0x4d0);break;case _0x4d40eb(0x1e0):if(Imported[_0x4d40eb(0x3d1)])return _0x4d40eb(0x1e0);break;case _0x4d40eb(0x5b1):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x4d40eb(0x5b1);break;case _0x4d40eb(0x53c):if(Imported[_0x4d40eb(0x62e)])return _0x4d40eb(0x53c);break;case'ETB':if(Imported[_0x4d40eb(0x70d)])return _0x4d40eb(0x412);break;case _0x4d40eb(0x53e):if(Imported['VisuMZ_2_BattleSystemPTB'])return'PTB';break;}return $dataSystem['battleSystem'];},PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x909),_0x2b3ac9=>{const _0x31aa98=_0x5af19b;VisuMZ['ConvertParams'](_0x2b3ac9,_0x2b3ac9);const _0x51506c=_0x2b3ac9[_0x31aa98(0x88b)]||0x1;$gameSystem[_0x31aa98(0x188)](_0x51506c);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],_0x5af19b(0x336),_0x512854=>{const _0x129e11=_0x5af19b;VisuMZ[_0x129e11(0x54d)](_0x512854,_0x512854);const _0x16afc5=_0x512854['text']||'';$textPopup(_0x16afc5);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],'VariableEvalReference',_0x3ea2d4=>{const _0x11b2b3=_0x5af19b;VisuMZ[_0x11b2b3(0x54d)](_0x3ea2d4,_0x3ea2d4);const _0x641ee3=_0x3ea2d4['id']||0x1,_0x141a38=_0x3ea2d4[_0x11b2b3(0x456)],_0x3d88e8=_0x3ea2d4['operand']||0x0;let _0x1c79f9=$gameVariables['value'](_0x641ee3)||0x0;switch(_0x141a38){case'=':_0x1c79f9=_0x3d88e8;break;case'+':_0x1c79f9+=_0x3d88e8;break;case'-':_0x1c79f9-=_0x3d88e8;break;case'*':_0x1c79f9*=_0x3d88e8;break;case'/':_0x1c79f9/=_0x3d88e8;break;case'%':_0x1c79f9%=_0x3d88e8;break;}_0x1c79f9=_0x1c79f9||0x0,$gameVariables[_0x11b2b3(0x2e2)](_0x641ee3,_0x1c79f9);}),PluginManager[_0x5af19b(0x1cc)](pluginData[_0x5af19b(0x678)],'VariableJsBlock',_0x37f3f8=>{const _0x1a43a3=_0x5af19b;VisuMZ[_0x1a43a3(0x54d)](_0x37f3f8,_0x37f3f8);const _0xde3cad=_0x37f3f8['id']()||0x1,_0x362c60=_0x37f3f8['operation'],_0x3dbb6d=_0x37f3f8[_0x1a43a3(0x76b)]()||0x0;let _0x19d35e=$gameVariables[_0x1a43a3(0x741)](_0xde3cad)||0x0;switch(_0x362c60){case'=':_0x19d35e=_0x3dbb6d;break;case'+':_0x19d35e+=_0x3dbb6d;break;case'-':_0x19d35e-=_0x3dbb6d;break;case'*':_0x19d35e*=_0x3dbb6d;break;case'/':_0x19d35e/=_0x3dbb6d;break;case'%':_0x19d35e%=_0x3dbb6d;break;}_0x19d35e=_0x19d35e||0x0,$gameVariables['setValue'](_0xde3cad,_0x19d35e);}),VisuMZ[_0x5af19b(0x585)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x5af19b(0x148)],Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x148)]=function(){const _0x61df1f=_0x5af19b;VisuMZ[_0x61df1f(0x585)][_0x61df1f(0x56f)]['call'](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x61df1f(0x5d2)](),this['process_VisuMZ_CoreEngine_Settings'](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x61df1f(0x3b5)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x61df1f(0x7dd)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x268)]={},Scene_Boot['prototype'][_0x5af19b(0x20e)]=function(){const _0xe1ea38=_0x5af19b,_0x35ac49=[_0xe1ea38(0x676),_0xe1ea38(0x36e),_0xe1ea38(0x7ee),_0xe1ea38(0x794),'MAT',_0xe1ea38(0x2d8),_0xe1ea38(0x168),_0xe1ea38(0x5e3)],_0x470902=[_0xe1ea38(0x835),_0xe1ea38(0x44f),_0xe1ea38(0x223),'CEV',_0xe1ea38(0x3de),_0xe1ea38(0x562),_0xe1ea38(0x3b3),_0xe1ea38(0x437),_0xe1ea38(0x8c7),_0xe1ea38(0x90e)],_0x468c16=[_0xe1ea38(0x15a),_0xe1ea38(0x6f1),_0xe1ea38(0x705),_0xe1ea38(0x3c3),_0xe1ea38(0x89f),_0xe1ea38(0x1e4),_0xe1ea38(0x28d),_0xe1ea38(0x3b2),'FDR','EXR'],_0x21b7d8=[_0x35ac49,_0x470902,_0x468c16],_0x5d7d1a=[_0xe1ea38(0x5c8),'Plus1','Plus2',_0xe1ea38(0x530),'Rate',_0xe1ea38(0x5aa),_0xe1ea38(0x53b),_0xe1ea38(0x651),_0xe1ea38(0x3ae),_0xe1ea38(0x7f5)];for(const _0x5ef218 of _0x21b7d8){let _0x1dc714='';if(_0x5ef218===_0x35ac49)_0x1dc714='param';if(_0x5ef218===_0x470902)_0x1dc714=_0xe1ea38(0x429);if(_0x5ef218===_0x468c16)_0x1dc714=_0xe1ea38(0x42e);for(const _0x1a1ff6 of _0x5d7d1a){let _0x1fcefd=_0xe1ea38(0x39b)[_0xe1ea38(0x8b9)](_0x1dc714,_0x1a1ff6);VisuMZ[_0xe1ea38(0x585)][_0xe1ea38(0x268)][_0x1fcefd]=[],VisuMZ['CoreEngine'][_0xe1ea38(0x268)][_0x1fcefd+'JS']=[];let _0x494f89=_0xe1ea38(0x8a3);if([_0xe1ea38(0x5c8),'Flat'][_0xe1ea38(0x319)](_0x1a1ff6))_0x494f89+=_0xe1ea38(0x40f);else{if([_0xe1ea38(0x702),'Flat1'][_0xe1ea38(0x319)](_0x1a1ff6))_0x494f89+=_0xe1ea38(0x860);else{if([_0xe1ea38(0x920),'Flat2'][_0xe1ea38(0x319)](_0x1a1ff6))_0x494f89+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x1a1ff6===_0xe1ea38(0x530))_0x494f89+='(\x5cd+)>';else{if(_0x1a1ff6==='Rate1')_0x494f89+=_0xe1ea38(0x54e);else _0x1a1ff6==='Rate2'&&(_0x494f89+=_0xe1ea38(0x1c3));}}}}for(const _0x5a645a of _0x5ef218){let _0x59815b=_0x1a1ff6[_0xe1ea38(0x7f0)](/[\d+]/g,'')[_0xe1ea38(0x49d)]();const _0x1b973e=_0x494f89['format'](_0x5a645a,_0x59815b);VisuMZ[_0xe1ea38(0x585)]['RegExp'][_0x1fcefd][_0xe1ea38(0x3a5)](new RegExp(_0x1b973e,'i'));const _0x583828=_0xe1ea38(0x8c2)['format'](_0x5a645a,_0x59815b);VisuMZ[_0xe1ea38(0x585)][_0xe1ea38(0x268)][_0x1fcefd+'JS'][_0xe1ea38(0x3a5)](new RegExp(_0x583828,'i'));}}}},Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x5d2)]=function(){const _0x2a9d2b=_0x5af19b;if(VisuMZ[_0x2a9d2b(0x7dd)])return;},Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x811)]=function(){const _0x23f8b1=_0x5af19b,_0x473d82=VisuMZ[_0x23f8b1(0x585)]['Settings'];_0x473d82[_0x23f8b1(0x2cf)]['OpenConsole']&&VisuMZ['ShowDevTools'](!![]);_0x473d82[_0x23f8b1(0x2cf)][_0x23f8b1(0x1d5)]&&(Input[_0x23f8b1(0x264)][0x23]=_0x23f8b1(0x78a),Input[_0x23f8b1(0x264)][0x24]=_0x23f8b1(0x86f));if(_0x473d82[_0x23f8b1(0x4be)]){const _0x23b759=_0x473d82[_0x23f8b1(0x4be)];_0x23b759['KeySHIFT']=_0x23b759['KeySHIFT']||_0x23f8b1(0x7e6),_0x23b759[_0x23f8b1(0x63b)]=_0x23b759[_0x23f8b1(0x63b)]||_0x23f8b1(0x6cd);}_0x473d82[_0x23f8b1(0x8ad)][_0x23f8b1(0x3d7)]&&(Input[_0x23f8b1(0x264)][0x57]='up',Input[_0x23f8b1(0x264)][0x41]=_0x23f8b1(0x334),Input[_0x23f8b1(0x264)][0x53]=_0x23f8b1(0x30e),Input[_0x23f8b1(0x264)][0x44]=_0x23f8b1(0x35a),Input[_0x23f8b1(0x264)][0x45]='pagedown'),_0x473d82[_0x23f8b1(0x8ad)]['DashToggleR']&&(Input[_0x23f8b1(0x264)][0x52]=_0x23f8b1(0x15e)),_0x473d82['Param'][_0x23f8b1(0x232)]=_0x473d82[_0x23f8b1(0x61e)][_0x23f8b1(0x232)][_0x23f8b1(0x156)](_0x573c64=>_0x573c64[_0x23f8b1(0x49d)]()[_0x23f8b1(0x254)]()),_0x473d82[_0x23f8b1(0x61e)][_0x23f8b1(0x4e0)]=_0x473d82['Param'][_0x23f8b1(0x4e0)][_0x23f8b1(0x156)](_0xdd34be=>_0xdd34be[_0x23f8b1(0x49d)]()['trim']()),_0x473d82[_0x23f8b1(0x2cf)][_0x23f8b1(0x5fc)]=_0x473d82[_0x23f8b1(0x2cf)][_0x23f8b1(0x5fc)]??!![],_0x473d82[_0x23f8b1(0x2cf)][_0x23f8b1(0x6fd)]=_0x473d82['QoL'][_0x23f8b1(0x6fd)]??!![],_0x473d82['ButtonAssist'][_0x23f8b1(0x577)]&&VisuMZ['CoreEngine'][_0x23f8b1(0x36f)]();},VisuMZ['CoreEngine'][_0x5af19b(0x36f)]=function(){const _0x5b557e=_0x5af19b;let _0x16bb89=![],_0x3400a4=![];for(let _0x349503 in Input[_0x5b557e(0x264)]){const _0x2492f7=Input[_0x5b557e(0x264)][_0x349503];if(_0x2492f7===_0x5b557e(0x608))_0x16bb89=!![];if(_0x2492f7===_0x5b557e(0x252))_0x3400a4=!![];if(_0x16bb89&&_0x3400a4)return;}let _0x195ce7=_0x5b557e(0x8e3);_0x195ce7+=_0x5b557e(0x77e),_0x195ce7+='buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20',_0x195ce7+='keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a',_0x195ce7+=_0x5b557e(0x1c0),alert(_0x195ce7),SceneManager[_0x5b557e(0x358)]();},Scene_Boot['prototype'][_0x5af19b(0x313)]=function(){const _0x493369=_0x5af19b;this[_0x493369(0x350)]();},Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x350)]=function(){const _0x1d4d5b=_0x5af19b,_0x3e0285=VisuMZ['CoreEngine'][_0x1d4d5b(0x47e)][_0x1d4d5b(0x83c)];for(const _0x53dbdd of _0x3e0285){const _0x16af7a=_0x53dbdd[_0x1d4d5b(0x1f2)][_0x1d4d5b(0x7f0)](/[ ]/g,''),_0x3c99f8=_0x53dbdd['CodeJS'];VisuMZ[_0x1d4d5b(0x585)][_0x1d4d5b(0x553)](_0x16af7a,_0x3c99f8);}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x553)]=function(_0x548b99,_0x15cdf0){const _0x44c1f0=_0x5af19b;if(!!window[_0x548b99]){if($gameTemp[_0x44c1f0(0x75a)]())console[_0x44c1f0(0x615)](_0x44c1f0(0x1af)[_0x44c1f0(0x8b9)](_0x548b99));}const _0x3b3ad5='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x44c1f0(0x8b9)](_0x548b99,_0x15cdf0);window[_0x548b99]=new Function(_0x3b3ad5);},Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x3b5)]=function(){const _0x1a9974=_0x5af19b,_0x2b09f2=VisuMZ[_0x1a9974(0x585)]['Settings'][_0x1a9974(0x7ac)];if(!_0x2b09f2)return;for(const _0x3e8320 of _0x2b09f2){if(!_0x3e8320)continue;VisuMZ['CoreEngine'][_0x1a9974(0x262)](_0x3e8320);}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x28b)]={},VisuMZ['CoreEngine'][_0x5af19b(0x52e)]={},VisuMZ[_0x5af19b(0x585)]['CustomParamType']={},VisuMZ[_0x5af19b(0x585)]['CustomParamAbb']={},VisuMZ['CoreEngine'][_0x5af19b(0x262)]=function(_0x402df3){const _0x3c0305=_0x5af19b,_0xcfe79e=_0x402df3[_0x3c0305(0x196)],_0x18dd49=_0x402df3[_0x3c0305(0x8ca)],_0x8c29eb=_0x402df3['Icon'],_0x4eeafd=_0x402df3[_0x3c0305(0x410)],_0x301408=new Function(_0x402df3[_0x3c0305(0x295)]);VisuMZ[_0x3c0305(0x585)][_0x3c0305(0x28b)][_0xcfe79e[_0x3c0305(0x49d)]()[_0x3c0305(0x254)]()]=_0x18dd49,VisuMZ['CoreEngine'][_0x3c0305(0x52e)][_0xcfe79e['toUpperCase']()['trim']()]=_0x8c29eb,VisuMZ[_0x3c0305(0x585)][_0x3c0305(0x5ba)][_0xcfe79e['toUpperCase']()['trim']()]=_0x4eeafd,VisuMZ[_0x3c0305(0x585)][_0x3c0305(0x6f6)][_0xcfe79e[_0x3c0305(0x49d)]()[_0x3c0305(0x254)]()]=_0xcfe79e,Object[_0x3c0305(0x340)](Game_BattlerBase[_0x3c0305(0x397)],_0xcfe79e,{'get'(){const _0x44d41a=_0x3c0305,_0x253507=_0x301408['call'](this);return _0x4eeafd===_0x44d41a(0x6be)?Math['round'](_0x253507):_0x253507;}});},VisuMZ['CoreEngine'][_0x5af19b(0x3b9)]={},VisuMZ['CoreEngine'][_0x5af19b(0x597)]={},Scene_Boot[_0x5af19b(0x397)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x52b68e=_0x5af19b,_0x102c61=VisuMZ[_0x52b68e(0x585)][_0x52b68e(0x47e)][_0x52b68e(0x3b9)];for(const _0xfad055 of _0x102c61){const _0x52b8a7=(_0xfad055[_0x52b68e(0x91f)]||'')['toLowerCase']()[_0x52b68e(0x254)](),_0x11eabb=(_0xfad055[_0x52b68e(0x944)]||'')[_0x52b68e(0x79e)]()[_0x52b68e(0x254)]();VisuMZ[_0x52b68e(0x585)][_0x52b68e(0x3b9)][_0x52b8a7]=_0xfad055,VisuMZ[_0x52b68e(0x585)][_0x52b68e(0x597)][_0x11eabb]=_0x52b8a7;}},VisuMZ[_0x5af19b(0x7dd)]=function(){const _0x107f5a=_0x5af19b;for(const _0x4a772d of $dataActors){if(_0x4a772d)VisuMZ[_0x107f5a(0x2dd)](_0x4a772d);}for(const _0x26c8ab of $dataClasses){if(_0x26c8ab)VisuMZ[_0x107f5a(0x1fb)](_0x26c8ab);}for(const _0x1999fb of $dataSkills){if(_0x1999fb)VisuMZ[_0x107f5a(0x516)](_0x1999fb);}for(const _0x61e869 of $dataItems){if(_0x61e869)VisuMZ['ParseItemNotetags'](_0x61e869);}for(const _0x5925ae of $dataWeapons){if(_0x5925ae)VisuMZ[_0x107f5a(0x488)](_0x5925ae);}for(const _0x7f6c2e of $dataArmors){if(_0x7f6c2e)VisuMZ[_0x107f5a(0x5a0)](_0x7f6c2e);}for(const _0x47919b of $dataEnemies){if(_0x47919b)VisuMZ[_0x107f5a(0x193)](_0x47919b);}for(const _0x465f2d of $dataStates){if(_0x465f2d)VisuMZ['ParseStateNotetags'](_0x465f2d);}for(const _0x2050b4 of $dataTilesets){if(_0x2050b4)VisuMZ['ParseTilesetNotetags'](_0x2050b4);}},VisuMZ[_0x5af19b(0x2dd)]=function(_0x3de330){},VisuMZ['ParseClassNotetags']=function(_0x28f615){},VisuMZ[_0x5af19b(0x516)]=function(_0x2ddad1){},VisuMZ[_0x5af19b(0x1ae)]=function(_0x49f143){},VisuMZ['ParseWeaponNotetags']=function(_0x2726e9){},VisuMZ['ParseArmorNotetags']=function(_0x51d81d){},VisuMZ[_0x5af19b(0x193)]=function(_0x304ec3){},VisuMZ[_0x5af19b(0x5b3)]=function(_0xdc09e6){},VisuMZ['ParseTilesetNotetags']=function(_0x3a4ecb){},VisuMZ['CoreEngine'][_0x5af19b(0x2dd)]=VisuMZ[_0x5af19b(0x2dd)],VisuMZ[_0x5af19b(0x2dd)]=function(_0x3279c6){const _0x2e26f6=_0x5af19b;VisuMZ[_0x2e26f6(0x585)][_0x2e26f6(0x2dd)][_0x2e26f6(0x535)](this,_0x3279c6);const _0x160be8=_0x3279c6[_0x2e26f6(0x24a)];if(_0x160be8[_0x2e26f6(0x37b)](/<MAX LEVEL:[ ](\d+)>/i)){_0x3279c6[_0x2e26f6(0x8b7)]=Number(RegExp['$1']);if(_0x3279c6['maxLevel']===0x0)_0x3279c6[_0x2e26f6(0x8b7)]=Number[_0x2e26f6(0x1ec)];}_0x160be8[_0x2e26f6(0x37b)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x3279c6[_0x2e26f6(0x7ea)]=Math[_0x2e26f6(0x2fc)](Number(RegExp['$1']),_0x3279c6[_0x2e26f6(0x8b7)]));},VisuMZ['CoreEngine'][_0x5af19b(0x1fb)]=VisuMZ[_0x5af19b(0x1fb)],VisuMZ[_0x5af19b(0x1fb)]=function(_0x35c266){const _0x17f4e9=_0x5af19b;VisuMZ[_0x17f4e9(0x585)][_0x17f4e9(0x1fb)][_0x17f4e9(0x535)](this,_0x35c266);if(_0x35c266[_0x17f4e9(0x79a)])for(const _0x40377d of _0x35c266[_0x17f4e9(0x79a)]){_0x40377d[_0x17f4e9(0x24a)][_0x17f4e9(0x37b)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x40377d[_0x17f4e9(0x2f3)]=Math[_0x17f4e9(0x689)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x193)]=VisuMZ[_0x5af19b(0x193)],VisuMZ[_0x5af19b(0x193)]=function(_0x1b0334){const _0x56870e=_0x5af19b;VisuMZ[_0x56870e(0x585)][_0x56870e(0x193)][_0x56870e(0x535)](this,_0x1b0334),_0x1b0334['level']=0x1;const _0x3df57e=_0x1b0334[_0x56870e(0x24a)];if(_0x3df57e[_0x56870e(0x37b)](/<LEVEL:[ ](\d+)>/i))_0x1b0334[_0x56870e(0x2f3)]=Number(RegExp['$1']);if(_0x3df57e['match'](/<MAXHP:[ ](\d+)>/i))_0x1b0334[_0x56870e(0x28c)][0x0]=Number(RegExp['$1']);if(_0x3df57e['match'](/<MAXMP:[ ](\d+)>/i))_0x1b0334[_0x56870e(0x28c)][0x1]=Number(RegExp['$1']);if(_0x3df57e[_0x56870e(0x37b)](/<ATK:[ ](\d+)>/i))_0x1b0334[_0x56870e(0x28c)][0x2]=Number(RegExp['$1']);if(_0x3df57e['match'](/<DEF:[ ](\d+)>/i))_0x1b0334['params'][0x3]=Number(RegExp['$1']);if(_0x3df57e[_0x56870e(0x37b)](/<MAT:[ ](\d+)>/i))_0x1b0334['params'][0x4]=Number(RegExp['$1']);if(_0x3df57e[_0x56870e(0x37b)](/<MDF:[ ](\d+)>/i))_0x1b0334['params'][0x5]=Number(RegExp['$1']);if(_0x3df57e[_0x56870e(0x37b)](/<AGI:[ ](\d+)>/i))_0x1b0334['params'][0x6]=Number(RegExp['$1']);if(_0x3df57e[_0x56870e(0x37b)](/<LUK:[ ](\d+)>/i))_0x1b0334['params'][0x7]=Number(RegExp['$1']);if(_0x3df57e[_0x56870e(0x37b)](/<EXP:[ ](\d+)>/i))_0x1b0334[_0x56870e(0x3c7)]=Number(RegExp['$1']);if(_0x3df57e['match'](/<GOLD:[ ](\d+)>/i))_0x1b0334['gold']=Number(RegExp['$1']);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x399)]=Graphics[_0x5af19b(0x48d)],Graphics[_0x5af19b(0x48d)]=function(){const _0x30fbb3=_0x5af19b;switch(VisuMZ['CoreEngine'][_0x30fbb3(0x47e)]['QoL'][_0x30fbb3(0x3fe)]){case _0x30fbb3(0x736):return!![];case _0x30fbb3(0x88c):return![];default:return VisuMZ[_0x30fbb3(0x585)][_0x30fbb3(0x399)][_0x30fbb3(0x535)](this);}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x760)]=Graphics[_0x5af19b(0x31a)],Graphics[_0x5af19b(0x31a)]=function(_0x17c94f,_0x39a60f,_0x2a9f9c=null){const _0x464c0a=_0x5af19b;VisuMZ[_0x464c0a(0x585)]['Graphics_printError'][_0x464c0a(0x535)](this,_0x17c94f,_0x39a60f,_0x2a9f9c),VisuMZ[_0x464c0a(0x7a0)](![]);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x386)]=Graphics[_0x5af19b(0x7a1)],Graphics[_0x5af19b(0x7a1)]=function(_0x15b7db){const _0x3f8304=_0x5af19b;VisuMZ[_0x3f8304(0x585)][_0x3f8304(0x386)][_0x3f8304(0x535)](this,_0x15b7db),this[_0x3f8304(0x475)](_0x15b7db);},Graphics['_centerElementCoreEngine']=function(_0x382ddb){const _0x26b502=_0x5af19b;VisuMZ[_0x26b502(0x585)][_0x26b502(0x47e)][_0x26b502(0x2cf)][_0x26b502(0x3c6)]&&(_0x382ddb[_0x26b502(0x23b)][_0x26b502(0x309)]=_0x26b502(0x37c));VisuMZ[_0x26b502(0x585)][_0x26b502(0x47e)][_0x26b502(0x2cf)][_0x26b502(0x4a4)]&&(_0x382ddb['style'][_0x26b502(0x83a)]=_0x26b502(0x5ef));const _0x540079=Math[_0x26b502(0x689)](0x0,Math[_0x26b502(0x1eb)](_0x382ddb[_0x26b502(0x3fc)]*this[_0x26b502(0x1d4)])),_0x445cf2=Math['max'](0x0,Math[_0x26b502(0x1eb)](_0x382ddb[_0x26b502(0x7ff)]*this[_0x26b502(0x1d4)]));_0x382ddb[_0x26b502(0x23b)][_0x26b502(0x3fc)]=_0x540079+'px',_0x382ddb[_0x26b502(0x23b)]['height']=_0x445cf2+'px';},VisuMZ['CoreEngine']['Bitmap_initialize']=Bitmap[_0x5af19b(0x397)]['initialize'],Bitmap['prototype'][_0x5af19b(0x8cc)]=function(_0x595e45,_0x15d50b){const _0x152aea=_0x5af19b;VisuMZ[_0x152aea(0x585)][_0x152aea(0x6cf)][_0x152aea(0x535)](this,_0x595e45,_0x15d50b),this[_0x152aea(0x745)]=!(VisuMZ[_0x152aea(0x585)]['Settings'][_0x152aea(0x2cf)][_0x152aea(0x4a4)]??!![]);},Bitmap['prototype'][_0x5af19b(0x425)]=function(){const _0x28267c=_0x5af19b;this[_0x28267c(0x31c)]=!![];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x45e)]=Sprite[_0x5af19b(0x397)]['destroy'],Sprite['prototype']['destroy']=function(){const _0x52e949=_0x5af19b;if(this['_texture'])VisuMZ[_0x52e949(0x585)][_0x52e949(0x45e)][_0x52e949(0x535)](this);this[_0x52e949(0x159)]();},Sprite[_0x5af19b(0x397)][_0x5af19b(0x159)]=function(){const _0x194f58=_0x5af19b;if(!this['bitmap'])return;if(!this[_0x194f58(0x519)]['_customModified'])return;this[_0x194f58(0x519)][_0x194f58(0x632)]&&!this[_0x194f58(0x256)][_0x194f58(0x632)][_0x194f58(0x905)]&&this[_0x194f58(0x519)][_0x194f58(0x21e)]();},VisuMZ['CoreEngine'][_0x5af19b(0x3a9)]=Bitmap[_0x5af19b(0x397)][_0x5af19b(0x5f3)],Bitmap[_0x5af19b(0x397)][_0x5af19b(0x5f3)]=function(_0x1c3240,_0x5f5187){const _0x68dcdc=_0x5af19b;VisuMZ['CoreEngine'][_0x68dcdc(0x3a9)][_0x68dcdc(0x535)](this,_0x1c3240,_0x5f5187),this[_0x68dcdc(0x425)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x8c3)]=Bitmap[_0x5af19b(0x397)][_0x5af19b(0x31d)],Bitmap[_0x5af19b(0x397)][_0x5af19b(0x31d)]=function(_0x5f4825,_0x2df652,_0x7c3f8c,_0x2c7e48,_0x5d6b33,_0x4385ab,_0x5d9e7c,_0x122dcb,_0x1796db){const _0x428dee=_0x5af19b;_0x2df652=Math[_0x428dee(0x548)](_0x2df652),_0x7c3f8c=Math[_0x428dee(0x548)](_0x7c3f8c),_0x2c7e48=Math[_0x428dee(0x548)](_0x2c7e48),_0x5d6b33=Math['round'](_0x5d6b33),_0x4385ab=Math[_0x428dee(0x548)](_0x4385ab),_0x5d9e7c=Math['round'](_0x5d9e7c),VisuMZ['CoreEngine'][_0x428dee(0x8c3)][_0x428dee(0x535)](this,_0x5f4825,_0x2df652,_0x7c3f8c,_0x2c7e48,_0x5d6b33,_0x4385ab,_0x5d9e7c,_0x122dcb,_0x1796db),this[_0x428dee(0x425)]();},VisuMZ[_0x5af19b(0x585)]['Bitmap_clearRect']=Bitmap[_0x5af19b(0x397)]['clearRect'],Bitmap[_0x5af19b(0x397)][_0x5af19b(0x93d)]=function(_0x220fb9,_0x4a8753,_0x1b35b5,_0x49491b){const _0x5c94fe=_0x5af19b;VisuMZ['CoreEngine']['Bitmap_clearRect'][_0x5c94fe(0x535)](this,_0x220fb9,_0x4a8753,_0x1b35b5,_0x49491b),this[_0x5c94fe(0x425)]();},VisuMZ['CoreEngine'][_0x5af19b(0x5e7)]=Bitmap[_0x5af19b(0x397)][_0x5af19b(0x61d)],Bitmap[_0x5af19b(0x397)][_0x5af19b(0x61d)]=function(_0x32cdfe,_0x4a100b,_0x4c7c63,_0x28990d,_0x300862){const _0x466828=_0x5af19b;VisuMZ[_0x466828(0x585)][_0x466828(0x5e7)][_0x466828(0x535)](this,_0x32cdfe,_0x4a100b,_0x4c7c63,_0x28990d,_0x300862),this[_0x466828(0x425)]();},VisuMZ['CoreEngine']['Bitmap_strokeRect']=Bitmap['prototype']['strokeRect'],Bitmap['prototype'][_0x5af19b(0x3f4)]=function(_0xb8a2b1,_0x59ad79,_0x399f84,_0x334ba8,_0x117479){const _0x3ed3ee=_0x5af19b;VisuMZ[_0x3ed3ee(0x585)][_0x3ed3ee(0x870)][_0x3ed3ee(0x535)](this,_0xb8a2b1,_0x59ad79,_0x399f84,_0x334ba8,_0x117479),this[_0x3ed3ee(0x425)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x928)]=Bitmap[_0x5af19b(0x397)]['gradientFillRect'],Bitmap[_0x5af19b(0x397)]['gradientFillRect']=function(_0x476e50,_0x5d7a63,_0x22e6bb,_0x223464,_0x11b256,_0x9db508,_0x3f3378){const _0xe58a5a=_0x5af19b;VisuMZ['CoreEngine'][_0xe58a5a(0x928)][_0xe58a5a(0x535)](this,_0x476e50,_0x5d7a63,_0x22e6bb,_0x223464,_0x11b256,_0x9db508,_0x3f3378),this[_0xe58a5a(0x425)]();},VisuMZ['CoreEngine']['Bitmap_drawCircle']=Bitmap[_0x5af19b(0x397)]['drawCircle'],Bitmap[_0x5af19b(0x397)][_0x5af19b(0x7f9)]=function(_0x20295c,_0x41f687,_0x2844fc,_0x2b9ef9){const _0x5b927b=_0x5af19b;_0x20295c=Math[_0x5b927b(0x548)](_0x20295c),_0x41f687=Math['round'](_0x41f687),_0x2844fc=Math['round'](_0x2844fc),VisuMZ[_0x5b927b(0x585)]['Bitmap_drawCircle'][_0x5b927b(0x535)](this,_0x20295c,_0x41f687,_0x2844fc,_0x2b9ef9),this[_0x5b927b(0x425)]();},VisuMZ[_0x5af19b(0x585)]['Bitmap_measureTextWidth']=Bitmap[_0x5af19b(0x397)]['measureTextWidth'],Bitmap[_0x5af19b(0x397)][_0x5af19b(0x2e9)]=function(_0x5c0a5f){const _0x31b182=_0x5af19b;return Math[_0x31b182(0x592)](VisuMZ[_0x31b182(0x585)][_0x31b182(0x569)][_0x31b182(0x535)](this,_0x5c0a5f));},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x5af)]=Bitmap[_0x5af19b(0x397)]['drawText'],Bitmap[_0x5af19b(0x397)][_0x5af19b(0x82b)]=function(_0x94eb3,_0x3af5d4,_0x549813,_0x2a081c,_0x4816e3,_0xdfd23b){const _0x364012=_0x5af19b;_0x3af5d4=Math[_0x364012(0x548)](_0x3af5d4),_0x549813=Math[_0x364012(0x548)](_0x549813),_0x2a081c=Math[_0x364012(0x592)](_0x2a081c),_0x4816e3=Math[_0x364012(0x592)](_0x4816e3),VisuMZ[_0x364012(0x585)][_0x364012(0x5af)]['call'](this,_0x94eb3,_0x3af5d4,_0x549813,_0x2a081c,_0x4816e3,_0xdfd23b),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x5af19b(0x230)]=Bitmap[_0x5af19b(0x397)][_0x5af19b(0x78f)],Bitmap[_0x5af19b(0x397)]['_drawTextOutline']=function(_0x4ed42c,_0x329f12,_0x1b9f8e,_0xdfc6d8){const _0x21307a=_0x5af19b;VisuMZ['CoreEngine'][_0x21307a(0x47e)][_0x21307a(0x2cf)][_0x21307a(0x2d1)]?this[_0x21307a(0x162)](_0x4ed42c,_0x329f12,_0x1b9f8e,_0xdfc6d8):VisuMZ[_0x21307a(0x585)][_0x21307a(0x230)]['call'](this,_0x4ed42c,_0x329f12,_0x1b9f8e,_0xdfc6d8);},Bitmap['prototype']['_drawTextShadow']=function(_0x58543c,_0xc87684,_0x172f3e,_0x495943){const _0x153ed0=_0x5af19b,_0x31805a=this['context'];_0x31805a[_0x153ed0(0x207)]=this[_0x153ed0(0x547)],_0x31805a[_0x153ed0(0x62b)](_0x58543c,_0xc87684+0x2,_0x172f3e+0x2,_0x495943);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x739)]=Input['clear'],Input[_0x5af19b(0x3dd)]=function(){const _0x41ddd9=_0x5af19b;VisuMZ[_0x41ddd9(0x585)][_0x41ddd9(0x739)][_0x41ddd9(0x535)](this),this['_inputString']=undefined,this[_0x41ddd9(0x893)]=undefined,this[_0x41ddd9(0x3d5)]=Input[_0x41ddd9(0x8dd)];},VisuMZ['CoreEngine']['Input_update']=Input[_0x5af19b(0x556)],Input[_0x5af19b(0x556)]=function(){const _0x23faa1=_0x5af19b;VisuMZ['CoreEngine']['Input_update']['call'](this);if(this[_0x23faa1(0x3d5)])this[_0x23faa1(0x3d5)]--;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x90b)]=Input[_0x5af19b(0x460)],Input[_0x5af19b(0x460)]=function(){const _0x1af04e=_0x5af19b;if(this['_gamepadWait'])return;VisuMZ[_0x1af04e(0x585)][_0x1af04e(0x90b)]['call'](this);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x2c2)]=Input[_0x5af19b(0x2a8)],Input[_0x5af19b(0x2a8)]=function(){const _0xc3a7c1=_0x5af19b;VisuMZ[_0xc3a7c1(0x585)][_0xc3a7c1(0x2c2)][_0xc3a7c1(0x535)](this),document[_0xc3a7c1(0x8f5)](_0xc3a7c1(0x596),this[_0xc3a7c1(0x604)][_0xc3a7c1(0x48b)](this));},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x90d)]=Input['_onKeyDown'],Input['_onKeyDown']=function(_0x4fc8a6){const _0x366173=_0x5af19b;this[_0x366173(0x893)]=_0x4fc8a6[_0x366173(0x3a0)],VisuMZ[_0x366173(0x585)][_0x366173(0x90d)][_0x366173(0x535)](this,_0x4fc8a6),this[_0x366173(0x6ce)](null);},Input[_0x5af19b(0x604)]=function(_0x3cb97b){this['_registerKeyInput'](_0x3cb97b);},Input['_registerKeyInput']=function(_0x38d7eb){const _0x1356ee=_0x5af19b;this[_0x1356ee(0x893)]=_0x38d7eb[_0x1356ee(0x3a0)];let _0x2d1580=String[_0x1356ee(0x35e)](_0x38d7eb[_0x1356ee(0x653)]);this[_0x1356ee(0x69e)]===undefined?this['_inputString']=_0x2d1580:this[_0x1356ee(0x69e)]+=_0x2d1580;},VisuMZ['CoreEngine']['Input_shouldPreventDefault']=Input['_shouldPreventDefault'],Input[_0x5af19b(0x1a2)]=function(_0x749249){const _0x539481=_0x5af19b;if(_0x749249===0x8)return![];return VisuMZ['CoreEngine'][_0x539481(0x94a)][_0x539481(0x535)](this,_0x749249);},Input['isSpecialCode']=function(_0xcbafa6){const _0x5f081b=_0x5af19b;if(_0xcbafa6['match'](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0xcbafa6[_0x5f081b(0x37b)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0xcbafa6['match'](/escape/i))return this[_0x5f081b(0x893)]===0x1b;},Input['isNumpadPressed']=function(){const _0x286d4f=_0x5af19b;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x286d4f(0x893)]);},Input[_0x5af19b(0x464)]=function(){const _0x5da08b=_0x5af19b;return[0x25,0x26,0x27,0x28][_0x5da08b(0x15c)](this[_0x5da08b(0x893)]);},Input[_0x5af19b(0x5f2)]=function(){if(navigator['getGamepads']){const _0x56f89a=navigator['getGamepads']();if(_0x56f89a)for(const _0x1d27f5 of _0x56f89a){if(_0x1d27f5&&_0x1d27f5['connected'])return!![];}}return![];},Input[_0x5af19b(0x5b2)]=function(){const _0x3aae26=_0x5af19b;if(navigator[_0x3aae26(0x652)]){const _0xe5d41d=navigator[_0x3aae26(0x652)]();if(_0xe5d41d)for(const _0x103526 of _0xe5d41d){if(_0x103526&&_0x103526[_0x3aae26(0x4b1)]){if(this[_0x3aae26(0x925)](_0x103526))return!![];if(this[_0x3aae26(0x1dc)](_0x103526))return!![];}}}return![];},Input['isGamepadButtonPressed']=function(_0x36ea9c){const _0x5580bb=_0x5af19b,_0xce38a4=_0x36ea9c[_0x5580bb(0x78b)];for(let _0x2cdf87=0x0;_0x2cdf87<_0xce38a4[_0x5580bb(0x35d)];_0x2cdf87++){if(_0xce38a4[_0x2cdf87][_0x5580bb(0x6e4)])return!![];}return![];},Input[_0x5af19b(0x1dc)]=function(_0x58bf96){const _0x512b01=_0x5af19b,_0x4a1556=_0x58bf96[_0x512b01(0x36a)],_0x5d929c=0.5;if(_0x4a1556[0x0]<-_0x5d929c)return!![];if(_0x4a1556[0x0]>_0x5d929c)return!![];if(_0x4a1556[0x1]<-_0x5d929c)return!![];if(_0x4a1556[0x1]>_0x5d929c)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x567f55=_0x5af19b;return this[_0x567f55(0x2fa)]||null;},Input[_0x5af19b(0x6ce)]=function(_0x3321ca){const _0x41f731=_0x5af19b;this[_0x41f731(0x2fa)]=_0x3321ca;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x224)]=Input[_0x5af19b(0x935)],Input[_0x5af19b(0x935)]=function(_0x2ee64f){const _0x1e3933=_0x5af19b;VisuMZ[_0x1e3933(0x585)]['Input_updateGamepadState'][_0x1e3933(0x535)](this,_0x2ee64f),(this[_0x1e3933(0x925)](_0x2ee64f)||this[_0x1e3933(0x1dc)](_0x2ee64f))&&this[_0x1e3933(0x6ce)](_0x2ee64f);},Input[_0x5af19b(0x527)]=function(){const _0x2ca0ac=_0x5af19b;return this[_0x2ca0ac(0x2fa)]?this[_0x2ca0ac(0x2fa)]['id']:_0x2ca0ac(0x484);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x3f7)]=Tilemap['prototype'][_0x5af19b(0x6e1)],Tilemap['prototype']['_addShadow']=function(_0x551fee,_0x291815,_0x38efbe,_0x40ef45){const _0x1618a7=_0x5af19b;if($gameMap&&$gameMap[_0x1618a7(0x20d)]())return;VisuMZ['CoreEngine']['Tilemap_addShadow'][_0x1618a7(0x535)](this,_0x551fee,_0x291815,_0x38efbe,_0x40ef45);},Tilemap[_0x5af19b(0x6e9)][_0x5af19b(0x397)][_0x5af19b(0x4e1)]=function(){const _0x1ca910=_0x5af19b;this[_0x1ca910(0x748)]();for(let _0x24e19d=0x0;_0x24e19d<Tilemap[_0x1ca910(0x68e)][_0x1ca910(0x788)];_0x24e19d++){const _0x123f63=new PIXI[(_0x1ca910(0x19c))]();_0x123f63[_0x1ca910(0x850)](0x800,0x800),VisuMZ[_0x1ca910(0x585)][_0x1ca910(0x47e)][_0x1ca910(0x2cf)]['PixelateImageRendering']&&(_0x123f63[_0x1ca910(0x239)]=PIXI[_0x1ca910(0x7ed)][_0x1ca910(0x6f4)]),this[_0x1ca910(0x48e)][_0x1ca910(0x3a5)](_0x123f63);}},WindowLayer[_0x5af19b(0x397)][_0x5af19b(0x29f)]=function(){const _0x393504=_0x5af19b;return SceneManager&&SceneManager[_0x393504(0x4ff)]?SceneManager[_0x393504(0x4ff)]['isWindowMaskingEnabled']():!![];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x2ae)]=WindowLayer['prototype'][_0x5af19b(0x695)],WindowLayer[_0x5af19b(0x397)]['render']=function render(_0x7adac4){const _0x1b6ebf=_0x5af19b;this[_0x1b6ebf(0x29f)]()?VisuMZ[_0x1b6ebf(0x585)][_0x1b6ebf(0x2ae)][_0x1b6ebf(0x535)](this,_0x7adac4):this[_0x1b6ebf(0x565)](_0x7adac4);},WindowLayer['prototype'][_0x5af19b(0x565)]=function render(_0x50e2c8){const _0x21293d=_0x5af19b;if(!this[_0x21293d(0x87b)])return;const _0x58116c=new PIXI[(_0x21293d(0x6b5))](),_0x5127bc=_0x50e2c8['gl'],_0x35b7c0=this[_0x21293d(0x19a)][_0x21293d(0x2b0)]();_0x50e2c8[_0x21293d(0x8c4)][_0x21293d(0x411)](),_0x58116c[_0x21293d(0x8cb)]=this['transform'],_0x50e2c8[_0x21293d(0x82f)][_0x21293d(0x38b)](),_0x5127bc[_0x21293d(0x87c)](_0x5127bc[_0x21293d(0x27d)]);while(_0x35b7c0[_0x21293d(0x35d)]>0x0){const _0x10c04c=_0x35b7c0[_0x21293d(0x458)]();_0x10c04c['_isWindow']&&_0x10c04c[_0x21293d(0x87b)]&&_0x10c04c[_0x21293d(0x427)]>0x0&&(_0x5127bc[_0x21293d(0x63e)](_0x5127bc[_0x21293d(0x682)],0x0,~0x0),_0x5127bc[_0x21293d(0x717)](_0x5127bc[_0x21293d(0x815)],_0x5127bc['KEEP'],_0x5127bc[_0x21293d(0x815)]),_0x10c04c['render'](_0x50e2c8),_0x50e2c8[_0x21293d(0x82f)][_0x21293d(0x38b)](),_0x58116c[_0x21293d(0x3dd)](),_0x5127bc[_0x21293d(0x63e)](_0x5127bc[_0x21293d(0x701)],0x1,~0x0),_0x5127bc[_0x21293d(0x717)](_0x5127bc[_0x21293d(0x2d6)],_0x5127bc[_0x21293d(0x2d6)],_0x5127bc[_0x21293d(0x2d6)]),_0x5127bc[_0x21293d(0x73e)](_0x5127bc[_0x21293d(0x472)],_0x5127bc[_0x21293d(0x555)]),_0x58116c[_0x21293d(0x695)](_0x50e2c8),_0x50e2c8[_0x21293d(0x82f)][_0x21293d(0x38b)](),_0x5127bc['blendFunc'](_0x5127bc[_0x21293d(0x555)],_0x5127bc[_0x21293d(0x3bc)]));}_0x5127bc[_0x21293d(0x55d)](_0x5127bc[_0x21293d(0x27d)]),_0x5127bc[_0x21293d(0x3dd)](_0x5127bc[_0x21293d(0x238)]),_0x5127bc[_0x21293d(0x729)](0x0),_0x50e2c8['batch']['flush']();for(const _0xd3403d of this['children']){!_0xd3403d[_0x21293d(0x1d0)]&&_0xd3403d[_0x21293d(0x87b)]&&_0xd3403d['render'](_0x50e2c8);}_0x50e2c8['batch'][_0x21293d(0x38b)]();},DataManager[_0x5af19b(0x1b6)]=function(_0x14ba16){const _0x5c3b2d=_0x5af19b;return this[_0x5c3b2d(0x175)](_0x14ba16)&&_0x14ba16[_0x5c3b2d(0x792)]===0x2;},VisuMZ['CoreEngine'][_0x5af19b(0x243)]=DataManager[_0x5af19b(0x3ea)],DataManager[_0x5af19b(0x3ea)]=function(){const _0x114ba5=_0x5af19b;VisuMZ[_0x114ba5(0x585)]['DataManager_setupNewGame']['call'](this),this[_0x114ba5(0x889)](),this[_0x114ba5(0x5da)]();},DataManager[_0x5af19b(0x889)]=function(){const _0x7d6c42=_0x5af19b;if($gameTemp[_0x7d6c42(0x75a)]()){const _0x3dbbd4=VisuMZ['CoreEngine'][_0x7d6c42(0x47e)]['QoL'][_0x7d6c42(0x7ba)];if(_0x3dbbd4>0x0)$gameTemp[_0x7d6c42(0x7b4)](_0x3dbbd4);}},DataManager[_0x5af19b(0x5da)]=function(){const _0x1f761a=_0x5af19b,_0x30e36f=VisuMZ[_0x1f761a(0x585)][_0x1f761a(0x47e)][_0x1f761a(0x2cf)][_0x1f761a(0x839)]||0x0;if(_0x30e36f>0x0)$gameTemp['reserveCommonEvent'](_0x30e36f);},DataManager[_0x5af19b(0x71c)]=function(_0x3ba14a){const _0x45d4ae=_0x5af19b,_0x222f1c=$dataTroops[_0x3ba14a];if(!_0x222f1c)return'';let _0x2c92f7='';_0x2c92f7+=_0x222f1c[_0x45d4ae(0x678)];for(const _0x344f17 of _0x222f1c[_0x45d4ae(0x415)]){for(const _0x1fa277 of _0x344f17[_0x45d4ae(0x7c1)]){[0x6c,0x198]['includes'](_0x1fa277['code'])&&(_0x2c92f7+='\x0a',_0x2c92f7+=_0x1fa277['parameters'][0x0]);}}return _0x2c92f7;};(VisuMZ[_0x5af19b(0x585)]['Settings'][_0x5af19b(0x2cf)]['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x691)]=Scene_Base['prototype'][_0x5af19b(0x92c)],Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x92c)]=function(){const _0x37b335=_0x5af19b;VisuMZ[_0x37b335(0x585)]['Scene_Base_create'][_0x37b335(0x535)](this),$scene=this;},$spriteset=null,VisuMZ[_0x5af19b(0x585)]['Scene_Map_createSpriteset']=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x6bc)],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x6bc)]=function(){const _0x12f6ab=_0x5af19b;VisuMZ[_0x12f6ab(0x585)][_0x12f6ab(0x539)][_0x12f6ab(0x535)](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x5af19b(0x524)]=Scene_Battle[_0x5af19b(0x397)][_0x5af19b(0x6bc)],Scene_Battle[_0x5af19b(0x397)]['createSpriteset']=function(){const _0xcb26ce=_0x5af19b;VisuMZ[_0xcb26ce(0x585)][_0xcb26ce(0x524)]['call'](this),$spriteset=this[_0xcb26ce(0x830)];},VisuMZ['CoreEngine']['Scene_Base_terminate']=Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x844)],Scene_Base['prototype'][_0x5af19b(0x844)]=function(){const _0x4f28ab=_0x5af19b;VisuMZ[_0x4f28ab(0x585)][_0x4f28ab(0x7eb)][_0x4f28ab(0x535)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x5af19b(0x4c2)]=BattleManager[_0x5af19b(0x556)],BattleManager[_0x5af19b(0x556)]=function(_0x10c0ae){const _0x12a691=_0x5af19b;VisuMZ['CoreEngine'][_0x12a691(0x4c2)]['call'](this,_0x10c0ae),this[_0x12a691(0x724)]();},BattleManager[_0x5af19b(0x724)]=function(){const _0x499965=_0x5af19b;$subject=this['_subject'],$targets=this[_0x499965(0x647)],$target=this['_target']||this[_0x499965(0x647)][0x0];},$event=null,VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x3c1)]=Game_Event[_0x5af19b(0x397)][_0x5af19b(0x919)],Game_Event[_0x5af19b(0x397)][_0x5af19b(0x919)]=function(){const _0x243d68=_0x5af19b;VisuMZ[_0x243d68(0x585)][_0x243d68(0x3c1)][_0x243d68(0x535)](this),$event=this;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x683)]=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x556)],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x556)]=function(){const _0x344c2f=_0x5af19b;VisuMZ[_0x344c2f(0x585)][_0x344c2f(0x683)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map['prototype'][_0x5af19b(0x1a5)]=function(){const _0x18ac5a=_0x5af19b;!this[_0x18ac5a(0x2ec)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x69432e){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x69432e);});;$onceParallel=function(_0x2289a6,_0x270434){const _0x2b5491=_0x5af19b;if(SceneManager[_0x2b5491(0x4de)]())SceneManager[_0x2b5491(0x4ff)][_0x2b5491(0x66d)](_0x2289a6,_0x270434);else{if(SceneManager[_0x2b5491(0x770)]()){if(Imported[_0x2b5491(0x8e2)])SceneManager[_0x2b5491(0x4ff)][_0x2b5491(0x66d)](_0x2289a6);else $gameTemp&&$gameTemp[_0x2b5491(0x75a)]()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x2b5491(0x75a)]()&&alert(_0x2b5491(0x6d6));}},StorageManager[_0x5af19b(0x444)]=function(_0x1846f1){return new Promise((_0x527818,_0x13975e)=>{const _0x4217b4=_0x4b94;try{const _0xccbc81=pako[_0x4217b4(0x33a)](_0x1846f1,{'to':_0x4217b4(0x3ce),'level':0x1});if(_0xccbc81[_0x4217b4(0x35d)]>=0xc350){}_0x527818(_0xccbc81);}catch(_0x48770d){_0x13975e(_0x48770d);}});},TextManager['stringKeyMap']=['','','',_0x5af19b(0x81c),'','',_0x5af19b(0x5fe),'','BACKSPACE',_0x5af19b(0x79c),'','',_0x5af19b(0x5bd),_0x5af19b(0x6c2),_0x5af19b(0x1a4),'',_0x5af19b(0x543),'CTRL',_0x5af19b(0x894),_0x5af19b(0x478),_0x5af19b(0x867),_0x5af19b(0x353),_0x5af19b(0x681),_0x5af19b(0x6ba),'FINAL',_0x5af19b(0x86d),'',_0x5af19b(0x39e),_0x5af19b(0x916),_0x5af19b(0x4f1),_0x5af19b(0x2fe),_0x5af19b(0x75c),_0x5af19b(0x5dc),'PGUP',_0x5af19b(0x37f),'END',_0x5af19b(0x56c),_0x5af19b(0x8fb),'UP',_0x5af19b(0x6da),_0x5af19b(0x5a5),_0x5af19b(0x2b9),_0x5af19b(0x265),_0x5af19b(0x7ce),_0x5af19b(0x1e7),_0x5af19b(0x381),_0x5af19b(0x481),'','0','1','2','3','4','5','6','7','8','9',_0x5af19b(0x638),_0x5af19b(0x447),_0x5af19b(0x396),_0x5af19b(0x4f2),'GREATER_THAN',_0x5af19b(0x448),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x5af19b(0x912),'',_0x5af19b(0x554),_0x5af19b(0x7a5),_0x5af19b(0x292),_0x5af19b(0x1ef),_0x5af19b(0x28a),_0x5af19b(0x786),'NUMPAD5',_0x5af19b(0x5ff),_0x5af19b(0x687),_0x5af19b(0x665),_0x5af19b(0x86a),_0x5af19b(0x3af),_0x5af19b(0x6b8),'SEPARATOR','SUBTRACT',_0x5af19b(0x3a6),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x5af19b(0x8a6),_0x5af19b(0x3e0),_0x5af19b(0x18c),'F13',_0x5af19b(0x225),_0x5af19b(0x538),_0x5af19b(0x620),_0x5af19b(0x573),'F18',_0x5af19b(0x560),'F20','F21',_0x5af19b(0x706),'F23','F24','','','','','','','','',_0x5af19b(0x61f),'SCROLL_LOCK',_0x5af19b(0x3e2),_0x5af19b(0x439),_0x5af19b(0x5f5),_0x5af19b(0x851),_0x5af19b(0x7dc),'','','','','','','','','','CIRCUMFLEX','EXCLAMATION','DOUBLE_QUOTE','HASH',_0x5af19b(0x8af),'PERCENT',_0x5af19b(0x38f),_0x5af19b(0x315),_0x5af19b(0x755),'CLOSE_PAREN',_0x5af19b(0x7a8),'PLUS','PIPE',_0x5af19b(0x904),_0x5af19b(0x629),_0x5af19b(0x6ab),'TILDE','','','','',_0x5af19b(0x2c9),_0x5af19b(0x494),'VOLUME_UP','','',_0x5af19b(0x447),_0x5af19b(0x4f2),_0x5af19b(0x24e),_0x5af19b(0x32b),'PERIOD',_0x5af19b(0x540),_0x5af19b(0x8a7),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x5af19b(0x166),'BACK_SLASH','CLOSE_BRACKET',_0x5af19b(0x765),'',_0x5af19b(0x939),'ALTGR','',_0x5af19b(0x3f0),_0x5af19b(0x8c8),'',_0x5af19b(0x837),'','',_0x5af19b(0x697),_0x5af19b(0x48a),'WIN_OEM_PA1',_0x5af19b(0x17a),_0x5af19b(0x828),_0x5af19b(0x6a5),_0x5af19b(0x392),_0x5af19b(0x723),'WIN_OEM_FINISH','WIN_OEM_COPY','WIN_OEM_AUTO',_0x5af19b(0x7b1),_0x5af19b(0x231),_0x5af19b(0x282),_0x5af19b(0x4f9),_0x5af19b(0x73f),_0x5af19b(0x37e),_0x5af19b(0x7b8),_0x5af19b(0x229),'',_0x5af19b(0x266),_0x5af19b(0x417),''],TextManager[_0x5af19b(0x5e6)]=VisuMZ[_0x5af19b(0x585)]['Settings']['ButtonAssist'][_0x5af19b(0x7ab)],TextManager['buttonAssistCancel']=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['ButtonAssist'][_0x5af19b(0x374)],TextManager['buttonAssistSwitch']=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x4be)][_0x5af19b(0x55e)],VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x623)]=TextManager[_0x5af19b(0x22b)],TextManager['param']=function(_0x38847f){const _0x321ebf=_0x5af19b;return typeof _0x38847f===_0x321ebf(0x54a)?VisuMZ[_0x321ebf(0x585)][_0x321ebf(0x623)]['call'](this,_0x38847f):this[_0x321ebf(0x35c)](_0x38847f);},TextManager['paramName']=function(_0x49cdec){const _0x31569e=_0x5af19b;_0x49cdec=String(_0x49cdec||'')[_0x31569e(0x49d)]();const _0x5683d3=VisuMZ[_0x31569e(0x585)][_0x31569e(0x47e)][_0x31569e(0x61e)];if(_0x49cdec===_0x31569e(0x676))return $dataSystem['terms'][_0x31569e(0x28c)][0x0];if(_0x49cdec===_0x31569e(0x36e))return $dataSystem[_0x31569e(0x391)][_0x31569e(0x28c)][0x1];if(_0x49cdec===_0x31569e(0x7ee))return $dataSystem[_0x31569e(0x391)][_0x31569e(0x28c)][0x2];if(_0x49cdec===_0x31569e(0x794))return $dataSystem['terms']['params'][0x3];if(_0x49cdec===_0x31569e(0x5c4))return $dataSystem[_0x31569e(0x391)][_0x31569e(0x28c)][0x4];if(_0x49cdec===_0x31569e(0x2d8))return $dataSystem[_0x31569e(0x391)][_0x31569e(0x28c)][0x5];if(_0x49cdec===_0x31569e(0x168))return $dataSystem[_0x31569e(0x391)][_0x31569e(0x28c)][0x6];if(_0x49cdec===_0x31569e(0x5e3))return $dataSystem['terms'][_0x31569e(0x28c)][0x7];if(_0x49cdec===_0x31569e(0x835))return _0x5683d3[_0x31569e(0x1ed)];if(_0x49cdec==='EVA')return _0x5683d3['XParamVocab1'];if(_0x49cdec===_0x31569e(0x223))return _0x5683d3[_0x31569e(0x52f)];if(_0x49cdec===_0x31569e(0x205))return _0x5683d3[_0x31569e(0x3fb)];if(_0x49cdec===_0x31569e(0x3de))return _0x5683d3['XParamVocab4'];if(_0x49cdec===_0x31569e(0x562))return _0x5683d3[_0x31569e(0x167)];if(_0x49cdec===_0x31569e(0x3b3))return _0x5683d3['XParamVocab6'];if(_0x49cdec===_0x31569e(0x437))return _0x5683d3[_0x31569e(0x711)];if(_0x49cdec===_0x31569e(0x8c7))return _0x5683d3[_0x31569e(0x874)];if(_0x49cdec==='TRG')return _0x5683d3[_0x31569e(0x650)];if(_0x49cdec===_0x31569e(0x15a))return _0x5683d3[_0x31569e(0x247)];if(_0x49cdec===_0x31569e(0x6f1))return _0x5683d3[_0x31569e(0x664)];if(_0x49cdec==='REC')return _0x5683d3[_0x31569e(0x2ba)];if(_0x49cdec===_0x31569e(0x3c3))return _0x5683d3[_0x31569e(0x68f)];if(_0x49cdec===_0x31569e(0x89f))return _0x5683d3['SParamVocab4'];if(_0x49cdec===_0x31569e(0x1e4))return _0x5683d3[_0x31569e(0x153)];if(_0x49cdec===_0x31569e(0x28d))return _0x5683d3[_0x31569e(0x50e)];if(_0x49cdec===_0x31569e(0x3b2))return _0x5683d3[_0x31569e(0x812)];if(_0x49cdec===_0x31569e(0x6e5))return _0x5683d3[_0x31569e(0x8ee)];if(_0x49cdec===_0x31569e(0x26a))return _0x5683d3[_0x31569e(0x8ff)];if(VisuMZ[_0x31569e(0x585)][_0x31569e(0x28b)][_0x49cdec])return VisuMZ[_0x31569e(0x585)][_0x31569e(0x28b)][_0x49cdec];return'';},TextManager[_0x5af19b(0x5dd)]=function(_0x181cb9){const _0x2d99bf=_0x5af19b,_0x1da8fb=Input[_0x2d99bf(0x527)]();return _0x1da8fb===_0x2d99bf(0x484)?this[_0x2d99bf(0x8d3)](_0x181cb9):this[_0x2d99bf(0x6b1)](_0x1da8fb,_0x181cb9);},TextManager[_0x5af19b(0x8d3)]=function(_0x45724d){const _0xaabc76=_0x5af19b;let _0x54a10a=VisuMZ[_0xaabc76(0x585)][_0xaabc76(0x47e)]['ButtonAssist'][_0xaabc76(0x577)];if(!_0x54a10a){if(_0x45724d===_0xaabc76(0x252))_0x45724d=_0xaabc76(0x6a9);if(_0x45724d===_0xaabc76(0x608))_0x45724d='escape';}let _0x462b17=[];for(let _0x2e60dd in Input[_0xaabc76(0x264)]){_0x2e60dd=Number(_0x2e60dd);if(_0x2e60dd>=0x60&&_0x2e60dd<=0x69)continue;if([0x12,0x20]['includes'](_0x2e60dd))continue;_0x45724d===Input[_0xaabc76(0x264)][_0x2e60dd]&&_0x462b17[_0xaabc76(0x3a5)](_0x2e60dd);}for(let _0x229b4d=0x0;_0x229b4d<_0x462b17[_0xaabc76(0x35d)];_0x229b4d++){_0x462b17[_0x229b4d]=TextManager[_0xaabc76(0x941)][_0x462b17[_0x229b4d]];}return this[_0xaabc76(0x88d)](_0x462b17);},TextManager[_0x5af19b(0x88d)]=function(_0x3bef67){const _0x30680c=_0x5af19b,_0x9ffac8=VisuMZ[_0x30680c(0x585)][_0x30680c(0x47e)][_0x30680c(0x4be)],_0x4aa6ff=_0x9ffac8[_0x30680c(0x8ec)];let _0xdc17bc='';if(_0x3bef67['includes']('UP'))_0xdc17bc='UP';else{if(_0x3bef67['includes']('DOWN'))_0xdc17bc=_0x30680c(0x5a5);else{if(_0x3bef67[_0x30680c(0x319)]('LEFT'))_0xdc17bc=_0x30680c(0x8fb);else _0x3bef67['includes'](_0x30680c(0x6da))?_0xdc17bc=_0x30680c(0x6da):_0xdc17bc=_0x3bef67[_0x30680c(0x8cf)]();}}const _0xdebb9e=_0x30680c(0x7e1)[_0x30680c(0x8b9)](_0xdc17bc);return _0x9ffac8[_0xdebb9e]?_0x9ffac8[_0xdebb9e]:_0x4aa6ff[_0x30680c(0x8b9)](_0xdc17bc);},TextManager[_0x5af19b(0x2aa)]=function(_0x535a57,_0x803c60){const _0x89de20=_0x5af19b,_0x38f443=VisuMZ[_0x89de20(0x585)][_0x89de20(0x47e)]['ButtonAssist'],_0x26f1dd=_0x38f443[_0x89de20(0x838)],_0x1467ed=this[_0x89de20(0x5dd)](_0x535a57),_0x55b0a6=this[_0x89de20(0x5dd)](_0x803c60);return _0x26f1dd[_0x89de20(0x8b9)](_0x1467ed,_0x55b0a6);},TextManager[_0x5af19b(0x6b1)]=function(_0x5cfb14,_0x407249){const _0x5211d8=_0x5af19b,_0x1fe856=_0x5cfb14['toLowerCase']()['trim'](),_0x4f7b39=VisuMZ[_0x5211d8(0x585)][_0x5211d8(0x3b9)][_0x1fe856];if(!_0x4f7b39)return this[_0x5211d8(0x3ee)](_0x5cfb14,_0x407249);return _0x4f7b39[_0x407249]||this[_0x5211d8(0x8d3)](_0x5cfb14,_0x407249);},TextManager[_0x5af19b(0x3ee)]=function(_0x406779,_0x2bd179){const _0x50a12b=_0x5af19b,_0x4dc1b8=_0x406779[_0x50a12b(0x79e)]()['trim']();for(const _0x4205b3 in VisuMZ[_0x50a12b(0x585)][_0x50a12b(0x597)]){if(_0x4dc1b8[_0x50a12b(0x319)](_0x4205b3)){const _0x220585=VisuMZ[_0x50a12b(0x585)][_0x50a12b(0x597)][_0x4205b3],_0x52dee8=VisuMZ[_0x50a12b(0x585)]['ControllerButtons'][_0x220585];return _0x52dee8[_0x2bd179]||this[_0x50a12b(0x8d3)](_0x2bd179);}}return this['getKeyboardInputButtonString'](_0x2bd179);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x85f)]=ColorManager[_0x5af19b(0x45b)],ColorManager[_0x5af19b(0x45b)]=function(){const _0x4c7394=_0x5af19b;VisuMZ['CoreEngine'][_0x4c7394(0x85f)][_0x4c7394(0x535)](this),this[_0x4c7394(0x517)]=this[_0x4c7394(0x517)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x39b3f9,_0x4dc3c8){const _0x285a5b=_0x5af19b;return _0x4dc3c8=String(_0x4dc3c8),this[_0x285a5b(0x517)]=this[_0x285a5b(0x517)]||{},_0x4dc3c8['match'](/#(.*)/i)?this[_0x285a5b(0x517)][_0x39b3f9]=_0x285a5b(0x2d9)['format'](String(RegExp['$1'])):this[_0x285a5b(0x517)][_0x39b3f9]=this[_0x285a5b(0x8d0)](Number(_0x4dc3c8)),this[_0x285a5b(0x517)][_0x39b3f9];},ColorManager[_0x5af19b(0x2df)]=function(_0x343476){const _0x1c01ad=_0x5af19b;return _0x343476=String(_0x343476),_0x343476[_0x1c01ad(0x37b)](/#(.*)/i)?_0x1c01ad(0x2d9)[_0x1c01ad(0x8b9)](String(RegExp['$1'])):this[_0x1c01ad(0x8d0)](Number(_0x343476));},ColorManager[_0x5af19b(0x491)]=function(){this['_colorCache']={};},ColorManager[_0x5af19b(0x897)]=function(){const _0x108b08=_0x5af19b,_0x18c0b4=_0x108b08(0x6e6);this[_0x108b08(0x517)]=this[_0x108b08(0x517)]||{};if(this[_0x108b08(0x517)][_0x18c0b4])return this[_0x108b08(0x517)][_0x18c0b4];const _0x38334f=VisuMZ[_0x108b08(0x585)][_0x108b08(0x47e)][_0x108b08(0x471)][_0x108b08(0x3dc)];return this[_0x108b08(0x1c1)](_0x18c0b4,_0x38334f);},ColorManager[_0x5af19b(0x7bb)]=function(){const _0x58b84=_0x5af19b,_0x5419df=_0x58b84(0x571);this[_0x58b84(0x517)]=this['_colorCache']||{};if(this[_0x58b84(0x517)][_0x5419df])return this[_0x58b84(0x517)][_0x5419df];const _0x19c336=VisuMZ[_0x58b84(0x585)][_0x58b84(0x47e)][_0x58b84(0x471)][_0x58b84(0x2c1)];return this[_0x58b84(0x1c1)](_0x5419df,_0x19c336);},ColorManager['crisisColor']=function(){const _0x1f557b=_0x5af19b,_0x8a43c=_0x1f557b(0x345);this[_0x1f557b(0x517)]=this[_0x1f557b(0x517)]||{};if(this[_0x1f557b(0x517)][_0x8a43c])return this[_0x1f557b(0x517)][_0x8a43c];const _0x165376=VisuMZ[_0x1f557b(0x585)]['Settings'][_0x1f557b(0x471)][_0x1f557b(0x55c)];return this[_0x1f557b(0x1c1)](_0x8a43c,_0x165376);},ColorManager[_0x5af19b(0x808)]=function(){const _0x5e53ad=_0x5af19b,_0x18cbce=_0x5e53ad(0x23e);this[_0x5e53ad(0x517)]=this['_colorCache']||{};if(this[_0x5e53ad(0x517)][_0x18cbce])return this[_0x5e53ad(0x517)][_0x18cbce];const _0x113818=VisuMZ[_0x5e53ad(0x585)][_0x5e53ad(0x47e)][_0x5e53ad(0x471)]['ColorDeath'];return this[_0x5e53ad(0x1c1)](_0x18cbce,_0x113818);},ColorManager[_0x5af19b(0x1f0)]=function(){const _0x2d61f0=_0x5af19b,_0x474b9a='_stored_gaugeBackColor';this[_0x2d61f0(0x517)]=this[_0x2d61f0(0x517)]||{};if(this[_0x2d61f0(0x517)][_0x474b9a])return this[_0x2d61f0(0x517)][_0x474b9a];const _0x58e7ab=VisuMZ[_0x2d61f0(0x585)][_0x2d61f0(0x47e)][_0x2d61f0(0x471)][_0x2d61f0(0x1ca)];return this[_0x2d61f0(0x1c1)](_0x474b9a,_0x58e7ab);},ColorManager[_0x5af19b(0x52c)]=function(){const _0x293dca=_0x5af19b,_0xc9d8a8=_0x293dca(0x6ff);this[_0x293dca(0x517)]=this['_colorCache']||{};if(this['_colorCache'][_0xc9d8a8])return this[_0x293dca(0x517)][_0xc9d8a8];const _0x46a421=VisuMZ[_0x293dca(0x585)][_0x293dca(0x47e)][_0x293dca(0x471)][_0x293dca(0x586)];return this[_0x293dca(0x1c1)](_0xc9d8a8,_0x46a421);},ColorManager[_0x5af19b(0x450)]=function(){const _0x40d3ed=_0x5af19b,_0xdb8e0b=_0x40d3ed(0x5ce);this['_colorCache']=this[_0x40d3ed(0x517)]||{};if(this[_0x40d3ed(0x517)][_0xdb8e0b])return this[_0x40d3ed(0x517)][_0xdb8e0b];const _0x2074c0=VisuMZ[_0x40d3ed(0x585)]['Settings']['Color'][_0x40d3ed(0x8e4)];return this[_0x40d3ed(0x1c1)](_0xdb8e0b,_0x2074c0);},ColorManager['mpGaugeColor1']=function(){const _0x570ff3=_0x5af19b,_0x51bd10=_0x570ff3(0x71d);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x51bd10])return this[_0x570ff3(0x517)][_0x51bd10];const _0x47561d=VisuMZ[_0x570ff3(0x585)][_0x570ff3(0x47e)][_0x570ff3(0x471)]['ColorMPGauge1'];return this[_0x570ff3(0x1c1)](_0x51bd10,_0x47561d);},ColorManager[_0x5af19b(0x363)]=function(){const _0x4127c5=_0x5af19b,_0x41f7e4='_stored_mpGaugeColor2';this[_0x4127c5(0x517)]=this[_0x4127c5(0x517)]||{};if(this[_0x4127c5(0x517)][_0x41f7e4])return this[_0x4127c5(0x517)][_0x41f7e4];const _0x3b0d0c=VisuMZ[_0x4127c5(0x585)][_0x4127c5(0x47e)][_0x4127c5(0x471)]['ColorMPGauge2'];return this[_0x4127c5(0x1c1)](_0x41f7e4,_0x3b0d0c);},ColorManager[_0x5af19b(0x65e)]=function(){const _0x24410c=_0x5af19b,_0x4a5c1a=_0x24410c(0x17e);this['_colorCache']=this['_colorCache']||{};if(this[_0x24410c(0x517)][_0x4a5c1a])return this[_0x24410c(0x517)][_0x4a5c1a];const _0x282a74=VisuMZ[_0x24410c(0x585)][_0x24410c(0x47e)][_0x24410c(0x471)][_0x24410c(0x670)];return this['getColorDataFromPluginParameters'](_0x4a5c1a,_0x282a74);},ColorManager[_0x5af19b(0x930)]=function(){const _0x4e745d=_0x5af19b,_0x371cf4=_0x4e745d(0x3a7);this[_0x4e745d(0x517)]=this['_colorCache']||{};if(this[_0x4e745d(0x517)][_0x371cf4])return this[_0x4e745d(0x517)][_0x371cf4];const _0x3f5853=VisuMZ[_0x4e745d(0x585)]['Settings']['Color'][_0x4e745d(0x926)];return this[_0x4e745d(0x1c1)](_0x371cf4,_0x3f5853);},ColorManager[_0x5af19b(0x62d)]=function(){const _0x56b9cd=_0x5af19b,_0x4e77e2='_stored_powerDownColor';this[_0x56b9cd(0x517)]=this[_0x56b9cd(0x517)]||{};if(this['_colorCache'][_0x4e77e2])return this['_colorCache'][_0x4e77e2];const _0x406ddb=VisuMZ[_0x56b9cd(0x585)][_0x56b9cd(0x47e)][_0x56b9cd(0x471)][_0x56b9cd(0x94e)];return this[_0x56b9cd(0x1c1)](_0x4e77e2,_0x406ddb);},ColorManager[_0x5af19b(0x406)]=function(){const _0x33ffc5=_0x5af19b,_0xde5a60='_stored_ctGaugeColor1';this['_colorCache']=this['_colorCache']||{};if(this[_0x33ffc5(0x517)][_0xde5a60])return this['_colorCache'][_0xde5a60];const _0x18d255=VisuMZ[_0x33ffc5(0x585)][_0x33ffc5(0x47e)]['Color'][_0x33ffc5(0x1c2)];return this['getColorDataFromPluginParameters'](_0xde5a60,_0x18d255);},ColorManager[_0x5af19b(0x902)]=function(){const _0x4508aa=_0x5af19b,_0x32cc4c='_stored_ctGaugeColor2';this['_colorCache']=this[_0x4508aa(0x517)]||{};if(this[_0x4508aa(0x517)][_0x32cc4c])return this[_0x4508aa(0x517)][_0x32cc4c];const _0x5fcd5=VisuMZ['CoreEngine']['Settings'][_0x4508aa(0x471)][_0x4508aa(0x1ba)];return this[_0x4508aa(0x1c1)](_0x32cc4c,_0x5fcd5);},ColorManager[_0x5af19b(0x8f8)]=function(){const _0x463367=_0x5af19b,_0x14ca1d=_0x463367(0x1a6);this[_0x463367(0x517)]=this[_0x463367(0x517)]||{};if(this[_0x463367(0x517)][_0x14ca1d])return this[_0x463367(0x517)][_0x14ca1d];const _0x2ba63a=VisuMZ['CoreEngine']['Settings']['Color'][_0x463367(0x671)];return this[_0x463367(0x1c1)](_0x14ca1d,_0x2ba63a);},ColorManager[_0x5af19b(0x428)]=function(){const _0xf9abfa=_0x5af19b,_0x11ab65=_0xf9abfa(0x6e8);this[_0xf9abfa(0x517)]=this[_0xf9abfa(0x517)]||{};if(this['_colorCache'][_0x11ab65])return this[_0xf9abfa(0x517)][_0x11ab65];const _0x58cb45=VisuMZ['CoreEngine'][_0xf9abfa(0x47e)][_0xf9abfa(0x471)][_0xf9abfa(0x783)];return this['getColorDataFromPluginParameters'](_0x11ab65,_0x58cb45);},ColorManager[_0x5af19b(0x1f8)]=function(){const _0x40a897=_0x5af19b,_0x26307f='_stored_tpCostColor';this[_0x40a897(0x517)]=this[_0x40a897(0x517)]||{};if(this['_colorCache'][_0x26307f])return this[_0x40a897(0x517)][_0x26307f];const _0x354235=VisuMZ['CoreEngine'][_0x40a897(0x47e)][_0x40a897(0x471)][_0x40a897(0x780)];return this[_0x40a897(0x1c1)](_0x26307f,_0x354235);},ColorManager['pendingColor']=function(){const _0x432d85=_0x5af19b,_0x15efdb=_0x432d85(0x3e3);this[_0x432d85(0x517)]=this[_0x432d85(0x517)]||{};if(this[_0x432d85(0x517)][_0x15efdb])return this[_0x432d85(0x517)][_0x15efdb];const _0x60daf8=VisuMZ[_0x432d85(0x585)]['Settings'][_0x432d85(0x471)][_0x432d85(0x780)];return this['getColorDataFromPluginParameters'](_0x15efdb,_0x60daf8);},ColorManager[_0x5af19b(0x32f)]=function(){const _0xd3c442=_0x5af19b,_0x48cc88=_0xd3c442(0x6cc);this[_0xd3c442(0x517)]=this[_0xd3c442(0x517)]||{};if(this[_0xd3c442(0x517)][_0x48cc88])return this[_0xd3c442(0x517)][_0x48cc88];const _0x3ef19a=VisuMZ['CoreEngine'][_0xd3c442(0x47e)][_0xd3c442(0x471)][_0xd3c442(0x712)];return this['getColorDataFromPluginParameters'](_0x48cc88,_0x3ef19a);},ColorManager[_0x5af19b(0x7cc)]=function(){const _0x3e39a5=_0x5af19b,_0x5b5213=_0x3e39a5(0x359);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x5b5213])return this[_0x3e39a5(0x517)][_0x5b5213];const _0x442d53=VisuMZ[_0x3e39a5(0x585)][_0x3e39a5(0x47e)][_0x3e39a5(0x471)][_0x3e39a5(0x346)];return this[_0x3e39a5(0x1c1)](_0x5b5213,_0x442d53);},ColorManager[_0x5af19b(0x41c)]=function(){const _0x59012=_0x5af19b,_0x19fa59=_0x59012(0x7d0);this[_0x59012(0x517)]=this['_colorCache']||{};if(this[_0x59012(0x517)][_0x19fa59])return this[_0x59012(0x517)][_0x19fa59];const _0x294a25=VisuMZ[_0x59012(0x585)][_0x59012(0x47e)][_0x59012(0x471)][_0x59012(0x43f)];return this[_0x59012(0x1c1)](_0x19fa59,_0x294a25);},ColorManager[_0x5af19b(0x3db)]=function(){const _0x381fa3=_0x5af19b,_0x54527f='_stored_maxLvGaugeColor2';this[_0x381fa3(0x517)]=this[_0x381fa3(0x517)]||{};if(this[_0x381fa3(0x517)][_0x54527f])return this[_0x381fa3(0x517)][_0x54527f];const _0x52d029=VisuMZ[_0x381fa3(0x585)][_0x381fa3(0x47e)][_0x381fa3(0x471)][_0x381fa3(0x79f)];return this['getColorDataFromPluginParameters'](_0x54527f,_0x52d029);},ColorManager[_0x5af19b(0x344)]=function(_0x122a26){const _0x1b5b11=_0x5af19b;return VisuMZ[_0x1b5b11(0x585)][_0x1b5b11(0x47e)][_0x1b5b11(0x471)][_0x1b5b11(0x294)]['call'](this,_0x122a26);},ColorManager[_0x5af19b(0x17b)]=function(_0xfea8d8){const _0x49874f=_0x5af19b;return VisuMZ[_0x49874f(0x585)][_0x49874f(0x47e)]['Color'][_0x49874f(0x797)]['call'](this,_0xfea8d8);},ColorManager[_0x5af19b(0x84e)]=function(_0x39f9d0){const _0xacfc23=_0x5af19b;return VisuMZ['CoreEngine'][_0xacfc23(0x47e)][_0xacfc23(0x471)][_0xacfc23(0x42a)][_0xacfc23(0x535)](this,_0x39f9d0);},ColorManager[_0x5af19b(0x824)]=function(_0x15cb41){const _0x235b6d=_0x5af19b;return VisuMZ[_0x235b6d(0x585)][_0x235b6d(0x47e)][_0x235b6d(0x471)][_0x235b6d(0x53f)][_0x235b6d(0x535)](this,_0x15cb41);},ColorManager[_0x5af19b(0x190)]=function(_0x2877f8){const _0x31d6cd=_0x5af19b;return VisuMZ['CoreEngine'][_0x31d6cd(0x47e)][_0x31d6cd(0x471)][_0x31d6cd(0x914)][_0x31d6cd(0x535)](this,_0x2877f8);},ColorManager['outlineColor']=function(){const _0xfa8b55=_0x5af19b;return VisuMZ[_0xfa8b55(0x585)][_0xfa8b55(0x47e)][_0xfa8b55(0x471)][_0xfa8b55(0x27a)];},ColorManager[_0x5af19b(0x3f8)]=function(){const _0x33f05c=_0x5af19b;return VisuMZ['CoreEngine']['Settings'][_0x33f05c(0x471)][_0x33f05c(0x1cb)]||_0x33f05c(0x33c);},ColorManager[_0x5af19b(0x47c)]=function(){const _0x36730b=_0x5af19b;return VisuMZ['CoreEngine'][_0x36730b(0x47e)]['Color'][_0x36730b(0x2ef)]||_0x36730b(0x34e);},ColorManager[_0x5af19b(0x5cb)]=function(){const _0x5efa74=_0x5af19b;return VisuMZ['CoreEngine'][_0x5efa74(0x47e)][_0x5efa74(0x471)][_0x5efa74(0x293)];},ColorManager[_0x5af19b(0x5f7)]=function(){const _0x40379c=_0x5af19b;return VisuMZ['CoreEngine'][_0x40379c(0x47e)]['Color'][_0x40379c(0x76a)];},ColorManager['itemBackColor1']=function(){const _0x30b604=_0x5af19b;return VisuMZ['CoreEngine'][_0x30b604(0x47e)][_0x30b604(0x471)]['ItemBackColor1'];},ColorManager[_0x5af19b(0x6cb)]=function(){const _0x461e07=_0x5af19b;return VisuMZ[_0x461e07(0x585)][_0x461e07(0x47e)][_0x461e07(0x471)]['ItemBackColor2'];},SceneManager[_0x5af19b(0x5b8)]=[],SceneManager[_0x5af19b(0x770)]=function(){const _0x1c2de6=_0x5af19b;return this['_scene']&&this[_0x1c2de6(0x4ff)][_0x1c2de6(0x33b)]===Scene_Battle;},SceneManager[_0x5af19b(0x4de)]=function(){const _0x5a5735=_0x5af19b;return this[_0x5a5735(0x4ff)]&&this['_scene'][_0x5a5735(0x33b)]===Scene_Map;},SceneManager[_0x5af19b(0x3ad)]=function(){const _0x358854=_0x5af19b;return this[_0x358854(0x4ff)]&&this[_0x358854(0x4ff)]instanceof Scene_Map;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x90a)]=SceneManager[_0x5af19b(0x8cc)],SceneManager[_0x5af19b(0x8cc)]=function(){const _0x224962=_0x5af19b;VisuMZ[_0x224962(0x585)]['SceneManager_initialize'][_0x224962(0x535)](this),this['initVisuMZCoreEngine']();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x57b)]=SceneManager[_0x5af19b(0x199)],SceneManager['onKeyDown']=function(_0x1ff853){const _0x5d60f0=_0x5af19b;if($gameTemp)this[_0x5d60f0(0x4e2)](_0x1ff853);VisuMZ[_0x5d60f0(0x585)][_0x5d60f0(0x57b)][_0x5d60f0(0x535)](this,_0x1ff853);},SceneManager['onKeyDownKeysF6F7']=function(_0x59ebc7){const _0x391664=_0x5af19b;if(!_0x59ebc7['ctrlKey']&&!_0x59ebc7[_0x391664(0x720)])switch(_0x59ebc7[_0x391664(0x3a0)]){case 0x52:this[_0x391664(0x443)]();break;case 0x54:this[_0x391664(0x65c)]();break;case 0x75:this[_0x391664(0x279)]();break;case 0x76:if(Input[_0x391664(0x1b4)]('shift')||Input[_0x391664(0x1b4)](_0x391664(0x564)))return;this[_0x391664(0x1fa)]();break;}else{if(_0x59ebc7[_0x391664(0x323)]){let _0x2acdbe=_0x59ebc7['keyCode'];if(_0x2acdbe>=0x31&&_0x2acdbe<=0x39){const _0x1bb58d=_0x2acdbe-0x30;return SceneManager[_0x391664(0x73c)](_0x1bb58d);}else{if(_0x2acdbe>=0x61&&_0x2acdbe<=0x69){const _0x3b1e00=_0x2acdbe-0x60;return SceneManager['playtestQuickLoad'](_0x3b1e00);}}}}},SceneManager['playTestF6']=function(){const _0x4c9cbd=_0x5af19b;if($gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0x4c9cbd(0x47e)][_0x4c9cbd(0x2cf)][_0x4c9cbd(0x208)]){ConfigManager[_0x4c9cbd(0x8f3)]!==0x0?(ConfigManager[_0x4c9cbd(0x6f0)]=0x0,ConfigManager[_0x4c9cbd(0x4e5)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x4c9cbd(0x8f3)]=0x0):(ConfigManager[_0x4c9cbd(0x6f0)]=0x64,ConfigManager[_0x4c9cbd(0x4e5)]=0x64,ConfigManager[_0x4c9cbd(0x581)]=0x64,ConfigManager[_0x4c9cbd(0x8f3)]=0x64);ConfigManager['save']();if(this[_0x4c9cbd(0x4ff)][_0x4c9cbd(0x33b)]===Scene_Options){if(this['_scene']['_optionsWindow'])this['_scene'][_0x4c9cbd(0x468)]['refresh']();if(this[_0x4c9cbd(0x4ff)]['_listWindow'])this['_scene'][_0x4c9cbd(0x847)][_0x4c9cbd(0x757)]();}}},SceneManager[_0x5af19b(0x1fa)]=function(){const _0x484a11=_0x5af19b;$gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0x484a11(0x47e)]['QoL'][_0x484a11(0x83f)]&&($gameTemp[_0x484a11(0x198)]=!$gameTemp[_0x484a11(0x198)]);},SceneManager[_0x5af19b(0x443)]=function(){const _0x5a1816=_0x5af19b;if(!VisuMZ[_0x5a1816(0x585)][_0x5a1816(0x47e)][_0x5a1816(0x2cf)][_0x5a1816(0x5fc)])return;if(!$gameTemp[_0x5a1816(0x75a)]())return;if(!SceneManager[_0x5a1816(0x770)]())return;if(!Input[_0x5a1816(0x1b4)](_0x5a1816(0x458)))return;for(const _0x10b724 of $gameParty['members']()){if(!_0x10b724)continue;_0x10b724['recoverAll']();}},SceneManager[_0x5af19b(0x65c)]=function(){const _0xdd603c=_0x5af19b;if(!VisuMZ['CoreEngine'][_0xdd603c(0x47e)][_0xdd603c(0x2cf)]['ShiftT_Toggle'])return;if(!$gameTemp[_0xdd603c(0x75a)]())return;if(!SceneManager[_0xdd603c(0x770)]())return;if(!Input[_0xdd603c(0x1b4)](_0xdd603c(0x458)))return;for(const _0x28bdd2 of $gameParty[_0xdd603c(0x8f9)]()){if(!_0x28bdd2)continue;_0x28bdd2['gainSilentTp'](_0x28bdd2[_0xdd603c(0x33d)]());}},SceneManager[_0x5af19b(0x73c)]=function(_0x14927a){const _0x17a3f7=_0x5af19b;if(!$gameTemp[_0x17a3f7(0x75a)]())return;if(!DataManager[_0x17a3f7(0x832)](_0x14927a))return;if(!(VisuMZ[_0x17a3f7(0x585)][_0x17a3f7(0x47e)][_0x17a3f7(0x2cf)][_0x17a3f7(0x8df)]??!![]))return;this[_0x17a3f7(0x3a5)](Scene_QuickLoad),this[_0x17a3f7(0x3d8)](_0x14927a);},SceneManager[_0x5af19b(0x8ed)]=function(){const _0x454cdf=_0x5af19b;this[_0x454cdf(0x8c1)]=![],this[_0x454cdf(0x285)]=!VisuMZ['CoreEngine'][_0x454cdf(0x47e)]['UI'][_0x454cdf(0x2a0)];},SceneManager[_0x5af19b(0x84d)]=function(_0x31b96e){const _0x33ebe1=_0x5af19b;VisuMZ[_0x33ebe1(0x585)]['Settings']['UI']['SideButtons']&&(this['_sideButtonLayout']=_0x31b96e);},SceneManager['isSideButtonLayout']=function(){return this['_sideButtonLayout'];},SceneManager['areButtonsHidden']=function(){const _0x40b2dd=_0x5af19b;return this[_0x40b2dd(0x285)];},SceneManager[_0x5af19b(0x7f4)]=function(){const _0x10bfb1=_0x5af19b;return this[_0x10bfb1(0x19d)]()||this['isSideButtonLayout']();},VisuMZ[_0x5af19b(0x585)]['SceneManager_isGameActive']=SceneManager[_0x5af19b(0x8b1)],SceneManager['isGameActive']=function(){const _0x1c11bd=_0x5af19b;return VisuMZ[_0x1c11bd(0x585)][_0x1c11bd(0x47e)][_0x1c11bd(0x2cf)][_0x1c11bd(0x5ae)]?VisuMZ['CoreEngine'][_0x1c11bd(0x777)][_0x1c11bd(0x535)](this):!![];},SceneManager['catchException']=function(_0x34b97b){const _0x4ca268=_0x5af19b;if(_0x34b97b instanceof Error)this[_0x4ca268(0x654)](_0x34b97b);else _0x34b97b instanceof Array&&_0x34b97b[0x0]===_0x4ca268(0x21d)?this[_0x4ca268(0x8f4)](_0x34b97b):this[_0x4ca268(0x70e)](_0x34b97b);this['stop']();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x616)]=BattleManager['processEscape'],BattleManager[_0x5af19b(0x1e1)]=function(){const _0x508e6f=_0x5af19b;return VisuMZ[_0x508e6f(0x585)][_0x508e6f(0x47e)][_0x508e6f(0x2cf)][_0x508e6f(0x7be)]?this['processAlwaysEscape']():VisuMZ[_0x508e6f(0x585)][_0x508e6f(0x616)][_0x508e6f(0x535)](this);},BattleManager[_0x5af19b(0x60e)]=function(){const _0x1e60ba=_0x5af19b;return $gameParty[_0x1e60ba(0x5c5)](),SoundManager[_0x1e60ba(0x6b7)](),this[_0x1e60ba(0x83e)](),!![];},BattleManager[_0x5af19b(0x4e9)]=function(){const _0x550f5e=_0x5af19b;return $gameSystem[_0x550f5e(0x862)]()>=0x1;},BattleManager[_0x5af19b(0x88f)]=function(){const _0x34dfc0=_0x5af19b;return $gameSystem[_0x34dfc0(0x862)]()===0x1;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x2f5)]=Game_Temp[_0x5af19b(0x397)][_0x5af19b(0x8cc)],Game_Temp[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(){const _0x79e149=_0x5af19b;VisuMZ[_0x79e149(0x585)][_0x79e149(0x2f5)][_0x79e149(0x535)](this),this[_0x79e149(0x80a)](),this[_0x79e149(0x150)](),this[_0x79e149(0x69c)]();},Game_Temp['prototype']['forceOutOfPlaytest']=function(){const _0x5e8e35=_0x5af19b;VisuMZ[_0x5e8e35(0x585)][_0x5e8e35(0x47e)]['QoL'][_0x5e8e35(0x8b4)]&&(this['_isPlaytest']=![]);},Game_Temp[_0x5af19b(0x397)]['setLastPluginCommandInterpreter']=function(_0x297741){this['_lastPluginCommandInterpreter']=_0x297741;},Game_Temp[_0x5af19b(0x397)][_0x5af19b(0x890)]=function(){const _0x3b4349=_0x5af19b;return this[_0x3b4349(0x2f2)];},Game_Temp['prototype'][_0x5af19b(0x1f5)]=function(){const _0x5bbdd7=_0x5af19b;this[_0x5bbdd7(0x62f)]=undefined,this['_forcedBattleSys']=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp['prototype'][_0x5af19b(0x42d)]=function(_0x23cce1){const _0x528eb8=_0x5af19b;$gameMap&&$dataMap&&$dataMap[_0x528eb8(0x24a)]&&this[_0x528eb8(0x84b)]($dataMap[_0x528eb8(0x24a)]);const _0x588118=$dataTroops[_0x23cce1];if(_0x588118){let _0x42c41c=DataManager[_0x528eb8(0x71c)](_0x588118['id']);this[_0x528eb8(0x84b)](_0x42c41c);}},Game_Temp[_0x5af19b(0x397)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x29687f){const _0x5acdbc=_0x5af19b;if(!_0x29687f)return;if(_0x29687f['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x5acdbc(0x62f)]='FV';else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x378ee5=String(RegExp['$1']);if(_0x378ee5[_0x5acdbc(0x37b)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x5acdbc(0x62f)]='FV';else _0x378ee5[_0x5acdbc(0x37b)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x29687f[_0x5acdbc(0x37b)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x5acdbc(0x5cf)]=0x2;else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:TPB|ATB)>/i))this[_0x5acdbc(0x5cf)]=0x2;else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:CTB)>/i))Imported[_0x5acdbc(0x1ea)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x5e0));else{if(_0x29687f['match'](/<(?:STB)>/i))Imported[_0x5acdbc(0x86b)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x4d0));else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:BTB)>/i))Imported[_0x5acdbc(0x3d1)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x1e0));else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:FTB)>/i))Imported[_0x5acdbc(0x4a8)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x5b1));else{if(_0x29687f['match'](/<(?:OTB)>/i))Imported[_0x5acdbc(0x62e)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x53c));else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:ETB)>/i))Imported[_0x5acdbc(0x70d)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x412));else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:PTB)>/i))Imported[_0x5acdbc(0x3be)]&&(this['_forcedBattleSys']=_0x5acdbc(0x53e));else{if(_0x29687f[_0x5acdbc(0x37b)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x48434b=String(RegExp['$1']);if(_0x48434b[_0x5acdbc(0x37b)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x48434b[_0x5acdbc(0x37b)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x5acdbc(0x5cf)]=0x1;else{if(_0x48434b[_0x5acdbc(0x37b)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x48434b[_0x5acdbc(0x37b)](/CTB/i))Imported[_0x5acdbc(0x1ea)]&&(this['_forcedBattleSys']=_0x5acdbc(0x5e0));else{if(_0x48434b[_0x5acdbc(0x37b)](/STB/i))Imported[_0x5acdbc(0x86b)]&&(this['_forcedBattleSys']=_0x5acdbc(0x4d0));else{if(_0x48434b[_0x5acdbc(0x37b)](/BTB/i))Imported[_0x5acdbc(0x3d1)]&&(this['_forcedBattleSys']=_0x5acdbc(0x1e0));else{if(_0x48434b[_0x5acdbc(0x37b)](/FTB/i))Imported[_0x5acdbc(0x4a8)]&&(this['_forcedBattleSys']='FTB');else{if(_0x48434b[_0x5acdbc(0x37b)](/OTB/i))Imported[_0x5acdbc(0x62e)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x53c));else{if(_0x48434b['match'](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x412));else _0x48434b['match'](/PTB/i)&&(Imported[_0x5acdbc(0x3be)]&&(this[_0x5acdbc(0x5cf)]=_0x5acdbc(0x53e)));}}}}}}}}}}}}}}}}}}}}if(_0x29687f[_0x5acdbc(0x37b)](/<(?:|BATTLE )GRID>/i))this[_0x5acdbc(0x76f)]=!![];else _0x29687f['match'](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x5acdbc(0x76f)]=![]);},Game_Temp[_0x5af19b(0x397)][_0x5af19b(0x150)]=function(){const _0x146e79=_0x5af19b;this[_0x146e79(0x541)]=[];},Game_Temp['prototype']['requestFauxAnimation']=function(_0x46cd90,_0x594e5a,_0x2dd018,_0x113a6b){const _0x344fd1=_0x5af19b;if(!this['showFauxAnimations']())return;_0x2dd018=_0x2dd018||![],_0x113a6b=_0x113a6b||![];if($dataAnimations[_0x594e5a]){const _0x1d810b={'targets':_0x46cd90,'animationId':_0x594e5a,'mirror':_0x2dd018,'mute':_0x113a6b};this[_0x344fd1(0x541)][_0x344fd1(0x3a5)](_0x1d810b);for(const _0x51c9f9 of _0x46cd90){_0x51c9f9[_0x344fd1(0x7e0)]&&_0x51c9f9['startAnimation']();}}},Game_Temp[_0x5af19b(0x397)][_0x5af19b(0x7c4)]=function(){return!![];},Game_Temp['prototype'][_0x5af19b(0x206)]=function(){const _0x3dea69=_0x5af19b;return this[_0x3dea69(0x541)][_0x3dea69(0x458)]();},Game_Temp[_0x5af19b(0x397)][_0x5af19b(0x69c)]=function(){const _0x4c8da0=_0x5af19b;this[_0x4c8da0(0x308)]=[];},Game_Temp['prototype'][_0x5af19b(0x184)]=function(_0x268b6f,_0x1bc835,_0x4d9e4e,_0x577226,_0x2dc1f0){const _0x194cae=_0x5af19b;if(!this[_0x194cae(0x23f)]())return;_0x577226=_0x577226||![],_0x2dc1f0=_0x2dc1f0||![];if($dataAnimations[_0x4d9e4e]){const _0x56ca3b={'x':_0x268b6f,'y':_0x1bc835,'animationId':_0x4d9e4e,'mirror':_0x577226,'mute':_0x2dc1f0};this[_0x194cae(0x308)][_0x194cae(0x3a5)](_0x56ca3b);}},Game_Temp[_0x5af19b(0x397)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x5af19b(0x397)]['retrievePointAnimation']=function(){const _0x3d7e72=_0x5af19b;return this[_0x3d7e72(0x308)][_0x3d7e72(0x458)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x14e)]=Game_System[_0x5af19b(0x397)][_0x5af19b(0x8cc)],Game_System[_0x5af19b(0x397)]['initialize']=function(){const _0x190af5=_0x5af19b;VisuMZ[_0x190af5(0x585)]['Game_System_initialize'][_0x190af5(0x535)](this),this[_0x190af5(0x324)]();},Game_System[_0x5af19b(0x397)]['initCoreEngine']=function(){const _0x25f5be=_0x5af19b;this[_0x25f5be(0x8e9)]={'SideView':$dataSystem[_0x25f5be(0x83b)],'BattleSystem':this[_0x25f5be(0x380)](),'FontSize':$dataSystem[_0x25f5be(0x312)][_0x25f5be(0x798)],'Padding':0xc};},Game_System[_0x5af19b(0x397)]['isSideView']=function(){const _0xc8efb9=_0x5af19b;if($gameTemp[_0xc8efb9(0x62f)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0xc8efb9(0x8e9)]===undefined)this[_0xc8efb9(0x324)]();if(this[_0xc8efb9(0x8e9)][_0xc8efb9(0x1b1)]===undefined)this[_0xc8efb9(0x324)]();return this['_CoreEngineSettings'][_0xc8efb9(0x1b1)];},Game_System[_0x5af19b(0x397)][_0x5af19b(0x86c)]=function(_0xf955ff){const _0x22e0cb=_0x5af19b;if(this['_CoreEngineSettings']===undefined)this[_0x22e0cb(0x324)]();if(this['_CoreEngineSettings'][_0x22e0cb(0x1b1)]===undefined)this[_0x22e0cb(0x324)]();this[_0x22e0cb(0x8e9)]['SideView']=_0xf955ff;},Game_System['prototype'][_0x5af19b(0x430)]=function(){const _0x47dc29=_0x5af19b;if(this['_CoreEngineSettings']===undefined)this[_0x47dc29(0x324)]();this[_0x47dc29(0x8e9)]['BattleSystem']=this[_0x47dc29(0x380)]();},Game_System[_0x5af19b(0x397)][_0x5af19b(0x380)]=function(){const _0x257625=_0x5af19b,_0x2ab4a4=(VisuMZ[_0x257625(0x585)][_0x257625(0x47e)][_0x257625(0x1b9)]||_0x257625(0x725))[_0x257625(0x49d)]()[_0x257625(0x254)]();return VisuMZ[_0x257625(0x585)][_0x257625(0x22a)](_0x2ab4a4);},Game_System[_0x5af19b(0x397)][_0x5af19b(0x862)]=function(){const _0x25174e=_0x5af19b;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x25174e(0x8e9)]===undefined)this[_0x25174e(0x324)]();if(this[_0x25174e(0x8e9)][_0x25174e(0x1b9)]===undefined)this[_0x25174e(0x430)]();return this['_CoreEngineSettings'][_0x25174e(0x1b9)];},Game_System['prototype'][_0x5af19b(0x367)]=function(_0x22f592){const _0x1d768b=_0x5af19b;if(this[_0x1d768b(0x8e9)]===undefined)this[_0x1d768b(0x324)]();if(this['_CoreEngineSettings'][_0x1d768b(0x1b9)]===undefined)this[_0x1d768b(0x430)]();this['_CoreEngineSettings'][_0x1d768b(0x1b9)]=_0x22f592;},Game_System[_0x5af19b(0x397)][_0x5af19b(0x368)]=function(){const _0x3544bd=_0x5af19b;if(this[_0x3544bd(0x8e9)]===undefined)this[_0x3544bd(0x324)]();if(this[_0x3544bd(0x8e9)][_0x3544bd(0x76e)]===undefined)this[_0x3544bd(0x324)]();return this[_0x3544bd(0x8e9)][_0x3544bd(0x76e)];},Game_System[_0x5af19b(0x397)][_0x5af19b(0x490)]=function(_0x41fd19){const _0x2f9ec9=_0x5af19b;if(this[_0x2f9ec9(0x8e9)]===undefined)this['initCoreEngine']();if(this[_0x2f9ec9(0x8e9)]['TimeProgress']===undefined)this[_0x2f9ec9(0x324)]();this[_0x2f9ec9(0x8e9)]['FontSize']=_0x41fd19;},Game_System[_0x5af19b(0x397)][_0x5af19b(0x339)]=function(){const _0x2e1cec=_0x5af19b;if(this[_0x2e1cec(0x8e9)]===undefined)this[_0x2e1cec(0x324)]();if(this[_0x2e1cec(0x8e9)][_0x2e1cec(0x434)]===undefined)this['initCoreEngine']();return this[_0x2e1cec(0x8e9)][_0x2e1cec(0x434)];},Game_System['prototype'][_0x5af19b(0x188)]=function(_0x31ee1a){const _0x356556=_0x5af19b;if(this[_0x356556(0x8e9)]===undefined)this[_0x356556(0x324)]();if(this[_0x356556(0x8e9)][_0x356556(0x76c)]===undefined)this[_0x356556(0x324)]();this[_0x356556(0x8e9)][_0x356556(0x434)]=_0x31ee1a;},VisuMZ[_0x5af19b(0x585)]['Game_Screen_initialize']=Game_Screen['prototype']['initialize'],Game_Screen['prototype'][_0x5af19b(0x8cc)]=function(){VisuMZ['CoreEngine']['Game_Screen_initialize']['call'](this),this['initCoreEngineScreenShake']();},Game_Screen['prototype'][_0x5af19b(0x25e)]=function(){const _0x46bcf9=_0x5af19b,_0x3fd937=VisuMZ['CoreEngine']['Settings'][_0x46bcf9(0x44c)];this['_coreEngineShakeStyle']=_0x3fd937?.['DefaultStyle']||_0x46bcf9(0x186);},Game_Screen['prototype']['getCoreEngineScreenShakeStyle']=function(){const _0x123dee=_0x5af19b;if(this[_0x123dee(0x71a)]===undefined)this[_0x123dee(0x25e)]();return this[_0x123dee(0x71a)];},Game_Screen['prototype']['setCoreEngineScreenShakeStyle']=function(_0x1caa72){const _0x43451b=_0x5af19b;if(this[_0x43451b(0x71a)]===undefined)this[_0x43451b(0x25e)]();this[_0x43451b(0x71a)]=_0x1caa72[_0x43451b(0x79e)]()[_0x43451b(0x254)]();},Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x6fe)]=function(){const _0x543c28=_0x5af19b;if($gameParty[_0x543c28(0x352)]())return![];return this[_0x543c28(0x8de)]()&&this[_0x543c28(0x8de)]()[_0x543c28(0x91b)](0x0)==='!';},Game_Picture['prototype'][_0x5af19b(0x8de)]=function(){return this['_name']['split']('/')['pop']();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x6d7)]=Game_Picture[_0x5af19b(0x397)]['x'],Game_Picture[_0x5af19b(0x397)]['x']=function(){const _0x44b238=_0x5af19b;return this[_0x44b238(0x6fe)]()?this['xScrollLinkedOffset']():VisuMZ['CoreEngine'][_0x44b238(0x6d7)][_0x44b238(0x535)](this);},Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x50b)]=function(){const _0x51766a=_0x5af19b,_0x469bfa=$gameMap[_0x51766a(0x44e)]()*$gameMap['tileWidth']();return(this['_x']-_0x469bfa)*$gameScreen[_0x51766a(0x5a6)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x2db)]=Game_Picture[_0x5af19b(0x397)]['y'],Game_Picture[_0x5af19b(0x397)]['y']=function(){const _0x5181f9=_0x5af19b;return this['isMapScrollLinked']()?this[_0x5181f9(0x1c8)]():VisuMZ[_0x5181f9(0x585)][_0x5181f9(0x2db)]['call'](this);},Game_Picture[_0x5af19b(0x397)]['yScrollLinkedOffset']=function(){const _0x3ea13f=$gameMap['displayY']()*$gameMap['tileHeight']();return(this['_y']-_0x3ea13f)*$gameScreen['zoomScale']();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x2cd)]=Game_Picture[_0x5af19b(0x397)]['scaleX'],Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x6e0)]=function(){const _0x5b669c=_0x5af19b;let _0x12ab23=VisuMZ[_0x5b669c(0x585)][_0x5b669c(0x2cd)][_0x5b669c(0x535)](this);return this[_0x5b669c(0x6fe)]()&&(_0x12ab23*=$gameScreen[_0x5b669c(0x5a6)]()),_0x12ab23;},VisuMZ[_0x5af19b(0x585)]['Game_Picture_scaleY']=Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x68b)],Game_Picture['prototype'][_0x5af19b(0x68b)]=function(){const _0x5e9d88=_0x5af19b;let _0x3005b2=VisuMZ[_0x5e9d88(0x585)]['Game_Picture_scaleY'][_0x5e9d88(0x535)](this);return this[_0x5e9d88(0x6fe)]()&&(_0x3005b2*=$gameScreen[_0x5e9d88(0x5a6)]()),_0x3005b2;},Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x5e8)]=function(_0x104790){const _0x3c2233=_0x5af19b;this[_0x3c2233(0x382)]=_0x104790;},VisuMZ[_0x5af19b(0x585)]['Game_Picture_calcEasing']=Game_Picture['prototype'][_0x5af19b(0x672)],Game_Picture['prototype']['calcEasing']=function(_0x569e8a){const _0x16c0ae=_0x5af19b;return this[_0x16c0ae(0x382)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x16c0ae(0x319)](this[_0x16c0ae(0x382)])?VisuMZ[_0x16c0ae(0x585)][_0x16c0ae(0x377)]['call'](this,_0x569e8a):VisuMZ['ApplyEasing'](_0x569e8a,this['_coreEasingType']);},VisuMZ['CoreEngine'][_0x5af19b(0x43d)]=Game_Picture['prototype']['initRotation'],Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x85b)]=function(){const _0x342df0=_0x5af19b;VisuMZ[_0x342df0(0x585)]['Game_Picture_initRotation'][_0x342df0(0x535)](this),this[_0x342df0(0x8a5)]();},Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x8a5)]=function(){const _0x398742=_0x5af19b;this[_0x398742(0x6c5)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x398742(0x2c5)};},VisuMZ['CoreEngine'][_0x5af19b(0x3f2)]=Game_Picture['prototype'][_0x5af19b(0x455)],Game_Picture['prototype'][_0x5af19b(0x455)]=function(){const _0x551894=_0x5af19b;let _0x54a2b9=VisuMZ[_0x551894(0x585)]['Game_Picture_angle'][_0x551894(0x535)](this);return _0x54a2b9+=this[_0x551894(0x420)](),_0x54a2b9;},Game_Picture[_0x5af19b(0x397)]['anglePlus']=function(){const _0x63e154=_0x5af19b;if(this[_0x63e154(0x6c5)]===undefined)this[_0x63e154(0x8a5)]();return this[_0x63e154(0x6c5)]['current']||0x0;},Game_Picture[_0x5af19b(0x397)]['setAnglePlusData']=function(_0x5eab89,_0x116cbe,_0x22b0a4){const _0x99b64d=_0x5af19b;if(this[_0x99b64d(0x6c5)]===undefined)this[_0x99b64d(0x8a5)]();this['_anglePlus']['target']=_0x5eab89||0x0,this['_anglePlus'][_0x99b64d(0x666)]=_0x116cbe||0x0,this[_0x99b64d(0x6c5)][_0x99b64d(0x26d)]=_0x116cbe||0x0,this['_anglePlus'][_0x99b64d(0x89c)]=_0x22b0a4||_0x99b64d(0x2c5),_0x116cbe<=0x0&&(this[_0x99b64d(0x6c5)][_0x99b64d(0x1be)]=this['_anglePlus']['target']);},Game_Picture[_0x5af19b(0x397)]['changeAnglePlusData']=function(_0x33f6d1,_0xb2ba2d,_0x12b74e){const _0x1333e5=_0x5af19b;if(this[_0x1333e5(0x6c5)]===undefined)this[_0x1333e5(0x8a5)]();this[_0x1333e5(0x6c5)][_0x1333e5(0x5ea)]+=_0x33f6d1||0x0,this[_0x1333e5(0x6c5)][_0x1333e5(0x666)]=_0xb2ba2d||0x0,this['_anglePlus'][_0x1333e5(0x26d)]=_0xb2ba2d||0x0,this[_0x1333e5(0x6c5)]['easingType']=_0x12b74e||'Linear',_0xb2ba2d<=0x0&&(this[_0x1333e5(0x6c5)][_0x1333e5(0x1be)]=this[_0x1333e5(0x6c5)][_0x1333e5(0x5ea)]);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x947)]=Game_Picture['prototype'][_0x5af19b(0x1d9)],Game_Picture[_0x5af19b(0x397)]['updateRotation']=function(){const _0x5bbb04=_0x5af19b;VisuMZ['CoreEngine'][_0x5bbb04(0x947)][_0x5bbb04(0x535)](this),this['updateAnglePlus']();},Game_Picture[_0x5af19b(0x397)]['updateAnglePlus']=function(){const _0x228738=_0x5af19b;if(this[_0x228738(0x6c5)]===undefined)this[_0x228738(0x8a5)]();const _0x5d59dd=this[_0x228738(0x6c5)];if(_0x5d59dd[_0x228738(0x666)]<=0x0)return;_0x5d59dd[_0x228738(0x1be)]=this[_0x228738(0x8d1)](_0x5d59dd['current'],_0x5d59dd[_0x228738(0x5ea)]),_0x5d59dd[_0x228738(0x666)]--,_0x5d59dd[_0x228738(0x666)]<=0x0&&(_0x5d59dd[_0x228738(0x1be)]=_0x5d59dd[_0x228738(0x5ea)]);},Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x8d1)]=function(_0x143981,_0x9a3e97){const _0x497db1=_0x5af19b,_0x7fb613=this['_anglePlus'],_0x5ec8d9=_0x7fb613[_0x497db1(0x89c)],_0x41ae1d=_0x7fb613['duration'],_0x276571=_0x7fb613[_0x497db1(0x26d)],_0x1b516a=VisuMZ[_0x497db1(0x7c3)]((_0x276571-_0x41ae1d)/_0x276571,_0x5ec8d9),_0x29af09=VisuMZ[_0x497db1(0x7c3)]((_0x276571-_0x41ae1d+0x1)/_0x276571,_0x5ec8d9),_0x2403c6=(_0x143981-_0x9a3e97*_0x1b516a)/(0x1-_0x1b516a);return _0x2403c6+(_0x9a3e97-_0x2403c6)*_0x29af09;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x8b2)]=Game_Action['prototype'][_0x5af19b(0x657)],Game_Action[_0x5af19b(0x397)][_0x5af19b(0x657)]=function(_0x48f287){const _0xd8169d=_0x5af19b;return VisuMZ['CoreEngine'][_0xd8169d(0x47e)]['QoL'][_0xd8169d(0x260)]?this[_0xd8169d(0x489)](_0x48f287):VisuMZ['CoreEngine']['Game_Action_itemHit']['call'](this,_0x48f287);},Game_Action[_0x5af19b(0x397)]['itemHitImprovedAccuracy']=function(_0x5b8aa9){const _0x9fcc17=_0x5af19b,_0x10c45c=this[_0x9fcc17(0x290)](_0x5b8aa9),_0xdb4be0=this[_0x9fcc17(0x373)](_0x5b8aa9),_0x3a863c=this[_0x9fcc17(0x22f)](_0x5b8aa9);return _0x10c45c*(_0xdb4be0-_0x3a863c);},VisuMZ[_0x5af19b(0x585)]['Game_Action_itemEva']=Game_Action['prototype']['itemEva'],Game_Action[_0x5af19b(0x397)][_0x5af19b(0x4f8)]=function(_0x3c758e){const _0x1b1a9c=_0x5af19b;return VisuMZ[_0x1b1a9c(0x585)]['Settings']['QoL'][_0x1b1a9c(0x260)]?0x0:VisuMZ[_0x1b1a9c(0x585)]['Game_Action_itemEva'][_0x1b1a9c(0x535)](this,_0x3c758e);},Game_Action[_0x5af19b(0x397)][_0x5af19b(0x290)]=function(_0x1ce30e){const _0x27b47b=_0x5af19b;return this[_0x27b47b(0x624)]()[_0x27b47b(0x24d)]*0.01;},Game_Action[_0x5af19b(0x397)][_0x5af19b(0x373)]=function(_0x132c6a){const _0x30e250=_0x5af19b;if(VisuMZ[_0x30e250(0x585)][_0x30e250(0x47e)]['QoL'][_0x30e250(0x2e8)]&&this[_0x30e250(0x175)]())return 0x1;return this['isPhysical']()?VisuMZ['CoreEngine'][_0x30e250(0x47e)][_0x30e250(0x2cf)]['AccuracyBoost']&&this[_0x30e250(0x3d0)]()[_0x30e250(0x70c)]()?this[_0x30e250(0x3d0)]()[_0x30e250(0x4ac)]+0.05:this[_0x30e250(0x3d0)]()[_0x30e250(0x4ac)]:0x1;},Game_Action[_0x5af19b(0x397)][_0x5af19b(0x22f)]=function(_0x342b84){const _0xf04197=_0x5af19b;if(this[_0xf04197(0x3d0)]()[_0xf04197(0x70c)]()===_0x342b84[_0xf04197(0x70c)]())return 0x0;if(this[_0xf04197(0x79b)]())return VisuMZ[_0xf04197(0x585)][_0xf04197(0x47e)][_0xf04197(0x2cf)][_0xf04197(0x2e8)]&&_0x342b84[_0xf04197(0x21f)]()?_0x342b84[_0xf04197(0x49e)]-0.05:_0x342b84[_0xf04197(0x49e)];else return this[_0xf04197(0x521)]()?_0x342b84[_0xf04197(0x628)]:0x0;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x68a)]=Game_Action[_0x5af19b(0x397)]['updateLastTarget'],Game_Action[_0x5af19b(0x397)][_0x5af19b(0x8f0)]=function(_0x187c13){const _0x2a147f=_0x5af19b;VisuMZ[_0x2a147f(0x585)][_0x2a147f(0x68a)]['call'](this,_0x187c13);if(VisuMZ['CoreEngine'][_0x2a147f(0x47e)][_0x2a147f(0x2cf)][_0x2a147f(0x260)])return;const _0xa7327c=_0x187c13['result']();_0xa7327c[_0x2a147f(0x49c)]&&(0x1-this[_0x2a147f(0x4f8)](_0x187c13)>this[_0x2a147f(0x657)](_0x187c13)&&(_0xa7327c['missed']=![],_0xa7327c[_0x2a147f(0x1fd)]=!![]));},VisuMZ[_0x5af19b(0x585)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x71f)],Game_BattlerBase[_0x5af19b(0x397)]['initMembers']=function(){const _0x463865=_0x5af19b;this['_cache']={},VisuMZ[_0x463865(0x585)][_0x463865(0x28e)][_0x463865(0x535)](this);},VisuMZ['CoreEngine'][_0x5af19b(0x349)]=Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x757)],Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x757)]=function(){const _0x330e18=_0x5af19b;this[_0x330e18(0x800)]={},VisuMZ[_0x330e18(0x585)][_0x330e18(0x349)][_0x330e18(0x535)](this);},Game_BattlerBase['prototype'][_0x5af19b(0x7a2)]=function(_0x4b8d90){const _0x57882f=_0x5af19b;return this[_0x57882f(0x800)]=this['_cache']||{},this[_0x57882f(0x800)][_0x4b8d90]!==undefined;},VisuMZ[_0x5af19b(0x585)]['JsReplaceUserVar']=function(_0x3077bd){const _0x36cb9b=_0x5af19b;return _0x3077bd=_0x3077bd||'',_0x3077bd='\x20'+_0x3077bd,(VisuMZ[_0x36cb9b(0x585)][_0x36cb9b(0x47e)]['Param'][_0x36cb9b(0x1ad)]??!![])&&(_0x3077bd=_0x3077bd['replace'](/\s(?:USER|THIS)\.mhp\b/gi,_0x36cb9b(0x5d5)),_0x3077bd=_0x3077bd['replace'](/\s(?:USER|THIS)\.mmp\b/gi,_0x36cb9b(0x563)),_0x3077bd=_0x3077bd[_0x36cb9b(0x7f0)](/\s(?:USER|THIS)\.atk\b/gi,_0x36cb9b(0x479)),_0x3077bd=_0x3077bd[_0x36cb9b(0x7f0)](/\s(?:USER|THIS)\.def\b/gi,_0x36cb9b(0x661)),_0x3077bd=_0x3077bd[_0x36cb9b(0x7f0)](/\s(?:USER|THIS)\.mat\b/gi,_0x36cb9b(0x333)),_0x3077bd=_0x3077bd['replace'](/\s(?:USER|THIS)\.mdf\b/gi,_0x36cb9b(0x2b4)),_0x3077bd=_0x3077bd['replace'](/\s(?:USER|THIS)\.agi\b/gi,'this.paramBase(6)'),_0x3077bd=_0x3077bd[_0x36cb9b(0x7f0)](/\s(?:USER|THIS)\.luk\b/gi,_0x36cb9b(0x82d)),_0x3077bd=_0x3077bd[_0x36cb9b(0x7f0)](/\s(?:USER|THIS)\.param\(/gi,'this.paramBase(')),_0x3077bd=_0x3077bd[_0x36cb9b(0x7f0)](/\suser\./gi,_0x36cb9b(0x46e)),_0x3077bd;},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x3e8)]=function(_0x2e5928){const _0xfdf862=_0x5af19b,_0x461057=(_0xaf1344,_0x5eed07)=>{const _0x255d28=_0x4b94;if(!_0x5eed07)return _0xaf1344;if(_0x5eed07[_0x255d28(0x24a)]['match'](VisuMZ[_0x255d28(0x585)][_0x255d28(0x268)][_0x255d28(0x3e8)][_0x2e5928])){var _0x56569d=Number(RegExp['$1']);_0xaf1344+=_0x56569d;}if(_0x5eed07[_0x255d28(0x24a)][_0x255d28(0x37b)](VisuMZ[_0x255d28(0x585)][_0x255d28(0x268)][_0x255d28(0x5db)][_0x2e5928])){var _0x57f39f=String(RegExp['$1']);_0x57f39f=VisuMZ[_0x255d28(0x585)][_0x255d28(0x416)](_0x57f39f);try{_0xaf1344+=eval(_0x57f39f);}catch(_0x37c11c){if($gameTemp[_0x255d28(0x75a)]())console[_0x255d28(0x615)](_0x37c11c);}}return _0xaf1344;};return this[_0xfdf862(0x31e)]()[_0xfdf862(0x18d)](_0x461057,this['_paramPlus'][_0x2e5928]);},Game_BattlerBase[_0x5af19b(0x397)]['paramMax']=function(_0x37b076){const _0x24baac=_0x5af19b;var _0x5430c8=_0x24baac(0x64b)+(this['isActor']()?_0x24baac(0x8a2):_0x24baac(0x1f3))+_0x24baac(0x16a)+_0x37b076;if(this['checkCacheKey'](_0x5430c8))return this['_cache'][_0x5430c8];this[_0x24baac(0x800)][_0x5430c8]=eval(VisuMZ[_0x24baac(0x585)]['Settings'][_0x24baac(0x61e)][_0x5430c8]);const _0x1e0b6e=(_0x6b305e,_0x520d8f)=>{const _0x31014f=_0x24baac;if(!_0x520d8f)return _0x6b305e;if(_0x520d8f[_0x31014f(0x24a)]['match'](VisuMZ[_0x31014f(0x585)][_0x31014f(0x268)]['paramMax'][_0x37b076])){var _0x4e6f5d=Number(RegExp['$1']);if(_0x4e6f5d===0x0)_0x4e6f5d=Number['MAX_SAFE_INTEGER'];_0x6b305e=Math[_0x31014f(0x689)](_0x6b305e,_0x4e6f5d);}if(_0x520d8f[_0x31014f(0x24a)][_0x31014f(0x37b)](VisuMZ[_0x31014f(0x585)][_0x31014f(0x268)]['paramMaxJS'][_0x37b076])){var _0x14286f=String(RegExp['$1']);_0x14286f=VisuMZ[_0x31014f(0x585)][_0x31014f(0x416)](_0x14286f);try{_0x6b305e=Math[_0x31014f(0x689)](_0x6b305e,Number(eval(_0x14286f)));}catch(_0x19300c){if($gameTemp['isPlaytest']())console[_0x31014f(0x615)](_0x19300c);}}return _0x6b305e;};if(this[_0x24baac(0x800)][_0x5430c8]===0x0)this['_cache'][_0x5430c8]=Number[_0x24baac(0x1ec)];return this[_0x24baac(0x800)][_0x5430c8]=this[_0x24baac(0x31e)]()[_0x24baac(0x18d)](_0x1e0b6e,this['_cache'][_0x5430c8]),this['_cache'][_0x5430c8];},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x220)]=function(_0x378b11){const _0x31774c=_0x5af19b,_0x9c5ee8=this[_0x31774c(0x241)](Game_BattlerBase[_0x31774c(0x1bf)],_0x378b11),_0x4697b3=(_0x5c2554,_0x53220e)=>{const _0x1469ff=_0x31774c;if(!_0x53220e)return _0x5c2554;if(_0x53220e[_0x1469ff(0x24a)]['match'](VisuMZ[_0x1469ff(0x585)][_0x1469ff(0x268)]['paramRate1'][_0x378b11])){var _0x8470de=Number(RegExp['$1'])/0x64;_0x5c2554*=_0x8470de;}if(_0x53220e['note'][_0x1469ff(0x37b)](VisuMZ[_0x1469ff(0x585)][_0x1469ff(0x268)][_0x1469ff(0x619)][_0x378b11])){var _0x8470de=Number(RegExp['$1']);_0x5c2554*=_0x8470de;}if(_0x53220e[_0x1469ff(0x24a)]['match'](VisuMZ[_0x1469ff(0x585)][_0x1469ff(0x268)][_0x1469ff(0x6ec)][_0x378b11])){var _0x100312=String(RegExp['$1']);_0x100312=VisuMZ[_0x1469ff(0x585)][_0x1469ff(0x416)](_0x100312);try{_0x5c2554*=eval(_0x100312);}catch(_0x3e4d04){if($gameTemp[_0x1469ff(0x75a)]())console[_0x1469ff(0x615)](_0x3e4d04);}}return _0x5c2554;};return this[_0x31774c(0x31e)]()[_0x31774c(0x18d)](_0x4697b3,_0x9c5ee8);},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x421)]=function(_0x21f679){const _0xb5bbfc=_0x5af19b,_0x4e8450=(_0x181909,_0x1c3d53)=>{const _0x228e4b=_0x4b94;if(!_0x1c3d53)return _0x181909;if(_0x1c3d53[_0x228e4b(0x24a)]['match'](VisuMZ[_0x228e4b(0x585)][_0x228e4b(0x268)]['paramFlat'][_0x21f679])){var _0x3f5707=Number(RegExp['$1']);_0x181909+=_0x3f5707;}if(_0x1c3d53[_0x228e4b(0x24a)][_0x228e4b(0x37b)](VisuMZ['CoreEngine'][_0x228e4b(0x268)][_0x228e4b(0x4ba)][_0x21f679])){var _0x1f374c=String(RegExp['$1']);_0x1f374c=VisuMZ[_0x228e4b(0x585)][_0x228e4b(0x416)](_0x1f374c);try{_0x181909+=eval(_0x1f374c);}catch(_0x51e41c){if($gameTemp[_0x228e4b(0x75a)]())console['log'](_0x51e41c);}}return _0x181909;};return this[_0xb5bbfc(0x31e)]()['reduce'](_0x4e8450,0x0);},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x22b)]=function(_0x4deb85){const _0x1060e3=_0x5af19b;let _0x5832cb=_0x1060e3(0x22b)+_0x4deb85+'Total';if(this[_0x1060e3(0x7a2)](_0x5832cb))return this[_0x1060e3(0x800)][_0x5832cb];return this['_cache'][_0x5832cb]=Math[_0x1060e3(0x548)](VisuMZ[_0x1060e3(0x585)][_0x1060e3(0x47e)][_0x1060e3(0x61e)][_0x1060e3(0x70f)]['call'](this,_0x4deb85)),this['_cache'][_0x5832cb];},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x23d)]=function(_0x479ffd){const _0x26382a=_0x5af19b,_0x423b08=(_0x376c1b,_0x197010)=>{const _0x2e01eb=_0x4b94;if(!_0x197010)return _0x376c1b;if(_0x197010[_0x2e01eb(0x24a)][_0x2e01eb(0x37b)](VisuMZ[_0x2e01eb(0x585)][_0x2e01eb(0x268)][_0x2e01eb(0x758)][_0x479ffd])){var _0x4eb425=Number(RegExp['$1'])/0x64;_0x376c1b+=_0x4eb425;}if(_0x197010[_0x2e01eb(0x24a)][_0x2e01eb(0x37b)](VisuMZ[_0x2e01eb(0x585)][_0x2e01eb(0x268)][_0x2e01eb(0x875)][_0x479ffd])){var _0x4eb425=Number(RegExp['$1']);_0x376c1b+=_0x4eb425;}if(_0x197010[_0x2e01eb(0x24a)][_0x2e01eb(0x37b)](VisuMZ[_0x2e01eb(0x585)][_0x2e01eb(0x268)]['xparamPlusJS'][_0x479ffd])){var _0x11fe76=String(RegExp['$1']);_0x11fe76=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x11fe76);try{_0x376c1b+=eval(_0x11fe76);}catch(_0x4c7064){if($gameTemp[_0x2e01eb(0x75a)]())console[_0x2e01eb(0x615)](_0x4c7064);}}return _0x376c1b;};return this[_0x26382a(0x31e)]()[_0x26382a(0x18d)](_0x423b08,0x0);},Game_BattlerBase['prototype'][_0x5af19b(0x2f8)]=function(_0x44f731){const _0xf392d3=_0x5af19b,_0x3de408=(_0x4bc73e,_0x299b9c)=>{const _0x500df7=_0x4b94;if(!_0x299b9c)return _0x4bc73e;if(_0x299b9c['note'][_0x500df7(0x37b)](VisuMZ['CoreEngine'][_0x500df7(0x268)][_0x500df7(0x73b)][_0x44f731])){var _0x4e2e03=Number(RegExp['$1'])/0x64;_0x4bc73e*=_0x4e2e03;}if(_0x299b9c[_0x500df7(0x24a)][_0x500df7(0x37b)](VisuMZ[_0x500df7(0x585)][_0x500df7(0x268)][_0x500df7(0x6c9)][_0x44f731])){var _0x4e2e03=Number(RegExp['$1']);_0x4bc73e*=_0x4e2e03;}if(_0x299b9c[_0x500df7(0x24a)][_0x500df7(0x37b)](VisuMZ['CoreEngine']['RegExp'][_0x500df7(0x74b)][_0x44f731])){var _0x438123=String(RegExp['$1']);_0x438123=VisuMZ[_0x500df7(0x585)][_0x500df7(0x416)](_0x438123);try{_0x4bc73e*=eval(_0x438123);}catch(_0x5ab88f){if($gameTemp[_0x500df7(0x75a)]())console[_0x500df7(0x615)](_0x5ab88f);}}return _0x4bc73e;};return this[_0xf392d3(0x31e)]()[_0xf392d3(0x18d)](_0x3de408,0x1);},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x7d5)]=function(_0x14e3c4){const _0x5e8326=_0x5af19b,_0x3aba34=(_0x420020,_0x31d9bf)=>{const _0x53d022=_0x4b94;if(!_0x31d9bf)return _0x420020;if(_0x31d9bf[_0x53d022(0x24a)][_0x53d022(0x37b)](VisuMZ[_0x53d022(0x585)][_0x53d022(0x268)][_0x53d022(0x8e5)][_0x14e3c4])){var _0xfcd9da=Number(RegExp['$1'])/0x64;_0x420020+=_0xfcd9da;}if(_0x31d9bf['note'][_0x53d022(0x37b)](VisuMZ[_0x53d022(0x585)][_0x53d022(0x268)][_0x53d022(0x301)][_0x14e3c4])){var _0xfcd9da=Number(RegExp['$1']);_0x420020+=_0xfcd9da;}if(_0x31d9bf[_0x53d022(0x24a)][_0x53d022(0x37b)](VisuMZ[_0x53d022(0x585)][_0x53d022(0x268)]['xparamFlatJS'][_0x14e3c4])){var _0x2b6459=String(RegExp['$1']);_0x2b6459=VisuMZ[_0x53d022(0x585)][_0x53d022(0x416)](_0x2b6459);try{_0x420020+=eval(_0x2b6459);}catch(_0x2ff218){if($gameTemp['isPlaytest']())console[_0x53d022(0x615)](_0x2ff218);}}return _0x420020;};return this[_0x5e8326(0x31e)]()[_0x5e8326(0x18d)](_0x3aba34,0x0);},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x429)]=function(_0x53e35b){const _0x37e965=_0x5af19b;let _0x161712='xparam'+_0x53e35b+_0x37e965(0x6ef);if(this[_0x37e965(0x7a2)](_0x161712))return this[_0x37e965(0x800)][_0x161712];return this['_cache'][_0x161712]=VisuMZ[_0x37e965(0x585)][_0x37e965(0x47e)][_0x37e965(0x61e)]['XParameterFormula'][_0x37e965(0x535)](this,_0x53e35b),this[_0x37e965(0x800)][_0x161712];},Game_BattlerBase[_0x5af19b(0x397)]['sparamPlus']=function(_0x1c48f4){const _0x590f81=_0x5af19b,_0x248957=(_0x5f36e5,_0x3f04e9)=>{const _0xb1188a=_0x4b94;if(!_0x3f04e9)return _0x5f36e5;if(_0x3f04e9[_0xb1188a(0x24a)]['match'](VisuMZ[_0xb1188a(0x585)][_0xb1188a(0x268)][_0xb1188a(0x557)][_0x1c48f4])){var _0x18bb48=Number(RegExp['$1'])/0x64;_0x5f36e5+=_0x18bb48;}if(_0x3f04e9[_0xb1188a(0x24a)]['match'](VisuMZ[_0xb1188a(0x585)]['RegExp']['sparamPlus2'][_0x1c48f4])){var _0x18bb48=Number(RegExp['$1']);_0x5f36e5+=_0x18bb48;}if(_0x3f04e9[_0xb1188a(0x24a)][_0xb1188a(0x37b)](VisuMZ[_0xb1188a(0x585)][_0xb1188a(0x268)][_0xb1188a(0x2c8)][_0x1c48f4])){var _0x4c65bb=String(RegExp['$1']);_0x4c65bb=VisuMZ[_0xb1188a(0x585)][_0xb1188a(0x416)](_0x4c65bb);try{_0x5f36e5+=eval(_0x4c65bb);}catch(_0x247add){if($gameTemp['isPlaytest']())console['log'](_0x247add);}}return _0x5f36e5;};return this[_0x590f81(0x31e)]()['reduce'](_0x248957,0x0);},Game_BattlerBase[_0x5af19b(0x397)]['sparamRate']=function(_0x475118){const _0x4383d1=_0x5af19b,_0x560ba6=(_0x3e7efb,_0xe08e24)=>{const _0x53a689=_0x4b94;if(!_0xe08e24)return _0x3e7efb;if(_0xe08e24[_0x53a689(0x24a)][_0x53a689(0x37b)](VisuMZ[_0x53a689(0x585)]['RegExp'][_0x53a689(0x487)][_0x475118])){var _0x4c8976=Number(RegExp['$1'])/0x64;_0x3e7efb*=_0x4c8976;}if(_0xe08e24[_0x53a689(0x24a)][_0x53a689(0x37b)](VisuMZ[_0x53a689(0x585)][_0x53a689(0x268)][_0x53a689(0x326)][_0x475118])){var _0x4c8976=Number(RegExp['$1']);_0x3e7efb*=_0x4c8976;}if(_0xe08e24[_0x53a689(0x24a)]['match'](VisuMZ['CoreEngine'][_0x53a689(0x268)][_0x53a689(0x4b2)][_0x475118])){var _0x2d05ae=String(RegExp['$1']);_0x2d05ae=VisuMZ[_0x53a689(0x585)][_0x53a689(0x416)](_0x2d05ae);try{_0x3e7efb*=eval(_0x2d05ae);}catch(_0x467172){if($gameTemp[_0x53a689(0x75a)]())console[_0x53a689(0x615)](_0x467172);}}return _0x3e7efb;};return this[_0x4383d1(0x31e)]()['reduce'](_0x560ba6,0x1);},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x1fe)]=function(_0x19f8c5){const _0x3ef99=_0x5af19b,_0x18d877=(_0x16ff02,_0x251119)=>{const _0x1e16b6=_0x4b94;if(!_0x251119)return _0x16ff02;if(_0x251119[_0x1e16b6(0x24a)][_0x1e16b6(0x37b)](VisuMZ[_0x1e16b6(0x585)]['RegExp'][_0x1e16b6(0x8b3)][_0x19f8c5])){var _0x11eba9=Number(RegExp['$1'])/0x64;_0x16ff02+=_0x11eba9;}if(_0x251119[_0x1e16b6(0x24a)][_0x1e16b6(0x37b)](VisuMZ['CoreEngine']['RegExp'][_0x1e16b6(0x56a)][_0x19f8c5])){var _0x11eba9=Number(RegExp['$1']);_0x16ff02+=_0x11eba9;}if(_0x251119[_0x1e16b6(0x24a)]['match'](VisuMZ['CoreEngine'][_0x1e16b6(0x268)][_0x1e16b6(0x480)][_0x19f8c5])){var _0x2c6f69=String(RegExp['$1']);_0x2c6f69=VisuMZ[_0x1e16b6(0x585)]['JsReplaceUserVar'](_0x2c6f69);try{_0x16ff02+=eval(_0x2c6f69);}catch(_0x9604da){if($gameTemp[_0x1e16b6(0x75a)]())console[_0x1e16b6(0x615)](_0x9604da);}}return _0x16ff02;};return this[_0x3ef99(0x31e)]()['reduce'](_0x18d877,0x0);},Game_BattlerBase[_0x5af19b(0x397)][_0x5af19b(0x42e)]=function(_0x1b8643){const _0x4752e7=_0x5af19b;let _0x307c13='sparam'+_0x1b8643+'Total';if(this[_0x4752e7(0x7a2)](_0x307c13))return this[_0x4752e7(0x800)][_0x307c13];return this['_cache'][_0x307c13]=VisuMZ['CoreEngine']['Settings']['Param'][_0x4752e7(0x31f)][_0x4752e7(0x535)](this,_0x1b8643),this[_0x4752e7(0x800)][_0x307c13];},Game_BattlerBase['prototype'][_0x5af19b(0x509)]=function(_0x565a26,_0x3cc7c5){const _0x211cbd=_0x5af19b;if(typeof paramId===_0x211cbd(0x54a))return this[_0x211cbd(0x22b)](_0x565a26);_0x565a26=String(_0x565a26||'')['toUpperCase']();if(_0x565a26===_0x211cbd(0x676))return this[_0x211cbd(0x22b)](0x0);if(_0x565a26==='MAXMP')return this['param'](0x1);if(_0x565a26==='ATK')return this[_0x211cbd(0x22b)](0x2);if(_0x565a26===_0x211cbd(0x794))return this[_0x211cbd(0x22b)](0x3);if(_0x565a26===_0x211cbd(0x5c4))return this[_0x211cbd(0x22b)](0x4);if(_0x565a26===_0x211cbd(0x2d8))return this['param'](0x5);if(_0x565a26===_0x211cbd(0x168))return this[_0x211cbd(0x22b)](0x6);if(_0x565a26===_0x211cbd(0x5e3))return this[_0x211cbd(0x22b)](0x7);if(_0x565a26===_0x211cbd(0x835))return _0x3cc7c5?String(Math['round'](this[_0x211cbd(0x429)](0x0)*0x64))+'%':this[_0x211cbd(0x429)](0x0);if(_0x565a26==='EVA')return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this['xparam'](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x565a26==='CRI')return _0x3cc7c5?String(Math['round'](this['xparam'](0x2)*0x64))+'%':this[_0x211cbd(0x429)](0x2);if(_0x565a26===_0x211cbd(0x205))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x429)](0x3)*0x64))+'%':this[_0x211cbd(0x429)](0x3);if(_0x565a26===_0x211cbd(0x3de))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this['xparam'](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x565a26==='MRF')return _0x3cc7c5?String(Math['round'](this['xparam'](0x5)*0x64))+'%':this[_0x211cbd(0x429)](0x5);if(_0x565a26===_0x211cbd(0x3b3))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x429)](0x6)*0x64))+'%':this[_0x211cbd(0x429)](0x6);if(_0x565a26===_0x211cbd(0x437))return _0x3cc7c5?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0x211cbd(0x429)](0x7);if(_0x565a26===_0x211cbd(0x8c7))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x429)](0x8)*0x64))+'%':this[_0x211cbd(0x429)](0x8);if(_0x565a26==='TRG')return _0x3cc7c5?String(Math['round'](this[_0x211cbd(0x429)](0x9)*0x64))+'%':this[_0x211cbd(0x429)](0x9);if(_0x565a26==='TGR')return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x42e)](0x0)*0x64))+'%':this[_0x211cbd(0x42e)](0x0);if(_0x565a26===_0x211cbd(0x6f1))return _0x3cc7c5?String(Math['round'](this[_0x211cbd(0x42e)](0x1)*0x64))+'%':this[_0x211cbd(0x42e)](0x1);if(_0x565a26===_0x211cbd(0x705))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this['sparam'](0x2)*0x64))+'%':this[_0x211cbd(0x42e)](0x2);if(_0x565a26===_0x211cbd(0x3c3))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this['sparam'](0x3)*0x64))+'%':this[_0x211cbd(0x42e)](0x3);if(_0x565a26===_0x211cbd(0x89f))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x42e)](0x4)*0x64))+'%':this[_0x211cbd(0x42e)](0x4);if(_0x565a26==='TCR')return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x42e)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x565a26===_0x211cbd(0x28d))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x42e)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x565a26===_0x211cbd(0x3b2))return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this['sparam'](0x7)*0x64))+'%':this[_0x211cbd(0x42e)](0x7);if(_0x565a26==='FDR')return _0x3cc7c5?String(Math[_0x211cbd(0x548)](this[_0x211cbd(0x42e)](0x8)*0x64))+'%':this[_0x211cbd(0x42e)](0x8);if(_0x565a26===_0x211cbd(0x26a))return _0x3cc7c5?String(Math['round'](this[_0x211cbd(0x42e)](0x9)*0x64))+'%':this[_0x211cbd(0x42e)](0x9);if(VisuMZ['CoreEngine'][_0x211cbd(0x6f6)][_0x565a26]){const _0x242b0b=VisuMZ[_0x211cbd(0x585)][_0x211cbd(0x6f6)][_0x565a26],_0xce5bd6=this[_0x242b0b];return VisuMZ['CoreEngine']['CustomParamType'][_0x565a26]===_0x211cbd(0x6be)?_0xce5bd6:_0x3cc7c5?String(Math[_0x211cbd(0x548)](_0xce5bd6*0x64))+'%':_0xce5bd6;}return'';},Game_BattlerBase[_0x5af19b(0x397)]['isDying']=function(){const _0x438347=_0x5af19b;return this[_0x438347(0x603)]()&&this[_0x438347(0x673)]<this[_0x438347(0x7fb)]*VisuMZ[_0x438347(0x585)][_0x438347(0x47e)]['Param'][_0x438347(0x883)];},Game_Battler['prototype'][_0x5af19b(0x594)]=function(){const _0x56020c=_0x5af19b;SoundManager[_0x56020c(0x48f)](),this[_0x56020c(0x446)]('evade');},VisuMZ['CoreEngine'][_0x5af19b(0x864)]=Game_Actor[_0x5af19b(0x397)][_0x5af19b(0x3c8)],Game_Actor['prototype'][_0x5af19b(0x3c8)]=function(_0xe84c5){const _0x2b9086=_0x5af19b;if(this[_0x2b9086(0x2f3)]>0x63)return this[_0x2b9086(0x335)](_0xe84c5);return VisuMZ[_0x2b9086(0x585)][_0x2b9086(0x864)][_0x2b9086(0x535)](this,_0xe84c5);},Game_Actor['prototype'][_0x5af19b(0x335)]=function(_0x5728c3){const _0xecd921=_0x5af19b,_0x4f6876=this[_0xecd921(0x658)]()[_0xecd921(0x28c)][_0x5728c3][0x63],_0x3b39ee=this[_0xecd921(0x658)]()[_0xecd921(0x28c)][_0x5728c3][0x62];return _0x4f6876+(_0x4f6876-_0x3b39ee)*(this[_0xecd921(0x2f3)]-0x63);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x927)]=Game_Actor[_0x5af19b(0x397)][_0x5af19b(0x7e4)],Game_Actor[_0x5af19b(0x397)]['changeClass']=function(_0x2456c1,_0x4db3e7){const _0x4987c5=_0x5af19b;$gameTemp[_0x4987c5(0x72a)]=!![],VisuMZ[_0x4987c5(0x585)][_0x4987c5(0x927)][_0x4987c5(0x535)](this,_0x2456c1,_0x4db3e7),$gameTemp[_0x4987c5(0x72a)]=undefined;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x311)]=Game_Actor[_0x5af19b(0x397)][_0x5af19b(0x476)],Game_Actor['prototype'][_0x5af19b(0x476)]=function(){const _0xabdb6b=_0x5af19b;VisuMZ[_0xabdb6b(0x585)][_0xabdb6b(0x311)][_0xabdb6b(0x535)](this);if(!$gameTemp[_0xabdb6b(0x72a)])this[_0xabdb6b(0x532)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x498ab0=_0x5af19b;this[_0x498ab0(0x800)]={};if(VisuMZ[_0x498ab0(0x585)][_0x498ab0(0x47e)][_0x498ab0(0x2cf)][_0x498ab0(0x848)])this[_0x498ab0(0x673)]=this[_0x498ab0(0x7fb)];if(VisuMZ[_0x498ab0(0x585)][_0x498ab0(0x47e)][_0x498ab0(0x2cf)][_0x498ab0(0x810)])this[_0x498ab0(0x885)]=this['mmp'];},Game_Actor[_0x5af19b(0x397)][_0x5af19b(0x317)]=function(){const _0x181519=_0x5af19b;if(this['isMaxLevel']())return 0x1;const _0x4bb716=this['nextLevelExp']()-this[_0x181519(0x911)](),_0x2196c1=this[_0x181519(0x4e3)]()-this[_0x181519(0x911)]();return(_0x2196c1/_0x4bb716)[_0x181519(0x767)](0x0,0x1);},Game_Actor[_0x5af19b(0x397)][_0x5af19b(0x31e)]=function(){const _0x4fdda4=_0x5af19b,_0x5b9f94=Game_Battler[_0x4fdda4(0x397)]['traitObjects'][_0x4fdda4(0x535)](this);for(const _0x21d4bd of this[_0x4fdda4(0x3aa)]()){_0x21d4bd&&_0x5b9f94[_0x4fdda4(0x3a5)](_0x21d4bd);}return _0x5b9f94[_0x4fdda4(0x3a5)](this[_0x4fdda4(0x658)](),this[_0x4fdda4(0x6bf)]()),_0x5b9f94;},VisuMZ[_0x5af19b(0x585)]['Game_Actor_isPreserveTp']=Game_Actor[_0x5af19b(0x397)][_0x5af19b(0x2b6)],Game_Actor['prototype'][_0x5af19b(0x2b6)]=function(){const _0x3a5b34=_0x5af19b;if(!$gameParty[_0x3a5b34(0x352)]())return!![];return VisuMZ[_0x3a5b34(0x585)][_0x3a5b34(0x253)][_0x3a5b34(0x535)](this);},VisuMZ['CoreEngine'][_0x5af19b(0x903)]=Game_Unit['prototype'][_0x5af19b(0x728)],Game_Unit[_0x5af19b(0x397)][_0x5af19b(0x728)]=function(_0x27e0e2){const _0x20ea87=_0x5af19b;this[_0x20ea87(0x7da)]=!![],VisuMZ[_0x20ea87(0x585)][_0x20ea87(0x903)][_0x20ea87(0x535)](this,_0x27e0e2);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4bb)]=Game_Unit[_0x5af19b(0x397)][_0x5af19b(0x93c)],Game_Unit['prototype'][_0x5af19b(0x93c)]=function(){const _0x324afb=_0x5af19b;for(const _0x10d290 of this[_0x324afb(0x8f9)]()){_0x10d290&&!_0x10d290[_0x324afb(0x2b6)]()&&_0x10d290[_0x324afb(0x5de)]();}VisuMZ[_0x324afb(0x585)]['Game_Unit_onBattleEnd'][_0x324afb(0x535)](this);},Object[_0x5af19b(0x340)](Game_Enemy[_0x5af19b(0x397)],_0x5af19b(0x2f3),{'get':function(){const _0x2dcc58=_0x5af19b;return this[_0x2dcc58(0x82c)]();},'configurable':!![]}),Game_Enemy[_0x5af19b(0x397)][_0x5af19b(0x82c)]=function(){const _0x51010b=_0x5af19b;return this[_0x51010b(0x525)]()[_0x51010b(0x2f3)];},Game_Enemy[_0x5af19b(0x397)][_0x5af19b(0x716)]=function(){const _0xacdda5=_0x5af19b;!this[_0xacdda5(0x762)]&&(this[_0xacdda5(0x8cd)]+=Math['round']((Graphics['height']-0x270)/0x2),this[_0xacdda5(0x8cd)]-=Math[_0xacdda5(0x1eb)]((Graphics[_0xacdda5(0x7ff)]-Graphics[_0xacdda5(0x454)])/0x2),$gameSystem['isSideView']()?this[_0xacdda5(0x26c)]-=Math[_0xacdda5(0x1eb)]((Graphics[_0xacdda5(0x3fc)]-Graphics[_0xacdda5(0x6de)])/0x2):this[_0xacdda5(0x26c)]+=Math[_0xacdda5(0x548)]((Graphics[_0xacdda5(0x6de)]-0x330)/0x2)),this[_0xacdda5(0x762)]=!![];},Game_Party[_0x5af19b(0x397)]['maxGold']=function(){const _0x134ed9=_0x5af19b;return VisuMZ[_0x134ed9(0x585)][_0x134ed9(0x47e)][_0x134ed9(0x67a)]['GoldMax'];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x400)]=Game_Party[_0x5af19b(0x397)][_0x5af19b(0x413)],Game_Party[_0x5af19b(0x397)][_0x5af19b(0x413)]=function(_0x546f0f){const _0x321c47=_0x5af19b;if(VisuMZ[_0x321c47(0x585)]['Settings'][_0x321c47(0x2cf)][_0x321c47(0x281)]&&DataManager[_0x321c47(0x1b6)](_0x546f0f))return;VisuMZ[_0x321c47(0x585)][_0x321c47(0x400)][_0x321c47(0x535)](this,_0x546f0f);},Game_Party[_0x5af19b(0x397)][_0x5af19b(0x4b6)]=function(){const _0x41200e=_0x5af19b,_0x44afab=VisuMZ[_0x41200e(0x585)][_0x41200e(0x47e)][_0x41200e(0x2cf)],_0x2c0ad7=_0x44afab[_0x41200e(0x20a)]??0x63;let _0x26ccee=[];(_0x44afab[_0x41200e(0x250)]??!![])&&(_0x26ccee=_0x26ccee[_0x41200e(0x6ad)]($dataItems));(_0x44afab[_0x41200e(0x8d9)]??!![])&&(_0x26ccee=_0x26ccee['concat']($dataWeapons));(_0x44afab[_0x41200e(0x498)]??!![])&&(_0x26ccee=_0x26ccee[_0x41200e(0x6ad)]($dataArmors));for(const _0x8062d9 of _0x26ccee){if(!_0x8062d9)continue;if(_0x8062d9['name'][_0x41200e(0x254)]()<=0x0)continue;if(_0x8062d9[_0x41200e(0x678)]['match'](/-----/i))continue;this[_0x41200e(0x845)](_0x8062d9,_0x2c0ad7);}},VisuMZ[_0x5af19b(0x585)]['Game_Troop_setup']=Game_Troop['prototype'][_0x5af19b(0x510)],Game_Troop[_0x5af19b(0x397)][_0x5af19b(0x510)]=function(_0x5c4f78){const _0x442d51=_0x5af19b;$gameTemp[_0x442d51(0x1f5)](),$gameTemp[_0x442d51(0x42d)](_0x5c4f78),VisuMZ[_0x442d51(0x585)][_0x442d51(0x799)][_0x442d51(0x535)](this,_0x5c4f78);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x869)]=Game_Map[_0x5af19b(0x397)]['setup'],Game_Map[_0x5af19b(0x397)][_0x5af19b(0x510)]=function(_0x5cb183){const _0x587da2=_0x5af19b;VisuMZ['CoreEngine'][_0x587da2(0x869)][_0x587da2(0x535)](this,_0x5cb183),this[_0x587da2(0x3ba)](),this['setupCoreEngine'](_0x5cb183),this[_0x587da2(0x51b)]();},Game_Map['prototype'][_0x5af19b(0x64c)]=function(){const _0x1b5e80=_0x5af19b;this[_0x1b5e80(0x278)]=VisuMZ[_0x1b5e80(0x585)][_0x1b5e80(0x47e)][_0x1b5e80(0x2cf)]['NoTileShadows']||![];const _0x59ff5f=VisuMZ['CoreEngine'][_0x1b5e80(0x47e)][_0x1b5e80(0x78d)],_0x2d650f=$dataMap?$dataMap[_0x1b5e80(0x24a)]||'':'';if(_0x2d650f[_0x1b5e80(0x37b)](/<SHOW TILE SHADOWS>/i))this[_0x1b5e80(0x278)]=![];else _0x2d650f[_0x1b5e80(0x37b)](/<HIDE TILE SHADOWS>/i)&&(this[_0x1b5e80(0x278)]=!![]);if(_0x2d650f[_0x1b5e80(0x37b)](/<SCROLL LOCK X>/i))this[_0x1b5e80(0x46f)]()[_0x1b5e80(0x915)]=!![],this[_0x1b5e80(0x46f)]()[_0x1b5e80(0x44e)]=_0x59ff5f[_0x1b5e80(0x6df)];else _0x2d650f[_0x1b5e80(0x37b)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x1b5e80(0x46f)]()['centerX']=!![],this[_0x1b5e80(0x46f)]()[_0x1b5e80(0x44e)]=Number(RegExp['$1']));if(_0x2d650f[_0x1b5e80(0x37b)](/<SCROLL LOCK Y>/i))this[_0x1b5e80(0x46f)]()['centerY']=!![],this[_0x1b5e80(0x46f)]()[_0x1b5e80(0x7c5)]=_0x59ff5f[_0x1b5e80(0x5d6)];else _0x2d650f[_0x1b5e80(0x37b)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x1b5e80(0x46f)]()[_0x1b5e80(0x286)]=!![],this[_0x1b5e80(0x46f)]()['displayY']=Number(RegExp['$1']));},Game_Map[_0x5af19b(0x397)][_0x5af19b(0x20d)]=function(){const _0xcc1ea3=_0x5af19b;if(this[_0xcc1ea3(0x278)]===undefined)this[_0xcc1ea3(0x64c)]();return this[_0xcc1ea3(0x278)];},Game_Map[_0x5af19b(0x397)][_0x5af19b(0x3ba)]=function(){const _0x4edca9=_0x5af19b,_0x432445=VisuMZ[_0x4edca9(0x585)][_0x4edca9(0x47e)]['ScreenResolution'];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x432445['AutoScrollLockX']){const _0x535df7=Graphics['width']/this['tileWidth']();_0x535df7%0x1!==0x0&&Math[_0x4edca9(0x592)](_0x535df7)===this[_0x4edca9(0x3fc)]()&&!this[_0x4edca9(0x876)]()&&(this[_0x4edca9(0x26b)][_0x4edca9(0x915)]=!![],this[_0x4edca9(0x26b)][_0x4edca9(0x44e)]=_0x432445[_0x4edca9(0x6df)]||0x0);}if(_0x432445[_0x4edca9(0x4a3)]){const _0x2c5bca=Graphics[_0x4edca9(0x7ff)]/this[_0x4edca9(0x22e)]();_0x2c5bca%0x1!==0x0&&Math[_0x4edca9(0x592)](_0x2c5bca)===this[_0x4edca9(0x7ff)]()&&!this[_0x4edca9(0x833)]()&&(this[_0x4edca9(0x26b)][_0x4edca9(0x286)]=!![],this[_0x4edca9(0x26b)][_0x4edca9(0x7c5)]=_0x432445[_0x4edca9(0x5d6)]||0x0);}$gameScreen['zoomScale']()===0x1&&(this[_0x4edca9(0x46f)]()[_0x4edca9(0x915)]&&(this[_0x4edca9(0x3da)]=this[_0x4edca9(0x46f)]()[_0x4edca9(0x44e)]),this[_0x4edca9(0x46f)]()[_0x4edca9(0x286)]&&(this[_0x4edca9(0x520)]=this[_0x4edca9(0x46f)]()[_0x4edca9(0x7c5)]));},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x161)]=Game_Map[_0x5af19b(0x397)][_0x5af19b(0x59b)],Game_Map[_0x5af19b(0x397)][_0x5af19b(0x59b)]=function(_0x18d006,_0x9e8369){const _0x90353a=_0x5af19b;VisuMZ[_0x90353a(0x585)][_0x90353a(0x161)][_0x90353a(0x535)](this,_0x18d006,_0x9e8369),$gameScreen[_0x90353a(0x5a6)]()===0x1&&(!this['isLoopHorizontal']()&&this['centerCameraCheckData']()[_0x90353a(0x915)]&&(this[_0x90353a(0x3da)]=this[_0x90353a(0x46f)]()['displayX']),!this[_0x90353a(0x833)]()&&this[_0x90353a(0x46f)]()[_0x90353a(0x286)]&&(this['_displayY']=this[_0x90353a(0x46f)]()[_0x90353a(0x7c5)]));},Game_Map[_0x5af19b(0x397)]['centerCameraCheckData']=function(){const _0xfdd037=_0x5af19b;if(this[_0xfdd037(0x26b)]===undefined)this['checkCoreEngineDisplayCenter']();return this[_0xfdd037(0x26b)];},VisuMZ[_0x5af19b(0x585)]['Game_Map_scrollDown']=Game_Map[_0x5af19b(0x397)][_0x5af19b(0x356)],Game_Map[_0x5af19b(0x397)][_0x5af19b(0x356)]=function(_0x4a5024){const _0xaa3051=_0x5af19b;if(this[_0xaa3051(0x46f)]()[_0xaa3051(0x286)]&&$gameScreen[_0xaa3051(0x5a6)]()===0x1){this['_displayY']=this[_0xaa3051(0x46f)]()[_0xaa3051(0x7c5)];return;}VisuMZ[_0xaa3051(0x585)][_0xaa3051(0x321)][_0xaa3051(0x535)](this,_0x4a5024);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4d2)]=Game_Map[_0x5af19b(0x397)][_0x5af19b(0x8b0)],Game_Map[_0x5af19b(0x397)]['scrollLeft']=function(_0x152084){const _0x3b420d=_0x5af19b;if(this[_0x3b420d(0x46f)]()['centerX']&&$gameScreen[_0x3b420d(0x5a6)]()===0x1){this[_0x3b420d(0x3da)]=this[_0x3b420d(0x46f)]()[_0x3b420d(0x44e)];return;}VisuMZ[_0x3b420d(0x585)][_0x3b420d(0x4d2)][_0x3b420d(0x535)](this,_0x152084);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4e6)]=Game_Map[_0x5af19b(0x397)][_0x5af19b(0x5e2)],Game_Map[_0x5af19b(0x397)][_0x5af19b(0x5e2)]=function(_0x588567){const _0x22cccc=_0x5af19b;if(this[_0x22cccc(0x46f)]()[_0x22cccc(0x915)]&&$gameScreen[_0x22cccc(0x5a6)]()===0x1){this[_0x22cccc(0x3da)]=this[_0x22cccc(0x46f)]()[_0x22cccc(0x44e)];return;}VisuMZ[_0x22cccc(0x585)][_0x22cccc(0x4e6)][_0x22cccc(0x535)](this,_0x588567);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x589)]=Game_Map[_0x5af19b(0x397)][_0x5af19b(0x2b5)],Game_Map[_0x5af19b(0x397)][_0x5af19b(0x2b5)]=function(_0x458493){const _0x5d3194=_0x5af19b;if(this['centerCameraCheckData']()[_0x5d3194(0x286)]&&$gameScreen[_0x5d3194(0x5a6)]()===0x1){this[_0x5d3194(0x520)]=this[_0x5d3194(0x46f)]()[_0x5d3194(0x7c5)];return;}VisuMZ[_0x5d3194(0x585)]['Game_Map_scrollUp']['call'](this,_0x458493);},Game_Map[_0x5af19b(0x397)][_0x5af19b(0x51b)]=function(){const _0x4b980f=_0x5af19b;this[_0x4b980f(0x4c1)]={};const _0x12cdb8=this[_0x4b980f(0x15b)]();if(!_0x12cdb8)return{};const _0x2e280=_0x12cdb8[_0x4b980f(0x24a)]||'',_0xd5e1cd=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0xaeff36={};const _0x29bf7a=_0x2e280[_0x4b980f(0x37b)](_0xd5e1cd);if(_0x29bf7a)for(const _0x35ab5d of _0x29bf7a){_0x35ab5d[_0x4b980f(0x37b)](_0xd5e1cd);const _0x2b19af=Number(RegExp['$1'])[_0x4b980f(0x767)](0x1,0x10),_0x479d23=String(RegExp['$2'])[_0x4b980f(0x644)](',')['map'](_0x22460f=>Number(_0x22460f)[_0x4b980f(0x767)](0x1,0x7));for(const _0x50b058 of _0x479d23){_0xaeff36[_0x50b058]=_0x2b19af;}}this[_0x4b980f(0x4c1)]=_0xaeff36;},Game_Map[_0x5af19b(0x397)][_0x5af19b(0x734)]=function(){const _0x4517ca=_0x5af19b;if(this[_0x4517ca(0x4c1)]===undefined)this[_0x4517ca(0x51b)]();return this[_0x4517ca(0x4c1)];},Game_Map['prototype'][_0x5af19b(0x6c4)]=function(_0x5775d4){const _0x246992=_0x5af19b;if(_0x5775d4>=0x400)return![];const _0x342be7=$gameMap[_0x246992(0x734)]();if(Object[_0x246992(0x200)](_0x342be7)[_0x246992(0x35d)]<=0x0)return![];const _0x22bf1a=this['tilesetFlags'](),_0xe31982=_0x22bf1a[_0x5775d4]>>0xc,_0x22f266=_0x342be7[_0xe31982]||0x0;return _0x22f266>0x0;},VisuMZ['CoreEngine'][_0x5af19b(0x684)]=Game_Map[_0x5af19b(0x397)][_0x5af19b(0x640)],Game_Map['prototype'][_0x5af19b(0x640)]=function(_0x465bd8){const _0x156bd9=_0x5af19b;VisuMZ[_0x156bd9(0x585)]['Game_Map_changeTileset'][_0x156bd9(0x535)](this,_0x465bd8),this[_0x156bd9(0x5ee)](),SceneManager[_0x156bd9(0x4ff)][_0x156bd9(0x830)][_0x156bd9(0x556)]();},Game_Map[_0x5af19b(0x397)][_0x5af19b(0x5ee)]=function(){const _0x2b066c=_0x5af19b,_0x4287ee=this[_0x2b066c(0x734)]();if(Object[_0x2b066c(0x200)](_0x4287ee)['length']<=0x0)return;const _0xfd5837=SceneManager[_0x2b066c(0x4ff)][_0x2b066c(0x830)];_0xfd5837&&(_0xfd5837[_0x2b066c(0x47f)]&&_0xfd5837['removeTileExtendSprites'](),_0xfd5837['createTileExtendSprites']&&_0xfd5837[_0x2b066c(0x7a6)]());},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4e8)]=Game_Character[_0x5af19b(0x397)][_0x5af19b(0x2ca)],Game_Character[_0x5af19b(0x397)]['processMoveCommand']=function(_0x3d9584){const _0xf06dac=_0x5af19b;try{VisuMZ['CoreEngine'][_0xf06dac(0x4e8)][_0xf06dac(0x535)](this,_0x3d9584);}catch(_0x230fbb){if($gameTemp[_0xf06dac(0x75a)]())console[_0xf06dac(0x615)](_0x230fbb);}},Game_Player[_0x5af19b(0x397)][_0x5af19b(0x572)]=function(){const _0xc9d018=_0x5af19b,_0x51309b=$gameMap['encounterStep']();this[_0xc9d018(0x4dd)]=Math[_0xc9d018(0x49b)](_0x51309b)+Math[_0xc9d018(0x49b)](_0x51309b)+this['encounterStepsMinimum']();},Game_Player[_0x5af19b(0x397)]['encounterStepsMinimum']=function(){const _0x58645a=_0x5af19b;return $dataMap&&$dataMap[_0x58645a(0x24a)]&&$dataMap[_0x58645a(0x24a)][_0x58645a(0x37b)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x58645a(0x47e)][_0x58645a(0x2cf)][_0x58645a(0x365)];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x55f)]=Game_Event['prototype'][_0x5af19b(0x402)],Game_Event['prototype']['isCollidedWithEvents']=function(_0x1d5c57,_0x1ed9bd){const _0x20fe10=_0x5af19b;return this[_0x20fe10(0x546)]()?this[_0x20fe10(0x742)](_0x1d5c57,_0x1ed9bd):VisuMZ[_0x20fe10(0x585)]['Game_Event_isCollidedWithEvents'][_0x20fe10(0x535)](this,_0x1d5c57,_0x1ed9bd);},Game_Event['prototype'][_0x5af19b(0x546)]=function(){const _0x556742=_0x5af19b;return VisuMZ[_0x556742(0x585)][_0x556742(0x47e)][_0x556742(0x2cf)][_0x556742(0x731)];},Game_Event[_0x5af19b(0x397)][_0x5af19b(0x742)]=function(_0x30b4cb,_0x4927c6){const _0x3c1657=_0x5af19b;if(!this[_0x3c1657(0x29e)]())return![];else{const _0xf5909a=$gameMap[_0x3c1657(0x272)](_0x30b4cb,_0x4927c6)[_0x3c1657(0x4fc)](_0x70d3bb=>_0x70d3bb[_0x3c1657(0x29e)]());return _0xf5909a[_0x3c1657(0x35d)]>0x0;}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x1c4)]=Game_Interpreter[_0x5af19b(0x397)]['command105'],Game_Interpreter[_0x5af19b(0x397)][_0x5af19b(0x25b)]=function(_0x2ed026){const _0x15a8db=_0x5af19b,_0x35403f=this[_0x15a8db(0x72c)]();return _0x35403f['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x35403f):VisuMZ[_0x15a8db(0x585)][_0x15a8db(0x1c4)][_0x15a8db(0x535)](this,_0x2ed026);},Game_Interpreter[_0x5af19b(0x397)][_0x5af19b(0x72c)]=function(){const _0x25996e=_0x5af19b;let _0x30dda4='',_0x198ea5=this[_0x25996e(0x3e5)]+0x1;while(this['_list'][_0x198ea5]&&this[_0x25996e(0x821)][_0x198ea5][_0x25996e(0x5fb)]===0x195){_0x30dda4+=this['_list'][_0x198ea5][_0x25996e(0x533)][0x0]+'\x0a',_0x198ea5++;}return _0x30dda4;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x184111){const _0x234f48=_0x5af19b;try{eval(_0x184111);}catch(_0x4327be){$gameTemp[_0x234f48(0x75a)]()&&(console['log'](_0x234f48(0x7d7)),console['log'](_0x4327be));}return!![];},VisuMZ[_0x5af19b(0x585)]['Game_Interpreter_command111']=Game_Interpreter[_0x5af19b(0x397)][_0x5af19b(0x185)],Game_Interpreter['prototype']['command111']=function(_0xcd86ce){const _0x44cc55=_0x5af19b;try{VisuMZ[_0x44cc55(0x585)][_0x44cc55(0x35f)][_0x44cc55(0x535)](this,_0xcd86ce);}catch(_0x12ecaa){$gameTemp[_0x44cc55(0x75a)]()&&(console['log']('Conditional\x20Branch\x20Script\x20Error'),console[_0x44cc55(0x615)](_0x12ecaa)),this[_0x44cc55(0x8db)]();}return!![];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x57c)]=Game_Interpreter['prototype']['command122'],Game_Interpreter['prototype'][_0x5af19b(0x819)]=function(_0x1bd3e7){const _0x3c8417=_0x5af19b;try{VisuMZ[_0x3c8417(0x585)][_0x3c8417(0x57c)][_0x3c8417(0x535)](this,_0x1bd3e7);}catch(_0x5ad961){$gameTemp[_0x3c8417(0x75a)]()&&(console[_0x3c8417(0x615)](_0x3c8417(0x766)),console[_0x3c8417(0x615)](_0x5ad961));}return!![];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x829)]=Game_Interpreter[_0x5af19b(0x397)][_0x5af19b(0x1f1)],Game_Interpreter['prototype'][_0x5af19b(0x1f1)]=function(){const _0x15e828=_0x5af19b;try{VisuMZ[_0x15e828(0x585)]['Game_Interpreter_command355'][_0x15e828(0x535)](this);}catch(_0xcb447e){$gameTemp[_0x15e828(0x75a)]()&&(console[_0x15e828(0x615)](_0x15e828(0x64f)),console[_0x15e828(0x615)](_0xcb447e));}return!![];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x394)]=Game_Interpreter[_0x5af19b(0x397)][_0x5af19b(0x514)],Game_Interpreter[_0x5af19b(0x397)][_0x5af19b(0x514)]=function(_0x40f452){const _0x396d00=_0x5af19b;return $gameTemp[_0x396d00(0x942)](this),VisuMZ[_0x396d00(0x585)][_0x396d00(0x394)][_0x396d00(0x535)](this,_0x40f452);},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x75f)]=function(){const _0x51239f=_0x5af19b;return VisuMZ['CoreEngine'][_0x51239f(0x47e)]['UI'][_0x51239f(0x7bc)];},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x6a1)]=function(){const _0x551ac5=_0x5af19b;return VisuMZ[_0x551ac5(0x585)]['Settings']['UI'][_0x551ac5(0x14c)];},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x849)]=function(){const _0xc24377=_0x5af19b;return VisuMZ[_0xc24377(0x585)][_0xc24377(0x47e)]['UI'][_0xc24377(0x80c)];},Scene_Base[_0x5af19b(0x397)]['isRightInputMode']=function(){const _0x1138b7=_0x5af19b;return VisuMZ[_0x1138b7(0x585)]['Settings']['UI'][_0x1138b7(0x5cc)];},Scene_Base['prototype'][_0x5af19b(0x330)]=function(){const _0x17ba09=_0x5af19b;return VisuMZ[_0x17ba09(0x585)][_0x17ba09(0x47e)]['UI']['CommandWidth'];},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x7ae)]=function(){const _0x122aa7=_0x5af19b;return VisuMZ[_0x122aa7(0x585)][_0x122aa7(0x47e)]['UI'][_0x122aa7(0x5d1)];},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x1e9)]=function(){const _0x15c035=_0x5af19b;return VisuMZ[_0x15c035(0x585)][_0x15c035(0x47e)][_0x15c035(0x685)]['EnableMasking'];},VisuMZ[_0x5af19b(0x585)]['Scene_Base_createWindowLayer']=Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x1d7)],Scene_Base['prototype'][_0x5af19b(0x1d7)]=function(){const _0x5ca94d=_0x5af19b;VisuMZ[_0x5ca94d(0x585)]['Scene_Base_createWindowLayer']['call'](this),this[_0x5ca94d(0x6a3)](),this[_0x5ca94d(0x8ef)](),this['_windowLayer']['x']=Math[_0x5ca94d(0x548)](this['_windowLayer']['x']),this[_0x5ca94d(0x33f)]['y']=Math['round'](this[_0x5ca94d(0x33f)]['y']);},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x6a3)]=function(){},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x8ef)]=function(){const _0x1293a0=_0x5af19b;this[_0x1293a0(0x6dc)]=new Window_TextPopup(),this[_0x1293a0(0x73a)](this[_0x1293a0(0x6dc)]);},$textPopup=function(_0x4f1152){const _0xf9f15a=_0x5af19b,_0x295367=SceneManager[_0xf9f15a(0x4ff)][_0xf9f15a(0x6dc)];_0x295367&&_0x295367[_0xf9f15a(0x70a)](_0x4f1152);},Scene_Base[_0x5af19b(0x397)]['buttonAssistKey1']=function(){const _0x43c40c=_0x5af19b;return TextManager[_0x43c40c(0x2aa)](_0x43c40c(0x2a6),_0x43c40c(0x25f));},Scene_Base['prototype']['buttonAssistKey2']=function(){const _0x14d3a1=_0x5af19b;return TextManager['getInputButtonString'](_0x14d3a1(0x34b));},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x62a)]=function(){const _0x4da61e=_0x5af19b;return TextManager[_0x4da61e(0x5dd)](_0x4da61e(0x458));},Scene_Base['prototype'][_0x5af19b(0x2be)]=function(){const _0x3049e6=_0x5af19b;return TextManager[_0x3049e6(0x5dd)]('ok');},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x24f)]=function(){const _0x3d2ab5=_0x5af19b;return TextManager[_0x3d2ab5(0x5dd)]('cancel');},Scene_Base['prototype']['buttonAssistText1']=function(){const _0x144fbf=_0x5af19b;return this[_0x144fbf(0x414)]&&this[_0x144fbf(0x414)][_0x144fbf(0x87b)]?TextManager[_0x144fbf(0x318)]:'';},Scene_Base[_0x5af19b(0x397)]['buttonAssistText2']=function(){return'';},Scene_Base['prototype'][_0x5af19b(0x280)]=function(){return'';},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x5a7)]=function(){const _0x5b0140=_0x5af19b;return TextManager[_0x5b0140(0x5e6)];},Scene_Base[_0x5af19b(0x397)]['buttonAssistText5']=function(){const _0x12fb7c=_0x5af19b;return TextManager[_0x12fb7c(0x2b1)];},Scene_Base['prototype'][_0x5af19b(0x41f)]=function(){return 0x0;},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x69a)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x23a)]=function(){return 0x0;},Scene_Base[_0x5af19b(0x397)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x165)]=Scene_Boot['prototype']['loadSystemImages'],Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x2ea)]=function(){const _0x3ce02a=_0x5af19b;VisuMZ[_0x3ce02a(0x585)][_0x3ce02a(0x165)][_0x3ce02a(0x535)](this),this[_0x3ce02a(0x496)]();},Scene_Boot['prototype'][_0x5af19b(0x496)]=function(){const _0x5e7605=_0x5af19b,_0x557283=['animations',_0x5e7605(0x44b),_0x5e7605(0x332),_0x5e7605(0x92b),'enemies',_0x5e7605(0x7fa),'parallaxes','pictures','sv_actors',_0x5e7605(0x5cd),'system',_0x5e7605(0x405),_0x5e7605(0x740),_0x5e7605(0x4df)];for(const _0x3aee67 of _0x557283){const _0x5941a1=VisuMZ['CoreEngine'][_0x5e7605(0x47e)][_0x5e7605(0x8d7)][_0x3aee67],_0x23881d=_0x5e7605(0x39d)[_0x5e7605(0x8b9)](_0x3aee67);for(const _0xe9ccdb of _0x5941a1){ImageManager[_0x5e7605(0x37a)](_0x23881d,_0xe9ccdb);}}},VisuMZ['CoreEngine'][_0x5af19b(0x937)]=Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x77c)],Scene_Boot['prototype'][_0x5af19b(0x77c)]=function(){const _0x52c857=_0x5af19b;Utils[_0x52c857(0x393)]('test')&&VisuMZ['CoreEngine'][_0x52c857(0x47e)][_0x52c857(0x2cf)][_0x52c857(0x67e)]?this[_0x52c857(0x4a1)]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame']['call'](this);},Scene_Boot['prototype'][_0x5af19b(0x4a1)]=function(){const _0xe91c8c=_0x5af19b;this[_0xe91c8c(0x2f9)](),DataManager['setupNewGame'](),SceneManager[_0xe91c8c(0x2ce)](Scene_Map);},Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x8aa)]=function(){const _0x4a7066=_0x5af19b,_0x3b4ec4=$dataSystem[_0x4a7066(0x312)][_0x4a7066(0x249)],_0x251af1=$dataSystem[_0x4a7066(0x312)][_0x4a7066(0x53a)],_0x51b6f6=VisuMZ[_0x4a7066(0x585)]['Settings']['UI']['BoxMargin'];Graphics[_0x4a7066(0x6de)]=_0x3b4ec4-_0x51b6f6*0x2,Graphics[_0x4a7066(0x454)]=_0x251af1-_0x51b6f6*0x2,this[_0x4a7066(0x693)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x32e)]=Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x457)],Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x457)]=function(){const _0x399a6b=_0x5af19b;this[_0x399a6b(0x5eb)]()?this[_0x399a6b(0x8f1)]():VisuMZ[_0x399a6b(0x585)][_0x399a6b(0x32e)][_0x399a6b(0x535)](this);},Scene_Boot[_0x5af19b(0x397)]['isFullDocumentTitle']=function(){const _0x3f6c70=_0x5af19b;if(Scene_Title[_0x3f6c70(0x820)]==='')return![];if(Scene_Title[_0x3f6c70(0x820)]===_0x3f6c70(0x5ab))return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']===_0x3f6c70(0x5e4))return![];return!![];},Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x8f1)]=function(){const _0x47ec39=_0x5af19b,_0x276566=$dataSystem['gameTitle'],_0x3807d9=Scene_Title[_0x47ec39(0x820)]||'',_0x59618f=Scene_Title[_0x47ec39(0x4f7)]||'',_0x20c808=VisuMZ[_0x47ec39(0x585)][_0x47ec39(0x47e)][_0x47ec39(0x305)][_0x47ec39(0x743)][_0x47ec39(0x622)],_0xbeb96a=_0x20c808[_0x47ec39(0x8b9)](_0x276566,_0x3807d9,_0x59618f);document[_0x47ec39(0x726)]=_0xbeb96a;},Scene_Boot[_0x5af19b(0x397)][_0x5af19b(0x693)]=function(){const _0x39d4ec=_0x5af19b;if(VisuMZ['CoreEngine'][_0x39d4ec(0x47e)]['UI'][_0x39d4ec(0x27e)]){const _0xeb2b92=Graphics['width']-Graphics['boxWidth']-VisuMZ['CoreEngine'][_0x39d4ec(0x47e)]['UI'][_0x39d4ec(0x759)]*0x2,_0x2f9559=Sprite_Button['prototype'][_0x39d4ec(0x746)][_0x39d4ec(0x535)](this)*0x4;if(_0xeb2b92>=_0x2f9559)SceneManager[_0x39d4ec(0x84d)](!![]);}},Scene_Title[_0x5af19b(0x820)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x305)][_0x5af19b(0x743)][_0x5af19b(0x5ab)],Scene_Title[_0x5af19b(0x4f7)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['MenuLayout']['Title'][_0x5af19b(0x418)],Scene_Title[_0x5af19b(0x54c)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x257)],VisuMZ[_0x5af19b(0x585)]['Scene_Title_drawGameTitle']=Scene_Title[_0x5af19b(0x397)]['drawGameTitle'],Scene_Title[_0x5af19b(0x397)][_0x5af19b(0x896)]=function(){const _0x37589a=_0x5af19b;VisuMZ['CoreEngine'][_0x37589a(0x47e)]['MenuLayout'][_0x37589a(0x743)][_0x37589a(0x896)]['call'](this);if(Scene_Title[_0x37589a(0x820)]!==''&&Scene_Title[_0x37589a(0x820)]!==_0x37589a(0x5ab))this['drawGameSubtitle']();if(Scene_Title[_0x37589a(0x4f7)]!==''&&Scene_Title[_0x37589a(0x4f7)]!==_0x37589a(0x5e4))this[_0x37589a(0x79d)]();},Scene_Title['prototype'][_0x5af19b(0x34a)]=function(){const _0x3453eb=_0x5af19b;VisuMZ[_0x3453eb(0x585)][_0x3453eb(0x47e)][_0x3453eb(0x305)][_0x3453eb(0x743)][_0x3453eb(0x34a)][_0x3453eb(0x535)](this);},Scene_Title[_0x5af19b(0x397)][_0x5af19b(0x79d)]=function(){const _0x85d6d1=_0x5af19b;VisuMZ[_0x85d6d1(0x585)][_0x85d6d1(0x47e)][_0x85d6d1(0x305)][_0x85d6d1(0x743)][_0x85d6d1(0x79d)][_0x85d6d1(0x535)](this);},Scene_Title['prototype'][_0x5af19b(0x735)]=function(){const _0x50b02c=_0x5af19b;this[_0x50b02c(0x3e7)]();const _0x31dfab=$dataSystem[_0x50b02c(0x5ac)][_0x50b02c(0x24c)],_0x4f9310=this[_0x50b02c(0x62c)]();this[_0x50b02c(0x58d)]=new Window_TitleCommand(_0x4f9310),this[_0x50b02c(0x58d)][_0x50b02c(0x674)](_0x31dfab);const _0x11d951=this[_0x50b02c(0x62c)]();this[_0x50b02c(0x58d)][_0x50b02c(0x857)](_0x11d951['x'],_0x11d951['y'],_0x11d951[_0x50b02c(0x3fc)],_0x11d951[_0x50b02c(0x7ff)]),this['_commandWindow'][_0x50b02c(0x551)](),this['_commandWindow'][_0x50b02c(0x757)](),this[_0x50b02c(0x58d)][_0x50b02c(0x639)](),this[_0x50b02c(0x6d1)](this['_commandWindow']);},Scene_Title['prototype'][_0x5af19b(0x2e6)]=function(){const _0x3382a3=_0x5af19b;return this[_0x3382a3(0x58d)]?this[_0x3382a3(0x58d)][_0x3382a3(0x5fd)]():VisuMZ['CoreEngine']['Settings'][_0x3382a3(0x7c7)][_0x3382a3(0x35d)];},Scene_Title[_0x5af19b(0x397)]['commandWindowRect']=function(){const _0x1e1b97=_0x5af19b;return VisuMZ[_0x1e1b97(0x585)]['Settings'][_0x1e1b97(0x305)][_0x1e1b97(0x743)][_0x1e1b97(0x41e)]['call'](this);},Scene_Title[_0x5af19b(0x397)][_0x5af19b(0x3e7)]=function(){const _0x5bd9f1=_0x5af19b;for(const _0x5645af of Scene_Title['pictureButtons']){const _0x11f318=new Sprite_TitlePictureButton(_0x5645af);this[_0x5bd9f1(0x73a)](_0x11f318);}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x409)]=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x8cc)],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(){const _0x12f51b=_0x5af19b;VisuMZ['CoreEngine'][_0x12f51b(0x409)][_0x12f51b(0x535)](this),$gameTemp[_0x12f51b(0x1f5)](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine'][_0x5af19b(0x75e)]=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x66b)],Scene_Map[_0x5af19b(0x397)]['updateMainMultiply']=function(){const _0x24feee=_0x5af19b;VisuMZ['CoreEngine'][_0x24feee(0x75e)][_0x24feee(0x535)](this),$gameTemp[_0x24feee(0x198)]&&!$gameMessage['isBusy']()&&(this[_0x24feee(0x707)](),SceneManager['updateEffekseer']());},Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x844)]=function(){const _0x45486d=_0x5af19b;Scene_Message['prototype'][_0x45486d(0x844)][_0x45486d(0x535)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x45486d(0x830)][_0x45486d(0x556)](),this[_0x45486d(0x559)][_0x45486d(0x310)](),this[_0x45486d(0x33f)][_0x45486d(0x87b)]=![],SceneManager[_0x45486d(0x93a)]()),$gameScreen[_0x45486d(0x314)](),this[_0x45486d(0x1ab)]();},VisuMZ['CoreEngine'][_0x5af19b(0x2d7)]=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x55b)],Scene_Map['prototype'][_0x5af19b(0x55b)]=function(){const _0x5825ca=_0x5af19b;VisuMZ[_0x5825ca(0x585)][_0x5825ca(0x2d7)][_0x5825ca(0x535)](this),SceneManager[_0x5825ca(0x45d)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map['prototype']['moveMenuButtonSideButtonLayout']=function(){const _0x46b001=_0x5af19b;this['_menuButton']['x']=Graphics[_0x46b001(0x6de)]+0x4;},VisuMZ['CoreEngine'][_0x5af19b(0x263)]=Scene_Map[_0x5af19b(0x397)]['updateScene'],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x3c2)]=function(){const _0x1b81fd=_0x5af19b;VisuMZ[_0x1b81fd(0x585)][_0x1b81fd(0x263)][_0x1b81fd(0x535)](this),this[_0x1b81fd(0x61a)]();},Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x61a)]=function(){const _0x323ee3=_0x5af19b;Input['isTriggered'](_0x323ee3(0x15e))&&(ConfigManager[_0x323ee3(0x173)]=!ConfigManager[_0x323ee3(0x173)],ConfigManager[_0x323ee3(0x6bd)]());},VisuMZ[_0x5af19b(0x585)]['Scene_Map_updateMain']=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x707)],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x707)]=function(){const _0x1351fc=_0x5af19b;VisuMZ['CoreEngine'][_0x1351fc(0x40d)]['call'](this),this[_0x1351fc(0x7cd)]();},Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x1ab)]=function(){const _0x57d932=_0x5af19b;this[_0x57d932(0x4c5)]=[];},Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x7cd)]=function(){const _0x54d2d2=_0x5af19b;if(!this[_0x54d2d2(0x4c5)])return;for(const _0x248709 of this[_0x54d2d2(0x4c5)]){_0x248709&&_0x248709['update']();}},Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x66d)]=function(_0x2ba7e9,_0x55a652){const _0x3ee2a1=_0x5af19b,_0x4cc567=$dataCommonEvents[_0x2ba7e9];if(!_0x4cc567)return;const _0x165687=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x165687),_0x165687[_0x3ee2a1(0x936)](_0x2ba7e9),_0x165687[_0x3ee2a1(0x51c)](_0x55a652);},Scene_Map['prototype'][_0x5af19b(0x1fc)]=function(_0x2b8512){const _0x55c007=_0x5af19b;this['_onceParallelInterpreters']=this[_0x55c007(0x4c5)]||[],this['_onceParallelInterpreters']['push'](_0x2b8512);},Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x3a3)]=function(_0x5a8da1){const _0x4406ec=_0x5af19b;this[_0x4406ec(0x4c5)]=this['_onceParallelInterpreters']||[],this[_0x4406ec(0x4c5)]['remove'](_0x5a8da1);};function Game_OnceParallelInterpreter(){const _0x329925=_0x5af19b;this[_0x329925(0x8cc)](...arguments);}Game_OnceParallelInterpreter[_0x5af19b(0x397)]=Object['create'](Game_Interpreter[_0x5af19b(0x397)]),Game_OnceParallelInterpreter['prototype']['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x5af19b(0x397)][_0x5af19b(0x936)]=function(_0xb72d0c){const _0x222b2a=_0x5af19b,_0x5a203a=$dataCommonEvents[_0xb72d0c];_0x5a203a?this[_0x222b2a(0x510)](_0x5a203a[_0x222b2a(0x7c1)],0x0):this[_0x222b2a(0x844)]();},Game_OnceParallelInterpreter[_0x5af19b(0x397)][_0x5af19b(0x51c)]=function(_0x3ccfe6){this['_eventId']=_0x3ccfe6||0x0;},Game_OnceParallelInterpreter[_0x5af19b(0x397)][_0x5af19b(0x844)]=function(){const _0x250a26=_0x5af19b;if(!SceneManager[_0x250a26(0x4de)]())return;SceneManager['_scene']['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x250a26(0x397)]['terminate'][_0x250a26(0x535)](this);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x316)]=Scene_MenuBase[_0x5af19b(0x397)]['helpAreaTop'],Scene_MenuBase[_0x5af19b(0x397)]['helpAreaTop']=function(){const _0x1cd53f=_0x5af19b;let _0x2f6a4e=0x0;return SceneManager[_0x1cd53f(0x7f4)]()?_0x2f6a4e=this[_0x1cd53f(0x347)]():_0x2f6a4e=VisuMZ[_0x1cd53f(0x585)]['Scene_MenuBase_helpAreaTop'][_0x1cd53f(0x535)](this),_0x2f6a4e;},Scene_MenuBase[_0x5af19b(0x397)]['helpAreaTopSideButtonLayout']=function(){const _0x1acb5e=_0x5af19b;return this[_0x1acb5e(0x6a1)]()?this[_0x1acb5e(0x4ed)]():0x0;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x251)]=Scene_MenuBase['prototype'][_0x5af19b(0x342)],Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x342)]=function(){const _0x2eef93=_0x5af19b;return SceneManager['areButtonsOutsideMainUI']()?this[_0x2eef93(0x3bf)]():VisuMZ['CoreEngine'][_0x2eef93(0x251)][_0x2eef93(0x535)](this);},Scene_MenuBase['prototype']['mainAreaTopSideButtonLayout']=function(){const _0x38af47=_0x5af19b;if(!this['isBottomHelpMode']())return this['helpAreaBottom']();else return this[_0x38af47(0x802)]()&&this['getButtonAssistLocation']()===_0x38af47(0x648)?Window_ButtonAssist[_0x38af47(0x397)][_0x38af47(0x244)]():0x0;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x668)]=Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x432)],Scene_MenuBase[_0x5af19b(0x397)]['mainAreaHeight']=function(){const _0x23506f=_0x5af19b;let _0x569061=0x0;return SceneManager[_0x23506f(0x7f4)]()?_0x569061=this['mainAreaHeightSideButtonLayout']():_0x569061=VisuMZ['CoreEngine'][_0x23506f(0x668)][_0x23506f(0x535)](this),this[_0x23506f(0x802)]()&&this[_0x23506f(0x2fd)]()!==_0x23506f(0x187)&&(_0x569061-=Window_ButtonAssist[_0x23506f(0x397)]['lineHeight']()),_0x569061;},Scene_MenuBase[_0x5af19b(0x397)]['mainAreaHeightSideButtonLayout']=function(){const _0x20ccf6=_0x5af19b;return Graphics[_0x20ccf6(0x454)]-this[_0x20ccf6(0x1ff)]();},VisuMZ['CoreEngine'][_0x5af19b(0x2ac)]=Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x19f)],Scene_MenuBase[_0x5af19b(0x397)]['createBackground']=function(){const _0x444eaf=_0x5af19b,_0x842e25=VisuMZ['CoreEngine'][_0x444eaf(0x47e)][_0x444eaf(0x2b7)][_0x444eaf(0x609)]??0x8;this['_backgroundFilter']=new PIXI['filters'][(_0x444eaf(0x2bc))](_0x842e25),this[_0x444eaf(0x1b3)]=new Sprite(),this['_backgroundSprite'][_0x444eaf(0x519)]=SceneManager[_0x444eaf(0x441)](),this[_0x444eaf(0x1b3)][_0x444eaf(0x7d8)]=[this[_0x444eaf(0x529)]],this[_0x444eaf(0x73a)](this['_backgroundSprite']),this[_0x444eaf(0x747)](0xc0),this[_0x444eaf(0x747)](this[_0x444eaf(0x54f)]()),this[_0x444eaf(0x561)]();},Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x54f)]=function(){const _0x4277f3=_0x5af19b,_0xe0d930=String(this['constructor'][_0x4277f3(0x678)]),_0xe7735a=this[_0x4277f3(0x613)](_0xe0d930);return _0xe7735a?_0xe7735a['SnapshotOpacity']:0xc0;},Scene_MenuBase[_0x5af19b(0x397)]['createCustomBackgroundImages']=function(){const _0x4f55e1=_0x5af19b,_0x4e9c69=String(this['constructor']['name']),_0x286326=this['getCustomBackgroundSettings'](_0x4e9c69);_0x286326&&(_0x286326['BgFilename1']!==''||_0x286326[_0x4f55e1(0x4ee)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x4f55e1(0x59a)](_0x286326[_0x4f55e1(0x1a9)])),this[_0x4f55e1(0x610)]=new Sprite(ImageManager[_0x4f55e1(0x570)](_0x286326[_0x4f55e1(0x4ee)])),this[_0x4f55e1(0x73a)](this['_backSprite1']),this[_0x4f55e1(0x73a)](this[_0x4f55e1(0x610)]),this[_0x4f55e1(0x879)][_0x4f55e1(0x519)][_0x4f55e1(0x5b4)](this[_0x4f55e1(0x2ed)][_0x4f55e1(0x48b)](this,this[_0x4f55e1(0x879)])),this[_0x4f55e1(0x610)][_0x4f55e1(0x519)][_0x4f55e1(0x5b4)](this[_0x4f55e1(0x2ed)][_0x4f55e1(0x48b)](this,this[_0x4f55e1(0x610)])));},Scene_MenuBase['prototype']['getCustomBackgroundSettings']=function(_0x498e56){const _0x370c3f=_0x5af19b;return VisuMZ[_0x370c3f(0x585)][_0x370c3f(0x47e)][_0x370c3f(0x2b7)][_0x498e56]||VisuMZ['CoreEngine'][_0x370c3f(0x47e)][_0x370c3f(0x2b7)][_0x370c3f(0x1a7)];},Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x2ed)]=function(_0x4a3105){const _0x1432c6=_0x5af19b;this['scaleSprite'](_0x4a3105),this[_0x1432c6(0x191)](_0x4a3105);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x3f3)]=Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x67f)],Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x67f)]=function(){const _0x21dc60=_0x5af19b;VisuMZ[_0x21dc60(0x585)]['Scene_MenuBase_createCancelButton'][_0x21dc60(0x535)](this),SceneManager['isSideButtonLayout']()&&this[_0x21dc60(0x215)]();},Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x215)]=function(){const _0x2ac888=_0x5af19b;this['_cancelButton']['x']=Graphics[_0x2ac888(0x6de)]+0x4;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x732)]=Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x6bb)],Scene_MenuBase[_0x5af19b(0x397)]['createPageButtons']=function(){const _0x373046=_0x5af19b;VisuMZ[_0x373046(0x585)]['Scene_MenuBase_createPageButtons'][_0x373046(0x535)](this),SceneManager[_0x373046(0x45d)]()&&this[_0x373046(0x197)]();},Scene_MenuBase[_0x5af19b(0x397)]['movePageButtonSideButtonLayout']=function(){const _0x5439ad=_0x5af19b;this[_0x5439ad(0x414)]['x']=-0x1*(this['_pageupButton']['width']+this[_0x5439ad(0x5a3)][_0x5439ad(0x3fc)]+0x8),this[_0x5439ad(0x5a3)]['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x802)]=function(){const _0x489bcf=_0x5af19b;return VisuMZ[_0x489bcf(0x585)][_0x489bcf(0x47e)][_0x489bcf(0x4be)][_0x489bcf(0x918)];},Scene_MenuBase['prototype'][_0x5af19b(0x2fd)]=function(){const _0x1a3bfa=_0x5af19b;return SceneManager[_0x1a3bfa(0x45d)]()||SceneManager[_0x1a3bfa(0x19d)]()?VisuMZ[_0x1a3bfa(0x585)][_0x1a3bfa(0x47e)][_0x1a3bfa(0x4be)]['Location']:'button';},Scene_MenuBase[_0x5af19b(0x397)]['createButtonAssistWindow']=function(){const _0x4963b6=_0x5af19b;if(!this[_0x4963b6(0x802)]())return;const _0x5a1ca9=this[_0x4963b6(0x605)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x5a1ca9),this[_0x4963b6(0x6d1)](this['_buttonAssistWindow']);},Scene_MenuBase[_0x5af19b(0x397)]['buttonAssistWindowRect']=function(){const _0x513b45=_0x5af19b;return this[_0x513b45(0x2fd)]()==='button'?this[_0x513b45(0x2a9)]():this[_0x513b45(0x47b)]();},Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x2a9)]=function(){const _0x5b65bc=_0x5af19b,_0x4f30ff=ConfigManager[_0x5b65bc(0x53d)]?(Sprite_Button[_0x5b65bc(0x397)][_0x5b65bc(0x746)]()+0x6)*0x2:0x0,_0x40c4af=this[_0x5b65bc(0x2c6)](),_0x3a4cf6=Graphics[_0x5b65bc(0x6de)]-_0x4f30ff*0x2,_0x304bd1=this[_0x5b65bc(0x7ae)]();return new Rectangle(_0x4f30ff,_0x40c4af,_0x3a4cf6,_0x304bd1);},Scene_MenuBase[_0x5af19b(0x397)][_0x5af19b(0x47b)]=function(){const _0x4ab2d9=_0x5af19b,_0x4399fb=Graphics[_0x4ab2d9(0x6de)],_0x562577=Window_ButtonAssist['prototype'][_0x4ab2d9(0x244)](),_0x917844=0x0;let _0x3ad2a1=0x0;return this[_0x4ab2d9(0x2fd)]()===_0x4ab2d9(0x648)?_0x3ad2a1=0x0:_0x3ad2a1=Graphics[_0x4ab2d9(0x454)]-_0x562577,new Rectangle(_0x917844,_0x3ad2a1,_0x4399fb,_0x562577);},Scene_Menu[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['MenuLayout'][_0x5af19b(0x631)],VisuMZ['CoreEngine']['Scene_Menu_create']=Scene_Menu[_0x5af19b(0x397)]['create'],Scene_Menu['prototype'][_0x5af19b(0x92c)]=function(){const _0x366d74=_0x5af19b;VisuMZ[_0x366d74(0x585)][_0x366d74(0x1c6)][_0x366d74(0x535)](this),this[_0x366d74(0x77d)]();},Scene_Menu[_0x5af19b(0x397)][_0x5af19b(0x77d)]=function(){const _0x2519bf=_0x5af19b;this['_commandWindow']&&this[_0x2519bf(0x58d)][_0x2519bf(0x674)](Scene_Menu['layoutSettings'][_0x2519bf(0x22c)]),this[_0x2519bf(0x67d)]&&this['_goldWindow'][_0x2519bf(0x674)](Scene_Menu[_0x2519bf(0x1df)][_0x2519bf(0x3bd)]),this[_0x2519bf(0x8f7)]&&this[_0x2519bf(0x8f7)][_0x2519bf(0x674)](Scene_Menu['layoutSettings'][_0x2519bf(0x923)]);},Scene_Menu['prototype'][_0x5af19b(0x62c)]=function(){const _0x3dcee1=_0x5af19b;return Scene_Menu['layoutSettings'][_0x3dcee1(0x41e)]['call'](this);},Scene_Menu[_0x5af19b(0x397)]['goldWindowRect']=function(){const _0x452d4b=_0x5af19b;return Scene_Menu[_0x452d4b(0x1df)][_0x452d4b(0x328)][_0x452d4b(0x535)](this);},Scene_Menu[_0x5af19b(0x397)][_0x5af19b(0x791)]=function(){const _0x2c9a82=_0x5af19b;return Scene_Menu[_0x2c9a82(0x1df)][_0x2c9a82(0x607)][_0x2c9a82(0x535)](this);},Scene_Item[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['MenuLayout'][_0x5af19b(0x784)],VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x617)]=Scene_Item['prototype'][_0x5af19b(0x92c)],Scene_Item['prototype'][_0x5af19b(0x92c)]=function(){const _0x52dcbe=_0x5af19b;VisuMZ[_0x52dcbe(0x585)][_0x52dcbe(0x617)][_0x52dcbe(0x535)](this),this[_0x52dcbe(0x77d)]();},Scene_Item[_0x5af19b(0x397)][_0x5af19b(0x77d)]=function(){const _0x379e1f=_0x5af19b;this[_0x379e1f(0x778)]&&this[_0x379e1f(0x778)][_0x379e1f(0x674)](Scene_Item[_0x379e1f(0x1df)][_0x379e1f(0x2bb)]),this['_categoryWindow']&&this[_0x379e1f(0x46a)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x379e1f(0x366)]),this[_0x379e1f(0x390)]&&this[_0x379e1f(0x390)][_0x379e1f(0x674)](Scene_Item['layoutSettings'][_0x379e1f(0x776)]),this[_0x379e1f(0x513)]&&this[_0x379e1f(0x513)][_0x379e1f(0x674)](Scene_Item[_0x379e1f(0x1df)]['ActorBgType']);},Scene_Item[_0x5af19b(0x397)][_0x5af19b(0x855)]=function(){const _0x491581=_0x5af19b;return Scene_Item[_0x491581(0x1df)][_0x491581(0x710)]['call'](this);},Scene_Item['prototype'][_0x5af19b(0x4d7)]=function(){const _0x504c89=_0x5af19b;return Scene_Item[_0x504c89(0x1df)][_0x504c89(0x795)][_0x504c89(0x535)](this);},Scene_Item[_0x5af19b(0x397)][_0x5af19b(0x452)]=function(){const _0x52ddff=_0x5af19b;return Scene_Item[_0x52ddff(0x1df)][_0x52ddff(0x74a)][_0x52ddff(0x535)](this);},Scene_Item[_0x5af19b(0x397)][_0x5af19b(0x302)]=function(){const _0x544fa6=_0x5af19b;return Scene_Item[_0x544fa6(0x1df)][_0x544fa6(0x57d)][_0x544fa6(0x535)](this);},Scene_Skill[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['MenuLayout'][_0x5af19b(0x945)],VisuMZ[_0x5af19b(0x585)]['Scene_Skill_create']=Scene_Skill['prototype'][_0x5af19b(0x92c)],Scene_Skill[_0x5af19b(0x397)]['create']=function(){const _0x2974cb=_0x5af19b;VisuMZ['CoreEngine']['Scene_Skill_create'][_0x2974cb(0x535)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x5af19b(0x397)][_0x5af19b(0x77d)]=function(){const _0x291481=_0x5af19b;this['_helpWindow']&&this['_helpWindow']['setBackgroundType'](Scene_Skill[_0x291481(0x1df)][_0x291481(0x2bb)]),this[_0x291481(0x5f9)]&&this[_0x291481(0x5f9)][_0x291481(0x674)](Scene_Skill['layoutSettings']['SkillTypeBgType']),this[_0x291481(0x8f7)]&&this[_0x291481(0x8f7)][_0x291481(0x674)](Scene_Skill[_0x291481(0x1df)][_0x291481(0x923)]),this[_0x291481(0x390)]&&this[_0x291481(0x390)][_0x291481(0x674)](Scene_Skill[_0x291481(0x1df)]['ItemBgType']),this[_0x291481(0x513)]&&this[_0x291481(0x513)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x291481(0x722)]);},Scene_Skill[_0x5af19b(0x397)][_0x5af19b(0x855)]=function(){const _0x526d61=_0x5af19b;return Scene_Skill[_0x526d61(0x1df)][_0x526d61(0x710)][_0x526d61(0x535)](this);},Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x2714ae=_0x5af19b;return Scene_Skill[_0x2714ae(0x1df)][_0x2714ae(0x1e3)][_0x2714ae(0x535)](this);},Scene_Skill[_0x5af19b(0x397)]['statusWindowRect']=function(){const _0x4c85d4=_0x5af19b;return Scene_Skill[_0x4c85d4(0x1df)][_0x4c85d4(0x607)][_0x4c85d4(0x535)](this);},Scene_Skill['prototype']['itemWindowRect']=function(){const _0x23eee1=_0x5af19b;return Scene_Skill['layoutSettings']['ItemRect'][_0x23eee1(0x535)](this);},Scene_Skill[_0x5af19b(0x397)][_0x5af19b(0x302)]=function(){const _0x377570=_0x5af19b;return Scene_Skill[_0x377570(0x1df)][_0x377570(0x57d)]['call'](this);},Scene_Equip[_0x5af19b(0x1df)]=VisuMZ['CoreEngine'][_0x5af19b(0x47e)][_0x5af19b(0x305)]['EquipMenu'],VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x7de)]=Scene_Equip[_0x5af19b(0x397)]['create'],Scene_Equip['prototype'][_0x5af19b(0x92c)]=function(){const _0x24f999=_0x5af19b;VisuMZ[_0x24f999(0x585)][_0x24f999(0x7de)][_0x24f999(0x535)](this),this[_0x24f999(0x77d)]();},Scene_Equip['prototype'][_0x5af19b(0x77d)]=function(){const _0x3d2fd1=_0x5af19b;this[_0x3d2fd1(0x778)]&&this[_0x3d2fd1(0x778)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x3d2fd1(0x2bb)]),this['_statusWindow']&&this[_0x3d2fd1(0x8f7)][_0x3d2fd1(0x674)](Scene_Equip[_0x3d2fd1(0x1df)][_0x3d2fd1(0x923)]),this[_0x3d2fd1(0x58d)]&&this['_commandWindow']['setBackgroundType'](Scene_Equip[_0x3d2fd1(0x1df)]['CommandBgType']),this[_0x3d2fd1(0x6f5)]&&this[_0x3d2fd1(0x6f5)][_0x3d2fd1(0x674)](Scene_Equip[_0x3d2fd1(0x1df)]['SlotBgType']),this[_0x3d2fd1(0x390)]&&this[_0x3d2fd1(0x390)][_0x3d2fd1(0x674)](Scene_Equip['layoutSettings'][_0x3d2fd1(0x776)]);},Scene_Equip[_0x5af19b(0x397)][_0x5af19b(0x855)]=function(){const _0x2dac8f=_0x5af19b;return Scene_Equip[_0x2dac8f(0x1df)][_0x2dac8f(0x710)][_0x2dac8f(0x535)](this);},Scene_Equip[_0x5af19b(0x397)][_0x5af19b(0x791)]=function(){const _0x42d85b=_0x5af19b;return Scene_Equip[_0x42d85b(0x1df)][_0x42d85b(0x607)][_0x42d85b(0x535)](this);},Scene_Equip['prototype'][_0x5af19b(0x62c)]=function(){return Scene_Equip['layoutSettings']['CommandRect']['call'](this);},Scene_Equip[_0x5af19b(0x397)][_0x5af19b(0x593)]=function(){const _0x406754=_0x5af19b;return Scene_Equip[_0x406754(0x1df)]['SlotRect'][_0x406754(0x535)](this);},Scene_Equip[_0x5af19b(0x397)][_0x5af19b(0x452)]=function(){const _0x5bc620=_0x5af19b;return Scene_Equip[_0x5bc620(0x1df)]['ItemRect'][_0x5bc620(0x535)](this);},Scene_Status[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)]['Settings'][_0x5af19b(0x305)]['StatusMenu'],VisuMZ['CoreEngine'][_0x5af19b(0x284)]=Scene_Status[_0x5af19b(0x397)][_0x5af19b(0x92c)],Scene_Status[_0x5af19b(0x397)][_0x5af19b(0x92c)]=function(){const _0x20a6c8=_0x5af19b;VisuMZ[_0x20a6c8(0x585)][_0x20a6c8(0x284)][_0x20a6c8(0x535)](this),this[_0x20a6c8(0x77d)]();},Scene_Status[_0x5af19b(0x397)][_0x5af19b(0x77d)]=function(){const _0x599619=_0x5af19b;this[_0x599619(0x4d1)]&&this['_profileWindow'][_0x599619(0x674)](Scene_Status['layoutSettings']['ProfileBgType']),this[_0x599619(0x8f7)]&&this[_0x599619(0x8f7)]['setBackgroundType'](Scene_Status[_0x599619(0x1df)][_0x599619(0x923)]),this['_statusParamsWindow']&&this[_0x599619(0x235)]['setBackgroundType'](Scene_Status[_0x599619(0x1df)][_0x599619(0x93f)]),this[_0x599619(0x6a0)]&&this[_0x599619(0x6a0)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x599619(0x442)]);},Scene_Status[_0x5af19b(0x397)]['profileWindowRect']=function(){const _0x45667c=_0x5af19b;return Scene_Status[_0x45667c(0x1df)]['ProfileRect']['call'](this);},Scene_Status['prototype'][_0x5af19b(0x791)]=function(){const _0x1f8a59=_0x5af19b;return Scene_Status[_0x1f8a59(0x1df)][_0x1f8a59(0x607)]['call'](this);},Scene_Status[_0x5af19b(0x397)][_0x5af19b(0x713)]=function(){const _0x58193b=_0x5af19b;return Scene_Status[_0x58193b(0x1df)]['StatusParamsRect']['call'](this);},Scene_Status[_0x5af19b(0x397)]['statusEquipWindowRect']=function(){const _0x45d9ae=_0x5af19b;return Scene_Status[_0x45d9ae(0x1df)]['StatusEquipRect'][_0x45d9ae(0x535)](this);},Scene_Options[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)]['Settings']['MenuLayout']['OptionsMenu'],VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x60a)]=Scene_Options[_0x5af19b(0x397)][_0x5af19b(0x92c)],Scene_Options[_0x5af19b(0x397)][_0x5af19b(0x92c)]=function(){const _0x3edb51=_0x5af19b;VisuMZ[_0x3edb51(0x585)][_0x3edb51(0x60a)][_0x3edb51(0x535)](this),this[_0x3edb51(0x77d)]();},Scene_Options[_0x5af19b(0x397)][_0x5af19b(0x77d)]=function(){const _0x29385c=_0x5af19b;this[_0x29385c(0x468)]&&this[_0x29385c(0x468)][_0x29385c(0x674)](Scene_Options[_0x29385c(0x1df)][_0x29385c(0x5c1)]);},Scene_Options[_0x5af19b(0x397)][_0x5af19b(0x4fb)]=function(){const _0x13f4ad=_0x5af19b;return Scene_Options[_0x13f4ad(0x1df)]['OptionsRect'][_0x13f4ad(0x535)](this);},Scene_Save[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x305)][_0x5af19b(0x8fe)],Scene_Save[_0x5af19b(0x397)][_0x5af19b(0x92c)]=function(){const _0x49200f=_0x5af19b;Scene_File['prototype'][_0x49200f(0x92c)][_0x49200f(0x535)](this),this[_0x49200f(0x77d)]();},Scene_Save[_0x5af19b(0x397)]['setCoreEngineUpdateWindowBg']=function(){const _0x25585b=_0x5af19b;this['_helpWindow']&&this[_0x25585b(0x778)][_0x25585b(0x674)](Scene_Save['layoutSettings'][_0x25585b(0x2bb)]),this[_0x25585b(0x847)]&&this[_0x25585b(0x847)][_0x25585b(0x674)](Scene_Save[_0x25585b(0x1df)][_0x25585b(0x8fc)]);},Scene_Save['prototype'][_0x5af19b(0x855)]=function(){const _0xb6f85f=_0x5af19b;return Scene_Save[_0xb6f85f(0x1df)][_0xb6f85f(0x710)]['call'](this);},Scene_Save[_0x5af19b(0x397)][_0x5af19b(0x7e9)]=function(){const _0x50b7df=_0x5af19b;return Scene_Save[_0x50b7df(0x1df)][_0x50b7df(0x65d)][_0x50b7df(0x535)](this);},Scene_Load[_0x5af19b(0x1df)]=VisuMZ['CoreEngine'][_0x5af19b(0x47e)]['MenuLayout'][_0x5af19b(0x511)],Scene_Load[_0x5af19b(0x397)][_0x5af19b(0x92c)]=function(){const _0x4391a5=_0x5af19b;Scene_File['prototype']['create'][_0x4391a5(0x535)](this),this[_0x4391a5(0x77d)]();},Scene_Load[_0x5af19b(0x397)]['setCoreEngineUpdateWindowBg']=function(){const _0x536a1d=_0x5af19b;this[_0x536a1d(0x778)]&&this['_helpWindow']['setBackgroundType'](Scene_Load[_0x536a1d(0x1df)][_0x536a1d(0x2bb)]),this[_0x536a1d(0x847)]&&this[_0x536a1d(0x847)][_0x536a1d(0x674)](Scene_Load['layoutSettings'][_0x536a1d(0x8fc)]);},Scene_Load[_0x5af19b(0x397)]['helpWindowRect']=function(){const _0x1e5df6=_0x5af19b;return Scene_Load[_0x1e5df6(0x1df)]['HelpRect']['call'](this);},Scene_Load[_0x5af19b(0x397)]['listWindowRect']=function(){const _0x3fbde9=_0x5af19b;return Scene_Load[_0x3fbde9(0x1df)][_0x3fbde9(0x65d)][_0x3fbde9(0x535)](this);};function _0x266f(){const _0x397c89=['listWindowRect','initialLevel','Scene_Base_terminate','74OKugCU','SCALE_MODES','ATK','StartID','replace','show','vertJS','isPlaying','areButtonsOutsideMainUI','Flat2','IconSParam3','createPointAnimation','updateMove','drawCircle','faces','mhp','Sprite_Animation_setViewport','_targetScaleX','IconSParam5','height','_cache','NON_FRAME','isMenuButtonAssistEnabled','MvAnimationRate','_startDecrypting','_destroyCanvas','isItemStyle','updatePictureSettings','deathColor','DummyRect','forceOutOfPlaytest','TextFmt','BottomButtons','erasePicture','overrideMimeType','Spriteset_Base_isAnimationPlaying','LevelUpFullMp','process_VisuMZ_CoreEngine_Settings','SParamVocab7','picture','drawCurrencyValue','KEEP','Scene_Name_create','_offsetY','isNwjs','command122','textSizeEx','smallParamFontSize','CANCEL','DummyBgType','_shakeDuration','SCROLLBAR','subtitle','_list','parallaxes','loadBitmapCoreEngine','paramchangeTextColor','repositionCancelButtonSideButtonLayout','RepositionEnemies','DigitGroupingLocale','WIN_OEM_PA3','Game_Interpreter_command355','_tileSprite','drawText','getLevel','this.paramBase(7)','PRESERVCONVERSION(%1)','batch','_spriteset','outbounce','savefileInfo','isLoopVertical','createTilemap','HIT','sin','WIN_ICO_CLEAR','MultiKeyFmt','NewGameCommonEventAll','image-rendering','optSideView','jsQuickFunc','Window_NameInput_cursorLeft','onEscapeSuccess','F7key','indexOf','Sprite_Gauge_gaugeRate','drawNewParam','Scene_Base_terminateAnimationClearBugFix','terminate','gainItem','adjustPictureAntiZoom','_listWindow','LevelUpFullHp','isBottomButtonMode','valueOutlineColor','parseForcedGameTroopSettingsCoreEngine','_opening','setSideButtonLayout','tpColor','OUTBACK','setSize','WIN_OEM_FJ_LOYA','ExportStrFromAllTroops','contentsBack','_targetAnchor','helpWindowRect','_targetOpacity','move','itemPadding','ExtractStrFromMap','displayName','initRotation','Opacity','initDigitGrouping','repeat','ColorManager_loadWindowskin','([\x5c+\x5c-]\x5cd+)([%％])>','onLoad','getBattleSystem','setHandler','Game_Actor_paramBase','isSideView','OUTQUART','CAPSLOCK','Window_Base_drawText','Game_Map_setup','NUMPAD9','VisuMZ_2_BattleSystemSTB','setSideView','HANJA','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','home','Bitmap_strokeRect','ColSpacing','ARRAYNUM','setActionState','XParamVocab8','xparamPlus2','isLoopHorizontal','_tpbChargeTime','isHandled','_backSprite1','\x0a\x0a\x0a\x0a\x0a','visible','enable','layeredTiles','createSubSprite','pow','Window_TitleCommand_selectLast','_maxDigits','_pictureCoordinatesWindow','CrisisRate','initTpbChargeTime','_mp','original','setAction','_blank','reservePlayTestNewGameCommonEvent','rightArrowWidth','option','normal','makeInputButtonString','asin','isActiveTpb','getLastPluginCommandInterpreter','_storedMapText','_targetScaleY','_inputSpecialKeyCode','ALT','IDs','drawGameTitle','normalColor','processKeyboardEnd','isSpecialCode','Scene_Load','EditRect','easingType','%1〘End\x20Choice\x20Selection〙%1','_viewportSize','MCR','setupScrollBarBitmap','isInputting','Actor','<%1\x20%2:[\x20]','INOUTCIRC','initRotationCoreEngine','F10','BACK_QUOTE','executeLoad','createEnemies','adjustBoxSize','_height','targetX','KeyboardInput','openingSpeed','DOLLAR','scrollLeft','isGameActive','Game_Action_itemHit','sparamFlat1','ForceNoPlayTest','pointY','GoldFontSize','maxLevel','storeMapData','format','iconHeight','loadIconBitmap','updateTpbChargeTime','gainGold','CommonEventID','RepositionActors','updateMotion','_sideButtonLayout','<JS\x20%1\x20%2:[\x20](.*)>','Bitmap_blt','framebuffer','processFauxAnimationRequests','guardSkillId','MRG','WIN_ICO_00','playBgm','ParamName','transform','initialize','_screenY','_refreshBack','pop','textColor','applyEasingAnglePlus','DETACH_PICTURE_CONTAINER','getKeyboardInputButtonString','Sprite_Button_initialize','translucentOpacity','Power','ImgLoad','addCommand','BTestWeapons','Speed','skipBranch','_originalViewport','keyRepeatWait','onlyfilename','CtrlQuickLoad','horzJS','darwin','VisuMZ_1_BattleCore','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','ColorHPGauge2','xparamFlat1','GET','drawValue','_active','_CoreEngineSettings','globalAlpha','_clickHandler','KeyUnlisted','initVisuMZCoreEngine','SParamVocab8','createTextPopupWindow','updateLastTarget','makeDocumentTitle','wait','seVolume','catchLoadError','addEventListener','drawTextEx','_statusWindow','tpGaugeColor1','members','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','LEFT','ListBgType','thickness','SaveMenu','SParamVocab9','numActions','hasEncryptedImages','ctGaugeColor2','Game_Unit_onBattleStart','HYPHEN_MINUS','destroyed','defaultInputMode','DEFAULT_SHIFT_Y','_patternHeight','SystemSetWindowPadding','SceneManager_initialize','Input_pollGamepads','anchor','Input_onKeyDown','TRG','RevertPreserveNumbers','makeDeepCopy','currentLevelExp','CONTEXT_MENU','Wait','DamageColor','centerX','CONVERT','data/','Enable','start','cursorPageup','charAt','_movementWholeDuration','loadMapData','BarBodyColor','Name','Plus2','viewport','opacity','StatusBgType','StateIconsNonFrame','isGamepadButtonPressed','ColorPowerUp','Game_Actor_changeClass','Bitmap_gradientFillRect','_mapY','Sprite_AnimationMV_processTimingData','characters','create','createFauxAnimationSprite','AnimationID','nickname','powerUpColor','checkScrollBarBitmap','drawGauge','PictureRotate','calcCoreEasing','_updateGamepadState','setCommonEvent','Scene_Boot_startNormalGame','_lastX','META','snapForBackground','AudioChangeBgsPitch','onBattleEnd','clearRect','TPB\x20WAIT','StatusParamsBgType','cursorLeft','stringKeyMap','setLastPluginCommandInterpreter','exec','Match','SkillMenu','28HWGikv','Game_Picture_updateRotation','framesMax','_pauseSignSprite','Input_shouldPreventDefault','Sprite_Gauge_currentValue','offset','endAction','ColorPowerDown','_currentMap','tileWidth','onDatabaseLoaded','textBaseline','_updateFilterArea','IconXParam1','BottomHelp','AudioChangeBgsPan','Game_System_initialize','setTopRow','createFauxAnimationQueue','tpbAcceleration','lastAnimationSprite','SParamVocab5','Map%1','isCancelled','map','PictureFilename','enter','destroyCoreEngineMarkedBitmaps','TGR','tileset','contains','updateFrame','dashToggle','VisuMZ_4_UniqueTileEffects','onNameOk','Game_Map_setDisplayPos','_drawTextShadow','restore','isOpenAndActive','Scene_Boot_loadSystemImages','OPEN_BRACKET','XParamVocab5','AGI','drawRightArrow','ParamMax','stypeId','_closing','DebugConsoleLastControllerID','scrollbarHeight','processDrawIcon','loadTileBitmap','OUTQUINT','updateDuration','alwaysDash','drawTextTopAligned','isItem','scrollY','dummyWindowRect','updatePositionCoreEngineShakeVert','INELASTIC','WIN_OEM_PA2','mpColor','Actor-%1-%2','IconIndex','_stored_mpCostColor','toFixed','pos','OUTEXPO','Window_NameInput_cursorUp','IconSParam0','requestPointAnimation','command111','random','button','setWindowPadding','_colorTone','SETTINGS','ExportStrFromAllMaps','F12','reduce','makeTargetSprites','AudioChangeBgmPitch','damageColor','centerSprite','processKeyboardHandling','ParseEnemyNotetags','standardIconHeight','IconXParam2','Abbreviation','movePageButtonSideButtonLayout','_playTestFastMode','onKeyDown','children','_pressed','BaseTexture','areButtonsHidden','createPointAnimationTargets','createBackground','BattleManager_invokeCounterAttack','MapOnceParallel','_shouldPreventDefault','OUTBOUNCE','ENTER_SPECIAL','updateCurrentEvent','_stored_tpGaugeColor1','Scene_Unlisted','AllMaps','BgFilename1','createAnimationSprite','clearOnceParallelInterpreters','iconWidth','ConvertToBase','ParseItemNotetags','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','refreshScrollBarBitmap','SideView','makeFontBigger','_backgroundSprite','isPressed','resetTextColor','isKeyItem','_previousClass','MaxDuration','BattleSystem','ColorCTGauge2','createExtendedTileSprite','colSpacing','gradientFillRect','current','TRAIT_PARAM','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','getColorDataFromPluginParameters','ColorCTGauge1','(\x5cd+\x5c.?\x5cd+)>','Game_Interpreter_command105','pan','Scene_Menu_create','_animationQueue','yScrollLinkedOffset','application/json','ColorGaugeBack','OutlineColorDmg','registerCommand','redraw','Window_NumberInput_start','Scene_Battle_createCancelButton','_isWindow','INQUAD','requiredWtypeId1','exportAllMapStrings','_realScale','ModernControls','targetY','createWindowLayer','_editWindow','updateRotation','itemRect','test','isGamepadAxisMoved','popScene','coreEngineRepositionEnemies','layoutSettings','BTB','processEscape','Scene_GameEnd_createBackground','SkillTypeRect','TCR','Window_Base_createContents','Game_Action_setAttack','PRINTSCREEN','destroyScrollBarBitmaps','isWindowMaskingEnabled','VisuMZ_2_BattleSystemCTB','floor','MAX_SAFE_INTEGER','XParamVocab0','showPicture','NUMPAD2','gaugeBackColor','command355','FunctionName','Enemy','Spriteset_Map_createTilemap','clearForcedGameTroopSettingsCoreEngine','playBuzzer','_targetOffsetX','tpCostColor','ItemHeight','playTestF7','ParseClassNotetags','addOnceParallelInterpreter','evaded','sparamFlatBonus','helpAreaHeight','keys','_lastScrollBarValues','updateKeyText','canEquip','Window_NameInput_cursorDown','CEV','retrieveFauxAnimation','fillStyle','F6key','Window_NameInput_cursorPagedown','BTestAddedQuantity','numRepeats','setSkill','areTileShadowsHidden','process_VisuMZ_CoreEngine_RegExp','IconSParam2','drawItem','mapId','processTimingData','animationId','useDigitGrouping','moveCancelButtonSideButtonLayout','setClickHandler','6CTGzep','TextCodeClassNames','openURL','processSoundTimings','IconSet','makeCoreEngineCommandList','LoadError','destroy','isEnemy','paramRate','_targetX','usableSkills','CRI','Input_updateGamepadState','F14','Window_Base_initialize','text','MIN_SAFE_INTEGER','ZOOM','CreateBattleSystemID','param','CommandBgType','down2','tileHeight','targetEvaRate','Bitmap_drawTextOutline','WIN_OEM_BACKTAB','DisplayedParams','invokeCounterAttack','Window_Base_update','_statusParamsWindow','origin','INSINE','STENCIL_BUFFER_BIT','scaleMode','buttonAssistOffset4','style','DigitGroupingStandardText','xparamPlus','_stored_deathColor','showPointAnimations','key%1','traitsPi','_lastCommandSymbol','DataManager_setupNewGame','lineHeight','NumberBgType','isScrollBarVisible','SParamVocab0','ARRAYFUNC','uiAreaWidth','note','isOpen','background','successRate','COMMA','buttonAssistKey5','BTestItems','Scene_MenuBase_mainAreaTop','cancel','Game_Actor_isPreserveTp','trim','Game_Interpreter_updateWaitMode','_bitmap','TitlePicButtons','_lastIconIndex','ButtonFadeSpeed','Window_MapName_refresh','command105','onInputOk','sceneTerminationClearEffects','initCoreEngineScreenShake','pagedown','ImprovedAccuracySystem','PreserveNumbers','createCustomParameter','Scene_Map_updateScene','keyMapper','PRINT','PA1','smooth','RegExp','PictureID','EXR','_centerCameraCheck','_screenX','wholeDuration','itemBackColor1','%2%1%3','Sprite_Animation_processSoundTimings','autoRemovalTiming','eventsXyNt','enableDigitGrouping','startMove','numberShowButton','_iconIndex','_margin','_hideTileShadows','playTestF6','OutlineColor','_dimmerSprite','buyWindowRect','STENCIL_TEST','SideButtons','setupCoreEasing','buttonAssistText3','KeyItemProtect','ATTN','refreshActor','Scene_Status_create','_hideButtons','centerY','get','processKeyboardDigitChange','bodyColor','NUMPAD3','CustomParamNames','params','PDR','Game_BattlerBase_initMembers','removeAnimationFromContainer','itemSuccessRate','isBusy','NUMPAD1','DimColor1','ActorHPColor','ValueJS','IconSParam8','ExportCurMapText','Scene_Map_createSpriteset_detach','Window_Base_drawIcon','destroyContents','Tilemap_addSpotTile','evaluate','animationBaseDelay','isNormalPriority','isMaskingEnabled','ShowButtons','child_process','loadSystem','targetScaleX','〘Show\x20Text〙\x0a','STR','pageup','_baseSprite','_setupEventHandlers','buttonAssistWindowButtonRect','getInputMultiButtonStrings','skillId','Scene_MenuBase_createBackground','framesPerChar','WindowLayer_render','pitch','clone','buttonAssistCancel','Game_Action_numRepeats','IconParam6','this.paramBase(5)','scrollUp','isPreserveTp','MenuBg','drawParamText','SELECT','SParamVocab2','HelpBgType','BlurFilter','IconXParam3','buttonAssistKey4','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','itemHeight','ColorSystem','Input_setupEventHandlers','DTB','450984ltsDVJ','Linear','buttonY','IconXParam5','sparamPlusJS','VOLUME_MUTE','processMoveCommand','getPointAnimationLayer','cursorDown','Game_Picture_scaleX','goto','QoL','TranslucentOpacity','FontShadows','showDevTools','NameMenu','EnableNumberInput','setTargetAnchor','REPLACE','Scene_Map_createMenuButton','MDF','#%1','Page','Game_Picture_y','Window_NumberInput_processDigitChange','ParseActorNotetags','updatePositionCoreEngine','getColor','ExtJS','DigitGroupingExText','setValue','buttonAssistText1','updatePositionCoreEngineShakeHorz','etypeId','commandWindowRows','State-%1-%2','AccuracyBoost','measureTextWidth','loadSystemImages','itemLineRect','isEventRunning','adjustSprite','DrawItemBackgroundJS','OutlineColorGauge','_rate','CorrectSkinBleeding','_lastPluginCommandInterpreter','level','updatePadding','Game_Temp_initialize','_commandList','drawBackgroundRect','xparamRate','checkPlayerLocation','_lastGamepad','updateOrigin','min','getButtonAssistLocation','ACCEPT','bitmapWidth','setViewport','xparamFlat2','actorWindowRect','ShowJS','pictures','MenuLayout','EndingID','cursorUp','_pointAnimationQueue','font-smooth','initButtonHidden','isRepeated','Scene_Name_onInputOk','updateBgsParameters','down','BackOpacity','hide','Game_Actor_levelUp','advanced','process_VisuMZ_CoreEngine_Functions','clearZoom','UNDERSCORE','Scene_MenuBase_helpAreaTop','expRate','buttonAssistSwitch','includes','printError','154695jdmdlU','_customModified','blt','traitObjects','SParameterFormula','fillAll','Game_Map_scrollDown','padding','ctrlKey','initCoreEngine','Window_Base_drawCharacter','sparamRate2','textHeight','GoldRect','enableDigitGroupingEx','ARRAYSTR','MINUS','_lastY','Window_ShopSell_isEnabled','Scene_Boot_updateDocumentTitle','expGaugeColor1','mainCommandWidth','IconParam5','battlebacks2','this.paramBase(4)','left','paramBaseAboveLevel99','TextPopupShow','setAttack','open','windowPadding','deflate','constructor','rgba(0,\x200,\x200,\x200.7)','maxTp','measureText','_windowLayer','defineProperty','_fauxAnimationSprites','mainAreaTop','Scene_Title','hpColor','_stored_crisisColor','ColorExpGauge2','helpAreaTopSideButtonLayout','waiting','Game_BattlerBase_refresh','drawGameSubtitle','tab','setEnemyAction','isCursorMovable','rgba(0,\x200,\x200,\x201.0)','useDigitGroupingEx','process_VisuMZ_CoreEngine_jsQuickFunctions','padZero','inBattle','KANA','GroupDigits','OUTCUBIC','scrollDown','loading','exit','_stored_expGaugeColor2','right','_loadingState','paramName','length','fromCharCode','Game_Interpreter_command111','BarThickness','seek','animationNextDelay','mpGaugeColor2','_phase','EncounterRateMinimum','CategoryBgType','setBattleSystem','mainFontSize','scrollX','axes','buttonAssistText%1','updateOpacity','nah','MAXMP','CheckSplitEscape','editWindowRect','Exported_Script_%1.txt','faceHeight','subjectHitRate','CancelText','Armor-%1-%2','anchorCoreEasing','Game_Picture_calcEasing','isPointAnimationPlaying','_upArrowSprite','loadBitmap','match','none','Center','EREOF','PGDN','initialBattleSystem','INSERT','_coreEasingType','updatePictureCoordinates','textWidth','goldWindowRect','Graphics_centerElement','targetObjects','updateBgmParameters','repositionEnemiesByResolution','Window_NameInput_processHandling','flush','TextStr','processTouch','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','AMPERSAND','_itemWindow','terms','WIN_OEM_CUSEL','isOptionValid','Game_Interpreter_PluginCommand','playCursorSound','LESS_THAN','prototype','originalJS','Graphics_defaultStretchMode','processDigitChange','%1%2','setFrame','img/%1/','ESC','DurationPerChat','keyCode','select','maxCols','removeOnceParallelInterpreter','isTouchedInsideFrame','push','DECIMAL','_stored_powerUpColor','_refreshPauseSign','Bitmap_resize','equips','350500GRvzKM','Untitled','isInstanceOfSceneMap','Flat1','MULTIPLY','innerHeight','DetachBattlePictureContainer','MDR','CNT','onTpbCharged','process_VisuMZ_CoreEngine_CustomParameters','processKeyboardDelete','DigitGroupingDamageSprites','_onLoad','ControllerButtons','checkCoreEngineDisplayCenter','isNumpadPressed','ONE_MINUS_SRC_ALPHA','GoldBgType','VisuMZ_2_BattleSystemPTB','mainAreaTopSideButtonLayout','DetachMapPictureContainer','Game_Event_start','updateScene','PHA','removeAllFauxAnimations','Window_Base_createTextState','FontSmoothing','exp','paramBase','updatePlayTestF7','addAnimationSpriteToContainer','setViewportCoreEngineFix','position','targetBackOpacity','string','TextCodeNicknames','subject','VisuMZ_2_BattleSystemBTB','showIncompleteTilesetError','updateFrameCoreEngine','_logWindow','_gamepadWait','processTouchModernControls','WASD','prepareNextScene','_shakePower','_displayX','maxLvGaugeColor2','ColorNormal','clear','MEV','platform','F11','_anchor','WIN_OEM_FJ_JISHO','_stored_pendingColor','Manual','_index','TargetAngle','createTitleButtons','paramPlus','_animationSprites','setupNewGame','Spriteset_Base_initialize','Window_Selectable_cursorUp','PageChange','getControllerInputButtonMatch','dropItems','WIN_ICO_HELP','MapNameTextCode','Game_Picture_angle','Scene_MenuBase_createCancelButton','strokeRect','adjustX','cursorPagedown','Tilemap_addShadow','outlineColorDmg','consumable','INOUTCUBIC','XParamVocab3','width','VisuMZ_3_EventChainReact','AutoStretch','_lastOrigin','Game_Party_consumeItem','bitmapHeight','isCollidedWithEvents','needsUpdate','INBACK','tilesets','ctGaugeColor1','_pictureName','updateWaitMode','Scene_Map_initialize','Enemy-%1-%2','_battlerName','updateText','Scene_Map_updateMain','tilesetFlags','([\x5c+\x5c-]\x5cd+)>','Type','forceStencil','ETB','consumeItem','_pageupButton','pages','JsReplaceUserVar','WIN_OEM_CLEAR','Version','isUseModernControls','Mute','_image','maxLvGaugeColor1','updateSmoothScroll','CommandRect','buttonAssistOffset1','anglePlus','paramFlatBonus','applyCoreEasing','horizontal','removeChild','markCoreEngineModified','endBattlerActions','openness','tpGaugeColor2','xparam','ActorTPColor','animationShouldMirror','1.3.0','applyForcedGameTroopSettingsCoreEngine','sparam','Window_EquipItem_isEnabled','resetBattleSystem','expParams','mainAreaHeight','AnimationPoint','Padding','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','Item-%1-%2','HRG','IconXParam6','WIN_OEM_FJ_MASSHOU','drawActorIcons','ARRAYEVAL','xdg-open','Game_Picture_initRotation','default','ColorMaxLvGauge1','RPGMAKER_VERSION','backgroundBitmap','StatusEquipBgType','playTestShiftR','jsonToZip','GoldOverlap','requestMotion','SEMICOLON','QUESTION_MARK','_buyWindow','_scrollBarVert','battlebacks1','ScreenShake','_pictureContainer','displayX','EVA','hpGaugeColor2','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','itemWindowRect','_actor','boxHeight','angle','operation','updateDocumentTitle','shift','TextJS','buttonAssistOffset%1','loadWindowskin','animations','isSideButtonLayout','Sprite_destroy','maxScrollX','_pollGamepads','removeAnimation','ExportString','_tpbState','isArrowPressed','GetParamIcon','SystemSetSideView','_targetOffsetY','_optionsWindow','responseText','_categoryWindow','targetSpritePosition','Scene_SingleLoadTransition','BattleManager_checkSubstitute','\x20this.','centerCameraCheckData','_shakeSpeed','Color','ZERO','isEnabled','buttonAssistKey1','_centerElementCoreEngine','levelUp','index','PAUSE','this.paramBase(2)','isMVAnimation','buttonAssistWindowSideRect','outlineColorGauge','canAttack','Settings','removeTileExtendSprites','sparamFlatJS','DELETE','processBack','backOpacity','Keyboard','tilesetNames','INOUTSINE','sparamRate1','ParseWeaponNotetags','itemHitImprovedAccuracy','WIN_OEM_JUMP','bind','PictureEraseRange','_defaultStretchMode','_internalTextures','playMiss','setMainFontSize','clearCachedKeys','Window_Selectable_processTouch','_origin','VOLUME_DOWN','sellWindowRect','loadGameImagesCoreEngine','offOpacity','BTestArmors','center','Symbol','randomInt','missed','toUpperCase','eva','FontWidthFix','_troopId','startAutoNewGame','windowRect','AutoScrollLockY','PixelateImageRendering','SellBgType','onXhrError','PictureShowIcon','VisuMZ_2_BattleSystemFTB','backspace','updateScrollBarVisibility','_scrollDuration','hit','focus','isAnimationOffsetXMirrored','inputWindowRect','Window_Base_destroyContents','connected','sparamRateJS','_opacity','framesMin','ExtractStrFromList','setupBattleTestItems','SystemSetFontSize','_scrollBarHorz','overallWidth','paramFlatJS','Game_Unit_onBattleEnd','Window_NameInput_cursorRight','keyboard','ButtonAssist','volume','Window_StatusBase_drawActorSimpleStatus','_tileExtendTerrainTags','BattleManager_update','gaugeLineHeight','_windowskin','_onceParallelInterpreters','addChildToBack','PictureRotateBy','onButtonImageLoad','drawBackground','_data','skills','checkPassage','_currentBgm','AllTroops','Spriteset_Base_update','STB','_profileWindow','Game_Map_scrollLeft','Window_Selectable_drawBackgroundRect','processCursorMove','sqrt','offColor','categoryWindowRect','_number','_battleField','arePageButtonsEnabled','PictureEraseAll','vert','_encounterCount','isSceneMap','titles2','ExtDisplayedParams','_createInternalTextures','onKeyDownKeysF6F7','currentExp','INQUINT','bgsVolume','Game_Map_scrollRight','useFontWidthFix','Game_Character_processMoveCommand','isTpb','_bgsBuffer','Troop%1','_movementDuration','mainAreaBottom','BgFilename2','mute','createDigits','NONCONVERT','EQUALS','Sprite_Actor_setActorHome','LATIN1','Sprite_Picture_updateOrigin','createDimmerSprite','version','itemEva','CRSEL','battlerHue','optionsWindowRect','filter','_allTextHeight','_bgmBuffer','_scene','measureTextWidthNoRounding','isAnimationForEach','join','numberWindowRect','setupValueFont','removeAllPointAnimations','INOUTBOUNCE','Window_Scrollable_update','%1/','paramValueByName','IconParam0','xScrollLinkedOffset','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','PositionY','SParamVocab6','apply','setup','LoadMenu','_tile','_actorWindow','command357','processPointAnimationRequests','ParseSkillNotetags','_colorCache','updatePositionCoreEngineShakeOriginal','bitmap','TPB\x20ACTIVE','setupTileExtendTerrainTags','setEvent','writeFile','VisuMZ_1_OptionsCore','enabled','_displayY','isMagical','vertical','scrollbar','Scene_Battle_createSpriteset','enemy','targetOpacity','getLastUsedGamepadType','IconXParam9','_backgroundFilter','ExtractStrFromTroop','Finish','hpGaugeColor1','return\x200','CustomParamIcons','XParamVocab2','Max','OUTELASTIC','levelUpRecovery','parameters','SceneManager_exit','call','isTriggered','_startPlaying','F15','Scene_Map_createSpriteset','uiAreaHeight','Rate2','OTB','touchUI','PTB','ParamChange','SLASH','_fauxAnimationQueue','updateScrollBars','SHIFT','Scene_Battle_createSpritesetFix','Map%1.json','isSmartEventCollisionOn','outlineColor','round','JSON','number','isExpGaugeDrawn','pictureButtons','ConvertParams','(\x5cd+)([%％])>','getBackgroundOpacity','context','createContents','27614851iPHMhu','createJsQuickFunction','SLEEP','ONE','update','sparamPlus1','imageSmoothingEnabled','_mapNameWindow','setAnchor','createMenuButton','ColorCrisis','disable','SwitchActorText','Game_Event_isCollidedWithEvents','F19','createCustomBackgroundImages','MRF','this.paramBase(1)','ctrl','renderNoMask','system','offsetY','drawFace','Bitmap_measureTextWidth','sparamFlat2','ARRAYSTRUCT','HOME','targetContentsOpacity','_effectsContainer','Scene_Boot_onDatabaseLoaded','loadTitle2','_stored_systemColor','makeEncounterCount','F17','ExportAllMapText','playCursor','STRUCT','SplitEscape','Scene_TitleTransition','playOk','charging','SceneManager_onKeyDown','Game_Interpreter_command122','ActorRect','BlendMode','innerWidth','gaugeRate','meVolume','_downArrowSprite','ExportCurTroopText','description','CoreEngine','ColorHPGauge1','ShowItemBackground','_sellWindow','Game_Map_scrollUp','_cacheScaleY','ExportAllTroopText','Scene_Map_createSpritesetFix','_commandWindow','ShowActorLevel','_makeFontNameText','Window_Gold_refresh','isEventTest','ceil','slotWindowRect','performMiss','updateShadow','keypress','ControllerMatches','makeCommandList','updateCoreEasing','loadTitle1','setDisplayPos','win32','shouldAutosave','Unnamed','_muteSound','ParseArmorNotetags','Window_NameInput_cursorPageup','endAnimation','_pagedownButton','_addSpotTile','DOWN','zoomScale','buttonAssistText4','initCoreEasing','pointX','Rate1','Subtitle','titleCommandWindow','LINEAR','RequireFocus','Bitmap_drawText','onClick','FTB','isGamepadTriggered','ParseStateNotetags','addLoadListener','contents','createTextState','〘Scrolling\x20Text〙\x0a','_storedStack','Chance','CustomParamType','updateOpen','_saveFileID','CLEAR','MinDuration','INQUART','updateScrollBarPosition','OptionsBgType','SystemLoadAudio','maxScrollbar','MAT','performEscape','_currentBgs','updateClose','Plus','setMute','OUTQUAD','dimColor1','RightMenus','sv_enemies','_stored_hpGaugeColor2','_forcedBattleSys','allowShiftScrolling','ButtonHeight','process_VisuMZ_CoreEngine_Notetags','_commonEventLayers','GameEnd','this.paramBase(0)','DisplayLockY','%1〘Choice\x20%2〙\x20%3%1','buttonAssistKey%1','Scene_Map_shouldAutosave','reserveNewGameCommonEvent','paramPlusJS','SPACE','getInputButtonString','clearTp','remove','CTB','updatePictureAntiZoom','scrollRight','LUK','0.00','close','buttonAssistOk','Bitmap_fillRect','setEasingType','Sprite_Picture_loadBitmap','target','isFullDocumentTitle','processKeyboardHome','checkSubstitute','refreshSpritesetForExtendedTiles','pixelated','Mirror','INOUTEXPO','isGamepadConnected','resize','getCoreEngineScreenShakeStyle','WIN_OEM_FJ_TOUROKU','alpha','dimColor2','_tempActor','_skillTypeWindow','nw.gui','code','ShiftR_Toggle','maxItems','HELP','NUMPAD6','createFauxAnimation','_digitGrouping','smoothSelect','isAlive','_onKeyPress','buttonAssistWindowRect','SystemSetBattleSystem','StatusRect','menu','BlurStrength','Scene_Options_create','Origin','enemies','_clientArea','processAlwaysEscape','_mode','_backSprite2','Game_Battler_initTpbChargeTime','SwitchToggleRange','getCustomBackgroundSettings','setActorHomeRepositioned','log','BattleManager_processEscape','Scene_Item_create','_textQueue','paramRate2','updateDashToggle','isFauxAnimationPlaying','UpdatePictureCoordinates','fillRect','Param','NUM_LOCK','F16','refreshWithTextCodeSupport','DocumentTitleFmt','TextManager_param','item','_tileExtendSprites','playBgs','updateAnchor','mev','OPEN_CURLY_BRACKET','buttonAssistKey3','fillText','commandWindowRect','powerDownColor','VisuMZ_2_BattleSystemOTB','_forcedTroopView','_pictureCoordinatesMode','MainMenu','_baseTexture','OffBarOpacity','loadTileset','onInputBannedWords','up2','Window_StatusBase_drawActorLevel','COLON','selectLast','SellRect','KeyTAB','changeTextColor','processCursorHomeEndTrigger','stencilFunc','%1:\x20Exit\x20','changeTileset','createBuffer','hideButtonFromView','_cancelButton','split','exportAllTroopStrings','drawActorSimpleStatus','_targets','top','_coreEasing','ShowScrollBar','Basic','setupCoreEngine','wtypeId','INCIRC','Script\x20Call\x20Error','XParamVocab9','Flat','getGamepads','charCode','catchNormalError','Scene_Battle_createSpriteset_detach','Sprite_AnimationMV_updatePosition','itemHit','currentClass','atbActive','Window_SkillList_includes','PositionX','playTestShiftT','ListRect','mpCostColor','_dummyWindow','canUse','this.paramBase(3)','send','_targetY','SParamVocab1','NUMPAD8','duration','Spriteset_Base_destroy','Scene_MenuBase_mainAreaHeight','Window_Selectable_cursorDown','standardIconWidth','updateMainMultiply','parse','playOnceParallelInterpreter','Sprite_StateIcon_updateFrame','_pointAnimationSprites','ColorMPCost','ColorTPGauge1','calcEasing','_hp','setBackgroundType','removeFauxAnimation','MAXHP','startShake','name','drawIconBySize','Gold','drawAllParams','attackSkillId','_goldWindow','NewGameBoot','createCancelButton','ScaleX','EISU','EQUAL','Scene_Map_update','Game_Map_changeTileset','Window','paintOpacity','NUMPAD7','paramX','max','Game_Action_updateLastTarget','scaleY','src','setActorHome','Layer','SParamVocab3','Scene_Shop_create','Scene_Base_create','_animation','determineSideButtonLayoutValid','_text','render','_timeDuration','WIN_OEM_RESET','IconSParam1','NameInputMessage','buttonAssistOffset2','updateBackOpacity','createPointAnimationQueue','INCUBIC','_inputString','contentsOpacity','_statusEquipWindow','isBottomHelpMode','toString','createButtonAssistWindow','maxVert','WIN_OEM_WSCTRL','24umZkbk','makeAutoBattleActions','AudioChangeBgsVolume','escape','initMembersCoreEngine','CLOSE_CURLY_BRACKET','_hovered','concat','baseId','ParamArrow','ItemStyle','getControllerInputButtonString','targets','createPointAnimationSprite','_shiftY','Graphics','createScrollBarSprites','playEscape','ADD','LvExpGauge','JUNJA','createPageButtons','createSpriteset','save','integer','actor','filterArea','QwertyLayout','ENTER','10753155UZgWOZ','isTileExtended','_anglePlus','INOUTBACK','_bypassCanCounterCheck','OffBarColor','xparamRate2','_cacheScaleX','itemBackColor2','_stored_expGaugeColor1','\x5c}❪TAB❫\x5c{','setLastGamepadUsed','Bitmap_initialize','PictureCoordinatesMode','addWindow','CallHandlerJS','BuyRect','PositionJS','scale','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','Game_Picture_x','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','applyEasing','RIGHT','shake','_textPopupWindow','OUTSINE','boxWidth','DisplayLockX','scaleX','_addShadow','updatePosition','1.4.4','pressed','FDR','_stored_normalColor','drawCharacter','_stored_tpGaugeColor2','Renderer','OpenURL','allIcons','paramRateJS','add','INBOUNCE','Total','bgmVolume','GRD','deselect','GoldChange','NEAREST','_slotWindow','CustomParamAbb','EVAL','type','_playtestF7Looping','_drawTextBody','INEXPO','EditBgType','ShiftT_Toggle','isMapScrollLinked','_stored_hpGaugeColor1','setMoveEasingType','ALWAYS','Plus1','drawing','removePointAnimation','REC','F22','updateMain','EnableJS','$dataMap','addQueue','setTileFrame','isActor','VisuMZ_2_BattleSystemETB','catchUnknownError','BasicParameterFormula','HelpRect','XParamVocab7','ColorExpGauge1','statusParamsWindowRect','_duration','getParameter','moveRelativeToResolutionChange','stencilOp','maxVisibleItems','ScaleY','_coreEngineShakeStyle','refreshDimmerBitmap','createTroopNote','_stored_mpGaugeColor1','Spriteset_Battle_createEnemies','initMembers','altKey','OUTCIRC','ActorBgType','WIN_OEM_ATTN','updateBattleVariables','DATABASE','title','text%1','onBattleStart','clearStencil','_changingClass','FUNC','getCombinedScrollingText','_scaleX','processHandling','_moveEasingType','bgs','SmartEventCollisionPriority','Scene_MenuBase_createPageButtons','Game_Picture_show','getTileExtendTerrainTags','createCommandWindow','stretch','_displayedPassageError','BuyBgType','Input_clear','addChild','xparamRate1','playtestQuickLoad','Window_NameInput_processTouch','blendFunc','EXSEL','titles1','value','checkSmartEventCollision','Title','SwitchToggleOne','_smooth','blockWidth','setBackgroundOpacity','_destroyInternalTextures','IconParam3','ItemRect','xparamRateJS','InputBgType','Y:\x20%1','currencyUnit','App','RowSpacing','16221EYiQgJ','maxBattleMembers','ARRAYJSON','AnimationMirrorOffset','OPEN_PAREN','drawIcon','refresh','xparamPlus1','BoxMargin','isPlaytest','mirror','MODECHANGE','retrievePointAnimation','Scene_Map_updateMainMultiply','fadeSpeed','Graphics_printError','751635YwAuNI','_repositioned','drawActorExpGauge','setGuard','QUOTE','Control\x20Variables\x20Script\x20Error','clamp','updateFauxAnimations','170XCEccQ','DimColor2','operand','TimeProgress','Sprite_Battler_startMove','FontSize','_forcedBattleGridSystem','isSceneBattle','_mapX','processCursorMoveModernControls','font','onerror','ItemPadding','ItemBgType','SceneManager_isGameActive','_helpWindow','doesNameContainBannedWords','Window_NameInput_initialize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','startNormalGame','setCoreEngineUpdateWindowBg','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','onMoveEnd','ColorTPCost','INOUTQUART','Window_Base_drawFace','ColorTPGauge2','ItemMenu','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','NUMPAD4','_subject','MAX_GL_TEXTURES','_inputWindow','end','buttons','Window_refreshBack','ScreenResolution','paramWidth','_drawTextOutline','_digitGroupingEx','statusWindowRect','itypeId','Game_Picture_initBasic','DEF','CategoryRect','_width','ActorMPColor','fontSize','Game_Troop_setup','learnings','isPhysical','TAB','drawGameVersion','toLowerCase','ColorMaxLvGauge2','ShowDevTools','_centerElement','checkCacheKey','substring','activate','NUMPAD0','createTileExtendSprites','deactivate','ASTERISK','INOUTQUINT','processKeyboardBackspace','OkText','CustomParam','cursorRight','buttonAreaHeight','EnableNameInput','maxPictures','WIN_OEM_ENLW','en-US','updateData','reserveCommonEvent','_numberWindow','Sprite_Button_updateOpacity','Upper\x20Left','PLAY','isAnimationPlaying','NewGameCommonEvent','systemColor','FadeSpeed','_tilemap','EscapeAlways','Window_Selectable_processCursorMove','〘Common\x20Event\x20%1:\x20%2〙\x20End','list','toLocaleString','ApplyEasing','showFauxAnimations','displayY','switchModes','TitleCommandList','status','ShopMenu','Game_Picture_move','_isButtonHidden','expGaugeColor2','updateOnceParallelInterpreters','EXECUTE','resetFontSettings','_stored_maxLvGaugeColor1','skillTypes','_scaleY','findSymbol','SystemLoadImages','xparamFlatBonus','Weapon-%1-%2','Show\x20Scrolling\x20Text\x20Script\x20Error','filters','setupButtonImage','_inBattle','Duration','WIN_OEM_FJ_ROYA','ParseAllNotetags','Scene_Equip_create','%1\x0a','startAnimation','Key%1','events','_srcBitmap','changeClass','》Comment《\x0a%1\x0a','\x5c}❪SHIFT❫\x5c{','\x20Origin:\x20%1','Spriteset_Base_updatePosition'];_0x266f=function(){return _0x397c89;};return _0x266f();}function Scene_QuickLoad(){const _0x1ceb51=_0x5af19b;this[_0x1ceb51(0x8cc)](...arguments);}Scene_QuickLoad[_0x5af19b(0x397)]=Object['create'](Scene_Load[_0x5af19b(0x397)]),Scene_QuickLoad[_0x5af19b(0x397)][_0x5af19b(0x33b)]=Scene_QuickLoad,Scene_QuickLoad[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(){const _0x52ee1e=_0x5af19b;Scene_Load['prototype'][_0x52ee1e(0x8cc)][_0x52ee1e(0x535)](this);},Scene_QuickLoad['prototype'][_0x5af19b(0x92c)]=function(){const _0x21d1bd=_0x5af19b;this[_0x21d1bd(0x8a8)](this[_0x21d1bd(0x5bc)]);},Scene_QuickLoad['prototype']['prepare']=function(_0x2f35e4){const _0x26c497=_0x5af19b;this[_0x26c497(0x5bc)]=_0x2f35e4;},Scene_QuickLoad[_0x5af19b(0x397)][_0x5af19b(0x919)]=function(){const _0x452a61=_0x5af19b;Scene_MenuBase['prototype'][_0x452a61(0x919)]['call'](this);},Scene_GameEnd[_0x5af19b(0x1df)]=VisuMZ['CoreEngine'][_0x5af19b(0x47e)][_0x5af19b(0x305)]['GameEnd'],VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x1e2)]=Scene_GameEnd[_0x5af19b(0x397)][_0x5af19b(0x19f)],Scene_GameEnd[_0x5af19b(0x397)][_0x5af19b(0x19f)]=function(){const _0x2721fa=_0x5af19b;Scene_MenuBase['prototype'][_0x2721fa(0x19f)][_0x2721fa(0x535)](this);},Scene_GameEnd['prototype']['createCommandWindow']=function(){const _0x5300cd=_0x5af19b,_0x50cf50=this[_0x5300cd(0x62c)]();this[_0x5300cd(0x58d)]=new Window_GameEnd(_0x50cf50),this['_commandWindow']['setHandler']('cancel',this[_0x5300cd(0x1dd)][_0x5300cd(0x48b)](this)),this['addWindow'](this[_0x5300cd(0x58d)]),this['_commandWindow'][_0x5300cd(0x674)](Scene_GameEnd[_0x5300cd(0x1df)][_0x5300cd(0x22c)]);},Scene_GameEnd[_0x5af19b(0x397)]['commandWindowRect']=function(){const _0x464408=_0x5af19b;return Scene_GameEnd[_0x464408(0x1df)][_0x464408(0x41e)][_0x464408(0x535)](this);},Scene_Shop[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x305)][_0x5af19b(0x7c9)],VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x690)]=Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x92c)],Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x92c)]=function(){const _0x11c744=_0x5af19b;VisuMZ[_0x11c744(0x585)][_0x11c744(0x690)][_0x11c744(0x535)](this),this[_0x11c744(0x77d)]();},Scene_Shop[_0x5af19b(0x397)]['setCoreEngineUpdateWindowBg']=function(){const _0x2c961f=_0x5af19b;this[_0x2c961f(0x778)]&&this[_0x2c961f(0x778)][_0x2c961f(0x674)](Scene_Shop[_0x2c961f(0x1df)]['HelpBgType']),this[_0x2c961f(0x67d)]&&this['_goldWindow'][_0x2c961f(0x674)](Scene_Shop[_0x2c961f(0x1df)][_0x2c961f(0x3bd)]),this[_0x2c961f(0x58d)]&&this[_0x2c961f(0x58d)][_0x2c961f(0x674)](Scene_Shop[_0x2c961f(0x1df)][_0x2c961f(0x22c)]),this[_0x2c961f(0x65f)]&&this[_0x2c961f(0x65f)][_0x2c961f(0x674)](Scene_Shop[_0x2c961f(0x1df)][_0x2c961f(0x81d)]),this[_0x2c961f(0x7b5)]&&this[_0x2c961f(0x7b5)]['setBackgroundType'](Scene_Shop[_0x2c961f(0x1df)][_0x2c961f(0x245)]),this[_0x2c961f(0x8f7)]&&this[_0x2c961f(0x8f7)][_0x2c961f(0x674)](Scene_Shop[_0x2c961f(0x1df)]['StatusBgType']),this[_0x2c961f(0x449)]&&this[_0x2c961f(0x449)][_0x2c961f(0x674)](Scene_Shop[_0x2c961f(0x1df)][_0x2c961f(0x738)]),this[_0x2c961f(0x46a)]&&this[_0x2c961f(0x46a)][_0x2c961f(0x674)](Scene_Shop['layoutSettings'][_0x2c961f(0x366)]),this['_sellWindow']&&this[_0x2c961f(0x588)][_0x2c961f(0x674)](Scene_Shop[_0x2c961f(0x1df)][_0x2c961f(0x4a5)]);},Scene_Shop['prototype'][_0x5af19b(0x855)]=function(){const _0xf075d0=_0x5af19b;return Scene_Shop['layoutSettings'][_0xf075d0(0x710)][_0xf075d0(0x535)](this);},Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x385)]=function(){const _0x2eb598=_0x5af19b;return Scene_Shop[_0x2eb598(0x1df)][_0x2eb598(0x328)][_0x2eb598(0x535)](this);},Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x62c)]=function(){return Scene_Shop['layoutSettings']['CommandRect']['call'](this);},Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x177)]=function(){const _0x122a46=_0x5af19b;return Scene_Shop[_0x122a46(0x1df)][_0x122a46(0x809)][_0x122a46(0x535)](this);},Scene_Shop['prototype'][_0x5af19b(0x503)]=function(){const _0x2fed01=_0x5af19b;return Scene_Shop[_0x2fed01(0x1df)]['NumberRect'][_0x2fed01(0x535)](this);},Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x791)]=function(){const _0x19281e=_0x5af19b;return Scene_Shop['layoutSettings'][_0x19281e(0x607)]['call'](this);},Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x27c)]=function(){const _0xd0a60f=_0x5af19b;return Scene_Shop['layoutSettings'][_0xd0a60f(0x6d3)]['call'](this);},Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x4d7)]=function(){const _0x437aba=_0x5af19b;return Scene_Shop['layoutSettings'][_0x437aba(0x795)]['call'](this);},Scene_Shop[_0x5af19b(0x397)][_0x5af19b(0x495)]=function(){const _0x5e8e4c=_0x5af19b;return Scene_Shop[_0x5e8e4c(0x1df)][_0x5e8e4c(0x63a)][_0x5e8e4c(0x535)](this);},Scene_Name[_0x5af19b(0x1df)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x305)][_0x5af19b(0x2d3)],VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x816)]=Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x92c)],Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x92c)]=function(){const _0x26df8b=_0x5af19b;VisuMZ['CoreEngine'][_0x26df8b(0x816)][_0x26df8b(0x535)](this),this[_0x26df8b(0x77d)]();},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x77d)]=function(){const _0x3a619e=_0x5af19b;this[_0x3a619e(0x1d8)]&&this[_0x3a619e(0x1d8)][_0x3a619e(0x674)](Scene_Name['layoutSettings'][_0x3a619e(0x6fc)]),this[_0x3a619e(0x789)]&&this[_0x3a619e(0x789)][_0x3a619e(0x674)](Scene_Name[_0x3a619e(0x1df)][_0x3a619e(0x74c)]);},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x370)]=function(){const _0x311d4f=_0x5af19b;return Scene_Name['layoutSettings'][_0x311d4f(0x89b)]['call'](this);},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x4af)]=function(){const _0x145d44=_0x5af19b;return Scene_Name[_0x145d44(0x1df)]['InputRect']['call'](this);},Scene_Name['prototype'][_0x5af19b(0x7af)]=function(){const _0x268c98=_0x5af19b;if(!this[_0x268c98(0x789)])return![];return VisuMZ['CoreEngine'][_0x268c98(0x47e)]['KeyboardInput']['EnableNameInput'];},Scene_Name['prototype']['buttonAssistKey1']=function(){const _0xcee549=_0x5af19b;if(this[_0xcee549(0x7af)]()&&this[_0xcee549(0x789)][_0xcee549(0x60f)]!=='keyboard')return TextManager['getInputMultiButtonStrings'](_0xcee549(0x2a6),_0xcee549(0x25f));return Scene_MenuBase[_0xcee549(0x397)][_0xcee549(0x474)][_0xcee549(0x535)](this);},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x62a)]=function(){const _0x1e240a=_0x5af19b;return this[_0x1e240a(0x7af)]()?TextManager[_0x1e240a(0x5dd)](_0x1e240a(0x34b)):Scene_MenuBase['prototype']['buttonAssistKey3'][_0x1e240a(0x535)](this);},Scene_Name[_0x5af19b(0x397)]['buttonAssistKey4']=function(){const _0x4e4e5e=_0x5af19b;if(this['EnableNameInput']()&&this[_0x4e4e5e(0x789)][_0x4e4e5e(0x60f)]==='keyboard')return TextManager[_0x4e4e5e(0x88d)]([_0x4e4e5e(0x6c2)]);return Scene_MenuBase[_0x4e4e5e(0x397)][_0x4e4e5e(0x2be)][_0x4e4e5e(0x535)](this);},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x24f)]=function(){const _0x200272=_0x5af19b;if(this[_0x200272(0x7af)]()&&this[_0x200272(0x789)]['_mode']===_0x200272(0x4bd))return TextManager[_0x200272(0x88d)](['BKSP']);return Scene_MenuBase['prototype'][_0x200272(0x24f)][_0x200272(0x535)](this);},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x2e3)]=function(){const _0x42a084=_0x5af19b;if(this['EnableNameInput']()&&this['_inputWindow'][_0x42a084(0x60f)]!==_0x42a084(0x4bd)){const _0x381657=VisuMZ[_0x42a084(0x585)][_0x42a084(0x47e)]['KeyboardInput'];return _0x381657[_0x42a084(0x3ed)]||_0x42a084(0x2da);}return Scene_MenuBase[_0x42a084(0x397)]['buttonAssistText1'][_0x42a084(0x535)](this);},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x280)]=function(){const _0x3150c9=_0x5af19b;if(this[_0x3150c9(0x7af)]()){const _0x13f9ae=VisuMZ[_0x3150c9(0x585)][_0x3150c9(0x47e)]['KeyboardInput'];return this[_0x3150c9(0x789)]['_mode']===_0x3150c9(0x4bd)?_0x13f9ae['Keyboard']||_0x3150c9(0x484):_0x13f9ae[_0x3150c9(0x3e4)]||_0x3150c9(0x3e4);}else return Scene_MenuBase[_0x3150c9(0x397)]['buttonAssistText3'][_0x3150c9(0x535)](this);},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x5a7)]=function(){const _0x505955=_0x5af19b;if(this[_0x505955(0x7af)]()){const _0x331061=VisuMZ['CoreEngine'][_0x505955(0x47e)][_0x505955(0x8ad)];if(this[_0x505955(0x789)]['_mode']===_0x505955(0x4bd))return _0x331061[_0x505955(0x52b)]||_0x505955(0x52b);}return Scene_MenuBase[_0x505955(0x397)]['buttonAssistText4']['call'](this);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x30c)]=Scene_Name[_0x5af19b(0x397)]['onInputOk'],Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x25c)]=function(){const _0x489a8f=_0x5af19b;this[_0x489a8f(0x779)]()?this['onInputBannedWords']():VisuMZ[_0x489a8f(0x585)][_0x489a8f(0x30c)]['call'](this);},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x779)]=function(){const _0x137ae8=_0x5af19b,_0xca48b0=VisuMZ['CoreEngine'][_0x137ae8(0x47e)][_0x137ae8(0x8ad)];if(!_0xca48b0)return![];const _0x5072a8=_0xca48b0['BannedWords'];if(!_0x5072a8)return![];const _0x4356de=this[_0x137ae8(0x1d8)]['name']()[_0x137ae8(0x79e)]();for(const _0x395d16 of _0x5072a8){if(_0x4356de['includes'](_0x395d16[_0x137ae8(0x79e)]()))return!![];}return![];},Scene_Name[_0x5af19b(0x397)][_0x5af19b(0x635)]=function(){const _0x2db0c2=_0x5af19b;SoundManager[_0x2db0c2(0x1f6)]();},VisuMZ[_0x5af19b(0x585)]['Scene_Battle_update']=Scene_Battle['prototype']['update'],Scene_Battle[_0x5af19b(0x397)][_0x5af19b(0x556)]=function(){const _0x3073de=_0x5af19b;VisuMZ[_0x3073de(0x585)]['Scene_Battle_update'][_0x3073de(0x535)](this);if($gameTemp[_0x3073de(0x198)])this[_0x3073de(0x3c9)]();},Scene_Battle[_0x5af19b(0x397)][_0x5af19b(0x3c9)]=function(){const _0x4ab98a=_0x5af19b;!BattleManager[_0x4ab98a(0x8a1)]()&&!this[_0x4ab98a(0x6f9)]&&!$gameMessage[_0x4ab98a(0x291)]()&&(this[_0x4ab98a(0x6f9)]=!![],this[_0x4ab98a(0x556)](),SceneManager['updateEffekseer'](),this[_0x4ab98a(0x6f9)]=![]);},VisuMZ[_0x5af19b(0x585)]['Scene_Battle_createCancelButton']=Scene_Battle['prototype'][_0x5af19b(0x67f)],Scene_Battle[_0x5af19b(0x397)][_0x5af19b(0x67f)]=function(){const _0x33d2dc=_0x5af19b;VisuMZ[_0x33d2dc(0x585)][_0x33d2dc(0x1cf)][_0x33d2dc(0x535)](this),SceneManager[_0x33d2dc(0x45d)]()&&this[_0x33d2dc(0x825)]();},Scene_Battle[_0x5af19b(0x397)][_0x5af19b(0x825)]=function(){const _0x25dce8=_0x5af19b;this[_0x25dce8(0x643)]['x']=Graphics[_0x25dce8(0x6de)]+0x4,this['isBottomButtonMode']()?this['_cancelButton']['y']=Graphics[_0x25dce8(0x454)]-this[_0x25dce8(0x7ae)]():this[_0x25dce8(0x643)]['y']=0x0;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x8d4)]=Sprite_Button['prototype']['initialize'],Sprite_Button[_0x5af19b(0x397)]['initialize']=function(_0x5aaba7){const _0x39bf09=_0x5af19b;VisuMZ[_0x39bf09(0x585)][_0x39bf09(0x8d4)][_0x39bf09(0x535)](this,_0x5aaba7),this[_0x39bf09(0x30a)]();},Sprite_Button['prototype'][_0x5af19b(0x30a)]=function(){const _0x398510=_0x5af19b,_0x126161=VisuMZ[_0x398510(0x585)][_0x398510(0x47e)]['UI'];this[_0x398510(0x7cb)]=![];switch(this['_buttonType']){case _0x398510(0x252):this[_0x398510(0x7cb)]=!_0x126161['cancelShowButton'];break;case _0x398510(0x2a6):case _0x398510(0x25f):this['_isButtonHidden']=!_0x126161['pagedownShowButton'];break;case _0x398510(0x30e):case'up':case _0x398510(0x22d):case _0x398510(0x636):case'ok':this['_isButtonHidden']=!_0x126161[_0x398510(0x275)];break;case _0x398510(0x608):this[_0x398510(0x7cb)]=!_0x126161['menuShowButton'];break;}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x7b6)]=Sprite_Button[_0x5af19b(0x397)][_0x5af19b(0x36c)],Sprite_Button[_0x5af19b(0x397)]['updateOpacity']=function(){const _0xa865a6=_0x5af19b;SceneManager['areButtonsHidden']()||this[_0xa865a6(0x7cb)]?this[_0xa865a6(0x642)]():VisuMZ[_0xa865a6(0x585)]['Sprite_Button_updateOpacity'][_0xa865a6(0x535)](this);},Sprite_Button[_0x5af19b(0x397)][_0x5af19b(0x642)]=function(){const _0x1245d4=_0x5af19b;this[_0x1245d4(0x87b)]=![],this[_0x1245d4(0x922)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x1245d4(0x7ff)]*0xa;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x76d)]=Sprite_Battler[_0x5af19b(0x397)][_0x5af19b(0x274)],Sprite_Battler[_0x5af19b(0x397)][_0x5af19b(0x274)]=function(_0x59130f,_0x46e201,_0x8ef0fe){const _0x551aa6=_0x5af19b;(this[_0x551aa6(0x1f7)]!==_0x59130f||this[_0x551aa6(0x467)]!==_0x46e201)&&(this[_0x551aa6(0x700)]('Linear'),this[_0x551aa6(0x91c)]=_0x8ef0fe),VisuMZ[_0x551aa6(0x585)][_0x551aa6(0x76d)][_0x551aa6(0x535)](this,_0x59130f,_0x46e201,_0x8ef0fe);},Sprite_Battler[_0x5af19b(0x397)]['setMoveEasingType']=function(_0xd2e76d){const _0x141b4d=_0x5af19b;this[_0x141b4d(0x72f)]=_0xd2e76d;},Sprite_Battler[_0x5af19b(0x397)][_0x5af19b(0x7f8)]=function(){const _0x5eb593=_0x5af19b;if(this[_0x5eb593(0x4ec)]<=0x0)return;const _0x50cb52=this['_movementDuration'],_0x540e12=this[_0x5eb593(0x91c)],_0x36388d=this[_0x5eb593(0x72f)];this['_offsetX']=this['applyEasing'](this['_offsetX'],this[_0x5eb593(0x1f7)],_0x50cb52,_0x540e12,_0x36388d),this[_0x5eb593(0x817)]=this['applyEasing'](this[_0x5eb593(0x817)],this[_0x5eb593(0x467)],_0x50cb52,_0x540e12,_0x36388d),this[_0x5eb593(0x4ec)]--;if(this[_0x5eb593(0x4ec)]<=0x0)this[_0x5eb593(0x77f)]();},Sprite_Battler['prototype'][_0x5af19b(0x6d9)]=function(_0x4e9126,_0x3ddb84,_0x1aaf67,_0xaa0d0c,_0x4f62b4){const _0x2a84fb=_0x5af19b,_0x13897e=VisuMZ[_0x2a84fb(0x7c3)]((_0xaa0d0c-_0x1aaf67)/_0xaa0d0c,_0x4f62b4||_0x2a84fb(0x2c5)),_0x1af40c=VisuMZ['ApplyEasing']((_0xaa0d0c-_0x1aaf67+0x1)/_0xaa0d0c,_0x4f62b4||'Linear'),_0x53f9be=(_0x4e9126-_0x3ddb84*_0x13897e)/(0x1-_0x13897e);return _0x53f9be+(_0x3ddb84-_0x53f9be)*_0x1af40c;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4f3)]=Sprite_Actor['prototype'][_0x5af19b(0x68d)],Sprite_Actor['prototype']['setActorHome']=function(_0x75eaf3){const _0x29374d=_0x5af19b;VisuMZ[_0x29374d(0x585)][_0x29374d(0x47e)]['UI'][_0x29374d(0x8bf)]?this['setActorHomeRepositioned'](_0x75eaf3):VisuMZ[_0x29374d(0x585)][_0x29374d(0x4f3)][_0x29374d(0x535)](this,_0x75eaf3);},Sprite_Actor['prototype'][_0x5af19b(0x614)]=function(_0x30c1bf){const _0x3c6ada=_0x5af19b;let _0x5c5350=Math[_0x3c6ada(0x548)](Graphics[_0x3c6ada(0x3fc)]/0x2+0xc0);_0x5c5350-=Math[_0x3c6ada(0x1eb)]((Graphics[_0x3c6ada(0x3fc)]-Graphics[_0x3c6ada(0x6de)])/0x2),_0x5c5350+=_0x30c1bf*0x20;let _0x3da453=Graphics[_0x3c6ada(0x7ff)]-0xc8-$gameParty[_0x3c6ada(0x752)]()*0x30;_0x3da453-=Math[_0x3c6ada(0x1eb)]((Graphics['height']-Graphics[_0x3c6ada(0x454)])/0x2),_0x3da453+=_0x30c1bf*0x30,this['setHome'](_0x5c5350,_0x3da453);},Sprite_Actor['prototype']['retreat']=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x5af19b(0x397)][_0x5af19b(0x5c9)]=function(_0x463cc6){const _0x1e1be8=_0x5af19b;this[_0x1e1be8(0x59f)]=_0x463cc6;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x270)]=Sprite_Animation[_0x5af19b(0x397)][_0x5af19b(0x21a)],Sprite_Animation[_0x5af19b(0x397)][_0x5af19b(0x21a)]=function(){const _0x307aab=_0x5af19b;if(this['_muteSound'])return;VisuMZ['CoreEngine'][_0x307aab(0x270)][_0x307aab(0x535)](this);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x7fc)]=Sprite_Animation[_0x5af19b(0x397)]['setViewport'],Sprite_Animation[_0x5af19b(0x397)][_0x5af19b(0x300)]=function(_0x2e72f4){const _0x24c8a0=_0x5af19b;this[_0x24c8a0(0x4ae)]()?this[_0x24c8a0(0x3cb)](_0x2e72f4):VisuMZ[_0x24c8a0(0x585)][_0x24c8a0(0x7fc)][_0x24c8a0(0x535)](this,_0x2e72f4);},Sprite_Animation['prototype'][_0x5af19b(0x4ae)]=function(){const _0x20deec=_0x5af19b;if(!this[_0x20deec(0x692)])return![];const _0x588dc4=this[_0x20deec(0x692)][_0x20deec(0x678)]||'';if(_0x588dc4[_0x20deec(0x37b)](/<MIRROR OFFSET X>/i))return!![];if(_0x588dc4['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine']['Settings']['QoL'][_0x20deec(0x754)];},Sprite_Animation['prototype'][_0x5af19b(0x3cb)]=function(_0x269265){const _0x48e5c0=_0x5af19b,_0x574bf8=this[_0x48e5c0(0x89e)],_0x24b211=this[_0x48e5c0(0x89e)],_0x4e90bf=this[_0x48e5c0(0x692)]['offsetX']*(this['_mirror']?-0x1:0x1)-_0x574bf8/0x2,_0x510e7f=this[_0x48e5c0(0x692)][_0x48e5c0(0x567)]-_0x24b211/0x2,_0x64199a=this['targetPosition'](_0x269265);_0x269265['gl'][_0x48e5c0(0x921)](_0x4e90bf+_0x64199a['x'],_0x510e7f+_0x64199a['y'],_0x574bf8,_0x24b211);},Sprite_Animation['prototype'][_0x5af19b(0x46b)]=function(_0x2048bb){const _0x12ceca=_0x5af19b;if(_0x2048bb['_mainSprite']){}const _0x53b703=this['_animation']['name'];let _0x4c4387=_0x2048bb[_0x12ceca(0x7ff)]*_0x2048bb[_0x12ceca(0x6d5)]['y'],_0x5137a4=0x0,_0x17fa01=-_0x4c4387/0x2;if(_0x53b703[_0x12ceca(0x37b)](/<(?:HEAD|HEADER|TOP)>/i))_0x17fa01=-_0x4c4387;if(_0x53b703[_0x12ceca(0x37b)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x17fa01=0x0;if(this[_0x12ceca(0x692)]['alignBottom'])_0x17fa01=0x0;if(_0x53b703['match'](/<(?:LEFT)>/i))_0x5137a4=-_0x2048bb[_0x12ceca(0x3fc)]/0x2;if(_0x53b703[_0x12ceca(0x37b)](/<(?:RIGHT)>/i))_0x5137a4=_0x2048bb[_0x12ceca(0x3fc)]/0x2;_0x53b703[_0x12ceca(0x37b)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x5137a4=Number(RegExp['$1'])*_0x2048bb[_0x12ceca(0x3fc)]);_0x53b703[_0x12ceca(0x37b)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x17fa01=(0x1-Number(RegExp['$1']))*-_0x4c4387);_0x53b703[_0x12ceca(0x37b)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x5137a4=Number(RegExp['$1'])*_0x2048bb[_0x12ceca(0x3fc)],_0x17fa01=(0x1-Number(RegExp['$2']))*-_0x4c4387);if(_0x53b703[_0x12ceca(0x37b)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x5137a4+=Number(RegExp['$1']);if(_0x53b703[_0x12ceca(0x37b)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x17fa01+=Number(RegExp['$1']);_0x53b703[_0x12ceca(0x37b)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x5137a4+=Number(RegExp['$1']),_0x17fa01+=Number(RegExp['$2']));const _0x1c6003=new Point(_0x5137a4,_0x17fa01);return _0x2048bb['updateTransform'](),_0x2048bb['worldTransform']['apply'](_0x1c6003);},Sprite_AnimationMV[_0x5af19b(0x397)]['setupRate']=function(){const _0x24405e=_0x5af19b;this[_0x24405e(0x2f0)]=VisuMZ['CoreEngine'][_0x24405e(0x47e)][_0x24405e(0x2cf)][_0x24405e(0x803)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x24405e(0x2f0)]=this[_0x24405e(0x2f0)][_0x24405e(0x767)](0x1,0xa);},Sprite_AnimationMV[_0x5af19b(0x397)]['setupCustomRateCoreEngine']=function(){const _0x442400=_0x5af19b;if(!this[_0x442400(0x692)]);const _0x5c0b9a=this[_0x442400(0x692)][_0x442400(0x678)]||'';_0x5c0b9a[_0x442400(0x37b)](/<RATE:[ ](\d+)>/i)&&(this[_0x442400(0x2f0)]=(Number(RegExp['$1'])||0x1)[_0x442400(0x767)](0x1,0xa));},Sprite_AnimationMV[_0x5af19b(0x397)]['setMute']=function(_0x4cb206){const _0x1806dc=_0x5af19b;this[_0x1806dc(0x59f)]=_0x4cb206;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x92a)]=Sprite_AnimationMV[_0x5af19b(0x397)][_0x5af19b(0x212)],Sprite_AnimationMV['prototype'][_0x5af19b(0x212)]=function(_0x3f5f51){const _0x393e0e=_0x5af19b;this[_0x393e0e(0x59f)]&&(_0x3f5f51=JsonEx['makeDeepCopy'](_0x3f5f51),_0x3f5f51['se']&&(_0x3f5f51['se'][_0x393e0e(0x4bf)]=0x0)),VisuMZ[_0x393e0e(0x585)][_0x393e0e(0x92a)]['call'](this,_0x3f5f51);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x656)]=Sprite_AnimationMV[_0x5af19b(0x397)][_0x5af19b(0x6e2)],Sprite_AnimationMV[_0x5af19b(0x397)][_0x5af19b(0x6e2)]=function(){const _0x384d25=_0x5af19b;VisuMZ[_0x384d25(0x585)][_0x384d25(0x656)]['call'](this);if(this[_0x384d25(0x692)][_0x384d25(0x3cc)]===0x3){if(this['x']===0x0)this['x']=Math[_0x384d25(0x548)](Graphics[_0x384d25(0x3fc)]/0x2);if(this['y']===0x0)this['y']=Math[_0x384d25(0x548)](Graphics['height']/0x2);}},Sprite_Damage[_0x5af19b(0x397)][_0x5af19b(0x4f0)]=function(_0x4971b6){const _0x4274c5=_0x5af19b;let _0x54e872=Math['abs'](_0x4971b6)[_0x4274c5(0x6a2)]();this['useDigitGrouping']()&&(_0x54e872=VisuMZ[_0x4274c5(0x354)](_0x54e872));const _0x4152a4=this[_0x4274c5(0x798)](),_0x52f1a1=Math[_0x4274c5(0x1eb)](_0x4152a4*0.75);for(let _0x3fd002=0x0;_0x3fd002<_0x54e872['length'];_0x3fd002++){const _0xb05e7b=this['createChildSprite'](_0x52f1a1,_0x4152a4);_0xb05e7b['bitmap'][_0x4274c5(0x82b)](_0x54e872[_0x3fd002],0x0,0x0,_0x52f1a1,_0x4152a4,_0x4274c5(0x499)),_0xb05e7b['x']=(_0x3fd002-(_0x54e872['length']-0x1)/0x2)*_0x52f1a1,_0xb05e7b['dy']=-_0x3fd002;}},Sprite_Damage[_0x5af19b(0x397)][_0x5af19b(0x214)]=function(){const _0x1ac20e=_0x5af19b;return VisuMZ[_0x1ac20e(0x585)]['Settings']['QoL'][_0x1ac20e(0x3b7)];},Sprite_Damage[_0x5af19b(0x397)][_0x5af19b(0x84a)]=function(){const _0x455b32=_0x5af19b;return ColorManager[_0x455b32(0x3f8)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x841)]=Sprite_Gauge[_0x5af19b(0x397)][_0x5af19b(0x580)],Sprite_Gauge[_0x5af19b(0x397)]['gaugeRate']=function(){const _0x507016=_0x5af19b;return VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate'][_0x507016(0x535)](this)[_0x507016(0x767)](0x0,0x1);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x94b)]=Sprite_Gauge[_0x5af19b(0x397)]['currentValue'],Sprite_Gauge['prototype']['currentValue']=function(){const _0x1b5708=_0x5af19b;let _0x551467=VisuMZ[_0x1b5708(0x585)][_0x1b5708(0x94b)][_0x1b5708(0x535)](this);return _0x551467;},Sprite_Gauge[_0x5af19b(0x397)][_0x5af19b(0x8e7)]=function(){const _0xda1d3c=_0x5af19b;let _0x593f0b=this['currentValue']();this[_0xda1d3c(0x214)]()&&(_0x593f0b=VisuMZ[_0xda1d3c(0x354)](_0x593f0b));const _0x3505b2=this[_0xda1d3c(0x2ff)]()-0x1,_0x4434a5=this[_0xda1d3c(0x327)]?this[_0xda1d3c(0x327)]():this[_0xda1d3c(0x401)]();this[_0xda1d3c(0x504)](),this[_0xda1d3c(0x519)][_0xda1d3c(0x82b)](_0x593f0b,0x0,0x0,_0x3505b2,_0x4434a5,_0xda1d3c(0x35a));},Sprite_Gauge[_0x5af19b(0x397)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x5af19b(0x397)][_0x5af19b(0x214)]=function(){const _0x3d1979=_0x5af19b;return VisuMZ[_0x3d1979(0x585)][_0x3d1979(0x47e)]['QoL']['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x5af19b(0x397)][_0x5af19b(0x84a)]=function(){return ColorManager['outlineColorGauge']();},Sprite_StateIcon['NON_FRAME']=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['UI'][_0x5af19b(0x924)]??!![],VisuMZ['CoreEngine']['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x5af19b(0x397)][_0x5af19b(0x37a)],Sprite_StateIcon[_0x5af19b(0x397)][_0x5af19b(0x37a)]=function(){const _0x339eb0=_0x5af19b;Sprite_StateIcon[_0x339eb0(0x801)]?this[_0x339eb0(0x823)]():VisuMZ[_0x339eb0(0x585)]['Sprite_StateIcon_loadBitmap']['call'](this);},Sprite_StateIcon[_0x5af19b(0x397)]['loadBitmapCoreEngine']=function(){const _0x16ebb2=_0x5af19b;this[_0x16ebb2(0x519)]=new Bitmap(ImageManager[_0x16ebb2(0x1ac)],ImageManager[_0x16ebb2(0x8ba)]),this['_srcBitmap']=ImageManager[_0x16ebb2(0x2a2)]('IconSet');},VisuMZ['CoreEngine']['Sprite_StateIcon_updateFrame']=Sprite_StateIcon['prototype']['updateFrame'],Sprite_StateIcon[_0x5af19b(0x397)][_0x5af19b(0x15d)]=function(){const _0x6b0ad9=_0x5af19b;Sprite_StateIcon[_0x6b0ad9(0x801)]?this[_0x6b0ad9(0x3d3)]():VisuMZ[_0x6b0ad9(0x585)][_0x6b0ad9(0x66e)]['call'](this);},Sprite_StateIcon[_0x5af19b(0x397)][_0x5af19b(0x3d3)]=function(){const _0x1d7dd8=_0x5af19b;if(this[_0x1d7dd8(0x258)]===this['_iconIndex'])return;this['_lastIconIndex']=this['_iconIndex'];const _0x4f6b17=ImageManager[_0x1d7dd8(0x1ac)],_0x2262c8=ImageManager[_0x1d7dd8(0x8ba)],_0x50738c=this[_0x1d7dd8(0x276)]%0x10*_0x4f6b17,_0x15bae0=Math[_0x1d7dd8(0x1eb)](this[_0x1d7dd8(0x276)]/0x10)*_0x2262c8,_0x166b9b=this[_0x1d7dd8(0x7e3)],_0xdcfd36=this[_0x1d7dd8(0x519)];_0xdcfd36['clear'](),_0xdcfd36[_0x1d7dd8(0x31d)](_0x166b9b,_0x50738c,_0x15bae0,_0x4f6b17,_0x2262c8,0x0,0x0,_0xdcfd36[_0x1d7dd8(0x3fc)],_0xdcfd36[_0x1d7dd8(0x7ff)]);},VisuMZ['CoreEngine'][_0x5af19b(0x5e9)]=Sprite_Picture[_0x5af19b(0x397)]['loadBitmap'],Sprite_Picture[_0x5af19b(0x397)][_0x5af19b(0x37a)]=function(){const _0x11289e=_0x5af19b;this[_0x11289e(0x407)]&&this[_0x11289e(0x407)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x11289e(0x8bb)](Number(RegExp['$1'])):VisuMZ[_0x11289e(0x585)][_0x11289e(0x5e9)][_0x11289e(0x535)](this);},Sprite_Picture[_0x5af19b(0x397)][_0x5af19b(0x8bb)]=function(_0x43e4bd){const _0x385b6b=_0x5af19b,_0x398a09=ImageManager[_0x385b6b(0x1ac)],_0x15c490=ImageManager['iconHeight'],_0x306439=this[_0x385b6b(0x407)][_0x385b6b(0x37b)](/SMOOTH/i);this[_0x385b6b(0x519)]=new Bitmap(_0x398a09,_0x15c490);const _0x66c587=ImageManager['loadSystem'](_0x385b6b(0x21b)),_0x4815d8=_0x43e4bd%0x10*_0x398a09,_0x26b889=Math['floor'](_0x43e4bd/0x10)*_0x15c490;this[_0x385b6b(0x519)][_0x385b6b(0x267)]=_0x306439,this[_0x385b6b(0x519)][_0x385b6b(0x31d)](_0x66c587,_0x4815d8,_0x26b889,_0x398a09,_0x15c490,0x0,0x0,_0x398a09,_0x15c490);};function Sprite_TitlePictureButton(){const _0x5b62be=_0x5af19b;this[_0x5b62be(0x8cc)](...arguments);}Sprite_TitlePictureButton[_0x5af19b(0x397)]=Object['create'](Sprite_Clickable[_0x5af19b(0x397)]),Sprite_TitlePictureButton[_0x5af19b(0x397)][_0x5af19b(0x33b)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype']['initialize']=function(_0xa8fac8){const _0x333ac0=_0x5af19b;Sprite_Clickable['prototype'][_0x333ac0(0x8cc)]['call'](this),this[_0x333ac0(0x4ca)]=_0xa8fac8,this[_0x333ac0(0x8eb)]=null,this[_0x333ac0(0x510)]();},Sprite_TitlePictureButton['prototype'][_0x5af19b(0x510)]=function(){const _0x158a5d=_0x5af19b;this['x']=Graphics[_0x158a5d(0x3fc)],this['y']=Graphics[_0x158a5d(0x7ff)],this[_0x158a5d(0x87b)]=![],this[_0x158a5d(0x7d9)]();},Sprite_TitlePictureButton[_0x5af19b(0x397)][_0x5af19b(0x7d9)]=function(){const _0x2996e5=_0x5af19b;this[_0x2996e5(0x519)]=ImageManager['loadPicture'](this['_data'][_0x2996e5(0x157)]),this[_0x2996e5(0x519)][_0x2996e5(0x5b4)](this[_0x2996e5(0x4c8)][_0x2996e5(0x48b)](this));},Sprite_TitlePictureButton[_0x5af19b(0x397)][_0x5af19b(0x4c8)]=function(){const _0x14adbc=_0x5af19b;this[_0x14adbc(0x4ca)]['OnLoadJS'][_0x14adbc(0x535)](this),this[_0x14adbc(0x4ca)][_0x14adbc(0x6d4)][_0x14adbc(0x535)](this),this[_0x14adbc(0x216)](this[_0x14adbc(0x4ca)][_0x14adbc(0x6d2)][_0x14adbc(0x48b)](this));},Sprite_TitlePictureButton[_0x5af19b(0x397)]['update']=function(){const _0x41b61e=_0x5af19b;Sprite_Clickable[_0x41b61e(0x397)][_0x41b61e(0x556)][_0x41b61e(0x535)](this),this[_0x41b61e(0x36c)](),this[_0x41b61e(0x38d)]();},Sprite_TitlePictureButton[_0x5af19b(0x397)]['fadeSpeed']=function(){const _0x224608=_0x5af19b;return VisuMZ[_0x224608(0x585)][_0x224608(0x47e)][_0x224608(0x305)]['Title'][_0x224608(0x259)];},Sprite_TitlePictureButton[_0x5af19b(0x397)][_0x5af19b(0x36c)]=function(){const _0x39f7c0=_0x5af19b;this[_0x39f7c0(0x19b)]||this[_0x39f7c0(0x6ac)]?this[_0x39f7c0(0x922)]=0xff:(this[_0x39f7c0(0x922)]+=this['visible']?this[_0x39f7c0(0x75f)]():-0x1*this[_0x39f7c0(0x75f)](),this[_0x39f7c0(0x922)]=Math[_0x39f7c0(0x2fc)](0xc0,this[_0x39f7c0(0x922)]));},Sprite_TitlePictureButton[_0x5af19b(0x397)][_0x5af19b(0x216)]=function(_0x156c36){const _0x306777=_0x5af19b;this[_0x306777(0x8eb)]=_0x156c36;},Sprite_TitlePictureButton['prototype'][_0x5af19b(0x5b0)]=function(){const _0x2eae4e=_0x5af19b;this[_0x2eae4e(0x8eb)]&&this['_clickHandler']();};function Sprite_ExtendedTile(){const _0x43b4a8=_0x5af19b;this[_0x43b4a8(0x8cc)](...arguments);}Sprite_ExtendedTile[_0x5af19b(0x397)]=Object[_0x5af19b(0x92c)](Sprite[_0x5af19b(0x397)]),Sprite_ExtendedTile[_0x5af19b(0x397)][_0x5af19b(0x33b)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(_0x3652ac,_0x23a895,_0x4f90b2,_0xc28849){const _0x38331a=_0x5af19b;this[_0x38331a(0x6b4)]=Game_CharacterBase[_0x38331a(0x907)]||-0x6,this[_0x38331a(0x771)]=_0x3652ac,this[_0x38331a(0x929)]=_0x23a895,this['_tile']=_0x4f90b2,this['_patternHeight']=_0xc28849,Sprite[_0x38331a(0x397)][_0x38331a(0x8cc)]['call'](this),this[_0x38331a(0x87e)](),this[_0x38331a(0x170)](),this[_0x38331a(0x70b)](),this['update']();},Sprite_ExtendedTile['prototype']['createSubSprite']=function(){const _0x36a3a6=_0x5af19b;this[_0x36a3a6(0x82a)]=new Sprite(),this[_0x36a3a6(0x82a)]['anchor']['x']=0.5,this['_tileSprite'][_0x36a3a6(0x90c)]['y']=0x1,this[_0x36a3a6(0x82a)]['y']=-this[_0x36a3a6(0x6b4)]+0x1,this[_0x36a3a6(0x73a)](this[_0x36a3a6(0x82a)]);},Sprite_ExtendedTile[_0x5af19b(0x397)][_0x5af19b(0x170)]=function(){const _0x4cb83e=_0x5af19b,_0xab1902=$gameMap[_0x4cb83e(0x15b)](),_0x41f578=0x5+Math[_0x4cb83e(0x1eb)](this[_0x4cb83e(0x512)]/0x100);this[_0x4cb83e(0x82a)][_0x4cb83e(0x519)]=ImageManager[_0x4cb83e(0x634)](_0xab1902[_0x4cb83e(0x485)][_0x41f578]);},Sprite_ExtendedTile['prototype'][_0x5af19b(0x70b)]=function(){const _0x138bfe=_0x5af19b,_0x1a5fab=this['_tile'],_0x4ba12c=$gameMap['tileWidth'](),_0x55e20d=$gameMap[_0x138bfe(0x22e)](),_0x720724=(Math[_0x138bfe(0x1eb)](_0x1a5fab/0x80)%0x2*0x8+_0x1a5fab%0x8)*_0x4ba12c,_0x3b0c02=Math['floor'](_0x1a5fab%0x100/0x8)%0x10*_0x55e20d,_0x3ca36e=this[_0x138bfe(0x908)]*_0x55e20d;this['_tileSprite'][_0x138bfe(0x39c)](_0x720724,_0x3b0c02-_0x3ca36e,_0x4ba12c,_0x55e20d+_0x3ca36e);},Sprite_ExtendedTile[_0x5af19b(0x397)][_0x5af19b(0x556)]=function(){const _0x1d4ea2=_0x5af19b;Sprite[_0x1d4ea2(0x397)][_0x1d4ea2(0x556)][_0x1d4ea2(0x535)](this),this['updatePosition']();},Sprite_ExtendedTile['prototype']['updatePosition']=function(){const _0x27f3b3=_0x5af19b,_0x422ea8=$gameMap[_0x27f3b3(0x147)](),_0x31922c=$gameMap[_0x27f3b3(0x22e)](),_0x215bff=this[_0x27f3b3(0x771)],_0x580aaa=this[_0x27f3b3(0x929)];this['x']=Math[_0x27f3b3(0x1eb)](($gameMap[_0x27f3b3(0x3f5)](_0x215bff)+0.5)*_0x422ea8),this['y']=Math[_0x27f3b3(0x1eb)](($gameMap['adjustY'](_0x580aaa)+0x1)*_0x31922c)+this['_shiftY']-0x1;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x3eb)]=Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x8cc)],Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(){const _0x33ed3f=_0x5af19b;VisuMZ['CoreEngine'][_0x33ed3f(0x3eb)][_0x33ed3f(0x535)](this),this[_0x33ed3f(0x6aa)]();},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x6aa)]=function(){const _0x461906=_0x5af19b;this[_0x461906(0x341)]=[],this[_0x461906(0x66f)]=[],this[_0x461906(0x6ca)]=this[_0x461906(0x6d5)]['x'],this[_0x461906(0x58a)]=this[_0x461906(0x6d5)]['y'];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x667)]=Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x21e)],Spriteset_Base['prototype'][_0x5af19b(0x21e)]=function(_0x3e9fee){const _0x321fdb=_0x5af19b;this[_0x321fdb(0x3c4)](),this['removeAllPointAnimations'](),VisuMZ[_0x321fdb(0x585)][_0x321fdb(0x667)][_0x321fdb(0x535)](this,_0x3e9fee);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4cf)]=Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x556)],Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x556)]=function(){const _0x394d28=_0x5af19b;VisuMZ['CoreEngine'][_0x394d28(0x4cf)]['call'](this),this[_0x394d28(0x807)](),this[_0x394d28(0x5e1)](),this[_0x394d28(0x768)](),this['updatePointAnimations']();},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x807)]=function(){},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x5e1)]=function(){const _0x344f2d=_0x5af19b;if(!VisuMZ['CoreEngine'][_0x344f2d(0x47e)][_0x344f2d(0x2cf)]['AntiZoomPictures'])return;if(this[_0x344f2d(0x6ca)]===this[_0x344f2d(0x6d5)]['x']&&this['_cacheScaleY']===this[_0x344f2d(0x6d5)]['y'])return;this[_0x344f2d(0x846)](),this['_cacheScaleX']=this[_0x344f2d(0x6d5)]['x'],this[_0x344f2d(0x58a)]=this[_0x344f2d(0x6d5)]['y'];},Spriteset_Base[_0x5af19b(0x397)]['adjustPictureAntiZoom']=function(){const _0x5e291e=_0x5af19b;if(SceneManager[_0x5e291e(0x4de)]()&&Spriteset_Map[_0x5e291e(0x8d2)])return;else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle[_0x5e291e(0x8d2)])return;}this[_0x5e291e(0x6d5)]['x']!==0x0&&(this[_0x5e291e(0x44d)][_0x5e291e(0x6d5)]['x']=0x1/this[_0x5e291e(0x6d5)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x5e291e(0x6d5)]['x'])),this[_0x5e291e(0x6d5)]['y']!==0x0&&(this[_0x5e291e(0x44d)][_0x5e291e(0x6d5)]['y']=0x1/this['scale']['y'],this[_0x5e291e(0x44d)]['y']=-(this['y']/this[_0x5e291e(0x6d5)]['y']));},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x7e8)]=Spriteset_Base['prototype'][_0x5af19b(0x6e2)],Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x6e2)]=function(){const _0x1af4f1=_0x5af19b;VisuMZ[_0x1af4f1(0x585)][_0x1af4f1(0x7e8)][_0x1af4f1(0x535)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x2de)]=function(){const _0x4c68a1=_0x5af19b;if(!$gameScreen)return;if($gameScreen[_0x4c68a1(0x81e)]<=0x0)return;this['x']-=Math[_0x4c68a1(0x548)]($gameScreen['shake']());const _0x42e867=$gameScreen[_0x4c68a1(0x5f4)]();switch($gameScreen[_0x4c68a1(0x5f4)]()){case _0x4c68a1(0x886):this['updatePositionCoreEngineShakeOriginal']();break;case _0x4c68a1(0x423):this[_0x4c68a1(0x2e4)]();break;case _0x4c68a1(0x522):this[_0x4c68a1(0x178)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base['prototype'][_0x5af19b(0x518)]=function(){const _0x112a14=_0x5af19b,_0x160ec0=VisuMZ[_0x112a14(0x585)][_0x112a14(0x47e)][_0x112a14(0x44c)];if(_0x160ec0&&_0x160ec0[_0x112a14(0x398)])return _0x160ec0['originalJS']['call'](this);this['x']+=Math[_0x112a14(0x548)]($gameScreen[_0x112a14(0x6db)]());},Spriteset_Base[_0x5af19b(0x397)]['updatePositionCoreEngineShakeRand']=function(){const _0x4ba55e=_0x5af19b,_0x102ff3=VisuMZ[_0x4ba55e(0x585)][_0x4ba55e(0x47e)][_0x4ba55e(0x44c)];if(_0x102ff3&&_0x102ff3['randomJS'])return _0x102ff3['randomJS'][_0x4ba55e(0x535)](this);const _0x33cf94=$gameScreen[_0x4ba55e(0x3d9)]*0.75,_0x32631c=$gameScreen[_0x4ba55e(0x470)]*0.6,_0x4b8d02=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math['randomInt'](_0x33cf94)-Math['randomInt'](_0x32631c))*(Math['min'](_0x4b8d02,0x1e)*0.5),this['y']+=Math[_0x4ba55e(0x548)](Math[_0x4ba55e(0x49b)](_0x33cf94)-Math[_0x4ba55e(0x49b)](_0x32631c))*(Math[_0x4ba55e(0x2fc)](_0x4b8d02,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x44be8e=_0x5af19b,_0x495a57=VisuMZ['CoreEngine'][_0x44be8e(0x47e)]['ScreenShake'];if(_0x495a57&&_0x495a57['horzJS'])return _0x495a57[_0x44be8e(0x8e0)][_0x44be8e(0x535)](this);const _0x5acf67=$gameScreen[_0x44be8e(0x3d9)]*0.75,_0x33196a=$gameScreen[_0x44be8e(0x470)]*0.6,_0x31c216=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math[_0x44be8e(0x49b)](_0x5acf67)-Math['randomInt'](_0x33196a))*(Math['min'](_0x31c216,0x1e)*0.5);},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x178)]=function(){const _0x502498=_0x5af19b,_0x1f6c5f=VisuMZ['CoreEngine'][_0x502498(0x47e)]['ScreenShake'];if(_0x1f6c5f&&_0x1f6c5f[_0x502498(0x7f2)])return _0x1f6c5f[_0x502498(0x7f2)][_0x502498(0x535)](this);const _0x20ee3b=$gameScreen['_shakePower']*0.75,_0x520244=$gameScreen[_0x502498(0x470)]*0.6,_0x26c6e2=$gameScreen['_shakeDuration'];this['y']+=Math[_0x502498(0x548)](Math[_0x502498(0x49b)](_0x20ee3b)-Math[_0x502498(0x49b)](_0x520244))*(Math[_0x502498(0x2fc)](_0x26c6e2,0x1e)*0.5);},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x768)]=function(){const _0x195b54=_0x5af19b;for(const _0x174236 of this[_0x195b54(0x341)]){!_0x174236[_0x195b54(0x7f3)]()&&this['removeFauxAnimation'](_0x174236);}this[_0x195b54(0x8c5)]();},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x8c5)]=function(){const _0x32bb79=_0x5af19b;for(;;){const _0xe73dd1=$gameTemp[_0x32bb79(0x206)]();if(_0xe73dd1)this[_0x32bb79(0x600)](_0xe73dd1);else break;}},Spriteset_Base['prototype'][_0x5af19b(0x600)]=function(_0xf2ac8d){const _0x37ec7c=_0x5af19b,_0x23b8a3=$dataAnimations[_0xf2ac8d[_0x37ec7c(0x213)]],_0x293793=_0xf2ac8d[_0x37ec7c(0x6b2)],_0x30f6e7=_0xf2ac8d[_0x37ec7c(0x75b)],_0x3f2b76=_0xf2ac8d[_0x37ec7c(0x4ef)];let _0x4b41fb=this[_0x37ec7c(0x29d)]();const _0x2f9823=this[_0x37ec7c(0x362)]();if(this[_0x37ec7c(0x501)](_0x23b8a3))for(const _0x589390 of _0x293793){this['createFauxAnimationSprite']([_0x589390],_0x23b8a3,_0x30f6e7,_0x4b41fb,_0x3f2b76),_0x4b41fb+=_0x2f9823;}else this[_0x37ec7c(0x92d)](_0x293793,_0x23b8a3,_0x30f6e7,_0x4b41fb,_0x3f2b76);},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x1aa)]=function(_0x3aad18,_0xdb1c2f,_0x23876c,_0x470f87){const _0xfcb120=_0x5af19b,_0x5c8500=this[_0xfcb120(0x47a)](_0xdb1c2f),_0x4d6f73=new(_0x5c8500?Sprite_AnimationMV:Sprite_Animation)(),_0x21de2d=this[_0xfcb120(0x18e)](_0x3aad18),_0x2ce731=this['animationBaseDelay'](),_0x4108de=_0x470f87>_0x2ce731?this[_0xfcb120(0x152)]():null;this[_0xfcb120(0x42b)](_0x3aad18[0x0])&&(_0x23876c=!_0x23876c),_0x4d6f73[_0xfcb120(0x387)]=_0x3aad18,_0x4d6f73[_0xfcb120(0x510)](_0x21de2d,_0xdb1c2f,_0x23876c,_0x470f87,_0x4108de),this[_0xfcb120(0x3ca)](_0x4d6f73),this[_0xfcb120(0x3e9)][_0xfcb120(0x3a5)](_0x4d6f73);},Spriteset_Base['prototype']['createFauxAnimationSprite']=function(_0x4f54ad,_0x58696a,_0x456db6,_0x313270,_0xc519e){const _0x3382c0=_0x5af19b,_0x3eba3f=this['isMVAnimation'](_0x58696a),_0x1d155f=new(_0x3eba3f?Sprite_AnimationMV:Sprite_Animation)(),_0x31970d=this[_0x3382c0(0x18e)](_0x4f54ad);this[_0x3382c0(0x42b)](_0x4f54ad[0x0])&&(_0x456db6=!_0x456db6);_0x1d155f[_0x3382c0(0x387)]=_0x4f54ad,_0x1d155f[_0x3382c0(0x510)](_0x31970d,_0x58696a,_0x456db6,_0x313270),_0x1d155f[_0x3382c0(0x5c9)](_0xc519e),this['addAnimationSpriteToContainer'](_0x1d155f);if(this[_0x3382c0(0x3e9)])this[_0x3382c0(0x3e9)][_0x3382c0(0x5df)](_0x1d155f);this['_fauxAnimationSprites'][_0x3382c0(0x3a5)](_0x1d155f);},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x3ca)]=function(_0x42a752){const _0x187f11=_0x5af19b;this[_0x187f11(0x56e)][_0x187f11(0x73a)](_0x42a752);},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x461)]=function(_0x495660){const _0x5ada1f=_0x5af19b;this['_animationSprites'][_0x5ada1f(0x5df)](_0x495660),this[_0x5ada1f(0x28f)](_0x495660);for(const _0x15e6d8 of _0x495660[_0x5ada1f(0x387)]){_0x15e6d8[_0x5ada1f(0x5a2)]&&_0x15e6d8['endAnimation']();}_0x495660[_0x5ada1f(0x21e)]();},Spriteset_Base['prototype'][_0x5af19b(0x675)]=function(_0x4563b7){const _0x47534a=_0x5af19b;this[_0x47534a(0x341)][_0x47534a(0x5df)](_0x4563b7),this['removeAnimationFromContainer'](_0x4563b7);for(const _0x29cee5 of _0x4563b7[_0x47534a(0x387)]){_0x29cee5['endAnimation']&&_0x29cee5[_0x47534a(0x5a2)]();}_0x4563b7[_0x47534a(0x21e)]();},Spriteset_Base[_0x5af19b(0x397)]['removeAnimationFromContainer']=function(_0x215d69){const _0x3afa90=_0x5af19b;this[_0x3afa90(0x56e)][_0x3afa90(0x424)](_0x215d69);},Spriteset_Base['prototype'][_0x5af19b(0x3c4)]=function(){const _0x36363a=_0x5af19b;for(const _0x1a03b4 of this[_0x36363a(0x341)]){this[_0x36363a(0x675)](_0x1a03b4);}},Spriteset_Base['prototype'][_0x5af19b(0x61b)]=function(){const _0x3ad582=_0x5af19b;return this[_0x3ad582(0x341)][_0x3ad582(0x35d)]>0x0;},Spriteset_Base[_0x5af19b(0x397)]['updatePointAnimations']=function(){const _0xee1b1d=_0x5af19b;for(const _0x2c274c of this[_0xee1b1d(0x66f)]){!_0x2c274c[_0xee1b1d(0x7f3)]()&&this[_0xee1b1d(0x704)](_0x2c274c);}this[_0xee1b1d(0x515)]();},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x515)]=function(){const _0x23315c=_0x5af19b;for(;;){const _0x36600e=$gameTemp[_0x23315c(0x75d)]();if(_0x36600e)this[_0x23315c(0x7f7)](_0x36600e);else break;}},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x7f7)]=function(_0x119e51){const _0x5cd7d6=_0x5af19b,_0x39fb64=$dataAnimations[_0x119e51[_0x5cd7d6(0x213)]],_0x3d87bd=this[_0x5cd7d6(0x19e)](_0x119e51),_0x1706ce=_0x119e51['mirror'],_0x9e83f4=_0x119e51[_0x5cd7d6(0x4ef)];let _0xa5f5db=this[_0x5cd7d6(0x29d)]();const _0x109717=this[_0x5cd7d6(0x362)]();if(this[_0x5cd7d6(0x501)](_0x39fb64))for(const _0x35f11e of _0x3d87bd){this[_0x5cd7d6(0x6b3)]([_0x35f11e],_0x39fb64,_0x1706ce,_0xa5f5db,_0x9e83f4),_0xa5f5db+=_0x109717;}else this[_0x5cd7d6(0x6b3)](_0x3d87bd,_0x39fb64,_0x1706ce,_0xa5f5db,_0x9e83f4);},Spriteset_Base['prototype']['createPointAnimationTargets']=function(_0x379765){const _0x4682a7=_0x5af19b,_0x52eee4=new Sprite_Clickable(),_0x15cb2b=this[_0x4682a7(0x2cb)]();_0x52eee4['x']=_0x379765['x']-_0x15cb2b['x'],_0x52eee4['y']=_0x379765['y']-_0x15cb2b['y'],_0x52eee4['z']=0x64;const _0x209a53=this[_0x4682a7(0x2cb)]();return _0x209a53[_0x4682a7(0x73a)](_0x52eee4),[_0x52eee4];},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x2cb)]=function(){return this;},Spriteset_Map[_0x5af19b(0x397)][_0x5af19b(0x2cb)]=function(){const _0x445171=_0x5af19b;return this[_0x445171(0x7bd)]||this;},Spriteset_Battle[_0x5af19b(0x397)][_0x5af19b(0x2cb)]=function(){const _0x5b04b6=_0x5af19b;return this[_0x5b04b6(0x4d9)]||this;},Spriteset_Base[_0x5af19b(0x397)]['createPointAnimationSprite']=function(_0x33424a,_0x54ef14,_0x4c25d9,_0x121890,_0x493f6c){const _0x4b215e=_0x5af19b,_0x5ad5e1=this[_0x4b215e(0x47a)](_0x54ef14),_0x2ab947=new(_0x5ad5e1?Sprite_AnimationMV:Sprite_Animation)();_0x2ab947['targetObjects']=_0x33424a,_0x2ab947[_0x4b215e(0x510)](_0x33424a,_0x54ef14,_0x4c25d9,_0x121890),_0x2ab947['setMute'](_0x493f6c),this[_0x4b215e(0x3ca)](_0x2ab947),this['_pointAnimationSprites'][_0x4b215e(0x3a5)](_0x2ab947);},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x704)]=function(_0x313c17){const _0xd3db93=_0x5af19b;this[_0xd3db93(0x66f)]['remove'](_0x313c17),this[_0xd3db93(0x56e)][_0xd3db93(0x424)](_0x313c17);for(const _0x53b487 of _0x313c17[_0xd3db93(0x387)]){_0x53b487[_0xd3db93(0x5a2)]&&_0x53b487['endAnimation']();const _0x77dfc1=this[_0xd3db93(0x2cb)]();if(_0x77dfc1)_0x77dfc1[_0xd3db93(0x424)](_0x53b487);}_0x313c17[_0xd3db93(0x21e)]();},Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x505)]=function(){const _0x3f75f7=_0x5af19b;for(const _0x1c5825 of this[_0x3f75f7(0x66f)]){this[_0x3f75f7(0x704)](_0x1c5825);}},Spriteset_Base['prototype'][_0x5af19b(0x378)]=function(){const _0x518549=_0x5af19b;return this[_0x518549(0x66f)]['length']>0x0;},VisuMZ['CoreEngine'][_0x5af19b(0x80f)]=Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x7b9)],Spriteset_Base[_0x5af19b(0x397)][_0x5af19b(0x7b9)]=function(){const _0xfd2a86=_0x5af19b;return VisuMZ[_0xfd2a86(0x585)][_0xfd2a86(0x80f)][_0xfd2a86(0x535)](this)||this[_0xfd2a86(0x378)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x2cf)][_0x5af19b(0x3c0)]||![],VisuMZ[_0x5af19b(0x585)]['Scene_Map_createSpriteset_detach']=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x6bc)],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x6bc)]=function(){const _0x2f030a=_0x5af19b;VisuMZ[_0x2f030a(0x585)][_0x2f030a(0x298)][_0x2f030a(0x535)](this);if(!Spriteset_Map[_0x2f030a(0x8d2)])return;const _0x208bea=this[_0x2f030a(0x830)];if(!_0x208bea)return;this['_pictureContainer']=_0x208bea[_0x2f030a(0x44d)];if(!this[_0x2f030a(0x44d)])return;this[_0x2f030a(0x73a)](this[_0x2f030a(0x44d)]);},VisuMZ['CoreEngine'][_0x5af19b(0x1f4)]=Spriteset_Map[_0x5af19b(0x397)]['createTilemap'],Spriteset_Map[_0x5af19b(0x397)][_0x5af19b(0x834)]=function(){const _0x47c9db=_0x5af19b;VisuMZ[_0x47c9db(0x585)][_0x47c9db(0x1f4)][_0x47c9db(0x535)](this),this['createTileExtendSprites']();},Spriteset_Map[_0x5af19b(0x397)][_0x5af19b(0x7a6)]=function(){const _0x16f8a0=_0x5af19b,_0x2a5664=$gameMap[_0x16f8a0(0x15b)]();if(!_0x2a5664)return;const _0x3ee812=$gameMap[_0x16f8a0(0x734)]();if(Object[_0x16f8a0(0x200)](_0x3ee812)[_0x16f8a0(0x35d)]<=0x0)return;const _0x3f2f0b=$gameMap[_0x16f8a0(0x40e)]();this['_tileExtendSprites']=this[_0x16f8a0(0x625)]||[];for(let _0x228f54=0x0;_0x228f54<$gameMap[_0x16f8a0(0x7ff)]();_0x228f54++){for(let _0x6b6c4d=0x0;_0x6b6c4d<$gameMap[_0x16f8a0(0x3fc)]();_0x6b6c4d++){for(const _0x3196cf of $gameMap[_0x16f8a0(0x87d)](_0x6b6c4d,_0x228f54)){const _0x4d280f=_0x3f2f0b[_0x3196cf]>>0xc,_0x383d52=_0x3ee812[_0x4d280f]||0x0;if(_0x383d52<=0x0)continue;this[_0x16f8a0(0x1bb)](_0x6b6c4d,_0x228f54,_0x3196cf,_0x383d52);}}}},Spriteset_Map['prototype'][_0x5af19b(0x47f)]=function(){const _0x2dac6a=_0x5af19b;this[_0x2dac6a(0x625)]=this[_0x2dac6a(0x625)]||[];for(const _0x1c35c9 of this[_0x2dac6a(0x625)]){this['_tilemap'][_0x2dac6a(0x424)](_0x1c35c9);}this[_0x2dac6a(0x625)]=[];},Spriteset_Map[_0x5af19b(0x397)]['createExtendedTileSprite']=function(_0x24dff5,_0x2f46aa,_0x19c06c,_0x27c3e3){const _0xaa81ff=_0x5af19b,_0x5ddf9f=new Sprite_ExtendedTile(_0x24dff5,_0x2f46aa,_0x19c06c,_0x27c3e3),_0x3d0aa5=$gameMap[_0xaa81ff(0x40e)]();_0x3d0aa5[_0x19c06c]&0x10?_0x5ddf9f['z']=0x4:_0x5ddf9f['z']=0x3,this[_0xaa81ff(0x7bd)][_0xaa81ff(0x73a)](_0x5ddf9f),this['_tileExtendSprites'][_0xaa81ff(0x3a5)](_0x5ddf9f);},VisuMZ['CoreEngine'][_0x5af19b(0x29b)]=Tilemap[_0x5af19b(0x397)][_0x5af19b(0x5a4)],Tilemap[_0x5af19b(0x397)][_0x5af19b(0x5a4)]=function(_0x538215,_0x15fe78,_0x5935f1){const _0x2d1300=_0x5af19b;if($gameMap[_0x2d1300(0x6c4)](_0x538215))return;VisuMZ['CoreEngine'][_0x2d1300(0x29b)][_0x2d1300(0x535)](this,_0x538215,_0x15fe78,_0x5935f1);},Spriteset_Battle[_0x5af19b(0x8d2)]=VisuMZ[_0x5af19b(0x585)]['Settings'][_0x5af19b(0x2cf)][_0x5af19b(0x3b1)]||![],VisuMZ['CoreEngine']['Scene_Battle_createSpriteset_detach']=Scene_Battle['prototype']['createSpriteset'],Scene_Battle['prototype'][_0x5af19b(0x6bc)]=function(){const _0x1e9695=_0x5af19b;VisuMZ[_0x1e9695(0x585)][_0x1e9695(0x655)][_0x1e9695(0x535)](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x5bb157=this[_0x1e9695(0x830)];if(!_0x5bb157)return;this['_pictureContainer']=_0x5bb157[_0x1e9695(0x44d)];if(!this[_0x1e9695(0x44d)])return;this['addChild'](this[_0x1e9695(0x44d)]);},Spriteset_Battle[_0x5af19b(0x397)][_0x5af19b(0x19f)]=function(){const _0x41fe3a=_0x5af19b;this[_0x41fe3a(0x529)]=new PIXI[(_0x41fe3a(0x7d8))][(_0x41fe3a(0x2bc))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x41fe3a(0x1b3)][_0x41fe3a(0x519)]=SceneManager['backgroundBitmap'](),this[_0x41fe3a(0x1b3)][_0x41fe3a(0x7d8)]=[this[_0x41fe3a(0x529)]],this[_0x41fe3a(0x2a7)][_0x41fe3a(0x73a)](this['_backgroundSprite']);},VisuMZ['CoreEngine'][_0x5af19b(0x71e)]=Spriteset_Battle[_0x5af19b(0x397)]['createEnemies'],Spriteset_Battle[_0x5af19b(0x397)][_0x5af19b(0x8a9)]=function(){const _0x1b39c7=_0x5af19b;this['coreEngineRepositionEnemies']()&&this[_0x1b39c7(0x389)](),VisuMZ['CoreEngine'][_0x1b39c7(0x71e)][_0x1b39c7(0x535)](this);},Spriteset_Battle[_0x5af19b(0x397)][_0x5af19b(0x1de)]=function(){const _0x291876=_0x5af19b,_0x113ee6=VisuMZ[_0x291876(0x585)][_0x291876(0x47e)][_0x291876(0x78d)];if(!_0x113ee6)return![];if(Utils[_0x291876(0x440)]>=_0x291876(0x42c)&&!_0x113ee6['RepositionEnemies130'])return![];return _0x113ee6[_0x291876(0x826)];},Spriteset_Battle[_0x5af19b(0x397)]['repositionEnemiesByResolution']=function(){const _0x35ccd6=_0x5af19b;for(member of $gameTroop['members']()){member[_0x35ccd6(0x716)]();}},VisuMZ['CoreEngine'][_0x5af19b(0x226)]=Window_Base[_0x5af19b(0x397)][_0x5af19b(0x8cc)],Window_Base[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(_0x9f53d8){const _0x1a1b3c=_0x5af19b;_0x9f53d8['x']=Math[_0x1a1b3c(0x548)](_0x9f53d8['x']),_0x9f53d8['y']=Math[_0x1a1b3c(0x548)](_0x9f53d8['y']),_0x9f53d8['width']=Math[_0x1a1b3c(0x548)](_0x9f53d8[_0x1a1b3c(0x3fc)]),_0x9f53d8['height']=Math[_0x1a1b3c(0x548)](_0x9f53d8[_0x1a1b3c(0x7ff)]),this[_0x1a1b3c(0x85d)](),VisuMZ[_0x1a1b3c(0x585)]['Window_Base_initialize'][_0x1a1b3c(0x535)](this,_0x9f53d8),this[_0x1a1b3c(0x5a8)]();},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x85d)]=function(){const _0x2e78bb=_0x5af19b;this[_0x2e78bb(0x601)]=VisuMZ[_0x2e78bb(0x585)]['Settings'][_0x2e78bb(0x2cf)][_0x2e78bb(0x23c)],this['_digitGroupingEx']=VisuMZ['CoreEngine'][_0x2e78bb(0x47e)][_0x2e78bb(0x2cf)][_0x2e78bb(0x2e1)];},Window_Base['prototype'][_0x5af19b(0x244)]=function(){const _0x14e0cb=_0x5af19b;return VisuMZ['CoreEngine'][_0x14e0cb(0x47e)][_0x14e0cb(0x685)]['LineHeight'];},Window_Base['prototype'][_0x5af19b(0x858)]=function(){const _0xa1b831=_0x5af19b;return VisuMZ[_0xa1b831(0x585)][_0xa1b831(0x47e)][_0xa1b831(0x685)][_0xa1b831(0x775)];},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x69b)]=function(){const _0x2ce928=_0x5af19b;$gameSystem['windowOpacity']?this[_0x2ce928(0x483)]=$gameSystem['windowOpacity']():this['backOpacity']=VisuMZ[_0x2ce928(0x585)][_0x2ce928(0x47e)][_0x2ce928(0x685)][_0x2ce928(0x30f)];},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x8d5)]=function(){const _0x266c28=_0x5af19b;return VisuMZ[_0x266c28(0x585)][_0x266c28(0x47e)][_0x266c28(0x685)][_0x266c28(0x2d0)];},Window_Base[_0x5af19b(0x397)]['openingSpeed']=function(){const _0x3b1b53=_0x5af19b;return VisuMZ[_0x3b1b53(0x585)][_0x3b1b53(0x47e)][_0x3b1b53(0x685)]['OpenSpeed'];},VisuMZ[_0x5af19b(0x585)]['Window_Base_update']=Window_Base[_0x5af19b(0x397)]['update'],Window_Base[_0x5af19b(0x397)]['update']=function(){const _0x16c1aa=_0x5af19b;VisuMZ['CoreEngine'][_0x16c1aa(0x234)][_0x16c1aa(0x535)](this),this[_0x16c1aa(0x599)]();},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x5bb)]=function(){const _0x121449=_0x5af19b;this[_0x121449(0x84c)]&&(this[_0x121449(0x427)]+=this[_0x121449(0x8ae)](),this[_0x121449(0x24b)]()&&(this[_0x121449(0x84c)]=![]));},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x5c7)]=function(){const _0x5a1550=_0x5af19b;this['_closing']&&(this['openness']-=this[_0x5a1550(0x8ae)](),this['isClosed']()&&(this[_0x5a1550(0x16c)]=![]));},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x868)]=Window_Base[_0x5af19b(0x397)][_0x5af19b(0x82b)],Window_Base['prototype'][_0x5af19b(0x82b)]=function(_0x22ca1b,_0x1d05a2,_0x575194,_0xca9154,_0x4facb8){const _0xc2b2e9=_0x5af19b;if(this[_0xc2b2e9(0x214)]())_0x22ca1b=VisuMZ[_0xc2b2e9(0x354)](_0x22ca1b);VisuMZ[_0xc2b2e9(0x585)][_0xc2b2e9(0x868)][_0xc2b2e9(0x535)](this,_0x22ca1b,_0x1d05a2,_0x575194,_0xca9154,_0x4facb8);},Window_Base[_0x5af19b(0x397)]['useDigitGrouping']=function(){const _0x5dc436=_0x5af19b;return this[_0x5dc436(0x601)];},VisuMZ['CoreEngine'][_0x5af19b(0x3c5)]=Window_Base[_0x5af19b(0x397)][_0x5af19b(0x5b6)],Window_Base[_0x5af19b(0x397)][_0x5af19b(0x5b6)]=function(_0x2a10ea,_0x249196,_0x412652,_0x1a2326){const _0x1ecc6a=_0x5af19b;var _0x186802=VisuMZ[_0x1ecc6a(0x585)][_0x1ecc6a(0x3c5)][_0x1ecc6a(0x535)](this,_0x2a10ea,_0x249196,_0x412652,_0x1a2326);if(this[_0x1ecc6a(0x34f)]())_0x186802['text']=String(VisuMZ[_0x1ecc6a(0x354)](_0x186802[_0x1ecc6a(0x227)]))||'';return _0x186802;},Window_Base['prototype'][_0x5af19b(0x34f)]=function(){return this['_digitGroupingEx'];},Window_Base['prototype'][_0x5af19b(0x273)]=function(_0x290eb2){this['_digitGrouping']=_0x290eb2;},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x329)]=function(_0x4ac924){const _0x2c1c04=_0x5af19b;this[_0x2c1c04(0x790)]=_0x4ac924;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x299)]=Window_Base[_0x5af19b(0x397)][_0x5af19b(0x756)],Window_Base[_0x5af19b(0x397)][_0x5af19b(0x756)]=function(_0x381ede,_0x17b231,_0x5cf1aa){const _0x135497=_0x5af19b;_0x17b231=Math[_0x135497(0x548)](_0x17b231),_0x5cf1aa=Math[_0x135497(0x548)](_0x5cf1aa),VisuMZ[_0x135497(0x585)][_0x135497(0x299)]['call'](this,_0x381ede,_0x17b231,_0x5cf1aa);},VisuMZ[_0x5af19b(0x585)]['Window_Base_drawFace']=Window_Base[_0x5af19b(0x397)][_0x5af19b(0x568)],Window_Base[_0x5af19b(0x397)][_0x5af19b(0x568)]=function(_0x21640e,_0x2970d6,_0x18cdcd,_0x378ab2,_0xc7a3ab,_0x1cdf28){const _0x324670=_0x5af19b;_0xc7a3ab=_0xc7a3ab||ImageManager['faceWidth'],_0x1cdf28=_0x1cdf28||ImageManager[_0x324670(0x372)],_0x18cdcd=Math[_0x324670(0x548)](_0x18cdcd),_0x378ab2=Math[_0x324670(0x548)](_0x378ab2),_0xc7a3ab=Math[_0x324670(0x548)](_0xc7a3ab),_0x1cdf28=Math['round'](_0x1cdf28),VisuMZ[_0x324670(0x585)][_0x324670(0x782)][_0x324670(0x535)](this,_0x21640e,_0x2970d6,_0x18cdcd,_0x378ab2,_0xc7a3ab,_0x1cdf28);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x325)]=Window_Base[_0x5af19b(0x397)][_0x5af19b(0x6e7)],Window_Base[_0x5af19b(0x397)][_0x5af19b(0x6e7)]=function(_0x4b2056,_0x1f6524,_0x3fbe71,_0x4c2502){const _0x50258d=_0x5af19b;_0x3fbe71=Math[_0x50258d(0x548)](_0x3fbe71),_0x4c2502=Math[_0x50258d(0x548)](_0x4c2502),VisuMZ['CoreEngine'][_0x50258d(0x325)][_0x50258d(0x535)](this,_0x4b2056,_0x1f6524,_0x3fbe71,_0x4c2502);},VisuMZ[_0x5af19b(0x585)]['Window_Selectable_itemRect']=Window_Selectable[_0x5af19b(0x397)]['itemRect'],Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x1da)]=function(_0x748ab1){const _0x12fc0b=_0x5af19b;let _0xcd5ce2=VisuMZ[_0x12fc0b(0x585)]['Window_Selectable_itemRect']['call'](this,_0x748ab1);return _0xcd5ce2['x']=Math[_0x12fc0b(0x548)](_0xcd5ce2['x']),_0xcd5ce2['y']=Math[_0x12fc0b(0x548)](_0xcd5ce2['y']),_0xcd5ce2['width']=Math[_0x12fc0b(0x548)](_0xcd5ce2[_0x12fc0b(0x3fc)]),_0xcd5ce2[_0x12fc0b(0x7ff)]=Math['round'](_0xcd5ce2['height']),_0xcd5ce2;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4c0)]=Window_StatusBase[_0x5af19b(0x397)]['drawActorSimpleStatus'],Window_StatusBase[_0x5af19b(0x397)][_0x5af19b(0x646)]=function(_0x5072bd,_0x1d64eb,_0x3945e0){const _0x3928be=_0x5af19b;_0x1d64eb=Math['round'](_0x1d64eb),_0x3945e0=Math[_0x3928be(0x548)](_0x3945e0),VisuMZ[_0x3928be(0x585)][_0x3928be(0x4c0)][_0x3928be(0x535)](this,_0x5072bd,_0x1d64eb,_0x3945e0);},Window_Base['prototype'][_0x5af19b(0x5a8)]=function(){const _0x149741=_0x5af19b;this[_0x149741(0x649)]={'duration':0x0,'wholeDuration':0x0,'type':_0x149741(0x5ad),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x149741(0x6d5)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x149741(0x922)],'targetBackOpacity':this[_0x149741(0x483)],'targetContentsOpacity':this[_0x149741(0x69f)]};},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x599)]=function(){const _0x1406f0=_0x5af19b;if(!this[_0x1406f0(0x649)])return;if(this[_0x1406f0(0x649)][_0x1406f0(0x666)]<=0x0)return;this['x']=this[_0x1406f0(0x422)](this['x'],this['_coreEasing'][_0x1406f0(0x8ac)]),this['y']=this[_0x1406f0(0x422)](this['y'],this[_0x1406f0(0x649)][_0x1406f0(0x1d6)]),this[_0x1406f0(0x6d5)]['x']=this[_0x1406f0(0x422)](this[_0x1406f0(0x6d5)]['x'],this['_coreEasing']['targetScaleX']),this[_0x1406f0(0x6d5)]['y']=this['applyCoreEasing'](this[_0x1406f0(0x6d5)]['y'],this[_0x1406f0(0x649)]['targetScaleY']),this[_0x1406f0(0x922)]=this[_0x1406f0(0x422)](this['opacity'],this[_0x1406f0(0x649)][_0x1406f0(0x526)]),this[_0x1406f0(0x483)]=this[_0x1406f0(0x422)](this['backOpacity'],this[_0x1406f0(0x649)]['targetBackOpacity']),this[_0x1406f0(0x69f)]=this[_0x1406f0(0x422)](this[_0x1406f0(0x69f)],this[_0x1406f0(0x649)]['targetContentsOpacity']),this[_0x1406f0(0x649)][_0x1406f0(0x666)]--;},Window_Base[_0x5af19b(0x397)]['applyCoreEasing']=function(_0x491729,_0x51dd73){const _0x272923=_0x5af19b;if(!this['_coreEasing'])return _0x51dd73;const _0x366294=this[_0x272923(0x649)]['duration'],_0x1fb884=this[_0x272923(0x649)]['wholeDuration'],_0x1bf6b2=this[_0x272923(0x934)]((_0x1fb884-_0x366294)/_0x1fb884),_0x2287d0=this['calcCoreEasing']((_0x1fb884-_0x366294+0x1)/_0x1fb884),_0x4e209d=(_0x491729-_0x51dd73*_0x1bf6b2)/(0x1-_0x1bf6b2);return _0x4e209d+(_0x51dd73-_0x4e209d)*_0x2287d0;},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x934)]=function(_0x2f506b){const _0x3ab191=_0x5af19b;if(!this[_0x3ab191(0x649)])return _0x2f506b;return VisuMZ['ApplyEasing'](_0x2f506b,this[_0x3ab191(0x649)][_0x3ab191(0x6f8)]||_0x3ab191(0x5ad));},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x376)]=function(_0x1293d1,_0x5e9359){const _0xd79d15=_0x5af19b;if(!this[_0xd79d15(0x649)])return;this['x']=this['_coreEasing']['targetX'],this['y']=this[_0xd79d15(0x649)][_0xd79d15(0x1d6)],this[_0xd79d15(0x6d5)]['x']=this[_0xd79d15(0x649)][_0xd79d15(0x2a3)],this['scale']['y']=this[_0xd79d15(0x649)]['targetScaleY'],this[_0xd79d15(0x922)]=this[_0xd79d15(0x649)][_0xd79d15(0x526)],this[_0xd79d15(0x483)]=this[_0xd79d15(0x649)][_0xd79d15(0x3cd)],this[_0xd79d15(0x69f)]=this[_0xd79d15(0x649)][_0xd79d15(0x56d)],this['setupCoreEasing'](_0x1293d1,_0x5e9359,this['x'],this['y'],this[_0xd79d15(0x6d5)]['x'],this[_0xd79d15(0x6d5)]['y'],this[_0xd79d15(0x922)],this[_0xd79d15(0x483)],this[_0xd79d15(0x69f)]);},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x27f)]=function(_0x1a7684,_0x14c654,_0x284997,_0x5e9309,_0x5716ce,_0xc83983,_0x911418,_0x10c9ca,_0x1f6a85){const _0x143131=_0x5af19b;this[_0x143131(0x649)]={'duration':_0x1a7684,'wholeDuration':_0x1a7684,'type':_0x14c654,'targetX':_0x284997,'targetY':_0x5e9309,'targetScaleX':_0x5716ce,'targetScaleY':_0xc83983,'targetOpacity':_0x911418,'targetBackOpacity':_0x10c9ca,'targetContentsOpacity':_0x1f6a85};},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x814)]=function(_0x237a7e,_0x5e6e18,_0x428b8c,_0xab100e,_0x4a607a){const _0xebda5c=_0x5af19b;this[_0xebda5c(0x7cf)](),this[_0xebda5c(0x5b5)]['fontSize']=VisuMZ['CoreEngine']['Settings'][_0xebda5c(0x67a)][_0xebda5c(0x8b6)];const _0x353e20=VisuMZ[_0xebda5c(0x585)][_0xebda5c(0x47e)][_0xebda5c(0x67a)]['GoldIcon'];if(_0x353e20>0x0&&_0x5e6e18===TextManager[_0xebda5c(0x74e)]){const _0x5e0eab=_0xab100e+(this[_0xebda5c(0x244)]()-ImageManager[_0xebda5c(0x8ba)])/0x2;this['drawIcon'](_0x353e20,_0x428b8c+(_0x4a607a-ImageManager[_0xebda5c(0x1ac)]),_0x5e0eab),_0x4a607a-=ImageManager[_0xebda5c(0x1ac)]+0x4;}else this[_0xebda5c(0x63c)](ColorManager[_0xebda5c(0x7bb)]()),this[_0xebda5c(0x82b)](_0x5e6e18,_0x428b8c,_0xab100e,_0x4a607a,'right'),_0x4a607a-=this[_0xebda5c(0x384)](_0x5e6e18)+0x6;this[_0xebda5c(0x1b5)]();const _0x42a94f=this['textWidth'](this['_digitGrouping']?VisuMZ['GroupDigits'](_0x237a7e):_0x237a7e);_0x42a94f>_0x4a607a?this[_0xebda5c(0x82b)](VisuMZ[_0xebda5c(0x585)][_0xebda5c(0x47e)][_0xebda5c(0x67a)][_0xebda5c(0x445)],_0x428b8c,_0xab100e,_0x4a607a,_0xebda5c(0x35a)):this[_0xebda5c(0x82b)](_0x237a7e,_0x428b8c,_0xab100e,_0x4a607a,'right'),this[_0xebda5c(0x7cf)]();},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x679)]=function(_0x5f162d,_0x3a7141,_0x4b2925,_0x1ebcd1,_0x405031){const _0x48c207=_0x5af19b,_0x1bc616=ImageManager[_0x48c207(0x2a2)](_0x48c207(0x21b)),_0xe41e00=ImageManager[_0x48c207(0x1ac)],_0x411d9f=ImageManager[_0x48c207(0x8ba)],_0x33510a=_0x5f162d%0x10*_0xe41e00,_0x4e2426=Math[_0x48c207(0x1eb)](_0x5f162d/0x10)*_0x411d9f,_0xd1913f=_0x1ebcd1,_0x2cc6e1=_0x1ebcd1;this[_0x48c207(0x5b5)]['_context'][_0x48c207(0x558)]=_0x405031,this[_0x48c207(0x5b5)]['blt'](_0x1bc616,_0x33510a,_0x4e2426,_0xe41e00,_0x411d9f,_0x3a7141,_0x4b2925,_0xd1913f,_0x2cc6e1),this['contents']['_context']['imageSmoothingEnabled']=!![];},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x932)]=function(_0x5638f0,_0x40da42,_0x5f1ddc,_0x2bb76f,_0x2e4c8b,_0xd7e300){const _0x666468=_0x5af19b,_0x4778db=Math[_0x666468(0x1eb)]((_0x5f1ddc-0x2)*_0x2bb76f),_0x4b610c=Sprite_Gauge[_0x666468(0x397)]['gaugeHeight'][_0x666468(0x535)](this),_0xe01214=_0x40da42+this[_0x666468(0x244)]()-_0x4b610c-0x2;this[_0x666468(0x5b5)][_0x666468(0x61d)](_0x5638f0,_0xe01214,_0x5f1ddc,_0x4b610c,ColorManager[_0x666468(0x1f0)]()),this[_0x666468(0x5b5)]['gradientFillRect'](_0x5638f0+0x1,_0xe01214+0x1,_0x4778db,_0x4b610c-0x2,_0x2e4c8b,_0xd7e300);},Window_Scrollable[_0x5af19b(0x81f)]={'enabled':VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['Window'][_0x5af19b(0x64a)]??!![],'thickness':VisuMZ['CoreEngine']['Settings']['Window'][_0x5af19b(0x360)]??0x2,'offset':VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x685)]['BarOffset']??0x2,'bodyColor':VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['Window'][_0x5af19b(0x91e)]??0x0,'offColor':VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x685)][_0x5af19b(0x6c8)]??0x7,'offOpacity':VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x685)][_0x5af19b(0x633)]??0x80},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x246)]=function(){const _0x32aa3b=_0x5af19b;return Window_Scrollable['SCROLLBAR'][_0x32aa3b(0x51f)]&&Window_Scrollable[_0x32aa3b(0x81f)][_0x32aa3b(0x8fd)]>0x0;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x1e5)]=Window_Base[_0x5af19b(0x397)]['createContents'],Window_Base[_0x5af19b(0x397)][_0x5af19b(0x551)]=function(){const _0x2650b4=_0x5af19b;VisuMZ[_0x2650b4(0x585)][_0x2650b4(0x1e5)][_0x2650b4(0x535)](this),this[_0x2650b4(0x6b6)](),this['setupScrollBarBitmap'](!![]),this['setupScrollBarBitmap'](![]);},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x6b6)]=function(){const _0x4a0a50=_0x5af19b;if(!this[_0x4a0a50(0x246)]())return;if(this[_0x4a0a50(0x4b8)]||this[_0x4a0a50(0x44a)])return;this[_0x4a0a50(0x201)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x4a0a50(0x4b8)]=new Sprite(),this[_0x4a0a50(0x44a)]=new Sprite(),this[_0x4a0a50(0x73a)](this[_0x4a0a50(0x4b8)]),this[_0x4a0a50(0x73a)](this[_0x4a0a50(0x44a)]);},Window_Base['prototype'][_0x5af19b(0x8a0)]=function(_0x4fc549){const _0x48186b=_0x5af19b,_0xf5d3f3=_0x4fc549?this[_0x48186b(0x4b8)]:this[_0x48186b(0x44a)];if(!_0xf5d3f3)return;const _0x4145b5=Window_Scrollable[_0x48186b(0x81f)],_0x1580e5=_0x4145b5[_0x48186b(0x8fd)],_0x274afc=_0x4fc549?this[_0x48186b(0x57f)]-_0x1580e5*0x2:_0x1580e5,_0x13723c=_0x4fc549?_0x1580e5:this[_0x48186b(0x3b0)]-_0x1580e5*0x2;_0xf5d3f3[_0x48186b(0x519)]=new Bitmap(_0x274afc,_0x13723c),_0xf5d3f3[_0x48186b(0x39c)](0x0,0x0,_0x274afc,_0x13723c),this[_0x48186b(0x5c0)](_0x4fc549);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4b0)]=Window_Base[_0x5af19b(0x397)]['destroyContents'],Window_Base[_0x5af19b(0x397)][_0x5af19b(0x29a)]=function(){const _0x432191=_0x5af19b;VisuMZ[_0x432191(0x585)][_0x432191(0x4b0)][_0x432191(0x535)](this),this[_0x432191(0x1e8)]();},Window_Base[_0x5af19b(0x397)]['destroyScrollBarBitmaps']=function(){const _0x83c8ab=_0x5af19b,_0x34ceb3=[this[_0x83c8ab(0x4b8)],this[_0x83c8ab(0x44a)]];for(const _0x4c3878 of _0x34ceb3){if(_0x4c3878&&_0x4c3878[_0x83c8ab(0x519)])_0x4c3878['bitmap'][_0x83c8ab(0x21e)]();}},VisuMZ[_0x5af19b(0x585)]['Window_Scrollable_update']=Window_Scrollable[_0x5af19b(0x397)][_0x5af19b(0x556)],Window_Scrollable['prototype'][_0x5af19b(0x556)]=function(){const _0x21702=_0x5af19b;VisuMZ['CoreEngine'][_0x21702(0x507)][_0x21702(0x535)](this),this[_0x21702(0x542)]();},Window_Scrollable[_0x5af19b(0x397)]['updateScrollBars']=function(){const _0x5db56d=_0x5af19b;this['updateScrollBarVisibility'](),this[_0x5db56d(0x931)](!![]),this['checkScrollBarBitmap'](![]),this[_0x5db56d(0x5c0)](!![]),this[_0x5db56d(0x5c0)](![]);},Window_Scrollable[_0x5af19b(0x397)][_0x5af19b(0x4aa)]=function(){const _0x14081d=_0x5af19b,_0x54dca3=[this[_0x14081d(0x4b8)],this[_0x14081d(0x44a)]];for(const _0x13d2a9 of _0x54dca3){_0x13d2a9&&(_0x13d2a9[_0x14081d(0x87b)]=this['isScrollBarVisible']()&&this[_0x14081d(0x24b)]());}},Window_Scrollable[_0x5af19b(0x397)][_0x5af19b(0x931)]=function(_0x2e0998){const _0x1d1543=_0x5af19b;if(!this['_lastScrollBarValues'])return;const _0x48570d=this[_0x1d1543(0x523)](_0x2e0998),_0x1fb202=this[_0x1d1543(0x5c3)](_0x2e0998),_0x58ae25=_0x2e0998?'horz':_0x1d1543(0x4dc),_0x4b0d65=_0x2e0998?'maxHorz':_0x1d1543(0x6a4);(this[_0x1d1543(0x201)][_0x58ae25]!==_0x48570d||this[_0x1d1543(0x201)][_0x4b0d65]!==_0x1fb202)&&(this[_0x1d1543(0x201)][_0x58ae25]=_0x48570d,this[_0x1d1543(0x201)][_0x4b0d65]=_0x1fb202,this[_0x1d1543(0x1b0)](_0x2e0998,_0x48570d,_0x1fb202));},Window_Scrollable[_0x5af19b(0x397)][_0x5af19b(0x523)]=function(_0x2c8f40){const _0x36ee27=_0x5af19b;if(this[_0x36ee27(0x4fd)]!==undefined)return _0x2c8f40?this[_0x36ee27(0x369)]():this[_0x36ee27(0x236)]['y'];return _0x2c8f40?this[_0x36ee27(0x369)]():this[_0x36ee27(0x176)]();},Window_Scrollable[_0x5af19b(0x397)][_0x5af19b(0x5c3)]=function(_0x3496a4){const _0x37b51e=_0x5af19b;if(this[_0x37b51e(0x4fd)]!==undefined)return _0x3496a4?this[_0x37b51e(0x45f)]():Math[_0x37b51e(0x689)](0x0,this[_0x37b51e(0x4fd)]-this[_0x37b51e(0x3b0)]);return _0x3496a4?this[_0x37b51e(0x45f)]():this['maxScrollY']();},Window_Scrollable[_0x5af19b(0x397)][_0x5af19b(0x16e)]=function(){const _0xe005e1=_0x5af19b;if(this[_0xe005e1(0x4fd)]!==undefined)return Math[_0xe005e1(0x689)](0x0,this[_0xe005e1(0x4fd)]);return this['overallHeight']();},Window_Scrollable[_0x5af19b(0x397)]['refreshScrollBarBitmap']=function(_0x3d12b6,_0x26ac4b,_0x567345){const _0x360653=_0x5af19b,_0x195493=_0x3d12b6?this[_0x360653(0x4b8)]:this[_0x360653(0x44a)];if(!_0x195493)return;if(!_0x195493['bitmap'])return;const _0xdcdb1e=_0x195493[_0x360653(0x519)];_0xdcdb1e[_0x360653(0x3dd)]();if(_0x567345<=0x0)return;const _0x54faab=_0x3d12b6?this['innerWidth']/this[_0x360653(0x4b9)]():this[_0x360653(0x3b0)]/this[_0x360653(0x16e)](),_0xa1f91a=_0x3d12b6?Math[_0x360653(0x548)](_0x26ac4b*_0x54faab):0x0,_0x5aa2c1=_0x3d12b6?0x0:Math[_0x360653(0x548)](_0x26ac4b*_0x54faab),_0x41fb12=_0x3d12b6?Math[_0x360653(0x548)](_0xdcdb1e[_0x360653(0x3fc)]*_0x54faab):_0xdcdb1e[_0x360653(0x3fc)],_0x32fb0e=_0x3d12b6?_0xdcdb1e[_0x360653(0x7ff)]:Math['round'](_0xdcdb1e[_0x360653(0x7ff)]*_0x54faab),_0x5828bc=Window_Scrollable[_0x360653(0x81f)],_0x699ba2=ColorManager[_0x360653(0x2df)](_0x5828bc[_0x360653(0x4d6)]),_0x522006=ColorManager[_0x360653(0x2df)](_0x5828bc[_0x360653(0x289)]),_0xccd004=_0x5828bc[_0x360653(0x497)];_0xdcdb1e[_0x360653(0x686)]=_0xccd004,_0xdcdb1e[_0x360653(0x320)](_0x699ba2),_0xdcdb1e['paintOpacity']=0xff,_0xdcdb1e['fillRect'](_0xa1f91a,_0x5aa2c1,_0x41fb12,_0x32fb0e,_0x522006);},Window_Base[_0x5af19b(0x397)]['updateScrollBarPosition']=function(_0x1d92a5){const _0x538e2d=_0x5af19b,_0x28773d=_0x1d92a5?this[_0x538e2d(0x4b8)]:this[_0x538e2d(0x44a)];if(!_0x28773d)return;const _0x1d51b1=Window_Scrollable['SCROLLBAR'],_0x4a4de6=_0x1d51b1['thickness'],_0x5aeaa4=_0x1d51b1[_0x538e2d(0x94c)];if(!_0x28773d[_0x538e2d(0x8cb)])return;_0x28773d['x']=this['padding']+(_0x1d92a5?_0x4a4de6:this['innerWidth']+_0x5aeaa4),_0x28773d['y']=this['padding']+(_0x1d92a5?this[_0x538e2d(0x3b0)]+_0x5aeaa4:_0x4a4de6);},Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x2cc)]=function(_0x5b98cb){const _0x486e1a=_0x5af19b;let _0x188251=this[_0x486e1a(0x477)]();const _0x2bcf35=this[_0x486e1a(0x5fd)](),_0x4efda6=this[_0x486e1a(0x3a2)]();if(this[_0x486e1a(0x419)]()&&(_0x188251<_0x2bcf35||_0x5b98cb&&_0x4efda6===0x1)){_0x188251+=_0x4efda6;if(_0x188251>=_0x2bcf35)_0x188251=_0x2bcf35-0x1;this[_0x486e1a(0x602)](_0x188251);}else!this['isUseModernControls']()&&((_0x188251<_0x2bcf35-_0x4efda6||_0x5b98cb&&_0x4efda6===0x1)&&this['smoothSelect']((_0x188251+_0x4efda6)%_0x2bcf35));},VisuMZ[_0x5af19b(0x585)]['Window_Selectable_cursorDown']=Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x2cc)],Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x2cc)]=function(_0x272ddc){const _0x8ac9bb=_0x5af19b;this[_0x8ac9bb(0x419)]()&&_0x272ddc&&this[_0x8ac9bb(0x3a2)]()===0x1&&this[_0x8ac9bb(0x477)]()===this[_0x8ac9bb(0x5fd)]()-0x1?this[_0x8ac9bb(0x602)](0x0):VisuMZ[_0x8ac9bb(0x585)][_0x8ac9bb(0x669)][_0x8ac9bb(0x535)](this,_0x272ddc);},Window_Selectable['prototype'][_0x5af19b(0x307)]=function(_0x1e46b0){const _0x43259e=_0x5af19b;let _0x4fbe0f=Math['max'](0x0,this['index']());const _0x31bd6f=this[_0x43259e(0x5fd)](),_0x4559a7=this[_0x43259e(0x3a2)]();if(this['isUseModernControls']()&&_0x4fbe0f>0x0||_0x1e46b0&&_0x4559a7===0x1){_0x4fbe0f-=_0x4559a7;if(_0x4fbe0f<=0x0)_0x4fbe0f=0x0;this[_0x43259e(0x602)](_0x4fbe0f);}else!this[_0x43259e(0x419)]()&&((_0x4fbe0f>=_0x4559a7||_0x1e46b0&&_0x4559a7===0x1)&&this['smoothSelect']((_0x4fbe0f-_0x4559a7+_0x31bd6f)%_0x31bd6f));},VisuMZ['CoreEngine'][_0x5af19b(0x3ec)]=Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x307)],Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x307)]=function(_0x30bf39){const _0x32d00c=_0x5af19b;this[_0x32d00c(0x419)]()&&_0x30bf39&&this[_0x32d00c(0x3a2)]()===0x1&&this[_0x32d00c(0x477)]()===0x0?this[_0x32d00c(0x602)](this['maxItems']()-0x1):VisuMZ[_0x32d00c(0x585)]['Window_Selectable_cursorUp'][_0x32d00c(0x535)](this,_0x30bf39);},Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x419)]=function(){const _0x3dfdfc=_0x5af19b;return VisuMZ[_0x3dfdfc(0x585)][_0x3dfdfc(0x47e)]['QoL']['ModernControls'];},VisuMZ['CoreEngine'][_0x5af19b(0x7bf)]=Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x4d4)],Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x4d4)]=function(){const _0x2e3fa2=_0x5af19b;this[_0x2e3fa2(0x419)]()?(this[_0x2e3fa2(0x772)](),this['processCursorHomeEndTrigger']()):VisuMZ['CoreEngine']['Window_Selectable_processCursorMove'][_0x2e3fa2(0x535)](this);},Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x5d0)]=function(){return!![];},Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x772)]=function(){const _0x411b1f=_0x5af19b;if(this['isCursorMovable']()){const _0x5e611b=this['index']();Input[_0x411b1f(0x30b)](_0x411b1f(0x30e))&&(Input[_0x411b1f(0x1b4)](_0x411b1f(0x458))&&this[_0x411b1f(0x5d0)]()?this['cursorPagedown']():this[_0x411b1f(0x2cc)](Input['isTriggered'](_0x411b1f(0x30e)))),Input[_0x411b1f(0x30b)]('up')&&(Input[_0x411b1f(0x1b4)](_0x411b1f(0x458))&&this['allowShiftScrolling']()?this['cursorPageup']():this['cursorUp'](Input[_0x411b1f(0x536)]('up'))),Input['isRepeated'](_0x411b1f(0x35a))&&this[_0x411b1f(0x7ad)](Input[_0x411b1f(0x536)]('right')),Input[_0x411b1f(0x30b)](_0x411b1f(0x334))&&this[_0x411b1f(0x940)](Input[_0x411b1f(0x536)](_0x411b1f(0x334))),!this[_0x411b1f(0x878)]('pagedown')&&Input[_0x411b1f(0x30b)](_0x411b1f(0x25f))&&this[_0x411b1f(0x3f6)](),!this[_0x411b1f(0x878)](_0x411b1f(0x2a6))&&Input[_0x411b1f(0x30b)](_0x411b1f(0x2a6))&&this[_0x411b1f(0x91a)](),this[_0x411b1f(0x477)]()!==_0x5e611b&&this[_0x411b1f(0x395)]();}},Window_Selectable[_0x5af19b(0x397)]['processCursorHomeEndTrigger']=function(){const _0x1c18ac=_0x5af19b;if(this[_0x1c18ac(0x34d)]()){const _0x292a82=this[_0x1c18ac(0x477)]();Input['isTriggered'](_0x1c18ac(0x86f))&&this[_0x1c18ac(0x602)](Math[_0x1c18ac(0x2fc)](this[_0x1c18ac(0x477)](),0x0)),Input[_0x1c18ac(0x536)](_0x1c18ac(0x78a))&&this['smoothSelect'](Math['max'](this[_0x1c18ac(0x477)](),this[_0x1c18ac(0x5fd)]()-0x1)),this[_0x1c18ac(0x477)]()!==_0x292a82&&this[_0x1c18ac(0x395)]();}},VisuMZ['CoreEngine'][_0x5af19b(0x492)]=Window_Selectable['prototype'][_0x5af19b(0x38d)],Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x38d)]=function(){const _0x280c73=_0x5af19b;this[_0x280c73(0x419)]()?this[_0x280c73(0x3d6)]():VisuMZ[_0x280c73(0x585)][_0x280c73(0x492)][_0x280c73(0x535)](this);},Window_Selectable[_0x5af19b(0x397)]['processTouchModernControls']=function(){VisuMZ['CoreEngine']['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x1bc)]=function(){const _0xf71b11=_0x5af19b;return VisuMZ[_0xf71b11(0x585)][_0xf71b11(0x47e)][_0xf71b11(0x685)][_0xf71b11(0x871)];},Window_Selectable[_0x5af19b(0x397)]['rowSpacing']=function(){const _0x1f25e2=_0x5af19b;return VisuMZ['CoreEngine'][_0x1f25e2(0x47e)][_0x1f25e2(0x685)][_0x1f25e2(0x750)];},Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x2c0)]=function(){const _0x3184df=_0x5af19b;return Window_Scrollable[_0x3184df(0x397)]['itemHeight'][_0x3184df(0x535)](this)+VisuMZ[_0x3184df(0x585)][_0x3184df(0x47e)]['Window'][_0x3184df(0x1f9)];;},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x4d3)]=Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x2f7)],Window_Selectable[_0x5af19b(0x397)][_0x5af19b(0x2f7)]=function(_0x21e7a7){const _0x38ef77=_0x5af19b,_0x1b1bd4=VisuMZ[_0x38ef77(0x585)]['Settings'][_0x38ef77(0x685)];if(_0x1b1bd4[_0x38ef77(0x587)]===![])return;_0x1b1bd4[_0x38ef77(0x2ee)]?_0x1b1bd4[_0x38ef77(0x2ee)][_0x38ef77(0x535)](this,_0x21e7a7):VisuMZ[_0x38ef77(0x585)]['Window_Selectable_drawBackgroundRect']['call'](this,_0x21e7a7);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x590)]=Window_Gold[_0x5af19b(0x397)][_0x5af19b(0x757)],Window_Gold[_0x5af19b(0x397)][_0x5af19b(0x757)]=function(){const _0x5678d3=_0x5af19b;this[_0x5678d3(0x806)]()?this['drawGoldItemStyle']():VisuMZ[_0x5678d3(0x585)][_0x5678d3(0x590)][_0x5678d3(0x535)](this);},Window_Gold[_0x5af19b(0x397)][_0x5af19b(0x806)]=function(){const _0x5ac93d=_0x5af19b;if(TextManager[_0x5ac93d(0x74e)]!==this['currencyUnit']())return![];return VisuMZ[_0x5ac93d(0x585)][_0x5ac93d(0x47e)][_0x5ac93d(0x67a)][_0x5ac93d(0x6b0)];},Window_Gold[_0x5af19b(0x397)]['drawGoldItemStyle']=function(){const _0x258da6=_0x5af19b;this[_0x258da6(0x7cf)](),this[_0x258da6(0x5b5)][_0x258da6(0x3dd)](),this[_0x258da6(0x5b5)][_0x258da6(0x798)]=VisuMZ[_0x258da6(0x585)][_0x258da6(0x47e)][_0x258da6(0x67a)][_0x258da6(0x8b6)];const _0x3c87db=VisuMZ[_0x258da6(0x585)][_0x258da6(0x47e)][_0x258da6(0x67a)]['GoldIcon'],_0x740238=this['itemLineRect'](0x0);if(_0x3c87db>0x0){const _0xb6b12b=ImageManager[_0x258da6(0x66a)]||0x20,_0x4418c2=_0xb6b12b-ImageManager[_0x258da6(0x1ac)],_0x21af4f=_0x740238['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x258da6(0x756)](_0x3c87db,_0x740238['x']+Math[_0x258da6(0x592)](_0x4418c2/0x2),_0x21af4f);const _0x427513=_0xb6b12b+0x4;_0x740238['x']+=_0x427513,_0x740238[_0x258da6(0x3fc)]-=_0x427513;}this[_0x258da6(0x63c)](ColorManager[_0x258da6(0x7bb)]()),this['drawText'](this[_0x258da6(0x74e)](),_0x740238['x'],_0x740238['y'],_0x740238[_0x258da6(0x3fc)],_0x258da6(0x334));const _0x546088=this[_0x258da6(0x384)](this[_0x258da6(0x74e)]())+0x6;;_0x740238['x']+=_0x546088,_0x740238['width']-=_0x546088,this[_0x258da6(0x1b5)]();const _0x57bc82=this[_0x258da6(0x741)](),_0x33bedb=this[_0x258da6(0x384)](this[_0x258da6(0x601)]?VisuMZ[_0x258da6(0x354)](this['value']()):this[_0x258da6(0x741)]());_0x33bedb>_0x740238[_0x258da6(0x3fc)]?this[_0x258da6(0x82b)](VisuMZ[_0x258da6(0x585)][_0x258da6(0x47e)][_0x258da6(0x67a)][_0x258da6(0x445)],_0x740238['x'],_0x740238['y'],_0x740238[_0x258da6(0x3fc)],'right'):this['drawText'](this['value'](),_0x740238['x'],_0x740238['y'],_0x740238[_0x258da6(0x3fc)],'right'),this[_0x258da6(0x7cf)]();},Window_StatusBase['prototype']['drawParamText']=function(_0x31abb0,_0x43679e,_0x48aec5,_0x166d08,_0x33feb2){const _0x5b83a7=_0x5af19b;_0x166d08=String(_0x166d08||'')[_0x5b83a7(0x49d)]();if(VisuMZ[_0x5b83a7(0x585)]['Settings'][_0x5b83a7(0x61e)]['DrawIcons']){const _0x531ee3=VisuMZ[_0x5b83a7(0x465)](_0x166d08);if(_0x33feb2)this[_0x5b83a7(0x679)](_0x531ee3,_0x31abb0,_0x43679e,this['gaugeLineHeight']()),_0x48aec5-=this[_0x5b83a7(0x4c3)]()+0x2,_0x31abb0+=this[_0x5b83a7(0x4c3)]()+0x2;else{const _0x22a022=ImageManager['standardIconWidth']||0x20,_0x2de27f=ImageManager[_0x5b83a7(0x194)]||0x20,_0x5d509e=_0x22a022-ImageManager[_0x5b83a7(0x1ac)],_0x5c2786=_0x2de27f-ImageManager[_0x5b83a7(0x8ba)];let _0x2440b3=0x2,_0x376259=0x2;this[_0x5b83a7(0x244)]()!==0x24&&(_0x376259=Math[_0x5b83a7(0x1eb)]((this[_0x5b83a7(0x244)]()-_0x2de27f)/0x2));const _0x1af864=_0x31abb0+Math[_0x5b83a7(0x1eb)](_0x5d509e/0x2)+_0x2440b3,_0x157ca3=_0x43679e+Math[_0x5b83a7(0x1eb)](_0x5c2786/0x2)+_0x376259;this['drawIcon'](_0x531ee3,_0x1af864,_0x157ca3),_0x48aec5-=_0x22a022+0x4,_0x31abb0+=_0x22a022+0x4;}}const _0x7e242d=TextManager['param'](_0x166d08);this[_0x5b83a7(0x7cf)](),this[_0x5b83a7(0x63c)](ColorManager[_0x5b83a7(0x7bb)]()),_0x33feb2?(this['contents'][_0x5b83a7(0x798)]=this[_0x5b83a7(0x81b)](),this[_0x5b83a7(0x5b5)][_0x5b83a7(0x82b)](_0x7e242d,_0x31abb0,_0x43679e,_0x48aec5,this[_0x5b83a7(0x4c3)](),_0x5b83a7(0x334))):this[_0x5b83a7(0x82b)](_0x7e242d,_0x31abb0,_0x43679e,_0x48aec5),this[_0x5b83a7(0x7cf)]();},Window_StatusBase[_0x5af19b(0x397)][_0x5af19b(0x81b)]=function(){const _0x339f92=_0x5af19b;return $gameSystem[_0x339f92(0x368)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x4ad5c5,_0x42d632,_0x403b39,_0xc35cf8){const _0x1adf6=_0x5af19b;_0xc35cf8=_0xc35cf8||0xa8,this[_0x1adf6(0x1b5)]();if(VisuMZ[_0x1adf6(0x585)][_0x1adf6(0x47e)]['UI'][_0x1adf6(0x218)])this[_0x1adf6(0x8f6)](_0x4ad5c5[_0x1adf6(0x658)]()[_0x1adf6(0x678)],_0x42d632,_0x403b39,_0xc35cf8);else{const _0x517d7e=_0x4ad5c5[_0x1adf6(0x658)]()['name']['replace'](/\\I\[(\d+)\]/gi,'');this[_0x1adf6(0x82b)](_0x517d7e,_0x42d632,_0x403b39,_0xc35cf8);}},Window_StatusBase[_0x5af19b(0x397)]['drawActorNickname']=function(_0x1a9291,_0x5365d9,_0x1dee8b,_0x15316e){const _0x490f80=_0x5af19b;_0x15316e=_0x15316e||0x10e,this[_0x490f80(0x1b5)]();if(VisuMZ[_0x490f80(0x585)]['Settings']['UI'][_0x490f80(0x3cf)])this[_0x490f80(0x8f6)](_0x1a9291[_0x490f80(0x92f)](),_0x5365d9,_0x1dee8b,_0x15316e);else{const _0x2dfbe8=_0x1a9291[_0x490f80(0x92f)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x490f80(0x82b)](_0x1a9291[_0x490f80(0x92f)](),_0x5365d9,_0x1dee8b,_0x15316e);}},VisuMZ[_0x5af19b(0x585)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x5af19b(0x397)]['drawActorLevel'],Window_StatusBase[_0x5af19b(0x397)]['drawActorLevel']=function(_0x3a011d,_0x16ba68,_0x50f684){const _0x352ff8=_0x5af19b;if(VisuMZ[_0x352ff8(0x585)][_0x352ff8(0x47e)]['Param'][_0x352ff8(0x58e)]===![])return;if(this[_0x352ff8(0x54b)]())this[_0x352ff8(0x763)](_0x3a011d,_0x16ba68,_0x50f684);VisuMZ[_0x352ff8(0x585)][_0x352ff8(0x637)][_0x352ff8(0x535)](this,_0x3a011d,_0x16ba68,_0x50f684);},Window_StatusBase['prototype']['isExpGaugeDrawn']=function(){const _0x5c7258=_0x5af19b;return VisuMZ[_0x5c7258(0x585)][_0x5c7258(0x47e)]['UI'][_0x5c7258(0x6b9)];},Window_StatusBase[_0x5af19b(0x397)][_0x5af19b(0x763)]=function(_0x4deef1,_0x387c78,_0x3d34e5){const _0x13e25e=_0x5af19b;if(!_0x4deef1)return;if(!_0x4deef1[_0x13e25e(0x70c)]())return;const _0x12d2fe=0x80,_0x3b0f19=_0x4deef1['expRate']();let _0x2447ef=ColorManager[_0x13e25e(0x32f)](),_0x4a4675=ColorManager[_0x13e25e(0x7cc)]();_0x3b0f19>=0x1&&(_0x2447ef=ColorManager[_0x13e25e(0x41c)](),_0x4a4675=ColorManager[_0x13e25e(0x3db)]()),this[_0x13e25e(0x932)](_0x387c78,_0x3d34e5,_0x12d2fe,_0x3b0f19,_0x2447ef,_0x4a4675);},Window_EquipStatus[_0x5af19b(0x397)][_0x5af19b(0x67b)]=function(){const _0x1f9db3=_0x5af19b;let _0x44d348=0x0;for(const _0x1992a7 of VisuMZ[_0x1f9db3(0x585)][_0x1f9db3(0x47e)]['Param'][_0x1f9db3(0x232)]){const _0xa23e12=this['itemPadding'](),_0x4687ff=this['paramY'](_0x44d348);this[_0x1f9db3(0x210)](_0xa23e12,_0x4687ff,_0x1992a7),_0x44d348++;}},Window_EquipStatus[_0x5af19b(0x397)]['drawParamName']=function(_0x388109,_0x54192d,_0x20391e){const _0x43bc11=_0x5af19b,_0x308dc3=this[_0x43bc11(0x688)]()-this[_0x43bc11(0x858)]()*0x2;this[_0x43bc11(0x2b8)](_0x388109,_0x54192d,_0x308dc3,_0x20391e,![]);},Window_EquipStatus[_0x5af19b(0x397)]['drawCurrentParam']=function(_0x1c13e9,_0x361d4c,_0x502c08){const _0x3df031=_0x5af19b,_0x483193=this['paramWidth']();this[_0x3df031(0x1b5)](),this[_0x3df031(0x82b)](this[_0x3df031(0x453)][_0x3df031(0x509)](_0x502c08,!![]),_0x1c13e9,_0x361d4c,_0x483193,_0x3df031(0x35a));},Window_EquipStatus[_0x5af19b(0x397)][_0x5af19b(0x169)]=function(_0x56e425,_0x4a317f){const _0x535781=_0x5af19b,_0xe40ce6=this[_0x535781(0x88a)]();this[_0x535781(0x63c)](ColorManager[_0x535781(0x7bb)]());const _0x517076=VisuMZ[_0x535781(0x585)][_0x535781(0x47e)]['UI'][_0x535781(0x6af)];this[_0x535781(0x82b)](_0x517076,_0x56e425,_0x4a317f,_0xe40ce6,_0x535781(0x499));},Window_EquipStatus[_0x5af19b(0x397)][_0x5af19b(0x842)]=function(_0x311e66,_0x269b95,_0x22e1f1){const _0x37785d=_0x5af19b,_0x4ffa71=this[_0x37785d(0x78e)](),_0x3780d8=this['_tempActor'][_0x37785d(0x509)](_0x22e1f1),_0x225098=_0x3780d8-this[_0x37785d(0x453)][_0x37785d(0x509)](_0x22e1f1);this[_0x37785d(0x63c)](ColorManager['paramchangeTextColor'](_0x225098)),this[_0x37785d(0x82b)](this[_0x37785d(0x5f8)]['paramValueByName'](_0x22e1f1,!![]),_0x311e66,_0x269b95,_0x4ffa71,_0x37785d(0x35a));},VisuMZ[_0x5af19b(0x585)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x5af19b(0x397)][_0x5af19b(0x473)],Window_EquipItem[_0x5af19b(0x397)][_0x5af19b(0x473)]=function(_0x4aaa28){const _0x1ea688=_0x5af19b;return _0x4aaa28&&this[_0x1ea688(0x453)]?this[_0x1ea688(0x453)][_0x1ea688(0x203)](_0x4aaa28):VisuMZ[_0x1ea688(0x585)][_0x1ea688(0x42f)][_0x1ea688(0x535)](this,_0x4aaa28);},Window_StatusParams[_0x5af19b(0x397)]['maxItems']=function(){const _0xd2ed71=_0x5af19b;return VisuMZ[_0xd2ed71(0x585)][_0xd2ed71(0x47e)][_0xd2ed71(0x61e)]['DisplayedParams']['length'];},Window_StatusParams[_0x5af19b(0x397)][_0x5af19b(0x210)]=function(_0x2bc045){const _0x262f85=_0x5af19b,_0x459be5=this[_0x262f85(0x2eb)](_0x2bc045),_0x1eb797=VisuMZ[_0x262f85(0x585)]['Settings']['Param'][_0x262f85(0x232)][_0x2bc045],_0x5254c5=TextManager[_0x262f85(0x22b)](_0x1eb797),_0x45acda=this[_0x262f85(0x453)][_0x262f85(0x509)](_0x1eb797,!![]);this[_0x262f85(0x2b8)](_0x459be5['x'],_0x459be5['y'],0xa0,_0x1eb797,![]),this[_0x262f85(0x1b5)](),this['drawText'](_0x45acda,_0x459be5['x']+0xa0,_0x459be5['y'],0x3c,'right');};if(VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x8ad)]['EnableNameInput']){VisuMZ[_0x5af19b(0x585)]['Settings'][_0x5af19b(0x8ad)][_0x5af19b(0x6c1)]&&(Window_NameInput[_0x5af19b(0x4f4)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x5af19b(0x2da),'OK']);;VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x77a)]=Window_NameInput['prototype'][_0x5af19b(0x8cc)],Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(_0x68398e){const _0x2b646e=_0x5af19b;this[_0x2b646e(0x60f)]=this[_0x2b646e(0x906)](),VisuMZ[_0x2b646e(0x585)][_0x2b646e(0x77a)][_0x2b646e(0x535)](this,_0x68398e),this[_0x2b646e(0x60f)]===_0x2b646e(0x43e)?this[_0x2b646e(0x3a1)](0x0):(Input[_0x2b646e(0x3dd)](),this[_0x2b646e(0x6f2)]());},Window_NameInput['prototype'][_0x5af19b(0x906)]=function(){const _0x40d733=_0x5af19b;if(Input['isGamepadConnected']())return _0x40d733(0x43e);return VisuMZ[_0x40d733(0x585)]['Settings']['KeyboardInput']['DefaultMode']||_0x40d733(0x4bd);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x38a)]=Window_NameInput[_0x5af19b(0x397)]['processHandling'],Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x72e)]=function(){const _0x54d610=_0x5af19b;if(!this[_0x54d610(0x24b)]())return;if(!this['active'])return;if(this[_0x54d610(0x60f)]===_0x54d610(0x4bd)&&Input['isGamepadTriggered']())this['switchModes'](_0x54d610(0x43e));else{if(Input[_0x54d610(0x899)]('backspace'))Input[_0x54d610(0x3dd)](),this[_0x54d610(0x482)]();else{if(Input[_0x54d610(0x536)](_0x54d610(0x34b)))Input['clear'](),this[_0x54d610(0x60f)]===_0x54d610(0x4bd)?this[_0x54d610(0x7c6)](_0x54d610(0x43e)):this['switchModes']('keyboard');else{if(this[_0x54d610(0x60f)]===_0x54d610(0x4bd))this[_0x54d610(0x192)]();else Input[_0x54d610(0x899)]('escape')?(Input[_0x54d610(0x3dd)](),this[_0x54d610(0x7c6)]('keyboard')):VisuMZ[_0x54d610(0x585)][_0x54d610(0x38a)]['call'](this);}}}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x73d)]=Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x38d)],Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x38d)]=function(){const _0x4a097e=_0x5af19b;if(!this[_0x4a097e(0x164)]())return;if(this[_0x4a097e(0x60f)]===_0x4a097e(0x4bd)){if(TouchInput[_0x4a097e(0x536)]()&&this[_0x4a097e(0x3a4)]())this[_0x4a097e(0x7c6)]('default');else TouchInput[_0x4a097e(0x155)]()&&this[_0x4a097e(0x7c6)](_0x4a097e(0x43e));}else VisuMZ[_0x4a097e(0x585)][_0x4a097e(0x73d)][_0x4a097e(0x535)](this);},Window_NameInput['prototype']['processKeyboardHandling']=function(){const _0x53760b=_0x5af19b;if(Input[_0x53760b(0x899)](_0x53760b(0x158)))Input[_0x53760b(0x3dd)](),this[_0x53760b(0x160)]();else{if(Input[_0x53760b(0x69e)]!==undefined){let _0x5bcfb8=Input[_0x53760b(0x69e)],_0x19ae19=_0x5bcfb8[_0x53760b(0x35d)];for(let _0x239dfe=0x0;_0x239dfe<_0x19ae19;++_0x239dfe){this['_editWindow'][_0x53760b(0x6ed)](_0x5bcfb8[_0x239dfe])?SoundManager['playOk']():SoundManager[_0x53760b(0x1f6)]();}Input[_0x53760b(0x3dd)]();}}},Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x7c6)]=function(_0x47b491){const _0x4e2ff8=_0x5af19b;let _0x468e44=this[_0x4e2ff8(0x60f)];this[_0x4e2ff8(0x60f)]=_0x47b491,_0x468e44!==this[_0x4e2ff8(0x60f)]&&(this[_0x4e2ff8(0x757)](),SoundManager[_0x4e2ff8(0x579)](),this['_mode']==='default'?this[_0x4e2ff8(0x3a1)](0x0):this[_0x4e2ff8(0x3a1)](-0x1));},VisuMZ['CoreEngine'][_0x5af19b(0x204)]=Window_NameInput['prototype']['cursorDown'],Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x2cc)]=function(_0x3fd36c){const _0x59ff58=_0x5af19b;if(this['_mode']===_0x59ff58(0x4bd)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x59ff58(0x585)][_0x59ff58(0x204)][_0x59ff58(0x535)](this,_0x3fd36c),this['switchModes'](_0x59ff58(0x43e));},VisuMZ[_0x5af19b(0x585)]['Window_NameInput_cursorUp']=Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x307)],Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x307)]=function(_0x2d1a47){const _0x2e8371=_0x5af19b;if(this[_0x2e8371(0x60f)]===_0x2e8371(0x4bd)&&!Input['isArrowPressed']())return;if(Input[_0x2e8371(0x3bb)]())return;VisuMZ[_0x2e8371(0x585)][_0x2e8371(0x182)][_0x2e8371(0x535)](this,_0x2d1a47),this[_0x2e8371(0x7c6)](_0x2e8371(0x43e));},VisuMZ['CoreEngine'][_0x5af19b(0x4bc)]=Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x7ad)],Window_NameInput['prototype'][_0x5af19b(0x7ad)]=function(_0x12bb25){const _0x54927b=_0x5af19b;if(this[_0x54927b(0x60f)]==='keyboard'&&!Input[_0x54927b(0x464)]())return;if(Input[_0x54927b(0x3bb)]())return;VisuMZ[_0x54927b(0x585)][_0x54927b(0x4bc)][_0x54927b(0x535)](this,_0x12bb25),this[_0x54927b(0x7c6)](_0x54927b(0x43e));},VisuMZ['CoreEngine'][_0x5af19b(0x83d)]=Window_NameInput['prototype']['cursorLeft'],Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x940)]=function(_0x527c07){const _0x25a5a3=_0x5af19b;if(this['_mode']===_0x25a5a3(0x4bd)&&!Input[_0x25a5a3(0x464)]())return;if(Input[_0x25a5a3(0x3bb)]())return;VisuMZ[_0x25a5a3(0x585)][_0x25a5a3(0x83d)][_0x25a5a3(0x535)](this,_0x527c07),this['switchModes']('default');},VisuMZ[_0x5af19b(0x585)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x3f6)],Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x3f6)]=function(){const _0x2fcdad=_0x5af19b;if(this[_0x2fcdad(0x60f)]===_0x2fcdad(0x4bd))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x2fcdad(0x585)][_0x2fcdad(0x209)][_0x2fcdad(0x535)](this),this['switchModes'](_0x2fcdad(0x43e));},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x5a1)]=Window_NameInput[_0x5af19b(0x397)]['cursorPageup'],Window_NameInput[_0x5af19b(0x397)]['cursorPageup']=function(){const _0x525af0=_0x5af19b;if(this['_mode']===_0x525af0(0x4bd))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x525af0(0x585)][_0x525af0(0x5a1)][_0x525af0(0x535)](this),this[_0x525af0(0x7c6)](_0x525af0(0x43e));},VisuMZ[_0x5af19b(0x585)]['Window_NameInput_refresh']=Window_NameInput[_0x5af19b(0x397)][_0x5af19b(0x757)],Window_NameInput['prototype'][_0x5af19b(0x757)]=function(){const _0x17c245=_0x5af19b;if(this[_0x17c245(0x60f)]===_0x17c245(0x4bd)){this[_0x17c245(0x5b5)]['clear'](),this[_0x17c245(0x853)][_0x17c245(0x3dd)](),this[_0x17c245(0x1b5)]();let _0x3824b2=VisuMZ[_0x17c245(0x585)]['Settings'][_0x17c245(0x8ad)][_0x17c245(0x699)]['split']('\x0a'),_0x282e18=_0x3824b2[_0x17c245(0x35d)],_0x5d33af=(this[_0x17c245(0x3b0)]-_0x282e18*this[_0x17c245(0x244)]())/0x2;for(let _0x8680dd=0x0;_0x8680dd<_0x282e18;++_0x8680dd){let _0x53dfc7=_0x3824b2[_0x8680dd],_0x2ecbf2=this[_0x17c245(0x81a)](_0x53dfc7)['width'],_0x144e83=Math['floor']((this['contents'][_0x17c245(0x3fc)]-_0x2ecbf2)/0x2);this[_0x17c245(0x8f6)](_0x53dfc7,_0x144e83,_0x5d33af),_0x5d33af+=this[_0x17c245(0x244)]();}}else VisuMZ[_0x17c245(0x585)]['Window_NameInput_refresh'][_0x17c245(0x535)](this);};};VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x32d)]=Window_ShopSell[_0x5af19b(0x397)][_0x5af19b(0x473)],Window_ShopSell['prototype'][_0x5af19b(0x473)]=function(_0xe5f477){const _0x467438=_0x5af19b;return VisuMZ[_0x467438(0x585)]['Settings'][_0x467438(0x2cf)][_0x467438(0x281)]&&DataManager['isKeyItem'](_0xe5f477)?![]:VisuMZ[_0x467438(0x585)][_0x467438(0x32d)][_0x467438(0x535)](this,_0xe5f477);},Window_NumberInput['prototype'][_0x5af19b(0x419)]=function(){return![];};VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x8ad)][_0x5af19b(0x2d4)]&&(VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x1ce)]=Window_NumberInput['prototype'][_0x5af19b(0x919)],Window_NumberInput[_0x5af19b(0x397)]['start']=function(){const _0x5b4c20=_0x5af19b;VisuMZ['CoreEngine'][_0x5b4c20(0x1ce)][_0x5b4c20(0x535)](this),this[_0x5b4c20(0x3a1)](this[_0x5b4c20(0x881)]-0x1),Input[_0x5b4c20(0x3dd)]();},VisuMZ['CoreEngine'][_0x5af19b(0x2dc)]=Window_NumberInput['prototype'][_0x5af19b(0x39a)],Window_NumberInput[_0x5af19b(0x397)]['processDigitChange']=function(){const _0x245fa0=_0x5af19b;if(!this['isOpenAndActive']())return;if(Input[_0x245fa0(0x3bb)]())this[_0x245fa0(0x288)]();else{if(Input[_0x245fa0(0x899)](_0x245fa0(0x4a9)))this[_0x245fa0(0x7aa)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x245fa0(0x3b6)]();else{if(Input[_0x245fa0(0x893)]===0x24)this[_0x245fa0(0x5ec)]();else Input['_inputSpecialKeyCode']===0x23?this[_0x245fa0(0x898)]():VisuMZ[_0x245fa0(0x585)][_0x245fa0(0x2dc)][_0x245fa0(0x535)](this);}}}},Window_NumberInput[_0x5af19b(0x397)][_0x5af19b(0x4d4)]=function(){const _0x7230dc=_0x5af19b;if(!this['isCursorMovable']())return;Input[_0x7230dc(0x3bb)]()?this[_0x7230dc(0x288)]():Window_Selectable[_0x7230dc(0x397)][_0x7230dc(0x4d4)][_0x7230dc(0x535)](this);},Window_NumberInput['prototype'][_0x5af19b(0x63d)]=function(){},Window_NumberInput['prototype'][_0x5af19b(0x288)]=function(){const _0x5ccd9e=_0x5af19b;if(String(this[_0x5ccd9e(0x4d8)])['length']>=this['_maxDigits'])return;const _0x3aa826=Number(String(this['_number'])+Input[_0x5ccd9e(0x69e)]);if(isNaN(_0x3aa826))return;this[_0x5ccd9e(0x4d8)]=_0x3aa826;const _0x5a9120='9'[_0x5ccd9e(0x85e)](this[_0x5ccd9e(0x881)]);this['_number']=this['_number'][_0x5ccd9e(0x767)](0x0,_0x5a9120),Input[_0x5ccd9e(0x3dd)](),this[_0x5ccd9e(0x757)](),SoundManager[_0x5ccd9e(0x575)](),this[_0x5ccd9e(0x3a1)](this['_maxDigits']-0x1);},Window_NumberInput[_0x5af19b(0x397)][_0x5af19b(0x7aa)]=function(){const _0x27b7eb=_0x5af19b;this[_0x27b7eb(0x4d8)]=Number(String(this[_0x27b7eb(0x4d8)])['slice'](0x0,-0x1)),this[_0x27b7eb(0x4d8)]=Math['max'](0x0,this[_0x27b7eb(0x4d8)]),Input[_0x27b7eb(0x3dd)](),this['refresh'](),SoundManager[_0x27b7eb(0x575)](),this[_0x27b7eb(0x3a1)](this[_0x27b7eb(0x881)]-0x1);},Window_NumberInput[_0x5af19b(0x397)][_0x5af19b(0x3b6)]=function(){const _0xcf273c=_0x5af19b;this['_number']=Number(String(this[_0xcf273c(0x4d8)])[_0xcf273c(0x7a3)](0x1)),this['_number']=Math[_0xcf273c(0x689)](0x0,this[_0xcf273c(0x4d8)]),Input[_0xcf273c(0x3dd)](),this[_0xcf273c(0x757)](),SoundManager[_0xcf273c(0x575)](),this['select'](this[_0xcf273c(0x881)]-0x1);},Window_NumberInput[_0x5af19b(0x397)][_0x5af19b(0x5ec)]=function(){const _0x27ee94=_0x5af19b;if(this[_0x27ee94(0x477)]()===0x0)return;Input[_0x27ee94(0x3dd)](),this[_0x27ee94(0x757)](),SoundManager[_0x27ee94(0x575)](),this['select'](0x0);},Window_NumberInput[_0x5af19b(0x397)][_0x5af19b(0x898)]=function(){const _0x322cb4=_0x5af19b;if(this[_0x322cb4(0x477)]()===this[_0x322cb4(0x881)]-0x1)return;Input['clear'](),this[_0x322cb4(0x757)](),SoundManager['playCursor'](),this[_0x322cb4(0x3a1)](this[_0x322cb4(0x881)]-0x1);});;VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x25a)]=Window_MapName[_0x5af19b(0x397)]['refresh'],Window_MapName[_0x5af19b(0x397)][_0x5af19b(0x757)]=function(){const _0x122cad=_0x5af19b;VisuMZ[_0x122cad(0x585)][_0x122cad(0x47e)][_0x122cad(0x2cf)][_0x122cad(0x3f1)]?this[_0x122cad(0x621)]():VisuMZ[_0x122cad(0x585)][_0x122cad(0x25a)][_0x122cad(0x535)](this);},Window_MapName['prototype'][_0x5af19b(0x621)]=function(){const _0xb868c2=_0x5af19b;this['contents'][_0xb868c2(0x3dd)]();if($gameMap[_0xb868c2(0x85a)]()){const _0x5f380c=this[_0xb868c2(0x57f)];this[_0xb868c2(0x4c9)](0x0,0x0,_0x5f380c,this['lineHeight']());const _0x124562=this['textSizeEx']($gameMap[_0xb868c2(0x85a)]())[_0xb868c2(0x3fc)];this['drawTextEx']($gameMap[_0xb868c2(0x85a)](),Math[_0xb868c2(0x1eb)]((_0x5f380c-_0x124562)/0x2),0x0);}},Window_TitleCommand[_0x5af19b(0x2f6)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x7c7)],Window_TitleCommand['prototype'][_0x5af19b(0x598)]=function(){const _0xbd4825=_0x5af19b;this[_0xbd4825(0x21c)]();},Window_TitleCommand[_0x5af19b(0x397)][_0x5af19b(0x21c)]=function(){const _0x38398d=_0x5af19b;for(const _0x442815 of Window_TitleCommand[_0x38398d(0x2f6)]){if(_0x442815[_0x38398d(0x303)][_0x38398d(0x535)](this)){const _0x58776c=_0x442815[_0x38398d(0x49a)];let _0x27fdaf=_0x442815['TextStr'];if(['',_0x38398d(0x3ac)][_0x38398d(0x319)](_0x27fdaf))_0x27fdaf=_0x442815[_0x38398d(0x459)]['call'](this);const _0x254e0e=_0x442815[_0x38398d(0x708)][_0x38398d(0x535)](this),_0x3f112c=_0x442815[_0x38398d(0x2e0)][_0x38398d(0x535)](this);this['addCommand'](_0x27fdaf,_0x58776c,_0x254e0e,_0x3f112c),this[_0x38398d(0x863)](_0x58776c,_0x442815[_0x38398d(0x6d2)][_0x38398d(0x48b)](this,_0x3f112c));}}},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x880)]=Window_TitleCommand[_0x5af19b(0x397)]['selectLast'],Window_TitleCommand[_0x5af19b(0x397)][_0x5af19b(0x639)]=function(){const _0x570bb6=_0x5af19b;VisuMZ[_0x570bb6(0x585)][_0x570bb6(0x880)]['call'](this);if(!Window_TitleCommand[_0x570bb6(0x242)])return;const _0x5d3448=this[_0x570bb6(0x7d3)](Window_TitleCommand[_0x570bb6(0x242)]),_0x1e3a7c=Math[_0x570bb6(0x1eb)](this[_0x570bb6(0x718)]()/0x2)-0x1;this[_0x570bb6(0x602)](_0x5d3448),this[_0x570bb6(0x4ab)]>0x1&&(this[_0x570bb6(0x4ab)]=0x1,this[_0x570bb6(0x41d)]()),this[_0x570bb6(0x14f)](_0x5d3448-_0x1e3a7c);},Window_GameEnd[_0x5af19b(0x2f6)]=VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)]['MenuLayout'][_0x5af19b(0x5d4)]['CommandList'],Window_GameEnd[_0x5af19b(0x397)][_0x5af19b(0x598)]=function(){const _0x3ef13d=_0x5af19b;this[_0x3ef13d(0x21c)]();},Window_GameEnd[_0x5af19b(0x397)][_0x5af19b(0x21c)]=function(){const _0x46cdbb=_0x5af19b;for(const _0x24cfdd of Window_GameEnd[_0x46cdbb(0x2f6)]){if(_0x24cfdd['ShowJS'][_0x46cdbb(0x535)](this)){const _0x4affa1=_0x24cfdd[_0x46cdbb(0x49a)];let _0x2fb59a=_0x24cfdd[_0x46cdbb(0x38c)];if(['',_0x46cdbb(0x3ac)][_0x46cdbb(0x319)](_0x2fb59a))_0x2fb59a=_0x24cfdd[_0x46cdbb(0x459)]['call'](this);const _0x4e67f1=_0x24cfdd[_0x46cdbb(0x708)][_0x46cdbb(0x535)](this),_0x2070c6=_0x24cfdd['ExtJS']['call'](this);this[_0x46cdbb(0x8d8)](_0x2fb59a,_0x4affa1,_0x4e67f1,_0x2070c6),this[_0x46cdbb(0x863)](_0x4affa1,_0x24cfdd['CallHandlerJS'][_0x46cdbb(0x48b)](this,_0x2070c6));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x5af19b(0x397)]=Object[_0x5af19b(0x92c)](Window_Base[_0x5af19b(0x397)]),Window_ButtonAssist['prototype'][_0x5af19b(0x33b)]=Window_ButtonAssist,Window_ButtonAssist[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(_0x2c0fb0){const _0x49eaa1=_0x5af19b;this[_0x49eaa1(0x4ca)]={},Window_Base['prototype'][_0x49eaa1(0x8cc)][_0x49eaa1(0x535)](this,_0x2c0fb0),this[_0x49eaa1(0x674)](VisuMZ['CoreEngine'][_0x49eaa1(0x47e)][_0x49eaa1(0x4be)]['BgType']||0x0),this[_0x49eaa1(0x757)]();},Window_ButtonAssist[_0x5af19b(0x397)][_0x5af19b(0x244)]=function(){const _0x271166=_0x5af19b;return this['innerHeight']||Window_Base[_0x271166(0x397)][_0x271166(0x244)]['call'](this);},Window_ButtonAssist[_0x5af19b(0x397)][_0x5af19b(0x1b2)]=function(){const _0x3952cc=_0x5af19b;this['contents'][_0x3952cc(0x798)]<=0x60&&(this[_0x3952cc(0x5b5)][_0x3952cc(0x798)]+=0x6);},Window_ButtonAssist[_0x5af19b(0x397)]['makeFontSmaller']=function(){const _0x282a45=_0x5af19b;this[_0x282a45(0x5b5)]['fontSize']>=0x18&&(this[_0x282a45(0x5b5)][_0x282a45(0x798)]-=0x6);},Window_ButtonAssist[_0x5af19b(0x397)][_0x5af19b(0x556)]=function(){const _0x3349dd=_0x5af19b;Window_Base[_0x3349dd(0x397)][_0x3349dd(0x556)][_0x3349dd(0x535)](this),this[_0x3349dd(0x202)]();},Window_ButtonAssist[_0x5af19b(0x397)]['updatePadding']=function(){const _0xb2a7cd=_0x5af19b;this[_0xb2a7cd(0x322)]=SceneManager['_scene'][_0xb2a7cd(0x2fd)]()!==_0xb2a7cd(0x187)?0x0:0x8;},Window_ButtonAssist['prototype']['updateKeyText']=function(){const _0x1a8b73=_0x5af19b,_0x3a5e0a=SceneManager['_scene'];for(let _0x565ab0=0x1;_0x565ab0<=0x5;_0x565ab0++){if(this[_0x1a8b73(0x4ca)][_0x1a8b73(0x240)[_0x1a8b73(0x8b9)](_0x565ab0)]!==_0x3a5e0a[_0x1a8b73(0x5d8)[_0x1a8b73(0x8b9)](_0x565ab0)]())return this[_0x1a8b73(0x757)]();if(this[_0x1a8b73(0x4ca)][_0x1a8b73(0x727)['format'](_0x565ab0)]!==_0x3a5e0a[_0x1a8b73(0x36b)[_0x1a8b73(0x8b9)](_0x565ab0)]())return this[_0x1a8b73(0x757)]();}},Window_ButtonAssist[_0x5af19b(0x397)]['refresh']=function(){const _0x4104c9=_0x5af19b;this[_0x4104c9(0x5b5)][_0x4104c9(0x3dd)]();for(let _0x10fea4=0x1;_0x10fea4<=0x5;_0x10fea4++){this['drawSegment'](_0x10fea4);}},Window_ButtonAssist[_0x5af19b(0x397)]['drawSegment']=function(_0x10fa77){const _0x5cac8c=_0x5af19b,_0x48aa0c=this[_0x5cac8c(0x57f)]/0x5,_0x177787=SceneManager[_0x5cac8c(0x4ff)],_0x1e1324=_0x177787[_0x5cac8c(0x5d8)['format'](_0x10fa77)](),_0x19aecd=_0x177787[_0x5cac8c(0x36b)[_0x5cac8c(0x8b9)](_0x10fa77)]();this[_0x5cac8c(0x4ca)]['key%1'[_0x5cac8c(0x8b9)](_0x10fa77)]=_0x1e1324,this['_data'][_0x5cac8c(0x727)[_0x5cac8c(0x8b9)](_0x10fa77)]=_0x19aecd;if(_0x1e1324==='')return;if(_0x19aecd==='')return;const _0x2dfa87=_0x177787[_0x5cac8c(0x45a)['format'](_0x10fa77)](),_0x2439cd=this[_0x5cac8c(0x858)](),_0xd69be4=_0x48aa0c*(_0x10fa77-0x1)+_0x2439cd+_0x2dfa87,_0x29dae6=VisuMZ[_0x5cac8c(0x585)]['Settings'][_0x5cac8c(0x4be)][_0x5cac8c(0x80b)];this[_0x5cac8c(0x8f6)](_0x29dae6['format'](_0x1e1324,_0x19aecd),_0xd69be4,0x0,_0x48aa0c-_0x2439cd*0x2);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x255)]=Game_Interpreter['prototype'][_0x5af19b(0x408)],Game_Interpreter['prototype'][_0x5af19b(0x408)]=function(){const _0x115860=_0x5af19b;if($gameTemp[_0x115860(0x630)]!==undefined)return VisuMZ[_0x115860(0x585)][_0x115860(0x61c)]();return VisuMZ[_0x115860(0x585)]['Game_Interpreter_updateWaitMode'][_0x115860(0x535)](this);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x61c)]=function(){const _0x298ec9=_0x5af19b,_0x593c3c=$gameTemp[_0x298ec9(0x630)]||0x0;(_0x593c3c<0x0||_0x593c3c>0x64||TouchInput[_0x298ec9(0x155)]()||Input['isTriggered'](_0x298ec9(0x252)))&&($gameTemp[_0x298ec9(0x630)]=undefined,Input[_0x298ec9(0x3dd)](),TouchInput[_0x298ec9(0x3dd)]());const _0x346f67=$gameScreen[_0x298ec9(0x813)](_0x593c3c);return _0x346f67&&(_0x346f67['_x']=TouchInput['_x'],_0x346f67['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x298ec9(0x383)](),$gameTemp[_0x298ec9(0x630)]!==undefined;},VisuMZ['CoreEngine'][_0x5af19b(0x383)]=function(){const _0x1186f0=_0x5af19b,_0x444e44=SceneManager[_0x1186f0(0x4ff)];if(!_0x444e44)return;!_0x444e44[_0x1186f0(0x882)]&&(SoundManager['playLoad'](),_0x444e44[_0x1186f0(0x882)]=new Window_PictureCoordinates(),_0x444e44[_0x1186f0(0x73a)](_0x444e44[_0x1186f0(0x882)])),$gameTemp[_0x1186f0(0x630)]===undefined&&(SoundManager['playCancel'](),_0x444e44[_0x1186f0(0x424)](_0x444e44['_pictureCoordinatesWindow']),_0x444e44[_0x1186f0(0x882)]=undefined);};function _0x4b94(_0x1e273f,_0xd922fe){const _0x266fbb=_0x266f();return _0x4b94=function(_0x4b94d3,_0x4cf385){_0x4b94d3=_0x4b94d3-0x146;let _0x4347c0=_0x266fbb[_0x4b94d3];return _0x4347c0;},_0x4b94(_0x1e273f,_0xd922fe);}function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x5af19b(0x397)]=Object['create'](Window_Base['prototype']),Window_PictureCoordinates[_0x5af19b(0x397)][_0x5af19b(0x33b)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x5af19b(0x397)]['initialize']=function(){const _0x583f59=_0x5af19b;this[_0x583f59(0x3ff)]=_0x583f59(0x36d),this['_lastX']=_0x583f59(0x36d),this[_0x583f59(0x32c)]=_0x583f59(0x36d);const _0x4d1c5c=this[_0x583f59(0x4a2)]();Window_Base[_0x583f59(0x397)][_0x583f59(0x8cc)][_0x583f59(0x535)](this,_0x4d1c5c),this[_0x583f59(0x674)](0x2);},Window_PictureCoordinates[_0x5af19b(0x397)][_0x5af19b(0x4a2)]=function(){const _0x4d2510=_0x5af19b;let _0x4f5371=0x0,_0x53265a=Graphics[_0x4d2510(0x7ff)]-this[_0x4d2510(0x244)](),_0x351732=Graphics['width'],_0x3cc4e6=this[_0x4d2510(0x244)]();return new Rectangle(_0x4f5371,_0x53265a,_0x351732,_0x3cc4e6);},Window_PictureCoordinates[_0x5af19b(0x397)][_0x5af19b(0x2f4)]=function(){const _0x1c1b68=_0x5af19b;this[_0x1c1b68(0x322)]=0x0;},Window_PictureCoordinates['prototype'][_0x5af19b(0x556)]=function(){const _0x396790=_0x5af19b;Window_Base['prototype']['update'][_0x396790(0x535)](this),this['updateData']();},Window_PictureCoordinates[_0x5af19b(0x397)][_0x5af19b(0x7b3)]=function(){const _0xb2e216=_0x5af19b;if(!this['needsUpdate']())return;this[_0xb2e216(0x757)]();},Window_PictureCoordinates[_0x5af19b(0x397)][_0x5af19b(0x403)]=function(){const _0x4ae1d8=_0x5af19b,_0x354c9f=$gameTemp[_0x4ae1d8(0x630)],_0x1c7766=$gameScreen[_0x4ae1d8(0x813)](_0x354c9f);return _0x1c7766?this[_0x4ae1d8(0x3ff)]!==_0x1c7766[_0x4ae1d8(0x493)]||this['_lastX']!==_0x1c7766['_x']||this[_0x4ae1d8(0x32c)]!==_0x1c7766['_y']:![];},Window_PictureCoordinates[_0x5af19b(0x397)][_0x5af19b(0x757)]=function(){const _0x4dbaec=_0x5af19b;this[_0x4dbaec(0x5b5)][_0x4dbaec(0x3dd)]();const _0x56815d=$gameTemp[_0x4dbaec(0x630)],_0x4d7efc=$gameScreen['picture'](_0x56815d);if(!_0x4d7efc)return;this[_0x4dbaec(0x3ff)]=_0x4d7efc[_0x4dbaec(0x493)],this[_0x4dbaec(0x938)]=_0x4d7efc['_x'],this[_0x4dbaec(0x32c)]=_0x4d7efc['_y'];const _0x32698b=ColorManager[_0x4dbaec(0x26e)]();this['contents'][_0x4dbaec(0x61d)](0x0,0x0,this[_0x4dbaec(0x57f)],this[_0x4dbaec(0x3b0)],_0x32698b);const _0x4b6f89=_0x4dbaec(0x7e7)[_0x4dbaec(0x8b9)](_0x4d7efc['_origin']===0x0?_0x4dbaec(0x7b7):_0x4dbaec(0x37d)),_0x18b99e='X:\x20%1'[_0x4dbaec(0x8b9)](_0x4d7efc['_x']),_0x3bc7a7=_0x4dbaec(0x74d)[_0x4dbaec(0x8b9)](_0x4d7efc['_y']),_0x2fe7fc=_0x4dbaec(0x63f)['format'](TextManager['getInputButtonString'](_0x4dbaec(0x252)));let _0x2583c3=Math[_0x4dbaec(0x1eb)](this[_0x4dbaec(0x57f)]/0x4);this[_0x4dbaec(0x82b)](_0x4b6f89,_0x2583c3*0x0,0x0,_0x2583c3),this[_0x4dbaec(0x82b)](_0x18b99e,_0x2583c3*0x1,0x0,_0x2583c3,_0x4dbaec(0x499)),this['drawText'](_0x3bc7a7,_0x2583c3*0x2,0x0,_0x2583c3,_0x4dbaec(0x499));const _0x385740=this[_0x4dbaec(0x81a)](_0x2fe7fc)[_0x4dbaec(0x3fc)],_0x54219b=this[_0x4dbaec(0x57f)]-_0x385740;this[_0x4dbaec(0x8f6)](_0x2fe7fc,_0x54219b,0x0,_0x385740);};function Window_TextPopup(){const _0x4dbcfb=_0x5af19b;this[_0x4dbcfb(0x8cc)](...arguments);}Window_TextPopup['prototype']=Object[_0x5af19b(0x92c)](Window_Base[_0x5af19b(0x397)]),Window_TextPopup['prototype'][_0x5af19b(0x33b)]=Window_TextPopup,Window_TextPopup[_0x5af19b(0x18a)]={'framesPerChar':VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x47e)][_0x5af19b(0x685)][_0x5af19b(0x39f)]??1.5,'framesMin':VisuMZ['CoreEngine']['Settings'][_0x5af19b(0x685)][_0x5af19b(0x5be)]??0x5a,'framesMax':VisuMZ[_0x5af19b(0x585)]['Settings'][_0x5af19b(0x685)][_0x5af19b(0x1b8)]??0x12c},Window_TextPopup[_0x5af19b(0x397)][_0x5af19b(0x8cc)]=function(){const _0x55ab57=_0x5af19b,_0x252827=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x55ab57(0x397)][_0x55ab57(0x8cc)]['call'](this,_0x252827),this[_0x55ab57(0x427)]=0x0,this[_0x55ab57(0x694)]='',this[_0x55ab57(0x618)]=[],this['_timeDuration']=0x0;},Window_TextPopup[_0x5af19b(0x397)]['isAutoColorAffected']=function(){return!![];},Window_TextPopup['prototype']['addQueue']=function(_0x50da2f){const _0x586e8e=_0x5af19b;if(this[_0x586e8e(0x618)][this[_0x586e8e(0x618)]['length']-0x1]===_0x50da2f)return;this[_0x586e8e(0x618)][_0x586e8e(0x3a5)](_0x50da2f),SceneManager[_0x586e8e(0x4ff)][_0x586e8e(0x73a)](this);},Window_TextPopup[_0x5af19b(0x397)][_0x5af19b(0x556)]=function(){const _0x5e6fb0=_0x5af19b;Window_Base[_0x5e6fb0(0x397)]['update'][_0x5e6fb0(0x535)](this),this[_0x5e6fb0(0x40c)](),this[_0x5e6fb0(0x172)]();},Window_TextPopup['prototype'][_0x5af19b(0x40c)]=function(){const _0x1ce116=_0x5af19b;if(this[_0x1ce116(0x694)]!=='')return;if(this[_0x1ce116(0x618)][_0x1ce116(0x35d)]<=0x0)return;if(!this['isClosed']())return;this[_0x1ce116(0x694)]=this[_0x1ce116(0x618)]['shift']();const _0x4171e3=Window_TextPopup[_0x1ce116(0x18a)],_0xb62e86=Math[_0x1ce116(0x592)](this[_0x1ce116(0x694)][_0x1ce116(0x35d)]*_0x4171e3[_0x1ce116(0x2ad)]);this[_0x1ce116(0x696)]=_0xb62e86['clamp'](_0x4171e3[_0x1ce116(0x4b4)],_0x4171e3[_0x1ce116(0x948)]);const _0x4a8af6=this[_0x1ce116(0x81a)](this[_0x1ce116(0x694)]);let _0x12f2e4=_0x4a8af6[_0x1ce116(0x3fc)]+this[_0x1ce116(0x858)]()*0x2;_0x12f2e4+=$gameSystem[_0x1ce116(0x339)]()*0x2;let _0x448fc3=Math[_0x1ce116(0x689)](_0x4a8af6[_0x1ce116(0x7ff)],this[_0x1ce116(0x244)]());_0x448fc3+=$gameSystem[_0x1ce116(0x339)]()*0x2;const _0x3cc6e2=Math['round']((Graphics[_0x1ce116(0x3fc)]-_0x12f2e4)/0x2),_0x5a29db=Math[_0x1ce116(0x548)]((Graphics[_0x1ce116(0x7ff)]-_0x448fc3)/0x2),_0x4f6d69=new Rectangle(_0x3cc6e2,_0x5a29db,_0x12f2e4,_0x448fc3);this[_0x1ce116(0x857)](_0x4f6d69['x'],_0x4f6d69['y'],_0x4f6d69[_0x1ce116(0x3fc)],_0x4f6d69[_0x1ce116(0x7ff)]),this['createContents'](),this[_0x1ce116(0x757)](),this[_0x1ce116(0x338)](),SceneManager[_0x1ce116(0x4ff)][_0x1ce116(0x73a)](this);},Window_TextPopup[_0x5af19b(0x397)]['refresh']=function(){const _0x32a3cc=_0x5af19b,_0x22ff09=this['baseTextRect']();this[_0x32a3cc(0x5b5)][_0x32a3cc(0x3dd)](),this['drawTextEx'](this['_text'],_0x22ff09['x'],_0x22ff09['y'],_0x22ff09[_0x32a3cc(0x3fc)]);},Window_TextPopup[_0x5af19b(0x397)]['updateDuration']=function(){const _0x5211a4=_0x5af19b;if(this['isOpening']()||this['isClosing']())return;if(this[_0x5211a4(0x696)]<=0x0)return;this['_timeDuration']--,this['_timeDuration']<=0x0&&(this[_0x5211a4(0x5e5)](),this[_0x5211a4(0x694)]='');},VisuMZ[_0x5af19b(0x7a0)]=function(_0x30964f){const _0x1a11c3=_0x5af19b;if(Utils['isOptionValid'](_0x1a11c3(0x1db))){var _0x13e3a3=require(_0x1a11c3(0x5fa))[_0x1a11c3(0x685)][_0x1a11c3(0x287)]();SceneManager[_0x1a11c3(0x2d2)]();if(_0x30964f)setTimeout(_0x13e3a3[_0x1a11c3(0x4ad)][_0x1a11c3(0x48b)](_0x13e3a3),0x190);}},VisuMZ[_0x5af19b(0x7c3)]=function(_0x470886,_0x3647b1){const _0x5188a0=_0x5af19b;_0x3647b1=_0x3647b1[_0x5188a0(0x49d)]();var _0x940dd4=1.70158,_0x1c884a=0.7;switch(_0x3647b1){case _0x5188a0(0x5ad):return _0x470886;case _0x5188a0(0x237):return-0x1*Math['cos'](_0x470886*(Math['PI']/0x2))+0x1;case _0x5188a0(0x6dd):return Math[_0x5188a0(0x836)](_0x470886*(Math['PI']/0x2));case _0x5188a0(0x486):return-0.5*(Math['cos'](Math['PI']*_0x470886)-0x1);case _0x5188a0(0x1d1):return _0x470886*_0x470886;case _0x5188a0(0x5ca):return _0x470886*(0x2-_0x470886);case'INOUTQUAD':return _0x470886<0.5?0x2*_0x470886*_0x470886:-0x1+(0x4-0x2*_0x470886)*_0x470886;case _0x5188a0(0x69d):return _0x470886*_0x470886*_0x470886;case _0x5188a0(0x355):var _0x25993b=_0x470886-0x1;return _0x25993b*_0x25993b*_0x25993b+0x1;case _0x5188a0(0x3fa):return _0x470886<0.5?0x4*_0x470886*_0x470886*_0x470886:(_0x470886-0x1)*(0x2*_0x470886-0x2)*(0x2*_0x470886-0x2)+0x1;case _0x5188a0(0x5bf):return _0x470886*_0x470886*_0x470886*_0x470886;case _0x5188a0(0x866):var _0x25993b=_0x470886-0x1;return 0x1-_0x25993b*_0x25993b*_0x25993b*_0x25993b;case _0x5188a0(0x781):var _0x25993b=_0x470886-0x1;return _0x470886<0.5?0x8*_0x470886*_0x470886*_0x470886*_0x470886:0x1-0x8*_0x25993b*_0x25993b*_0x25993b*_0x25993b;case _0x5188a0(0x4e4):return _0x470886*_0x470886*_0x470886*_0x470886*_0x470886;case _0x5188a0(0x171):var _0x25993b=_0x470886-0x1;return 0x1+_0x25993b*_0x25993b*_0x25993b*_0x25993b*_0x25993b;case _0x5188a0(0x7a9):var _0x25993b=_0x470886-0x1;return _0x470886<0.5?0x10*_0x470886*_0x470886*_0x470886*_0x470886*_0x470886:0x1+0x10*_0x25993b*_0x25993b*_0x25993b*_0x25993b*_0x25993b;case _0x5188a0(0x6fb):if(_0x470886===0x0)return 0x0;return Math[_0x5188a0(0x87f)](0x2,0xa*(_0x470886-0x1));case _0x5188a0(0x181):if(_0x470886===0x1)return 0x1;return-Math[_0x5188a0(0x87f)](0x2,-0xa*_0x470886)+0x1;case _0x5188a0(0x5f1):if(_0x470886===0x0||_0x470886===0x1)return _0x470886;var _0x297bfe=_0x470886*0x2,_0x5370e1=_0x297bfe-0x1;if(_0x297bfe<0x1)return 0.5*Math['pow'](0x2,0xa*_0x5370e1);return 0.5*(-Math[_0x5188a0(0x87f)](0x2,-0xa*_0x5370e1)+0x2);case _0x5188a0(0x64e):var _0x297bfe=_0x470886/0x1;return-0x1*(Math[_0x5188a0(0x4d5)](0x1-_0x297bfe*_0x470886)-0x1);case _0x5188a0(0x721):var _0x25993b=_0x470886-0x1;return Math[_0x5188a0(0x4d5)](0x1-_0x25993b*_0x25993b);case _0x5188a0(0x8a4):var _0x297bfe=_0x470886*0x2,_0x5370e1=_0x297bfe-0x2;if(_0x297bfe<0x1)return-0.5*(Math[_0x5188a0(0x4d5)](0x1-_0x297bfe*_0x297bfe)-0x1);return 0.5*(Math[_0x5188a0(0x4d5)](0x1-_0x5370e1*_0x5370e1)+0x1);case _0x5188a0(0x404):return _0x470886*_0x470886*((_0x940dd4+0x1)*_0x470886-_0x940dd4);case _0x5188a0(0x84f):var _0x297bfe=_0x470886/0x1-0x1;return _0x297bfe*_0x297bfe*((_0x940dd4+0x1)*_0x297bfe+_0x940dd4)+0x1;break;case _0x5188a0(0x6c6):var _0x297bfe=_0x470886*0x2,_0x5362e4=_0x297bfe-0x2,_0x1d2099=_0x940dd4*1.525;if(_0x297bfe<0x1)return 0.5*_0x297bfe*_0x297bfe*((_0x1d2099+0x1)*_0x297bfe-_0x1d2099);return 0.5*(_0x5362e4*_0x5362e4*((_0x1d2099+0x1)*_0x5362e4+_0x1d2099)+0x2);case _0x5188a0(0x179):if(_0x470886===0x0||_0x470886===0x1)return _0x470886;var _0x297bfe=_0x470886/0x1,_0x5370e1=_0x297bfe-0x1,_0x4c2d27=0x1-_0x1c884a,_0x1d2099=_0x4c2d27/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math['pow'](0x2,0xa*_0x5370e1)*Math[_0x5188a0(0x836)]((_0x5370e1-_0x1d2099)*(0x2*Math['PI'])/_0x4c2d27));case _0x5188a0(0x531):var _0x4c2d27=0x1-_0x1c884a,_0x297bfe=_0x470886*0x2;if(_0x470886===0x0||_0x470886===0x1)return _0x470886;var _0x1d2099=_0x4c2d27/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x5188a0(0x87f)](0x2,-0xa*_0x297bfe)*Math[_0x5188a0(0x836)]((_0x297bfe-_0x1d2099)*(0x2*Math['PI'])/_0x4c2d27)+0x1;case'INOUTELASTIC':var _0x4c2d27=0x1-_0x1c884a;if(_0x470886===0x0||_0x470886===0x1)return _0x470886;var _0x297bfe=_0x470886*0x2,_0x5370e1=_0x297bfe-0x1,_0x1d2099=_0x4c2d27/(0x2*Math['PI'])*Math[_0x5188a0(0x88e)](0x1);if(_0x297bfe<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x5370e1)*Math['sin']((_0x5370e1-_0x1d2099)*(0x2*Math['PI'])/_0x4c2d27));return Math[_0x5188a0(0x87f)](0x2,-0xa*_0x5370e1)*Math[_0x5188a0(0x836)]((_0x5370e1-_0x1d2099)*(0x2*Math['PI'])/_0x4c2d27)*0.5+0x1;case _0x5188a0(0x1a3):var _0x297bfe=_0x470886/0x1;if(_0x297bfe<0x1/2.75)return 7.5625*_0x297bfe*_0x297bfe;else{if(_0x297bfe<0x2/2.75){var _0x5362e4=_0x297bfe-1.5/2.75;return 7.5625*_0x5362e4*_0x5362e4+0.75;}else{if(_0x297bfe<2.5/2.75){var _0x5362e4=_0x297bfe-2.25/2.75;return 7.5625*_0x5362e4*_0x5362e4+0.9375;}else{var _0x5362e4=_0x297bfe-2.625/2.75;return 7.5625*_0x5362e4*_0x5362e4+0.984375;}}}case _0x5188a0(0x6ee):var _0x591370=0x1-VisuMZ[_0x5188a0(0x7c3)](0x1-_0x470886,_0x5188a0(0x831));return _0x591370;case _0x5188a0(0x506):if(_0x470886<0.5)var _0x591370=VisuMZ[_0x5188a0(0x7c3)](_0x470886*0x2,'inbounce')*0.5;else var _0x591370=VisuMZ[_0x5188a0(0x7c3)](_0x470886*0x2-0x1,_0x5188a0(0x831))*0.5+0.5;return _0x591370;default:return _0x470886;}},VisuMZ[_0x5af19b(0x465)]=function(_0x4b1da5){const _0x47d636=_0x5af19b;_0x4b1da5=String(_0x4b1da5)['toUpperCase']();const _0x24d1e4=VisuMZ[_0x47d636(0x585)]['Settings'][_0x47d636(0x61e)];if(_0x4b1da5==='MAXHP')return _0x24d1e4[_0x47d636(0x50a)];if(_0x4b1da5===_0x47d636(0x36e))return _0x24d1e4['IconParam1'];if(_0x4b1da5===_0x47d636(0x7ee))return _0x24d1e4['IconParam2'];if(_0x4b1da5===_0x47d636(0x794))return _0x24d1e4[_0x47d636(0x749)];if(_0x4b1da5===_0x47d636(0x5c4))return _0x24d1e4['IconParam4'];if(_0x4b1da5===_0x47d636(0x2d8))return _0x24d1e4[_0x47d636(0x331)];if(_0x4b1da5===_0x47d636(0x168))return _0x24d1e4[_0x47d636(0x2b3)];if(_0x4b1da5===_0x47d636(0x5e3))return _0x24d1e4['IconParam7'];if(_0x4b1da5===_0x47d636(0x835))return _0x24d1e4['IconXParam0'];if(_0x4b1da5===_0x47d636(0x44f))return _0x24d1e4[_0x47d636(0x14b)];if(_0x4b1da5===_0x47d636(0x223))return _0x24d1e4[_0x47d636(0x195)];if(_0x4b1da5===_0x47d636(0x205))return _0x24d1e4[_0x47d636(0x2bd)];if(_0x4b1da5===_0x47d636(0x3de))return _0x24d1e4['IconXParam4'];if(_0x4b1da5===_0x47d636(0x562))return _0x24d1e4[_0x47d636(0x2c7)];if(_0x4b1da5==='CNT')return _0x24d1e4[_0x47d636(0x438)];if(_0x4b1da5===_0x47d636(0x437))return _0x24d1e4['IconXParam7'];if(_0x4b1da5===_0x47d636(0x8c7))return _0x24d1e4['IconXParam8'];if(_0x4b1da5==='TRG')return _0x24d1e4[_0x47d636(0x528)];if(_0x4b1da5===_0x47d636(0x15a))return _0x24d1e4[_0x47d636(0x183)];if(_0x4b1da5===_0x47d636(0x6f1))return _0x24d1e4[_0x47d636(0x698)];if(_0x4b1da5===_0x47d636(0x705))return _0x24d1e4[_0x47d636(0x20f)];if(_0x4b1da5===_0x47d636(0x3c3))return _0x24d1e4[_0x47d636(0x7f6)];if(_0x4b1da5===_0x47d636(0x89f))return _0x24d1e4['IconSParam4'];if(_0x4b1da5===_0x47d636(0x1e4))return _0x24d1e4[_0x47d636(0x7fe)];if(_0x4b1da5===_0x47d636(0x28d))return _0x24d1e4['IconSParam6'];if(_0x4b1da5===_0x47d636(0x3b2))return _0x24d1e4['IconSParam7'];if(_0x4b1da5===_0x47d636(0x6e5))return _0x24d1e4[_0x47d636(0x296)];if(_0x4b1da5===_0x47d636(0x26a))return _0x24d1e4['IconSParam9'];if(VisuMZ[_0x47d636(0x585)][_0x47d636(0x52e)][_0x4b1da5])return VisuMZ[_0x47d636(0x585)]['CustomParamIcons'][_0x4b1da5]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x2b072f,_0x2823be,_0xa33d46){const _0x263632=_0x5af19b;if(_0xa33d46===undefined&&_0x2b072f%0x1===0x0)return _0x2b072f;if(_0xa33d46!==undefined&&[_0x263632(0x676),_0x263632(0x36e),_0x263632(0x7ee),_0x263632(0x794),'MAT',_0x263632(0x2d8),_0x263632(0x168),_0x263632(0x5e3)][_0x263632(0x319)](String(_0xa33d46)['toUpperCase']()[_0x263632(0x254)]()))return _0x2b072f;_0x2823be=_0x2823be||0x0;if(VisuMZ[_0x263632(0x585)][_0x263632(0x6f6)][_0xa33d46])return VisuMZ[_0x263632(0x585)][_0x263632(0x5ba)][_0xa33d46]==='integer'?_0x2b072f:String((_0x2b072f*0x64)['toFixed'](_0x2823be))+'%';return String((_0x2b072f*0x64)[_0x263632(0x17f)](_0x2823be))+'%';},VisuMZ['GroupDigits']=function(_0x3ebb8e){const _0x2dd18f=_0x5af19b;_0x3ebb8e=String(_0x3ebb8e);if(!_0x3ebb8e)return _0x3ebb8e;if(typeof _0x3ebb8e!==_0x2dd18f(0x3ce))return _0x3ebb8e;const _0x4c9469=VisuMZ['CoreEngine']['Settings'][_0x2dd18f(0x2cf)][_0x2dd18f(0x827)]||_0x2dd18f(0x7b2),_0x59b26a={'maximumFractionDigits':0x6};_0x3ebb8e=_0x3ebb8e[_0x2dd18f(0x7f0)](/\[(.*?)\]/g,(_0x3b0425,_0x54bf01)=>{const _0x1a6f55=_0x2dd18f;return VisuMZ[_0x1a6f55(0x261)](_0x54bf01,'[',']');}),_0x3ebb8e=_0x3ebb8e[_0x2dd18f(0x7f0)](/<(.*?)>/g,(_0x433295,_0xf28243)=>{const _0x1f9713=_0x2dd18f;return VisuMZ[_0x1f9713(0x261)](_0xf28243,'<','>');}),_0x3ebb8e=_0x3ebb8e[_0x2dd18f(0x7f0)](/\{\{(.*?)\}\}/g,(_0x514494,_0x3d693d)=>{const _0x581130=_0x2dd18f;return VisuMZ[_0x581130(0x261)](_0x3d693d,'','');}),_0x3ebb8e=_0x3ebb8e[_0x2dd18f(0x7f0)](/(\d+\.?\d*)/g,(_0x2fc4a6,_0x14e76b)=>{const _0x633fe6=_0x2dd18f;let _0x1f7cdf=_0x14e76b;if(_0x1f7cdf[0x0]==='0')return _0x1f7cdf;if(_0x1f7cdf[_0x1f7cdf[_0x633fe6(0x35d)]-0x1]==='.')return Number(_0x1f7cdf)['toLocaleString'](_0x4c9469,_0x59b26a)+'.';else return _0x1f7cdf[_0x1f7cdf[_0x633fe6(0x35d)]-0x1]===','?Number(_0x1f7cdf)['toLocaleString'](_0x4c9469,_0x59b26a)+',':Number(_0x1f7cdf)[_0x633fe6(0x7c2)](_0x4c9469,_0x59b26a);});let _0x1ce22f=0x3;while(_0x1ce22f--){_0x3ebb8e=VisuMZ['RevertPreserveNumbers'](_0x3ebb8e);}return _0x3ebb8e;},VisuMZ['PreserveNumbers']=function(_0x37952a,_0x5ee81d,_0x45d408){const _0x5d86fd=_0x5af19b;return _0x37952a=_0x37952a[_0x5d86fd(0x7f0)](/(\d)/gi,(_0x55d314,_0x573788)=>_0x5d86fd(0x82e)[_0x5d86fd(0x8b9)](Number(_0x573788))),_0x5d86fd(0x26f)['format'](_0x37952a,_0x5ee81d,_0x45d408);},VisuMZ[_0x5af19b(0x90f)]=function(_0x84ba63){const _0x3281d8=_0x5af19b;return _0x84ba63=_0x84ba63[_0x3281d8(0x7f0)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x261882,_0x4e5f29)=>Number(parseInt(_0x4e5f29))),_0x84ba63;},VisuMZ[_0x5af19b(0x219)]=function(_0x3f61ab){const _0x2fc384=_0x5af19b;SoundManager[_0x2fc384(0x579)]();if(!Utils[_0x2fc384(0x818)]()){const _0x36ae9b=window[_0x2fc384(0x338)](_0x3f61ab,_0x2fc384(0x888));}else{const _0x475a36=process[_0x2fc384(0x3df)]==_0x2fc384(0x8e1)?_0x2fc384(0x338):process[_0x2fc384(0x3df)]==_0x2fc384(0x59c)?_0x2fc384(0x919):_0x2fc384(0x43c);require(_0x2fc384(0x2a1))[_0x2fc384(0x943)](_0x475a36+'\x20'+_0x3f61ab);}},VisuMZ['createKeyJS']=function(_0x5e4097,_0x2e2017){const _0x4d138d=_0x5af19b;if(!_0x5e4097)return'';const _0x3a8141=_0x5e4097[_0x4d138d(0x6ae)]||_0x5e4097['id'];let _0x102ad1='';return _0x5e4097[_0x4d138d(0x7ea)]!==undefined&&_0x5e4097[_0x4d138d(0x92f)]!==undefined&&(_0x102ad1=_0x4d138d(0x17c)[_0x4d138d(0x8b9)](_0x3a8141,_0x2e2017)),_0x5e4097[_0x4d138d(0x431)]!==undefined&&_0x5e4097[_0x4d138d(0x79a)]!==undefined&&(_0x102ad1='Class-%1-%2'[_0x4d138d(0x8b9)](_0x3a8141,_0x2e2017)),_0x5e4097[_0x4d138d(0x16b)]!==undefined&&_0x5e4097[_0x4d138d(0x1d2)]!==undefined&&(_0x102ad1='Skill-%1-%2'[_0x4d138d(0x8b9)](_0x3a8141,_0x2e2017)),_0x5e4097[_0x4d138d(0x792)]!==undefined&&_0x5e4097[_0x4d138d(0x3f9)]!==undefined&&(_0x102ad1=_0x4d138d(0x436)['format'](_0x3a8141,_0x2e2017)),_0x5e4097[_0x4d138d(0x64d)]!==undefined&&_0x5e4097[_0x4d138d(0x2e5)]===0x1&&(_0x102ad1=_0x4d138d(0x7d6)[_0x4d138d(0x8b9)](_0x3a8141,_0x2e2017)),_0x5e4097['atypeId']!==undefined&&_0x5e4097[_0x4d138d(0x2e5)]>0x1&&(_0x102ad1=_0x4d138d(0x375)[_0x4d138d(0x8b9)](_0x3a8141,_0x2e2017)),_0x5e4097[_0x4d138d(0x3ef)]!==undefined&&_0x5e4097[_0x4d138d(0x4fa)]!==undefined&&(_0x102ad1=_0x4d138d(0x40a)[_0x4d138d(0x8b9)](_0x3a8141,_0x2e2017)),_0x5e4097[_0x4d138d(0x271)]!==undefined&&_0x5e4097['maxTurns']!==undefined&&(_0x102ad1=_0x4d138d(0x2e7)[_0x4d138d(0x8b9)](_0x3a8141,_0x2e2017)),_0x102ad1;},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x16f)]=function(_0x37b4de,_0xe81e55){const _0x1fcbae=_0x5af19b,_0x575f75=ImageManager['standardIconWidth']||0x20,_0xf9c6d=ImageManager[_0x1fcbae(0x194)]||0x20;if(_0xe81e55[_0x1fcbae(0x703)]){const _0x14d7b4=_0x575f75-ImageManager['iconWidth'],_0x1ea0db=_0xf9c6d-ImageManager[_0x1fcbae(0x8ba)];let _0x5c1f08=0x2,_0x47b9e9=0x2;this[_0x1fcbae(0x244)]()!==0x24&&(_0x47b9e9=Math[_0x1fcbae(0x1eb)]((this[_0x1fcbae(0x244)]()-_0xf9c6d)/0x2));const _0x7aafa8=_0xe81e55['x']+Math[_0x1fcbae(0x1eb)](_0x14d7b4/0x2)+_0x5c1f08,_0x10e48f=_0xe81e55['y']+Math['floor'](_0x1ea0db/0x2)+_0x47b9e9;this['drawIcon'](_0x37b4de,_0x7aafa8,_0x10e48f);}_0xe81e55['x']+=_0x575f75+0x4;},Window_StatusBase['prototype'][_0x5af19b(0x43a)]=function(_0x1b847b,_0x5ea205,_0x38d0b7,_0x39aba3){const _0x6b8af2=_0x5af19b;_0x39aba3=_0x39aba3||0x90;const _0x259f6e=ImageManager['standardIconWidth']||0x20,_0x2cd803=ImageManager[_0x6b8af2(0x194)]||0x20,_0x1d6271=_0x259f6e-ImageManager[_0x6b8af2(0x1ac)],_0x45aecf=_0x2cd803-ImageManager[_0x6b8af2(0x8ba)],_0x3b1cde=_0x259f6e,_0x2ead0d=_0x1b847b[_0x6b8af2(0x6eb)]()['slice'](0x0,Math[_0x6b8af2(0x1eb)](_0x39aba3/_0x3b1cde));let _0x3c6b18=_0x5ea205+Math['ceil'](_0x1d6271/0x2),_0x7727c4=_0x38d0b7+Math[_0x6b8af2(0x592)](_0x45aecf/0x2);for(const _0xf9c95c of _0x2ead0d){this[_0x6b8af2(0x756)](_0xf9c95c,_0x3c6b18,_0x7727c4),_0x3c6b18+=_0x3b1cde;}},Game_Picture['prototype']['anchor']=function(){const _0x4aa5d7=_0x5af19b;return this[_0x4aa5d7(0x3e1)];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x793)]=Game_Picture[_0x5af19b(0x397)]['initBasic'],Game_Picture[_0x5af19b(0x397)]['initBasic']=function(){const _0x3867ea=_0x5af19b;VisuMZ[_0x3867ea(0x585)][_0x3867ea(0x793)][_0x3867ea(0x535)](this),this[_0x3867ea(0x3e1)]={'x':0x0,'y':0x0},this[_0x3867ea(0x854)]={'x':0x0,'y':0x0};},VisuMZ[_0x5af19b(0x585)]['Game_Picture_updateMove']=Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x7f8)],Game_Picture['prototype'][_0x5af19b(0x7f8)]=function(){const _0x4d2c11=_0x5af19b;this[_0x4d2c11(0x627)]();const _0x3b3a68=this[_0x4d2c11(0x714)];VisuMZ[_0x4d2c11(0x585)]['Game_Picture_updateMove'][_0x4d2c11(0x535)](this),_0x3b3a68>0x0&&this[_0x4d2c11(0x714)]<=0x0&&(this['_x']=this[_0x4d2c11(0x221)],this['_y']=this[_0x4d2c11(0x663)],this[_0x4d2c11(0x72d)]=this[_0x4d2c11(0x7fd)],this[_0x4d2c11(0x7d2)]=this[_0x4d2c11(0x892)],this[_0x4d2c11(0x4b3)]=this[_0x4d2c11(0x856)],this[_0x4d2c11(0x3e1)]&&(this[_0x4d2c11(0x3e1)]['x']=this['_targetAnchor']['x'],this[_0x4d2c11(0x3e1)]['y']=this[_0x4d2c11(0x854)]['y']));},VisuMZ[_0x5af19b(0x585)]['Game_Picture_show']=Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x7f1)],Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x7f1)]=function(_0x3bd2ba,_0x1c00a3,_0x5f273f,_0x51c0ea,_0x96d1e2,_0x1823ab,_0x49b2af,_0x222e62){const _0x294070=_0x5af19b;VisuMZ['CoreEngine'][_0x294070(0x733)][_0x294070(0x535)](this,_0x3bd2ba,_0x1c00a3,_0x5f273f,_0x51c0ea,_0x96d1e2,_0x1823ab,_0x49b2af,_0x222e62),this[_0x294070(0x55a)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1c00a3]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x5af19b(0x7ca)]=Game_Picture['prototype'][_0x5af19b(0x857)],Game_Picture['prototype'][_0x5af19b(0x857)]=function(_0x3079fc,_0x4400a2,_0x2459b5,_0x172c24,_0x8d0a08,_0x3d7cc4,_0x1e786d,_0x586935,_0x25ccc3){const _0x3fe014=_0x5af19b;VisuMZ['CoreEngine']['Game_Picture_move'][_0x3fe014(0x535)](this,_0x3079fc,_0x4400a2,_0x2459b5,_0x172c24,_0x8d0a08,_0x3d7cc4,_0x1e786d,_0x586935,_0x25ccc3),this[_0x3fe014(0x2d5)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3079fc]||{'x':0x0,'y':0x0});},Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x627)]=function(){const _0x4969d8=_0x5af19b;this[_0x4969d8(0x714)]>0x0&&(this[_0x4969d8(0x3e1)]['x']=this[_0x4969d8(0x6d9)](this[_0x4969d8(0x3e1)]['x'],this['_targetAnchor']['x']),this[_0x4969d8(0x3e1)]['y']=this[_0x4969d8(0x6d9)](this[_0x4969d8(0x3e1)]['y'],this[_0x4969d8(0x854)]['y']));},Game_Picture[_0x5af19b(0x397)][_0x5af19b(0x55a)]=function(_0x2665bb){const _0x4fb181=_0x5af19b;this[_0x4fb181(0x3e1)]=_0x2665bb,this[_0x4fb181(0x854)]=JsonEx[_0x4fb181(0x910)](this[_0x4fb181(0x3e1)]);},Game_Picture['prototype']['setTargetAnchor']=function(_0x13749e){const _0x3f5631=_0x5af19b;this[_0x3f5631(0x854)]=_0x13749e;},VisuMZ['CoreEngine'][_0x5af19b(0x4f5)]=Sprite_Picture[_0x5af19b(0x397)][_0x5af19b(0x2fb)],Sprite_Picture['prototype'][_0x5af19b(0x2fb)]=function(){const _0x129833=_0x5af19b,_0x1dfd43=this['picture']();!_0x1dfd43[_0x129833(0x90c)]()?VisuMZ[_0x129833(0x585)]['Sprite_Picture_updateOrigin'][_0x129833(0x535)](this):(this[_0x129833(0x90c)]['x']=_0x1dfd43[_0x129833(0x90c)]()['x'],this[_0x129833(0x90c)]['y']=_0x1dfd43[_0x129833(0x90c)]()['y']);},Game_Action[_0x5af19b(0x397)][_0x5af19b(0x34c)]=function(_0x37ec87){const _0xe50926=_0x5af19b;if(_0x37ec87){const _0x45f8ca=_0x37ec87[_0xe50926(0x2ab)];if(_0x45f8ca===0x1&&this[_0xe50926(0x3d0)]()[_0xe50926(0x67c)]()!==0x1)this[_0xe50926(0x337)]();else _0x45f8ca===0x2&&this[_0xe50926(0x3d0)]()[_0xe50926(0x8c6)]()!==0x2?this[_0xe50926(0x764)]():this[_0xe50926(0x20c)](_0x45f8ca);}else this[_0xe50926(0x3dd)]();},Game_Actor[_0x5af19b(0x397)][_0x5af19b(0x222)]=function(){const _0x2c0df9=_0x5af19b;return this[_0x2c0df9(0x4cb)]()[_0x2c0df9(0x4fc)](_0x256091=>this[_0x2c0df9(0x660)](_0x256091)&&this[_0x2c0df9(0x7d1)]()[_0x2c0df9(0x319)](_0x256091[_0x2c0df9(0x16b)]));},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x4f6)]=function(){const _0x3e7ea8=_0x5af19b;this['_dimmerSprite']=new Sprite(),this['_dimmerSprite'][_0x3e7ea8(0x519)]=new Bitmap(0x0,0x0),this[_0x3e7ea8(0x27b)]['x']=0x0,this[_0x3e7ea8(0x4c6)](this[_0x3e7ea8(0x27b)]);},Window_Base[_0x5af19b(0x397)][_0x5af19b(0x71b)]=function(){const _0x58e605=_0x5af19b;if(this[_0x58e605(0x27b)]){const _0x4b8a44=this['_dimmerSprite'][_0x58e605(0x519)],_0x4aa5=this[_0x58e605(0x3fc)],_0x192486=this[_0x58e605(0x7ff)],_0x4b3844=this[_0x58e605(0x322)],_0x2bb330=ColorManager['dimColor1'](),_0x4176ba=ColorManager[_0x58e605(0x5f7)]();_0x4b8a44[_0x58e605(0x5f3)](_0x4aa5,_0x192486),_0x4b8a44[_0x58e605(0x1bd)](0x0,0x0,_0x4aa5,_0x4b3844,_0x4176ba,_0x2bb330,!![]),_0x4b8a44[_0x58e605(0x61d)](0x0,_0x4b3844,_0x4aa5,_0x192486-_0x4b3844*0x2,_0x2bb330),_0x4b8a44[_0x58e605(0x1bd)](0x0,_0x192486-_0x4b3844,_0x4aa5,_0x4b3844,_0x2bb330,_0x4176ba,!![]),this[_0x58e605(0x27b)][_0x58e605(0x39c)](0x0,0x0,_0x4aa5,_0x192486);}},Game_Actor['prototype'][_0x5af19b(0x6a7)]=function(){const _0x23c69a=_0x5af19b;for(let _0x30e62e=0x0;_0x30e62e<this[_0x23c69a(0x900)]();_0x30e62e++){const _0x40e2f2=this['makeActionList']();let _0x473b38=Number[_0x23c69a(0x228)];this[_0x23c69a(0x887)](_0x30e62e,_0x40e2f2[0x0]);for(const _0x1fb7e9 of _0x40e2f2){const _0xf5f147=_0x1fb7e9[_0x23c69a(0x29c)]();_0xf5f147>_0x473b38&&(_0x473b38=_0xf5f147,this['setAction'](_0x30e62e,_0x1fb7e9));}}this[_0x23c69a(0x873)](_0x23c69a(0x348));},Window_BattleItem['prototype'][_0x5af19b(0x473)]=function(_0x1e063a){const _0xb1e424=_0x5af19b;return BattleManager[_0xb1e424(0x6bf)]()?BattleManager[_0xb1e424(0x6bf)]()[_0xb1e424(0x660)](_0x1e063a):Window_ItemList[_0xb1e424(0x397)]['isEnabled'][_0xb1e424(0x535)](this,_0x1e063a);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x58c)]=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x6bc)],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x6bc)]=function(){const _0x2400df=_0x5af19b;VisuMZ[_0x2400df(0x585)][_0x2400df(0x58c)][_0x2400df(0x535)](this);const _0x589a6b=this[_0x2400df(0x830)]['_timerSprite'];if(_0x589a6b)this['addChild'](_0x589a6b);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x544)]=Scene_Battle[_0x5af19b(0x397)][_0x5af19b(0x6bc)],Scene_Battle[_0x5af19b(0x397)][_0x5af19b(0x6bc)]=function(){const _0x2f870b=_0x5af19b;VisuMZ[_0x2f870b(0x585)][_0x2f870b(0x544)][_0x2f870b(0x535)](this);const _0x2a8a25=this['_spriteset']['_timerSprite'];if(_0x2a8a25)this[_0x2f870b(0x73a)](_0x2a8a25);},Sprite_Actor[_0x5af19b(0x397)][_0x5af19b(0x556)]=function(){const _0x2892b7=_0x5af19b;Sprite_Battler[_0x2892b7(0x397)][_0x2892b7(0x556)][_0x2892b7(0x535)](this),this[_0x2892b7(0x595)]();if(this[_0x2892b7(0x453)])this[_0x2892b7(0x8c0)]();else this[_0x2892b7(0x40b)]!==''&&(this[_0x2892b7(0x40b)]='');},Window['prototype']['_refreshArrows']=function(){const _0x13d256=_0x5af19b,_0x2477d4=this[_0x13d256(0x796)],_0x24cfe8=this[_0x13d256(0x8ab)],_0x518592=0x18,_0x5c369a=_0x518592/0x2,_0x1a26c2=0x60+_0x518592,_0x1e5c21=0x0+_0x518592;this[_0x13d256(0x582)][_0x13d256(0x519)]=this[_0x13d256(0x4c4)],this[_0x13d256(0x582)]['anchor']['x']=0.5,this[_0x13d256(0x582)][_0x13d256(0x90c)]['y']=0.5,this[_0x13d256(0x582)]['setFrame'](_0x1a26c2+_0x5c369a,_0x1e5c21+_0x5c369a+_0x518592,_0x518592,_0x5c369a),this['_downArrowSprite'][_0x13d256(0x857)](Math[_0x13d256(0x548)](_0x2477d4/0x2),Math[_0x13d256(0x548)](_0x24cfe8-_0x5c369a)),this['_upArrowSprite']['bitmap']=this['_windowskin'],this[_0x13d256(0x379)][_0x13d256(0x90c)]['x']=0.5,this['_upArrowSprite'][_0x13d256(0x90c)]['y']=0.5,this['_upArrowSprite'][_0x13d256(0x39c)](_0x1a26c2+_0x5c369a,_0x1e5c21,_0x518592,_0x5c369a),this[_0x13d256(0x379)][_0x13d256(0x857)](Math[_0x13d256(0x548)](_0x2477d4/0x2),Math[_0x13d256(0x548)](_0x5c369a));},Window[_0x5af19b(0x397)][_0x5af19b(0x3a8)]=function(){const _0x373661=_0x5af19b,_0x66ffec=0x90,_0x30feaf=0x60,_0x459a2f=0x18;this[_0x373661(0x949)][_0x373661(0x519)]=this[_0x373661(0x4c4)],this[_0x373661(0x949)]['anchor']['x']=0.5,this[_0x373661(0x949)][_0x373661(0x90c)]['y']=0x1,this['_pauseSignSprite'][_0x373661(0x857)](Math[_0x373661(0x548)](this[_0x373661(0x796)]/0x2),this[_0x373661(0x8ab)]),this[_0x373661(0x949)][_0x373661(0x39c)](_0x66ffec,_0x30feaf,_0x459a2f,_0x459a2f),this['_pauseSignSprite'][_0x373661(0x5f6)]=0xff;},Window[_0x5af19b(0x397)][_0x5af19b(0x14a)]=function(){const _0x736506=_0x5af19b,_0x18b09e=this[_0x736506(0x60d)]['worldTransform'][_0x736506(0x50f)](new Point(0x0,0x0)),_0x4033b0=this[_0x736506(0x60d)][_0x736506(0x6c0)];_0x4033b0['x']=_0x18b09e['x']+this[_0x736506(0x236)]['x'],_0x4033b0['y']=_0x18b09e['y']+this[_0x736506(0x236)]['y'],_0x4033b0[_0x736506(0x3fc)]=Math[_0x736506(0x592)](this[_0x736506(0x57f)]*this[_0x736506(0x6d5)]['x']),_0x4033b0['height']=Math['ceil'](this['innerHeight']*this[_0x736506(0x6d5)]['y']);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x78c)]=Window[_0x5af19b(0x397)]['_refreshBack'],Window[_0x5af19b(0x397)][_0x5af19b(0x8ce)]=function(){const _0x2bf184=_0x5af19b,_0x5c6297=VisuMZ[_0x2bf184(0x585)][_0x2bf184(0x47e)][_0x2bf184(0x685)][_0x2bf184(0x2f1)]??!![];if(!_0x5c6297)return VisuMZ[_0x2bf184(0x585)][_0x2bf184(0x78c)][_0x2bf184(0x535)](this);const _0x5073cb=this[_0x2bf184(0x277)],_0x3975ba=Math[_0x2bf184(0x689)](0x0,this[_0x2bf184(0x796)]-_0x5073cb*0x2),_0x377ef3=Math[_0x2bf184(0x689)](0x0,this['_height']-_0x5073cb*0x2),_0x15b2e8=this['_backSprite'],_0x2450a7=_0x15b2e8[_0x2bf184(0x19a)][0x0];_0x15b2e8['bitmap']=this[_0x2bf184(0x4c4)],_0x15b2e8[_0x2bf184(0x39c)](0x0,0x0,0x60,0x60),_0x15b2e8[_0x2bf184(0x857)](_0x5073cb,_0x5073cb),_0x15b2e8[_0x2bf184(0x6d5)]['x']=_0x3975ba/0x60,_0x15b2e8[_0x2bf184(0x6d5)]['y']=_0x377ef3/0x60,_0x2450a7['bitmap']=this[_0x2bf184(0x4c4)],_0x2450a7[_0x2bf184(0x39c)](0x0,0x60,0x60,0x60),_0x2450a7['move'](0x0,0x0,_0x3975ba,_0x377ef3),_0x2450a7[_0x2bf184(0x6d5)]['x']=0x1/_0x15b2e8['scale']['x'],_0x2450a7[_0x2bf184(0x6d5)]['y']=0x1/_0x15b2e8[_0x2bf184(0x6d5)]['y'],_0x15b2e8['setColorTone'](this[_0x2bf184(0x189)]);},Game_Temp[_0x5af19b(0x397)][_0x5af19b(0x25d)]=function(){const _0x538ae3=_0x5af19b;this[_0x538ae3(0x1c7)]=[],this[_0x538ae3(0x541)]=[],this['_pointAnimationQueue']=[],this['_balloonQueue']=[];},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x843)]=Scene_Base[_0x5af19b(0x397)][_0x5af19b(0x844)],Scene_Base['prototype'][_0x5af19b(0x844)]=function(){const _0x4a264f=_0x5af19b;if($gameTemp)$gameTemp[_0x4a264f(0x25d)]();VisuMZ[_0x4a264f(0x585)]['Scene_Base_terminateAnimationClearBugFix'][_0x4a264f(0x535)](this);},Bitmap['prototype']['measureTextWidthNoRounding']=function(_0x37b923){const _0x577711=_0x5af19b,_0x446548=this['context'];_0x446548['save'](),_0x446548[_0x577711(0x773)]=this['_makeFontNameText']();const _0x3c90fa=_0x446548[_0x577711(0x33e)](_0x37b923)[_0x577711(0x3fc)];return _0x446548[_0x577711(0x163)](),_0x3c90fa;},Window_Message['prototype'][_0x5af19b(0x384)]=function(_0x223a46){const _0x502237=_0x5af19b;return this[_0x502237(0x4e7)]()?this['contents'][_0x502237(0x500)](_0x223a46):Window_Base[_0x502237(0x397)][_0x502237(0x384)][_0x502237(0x535)](this,_0x223a46);},Window_Message[_0x5af19b(0x397)][_0x5af19b(0x4e7)]=function(){const _0x1853c7=_0x5af19b;return VisuMZ[_0x1853c7(0x585)]['Settings']['QoL'][_0x1853c7(0x49f)]??!![];},VisuMZ['CoreEngine'][_0x5af19b(0x2b2)]=Game_Action[_0x5af19b(0x397)][_0x5af19b(0x20b)],Game_Action[_0x5af19b(0x397)]['numRepeats']=function(){const _0x215c7f=_0x5af19b;return this['item']()?VisuMZ['CoreEngine'][_0x215c7f(0x2b2)][_0x215c7f(0x535)](this):0x0;},VisuMZ[_0x5af19b(0x585)]['Game_Action_setAttack']=Game_Action[_0x5af19b(0x397)]['setAttack'],Game_Action[_0x5af19b(0x397)][_0x5af19b(0x337)]=function(){const _0x1e0239=_0x5af19b;if(this[_0x1e0239(0x3d0)]()&&this[_0x1e0239(0x3d0)]()[_0x1e0239(0x47d)]())VisuMZ['CoreEngine']['Game_Action_setAttack'][_0x1e0239(0x535)](this);else BattleManager[_0x1e0239(0x6c7)]?VisuMZ[_0x1e0239(0x585)][_0x1e0239(0x1e6)][_0x1e0239(0x535)](this):this[_0x1e0239(0x3dd)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x1a0)]=BattleManager['invokeCounterAttack'],BattleManager[_0x5af19b(0x233)]=function(_0x481d20,_0x1f808b){const _0x4108d5=_0x5af19b;this[_0x4108d5(0x6c7)]=!![],VisuMZ[_0x4108d5(0x585)][_0x4108d5(0x1a0)]['call'](this,_0x481d20,_0x1f808b),this['_bypassCanCounterCheck']=undefined;},Sprite_Name[_0x5af19b(0x397)][_0x5af19b(0x401)]=function(){return 0x24;},Sprite_Name[_0x5af19b(0x397)][_0x5af19b(0x1cd)]=function(){const _0x32dba0=_0x5af19b,_0x184b38=this[_0x32dba0(0x678)](),_0x5170de=this[_0x32dba0(0x2ff)](),_0x574b67=this[_0x32dba0(0x401)]();this['setupFont'](),this['bitmap'][_0x32dba0(0x3dd)](),this[_0x32dba0(0x519)]['drawTextTopAligned'](_0x184b38,0x4,0x0,_0x5170de-0xa,_0x574b67,_0x32dba0(0x334));},Bitmap[_0x5af19b(0x397)][_0x5af19b(0x174)]=function(_0x22323a,_0x38ba11,_0x70471d,_0x27e5f2,_0x431a54,_0x359aa8){const _0x31a812=_0x5af19b,_0x23620c=this[_0x31a812(0x550)],_0x1e13b2=_0x23620c[_0x31a812(0x8ea)];_0x27e5f2=_0x27e5f2||0xffffffff;let _0x216613=_0x38ba11,_0x47c0d3=Math[_0x31a812(0x548)](_0x70471d+0x18/0x2+this[_0x31a812(0x798)]*0.35);_0x359aa8===_0x31a812(0x499)&&(_0x216613+=_0x27e5f2/0x2),_0x359aa8==='right'&&(_0x216613+=_0x27e5f2),_0x23620c[_0x31a812(0x6bd)](),_0x23620c['font']=this[_0x31a812(0x58f)](),_0x23620c['textAlign']=_0x359aa8,_0x23620c[_0x31a812(0x149)]='alphabetic',_0x23620c[_0x31a812(0x8ea)]=0x1,this[_0x31a812(0x78f)](_0x22323a,_0x216613,_0x47c0d3,_0x27e5f2),_0x23620c[_0x31a812(0x8ea)]=_0x1e13b2,this[_0x31a812(0x6fa)](_0x22323a,_0x216613,_0x47c0d3,_0x27e5f2),_0x23620c[_0x31a812(0x163)](),this[_0x31a812(0x632)][_0x31a812(0x556)]();},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x46d)]=BattleManager[_0x5af19b(0x5ed)],BattleManager['checkSubstitute']=function(_0x5427b3){const _0x5393cc=_0x5af19b;if(this[_0x5393cc(0x787)][_0x5393cc(0x70c)]()===_0x5427b3['isActor']())return![];return VisuMZ[_0x5393cc(0x585)][_0x5393cc(0x46d)]['call'](this,_0x5427b3);},BattleManager[_0x5af19b(0x94d)]=function(){const _0x2674c5=_0x5af19b;if(this[_0x2674c5(0x787)])this[_0x2674c5(0x3d4)][_0x2674c5(0x94d)](this[_0x2674c5(0x787)]);this[_0x2674c5(0x364)]='turn',this[_0x2674c5(0x787)]&&this[_0x2674c5(0x787)][_0x2674c5(0x900)]()===0x0&&(this[_0x2674c5(0x426)](this['_subject']),this['_subject']=null);},Bitmap[_0x5af19b(0x397)]['_startLoading']=function(){const _0x3325bf=_0x5af19b;this[_0x3325bf(0x41b)]=new Image(),this[_0x3325bf(0x41b)]['onload']=this[_0x3325bf(0x3b8)][_0x3325bf(0x48b)](this),this['_image'][_0x3325bf(0x774)]=this['_onError'][_0x3325bf(0x48b)](this),this[_0x3325bf(0x805)](),this[_0x3325bf(0x35b)]=_0x3325bf(0x357),Utils[_0x3325bf(0x901)]()?this[_0x3325bf(0x804)]():(this[_0x3325bf(0x41b)][_0x3325bf(0x68c)]=this['_url'],![]&&this[_0x3325bf(0x41b)][_0x3325bf(0x3fc)]>0x0&&(this[_0x3325bf(0x41b)]['onload']=null,this['_onLoad']()));},Scene_Skill['prototype']['onActorChange']=function(){const _0x23fe43=_0x5af19b;Scene_MenuBase['prototype']['onActorChange']['call'](this),this[_0x23fe43(0x283)](),this[_0x23fe43(0x390)][_0x23fe43(0x7a7)](),this[_0x23fe43(0x390)][_0x23fe43(0x6f2)](),this[_0x23fe43(0x5f9)][_0x23fe43(0x7a4)]();},Scene_Skill[_0x5af19b(0x397)][_0x5af19b(0x4da)]=function(){const _0x30787d=_0x5af19b;return this[_0x30787d(0x5f9)]&&this['_skillTypeWindow']['active'];},Game_Map[_0x5af19b(0x397)][_0x5af19b(0x4cc)]=function(_0x4a1a07,_0xa394a1,_0x1ec372){const _0x17798c=_0x5af19b,_0x40217e=this[_0x17798c(0x40e)](),_0x406952=this['allTiles'](_0x4a1a07,_0xa394a1);for(const _0x1803f6 of _0x406952){const _0xd1b79a=_0x40217e[_0x1803f6];if(_0xd1b79a===undefined||_0xd1b79a===null){if($gameTemp[_0x17798c(0x75a)]()&&!DataManager[_0x17798c(0x591)]()){let _0x10f632=_0x17798c(0x435)+'\x0a';_0x10f632+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x10f632+='and\x20add\x20it\x20onto\x20this\x20one.';if(this[_0x17798c(0x3d2)]())alert(_0x10f632),SceneManager[_0x17798c(0x358)]();else{if(!this[_0x17798c(0x737)])console[_0x17798c(0x615)](_0x10f632);this[_0x17798c(0x737)]=!![];}}}if((_0xd1b79a&0x10)!==0x0)continue;if((_0xd1b79a&_0x1ec372)===0x0)return!![];if((_0xd1b79a&_0x1ec372)===_0x1ec372)return![];}return![];},Game_Map[_0x5af19b(0x397)]['showIncompleteTilesetError']=function(){const _0x2dd634=_0x5af19b;if(Imported[_0x2dd634(0x3fd)])return!![];if(Imported[_0x2dd634(0x15f)])return!![];return![];},Sprite_Animation['prototype']['saveViewport']=function(_0x51a307){const _0x39d8fa=_0x5af19b;!this[_0x39d8fa(0x8dc)]&&(this[_0x39d8fa(0x8dc)]=_0x51a307['gl'][_0x39d8fa(0x715)](_0x51a307['gl']['VIEWPORT']));},VisuMZ['CoreEngine'][_0x5af19b(0x5d9)]=Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x59d)],Scene_Map[_0x5af19b(0x397)][_0x5af19b(0x59d)]=function(){const _0x279b0e=_0x5af19b,_0xbdeecd=SceneManager[_0x279b0e(0x1b7)][_0x279b0e(0x678)];if([_0x279b0e(0x343),_0x279b0e(0x89a),_0x279b0e(0x578),_0x279b0e(0x46c)][_0x279b0e(0x319)](_0xbdeecd))return![];return VisuMZ[_0x279b0e(0x585)][_0x279b0e(0x5d9)][_0x279b0e(0x535)](this);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x65a)]=Window_SkillList[_0x5af19b(0x397)][_0x5af19b(0x319)],Window_SkillList[_0x5af19b(0x397)][_0x5af19b(0x319)]=function(_0xc946a){const _0x49d3b4=_0x5af19b;if(this['_stypeId']<=0x0)return![];return VisuMZ['CoreEngine']['Window_SkillList_includes'][_0x49d3b4(0x535)](this,_0xc946a);},VisuMZ[_0x5af19b(0x585)][_0x5af19b(0x611)]=Game_Battler[_0x5af19b(0x397)][_0x5af19b(0x884)],Game_Battler[_0x5af19b(0x397)][_0x5af19b(0x884)]=function(_0x34b12f){const _0x1a0ccd=_0x5af19b;VisuMZ[_0x1a0ccd(0x585)]['Game_Battler_initTpbChargeTime'][_0x1a0ccd(0x535)](this,_0x34b12f),isNaN(this[_0x1a0ccd(0x877)])&&(VisuMZ[_0x1a0ccd(0x585)][_0x1a0ccd(0x611)][_0x1a0ccd(0x535)](this,_0x34b12f),isNaN(this[_0x1a0ccd(0x877)])&&(this[_0x1a0ccd(0x877)]=0x0));},Game_Battler[_0x5af19b(0x397)][_0x5af19b(0x8bc)]=function(){const _0x237d75=_0x5af19b;this[_0x237d75(0x463)]===_0x237d75(0x57a)&&(this[_0x237d75(0x877)]+=this[_0x237d75(0x151)](),isNaN(this[_0x237d75(0x877)])&&(this['_tpbChargeTime']=this[_0x237d75(0x151)](),isNaN(this[_0x237d75(0x877)])&&(this[_0x237d75(0x877)]=0x0)),this[_0x237d75(0x877)]>=0x1&&(this['_tpbChargeTime']=0x1,this[_0x237d75(0x3b4)]()));};