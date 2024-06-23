import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { Posts } from '../store/postSlice';

function Home() {
  const [posts,setPosts] = useState([]);
  const authStatus = useSelector((state)=> state.auth.status);
  // const dispatch = useDispatch();

  const AllPosts = useSelector((state)=> state.postSl.posts);


  useEffect(() => {
    // service.getPosts()
    //   .then((posts) => {
    //     if (posts) {
    //       console.log(posts.documents);
    //       setPosts(posts.documents);
    //     }
    //   })
      
  
    setPosts(AllPosts);
    console.log(posts)

  }, [AllPosts])


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
    <div className='w-full m-6 p-4'>
      <Container>
        <div className='flex flex-wrap justify-between'>
          {posts.map((post) => (
            <div key={post.$id} className='flex flex-grow-0 flex-shrink w-1/4 items-stretch h-60'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home