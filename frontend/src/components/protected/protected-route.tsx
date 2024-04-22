import firebaseApp from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const auth = getAuth(firebaseApp);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const Router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (!user) {
        Router.push("/login"); // Redirect to login page if user is not authenticated
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Optionally, you can show a loading spinner while checking authentication state
  }

  return <>{children}</>;
};

export default ProtectedRoute;
