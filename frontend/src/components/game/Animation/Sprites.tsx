import React from 'react';
import { Link } from "react-router-dom";
import { SpriteAnimator } from 'react-sprite-animator';
// import { AutoFlashcard } from "./AutoFlashcard";
import slime from "./slime_frames_all.png";


const WitchIdle: React.FC = () => {

const WitchIdle = ({ active }: { active: boolean }) => {
  console.log("witch")
  return (
      <SpriteAnimator 
        sprite="url(${slime})" // Update this path to your sprite image path
        width={100} //width of viewbox
        height={100}
        scale={0.3} //scale the sprite
        shouldAnimate={active}
        direction='vertical' //direction of reading img
        frameCount={6} //how many frames to animate
        fps={8} //how fast
      />
  );
};

  console.log("WitchIdle", WitchIdle)
  return (
    <div style={{ backgroundImage: `url(${slime})` }}>
      <p>hellos</p>
      <div className='flex align-middle justify-center'>
        <WitchIdle active={true} />
      </div>
      <p>hellos2</p>
      <p>hellos3</p>
    </div>
  );

}

export default WitchIdle;