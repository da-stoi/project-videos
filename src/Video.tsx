import { Composition } from 'remotion';
import { Canvas } from './Canvas';

const durationInFrames = 600;

export const RemotionVideo: React.FC = () => {
  return (
    <>
      {/* Desktop */}
      <Composition
        id="Desktop"
        component={Canvas}
        durationInFrames={durationInFrames}
        fps={60}
        width={2560}
        height={1440}
        defaultProps={{
          projectIndex: 7,
          renderType: 'desktop'
        }}
      />

      {/* Mobile */}
      <Composition
        id="Mobile"
        component={Canvas}
        durationInFrames={durationInFrames}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{
          projectIndex: 21,
          renderType: 'mobile'
        }}
      />
    </>
  );
};
