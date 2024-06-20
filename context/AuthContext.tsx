"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Cookies from "js-cookie";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

interface EmailSingInProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AuthContextType {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  googleSignIn: (rememberMe?: boolean) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  emailSignIn: (data: EmailSingInProps) => Promise<void>;
  logOut: () => Promise<void>;
  isAuthenticated: boolean;
  isOnline: boolean;
  changeIsOnline: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const parseCompanyName = (companyName: string) =>
    companyName.toLowerCase().replace(" ", "");

  const handleSuccessfullLogin = async (user: User) => {
    const token = await user?.getIdToken();

    const userDocument = await getDoc(user && doc(db, "users", user.uid!));
    const userSeatDocument = await getDoc(user && doc(db, "seats", user.uid!));

    console.log({ userDocument });

    const userNotFound = !userDocument.exists() && !userSeatDocument.exists();
    if (userNotFound) {
      await fetch(`${process.env.NEXT_PUBLIC_LEGACY_APP}/api/init_account`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      });
    }

    // await fetch(`${process.env.NEXT_PUBLIC_LEGACY_APP}/api/hydrate_user`, {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token!,
    //   },
    // });

    const userSeatData = userSeatDocument.data();
    const tokenData = await user?.getIdTokenResult(true);
    const { hasSpecificFeatures } = tokenData.claims;

    return `/${hasSpecificFeatures ? parseCompanyName(`${userSeatData?.company}`) : "conversations"}`;
  };

  const googleSignIn = async (rememberMe?: boolean) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const expires = rememberMe ? "" : "; Max-Age=3600";

      document.cookie = `accessToken=${token}; Path=/; SameSite=Strict${expires}`;

      setUser(user);
      setIsAuthenticated(true);
      setIsOnline(true);

      const nextRoute = await handleSuccessfullLogin(user);
      router.replace(nextRoute);

      // router.push("/conversations");
    } catch (error) {
      console.error("Error during Google sign-in: ", error);
    }
  };

  const emailSignIn = async ({
    email,
    password,
    rememberMe,
  }: EmailSingInProps) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const token = await user.getIdToken();

      const expires = rememberMe ? "" : "; Max-Age=3600";

      document.cookie = `accessToken=${token}; Path=/; SameSite=Strict${expires}`;

      setUser(user);
      setIsAuthenticated(true);
      setIsOnline(true);

      router.push("/conversations");
    } catch (error) {
      console.error("Error during Email and Password sign-in: ", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);

      document.cookie =
        "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";

      setUser(null);
      setIsAuthenticated(false);
      setIsOnline(false);

      router.push("/sign-in");
    } catch (error) {
      console.error("Error during sign out: ", error);
    }
  };

  const changeIsOnline = async () => {
    try {
      setIsOnline(!isOnline);
    } catch (error) {
      console.error("Error during updating user: ", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log({ currentUser });
      if (currentUser && token) {
        try {
          const idToken = await currentUser.getIdToken();
          if (token !== idToken) {
            throw new Error("Invalid token");
          }
          setUser(currentUser);
          setIsAuthenticated(true);
        } catch (error) {
          await logOut();
          throw new Error("Invalid token, logging out");
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        emailSignIn,
        logOut,
        isAuthenticated,
        isOnline,
        changeIsOnline,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
