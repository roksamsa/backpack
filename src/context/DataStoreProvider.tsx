import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataStoreProviderType {
  isAddingNewCategoryModalVisible: boolean;
  isAddingNewItemModalVisible: boolean;
  mainSections: any[];
  metalsApiData: {};
  setIsAddingNewCategoryModalVisible: (data: boolean) => void;
  setIsAddingNewItemModalVisible: (data: boolean) => void;
  setMainSections: (data: any[]) => void;
  setMetalsApiData: (data: any) => void;
  setSubSections: (data: any[]) => void;
  subSections: any[];
}

const initialState: DataStoreProviderType = {
  isAddingNewCategoryModalVisible: false,
  isAddingNewItemModalVisible: false,
  mainSections: [],
  metalsApiData: {},
  setIsAddingNewCategoryModalVisible: () => {},
  setIsAddingNewItemModalVisible: () => {},
  setMainSections: () => {},
  setMetalsApiData: () => {},
  setSubSections: () => {},
  subSections: [],
};

const DataStoreContext = createContext<DataStoreProviderType>(initialState);

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const [isAddingNewCategoryModalVisible, setIsAddingNewCategoryModalVisible] =
    useState<boolean>(false);
  const [isAddingNewItemModalVisible, setIsAddingNewItemModalVisible] =
    useState<boolean>(false);
  const [mainSections, setMainSections] = useState<any[]>([]);
  const [subSections, setSubSections] = useState<any[]>([]);
  const [metalsApiData, setMetalsApiData] = useState<any[]>([]);

  return (
    <DataStoreContext.Provider
      value={{
        isAddingNewCategoryModalVisible,
        isAddingNewItemModalVisible,
        mainSections,
        metalsApiData,
        setIsAddingNewCategoryModalVisible,
        setIsAddingNewItemModalVisible,
        setMainSections,
        setMetalsApiData,
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
