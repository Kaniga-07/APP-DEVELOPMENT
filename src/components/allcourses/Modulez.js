import React, { useState } from 'react';
import './Modulez.css';

const courses = [
  {
    title: "Course Details",
    lessons: [
      { id: 1, title: "Introduction to JavaScript", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "1m 56s", completed: false },
      { id: 2, title: "Advanced JavaScript", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "18m 58s", completed: false },
      { id: 3, title: "React Basics", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "20m 13s", completed: false },
      { id: 4, title: "Redux", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "11m 56s", completed: false },
      { id: 5, title: "React-Router-Dom", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "8m 5s", completed: false },
      { id: 6, title: "Hooks", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "22m 33s", completed: false },
      { id: 7, title: "Regex", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "15m 50s", completed: false },
      { id: 8, title: "Axios", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "19m 45s", completed: false },
      { id: 9, title: "Routing", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "45m 33s", completed: false },
      { id: 10, title: "Styling(CSS)", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "7m 6s", completed: false },
      { id: 11, title: "Props", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "37m 25s", completed: false },
      { id: 12, title: "Json-server", videoLink: "https://www.youtube.com/embed/b9eMGE7QtTk", duration: "5m 58s", completed: false }
    ],
    quizzes: [
      {
        id: 1,
        title: "JavaScript Basics Quiz",
        questions: [
          {
            question: 'What is the output of 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1,
          },
          {
            question: 'Which keyword is used to define a variable?',
            options: ['var', 'let', 'const', 'All of the above'],
            correctAnswer: 3,
          },
          // Add more questions as needed
        ],
      },
      // Add more quizzes as needed
    ],
  },
  // Add more courses as needed
];

const LessonItem = ({ lesson, isActive, onClick }) => (
  <li className={`lesson-item ${isActive ? 'active' : ''}`} onClick={onClick}>
    <span className="lesson-item-icon">📘</span>
    <span className="lesson-item-title">{lesson.title}</span>
    <span className="lesson-item-duration">{lesson.duration}</span>
    {lesson.completed && <span className="lesson-item-checked">✔️</span>}
  </li>
);

const QuizItem = ({ quiz, isActive, onClick }) => (
  <li className={`quiz-item ${isActive ? 'active' : ''}`} onClick={onClick}>
    <span className="quiz-item-title">{quiz.title}</span>
  </li>
);

const LessonList = ({ course, activeLesson, onLessonClick, onQuizClick }) => (
  <div className="lesson-list-container">
    <h2 className="course-title">{course.title}</h2>
    <ul className="lesson-list">
      {course.lessons.map(lesson => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          isActive={activeLesson && activeLesson.id === lesson.id}
          onClick={() => onLessonClick(lesson)}
        />
      ))}
    </ul>
    <h2 className="quiz-title">Quizzes</h2>
    <ul className="quiz-list">
      {course.quizzes.map(quiz => (
        <QuizItem
          key={quiz.id}
          quiz={quiz}
          isActive={activeLesson && activeLesson.id === quiz.id}
          onClick={() => onQuizClick(quiz)}
        />
      ))}
    </ul>
  </div>
);

const VideoPlayer = ({ videoLink, onVideoEnd }) => (
  <div className="video-container">
    <iframe
      width="100%"
      height="100%"
      src={videoLink}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      onEnded={onVideoEnd}
    ></iframe>
  </div>
);

const Quiz = ({ quiz, onSubmit }) => {
  const [userAnswers, setUserAnswers] = useState(Array(quiz.questions.length).fill(null));

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  return (
    <div className="quiz-container">
      <h3>{quiz.title}</h3>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="quiz-question">
          <p>{question.question}</p>
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="option-container">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={oIndex}
                checked={userAnswers[qIndex] === oIndex}
                onChange={() => handleAnswerChange(qIndex, oIndex)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => onSubmit(userAnswers)}>Submit Quiz</button>
    </div>
  );
};

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search lessons..."
      value={searchTerm}
      onChange={onSearchChange}
    />
  </div>
);

const AppBar = ({ courses, onCourseSelect }) => (
  <div className="app-bar">
    {courses.map(course => (
      <button key={course.title} onClick={() => onCourseSelect(course)}>
        {course.title}
      </button>
    ))}
  </div>
);

const Modulez = () => {
  const [currentCourse, setCurrentCourse] = useState(courses[0]);
  const [activeLesson, setActiveLesson] = useState(currentCourse.lessons[0]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizResults, setQuizResults] = useState(null);

  const handleLessonClick = (lesson) => {
    const updatedCourse = { ...currentCourse };
    const lessonIndex = updatedCourse.lessons.findIndex(l => l.id === lesson.id);
    updatedCourse.lessons[lessonIndex].completed = true;

    setCurrentCourse(updatedCourse);
    setActiveLesson(lesson);
    setActiveQuiz(null); // Reset active quiz on lesson change
    setQuizResults(null); // Reset quiz results on lesson change
  };

  const handleQuizClick = (quiz) => {
    setActiveQuiz(quiz);
    setActiveLesson(null); // Reset active lesson on quiz change
    setQuizResults(null); // Reset quiz results on quiz change
  };

  const handleVideoEnd = () => {
    const currentIndex = currentCourse.lessons.findIndex(lesson => lesson.id === activeLesson.id);
    const nextLesson = currentCourse.lessons[currentIndex + 1];

    if (nextLesson) {
      handleLessonClick(nextLesson);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCourseSelect = (course) => {
    setCurrentCourse(course);
    setActiveLesson(course.lessons[0]);
    setActiveQuiz(null); // Reset active quiz on course change
    setSearchTerm("");
    setQuizResults(null); // Reset quiz results on course change
  };

  const handleQuizSubmit = (userAnswers) => {
    const currentQuiz = activeQuiz;
    let score = 0;

    userAnswers.forEach((answer, index) => {
      if (answer === currentQuiz.questions[index].correctAnswer) {
        score += 1;
      }
    });

    const percentage = (score / currentQuiz.questions.length) * 100;
    let grade = '';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    else grade = 'F';

    setQuizResults({ score, grade });
  };

  const filteredLessons = currentCourse.lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="module-container">
      <div className="top-bar-container">
        <AppBar courses={courses} onCourseSelect={handleCourseSelect} />
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>
      <div className="main-content">
        <LessonList
          course={{ ...currentCourse, lessons: filteredLessons }}
          activeLesson={activeLesson}
          onLessonClick={handleLessonClick}
          onQuizClick={handleQuizClick}
        />
        {activeLesson && (
          <VideoPlayer videoLink={activeLesson.videoLink} onVideoEnd={handleVideoEnd} />
        )}
        {activeQuiz && (
          <Quiz
            quiz={activeQuiz}
            onSubmit={handleQuizSubmit}
          />
        )}
        {quizResults && (
          <div className="quiz-results">
            <h3 style={{color:"green"}}>Quiz Results</h3>
            <p>Score: {quizResults.score}/{activeQuiz.questions.length}</p>
            <p style={{color:"purple"}}>Grade: {quizResults.grade}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modulez;
