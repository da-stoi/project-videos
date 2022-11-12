import { interpolate, Sequence, useCurrentFrame, useVideoConfig, Audio } from 'remotion';
import { Logo } from './Canvas/Logo';
import { LogoDescription } from './Canvas/LogoDescription';
import { LogoName } from './Canvas/LogoName';
import { Tools } from './Canvas/Tools';
import audio from './assets/music/audio.mp3';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProjectName } from './Canvas/ProjectName';
import { ProjectDescription } from './Canvas/ProjectDescription';
import { ProjectLogo } from './Canvas/ProjectLogo';

const assetsUrl = "https://da-stoi.github.io/portfolio-assets";

export const Canvas: React.FC<{
  projectIndex: number;
  renderType: string;
}> = ({ projectIndex }) => {

  const [project, setProject] = useState<any>({});

  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const volume = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: 'clamp'
  });
   
  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const transitionStart = 20;
  const introDuration = 150;

  useEffect(() => {
    axios.get(`${assetsUrl}/projects.json`).then(res => {
      setProject(res.data.projects[projectIndex]);
    });
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      <Audio
        src={audio}
        startFrom={440}
        volume={volume}
      />
      <div style={{ opacity }}>

        {/* Intro Sequence */}
        <Sequence from={0} durationInFrames={introDuration} name="Logo">
          <Logo />
        </Sequence>
        <Sequence from={introDuration} durationInFrames={fps / 2} name="Logo Fadeout">
          <Logo fadeOut={true} />
        </Sequence>

        <Sequence from={transitionStart} durationInFrames={introDuration - transitionStart} name="LogoName">
          <LogoName />
        </Sequence>
        <Sequence from={introDuration} durationInFrames={fps / 2} name="LogoName Fadeout">
          <LogoName fadeOut={true} />
        </Sequence>

        <Sequence from={transitionStart + 50} durationInFrames={introDuration - (transitionStart + 50)}>
          <LogoDescription />
        </Sequence>
        <Sequence from={introDuration} durationInFrames={fps / 2} name="LogoDescription Fadeout">
          <LogoDescription fadeOut={true} />
        </Sequence>

        {/* Project Info */}
        <Sequence from={introDuration + (fps / 2)} durationInFrames={durationInFrames}>
          <Tools tools={project.tools} />
        </Sequence>
        <Sequence from={introDuration + (fps / 2)} durationInFrames={durationInFrames} name="Project Name">
          <ProjectName titleText={project.name || 'Project Name'} titleColor="#212121" />
        </Sequence>
        <Sequence from={introDuration + (fps / 2)} durationInFrames={durationInFrames} name="Project Name">
          <ProjectDescription text={project.description || 'Project Description'} link={project.link_name} />
        </Sequence>
        <Sequence from={introDuration + (fps / 2)} durationInFrames={durationInFrames} name="Project Logo">
          <ProjectLogo imageLink={`${assetsUrl}/project/${project.link_name}/icon.png`} />
        </Sequence>
      </div>
    </div>
  );
};
