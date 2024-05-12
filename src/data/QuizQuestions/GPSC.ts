// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

import { Topic } from '.'

export const GPSC: Topic = {
  topic: 'GPSC',
  level: 'Intermediate',
  totalQuestions: 11,
  totalScore: 95,
  totalTime: 5,
  questions: [
    {
      question: 'What is JSX in Reactsss?',
      choices: [
        'A syntax extension for JavaScript that allows writing HTML-like code in JavaScript',
        'A state management library for React applications',
        'A build tool for bundling React applications',
        'A testing framework for React components',
      ],
      type: 'MCQs',
      correctAnswers: [
        'A syntax extension for JavaScript that allows writing HTML-like code in JavaScript',
      ],
      score: 1,
    },
    {
      question: 'React components must always return a single JSX element.',
      choices: ['True', 'False'],
      type: 'boolean',
      correctAnswers: ['True'],
      score: 5,
    },
    {
      question: 'What is the purpose of React components?',
      choices: [
        'To handle HTTP requests and fetch data from APIs',
        'To manage the state of a React application',
        'To define the structure and appearance of the user interface',
        'To handle user interactions and events',
      ],
      type: 'MCQs',
      correctAnswers: ['To define the structure and appearance of the user interface'],
      score: 10,
    },
    {
      question:
        'Which of the following are valid React lifecycle methods? (Select all that apply)',
      choices: [
        'componentWillMount',
        'componentDidMount',
        'componentWillUpdate',
        'componentDidUpdate',
      ],
      type: 'MCQs',
      correctAnswers: ['componentDidMount', 'componentWillUpdate', 'componentDidUpdate'],
      score: 10,
    },
  ],
}
