import axios from "axios"
import {useState} from 'react'
import {useEffect} from 'react'
import { useCourseContext } from "../../context/context"
import { courseType } from "../CreatingCourses/MyCourses"

function Cart() {
    const [cartItemsArray,setCartItemsArray] = useState([])
    const [cartDocument,setCartDocument] = useState("")
    const final = useCourseContext()
    const [render,setRender] = useState(false)

    const fetchCartItems = async() =>{
        const response = await axios.get(`http://localhost:3000/cart/${final?.userEmail}`)
        console.log(response.data);
        setCartItemsArray(response.data.cartItems)
        setCartDocument(response.data.cart._id)
        final?.setCartQuantity(response.data.cartItems.length)
    }
    const sum = cartItemsArray.reduce((acc,iti : courseType)=>{
      return acc + iti.price
    },0)

    const removeCartItem = async(courseId : number | undefined) =>{
      await axios.post(`http://localhost:3000/cart/purchase/delete/${courseId}`,{
        username : final?.userEmail,
        cartDocumentId : cartDocument
      })
      setRender(e=>!e)
    }

    useEffect(()=>{
      fetchCartItems()
    },[render])
  return (
    <main className="cart-items-container">
      <h2 style={{fontFamily : "Montserrat,sans-serif"}}>Total Bill : &#8377;{sum} </h2>
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
              <h3>&#8377;{e.price}</h3>
            </div>
            <span className="remove-course" onClick={()=>removeCartItem(e?._id)}>
              <i className="fa fa-trash" ></i>
            </span>
          </div>
        ))}
    </main>
  )
}

export default Cart