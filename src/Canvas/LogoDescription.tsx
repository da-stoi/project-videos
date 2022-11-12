import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';

interface DescriptionProps {
  bottom: number;
  opacity: number;
}

const Description = styled.div<DescriptionProps>`
  font-family: 'Roboto', sans-serif;
  color: #212121;
  font-size: 60px;
  font-weight: 200;
  text-align: center;
  position: absolute;
  bottom: ${props => props.bottom}px;
  width: 100%;
  opacity: ${props => props.opacity};
`

const iconStyle = {
  width: '150px',
  height: '150px',
}

const rightText = {
  fontFamily: 'Fira Code',
  fontSize: '60px',
  fontWeight: '200',
  color: '#212121',
  marginLeft: '20px',
}

const leftText = {
  fontSize: '60px',
  fontWeight: '200',
  color: '#212121',
  marginRight: '20px'
}

export const LogoDescription: React.FC<{
  fadeOut?: boolean;
}> = ({ fadeOut }) => {
  const { fps, height, width } = useVideoConfig();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fps / 2], fadeOut ? [1, 0] : [0, 1]);
  return (
    <>
      {/* <div
        style={{
          position: 'absolute',
          top: height < width ? height * 0.1 : width * 0.15,
          left: width * 0.01,
        }}
      >
        <SocialIcon style={iconStyle} url="https://stoi.ga/github" network='github' />
        <span style={rightText}>@da-stoi</span>
      </div>
      <div
        style={{
          position: 'absolute',
          top: height < width ? height * 0.22 : width * 0.15,
          left: width * 0.01,
        }}
      >
        <SocialIcon style={iconStyle} url="https://stoi.ga/linkedin" network='linkedin' />
        <span style={rightText}>@danielstoiber</span>
      </div> */}
      <Description
        opacity={opacity}
        bottom={height < width ? height * 0.1 : width * 0.5}
      >
        A full-stack developer.
      </Description>
      {/* <div
        style={{
          position: 'absolute',
          top: height < width ? height * 0.1 : width * 0.15,
          right: width * 0.01,
        }}
      >
        <SocialIcon style={iconStyle} url="https://stoi.ga/twitter" network='twitter' />
        <span style={rightText}>@_dastoi</span>
      </div>
      <SocialIcon style={{
        ...iconStyle,
        position: 'absolute',
        top: height < width ? height * 0.22 : width * 0.15,
        right: width * 0.01,
      }} url="" network='email' /> */}
    </>
  );
};
