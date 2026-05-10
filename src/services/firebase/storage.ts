import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

/**
 * Storage Service
 * Handles file uploads and deletions in Firebase Storage.
 */

export async function uploadBusinessImage(file: File, businessId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `businesses/${businessId}/${fileName}`;
  
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  
  const downloadUrl = await getDownloadURL(storageRef);
  return { path: filePath, url: downloadUrl };
}

export async function uploadProfilePicture(file: File, uid: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `profile.${fileExt}`;
  const filePath = `profiles/${uid}/${fileName}`;
  
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  
  const downloadUrl = await getDownloadURL(storageRef);
  return { path: filePath, url: downloadUrl };
}

export async function deleteFile(path: string) {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
  return true;
}
