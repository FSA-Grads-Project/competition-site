import React from 'react';
import { LeaderboardMainDiv, Header, Intro, TopScoreDisplay } from '../StyledComponents/LeaderboardStyles.tw';
import { useSelector } from "react-redux";


const Leaderboard = () => {
    const users = useSelector(state => state.users).users;
    const results = useSelector(state => state.results);
    
    
    return (
        <LeaderboardMainDiv>
           <Header>  Last Weeks Leaderboard </Header>
           <Intro> 
                Last week a team of code crakers were able to unlock 
                the secret of the safe housing the Blue Jewel necklace 
                of the titanic. 
             </Intro>
             <TopScoreDisplay>
                <ul>
                    {
                        users.map(user => {
                            return (
                                <div key={user.id}>
                                   <li>  { user.username }...............................................{Math.ceil(Math.random() * 100)} </li> 
                                </div>
                            )
                        })
                    }

                </ul>
             </TopScoreDisplay>
        </LeaderboardMainDiv>
    )
}

export default Leaderboard