import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = (props) => {
  return <div>Player</div>
}

Player.displayName = 'Player'
export default memo(Player)
