import styled from "styled-components"

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const LogoContainer = styled.div`
    width: 200px;
    height: 200px;
    margin: 32px;
`

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`

export const FormEntry = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`

export const Button = styled.button`
  background-color: #ef220d;
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  color: white;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
  }
`