import { useState } from "react";
const TextField = () => {
    const[val,setVal] = useState("");
    const click = () =>{
        console.log(val)
    }
    const change = event => {
        setVal(event.target.value)
    }
    return ( 
        <div>
            <input type="text" onChange={change} value={val}></input>
        </div>
     );
}
 
export default TextField;