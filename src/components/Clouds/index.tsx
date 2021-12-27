import styled from "styled-components";
import clouds from "img/clouds.png";
import { useRef, useEffect } from "react";

export const Clouds = styled.div<{ size: string }>`
  background: url(${clouds});
  width: 200vw;
  background-size: contain;
  height: ${({ size }) => size};
  background-repeat: repeat-x;
  will-change: transform;
`;

export const CloudsWrapper = styled.div`
  width: 100vw;
  overflow: hidden;
  height: 300px;
  margin-top: 20px;
  z-index: 0;
  position: fixed;
`;

export const AnimatedClouds: React.FC = () => {
  const smallCloudsRef = useRef<HTMLDivElement>(null);
  const bigCloudsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const smallClouds = smallCloudsRef.current;
    const bigClouds = bigCloudsRef.current;
    const htmlElement = document.getElementsByTagName("html")[0];
    if (bigClouds && smallClouds) {
      let startTime = +new Date();
      (function update() {
        let dif = new Date().getTime() - startTime;
        dif *= 0.004;
        if (dif > htmlElement.clientWidth) {
          startTime = +new Date();
        }
        smallClouds.style.transform = `translateX(${
          dif - htmlElement.clientWidth
        }px)`;
        bigClouds.style.transform = `translateX(${
          dif - htmlElement.clientWidth
        }px)`;
        setTimeout(update, 100);
      })();
    }
  }, [smallCloudsRef, bigCloudsRef]);
  return (
    <CloudsWrapper>
      <Clouds size="300px" ref={bigCloudsRef} />
      <Clouds
        size="200px"
        style={{ marginTop: "-200px" }}
        ref={smallCloudsRef}
      />
    </CloudsWrapper>
  );
};
