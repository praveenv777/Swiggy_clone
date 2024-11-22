import { useState } from "react"


const Profile = (props)=>{
const [count , setcount]= useState(0);
    return(
        <div>
            <h1>Profile Page</h1>
            <h2>Name:{props.name}</h2>
            <h2>Count: {count}</h2>
            <button onClick={()=>{
                setcount(1)
            }}>Count </button>
        </div>
    )
}

export default Profile;