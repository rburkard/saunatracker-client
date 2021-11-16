import styled from 'styled-components'
import { DESKTOP_STYLE, MOBILE_STYLE } from './constants'

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`

// export const LogoContainer = styled.div`
//     width: 200px;
//     height: 200px;
//     margin: 32px;
// `

// export const FormContainer = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 32px;
// `

// export const FormEntry = styled.div`
//   flex: 1;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 32px;
// `

export const Button = styled.button`
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
  }

  ${DESKTOP_STYLE} {
    flex: 0 0 80px;
    height: 40px;
    padding: 8px;
    border-radius: 10px;
    margin: 8px;
  }

  ${MOBILE_STYLE} {
    flex: 0 0 40px;
    height: 40px;
    padding: 4px;
    border-radius: 50%;
    margin: 4px;
  }
`

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px darkblue;
  padding: 40px;

  ${DESKTOP_STYLE} {
    flex: 0 0 200px;
    width: 500px;
  }

  ${MOBILE_STYLE} {
    flex: 0 0 200px;
    width: 100%;
  }
`

export const StatsEntry = styled.div`
  display: flex;
  flex: 0 0 50px;
  width: 100%;
  justify-content: space-between;
  padding: 0px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
`

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${DESKTOP_STYLE} {
    padding: 80px;
  }

  ${MOBILE_STYLE} {
    padding: 0px;
  }
`

export const WrapperDynamic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 16px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-evenly;

  ${DESKTOP_STYLE} {
    padding: 32px;
  }

  ${MOBILE_STYLE} {
    padding: 0px;
    margin-bottom: 48px;
  }
`

export const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  flex-direction: row;
`

export const BlobCircle = styled.div`
  background: darkblue;
  border-radius: 50%;
  margin: 16px;
  height: 10px;
  width: 10px;

  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`
