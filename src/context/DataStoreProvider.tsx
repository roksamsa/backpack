import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataStoreProviderType {
  isAddingNewCategoryModalVisible: boolean;
  mainSections: any[];
  setIsAddingNewCategoryModalVisible: (data: boolean) => void;
  setMainSections: (data: any[]) => void;
  setSubSections: (data: any[]) => void;
  subSections: any[];
}

const DataStoreContext = createContext<DataStoreProviderType | null>(null);

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const [isAddingNewCategoryModalVisible, setIsAddingNewCategoryModalVisible] =
    useState<boolean>(false);
  const [mainSections, setMainSections] = useState<any[]>([]);
  const [subSections, setSubSections] = useState<any[]>([]);

  return (
    <DataStoreContext.Provider
      value={{
        isAddingNewCategoryModalVisible,
        mainSections,
        setIsAddingNewCategoryModalVisible,
        setMainSections,
        setSubSections,
        subSections,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStoreContext = () => {
  return useContext(DataStoreContext);
};
