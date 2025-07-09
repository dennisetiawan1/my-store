import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import app from './init';
import bcrypt from 'bcrypt'

const firestore = getFirestore(app);

export async function retrieve(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data()
    }))
    return data;
}

export async function retrieveDataById(collectionName: string, id:string){
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signUp(userData: {
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role?: string;
}): Promise<boolean> {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email),
    );
    const snapshot = await getDocs(q);

    // Cek apakah email sudah ada
    if (!snapshot.empty) {
      return false;
    }

    // Tambahkan role default jika kosong
    if (!userData.role) {
      userData.role = "member";
    }

    // Hash password
    userData.password = await bcrypt.hash(userData.password, 10);

    // Simpan ke Firestore
    await addDoc(collection(firestore, "users"), userData);

    return true;
  } catch (err) {
    console.error("🔥 Error di signUp:", err);
    throw err; // biar bisa ditangkap di handler API
  }
}
