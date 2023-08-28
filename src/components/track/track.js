import React from 'react'

function Track({ id, title, author, btnIcon, handleSong }) {

    const handleClickSong = (e) => {
        console.log(e.target.parentNode.id)
        handleSong(e.target.parentNode.id)
    }
  return (
    <div id={id} className='track'>
        <h4>{title}</h4>
        <p>{author}</p>
        <button onClick={handleClickSong}>{btnIcon}</button>
    </div>
  )
}

export default Track