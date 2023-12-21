import React from 'react'

const Skeleton = ({item}) => {
  return [...Array(item).keys()].map(()=>(
        <div className="parent">
          <div className='child'></div>
        </div>  
  ))
}

export default Skeleton
