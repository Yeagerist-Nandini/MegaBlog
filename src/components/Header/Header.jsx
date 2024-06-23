import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Container, LogoutBtn } from '../index';
import { Logo } from '../index';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            url: "/",
            active: true
        },
        {
            name: "Login",
            url: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            url: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            url: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            url: "/add-post",
            active: authStatus
        },
    ]

    return (
        <header className='py-3 shadow bg-black bg-opacity-90'>
            <Container>
                <nav className='flex items-center'>
                    <div className='mr-4'>
                        <Link to="/"> <Logo /> </Link>
                    </div>

                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        className='px-6 py-2 text-white hover:bg-white hover:text-black rounded-full inline-block'
                                        onClick={() => navigate(item.url)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li> <LogoutBtn /> </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header

