import {useState} from 'react'
import {useEffect} from 'react'
import { useCourseContext } from "../../context/context"
import { courseType } from "../CreatingCourses/MyCourses"
import { baseUrl } from '../../utils'

export const removeFromCartPromise = async(courseId : number | undefined,username : string | undefined,cartDocumentId : string) =>{
  return await fetch(`${baseUrl}/cart/${courseId}`,{
    body : JSON.stringify({
      username : username,
      cartDocumentId : cartDocumentId
    }),
    headers : {
      "Content-type" : "application/json",
      Authorization : "Bearer " + localStorage.getItem("token")
    },
    method : "DELETE"
  })
}

function Cart() {
    const [cartItemsArray,setCartItemsArray] = useState([])
    const [cartDocumentId,setCartDocumentId] = useState("")
    const final = useCourseContext()
    
    const sum = cartItemsArray.reduce((acc,iti : courseType)=>{
       return acc + Number(iti.price)
     },0)

     const fetchCartItems = async():Promise<any> =>{
      const response = await fetch(`${baseUrl}/cart/${final?.userName}`)
      return response.json()
     }
     
     const removeCartItem = async(courseId : number | undefined) =>{
       try {
        const response = await removeFromCartPromise(courseId,final?.userName,cartDocumentId)
        if(response.status==200){
          window.location.reload()
        }
      } catch (error) {
        
      }
    }
    
    useEffect(()=>{
      const fetchCartItemsHandler = async() =>{
          const data = await fetchCartItems()
          setCartItemsArray(data.cartItems)
          setCartDocumentId(data.cart._id)
      }
      fetchCartItemsHandler()
    },[])
    
  return (
    <main className="cart-items-container">
      <h2 style={{fontFamily : "Montserrat,sans-serif"}}>Total Bill : &#8377;{sum} </h2>
        {cartItemsArray.map((e : courseType)=>(
          <div className="cart-item-card">
            <div className="left">
              <img src={e?.imageLink} loading="lazy" alt="" />
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
        {/* <button className='payment-proceed-btn'>
        <a href={`/payment`} >
          Proceed to payment
        </a>
          </button> */}
    </main>
  )
}

export default Cart