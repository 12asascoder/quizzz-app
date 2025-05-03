import { useState } from 'react';
import Quiz from './components/Quiz';
import { quizData } from './data/quizData';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="App">
      <h1>Interactive Quiz</h1>
      {!quizStarted ? (
        <button className="start-btn" onClick={() => setQuizStarted(true)}>
          Start Quiz
        </button>
      ) : (
        <Quiz questions={quizData} onRestart={() => setQuizStarted(false)} />
      )}
    </div>
  );
}

export default App;