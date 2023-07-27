import axios from "axios";
import { useRef, useState } from "react";
import { JobTitle, CompanySize, countriesList } from "../../utils";

type BusinessFormProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function BusinessForm({ setShow }: BusinessFormProps) {
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const workEmail = useRef<HTMLInputElement>(null);
  const mobileNumber = useRef<HTMLInputElement>(null);
  const companyName = useRef<HTMLInputElement>(null);
  const jobTitle = useRef<HTMLInputElement>(null);
  const [jobLevel, setJobLevel] = useState("");
  const [country, setCountry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const submitHandler = async (e: any) => {
    e.preventDefault();
    // Collect form data from the ref elements
    const formData = {
      firstName: firstName.current?.value,
      lastName: lastName.current?.value,
      workEmail: workEmail.current?.value,
      mobileNumber: mobileNumber.current?.value,
      companyName: companyName.current?.value,
      jobLevel,
      country,
      companySize,
    };
    const response = await axios.post(
      `http://localhost:3000/business`,
      formData
    );
    console.log(response.data);
    alert("Form submitted");
    setShow(true);
  };
  return (
    <>
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
        <label htmlFor="">Company Name</label>
        <input
          type="text"
          placeholder="Company Name*"
          required
          ref={companyName}
        />
        <label>Job Title</label>
        <input type="text" placeholder="Job Title*" required ref={jobTitle} />
        <label htmlFor="">Job Level</label>
        <select value={jobLevel} onChange={(e) => setJobLevel(e.target.value)}>
          <option value="" disabled selected>
            Job Level*
          </option>
          {JobTitle?.map((e: string, i) => (
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
        <label htmlFor="">CompanySize</label>
        <select
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
        >
          <option value="" disabled selected>
            Company Size*
          </option>
          {CompanySize.map((e: string, i) => (
            <option value={e} key={i} >{e}</option>
          ))}
        </select>
        <button>Get in Touch</button>
      </form>
    </>
  );
}

export default BusinessForm;
