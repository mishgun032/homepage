import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  min-height: 50vh;

  box-sizing: border-box;

  background: #d3d3d3;

  padding-bottom: 50px;
  padding-top: 10px;
  padding-left: 2vw;
  padding-right: 2vw;

  @media(max-width: 1500px) {
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }
`

export const RepoContainer = styled.div`
  @media(max-width: 1500px) {
  margin: 50px auto;
  }
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  width: 700px;
  height: 100%;
  min-height: 360px;
  
  margin-left: 50px;
  margin-bottom: 75px;
`

export const RepoHeader = styled.div`
  width: 100%;
  height: 100px;
  background: #111111;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  color: white;
`

export const CloneBody = styled.div`
  display: flex;
`

export const CloneInp = styled.input`
  min-width: 200px;
  outline: none;
  caret-color: transparent;
  padding-top: 2px;
  padding-bottom: 3px;
  padding-right: 3px;
  padding-left: 3px;
`
export const Btn = styled.button`
  width: 50px;
  margin-right: 5px;
  background: #ffffff;
  border: 0;
  cursor: pointer;
`

export const Info = styled.div`
  font-size: 12px;
  color: dfdfdf;
`
export const RepoCommit = styled.div`
  
`
export const Commit = styled.div`
  background: #1d1526;

  box-sizing: border-box;
  
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 20px;
  
`
export const CommitMessage = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
  
  margin-bottom: 20px;
`

export const CommitInfo = styled.div`
  margin-top: 10px;

  border-top: 2px solid black;
  display: flex;
  justify-content: space-between; 
  background: #cfcfcf;
  padding: 10px;
  
  display: flex;
  justify-content: space-between;
`

export const Commitshowmore = styled.div`
  width: 100%;
  color: white;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
`

export const Reponumber = styled.h1`
  width: 100%;
  color: black;
  text-align: center;
  margin-bottom: 35px;
  font-size: 40px;
`
