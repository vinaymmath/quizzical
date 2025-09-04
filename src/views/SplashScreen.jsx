export default function SplashScreen({changeStep, isLoading}) {
    return (
        <>
            <section className="intro">
                <h3 class-name="intro-title">
                   Quizzical 
                </h3>
                <p className="intro-desc">
                    Take the quiz, evaluate your GK.
                </p>
                <button 
                    className="quiz-btn" 
                    onClick={changeStep}
                    disabled={isLoading}
                    >
                    Start Quiz
                </button>
            </section>
        </>
    )
}