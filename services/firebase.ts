import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  User as FirebaseUser,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where 
} from "firebase/firestore";
import { FIREBASE_CONFIG, ALLOWED_EMAIL, MOCK_STUDENTS } from "../constants";
import { User, Student } from "../types";

// --- REAL FIREBASE SETUP (Uncomment/configure to use real backend) ---
// const app = !getApps().length ? initializeApp(FIREBASE_CONFIG) : getApp();
// const auth = getAuth(app);
// const db = getFirestore(app);
// const googleProvider = new GoogleAuthProvider();

// --- MOCK SERVICE (For Demo Functionality without real keys) ---
// Since we don't have real keys in the prompt environment, we simulate the async behavior.

const MOCK_DELAY = 800;

export const loginWithGoogle = async (): Promise<User> => {
  // REAL CODE:
  /*
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user.email !== ALLOWED_EMAIL) {
      await signOut(auth);
      throw new Error(`Unauthorized email. Must use ${ALLOWED_EMAIL}`);
    }
    return mapFirebaseUserToUser(result.user);
  } catch (error) {
    throw error;
  }
  */

  // MOCK CODE:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        uid: "mock-uid-123",
        email: ALLOWED_EMAIL,
        displayName: "홍진우 (교사)",
        photoURL: "https://picsum.photos/50/50"
      });
    }, MOCK_DELAY);
  });
};

export const logoutUser = async (): Promise<void> => {
  // REAL CODE: await signOut(auth);
  
  // MOCK CODE:
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const fetchStudents = async (): Promise<Student[]> => {
  // REAL CODE:
  /*
  const q = query(collection(db, "students"));
  const querySnapshot = await getDocs(q);
  const students: Student[] = [];
  querySnapshot.forEach((doc) => {
    // Need to fetch subcollection 'records' for each student strictly speaking, 
    // or store records in the student doc array. 
    // Simplified for this snippet:
    students.push({ id: doc.id, ...doc.data() } as Student);
  });
  return students;
  */

  // MOCK CODE:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_STUDENTS);
    }, MOCK_DELAY);
  });
};

// Helper to map real firebase user to our app user
const mapFirebaseUserToUser = (user: FirebaseUser): User => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL
});
