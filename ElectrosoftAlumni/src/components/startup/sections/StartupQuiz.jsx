import React, { useState } from "react";
import { Edit, Save, X, Brain, Trophy, Clock, Award } from "lucide-react";

const StartupQuiz = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const [content, setContent] = useState({
    title: "Startup Knowledge Quiz",
    description:
      "Test your entrepreneurial knowledge and discover areas for growth.",
    questions: [
      {
        question: "What is the most important factor for startup success?",
        options: [
          "Great idea",
          "Product-market fit",
          "Large funding",
          "Perfect team",
        ],
        correct: 1,
        explanation:
          "Product-market fit is crucial - it means your product satisfies a strong market demand.",
      },
      {
        question: "When should you typically seek Series A funding?",
        options: [
          "Before building MVP",
          "After proving product-market fit",
          "When you have an idea",
          "After Series B",
        ],
        correct: 1,
        explanation:
          "Series A funding typically comes after you've proven product-market fit and need capital to scale.",
      },
      {
        question: "What does MVP stand for?",
        options: [
          "Most Valuable Product",
          "Minimum Viable Product",
          "Maximum Value Proposition",
          "Market Validation Process",
        ],
        correct: 1,
        explanation:
          "MVP stands for Minimum Viable Product - the simplest version that provides value to early customers.",
      },
      {
        question:
          "What percentage of equity is typically reserved for employee stock options?",
        options: ["5-10%", "10-20%", "20-30%", "30-40%"],
        correct: 1,
        explanation:
          "Most startups reserve 10-20% of equity for employee stock option pools to attract and retain talent.",
      },
      {
        question: "What is the primary purpose of a pitch deck?",
        options: [
          "Show financial details",
          "Tell your story and vision",
          "List all features",
          "Prove profitability",
        ],
        correct: 1,
        explanation:
          "A pitch deck should tell your story, articulate your vision, and demonstrate the opportunity to investors.",
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving quiz content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < content.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    content.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreMessage = (score) => {
    const percentage = (score / content.questions.length) * 100;
    if (percentage >= 80)
      return {
        message: "Excellent! You're startup-ready! 🚀",
        color: "text-green-600",
      };
    if (percentage >= 60)
      return {
        message: "Good knowledge! Keep learning! 📚",
        color: "text-blue-600",
      };
    if (percentage >= 40)
      return {
        message: "Getting there! Study more! 💪",
        color: "text-yellow-600",
      };
    return {
      message: "Need more preparation! Start with basics! 📖",
      color: "text-red-600",
    };
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (!quizStarted) {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {content.title}
            </h1>
            <p className="text-gray-600 mt-2">{content.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Quiz Overview */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 text-center mb-8 border border-purple-200">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Test Your Startup Knowledge
          </h2>
          <p className="text-gray-600 mb-6">
            Challenge yourself with questions covering all aspects of
            entrepreneurship
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">5 minutes</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Brain className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {content.questions.length} questions
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Get score</span>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>

        {/* Quiz Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              📈 Business Strategy
            </h3>
            <p className="text-sm text-gray-600">
              Market analysis, competition, and business models
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              💰 Funding & Investment
            </h3>
            <p className="text-sm text-gray-600">
              Venture capital, angel investors, and equity
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              🚀 Product Development
            </h3>
            <p className="text-sm text-gray-600">
              MVP, product-market fit, and user experience
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              📊 Marketing & Growth
            </h3>
            <p className="text-sm text-gray-600">
              Customer acquisition and growth strategies
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              ⚖️ Legal & Compliance
            </h3>
            <p className="text-sm text-gray-600">
              Business structure and intellectual property
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              👥 Team & Leadership
            </h3>
            <p className="text-sm text-gray-600">
              Hiring, equity distribution, and culture
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const scoreMessage = getScoreMessage(score);

    return (
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h2>
          <p className="text-xl font-semibold mb-4">
            You scored {score} out of {content.questions.length}
          </p>
          <p className={`text-lg font-medium mb-6 ${scoreMessage.color}`}>
            {scoreMessage.message}
          </p>

          <div className="space-y-4 mb-6 text-left max-w-2xl mx-auto">
            {content.questions.map((question, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <p className="font-medium text-gray-900 mb-2">
                  {question.question}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded text-sm ${
                        optionIndex === question.correct
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : answers[index] === optionIndex
                          ? "bg-red-100 text-red-800 border border-red-300"
                          : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {option}
                      {optionIndex === question.correct && " ✓"}
                      {answers[index] === optionIndex &&
                        optionIndex !== question.correct &&
                        " ✗"}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 italic">
                  {question.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = content.questions[currentQuestion];

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestion + 1} of {content.questions.length}
            </span>
            <span>
              {Math.round(
                ((currentQuestion + 1) / content.questions.length) * 100
              )}
              % Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestion + 1) / content.questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="p-4 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <span className="font-medium text-gray-700">
                  {String.fromCharCode(65 + index)}.
                </span>{" "}
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupQuiz;
