import axios from "axios"
import { useState } from "react"

function AddCourse() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState("")
  const [price,setPrice] = useState<string | number>("")
  const submitHandler = async(e  : any)=>{
    e.preventDefault()
     await axios.post(`http://localhost:3000/admin/courses`,{
      title : title,
      description : description,
      price : price,
      imageLink : image,
      published : true,
    },{
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    })
    alert("Added course!")
  }
  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="title" required autoFocus={true} onChange={e=>setTitle(e.target.value)} value={title} />
      <input type="text" placeholder="description" required onChange={e=>setDescription(e.target.value)} value={description} />
      <input type="text" placeholder="add image"  required onChange={e=>setImage(e.target.value)} value={image} />
      <input type="text" placeholder="Price" required onChange={e=>setPrice(e.target.value)} value={price} />
      <button>Submit</button>
    </form>
  )
}

export default AddCourse