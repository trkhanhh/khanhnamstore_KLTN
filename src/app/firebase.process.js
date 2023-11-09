import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
export const upload = async (file, callback) => {
  const snapshot = await uploadBytes(getRef(file.name), file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  callback(downloadURL);
};
export const uploadNoCallBack = async (file) => {
  const snapshot = await uploadBytes(getRef(file.name), file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
export const uploadThen = async (file, callback) => {
  uploadBytes(getRef(), file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      callback(downloadURL);
    });
  });
};
export const getRef = (name) => {
  return ref(storage, `clothes-project/${name}`);
};
