import React from 'react';
import { SpriteAnimator } from 'react-sprite-animator';
// import { AutoFlashcard } from "./AutoFlashcard";
import slime from "./slime_frames_all.png";
import witchIdle from "./witchSprites/B_witch_idle.png";
import witchCharge from "./witchSprites/B_witch_charge.png"
import witchAttack from "./witchSprites/B_witch_attack.png"
import witchDefeat from "./witchSprites/B_witch_death.png"

const witchScale = 0.35;
const slimeScale = 0.35;

//Witch Animations
const WitchIdle = ({ active }: { active: boolean }) => {
  return (
      <SpriteAnimator 
        sprite={witchIdle} // Update this path to your sprite image path
        width={32} //width of viewbox
        height={48}
        scale={witchScale} //scale the sprite
        shouldAnimate={active}
        direction='vertical' //direction of reading img
        frameCount={6} //how many frames to animate
        fps={8} //how fast
      />
  );
};

const WitchCharge = ({ active }: { active: boolean }) => {
  return (
      <SpriteAnimator 
        sprite={witchCharge} // Update this path to your sprite image path
        width={46} //width of viewbox
        height={48}
        scale={witchScale} //scale the sprite
        shouldAnimate={active}
        direction='vertical' //direction of reading img
        frameCount={5} //how many frames to animate
        fps={8} //how fast
      />
  );
};

const WitchAttack = ({ active }: { active: boolean }) => {
  console.log("witch")
  return (
      <SpriteAnimator 
        sprite={witchAttack} // Update this path to your sprite image path
        width={103} //width of viewbox
        height={46}
        scale={witchScale} //scale the sprite
        shouldAnimate={active}
        direction='vertical' //direction of reading img
        frameCount={9} //how many frames to animate
        fps={8} //how fast
      />
  );
};

//more like a png rather than a png since u wont see your enemy attacking you
const WitchDefeat = ({ active }: { active: boolean }) => {
  return (
      <SpriteAnimator 
        sprite={witchDefeat} // Update this path to your sprite image path
        width={32} //width of viewbox
        height={30}
        scale={witchScale} //scale the sprite
        shouldAnimate={active}
        direction='vertical' //direction of reading img
        frameCount={30} //how many frames to animate
        startFrame={30}
        fps={1} //how fast
      />
  );
};

//Slime Animations
const SlimeIdle = ({ active }: { active: boolean }) => {
  return (
      <SpriteAnimator 
        sprite={slime} // Update this path to your sprite image path
        width={32} //width of viewbox
        height={25}
        scale={slimeScale} //scale the sprite
        shouldAnimate={active}
        direction='horizontal' //direction of reading img
        frameCount={4} //how many frames to animate
        startFrame={2}
        wrapAfter={2}
        fps={3} //how fast
      />
  );
};

const SlimeTakeDamage = ({ active }: { active: boolean }) => {
  return (
      <SpriteAnimator 
        sprite={slime} // Update this path to your sprite image path
        width={32} //width of viewbox
        height={30}
        scale={slimeScale} //scale the sprite
        shouldAnimate={active}
        direction='horizontal' //direction of reading img
        frameCount={13} //how many frames to animate
        startFrame={11}
        wrapAfter={2}
        fps={3} //how fast
      />
  );
};

const SlimeDeath = ({ active }: { active: boolean }) => {
  return (
      <SpriteAnimator 
        sprite={slime} // Update this path to your sprite image path
        width={32} //width of viewbox
        height={29}
        scale={slimeScale} //scale the sprite
        shouldAnimate={active}
        direction='horizontal' //direction of reading img
        frameCount={30} //how many frames to animate
        startFrame={24}
        wrapAfter={6}
        fps={8} //how fast
        stopLastFrame={true}
      />
  );
};


export { WitchIdle, WitchCharge, WitchAttack, WitchDefeat, SlimeIdle, SlimeTakeDamage, SlimeDeath};