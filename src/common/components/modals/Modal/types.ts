import { InferValueTypes } from '../../../../app/types'

import * as actions from './actions'

export type ModalActionsType = ReturnType<InferValueTypes<typeof actions>>
