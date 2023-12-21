import React from 'react'

const Image = ({data}) => {
  return (
    <div className='image-target'>
      <a href={data.urls.regular} target="_blank" rel="noreferrer">
          <img className="images" src={data.urls.small} alt={data.alt_description} />
      </a>
    </div>
  )
}

export default Image
