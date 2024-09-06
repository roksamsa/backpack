import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataStoreProviderType {
  setIsAddingNewCategoryModalVisible: (data: boolean) => void;
  isAddingNewCategoryModalVisible: boolean;
}

const DataStoreContext = createContext<DataStoreProviderType | null>(null);

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const [isAddingNewCategoryModalVisible, setIsAddingNewCategoryModalVisible] =
    useState<boolean>(false);

  return (
    <DataStoreContext.Provider
      value={{
        isAddingNewCategoryModalVisible,
        setIsAddingNewCategoryModalVisible,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStoreContext = () => {
  return useContext(DataStoreContext);
};
