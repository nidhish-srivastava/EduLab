import axios from "axios";
import { useRef, useState } from "react";
function Business() {
  const JobTitle = [
    "C-Level",
    "VP",
    "Director",
    "Manager",
    "Individual Contributor",
  ];
  const CompanySize = [
    "I am a contractor",
    "1-199",
    "200-999",
    "1000-5000",
    "5000+",
  ];
  const countriesList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
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
    const response = await axios.post(`http://localhost:3000`,formData)
    console.log(response.data);
    alert("Form submitted");
  };
  return (
    <>
      <div>
        <h2>Get your demo</h2>
        <p>
          See why leading organizations choose EduLab Business as their
          destination for employee learning.
          <br />
          <br />
          <b>In your demo, learn more about:</b>
          <br />
          Unlimited access to 22,000+ top courses selected from EduLab.com –
          anytime, on any device Fresh content taught by global instructors –
          for any learning style Actionable learning insights and admin
          functionality
        </p>
      </div>
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
    </>
  );
}

export default Business;
