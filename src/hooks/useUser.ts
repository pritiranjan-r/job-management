import { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoading, setUser } from "../slices/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../util/firebase";
import { FirebaseError } from "firebase/app";

const useUser = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const getUserInfo = async (user: User) => {
    try {
      const { displayName, uid, email } = user;

      const userDoc = doc(db, "user_info", user.uid);
      const userInfoSnapshot = await getDoc(userDoc);
      const userInfo = userInfoSnapshot.data() as { role: string; uid: string };
      console.log(userInfo);
      dispatch(setLoading(false));
      dispatch(
        setUser({
          displayName: displayName ?? "",
          uid,
          email: email ?? "",
          role: userInfo?.role,
        })
      );
    } catch (err) {
      const firebaseError = err as FirebaseError;
      console.log(firebaseError.message);
      dispatch(setLoading(false));
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    const auth = getAuth();
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        getUserInfo(user);

        // ...
      } else {
        dispatch(setLoading(false));
        dispatch(setUser(null));
      }
    });
  }, []);

  return { user, userloading: loading };
};

export default useUser;
