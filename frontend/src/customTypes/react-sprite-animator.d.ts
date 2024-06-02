declare module 'react-sprite-animator' {
  import * as React from 'react';

  interface SpriteAnimatorProps {
    sprite: string;
    width: number;
    height: number;
    scale?: number;
    direction?: 'horizontal' | 'vertical';
    shouldAnimate?: boolean;
    startFrame?: number;
    fps?: number;
    stopLastFrame?: boolean;
    frame?: number;
    onEnd?: () => void;
    frameCount?: number;
    wrapAfter?: number;
  }

  export const SpriteAnimator: React.FC<SpriteAnimatorProps>;

  interface UseSpriteOptions {
    sprite: string;
    width: number;
    height: number;
    scale?: number;
    direction?: 'horizontal' | 'vertical';
    shouldAnimate?: boolean;
    startFrame?: number;
    fps?: number;
    stopLastFrame?: boolean;
    frame?: number;
    onEnd?: () => void;
    frameCount?: number;
    wrapAfter?: number;
  }

  export function useSprite(options: UseSpriteOptions): React.CSSProperties;
}
