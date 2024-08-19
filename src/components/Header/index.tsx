import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../utill/firebase";
import { setUser } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-20 bg-blue-600 flex justify-between p-5">
      <div className="w-auto">
        <p className="text-white text-center font-bold text-3xl">
          Project Management
        </p>
      </div>
      <div className="w-auto flex justify-around">
        <span
          className="text-white font-bold text-2xl cursor-pointer"
          onClick={async () => {
            try {
              await signOut(auth);
              dispatch(setUser(null));
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <LogoutIcon />
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Header;
