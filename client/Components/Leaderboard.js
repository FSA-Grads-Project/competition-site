import React from 'react';
import { LeaderboardMainDiv, Header, Intro } from '../StyledComponents/LeaderboardStyles.tw';



const Leaderboard = () => {
    return (
        <LeaderboardMainDiv>
           <Header>  Last Weeks Leaderboard </Header>
           <Intro> 
                Last week a team of code crakers were able to unlock 
                the secret of the safe housing the Blue Jewel necklace 
                of the titanic. 
             </Intro>
        </LeaderboardMainDiv>
    )
}

export default Leaderboard