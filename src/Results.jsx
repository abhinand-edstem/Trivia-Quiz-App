import React from "react";
import { useState } from "react";
import Questions from "./Questions";

const Results = ({score}) => {
    const [playAgain, setplayAgain] = useState(false);
    return(
        <div>
            {playAgain ? <Questions /> : <>
            <h1>Total Score : {score}</h1>
            <button className="next_qtn" onClick={()=>setplayAgain(true)}>Play Again</button>
            </>}
        </div>
    )
}

export default Results