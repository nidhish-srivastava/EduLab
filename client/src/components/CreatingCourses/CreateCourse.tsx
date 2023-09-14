import { useState } from "react";
import { useCourseContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
// import { categoryArray } from "../../utils";
import { courseType } from "./MyCourses";
import Compress from "react-image-file-resizer";
import { base64 } from "../../base64";

// type categoriesArrayType = {
//   category: string;
//   subCategory: string[];
// }[];

function CreateCourse() {
  const navigate = useNavigate();
  const final = useCourseContext();
  const [image, setImage] = useState(base64);
  const [formData, setFormData] = useState<courseType>({
    title: "",
    description: "",
    price: "",
    author: final?.userEmail,
    imageLink: image,
  });
  // const [category, setCategory] = useState(0);
  // const categories: categoriesArrayType = categoryArray;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //* !!!  Logic for base64 image conversion so that we can preview it as well
  const handleImage = () => {
    // create a file input dynamically
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // define a onChange image to read and show the file
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // onFileResize()

          //* Below it the functionality of on FileResize function which we trigger if we choose a file using input type equals file
          Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (uri: any) => {
              // You upload logic goes here
              // console.log("uri", uri);
              // setFormData(prev=>({...prev,imageLink: uri}))
              setImage(uri);
            },
            "base64" // blob or base64 default base64
          );
        };
        reader.readAsDataURL(file);
      }
    };
    // simulate a click
    fileInput.click();
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/admin`, {
      body : JSON.stringify(formData),
      method : "POST",
      credentials : "include",
      headers : {
        "Content-Type" : "application/json"
      }
    });
    console.log(res);
  };

  return (
    <form onSubmit={submitHandler} className="update-container">
      <input
        type="text"
        placeholder="Give a Title"
        required
        autoFocus={true}
        name="title"
        onChange={handleChange}
        value={formData.title}
      />
      <textarea
        rows={3}
        cols={50}
        name="describe"
        placeholder="Describe your Course"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Set price"
        required
        name="price"
        onChange={handleChange}
        value={formData.price}
      />

      <div onClick={handleImage} className="image-wrapper-course-creation">
        <img src={image} alt="" />
      </div>

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
  );
}

export default CreateCourse;
