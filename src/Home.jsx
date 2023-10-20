import React,{useState} from "react";
import Questions from "./Questions";

const Home = () => {
    const [startQuiz,setStartQuiz] = useState(false)
    return(
        <div className="home_container">
            {startQuiz ? <>
                <Questions />
            </> : <>     
        <h1>welcome to Open Trivia Quiz...</h1>
        <button  className="next_qtn" onClick={()=>setStartQuiz(true)}>Click Here to start the quiz</button>
            </>}
        </div>
    )
}

export default Home