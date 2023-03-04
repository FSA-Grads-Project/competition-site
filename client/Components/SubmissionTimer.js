import React, { useState, useEffect } from "react";

import { TimerDiv, TimerH3, TimeDisplay, TimeDisplayContainer, TimeTextDisplay } from "../StyledComponents/SubmissionTimerStyles.tw";

const SubmissionTimer = () => {
    
    let now = new Date();
    
    const _deadline = new Date('Nov 28 2022 10:41:00');

    let t = _deadline - now;

    let _days = Math.floor(t / (1000 * 60 * 60 * 24 ));
    let _hours = Math.floor((t % (1000 * 60 * 60 * 24 )) / (1000 * 60 * 60 ));
    let _minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60 ));
    let _seconds = Math.floor((t % (1000 * 60 )) / 1000);
    

    
    const [counter, setCounter] = useState(t || 0);
    const [days, setDays ] = useState(_days || 0);
    const [seconds, setSeconds ] = useState(_seconds || 0);
    
    
    
    useEffect(() => {
        if (counter === 0) {
        return;
    }
    setTimeout(() => {
        setCounter(counter - 1);
        setSeconds(Math.floor((t % (1000 * 60 )) / 1000))
        setDays( Math.floor(t / (1000 * 60 * 60 * 24 )))

    }, 1000);
    }, [counter]);
    
    
  
    return (

        t > 0 ? (
            <TimerDiv>
            <TimerH3> Enter now before its too late! </TimerH3>
            <TimeDisplayContainer>
                <TimeTextDisplay>
                    Only <TimeDisplay> { days } {days <= 1 ? 'Day' : 'Days'}  </TimeDisplay> 
                    <TimeDisplay>  { _hours } {_hours <= 1 ? 'Hour' : 'Hours'} </TimeDisplay> 
                    <TimeDisplay>  { _minutes } {_minutes <= 1 ? 'Minute' : 'Minutes'} </TimeDisplay> 
                    and 
                    <TimeDisplay> { seconds } {seconds === 1 ? 'Second' : 'Seconds'} </TimeDisplay> remain to join the hunt!! 
                </TimeTextDisplay>
            </TimeDisplayContainer>
        </TimerDiv>
        ): (
            <div>
                Time Expired
            </div>
        )
        
    )
    
}

export default SubmissionTimer