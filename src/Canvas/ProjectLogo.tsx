import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';

// Define styled-components prop types
interface WrapperProps {
  opacity: number;
  right: number;
}

interface LogoImgProps {
  height: number;
}

// Logo wrapper div
const Wrapper = styled.div<WrapperProps>`
  // text-align: center;
  position: absolute;
  // width: 100%;
  bottom: 50px;
  right: ${props => props.right}px;
  opacity: ${props => props.opacity};
`

// Logo image
const LogoImg = styled.img<LogoImgProps>`
  height: ${props => props.height}px;
  width: ${props => props.height}px;
  border-radius: 20px;
`

export const ProjectLogo: React.FC<{
  imageLink: string;
  fadeOut?: boolean;
}> = ({ fadeOut, imageLink }) => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fps / 2], fadeOut ? [1, 0] : [0, 1]);
  const right = interpolate(frame, [0, fps / 2], fadeOut ? [100, -(height < width ? height * 0.3 : width * 0.2)] : [-(height < width ? height * 0.3 : width * 0.2), 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Wrapper
      opacity={opacity}
      right={right}
    >
      <LogoImg
        height={height < width ? height * 0.3 : width * 0.2}
        src={imageLink}
      />
    </Wrapper>
  );
};
