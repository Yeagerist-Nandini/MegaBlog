import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import service from './appwrite/config';
import { Posts } from './store/postSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData); 

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
          console.log(userData)
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))  
      //finally always runs whether an error occurs or not 

      service.getPosts().then((posts)=> dispatch(Posts(posts.documents)));
      console.log('3434')
  }, [])

  console.log(user)

  return  !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
