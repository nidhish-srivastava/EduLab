import { useState,ChangeEvent } from "react"

type FileType = File | undefined

function AddCourse() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [file,setFile] = useState<FileType | any>(undefined)
  const [price,setPrice] = useState("")

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

     await fetch(`http://localhost:3000/admin/courses`,{
      method: "POST",
      body: formData,
      credentials: 'include'
    })
    alert("Added course!")
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="title" required autoFocus={true} onChange={e=>setTitle(e.target.value)} value={title} />
      <input type="text" placeholder="description" required onChange={e=>setDescription(e.target.value)} value={description} />
      <input
        required
        type="file"
        onChange={handleFileChange}
      />
      <input type="text" placeholder="Price" required onChange={e=>setPrice(e.target.value)} value={price} />
      <button>Submit</button>
    </form>
  )
}

export default AddCourse