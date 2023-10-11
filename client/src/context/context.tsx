import { createContext, useContext, useState } from "react";

type CourseContextType = {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
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
  const [userEmail, setUserEmail] = useState("");

  const final = {
    userEmail,
    setUserEmail,
  };
  return (
    <CourseContext.Provider value={final}>{children}</CourseContext.Provider>
  );
};
