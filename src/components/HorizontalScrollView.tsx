import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Horizontal = styled.div`
  width: fit-content;
  display: flex;
`;

export const HorizontalScrollView: React.FC<{
  rootElement?: (instance: HTMLDivElement | null) => void;
}> = ({ children, rootElement }) => (
  <Container ref={rootElement}>
    <Horizontal>{children}</Horizontal>
  </Container>
);
