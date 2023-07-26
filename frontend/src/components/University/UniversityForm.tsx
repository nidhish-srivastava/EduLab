import { useRef, useState } from "react";
import axios from "axios";
import { countriesList,JobTitleUniversity,Department } from "../../utils";

type UniversityFormProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  };

function UniversityForm({setShow} : UniversityFormProps ) {
    const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const workEmail = useRef<HTMLInputElement>(null);
  const mobileNumber = useRef<HTMLInputElement>(null);
  const institutionName = useRef<HTMLInputElement>(null);
  const [jobLevel, setJobLevel] = useState("");
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    // Collect form data from the ref elements
    const formData = {
      firstName: firstName.current?.value,
      lastName: lastName.current?.value,
      workEmail: workEmail.current?.value,
      mobileNumber: mobileNumber.current?.value,
      institutionName: institutionName.current?.value,
      jobLevel,
      country,
      department
    };
    const response = await axios.post(
      `http://localhost:3000/university`,
      formData
    );
    console.log(response.data);
    alert("Form submitted");
    setShow(true)
  };
  return (
    <div>
        <form onSubmit={submitHandler} className="form-container-business" >
        <label htmlFor="">FirstName
        </label>
        <input
          type="text"
          placeholder="First Name*"
          autoFocus={true}
          ref={firstName}
          />
            <label htmlFor="">Last Name</label>
        <input type="text" placeholder="Last Name*" required ref={lastName} />
            <label htmlFor="">Work Email</label>
        <input
          type="email"
          placeholder="Work Email*"
          required
          ref={workEmail}
        />
         <label htmlFor="">Mobile Number</label>          
        <input
          type="tel"
          placeholder="Mobile Number"
          required
          ref={mobileNumber}
        />
        <label htmlFor="">Institution Name</label>
        <input
          type="text"
          placeholder="Institution Name*"
          required
          ref={institutionName}
        />
        <label htmlFor="">Job Title</label>
        <select value={jobLevel} onChange={(e) => setJobLevel(e.target.value)}>
          <option value="" disabled selected>
            Job Level*
          </option>
          {JobTitleUniversity?.map((e: string, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
        <label htmlFor="">Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="" disabled selected>
            Choose Country*
          </option>
          {countriesList?.map((e: string, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
        <label htmlFor="">Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="" disabled selected>
            Select*
          </option>
          {Department.map((e: string) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        <button>Get in Touch</button>
      </form>
    </div>
  )
}

export default UniversityForm