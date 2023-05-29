import React, { useState } from 'react'

import SuperButton from '../SuperButton/SuperButton'
import SuperCheckbox from '../SuperCheckbox/SuperCheckbox'
import { SuperDebouncedInput } from '../SuperDebouncedInput/SuperDebouncedInput'
import SuperEditableSpan from '../SuperEditableSpan/SuperEditableSpan'
import SuperInput from '../SuperInput/SuperInput'
import SuperRadio from '../SuperRadio/SuperRadio'
import SuperRange from '../SuperRange/SuperRange'
import SuperSelect from '../SuperSelect/SuperSelect'
import SuperSort from '../SuperSort/SuperSort'
import { Title } from '../Title/Title'

import s from './Test.module.css'

const arr = [
  { id: 1, value: 'Pre-junior' },
  { id: 2, value: 'Junior' },
  { id: 3, value: 'Junior +' },
]

export const Test = () => {
  const [value, onChangeOption] = useState(0)

  return (
    <div>
      <Title title={'Tests components'} />
      <div className={s.commonContainer}>
        <div className={s.common}>
          <div>Text input</div>
          <SuperInput />
        </div>
        <div className={s.common}>
          <div>Button</div>
          <div>
            <SuperButton style={{ marginRight: '10px' }}>DEFAULT</SuperButton>
            <SuperButton style={{ marginRight: '10px' }} xType={'secondary'}>
              SECONDARY
            </SuperButton>
            <SuperButton style={{ marginRight: '10px' }} xType={'red'}>
              RED
            </SuperButton>
            <SuperButton style={{ marginRight: '10px' }} disabled={true}>
              DISABLED
            </SuperButton>
          </div>
        </div>
        <div className={s.common}>
          <div>Checkbox</div>
          <div>
            <SuperCheckbox />
          </div>
        </div>
        <div className={s.common}>
          <div>Editable span</div>
          <div>
            <SuperEditableSpan />
          </div>
        </div>
        <div className={s.common}>
          <div>Select</div>
          <div>
            <SuperSelect options={arr} value={value} />
          </div>
        </div>
        <div className={s.common}>
          <div>Radio</div>
          <div>
            <SuperRadio options={arr} value={value} />
          </div>
        </div>
        <div className={s.common}>
          <div>Range</div>
          <div>
            <SuperRange />
          </div>
        </div>
        <div className={s.common}>
          <div>Debounce input</div>
          <div>
            <SuperDebouncedInput />
          </div>
        </div>
        <div className={s.common}>
          <div>Pagination</div>
          <div>
            {/*<SuperPagination totalCount={7} page={1} itemsCountForPage={3} id={'1'} onChange={x=>x}/>*/}
          </div>
        </div>
        <div className={s.common}>
          <div>Sort</div>
          <div>
            <SuperSort value={'test sort'} sort={'test'} onChange={x => x} />
          </div>
        </div>
      </div>
    </div>
  )
}
