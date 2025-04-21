//166 ***important

const { default: NewPost } = require("./containers/Blog/NewPost/NewPost")


//update state from within componentDidUpdate causes infinite loop
//calling setState runs componentDidUpdate again
componentDidUpdate() {
    if(this.props.id) {
        axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
        .then(response => {
            this.setState({loadedPost: response.data})
        });
    }
}

componentDidUpdate() {
    if(this.props.id) {
        if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                });
            }
    }
}

//171 axios interceptors useful for setting authorization headers, log responses, handle errors globally

//react-router-dom
//react-router-dom  is required for web development. It wraps react-router and therefore uses it as a dependency

//192 preparing project for routing
<Route exact></Route>

//multiple on same page
//on /, both will be shown'
//on /new-post, only home 2 is shown
<Route path="/" exact render={() => <h1>Home</h1>} />
<Route path="/" render={() => <h1>Home 2</h1>} />

//193 
//Link prevent default and handle the click

//194
NewPost.js
componentDidMount() {
    console.log(this.props);
}
//there are history, location, match in this.props

//195
//So that child components also have history, location and match
import { withRouter } from 'react-router-dom';
export default withRouter(post);

//196
pathname: '/new-post', //absolute
pathname: this.props.match.url + '/new-post' //relative

//197
//for below, when click New Post, both are orange
//the paths "/" and "/new-post" are treated as prefixes
<NavLink to="/">Home</NavLink>
<NavLink to={{
    pathname: '/new-post',
    hash: '#submit',
    search: '?quick-submit=true'
}}>New Post</NavLink>

//full path have to "/" for active class
<NavLink to="/" exact>Home</NavLink>

<NavLink to="/" exact activeClassName="my-active-class-name" activeStyle={{}}>Home</NavLink>

//203 ***important
//FullPost.js change componentDidUpdate to componentDidMount
//not updating the component, it's being added or removed from the DOM

//204 parse query parameters
<Link to="/my-path?start=5">Go to Start</Link>
const query = new URLSearchParams(this.props.location.search);
for (let param of query.entries()) {
    console.log(param); // yields ['start', '5']
}

<Link to="/my-path#start-position">Go to Start</Link> 
props.location.hash

//205
//load only one
<Switch

//206 navigate programmatically
postSelectedHandler = (id) => {
    this.props.history.push({pathname: "/" + id})
}

//208 ***important
//Blog.js
<Route path="/" exact component={Posts} />
<Route path="/new-post" exact component={NewPost} />
//within Posts.js, there is <Route path="/:id" exact component={FullPost} />
//for /2, it does not match <Route path="/" exact component={Posts} /> and child component not rendered

//one way is put /new-post above and remove exact
<Route path="/new-post" exact component={NewPost} />
<Route path="/"  component={Posts} />

///good practice, if /posts change to /allposts/ things still work
<Route path={this.props.match.url+"/:id"} exact component={FullPost} />

//209 ***important
//click different posts does not load correct post
//when loading component which is open, componentDidMount is not executed
//for first time component is rendered
componentDidMount() {
    //console.log(this.props);
    this.loadData();
}
//if component is loaded through routing, routing does not unmount old and mount again
//routing will change route parameter and code has to react to it
componentDidUpdate() {
    this.loadData();
}

this.state.loadedPost.id != this.props.match.params.id
//this.state.loadedPost.id is number while this.props.match.params.id is string

//210
redirect / to /posts
<Redirect from="/" to="/posts" />

//211
let redirect= null;
if(this.state.submitted) {
    redirect = <Redirect to="/posts" />;
}

//212
//this.props.history.push('/posts');
//push on to stack, when click back, it goes back to new post page

//redirect and this.props.history.replace('/posts'); replaces current page
//when click back, it does not go back to new post page

//213
//guard used when don't know whether user is authenticated
//allow parts to be visited only when user is authenticated

{this.state.auth ? <Route path="/new-post" exact component={NewPost} /> : null }

//214
//put at bottom
<Route render={() => <h1>Not Found</h1>}/>

//215 lazy load routes
const AsyncNewPost = asyncComponent(() => {
    //dynamic import syntax, content within () is imported only when function () => {} is executed
    //and the function is executed when AsyncNewPost is rendered 
    return import('./NewPost/NewPost');
});

//216
react 16.6 adds lazy method
const Posts = React.lazy(() => {
    //default exports, named exports not supported 
    return import('./containers/Posts');
});

//217
//configure server to forward all requests including non-existent route to index.html
<BrowserRouter basename="/my-app"></BrowserRouter>