import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';

interface DescriptionProps {
  top: number;
  opacity: number;
}

const Description = styled.div<DescriptionProps>`
  font-family: 'Roboto', sans-serif;
  color: #212121;
  font-size: 60px;
  font-weight: 200;
  width: 100%;
  text-align: center;
  position: absolute;
  top: ${props => props.top}px;
  opacity: ${props => props.opacity};
`

export const ProjectDescription: React.FC<{
  text: String;
  link: String;
  fadeOut?: boolean;
}> = ({ fadeOut, text, link }) => {
  const { fps, height, width } = useVideoConfig();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fps / 2], fadeOut ? [1, 0] : [0, 1]);
  return (
    <Description
      opacity={opacity}
      top={height < width ? height * 0.25 : width * 0.35}
    >
      {text}<br /><br />
      Read more at<br />
      <span style={{
        color: '#1E88E5',
        fontWeight: '500',
      }}>
        daniel.stoiber.network/project/{link}
      </span>
    </Description>
  );
};
