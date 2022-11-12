import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';

interface TextProps {
  bottom: number;
  fontSize: number;
}

const Text = styled.div<TextProps>`
  font-family: 'Fira Code', serif;
  font-size: ${props => props.fontSize}px;
  text-align: center;
  position: absolute;
  bottom: ${props => props.bottom}px;
  width: 100%;
`


export const LogoName: React.FC<{
  fadeOut?: boolean;
}> = ({ fadeOut }) => {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fps / 2], [1, 0]);
  const titleText = 'Hi there, I\'m  Daniel';
  const text = titleText.split(' ').map((t) => ` ${t} `);
  return (
    <Text
      bottom={height < width ? height * 0.2 : width * 0.6}
      fontSize={height < width ? height * 0.09 : width * 0.1}
    >
      {text.map((t, i) => {
        return (
          <span
            key={t}
            style={fadeOut ? {
              opacity,
              color: i === text.length - 1 ? '#1E88E5' : '#212121',
              fontWeight: i === text.length - 1 ? '600' : 'normal',
              marginLeft: 10,
              marginRight: 10,
              display: 'inline-block',
            } : {
              color: i === text.length - 1 ? '#1E88E5' : '#212121',
              fontWeight: i === text.length - 1 ? '600' : 'normal',
              marginLeft: 10,
              marginRight: 10,
              transform: `scale(${spring({
                fps: fps,
                frame: frame - i * 10,
                config: {
                  damping: 100,
                  stiffness: 200,
                  mass: 0.5,
                },
              })})`,
              display: 'inline-block',
            }}
          >
            {t}
          </span>
        );
      })}
    </Text>
  );
};
