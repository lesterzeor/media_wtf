import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase/clientApp";

export const firestoreDb = getFirestore(firebaseApp);
