import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Songlist: FC<IProps> = (props) => {
  return <div>Songlist</div>
}

Songlist.displayName = 'Songlist'
export default memo(Songlist)
