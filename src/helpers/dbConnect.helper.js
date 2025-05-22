import { connect } from "mongoose";

const dbConnect = async (url) => {
  try {
   await connect(url);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;