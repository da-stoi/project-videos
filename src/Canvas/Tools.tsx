import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

const assetsUrl = "https://da-stoi.github.io/portfolio-assets";

interface ChipProps {
  background: string;
  color: string;
}

interface ChipTextProps {
  color: string;
}

interface ChipContainerProps {
  // bottom: number;
  // left: number;
}

const ChipContainer = styled.div<ChipContainerProps>`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
`

const Chip = styled.div<ChipProps>`
  border-radius: 100px;
  background-color: ${(props) => props.background};
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.color};
  margin: 20px;
  display: inline-block;
  cursor: pointer;
  position: absolute;
  width: 100%;
`

const ChipContentsWrapper = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
`

const ChipText = styled.span<ChipTextProps>`
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.color};
  font-size: 32px;
  margin: 8px 12px 8px 8px;
  text-align: right;
`

const ChipIcon = styled.img`
  height: 48px;
  width: 48px;
  margin: 8px;
  text-align: right;
`

export const Tools: React.FC<{
  tools: String[];
}> = ({ tools }) => {

  const { fps, height, width, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const [allTools, setAllTools] = useState<any>({});

  useEffect(() => {
    axios.get(`${assetsUrl}/tools.json`).then(res => {
      setAllTools(res.data);
    });
  }, []);

  // Sort tools by text length
  tools = tools ? tools.sort((a, b) => {
    if (a.length > b.length) return -1;
    if (a.length < b.length) return 1;
    return 0;
  }) : tools;

  return (
    <ChipContainer>
      {tools ? tools.map((tool, i) => {

        const maxRight = (width / (height < width ? 1.5 : 10));
        const position = interpolate(frame, [0, durationInFrames - (380 - (i * 15))], [-1000, 1], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        return (
          <Chip
            key={i}
            background={allTools[`${tool}`]?.background}
            color={allTools[`${tool}`]?.color}
            style={{
              bottom: i * 92,
              right: (i * 40) + maxRight + ((maxRight / 3.5) / (tools.length * 1)) - position * (i + 1),
            }}
          >
            <ChipContentsWrapper>
              <ChipIcon src={`${assetsUrl}/tools/chip-icon/${tool}.png`} />
              <ChipText color={allTools[`${tool}`]?.color}>
                {allTools[`${tool}`]?.name}
              </ChipText>
            </ChipContentsWrapper>
          </Chip>
        );
      }) : <></>};
    </ChipContainer>
  );
};
