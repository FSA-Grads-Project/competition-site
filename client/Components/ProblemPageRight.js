import React, { useState, useEffect } from "react";
import { NotLeaderBoardTitle, 
         NotCodeEditorTitle,
         CodeEditorTitle, 
         LeaderBoardTitle, 
         LeaderBoardTitleWrapper,
         NotLeaderBoardTitleWrapper,
         TitleWrapper} from "../StyledComponents/GlobalStyles.tw";
import { MdLeaderboard } from 'react-icons/md';
import { SlEqualizer } from 'react-icons/sl';
import { IconContext } from "react-icons";
import Leaderboard from "./Leaderboard";
import CodeEditor from "./CodeEditor";

const ProblemPageRight = ({ auth, solution, current }) => {
  const [leaderBoardView, setLeaderBoardview] = useState(true);
  const [codeEditorView, setCodeEditorView] = useState(true);

  let codeEditor; 
  if (solution && auth.accessToken) {
    codeEditor = `</> Your Solution`
  } else {
    codeEditor = `</> Code Editor`
  }
  let leaderBoard = `Leaderboard`

  function onClick(){
    if (leaderBoardView) {
      setCodeEditorView(true)
      setLeaderBoardview(false)
    } 
    if (codeEditorView) {
      setLeaderBoardview(true)
      setCodeEditorView(false)
    }
  }

  useEffect(() => {
    if (codeEditorView && !auth.accessToken && current) {
      setLeaderBoardview(true)
      setCodeEditorView(false)
    }
    if (codeEditorView && !auth.accessToken && !current) {
      setCodeEditorView(true)
      setLeaderBoardview(false)
    } 
    if (codeEditorView && solution) {
      setLeaderBoardview(true)
      setCodeEditorView(false)
    }
  }, [auth, solution, codeEditor, current])

if (codeEditorView) {
            return (
              
                <div>
                  <TitleWrapper>
                    <CodeEditorTitle>{codeEditor}</CodeEditorTitle>
                    <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                        <div>
                          <SlEqualizer />
                        </div>
                    </IconContext.Provider>
                    <NotLeaderBoardTitleWrapper>
                      <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                          <div>
                            <MdLeaderboard />
                          </div>
                      </IconContext.Provider>
                      <NotLeaderBoardTitle onClick={onClick}>{leaderBoard}</NotLeaderBoardTitle>
                    </NotLeaderBoardTitleWrapper>
                  </TitleWrapper>
                  <CodeEditor/>
                </div>
              
            )
  } else if (leaderBoardView) {
              return (
              
                  <div>
                      <TitleWrapper>                      
                        <NotCodeEditorTitle onClick={onClick}>{codeEditor}</NotCodeEditorTitle>
                          <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                            <div>
                              <SlEqualizer />
                            </div>
                          </IconContext.Provider>
                          <LeaderBoardTitleWrapper>
                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                              <div>
                                <MdLeaderboard />
                              </div>
                            </IconContext.Provider>
                            <LeaderBoardTitle>{leaderBoard}</LeaderBoardTitle>
                          </LeaderBoardTitleWrapper>
                    </TitleWrapper>
                    <Leaderboard/>
                  </div>
                  
              )
    }
}

export default ProblemPageRight;