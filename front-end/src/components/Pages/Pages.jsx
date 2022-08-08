import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import Projects from './Projects/Projects';
import Chat from './Chat/Chat';
import Users from './Users/Users'
import Teams from './Teams/Teams';

const pages = [
    { path: '/', element: <HomePage/> , naming: 'home', sub: null },
    { path: '/login', element: <Login/> , naming: 'login', sub: null },
    { path: '/projects', element: <Projects/>, naming: 'projects', sub: []},
    { path: '/chats', element: <Chat/>, naming: 'chats', sub: []},
    { path: '/users', element: <Users/> , naming: 'users', sub: []},
    { path: '/teams', element: <Teams/>, naming: 'teams', sub: []},
]

export default pages;

