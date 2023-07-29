import axios from "axios"
import {useState} from 'react'
import {useEffect} from 'react'
import { useCourseContext } from "../../../context/context"
import { courseType } from "../../CreatingCourses/MyCourses"


function Cart() {
    const [cartItemsArray,setCartItemsArray] = useState([])
    const final = useCourseContext()
    const fetchCartItems = async() =>{
        const response = await axios.get(`http://localhost:3000/cart/${final?.userEmail}`)
        console.log(response.data);
        setCartItemsArray(response.data)
    }
    useEffect(()=>{
      fetchCartItems()
    },[])
  return (
    <main className="cart-items-container">
        {cartItemsArray.map((e : courseType)=>(
          <div className="cart-item-card">
            <div className="left">
              <img src={`http://localhost:3000/${e?.imageLink}`} alt="" />
            </div>
            <div className="right">
              <div>
              <h2>{e?.title}
              </h2>
              <span style={{color : "green"}} >{e.author}</span>
              </div>
              <h3>{e.price}</h3>
            </div>
          </div>
        ))}
    </main>
  )
}

export default Cart