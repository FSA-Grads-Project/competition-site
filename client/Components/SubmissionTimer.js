import React, { useState, useEffect } from "react";

import { TimerDiv } from "../StyledComponents/SubmissionTimerStyles.tw";

const SubmissionTimer = () => {
    
    let now = new Date();
    
    const _deadline = new Date('Nov 18 2022 18:49:00');

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

    }, 1000);
    }, [counter]);
    
    
 

    

  
    return (

        t > 0 ? (
            <TimerDiv>
            <p> Enter now before its too late! </p>
            <p> Only { days } days { _hours } hours { _minutes } minutes and { seconds } seconds remain to join the hunt!! </p>
        </TimerDiv>
        ): (
            <div>
                Time Expired
            </div>
        )
        
    )
    
}

export default SubmissionTimer