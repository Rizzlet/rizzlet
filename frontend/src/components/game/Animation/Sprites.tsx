import React from 'react';
import { SpriteAnimator } from 'react-sprite-animator';

const WitchIdle = ({ active }: { active: boolean }) => {
  return (
    <SpriteAnimator 
      sprite="/witchSprites/B_witch_idle.png" // Update this path to your sprite image path
      width={100} //width of viewbox
      height={100}
      scale={0.3} //scale the sprite
      shouldAnimate={active}
      direction='horizontal' //direction of reading img
      frameCount={4} //how many frames to animate
      fps={8} //how fast
    />
  );
};

export default WitchIdle;