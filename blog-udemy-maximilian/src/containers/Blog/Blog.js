import React, { Component, Suspense } from 'react';
import './Blog.css'
import Posts from './Posts/Posts'
//import NewPost from './NewPost/NewPost'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

const NewPost = React.lazy(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/posts" exact 
                                    activeStyle={{color: '#fa923f', textDecoration: 'underline'}}
                                    activeClassName="active">
                                Posts
                                </NavLink>
                                </li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" exact
                        render={() => 
                            <Suspense fallback={<div>Loading...</div>}><NewPost /></Suspense>}
                    />
                    <Route path="/posts"  component={Posts} />
                    <Route render={() => <h1>Not Found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;