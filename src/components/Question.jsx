import { useState } from "react";

export default function Question ({question, showAnswers, options, correctAnswer, setAnswers}){
const [selectedOption, setSelectedOption] = useState("");
function handleSelection(option) {
    setSelectedOption(option)
    setAnswers((prevValue) => {
        return {
            ...prevValue,
            [question]: option
        }
    })
}

const optionsListEls = options.map((option, index) => 
    <button 
        key={`${index}${option}`}
        className={
            `option-btn 
            ${ showAnswers === false
                ? selectedOption === option
                    ? 'selected'
                    : null
                : selectedOption === option 
                        ? option !== correctAnswer
                            ? 'red'
                            : 'green'
                        : option === correctAnswer
                            ? 'green'
                            : null
            }
            `}
        disabled={showAnswers}
        onClick={() => handleSelection(option)}
    >{option}</button>
)

    return (
        <div className="question-container">
            <h3 className="qustion">{question}</h3>
            <section className="options-container">
                { optionsListEls }
            </section>
        </div>
    )
}