import { useState,ChangeEvent } from "react"
import { useCourseContext } from "../../context/context"
import { useNavigate } from "react-router-dom"

type FileType = File | undefined

type categoriesArrayType = {
    category : string
    subCategory : string[]
}[]

function CreateCourse() {
  const navigate = useNavigate()
  const final = useCourseContext()
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [file,setFile] = useState<FileType | any>(undefined)
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState(0)
  const categories : categoriesArrayType = [
    {
      category : "Development",subCategory : ["Web Development","Data Science","Mobile Development","Game Developpment"]
    },{
      category : "Business",subCategory : ["Entreprenurship","Communication","Management","Sales","Business Strategy"]
    },{
      category : "Photography & Video",subCategory : ["Digital Photography","Potrait Photography","Video Design","Photography Tools"]
    },
    {
      category : "Engineering",subCategory : ["Engineering","Humanities","Math","Science","Sociol Science"]
    }
  ]

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  const submitHandler = async(e  : any)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.set("title",title)
    formData.set("description",description)
    formData.set("file",file)
    formData.set("price",price)
    formData.set("author",String(final?.userEmail))

     await fetch(`http://localhost:3000/admin/create-course`,{
      method: "POST",
      body: formData,
      credentials: 'include'
    })
    alert("Course Created!")
    navigate('/')
  }

  return (
    <form onSubmit={submitHandler} className="update-container">
      <input type="text" placeholder="Give a Title" required autoFocus={true} onChange={e=>setTitle(e.target.value)} value={title} />
      <textarea rows={3} cols={50} placeholder="Describe your Course" required onChange={e=>setDescription(e.target.value)} value={description} />
      <input  type="text" placeholder="Set price" required onChange={e=>setPrice(e.target.value)} value={price} />
      <input
        required
        type="file"
        onChange={handleFileChange}
      />
      {/* <div className="dropdown-row">
        <label htmlFor="">Choose Category : </label>
      <select value={category} onChange={e=>setCategory(+e.target.value)} >
        {categories.map((e,i)=>(
          <option value={i}>{e.category}</option>
        ))}
      </select>
      <select>
        {
          categories[category].subCategory.map(e=>{
            return(
              <option>{e}</option>
              )
            })
          }
      </select>
          </div> */}
      <button>Submit</button>
    </form>
  )
}

export default CreateCourse