import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "me.png" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#64ffda" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'WordPress',
    'JavaScript',
    'HTML5 & CSS3',
    'React',
    'Linux',
    'Git',
    'Figma',
    'Adobe PhotoShop',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm a Computer Engineer, Web Developer, Designer,{' '}
              <a href="https://githubcampus.expert/CrazyChickenDev/" target="_blank">GitHub Campus Expert</a> and{' '}
              <a href="https://linkedin/in/nwaobidaniel/" target="_blank">Web3 Enthusiast</a> based in
              Benin City, NG.
            </p>

            <p>
              I'm an open-source enthusiast with an interest in web development and design.
              I have a profound passion for programming, graphics design, web3, security researching, robotics, IoT and hardware and I enjoy
              creating things that live both on the internet and in reality, whether that be
              websites, applications, scripts, embedded systems or anything in between.
            </p>

            <p>
              I studied computer engineering at <a href="https://www.uniben.edu" target="_blank"> University of Benin (UNIBEN)</a> and I
              joined the developer team at <a href="https://www.muzzlab.com" target="_blank"> Muzzlab </a> where I worked on a wide variety 
              of interesting and meaningful projects as a WordPress Developer/Design Intern. Some things you'll likely find me doing are working and creating
              things with microcontrollers such as arduinos and implementing IoT in components, building custom PCs, playing video games,{' '}creating <a href="https://instagram.com/crazychickentech" target="_blank">tech contents</a> for brands,{' '}
              <a href="https://illusiondecals.com" target="_blank">customising gadgets</a>,{' '}making money via affiliate marketing, 
              listening to Jack Rhysiders' <a href= "https://darknetdiaries.com" target="_blank">Darknet Diaries</a> and finding
              vulnerabilities in systems. A goal of mine is to build products that provide
              pixel-perfect, user-friendly, security efficient, performant experiences. I go by the
              alter-ego <a href="https://t.me/CrazyChickendev" target="_blank">'CrazyChickenDev</a>
            </p>

            <p>Here are a few tech stack I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar" className="img" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
