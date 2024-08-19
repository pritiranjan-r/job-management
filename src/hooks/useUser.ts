import { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoading, setUser } from "../slices/authSlice";
const useUser = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const auth = getAuth();
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const { displayName, uid, email } = user;
        dispatch(setLoading(false));
        dispatch(
          setUser({ displayName: displayName ?? "", uid, email: email ?? "" })
        );
        // ...
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  return { user, userloading: loading };
};

export default useUser;
