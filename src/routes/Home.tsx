import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  if (!user) {
    return <Navigate to={"signin"} />;
  }
  return <>Home</>;
};

export default Home;
