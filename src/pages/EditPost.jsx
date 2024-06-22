import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  //Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
      })
    }
    else {
      navigate('/');
    }
  }, [slug, navigate])



  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost