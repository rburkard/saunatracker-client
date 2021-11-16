import React, { ReactNode } from 'react'
import { GlobalStyle } from './Globalstyle'
import styled from 'styled-components'
import { MOBILE_BREAKPOINT_N } from './constants'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
`

export const useIsMobile = (): boolean => {
  const dataView = React.useContext(IsMobile)
  return dataView
}
const IsMobile = React.createContext<boolean>(false)
IsMobile.displayName = 'IsMobile'

export const Scaffold = (props: { children?: ReactNode }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>()

  React.useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_N)
    window.addEventListener('resize', (event) => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_N)
    })

    return () => {
      window.removeEventListener('resize', (event) => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_N)
      })
    }
  }, [])
  return (
    <IsMobile.Provider value={!!isMobile}>
      <Wrapper>
        <GlobalStyle />
        {props.children}
      </Wrapper>
    </IsMobile.Provider>
  )
}
