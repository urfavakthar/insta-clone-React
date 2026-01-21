import React, { useEffect, useState } from 'react'

function Stories() {

  const [Stories ,setStoreis] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3001/story')
    .then(data=> data.json())
    .then(data=> setStoreis(data))
    .catch(err=>console.log(err))
  },[])

  return (
    <div className='story d-flex'>
      {Stories.length>0 ? (
        Stories.map(story=>(
          <div key={story.id}>
            <div className='gradient-border'>
              <img src={story.user.profilePicture} alt="dp" className='story-dp rounded-circle ' />
            </div>
            <small className='text-truncate d-inline-block' style={{width:"80px"}}>{story.user.name}</small>
          </div>
        ))
      ):(
       <p>Loading</p>

      )}

    </div>
  )
}

export default Stories