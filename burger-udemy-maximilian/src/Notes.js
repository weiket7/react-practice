class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }

    //this is same as above
    state = {


//134 BuildControl.js
// <button className={classes.Less} 
//             onClick={props.removed} 
//             disabled={props.disabled}
//         >Less</button>
//onClick={props.removed}
//pass ref to removed prop which holds ref to the method to execute
//when button is clicked, that method is executed
    
//136 ***important
//add one ingredient, Order Now is still disabled
//in addIngredientHander, due to the way setState works, in updatePurchaseState
//this.state.ingredients might not have latest state

//138 ***important
//below does not work when using this keyword if method is triggered through event
//this keyword does not refer to the class
//this is not the case for removeIngredientHandler which works becos it's a property assigned arrow functions
//take advantage of arrow functions which contain the state or context of 'this'
// purchaseHandler() {
//     this.setState({purchasing: true});
// }

//below ensure this refer to the class and not something else
purchaseHandler = () => {
    this.setState({purchasing: true});
}

//148
//NavigationItem.module.css
//Media queries merged into normal css so no need to re-declare box-sizing: border-box; display: block; 

//149
//Convert layout to component

//150
//hold reference to the method which should get executed on click
<div onClick={props.clicked}>Menu</div>

// sideDrawerToggleHandler = () => {
//     //due to async nature of setState, may have unexpected outcome
//     this.setState({showSideDrawer: !this.state.showSideDrawer})
// }

sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
        return { showSideDrawer: !this.state.showSideDrawer };
    });
}

//don't execute the method
<Toolbar clicked={this.sideDrawerToggleHandler()}/>
//just pass reference
<Toolbar clicked={this.sideDrawerToggleHandler}/>


//154 improve performance
//OrderSummary whenever ingredient or price change it will be re-rendered
//can enhance such that only when modal is shown, then OrderSummary re-render
//turn OrderSummary to class component so that can add lifecyle hook

//wrapping element controls updating of wrapped element
//OrderSummary is not updated becos wrapping element Modal has shouldComponentUpdate

//155
//componentDidMount and componentDidUpdate are useful for causing side effects like http requests

//182
//https://projects.lukehaas.me/css-loaders/

//184 ***important
//withErrorHandler componentDidMount sets up axios.interceptors
//BurgerBuilder uses componentDidMount also for axios.get
//if axios.get has error, spinner is shown and error modal is not shown
//becos withErrorHandler componentDidMount runs after child component BurgerBuilder componentDidMount runs

//one way to fix is withHandlerHandler use componentWillMount
//however, this lifecycle hook will not be supported in future
//constructor is the same as the code will be executed when the component is created

//185 remove old interceptors
//when BurgerBuilder is no longer needed, remove old interceptors
        //for useEffect, it would be in return        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

//223
//BurgerBuilder loaded through route will have route props
//Burger component will not have it

//284
//middleware are functions hooked into a process and executed without stopping the process
//eg logging something

//367
//Deploying on firebase
//wei_ket@hotmail.com