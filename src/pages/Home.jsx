import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state)=> state.auth.status);

  useEffect(() => {
    service.getPosts().then((posts) => {
      // console.log(posts.documents)
      if (posts) setPosts(posts.documents);
    })
  }, [])

  if(authStatus == false){
    return (
      <div className='w-full py-8'>
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  else if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Posts Yet!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div>
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

export default Home