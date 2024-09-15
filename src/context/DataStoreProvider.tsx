import { ModalData } from "@/interfaces/interfaces";
import { defaultEmptyModalData } from "@/utils/globals";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataStoreProviderType {
  addEditItemModalData: ModalData;
  addEditSectionModalData: ModalData;
  confirmModalData: ModalData;
  itemsToShow: any[];
  mainSections: any[];
  metalsApiData: {};
  setAddEditItemModalData: (data: ModalData) => void;
  setAddEditSectionModalData: (data: ModalData) => void;
  setConfirmModalData: (data: ModalData) => void;
  setItemsToShow: (data: any[]) => void;
  setMainSections: (data: any[]) => void;
  setMetalsApiData: (data: any) => void;
  setSubSections: (data: any[]) => void;
  subSections: any[];
}

const initialState: DataStoreProviderType = {
  addEditItemModalData: defaultEmptyModalData,
  addEditSectionModalData: defaultEmptyModalData,
  confirmModalData: defaultEmptyModalData,
  itemsToShow: [],
  mainSections: [],
  metalsApiData: {},
  setAddEditItemModalData: (data) => data,
  setAddEditSectionModalData: (data) => data,
  setConfirmModalData: (data) => data,
  setItemsToShow: () => {},
  setMainSections: () => {},
  setMetalsApiData: () => {},
  setSubSections: () => {},
  subSections: [],
};

const DataStoreContext = createContext<DataStoreProviderType>(initialState);

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const [addEditSectionModalData, setAddEditSectionModalData] =
    useState<ModalData>(defaultEmptyModalData);
  const [addEditItemModalData, setAddEditItemModalData] = useState<ModalData>(
    defaultEmptyModalData,
  );
  const [confirmModalData, setConfirmModalData] = useState<ModalData>(
    defaultEmptyModalData,
  );
  const [itemsToShow, setItemsToShow] = useState<any[]>([]);
  const [mainSections, setMainSections] = useState<any[]>([]);
  const [subSections, setSubSections] = useState<any[]>([]);
  const [metalsApiData, setMetalsApiData] = useState<any[]>([]);

  return (
    <DataStoreContext.Provider
      value={{
        addEditItemModalData,
        addEditSectionModalData,
        confirmModalData,
        itemsToShow,
        mainSections,
        metalsApiData,
        setAddEditItemModalData,
        setAddEditSectionModalData,
        setConfirmModalData,
        setItemsToShow,
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
