import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';
import avatar from '../assets/images/avatar.png';

// Define styled-components prop types
interface WrapperProps {
  bottom: number;
  opacity: number;
}

interface LogoImgProps {
  height: number;
}

// Logo wrapper div
const Wrapper = styled.div<WrapperProps>`
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: ${props => props.bottom}px;
  opacity: ${props => props.opacity};
`

// Logo image
const LogoImg = styled.img<LogoImgProps>`
  height: ${props => props.height}px;
  width: ${props => props.height}px;
  border-radius: 50%;
  border: solid 5px #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

export const Logo: React.FC<{
  fadeOut?: boolean;
}> = ({ fadeOut }) => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fps / 2], fadeOut ? [1, 0] : [0, 1]);
  return (
    <Wrapper
      bottom={height < width ? height * 0.4 : width * 0.9}
      opacity={opacity}
    >
      <LogoImg
        height={height < width ? height * 0.5 : width * 0.5}
        src={avatar}
      />
    </Wrapper>
  );
};
