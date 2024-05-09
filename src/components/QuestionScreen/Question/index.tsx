import { FC } from 'react'
import styled from 'styled-components'

import { device } from '../../../styles/BreakPoints'

import CodeSnippet from '../../ui/CodeSnippet'
import Answer from '../Answer'
import QuizImage from '../../ui/QuizImage'
import { Flex } from '../../../styles/Global'

const QuestionContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 88%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const AnswersContainer = styled.div`
  max-width: 78%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const QuestionStyle = styled.h2`
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 500;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 1.3;
`

const QuestionNumber = styled.h6`
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
`

interface QuestionTypes {
  question: string
  code?: string
  image?: string
  type: string
  choices: string[]
  selectedAnswer?: string[]
  questionNumber: number
  handleAnswerSelection: (e: React.ChangeEvent<HTMLInputElement>, index: number, type: string, question: string) => void
}

const Question: FC<QuestionTypes> = ({
  question,
  code,
  image,
  type,
  choices,
  selectedAnswer,
  handleAnswerSelection,
  questionNumber
}) => {
  return (
    <QuestionContainer>
      <Flex gap="4px">
        <QuestionNumber>{`${questionNumber}. `}</QuestionNumber>
        <QuestionStyle>{question}</QuestionStyle>
      </Flex>
      {/* if question contains code snippet then show code */}
      {code && <CodeSnippet code={code} language="javascript" />}
      {/* if question contains an image */}
      {image && <QuizImage image={image} />}
      <AnswersContainer>
        {choices.map((choice, index) => (
          <Answer
            choice={choice}
            index={index}
            key={index}
            onChange={(e) => handleAnswerSelection(e, index, type, question)}
            type={type}
            selectedAnswer={selectedAnswer}
          />
        ))}
      </AnswersContainer>
    </QuestionContainer>
  )
}

export default Question
