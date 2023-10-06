import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Artist: FC<IProps> = (props) => {
  return <div>Artist</div>
}

Artist.displayName = 'Artist'
export default memo(Artist)
