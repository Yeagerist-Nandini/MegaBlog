import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import service from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts()
      .then((posts) => {
        if (posts) {
          console.log(posts);
          console.log(posts.documents);
          setPosts(posts.documents);
        }
      })

  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts