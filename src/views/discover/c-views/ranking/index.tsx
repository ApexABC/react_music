import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Ranking: FC<IProps> = (props) => {
  return <div>Ranking</div>
}

Ranking.displayName = 'Ranking'
export default memo(Ranking)
