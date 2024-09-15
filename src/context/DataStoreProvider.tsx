import { ModalData } from "@/interfaces/interfaces";
import { defaultEmptyModalData } from "@/utils/globals";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataStoreProviderType {
  addingNewCategoryModalData: ModalData;
  addingNewItemModalData: ModalData;
  mainSections: any[];
  metalsApiData: {};
  setAddEditSectionModalData: (data: ModalData) => void;
  setAddEditItemModalData: (data: ModalData) => void;
  setMainSections: (data: any[]) => void;
  setMetalsApiData: (data: any) => void;
  setSubSections: (data: any[]) => void;
  subSections: any[];
}

const initialState: DataStoreProviderType = {
  addingNewCategoryModalData: defaultEmptyModalData,
  addingNewItemModalData: defaultEmptyModalData,
  mainSections: [],
  metalsApiData: {},
  setAddEditSectionModalData: (data) => data,
  setAddEditItemModalData: (data) => data,
  setMainSections: () => {},
  setMetalsApiData: () => {},
  setSubSections: () => {},
  subSections: [],
};

const DataStoreContext = createContext<DataStoreProviderType>(initialState);

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const [addingNewCategoryModalData, setAddEditSectionModalData] =
    useState<ModalData>(defaultEmptyModalData);
  const [addingNewItemModalData, setAddEditItemModalData] = useState<ModalData>(
    defaultEmptyModalData,
  );
  const [mainSections, setMainSections] = useState<any[]>([]);
  const [subSections, setSubSections] = useState<any[]>([]);
  const [metalsApiData, setMetalsApiData] = useState<any[]>([]);

  return (
    <DataStoreContext.Provider
      value={{
        addingNewCategoryModalData,
        addingNewItemModalData,
        mainSections,
        metalsApiData,
        setAddEditSectionModalData,
        setAddEditItemModalData,
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
