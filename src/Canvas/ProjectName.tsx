import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';

interface TextProps {
  top: number;
  fontSize: number;
}

const Text = styled.div<TextProps>`
  font-family: 'Fira Code', serif;
  font-size: ${props => props.fontSize}px;
  text-align: center;
  position: absolute;
  top: ${props => props.top}px;
  width: 100%;
`


export const ProjectName: React.FC<{
  titleText: string;
  titleColor: string;
  fadeOut?: boolean;
}> = ({ titleText, titleColor, fadeOut }) => {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fps / 2], [1, 0]);
  const text = titleText.split(' ').map((t) => ` ${t} `);
  return (
    <Text
      top={height < width ? height * 0.1 : width * 0.15}
      fontSize={height < width ? height * 0.09 : width * 0.1}
    >
      {text.map((t, i) => {
        return (
          <span
            key={t}
            style={fadeOut ? {
              opacity,
              color: titleColor,
              fontWeight: 'normal',
              marginLeft: 15,
              marginRight: 15,
              display: 'inline-block',
            } : {
              color: titleColor,
              fontWeight: 'normal',
              marginLeft: 15,
              marginRight: 15,
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
