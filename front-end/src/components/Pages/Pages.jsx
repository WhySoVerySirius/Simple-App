import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import Projects from './Projects/Projects';
import Chat from './Chat/Chat';
import Users from './Users/Users'
import Teams from './Teams/Teams';

const pages = [
    { path: '/', element: <HomePage/> , naming: 'Home', sub: null },
    { path: '/login', element: <Login/> , naming: 'Login', sub: null },
    { path: '/projects', element: <Projects/>, naming: 'Projects', sub: []},
    { path: '/chats', element: <Chat/>, naming: 'Chats', sub: []},
    { path: '/users', element: <Users/> , naming: 'Users', sub: []},
    { path: '/teams', element: <Teams/>, naming: 'Teams', sub: []},
]

export default pages;