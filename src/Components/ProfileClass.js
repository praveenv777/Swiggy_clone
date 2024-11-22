import {Component} from "react";

class Profile extends Component{ // React.Component OR Component
    constructor(props){
        super(props)
        // CREATE A STATE.....
            this.state={
                count: 0
            }
    console.log("Child-Constructor Called"+this.props.name) 
    }
componentDidMount(){
    // API CALLS
    // SUBSCRIPTIONS
    console.log("Child-ComponentDidMount Called"+this.props.name);
}
    render(){
        const {count} = this.state
        console.log("Child-Render Called"+this.props.name)
        return(
            <div>
            <h1>Profile Class based Component</h1>
            <h2>Name: {this.props.name}</h2>
            <h3>Count:{count}</h3>
            <button onClick={()=>{
                // WE DONT MUTATE THE STATE DIRECTLY..
                this.setState({
                    count:1,
                })
            }}>Set Count</button>
        </div>
        )
        

    }
}

export default Profile;