import React, { ReactNode } from "react"
import { GlobalStyle } from "./Globalstyle"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  background: black;
`

export const Scaffold = (props: { children?: ReactNode }) => {
  return (
    <Wrapper>
      <GlobalStyle />
      {props.children}
    </Wrapper>
  )
}
