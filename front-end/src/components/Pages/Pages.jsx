import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import Users from './Users/Users'
import Teams from './Teams/Teams';
import Admin from './Admin/Admin';

const pages = [

    { path: '/', element: <HomePage/> , naming: 'home'},
    // { path: '/projects', element: <Projects/>, naming: 'projects', sub: []},
    { path: '/users', element: <Users/> , naming: 'users'},
    { path: '/teams', element: <Teams/>, naming: 'teams'},
    { path: '/login', element: <Login/> , naming: 'login'},
    {path: '/admin', element: <Admin/>, naming: 'admin'}
]

export default pages;



