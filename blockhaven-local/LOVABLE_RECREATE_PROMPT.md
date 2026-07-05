# Blockhaven Lovable Recreate Prompt

Project: `Blockhaven - Isometric Sandbox`

This is a reconstructed Lovable prompt for recreating the current Blockhaven preview as editable source. It was built from the local Lovable preview mirror, deployed bundle strings, rendered UI text, and mirror metadata.

It is not the original hidden Lovable prompt. The original editable source was not exposed by the preview URL.

## Source Evidence

- Lovable preview: `https://lovable.dev/preview/RtONOpDgIUr6kC4hMi2EP9Jc0u151dSl`
- Lovable project ID: `486a196d-b0e0-4e89-a99a-efe7900809d9`
- Mirrored deployed revision: `d2a1e54622d7634cb9bedcd695f5dd31ef77cbe0`
- Local mirror path: `blockhaven-local/`
- Observed app title: `Blockhaven - Isometric Sandbox`
- Observed storage key: `blockhaven:v1`

## Known Unknowns

- The original Lovable prompt is not available from the deployed preview.
- The exact original component names, file names, local helper abstractions, and intermediate design iterations are inferred.
- The prompt below prioritises recreating the working product behaviour and UI rather than matching the minified bundle byte-for-byte.
- Lovable may choose different implementation details unless explicitly constrained in the prompt.

## Paste This Into Lovable

```text
Build a complete editable React + TypeScript + Vite application called "Blockhaven - Isometric Sandbox".

The first screen must be the actual playable game. Do not create a marketing landing page, splash page, pricing page, explanation page, or brochure site.

Product concept:
Blockhaven is a cosy isometric floating-island sandbox game. The player explores a small procedural sky island, mines voxel-like blocks, crafts tools and building items, places blocks, manages hunger and health, builds a shelter, lights the world, stores items in chests, and can save/export/import the world locally.

Target outcome:
Create a browser-playable canvas game that feels like a lightweight Minecraft/Terraria-inspired isometric sandbox, with a polished HUD, inventory, crafting panel, minimap, build mode, autosave, save import/export, screenshot support, and mobile controls.

Tech stack:
- React
- TypeScript
- Vite
- Canvas 2D for the world renderer
- Plain local state or a small internal game-engine class
- localStorage persistence
- No backend
- No external API calls
- No authentication
- No database
- No multiplayer
- No generated SVG hero illustration

The application must run locally with:
`npm install`
`npm run dev`

Create editable source. Do not output only a static exported bundle.

Design direction:
- Full viewport game surface.
- Dark navy/indigo background, roughly `#0b1224`.
- Floating HUD panels with black translucent backgrounds, white text, subtle blur, thin white borders, and compact controls.
- Cosy voxel colours with readable top/left/right isometric faces.
- UI should feel like a polished game HUD, not a web dashboard.
- Buttons should be compact and tactile.
- Modals should be dark, centred, rounded, and readable.
- Use fixed game HUD placement so the canvas fills the screen.
- Maintain mobile support at 390px width with no horizontal scrolling, no clipped critical labels, and touch controls visible.
- Use UK English spelling.

Core game world:
- Render an isometric block world on a canvas.
- Use an isometric projection where each tile is drawn as a block with top, left, and right faces.
- Approximate projection constants:
  - tile width: 40px
  - tile depth visual height: 20px
  - vertical block height: 24px
- Generate a floating island grid around 30 x 30 tiles.
- Use seeded procedural generation so a world can be saved and recreated.
- Generate island shape using smooth/noise-like functions.
- Terrain heights should vary from about 1 to 6 blocks.
- Generate stone, dirt, grass, sand, water, clay, coal ore, iron ore and crystal ore.
- Surface rules:
  - top layer is usually grass.
  - low coastal/edge areas can be sand.
  - near edges, clay can appear.
  - shallow water can appear in low areas.
  - underground layers are mostly stone.
  - ore appears inside stone by probability/noise.
- Add trees:
  - 3-block wood trunk.
  - leaves around the top and one cap leaf.
- Add berry bushes and flowers on grass.
- Find a spawn point near the centre on grass.

Player:
- Player has position `{ x, y, z, facing }`.
- Spawn near island centre.
- Player can move with WASD and arrow keys.
- Player z should follow the top of the column they stand on.
- Camera follows the player smoothly and can be re-centred.
- Draw the player as a small isometric character with a soft shadow.
- Show a crosshair or target indicator at screen centre.
- Movement should feel responsive.

State model:
Use a structured state similar to:

type ItemId =
  | "grass"
  | "dirt"
  | "stone"
  | "wood"
  | "leaves"
  | "sand"
  | "water"
  | "clay"
  | "coal"
  | "iron"
  | "crystal"
  | "planks"
  | "brick"
  | "glass"
  | "torch"
  | "door"
  | "ladder"
  | "workbench"
  | "chest"
  | "farmland"
  | "berry"
  | "flower"
  | "lantern"
  | "crystal_lamp"
  | "campfire"
  | "sapling"
  | "wood_pick"
  | "stone_pick"
  | "iron_pick"
  | "cooked_berry"
  | "gel";

interface BlockDefinition {
  id: ItemId;
  name: string;
  top: string;
  left: string;
  right: string;
  hardness: number;
  solid: boolean;
  transparent?: boolean;
  light: number;
  drop: ItemId | null;
  placeable: boolean;
  tooltip: string;
  tier?: number;
  food?: number;
  toolPower?: number;
}

interface GameState {
  version: 2;
  seed: number;
  blocks: Map<string, ItemId>;
  chests: Record<string, { items: Partial<Record<ItemId, number>> }>;
  saplings: Record<string, { plantedAt: number; age: number }>;
  player: { x: number; y: number; z: number; facing: "n" | "s" | "e" | "w" };
  inventory: Partial<Record<ItemId, number>>;
  hotbar: Array<ItemId | null>;
  hotbarIndex: number;
  time: number;
  hasWorkbench: boolean;
  hasCampfire: boolean;
  settings: GameSettings;
  health: number;
  maxHealth: number;
  hunger: number;
  maxHunger: number;
  weather: "clear" | "rain";
  weatherUntil: number;
  clock: number;
}

Use string block coordinates like `"x,y,z"` for the block map.

Initial player stats:
- Health: 10/10.
- Hunger/food: 10/10.
- Initial time: about 0.25.
- Initial inventory:
  - wood: 16
  - dirt: 16
  - stone: 16
  - torch: 8
  - planks: 0
- Initial hotbar:
  - slot 1 dirt
  - slot 2 stone
  - slot 3 wood
  - slot 4 planks
  - slot 5 torch
  - slots 6 to 9 empty

Blocks and items:
Implement these item definitions. Colours are important because the icon and block rendering should use isometric face colours.

1. Grass
   id `grass`; top `#7cc76a`; left `#8b6a3f`; right `#6a5030`; hardness 0.18; solid true; drop `dirt`; not placeable; tooltip "Soft turf. Drops dirt."; tier 0.
2. Dirt
   id `dirt`; top `#a17548`; left `#8b6437`; right `#6b4d2a`; hardness 0.25; solid true; drop `dirt`; placeable; tooltip "Rich soil."; tier 0.
3. Stone
   id `stone`; top `#a6adb6`; left `#8890a0`; right `#6a7180`; hardness 1.2; solid true; drop `stone`; placeable; tooltip "Solid rock. Needs a wood pick."; tier 1.
4. Wood
   id `wood`; top `#a17b4a`; left `#7a5a34`; right `#5c4527`; hardness 0.6; solid true; drop `wood`; placeable; tooltip "Tree trunk log."; tier 0.
5. Leaves
   id `leaves`; top `#5bb04c`; left `#489a3d`; right `#377830`; hardness 0.12; solid true; transparent true; drop `leaves`; placeable; tooltip "Rustling foliage. Sometimes drops saplings."; tier 0.
6. Sand
   id `sand`; top `#eadba0`; left `#d1c188`; right `#a89966`; hardness 0.2; solid true; drop `sand`; placeable; tooltip "Grainy sand."; tier 0.
7. Water
   id `water`; top `#5aa8e0`; left `#4990c4`; right `#3676a3`; hardness 0; solid false; transparent true; no drop; not placeable; tooltip "Shallow water."; tier 0.
8. Clay
   id `clay`; top `#c9a89a`; left `#a88676`; right `#83685a`; hardness 0.5; solid true; drop `clay`; placeable; tooltip "Damp clay lump."; tier 0.
9. Coal Ore
   id `coal`; top `#4a4a52`; left `#3a3a42`; right `#292930`; hardness 1.4; solid true; drop `coal`; not placeable; tooltip "Rich coal seam. Needs a wood pick."; tier 1.
10. Iron Ore
   id `iron`; top `#c9a58a`; left `#a8836a`; right `#7d6250`; hardness 2.0; solid true; drop `iron`; not placeable; tooltip "Iron-rich stone. Needs a stone pick."; tier 2.
11. Crystal Ore
   id `crystal`; top `#a6f0f0`; left `#7bcdd0`; right `#559ea3`; hardness 2.4; solid true; transparent true; drop `crystal`; not placeable; tooltip "Glimmering crystal. Needs an iron pick."; tier 3.
12. Planks
   id `planks`; top `#c68a4d`; left `#a06e39`; right `#7a5228`; hardness 0.5; solid true; drop `planks`; placeable; tooltip "Milled planks."
13. Brick
   id `brick`; top `#b45846`; left `#933f30`; right `#6f2f24`; hardness 1.3; solid true; drop `brick`; placeable; tooltip "Baked brick."; tier 1.
14. Glass
   id `glass`; top `#c8ecf3`; left `#a5cbd3`; right `#7ea4ac`; hardness 0.3; solid true; transparent true; drop `glass`; placeable; tooltip "Clear glass."
15. Torch
   id `torch`; top `#ffd47a`; left `#c9932e`; right `#8a651f`; hardness 0.05; solid false; transparent true; light 5; drop `torch`; placeable; tooltip "Warm torch. Lights the dark."
16. Door
   id `door`; top `#8f5a2e`; left `#6f4523`; right `#4f321a`; hardness 0.6; solid true; drop `door`; placeable; tooltip "Sturdy door."
17. Ladder
   id `ladder`; top `#b17a3e`; left `#8a5c2b`; right `#5f401d`; hardness 0.2; solid false; transparent true; drop `ladder`; placeable; tooltip "Climbable ladder."
18. Workbench
   id `workbench`; top `#b57438`; left `#7a4d24`; right `#513418`; hardness 0.7; solid true; drop `workbench`; placeable; tooltip "Unlocks advanced recipes."
19. Chest
   id `chest`; top `#c58a3d`; left `#8b5f28`; right `#5f411b`; hardness 0.6; solid true; drop `chest`; placeable; tooltip "Stores items. Click it to open."
20. Farmland
   id `farmland`; top `#7a4e2a`; left `#5c3a1f`; right `#3e2814`; hardness 0.25; solid true; drop `dirt`; placeable; tooltip "Tilled soil."
21. Berry Bush
   id `berry`; top `#3f8a3c`; left `#2f6e2c`; right `#204e1d`; hardness 0.1; solid false; transparent true; drop `berry`; placeable; food 2; tooltip "Ripe berries. Eat to restore hunger."
22. Flower
   id `flower`; top `#ff8ec7`; left `#c26a99`; right `#8b4b6c`; hardness 0.05; solid false; transparent true; drop `flower`; placeable; tooltip "A cheerful bloom."
23. Stone Lantern
   id `lantern`; top `#f6d68a`; left `#7a7076`; right `#514950`; hardness 1.1; solid true; light 6; drop `lantern`; placeable; tooltip "Steady stone lantern."
24. Crystal Lamp
   id `crystal_lamp`; top `#c4f7ff`; left `#7abfcf`; right `#4f8593`; hardness 0.6; solid true; transparent true; light 8; drop `crystal_lamp`; placeable; tooltip "Brilliant crystal glow."
25. Campfire
   id `campfire`; top `#ffb454`; left `#8f4a1f`; right `#5c2f14`; hardness 0.4; solid true; light 4; drop `campfire`; placeable; tooltip "Warm fire. Unlocks cooking recipes when placed nearby."
26. Sapling
   id `sapling`; top `#7dc46c`; left `#5c8a45`; right `#3e5e2f`; hardness 0.05; solid false; transparent true; drop `sapling`; placeable; tooltip "Plant on grass/dirt. Grows into a tree."
27. Wood Pick
   id `wood_pick`; top `#a17b4a`; left `#7a5a34`; right `#5c4527`; non-placeable; toolPower 1; tooltip "Mines stone and coal."
28. Stone Pick
   id `stone_pick`; top `#a6adb6`; left `#8890a0`; right `#6a7180`; non-placeable; toolPower 2; tooltip "Mines iron."
29. Iron Pick
   id `iron_pick`; top `#e6c9a8`; left `#a8836a`; right `#7d6250`; non-placeable; toolPower 3; tooltip "Mines crystal."
30. Cooked Berry
   id `cooked_berry`; top `#e04a6a`; left `#9c2f47`; right `#5c1c2b`; non-placeable; food 4; tooltip "Cooked at a campfire. Restores more hunger."
31. Slime Gel
   id `gel`; top `#7dd06a`; left `#4f9a3e`; right `#376a2b`; non-placeable; tooltip "Bouncy slime residue."

Mining:
- Left mouse button mines the targeted block.
- Mining has progress based on block hardness.
- Mining range should be limited.
- Blocks have tier requirements:
  - tier 0 can be mined by hand.
  - tier 1 requires Wood Pick or better.
  - tier 2 requires Stone Pick or better.
  - tier 3 requires Iron Pick.
- If the player lacks the required tool, show a toast like "Need a Wood Pick", "Need a Stone Pick", or "Need an Iron Pick".
- When a block breaks, add its drop to inventory.
- Leaves should sometimes also drop saplings, roughly 30 percent.
- Mining creates small particles and a sound effect.
- Chests should drop their stored contents when mined.

Tool durability:
- Track wear per pick type.
- Wood Pick max durability 40.
- Stone Pick max durability 80.
- Iron Pick max durability 160.
- Wear a pick when mining tiered blocks.
- If a pick breaks, remove one from inventory.
- If a spare pick exists, switch automatically and show a toast.
- If no spare exists, show a toast telling the player to craft a new one.
- HUD should show current pick name and a small durability bar when a pick is equipped.

Placement:
- Right mouse button places the selected hotbar item on top of the targeted block.
- Block placement must fail if:
  - selected slot is empty.
  - item is not placeable.
  - inventory count is zero.
  - target is too far away.
  - target placement cell is occupied.
  - placement would intersect the player body.
  - sapling is not on grass, dirt or farmland.
- Placing workbench sets `hasWorkbench` true.
- Placing campfire sets `hasCampfire` true.
- Placing chest creates an empty chest store.
- Placement should create particles and sound.
- Show toast messages such as "Empty slot", "Can't place that", "No Dirt left", "Too far away", "Can't place there", "Plant on grass/dirt", and "Placed Torch".

Build mode:
- Toggle with B or a Build button.
- Build mode shows a ghost preview at the target.
- Ghost preview is green/valid or red/invalid.
- HUD label: "BUILD MODE".
- Show current target block name.
- Include an Undo button when there are build actions to undo.
- Ctrl+Z undoes the last placement.
- Keep the last 10 placement undos.
- Also keep a longer placement/mining history around 32 entries for objectives/history.
- Toast examples:
  - "Build Mode: ON"
  - "Build Mode: OFF"
  - "Nothing to undo"
  - "Undid placement (N left)"

Crafting:
Create an inventory/crafting modal. It should open with E or a visible Inventory/Craft control.

Inventory side:
- Title "Inventory".
- Search field placeholder "Search items...".
- Grid of carried items.
- Show item icon, name, and count.
- Empty state "Empty. Mine some blocks!"
- Search empty state "No matches".
- Clicking a placeable item binds it to the selected hotbar slot.
- Dragging a placeable item onto a hotbar slot should reassign that slot.
- Help text: "Click a placeable item to bind it to the selected slot, or drag onto any hotbar slot."

Crafting side:
- Title "Crafting".
- Search field placeholder "Search recipes...".
- Show categories:
  - Basic
  - Tools
  - Building
  - Lighting
  - Food
  - Other
- If no workbench exists, show "Place a Workbench for advanced recipes".
- If a campfire is nearby, show "Campfire nearby for cooking".
- Recipes should show output icon, recipe name, output quantity, required inputs, and a Craft button.
- Disabled recipes should be visibly disabled.
- Recipes that need a workbench should show "Needs Workbench".
- Recipes that need a campfire should show "Needs Campfire".
- Crafting error toasts:
  - "Need a Workbench"
  - "Stand near a campfire"
  - "Need more Wood"
- Crafting success toast:
  - "Crafted Planks", "Crafted Workbench", etc.

Recipes:
1. Planks
   id `planks`; inputs 2 wood; output 4 planks; category Basic; no workbench.
2. Workbench
   id `workbench`; inputs 4 planks; output 1 workbench; category Basic; no workbench.
3. Torch
   id `torch`; inputs 2 planks and 1 coal; output 4 torches; category Lighting; no workbench.
4. Campfire
   id `campfire`; inputs 3 wood and 1 coal; output 1 campfire; category Lighting; no workbench.
5. Ladder
   id `ladder`; inputs 3 wood; output 1 ladder; category Building; no workbench.
6. Farmland
   id `farmland`; inputs 2 dirt and 1 berry; output 1 farmland; category Food; no workbench.
7. Wood Pick
   id `wood_pick`; inputs 3 planks and 1 wood; output 1 wood pick; category Tools; no workbench.
8. Stone Pick
   id `stone_pick`; inputs 3 stone and 1 plank; output 1 stone pick; category Tools; requires workbench.
9. Iron Pick
   id `iron_pick`; inputs 3 iron and 1 plank; output 1 iron pick; category Tools; requires workbench.
10. Brick
   id `brick`; inputs 4 clay; output 2 bricks; category Building; requires workbench.
11. Glass
   id `glass`; inputs 2 sand and 1 coal; output 2 glass; category Building; requires workbench.
12. Door
   id `door`; inputs 6 planks; output 1 door; category Building; requires workbench.
13. Chest
   id `chest`; inputs 7 planks; output 1 chest; category Building; requires workbench.
14. Stone Lantern
   id `lantern`; inputs 3 stone and 1 coal; output 1 lantern; category Lighting; requires workbench.
15. Crystal Lamp
   id `crystal_lamp`; inputs 2 crystal and 1 glass; output 1 crystal lamp; category Lighting; requires workbench.
16. Cooked Berry
   id `cooked_berry`; inputs 1 berry; output 1 cooked berry; category Food; requires campfire nearby; no workbench.

Campfire rule:
- `hasCampfire` only means a campfire exists somewhere.
- Cooking requires the player to stand within about 4 blocks of a placed campfire.

Eating and survival:
- Press F to eat.
- Eat cooked berries first, then raw berries.
- If hunger is already full, show "Not hungry".
- Cooked Berry restores 4 hunger.
- Berry Bush item restores 2 hunger.
- Eating also restores 1 health, capped at max health.
- Show toasts "Ate Cooked Berry", "Ate Berry Bush", or "Nothing to eat".
- Hunger decreases slowly over time.
- If hunger reaches 0, health decreases.
- If hunger is above 7 and health is below max, health slowly regenerates.
- If health reaches 0, respawn the player near the centre, restore health to max, hunger to at least 4, and show "You collapsed. Respawned."

Enemies:
- Include optional slime enemies.
- Default setting should be Peaceful mode enabled, meaning no enemies.
- When Peaceful mode is off, slimes can spawn at night or in darkness.
- Limit slimes to a small number, around 3.
- Slimes have 3 HP.
- Slimes chase the player within a moderate range.
- Slimes attack when close and reduce health by 1.
- Slimes should flee from strong light sources such as torches, lanterns, campfires and crystal lamps.
- Clicking a slime within range damages it.
- On death, slime can drop Slime Gel, roughly 70 percent chance.
- Draw slimes as small green blobs with a shadow, highlight, eyes, bobbing motion, hit flash, and small HP bar when damaged.

Lighting, time and weather:
- Implement day/night visual shading.
- `time` cycles continuously.
- Show clock as `HH:MM` in the HUD.
- Blocks with light values should brighten nearby areas.
- Add a soft night overlay, especially at low light.
- Implement rain as an occasional weather state with simple diagonal or vertical streaks.
- Weather alternates between clear and rain after random intervals.
- Rain chance around 35 percent when the weather changes.
- Use `settings.graphics` to reduce expensive visual effects at low quality.

Saplings:
- Saplings can only be planted on grass, dirt, or farmland.
- Track saplings in state.
- Saplings should grow over time into a small tree if there is space.
- Growth should replace the sapling with wood trunk and leaves.

Chests:
- Placing a chest creates chest storage at that block coordinate.
- Left-clicking a chest within mining range opens the Chest panel instead of mining.
- Chest panel:
  - left side title "Chest".
  - right side title "You".
  - "Chest is empty" empty state.
  - "Empty" player inventory empty state.
  - clicking a chest item withdraws one.
  - clicking a player item deposits one.
  - text "Click an item to take one."
  - text "Click to deposit one."
  - Close button.
- Mining a chest should remove chest storage and drop stored items back into player inventory or item drops.

HUD:
Top-left HUD:
- Brand block with "Block" in bright blue and "haven" in white.
- Timer or clock nearby.
- Health row labelled "HP" with red bar and value like "10/10".
- Food row labelled "FD" with amber bar and value like "10/10".
- If the game was recently saved, show "Saved" in green.

Top-right controls:
- Show a compact button row on desktop:
  - Build
  - Center camera
  - Screenshot
  - Save
  - Load
  - Export Save
  - Import Save
  - New
  - Settings
- On smaller screens, collapse less critical controls into a Menu button.
- Menu entries:
  - Build Mode
  - Save
  - Load
  - Export Save
  - Import Save
  - New World
  - Center Camera
  - Screenshot
  - Settings

Minimap:
- Position near top left, below the main HUD.
- Title "Map".
- Show a small top-down map of the island.
- Show player location.
- Include collapse/expand toggle.
- Include zoom out and zoom in controls.
- Zoom levels should include about 1.0x and adjustable values.

Objectives panel:
- Small collapsible panel.
- Title "Objectives".
- Show progress such as "1/5" or "All done".
- Objectives:
  1. Collect Wood
  2. Craft Planks
  3. Craft a Workbench
  4. Place a Torch
  5. Build a Shelter (4 blocks)
- Done objectives should show a check mark and strikethrough.
- Incomplete objectives should show an open circle.
- "Build a Shelter" counts at least 4 placed blocks.

Hotbar:
- Bottom-centred 9-slot hotbar.
- Slots are square, responsive, and stable.
- Selected slot is outlined in amber.
- Each slot shows:
  - item icon
  - stack count
  - slot number
  - durability bar if the selected item is the active pick
- Right-clicking a hotbar slot clears it.
- Dragging a placeable item from inventory to any hotbar slot reassigns that slot.
- Clicking or pressing 1 to 9 selects a slot.
- Show label above hotbar: "Selected: Dirt" or selected item name.

Controls hint:
- When enabled, show:
  - "WASD move - E inventory - Esc menu - F eat"
  - "L-click mine - R-click place - 1-9 slot"
  - "Ctrl+Z undo (last 10) - B Build Mode - R-click slot to clear"
- On mobile or narrow screens, show a compact help button that expands these hints:
  - "Drag/tap the map - WASD move on keyboard"
  - "Tap block: mine - Long-press: place"
  - "1-9 or tap slot: select - Right-click slot: clear"

Touch controls:
- Add a virtual joystick on the lower left.
- Add a mine button and a place button on the lower right.
- Mine button should support holding.
- Place button should tap to place.
- Canvas taps should target blocks.
- Long press should place.

Panels and modals:
Inventory/Crafting panel:
- Dark overlay.
- Modal max width about 900px.
- Two-column layout on desktop.
- Stack on mobile.
- Close with Esc or close button.

Pause panel:
- Opens with Escape when no other panel is open.
- Title "Paused".
- Buttons:
  - Resume
  - Save
  - Load
  - Settings

Settings panel:
- Title "Settings".
- Fields:
  - Sound checkbox.
  - Show controls hint checkbox.
  - Peaceful mode checkbox with helper "(no enemies)".
  - Graphics quality select with Low, Medium, High.
  - Reset World destructive button.
- Close button.

Confirmation dialog:
- Reusable dark modal.
- Text message.
- Buttons: Cancel and Confirm.
- Use it for:
  - New world: "Start a new world? Your current save will be overwritten on next save."
  - Reset world: "Reset the world? This deletes your save."
  - Import save: "Import this save? Your current world will be overwritten."

Persistence:
- Save state to localStorage under key `blockhaven:v1`.
- Use saved object version 2.
- On app start, load saved state if present.
- Include legacy tolerance for version 1 where possible by filling missing fields.
- Auto-save periodically and show "Autosaved".
- Manual Save shows "Game saved" or "Save failed".
- Load shows "Save loaded" or "No save found".
- Export Save downloads a JSON file named like `blockhaven-save-${Date.now()}.json`.
- Import Save accepts `.json` files and validates the shape before replacing current state.
- Screenshot downloads a PNG named like `blockhaven-${Date.now()}.png`.
- New World creates a new random seed world.
- Reset World deletes localStorage save and creates a new world.

Audio:
- Add simple Web Audio effects with a Sound setting.
- Generate sound locally with oscillators/noise, no external audio files.
- Sounds:
  - mining tick/noise
  - block break
  - block place
  - craft success
  - hurt
  - eat
  - step
  - slime spawn
  - slime hit
- Resume AudioContext after user gesture if suspended.

Renderer:
- Draw blocks in sorted order so depth feels correct.
- Draw transparent blocks after opaque blocks if needed.
- Draw top, left and right faces using each item's colours.
- Draw water as flatter/transparent.
- Draw light glows for torch, lantern, campfire, crystal lamp.
- Draw particles for mining, placement, slime hit, block break.
- Draw weather overlay.
- Draw day/night overlay.
- Draw target outline on block under cursor.
- In build mode, draw ghost block preview on candidate placement cell.
- Keep canvas crisp on high-DPI displays by scaling to devicePixelRatio.
- Resize canvas on window resize.
- Use requestAnimationFrame for the game loop.

Recommended file structure:
- `src/main.tsx`
- `src/App.tsx`
- `src/components/game/Game.tsx`
- `src/components/game/Hud.tsx`
- `src/components/game/Hotbar.tsx`
- `src/components/game/InventoryCraftingPanel.tsx`
- `src/components/game/ChestPanel.tsx`
- `src/components/game/SettingsPanel.tsx`
- `src/components/game/Minimap.tsx`
- `src/components/game/ObjectivesPanel.tsx`
- `src/game/engine.ts`
- `src/game/world.ts`
- `src/game/items.ts`
- `src/game/recipes.ts`
- `src/game/save.ts`
- `src/game/audio.ts`
- `src/game/render.ts`
- `src/game/types.ts`

You may choose a different structure if the result remains clean, editable and maintainable.

Accessibility and ergonomics:
- Buttons need accessible labels or titles.
- Keyboard controls must work without focus traps when the canvas is active.
- Esc closes open panels before opening pause.
- Modals should be scrollable on short screens.
- Touch targets should be large enough on mobile.
- Do not allow UI text to overlap on small screens.
- Do not let the hotbar overflow horizontally at 390px width.
- Do not block the canvas with oversized explanatory text.

Acceptance checklist:
- App starts directly in the playable Blockhaven game.
- Player can move around the island with WASD.
- Canvas renders isometric terrain, trees, resources, player and HUD.
- Left-click mining works and adds drops to inventory.
- Tool-tier gating works for stone, coal, iron and crystal.
- Crafting planks, workbench, pick tools, torch and chest works.
- Workbench unlocks advanced recipes.
- Campfire proximity unlocks cooked berry.
- Right-click placement works.
- Build mode ghost preview and Ctrl+Z undo work.
- Hotbar reassignment works from inventory.
- Chests can store and withdraw items.
- Save, load, export, import, screenshot, new world and reset world work.
- Hunger, health, eating and respawn work.
- Peaceful setting disables enemies by default.
- Turning Peaceful off allows slimes to spawn and attack.
- Lights cause slimes to flee.
- Objectives update as the player progresses.
- Minimap shows island and player.
- Mobile controls are present and usable.
- LocalStorage persistence survives page reload.
- No external API calls are required.
- No console errors in normal play.
```
