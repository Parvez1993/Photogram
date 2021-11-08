import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../config";
import { signInWithEmailAndPassword } from "@firebase/auth";
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
  const storage = getStorage();
  //login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
      console.log("aaa", images);
    });
  }, []);

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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
