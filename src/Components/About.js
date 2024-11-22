import ProfileClass from './ProfileClass';
import {Component} from "react";
class About extends Component{
  constructor(props){
    super(props)
    console.log("Constructor is Called");
  }
componentDidMount(){
  // this componentDidMount used to for API Call because it is called after intial render
  console.log("ComponentDidMount");
}
  render(){
    console.log("render");
    return(
      <div className="about-container">
    <div className="about-left">
      <h1>
        Welcome to <br /> The world of <br />{" "}
        <span>Tasty & Fresh Food</span>
      </h1>
      <h4>
        "Better you will feel if you eat a Food<span>Fire</span> healthy
        meal"
      </h4>
    </div>
    <div className="about-right">
      
    </div>
    <div>
      <ProfileClass name= {"First"}/>
      <ProfileClass name= {"Second"}/>
    </div>
  </div>
    )
  }
}

export default About;