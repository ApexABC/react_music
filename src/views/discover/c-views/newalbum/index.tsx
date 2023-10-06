import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Newalbum: FC<IProps> = (props) => {
  return <div>Newalbum</div>
}

Newalbum.displayName = 'Newalbum'
export default memo(Newalbum)
