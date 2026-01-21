import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ViewsStory() {
  const { id } = useParams()
  const [story, setStory] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/story/${id}`)
      .then(res => res.json())
      .then(data => setStory(data))
      .catch(err => console.log(err))
  }, [id])

  return (
    <div>
      {story ? (
        <div>
         {story.type === 'reel' ? (
      <video
        className="media"
        src={story.media[0]}
        controls
     />
) : (
      <img
        className="media"
        src={story.media[0]}
         alt="Story media"
     />
)}

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default ViewsStory
