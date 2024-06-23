import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import service from '../appwrite/config';
import { useSelector } from 'react-redux';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const AllPosts = useSelector((state)=> state.postSl.posts);


  useEffect(() => {
    // service.getPosts()
    //   .then((posts) => {
    //     if (posts) {
    //       console.log(posts);
    //       console.log(posts.documents);
    //       setPosts(posts.documents);
    //     }
    //   })
      
    setPosts(AllPosts);
console.log(posts);
  }, [AllPosts,posts])

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

export default AllPosts