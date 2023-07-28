import { createContext, useContext, useState } from "react";
import { courseType } from "../components/CreatingCourses/MyCourses";

type CourseContextType = {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  course: courseType | null;
  setCourse: React.Dispatch<React.SetStateAction<courseType | null>>;
  userId : number
  setUserId : React.Dispatch<React.SetStateAction<number>>
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
  const [course, setCourse] = useState<courseType | null>(null);
  const [userId, setUserId] = useState<number>(0);
  const final = {
    userEmail,
    setUserEmail,
    course,
    setCourse,
    userId,
    setUserId,
  };
  return (
    <CourseContext.Provider value={final}>{children}</CourseContext.Provider>
  );
};
