import { createContext, useContext, useState } from "react";

type CourseContextType = {
  userName: string;
  setuserName: React.Dispatch<React.SetStateAction<string>>;
  cartDocumentId : string
  setCartDocumentId : React.Dispatch<React.SetStateAction<string>>
  cartLength: number
  setCartLength : React.Dispatch<React.SetStateAction<number>>
};

const CourseContext = createContext<CourseContextType | null>(null);

export const useCourseContext = () => useContext(CourseContext);

type CourseContextProvider = {
  children: React.ReactNode;
};

// type courseArrayType = {
//   course : courseType[]
//   setCourse : React.Dispatch<React.SetStateAction<courseArrayType[]>>
// }

export const CourseContextProvider = ({ children }: CourseContextProvider) => {
  const [userName, setuserName] = useState("");
  const [cartDocumentId,setCartDocumentId] = useState("")
  const [cartLength,setCartLength] = useState(0)
  const final = {
    userName,
    setuserName,
    cartDocumentId,
    setCartDocumentId,
    cartLength,
    setCartLength
  };
  return (
    <CourseContext.Provider value={final}>{children}</CourseContext.Provider>
  );
};
