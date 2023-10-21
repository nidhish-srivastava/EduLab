import { Request, Response } from "express";
import { Cart } from "../mongodb/model";

export const cartCheck = async(req:Request,res:Response)=>{
  try {
    const {username} = req.params
    const response = await Cart.findOne({username : username})
    res.json(response)
  } catch (error) {
    
  }
}

export const checkCourseInCart = async(req:Request,res:Response) =>{
  const {courseId,username} = req.params
  const response = await Cart.findOne({username : username})
  const data = response?.courses.find(e=>e.course==courseId)
  if(data == undefined) res.json(false)
  else res.json(true)
}

export const purchase = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { username } = req.body;
  try {
  let cart = await Cart.findOne({ username: username });
  if (cart == null) {
    // If the cart doesn't exist, create a new one
    cart = new Cart({
      username: username,
      courses: [{ course: courseId }],
    });
  }
   else {
  const courseInCart = cart.courses.find(
    (item) => item.course.toString() === courseId
  );
  if (courseInCart?.course.toString().length ?? 0 >1) {
    res.status(400).json({ msg: "Course already inside cart" });
    return; //* if we dont return then it will show error coz of the save method after the if else construct
  }
  cart.courses.push({ course: courseId }); // We push the course inside the array when the course is new
  }
  try {
    await cart.save()
    res.json({msg : "Item added to cart"})
  } catch (error) {
      console.log(error);
      res.status(500).json({msg : "Server error"})
  }
}
   catch (error) {
    res.status(401).json("Login to Continue");
  }
};

export const remove = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { cartDocumentId } = req.body;
  try {
    await Cart.updateOne(
      { _id: cartDocumentId },
      { $pull: { courses: { course: courseId } } }
    );
    res.send(`Deleted successfully`)
  } catch (error) {
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  const { username } = req.params;
  const cart = await Cart.findOne({ user: username }).populate(
    "courses.course"
  );
  // Extract cartItems from the cart and send the response
  const cartItems = cart?.courses.map((item) => item.course);
  res.json({ cartItems, cart });
};
