import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setCurrentUser] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [images, setImages] = useState([]);
  const [mesg, setMesg] = useState("");
  const [name, setName] = useState("");
  const storage = getStorage();
  //login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //signup
  function signup(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        return setName(user);
      }
    );
  }
  //logout
  function logout() {
    return auth.signOut();
  }

  //get users after someone has logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [setCurrentUser]);

  //photo session

  //createSession

  const uploadphoto = (file, caption) => {
    const uploadFileRef = ref(storage, `image/${file.name}`);
    const uploadTask = uploadBytesResumable(uploadFileRef, file);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const Newprogress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Newprogress);
      },

      (err) => {
        console.log(err);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        let address = collection(db, "images");
        const userid = user.uid;
        await addDoc(address, {
          name: file.name,
          url: url,
          createdAt: Timestamp.now().toDate(),
          userId: userid,
          caption: caption,
          displayName: user.displayName,
        });
        setProgress(0);
      }
    );
  };

  //update
  const updateForm = (id, newCaption) => {
    let newAddress = doc(db, "images", id);
    updateDoc(newAddress, { caption: newCaption });
  };

  const deleteData = async (id) => {
    let newAddress = doc(db, "images", id);
    await deleteDoc(newAddress);
  };

  //hide messages
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setMesg("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [mesg]);

  //get Images
  useEffect(() => {
    let imgRef = collection(db, "images");
    const q = query(imgRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setImages(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);
  let value = {
    user,
    setCurrentUser,
    login,
    logout,
    uploadphoto,
    progress,
    images,
    updateForm,
    deleteData,
    mesg,
    setMesg,
    signup,
    name,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
