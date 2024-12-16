import styled from '@emotion/styled'
import GenericButton from 'app/components/button'
import React from 'react'

const StyledPager = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  gap: 1rem;
`

export type PagerProps = {
  page: number,
  onPageChange?: (page: number) => void
  totalPages: number | null | undefined
}



export default function Pager({page, totalPages, onPageChange}: PagerProps) {

  
  return (
    <StyledPager>
      <GenericButton onClick={() => onPageChange?.(page - 1)} className='rounded'> {"<"} </GenericButton>
      <div>{page}{!!totalPages ? `/${totalPages}` : ""}</div>
      <GenericButton onClick={() => onPageChange?.(page + 1)} className='rounded'> {">"} </GenericButton>
    </StyledPager>
  )

}


