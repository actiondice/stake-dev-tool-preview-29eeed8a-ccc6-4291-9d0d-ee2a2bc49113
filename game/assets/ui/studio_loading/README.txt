OBSCURE STUDIO — Loading animation export
==========================================

FPS: 30
Loop: seamless (frame 029 -> 000 is continuous)
Frames: 30
Background: transparent (white logo + white sweep bar only)

CONTENTS
--------
frames/                30x transparent PNG sequence, 1280x720
                       studio_logo_000.png ... studio_logo_029.png
spritesheet/
  studio_logo.png      atlas, 3840x1800, 6 cols x 5 rows, 640x360 per frame
  studio_logo.json     Pixi/TexturePacker hash JSON (frames + "loading" animation, fps:30)

PIXI USAGE (spritesheet)
------------------------
const sheet = await Assets.load('spritesheet/studio_logo.json');
const anim  = new PIXI.AnimatedSprite(sheet.animations.loading);
anim.animationSpeed = 30 / 60; // 30 fps if your ticker runs at 60
anim.play();
app.stage.addChild(anim);

NOTES
-----
- Not a Spine export: this loader was animated in CSS/JS, not authored in Spine,
  so there is no .atlas/.json Spine rig. Use the PNG sequence or the Pixi atlas.
- WebM-with-alpha was not produced (no video encoder available here).
- Spritesheet frames are 640x360 to keep the atlas light; the loose PNG
  sequence is full 1280x720. Scale to fit your slot.
