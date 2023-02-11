import React, { useState, useEffect } from "react";
import {
  TitleWrapper,
  TabTitleDiv,
  TabTitleH1,
} from "../StyledComponents/GlobalStyles.tw";
import { MdLeaderboard } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import Leaderboard from "./Leaderboard";
import CodeEditor from "./CodeEditor";

export const TabTitle = ({ leaderBoardView, codeEditorView, title }) => {
  return (
    <div>
      <TabTitleDiv
        className={
          (codeEditorView && title === "editor") ||
          (leaderBoardView && title === "leaderboard")
            ? "cursor-default"
            : "cursor-pointer text-fadedFont"
        }
      >
        {title === "editor" ? (
          <BiCodeAlt className="min-w-10 min-h-10 mx-1" />
        ) : (
          <MdLeaderboard className="min-w-10 min-h-8 mx-1" />
        )}
        <TabTitleH1>
          {title === "editor" ? "Code Editor" : "Leaderboard"}
        </TabTitleH1>
      </TabTitleDiv>
    </div>
  );
};

const ProblemPageRight = ({ auth, solution, problem }) => {
  const [leaderBoardView, setLeaderBoardview] = useState(true);
  const [codeEditorView, setCodeEditorView] = useState(true);

  let codeEditor;
  if (solution && auth.accessToken) {
    codeEditor = `</> Your Solution`;
  } else {
    codeEditor = `</> Code Editor`;
  }
  let leaderBoard = `Leaderboard`;

  function onClick() {
    console.log("this ran");
    if (leaderBoardView) {
      setCodeEditorView(true);
      setLeaderBoardview(false);
    }
    if (codeEditorView) {
      setLeaderBoardview(true);
      setCodeEditorView(false);
    }
  }

  useEffect(() => {
    if (codeEditorView && !auth.accessToken && problem) {
      setLeaderBoardview(true);
      setCodeEditorView(false);
    }
    if (codeEditorView && !auth.accessToken && !problem) {
      setCodeEditorView(true);
      setLeaderBoardview(false);
    }
    if (codeEditorView && solution) {
      setLeaderBoardview(true);
      setCodeEditorView(false);
    }
  }, [auth, solution, codeEditor, problem]);

  console.log(codeEditorView);

  if (codeEditorView) {
    return (
      <div>
        <TitleWrapper>
          <TabTitle
            leaderBoardView={leaderBoardView}
            codeEditorView={codeEditorView}
            title={"editor"}
          />
          <div className="flex justify-center items-center mx-5 h-full">
            <div className="h-4/6 w-1 bg-darkFont m-0.5"></div>
            <div className="h-full w-1 bg-darkFont m-0.5"></div>
            <div className="h-4/6 w-1 bg-darkFont m-0.5"></div>
          </div>
          <div onClick={onClick}>
            <TabTitle
              leaderBoardView={leaderBoardView}
              codeEditorView={codeEditorView}
              title={"leaderboard"}
            />
          </div>
        </TitleWrapper>
        <CodeEditor />
      </div>
    );
  } else if (leaderBoardView) {
    return (
      <div>
        <TitleWrapper>
          <div onClick={onClick}>
            <TabTitle
              leaderBoardView={leaderBoardView}
              codeEditorView={codeEditorView}
              title={"editor"}
            />
          </div>
          <div className="flex justify-center items-center mx-5 h-full">
            <div className="h-4/6 w-1 bg-darkFont m-0.5"></div>
            <div className="h-full w-1 bg-darkFont m-0.5"></div>
            <div className="h-4/6 w-1 bg-darkFont m-0.5"></div>
          </div>
          <TabTitle
            leaderBoardView={leaderBoardView}
            codeEditorView={codeEditorView}
            title={"leaderboard"}
          />
        </TitleWrapper>
        <Leaderboard />
      </div>
    );
  }
};

export default ProblemPageRight;
