import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, CheckIcon, Next, TimerIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { useTimer } from '../../hooks'
import { device } from '../../styles/BreakPoints'
import { PageCenter } from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import Question from './Question'
import QuizHeader from './QuizHeader'

const QuizContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
    selectedAnswer ? `${theme.colors.buttonText}` : `${theme.colors.darkGray}`};
        }
      }
    }
  }
`

const LogoContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${device.md} {
    margin-top: 10px;
    margin-bottom: 20px;
    svg {
      width: 185px;
      height: 80px;
    }
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 60px;
  bottom: 30px;
  display: flex;
  gap: 20px;
  @media ${device.sm} {
    justify-content: flex-end;
    width: 90%;
    right: 15px;
  }
`

const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)

  const {
    questions,
    setQuestions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
  } = useQuiz()

  const currentQuestion = questions[activeQuestion]

  const { type, correctAnswers } = currentQuestion

  const onClickNext = () => {
    // const isMatch: boolean =
    //   selectedAnswer.length === correctAnswers.length &&
    //   selectedAnswer.every((answer) => correctAnswers.includes(answer))

    // // adding selected answer, and if answer matches key to result array with current question

    // if (activeQuestion !== questions.length - 1) {
    //   setActiveQuestion((prev) => prev + 1)
    // } else {
    //   // how long does it take to finish the quiz
    const timeTaken = quizDetails.totalTime - timer
    setEndTime(timeTaken)
    setShowResultModal(true)
    // }
    // setSelectedAnswer([])
  }

  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: string, question: string) => {
    const { name, checked } = e.target

    // if (type === 'MAQs') {
    //   console.log("========>",name, selectedAnswer);
    //   if (selectedAnswer.includes(name)) {
    //     setSelectedAnswer((prevSelectedAnswer) => {
    //       return prevSelectedAnswer.filter((element) => element !== name)
    //     }
    //     )
    //   } else {
    //     setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name])
    //   }
    // }

    console.log("selectedAnswer ==> ", questions, name, index, e, question, result);
    if (type === 'MCQs' || type === 'boolean') {
      setQuestions((questions) => {
        return questions.map((ques) => ques.question == question ? { ...ques, userSelection: [name], isMatch: [name].every((answer) => correctAnswers.includes(answer)) } : ques)
      })
      // const question = questions.find((ques) => ques.question == name)
      // setResult([...result, { ...question, selectedAnswer: name, isMatch }])

      // if (checked) {
      //   if (selectedAnswer.includes(name)) {
      //     setSelectedAnswer((prevSelectedAnswer) => {
      //       return prevSelectedAnswer.filter((element) => element !== name)
      //     }
      //     )
      //   } else {
      //     setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name])
      //   }
      // }
    }
  }

  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  // to prevent scrolling when modal is opened
  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showTimerModal, showResultModal])

  // timer hooks, handle conditions related to time
  useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal)

  return (
    <PageCenter>
      <QuizContainer selectedAnswer={selectedAnswer.length > 0}>
        {questions.map(
          (
            {
              question,
              choices,
              code,
              image,
              userSelection
            },
            index: number
          ) =>
            <Question
              questionNumber={index + 1}
              question={question}
              code={code}
              image={image}
              choices={choices}
              type={type}
              handleAnswerSelection={handleAnswerSelection}
              selectedAnswer={userSelection}
            />
        )}
        <ButtonWrapper>
          <Button
            text={'Finish'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={questions.filter((question) => question.userSelection).length ? false : true}
          />
        </ButtonWrapper>
      </QuizContainer>
      {/* timer or finish quiz modal*/}
      {(showTimerModal || showResultModal) && (
        <ModalWrapper
          title={showResultModal ? 'Done!' : 'Your time is up!'}
          subtitle={`You have attempted ${questions.filter((question) => question.userSelection).length} questions in total.`}
          onClick={handleModal}
          icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
          buttonTitle="SHOW RESULT"
        />
      )}
    </PageCenter>
  )
}

export default QuestionScreen
