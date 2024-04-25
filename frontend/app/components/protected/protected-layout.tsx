import { ReactNode, useEffect, useState } from "react";
import "../../styles/style.scss";
import Sidebar from "../sidebar";
import { UserProvider } from "@/context/user-data-context";
import { getDocuments } from "@/firebase/utils";

interface ProtectedLayoutProps {
  children: ReactNode;
}

interface CategoryData {
  name: ReactNode;
  path: string;
  id: string;
  isActive: boolean;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { getDoc } = getDocuments();
        const fetchedCategories = (await getDoc(
          "Categories/",
        )) as CategoryData[];

        fetchedCategories.unshift({
          name: "Dashboard",
          path: "dashboard",
          id: "dashboard",
          isActive: true,
        });

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="page">
      <div className="page-wrapper">
        <UserProvider>
          <Sidebar categories={categories} />
        </UserProvider>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
