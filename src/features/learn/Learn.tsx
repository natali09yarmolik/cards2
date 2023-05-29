import React, { memo, useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import { getCard } from '../../common/utils/getCard'
import { useStyles } from '../styleMU/styleMU'
import { selectPackName } from '../table/Cards/selectors'
import { CardsType } from '../table/table-api'

import { setCardsPackIdForLearnAC } from './actions'
import { updateGradeTC } from './learn-reducer'
import s from './Learn.module.css'
import { selectCardsForLearn, selectCardsPackIdForLearn } from './selectors'

import { useAppDispatch, useAppSelector } from 'app/store'
import { LinkToBack } from 'common/components/LinkToBack/LinkToBack'
import { PATH } from 'common/utils/routes/Routes'

const grades = [
  "I didn't know",
  'I forgot',
  "I've been thinking for a long time",
  'I got mixed up',
  'I answered correctly',
]

export const Learn = memo(() => {
  const packName = useAppSelector(selectPackName)
  const id = useAppSelector(selectCardsPackIdForLearn)
  const styleMU = useStyles()
  const cards = useAppSelector(selectCardsForLearn)
  const [showNext, setShowNext] = useState(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)

  let newGrade = 0
  let cardID = ''
  const [card, setCard] = useState<CardsType>({
    _id: '',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (first) {
      dispatch(setCardsPackIdForLearnAC(id))
      setFirst(false)
    }

    if (cards[0] !== undefined && !showNext) {
      if (cards[0].cardsPack_id === id && cards.length > 0) {
        setCard(getCard(cards))
      }
    }
  }, [dispatch, id, cards, first])

  const handleShowAnswer = () => {
    setIsChecked(true)
    setShowNext(false)
    cardID = card._id
  }
  const handleCheckAnswer = (grade: number) => {
    newGrade = grade
  }
  const handleShowNext = () => {
    setIsChecked(false)

    if (cards.length > 0) {
      dispatch(updateGradeTC({ card_id: card._id, grade: newGrade }))
      setShowNext(true)
    }
  }

  useEffect(() => {
    if (cards[0] !== undefined && showNext) {
      if (cards[0].cardsPack_id === id && cards.length > 0) {
        if (cards.length > 1) {
          const newCards = cards.filter(el => {
            return el._id !== card._id
          })

          setCard(getCard(newCards))
        } else {
          setCard(getCard(cards))
        }
      }
    }
  }, [showNext])

  return (
    <div className={s.wrapper}>
      <div className={s.link}>
        <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'} />
      </div>
      <div className={s.learnBlock}>
        <div className={s.learnTitle}>Learn {packName}</div>
        <div className={s.learnQuestionBlock}>
          <div>
            <b>QUESTION</b>: {card.question}
          </div>
          <div className={s.learnShots}>
            Number of attempts to answer the question:{' '}
            {cardID === card._id ? card.shots + 1 : card.shots}
          </div>
          <Button onClick={handleShowAnswer} variant={'contained'} className={styleMU.button}>
            Show answer
          </Button>
          {isChecked && (
            <>
              <div>
                <b>ANSWER</b>: {card.answer}
              </div>
              <div className={s.learnCheckboxBlock}>
                {grades.map((el, index) => {
                  return (
                    <label key={index}>
                      <input
                        type={'radio'}
                        name={'check'}
                        onClick={() => handleCheckAnswer(index + 1)}
                      />
                      {el}
                    </label>
                  )
                })}
              </div>
              <Button onClick={handleShowNext} variant={'contained'} className={styleMU.button}>
                {' '}
                Show next question
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
})
