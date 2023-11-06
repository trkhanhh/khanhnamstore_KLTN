import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
export const upload = async (file, callback) => {
  const snapshot = await uploadBytes(getRef(), file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  callback(downloadURL);
};
export const getRef = () => {
  return ref(storage, "/clothes-project");
};
