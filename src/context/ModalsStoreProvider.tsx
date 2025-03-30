import { defaultEmptyModalData } from "@/utils/globals";
import { ModalData } from "@/utils/interfaces";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalsStoreProviderType {
  addEditItemModalData: ModalData;
  addEditItemsSectionModalData: ModalData;
  addEditSectionModalData: ModalData;
  confirmModalData: ModalData;
  setAddEditItemModalData: (data: ModalData) => void;
  setAddEditItemsSectionModalData: (data: ModalData) => void;
  setAddEditSectionModalData: (data: ModalData) => void;
  setConfirmModalData: (data: ModalData) => void;
}

const initialState: ModalsStoreProviderType = {
  addEditItemModalData: defaultEmptyModalData,
  addEditItemsSectionModalData: defaultEmptyModalData,
  addEditSectionModalData: defaultEmptyModalData,
  confirmModalData: defaultEmptyModalData,
  setAddEditItemModalData: (data) => data,
  setAddEditItemsSectionModalData: (data) => data,
  setAddEditSectionModalData: (data) => data,
  setConfirmModalData: (data) => data,
};

const ModalsStoreContext = createContext<ModalsStoreProviderType>(initialState);

export const ModalsStoreProvider = ({ children }: { children: ReactNode }) => {
  const [addEditSectionModalData, setAddEditSectionModalData] =
    useState<ModalData>(defaultEmptyModalData);
  const [addEditItemModalData, setAddEditItemModalData] = useState<ModalData>(
    defaultEmptyModalData,
  );
  const [confirmModalData, setConfirmModalData] = useState<ModalData>(
    defaultEmptyModalData,
  );
  const [addEditItemsSectionModalData, setAddEditItemsSectionModalData] =
    useState<ModalData>(defaultEmptyModalData);

  return (
    <ModalsStoreContext.Provider
      value={{
        addEditItemModalData,
        addEditItemsSectionModalData,
        addEditSectionModalData,
        confirmModalData,
        setAddEditItemModalData,
        setAddEditItemsSectionModalData,
        setAddEditSectionModalData,
        setConfirmModalData,
      }}
    >
      {children}
    </ModalsStoreContext.Provider>
  );
};

export const useModalsStoreContext = () => {
  return useContext(ModalsStoreContext);
};
