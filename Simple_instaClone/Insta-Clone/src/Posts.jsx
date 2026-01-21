import React, {useEffect, useState} from 'react'

function Posts() {
    
  const [posts, setPosts] = useState([])

  useEffect(()=>{

    fetch('http://localhost:3001/posts')
    .then((data)=>data.json())
    .then((data=>setPosts(data)))
    .catch(err=>console.log(err))
  },[])


  return (
    <div className="d-flex justify-content-center ">
      {posts.length>0?(
        <div className="mx-auto" style={{ maxWidth: "600px", margin:"30px" }}>
          {posts.map((post)=>(
            <div className='my-4' key={post.id}>
               <div className='d-flex'>
                <img className='dp rounded-circle' src={post.user.profilePicture} alt="Profile-Pic" />
                <h5>{post.user.name}</h5>
               </div>
                  
                {post.type === 'reel' ? (
                //single video
                 <video className="media" src={post.media[0]} controls />
              ) : post.type === 'carousel' ? (
                // If carousel, map through media array
                <div className="carousel">
                  {post.media.map((mediaItem, index) => (
                    <img key={index} className="media" src={mediaItem} alt={`Post media ${index + 1}`} />
                  ))}
                </div>
              ) : (
                //single image post
                <img className="media" src={post.media[0]} alt="Post media" />
              )}
                 <div>
                  <i className="bi bi-heart m-1" ></i>
                  <i className="bi bi-chat m-1"></i>
                  <i className="bi bi-send m-1"></i>
                  <i className="bi bi-bookmark m-1"></i>
                 </div>
                
                <div>
                 <b> {post.likes} Likes</b>
                </div>
                <p>{post.caption}</p>
                
                <div className='blue'>{post.hashtags}</div>
              </div>
              
          ))}
        </div>
      ):(
        <div>
          Loading Posts
        </div>
      )}
    </div>
  )
}

export default Posts



