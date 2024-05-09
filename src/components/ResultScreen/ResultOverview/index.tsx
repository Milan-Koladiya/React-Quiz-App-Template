import { FC } from 'react'
import styled from 'styled-components'

import { useQuiz } from '../../../context/QuizContext'
import { device } from '../../../styles/BreakPoints'
import { HighlightedText } from '../../../styles/Global'
import { convertSeconds } from '../../../utils/helpers'
import { Result } from '../../../types'

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  p {
    margin-top: 15px;
    font-weight: 500;
    font-size: 18px;
  }
`

interface ResultOverviewProps {
  result: Result[]
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
  const { quizDetails, questions, endTime } = useQuiz()


  // Passed if 60 or more than 60% marks
  const marks = () => {
    let result = 0;
    questions.map((question) => {
      if (question.userSelection) {
        const isMatch = question.userSelection.every((answer) => question?.correctAnswers.includes(answer));
        isMatch ? result++ : result = result - 0.25
      }
    })
    return result;
    // (obtainedScore / quizDetails.totalScore) * 100 >= 60 ? 'Passed' : 'Failed'
  }
  const obtainedScore = marks()

  return (
    <ResultOverviewStyle>
      <p>
        You attempted questions:{' '}
        <HighlightedText> {questions.filter((question) => question.userSelection).length} </HighlightedText>/{' '}
        {quizDetails.totalQuestions}
      </p>
      <p>
        Score secured:<HighlightedText> {obtainedScore} </HighlightedText>/{' '}
        {quizDetails.totalScore}
      </p>
      <p>
        Time Spent:<HighlightedText> {convertSeconds(endTime)} </HighlightedText>
      </p>
      {/* <p>
        Status:<HighlightedText> {calculateStatus}</HighlightedText>
      </p> */}
    </ResultOverviewStyle>
  )
}

export default ResultOverview
