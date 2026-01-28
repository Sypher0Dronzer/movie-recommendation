import React from 'react'
import SearchInput from './SearchInput'

const Header = () => {
  return (
    <div className=' px-4 py-4 flex flex-col items-center sticky top-0 z-50'>
      <SearchInput/>
    </div>
  )
}

export default Header
