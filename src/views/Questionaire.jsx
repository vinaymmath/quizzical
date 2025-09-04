import Question from "../components/Question";


export default function Questionaire({questionare, showAnswers, setShowAnswers, step, score, setAnswers, reset}) {
    const questionsList = questionare.map((question, index) => {
        return <Question
                     key={`${index}${question}`}
                     question={question.question}
                     options={question.options}
                     correctAnswer={question.correct_answer}
                     setAnswers = {setAnswers}
                     showAnswers = {showAnswers}
                />
    })
    return (
        <div className="questionaire-container">
            { questionsList }
            <div className="btn-container">
                {
                    step === 2  
                        ? <button className="submit-btn"
                                onClick={setShowAnswers}
                            >
                                Check anwsers
                            </button>
                        : null
                }
            </div>
            <div className="score-container">
                <div>
                    <h3 className="score-info">
                        { step === 3 ? `You scored ${score}/${questionare.length} correct answers`: null}
                    </h3>
                </div>
                {
                    showAnswers 
                    ? <button className="reset-btn" onClick={reset}>Play Again</button>
                    : null
                }
            </div>
        </div>
    )
}