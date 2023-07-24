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
      jobTitle: jobTitle.current?.value,
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
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="First Name*"
          autoFocus={true}
          ref={firstName}
        />
        <input type="text" placeholder="Last Name*" required ref={lastName} />
        <input
          type="email"
          placeholder="Work Email*"
          required
          ref={workEmail}
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          required
          ref={mobileNumber}
        />
        <input
          type="text"
          placeholder="Company Name*"
          required
          ref={companyName}
        />
        <input type="text" placeholder="Job Title*" required ref={jobTitle} />
        <select value={jobLevel} onChange={(e) => setJobLevel(e.target.value)}>
          <option value="" disabled selected>
            Job Level*
          </option>
          {JobTitle?.map((e: string, i) => (
            <option key={i} value={i}>
              {e}
            </option>
          ))}
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="" disabled selected>
            Choose Country*
          </option>
          {countriesList?.map((e: string, i) => (
            <option key={i} value={i}>
              {e}
            </option>
          ))}
        </select>
        <select
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
        >
          <option value="" disabled selected>
            Company Size*
          </option>
          {CompanySize.map((e: string, i) => (
            <option value={i}>{e}</option>
          ))}
        </select>
        <button>Get in Touch</button>
      </form>
    </div>
  );
}

export default BusinessForm;
