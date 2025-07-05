import { useState } from 'react';

const Quiz = ({ questions, onRestart }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (option) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      setShowFeedback(true);
      
      if (option === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  return currentQuestion < questions.length ? (
    <div className="quiz-container">
      <div className="progress">
        Question {currentQuestion + 1} of {questions.length}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <h2>{questions[currentQuestion].question}</h2>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`option-btn ${
              selectedAnswer === option ? 'selected' : ''
            } ${
              showFeedback && option === questions[currentQuestion].correct 
                ? 'correct' 
                : showFeedback && selectedAnswer === option 
                ? 'incorrect' 
                : ''
            }`}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="feedback">
          <p>
            {selectedAnswer === questions[currentQuestion].correct
              ? '🎉 Correct! Well done!'
              : `❌ Oops! The correct answer is "${questions[currentQuestion].correct}"`}
          </p>
          <button onClick={handleNext} className="next-btn">
            {currentQuestion === questions.length - 1 ? 'Finish Quiz 🏁' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="results">
      <h2>Quiz Completed! 🎊</h2>
      <div className="score-display">
        {score}/{questions.length}
      </div>
      <p>
        {score === questions.length
          ? 'Perfect Score! 🏆'
          : score > questions.length / 2
          ? 'Great Job! 👍'
          : 'Keep Practicing! 💪'}
      </p>
      <button onClick={onRestart} className="restart-btn">
        Restart Quiz 🔄
      </button>
    </div>
  );
};

export default Quiz;