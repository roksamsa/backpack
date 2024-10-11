import { defaultEmptyModalData } from "@/utils/globals";
import { ModalData } from "@/utils/interfaces";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DataStoreProviderType {
  addEditItemModalData: ModalData;
  addEditSectionModalData: ModalData;
  confirmModalData: ModalData;
  itemsToShow: any[];
  mainSections: any[];
  metalsApiData: {};
  selectedMainSection: any;
  selectedSubSection: any;
  setAddEditItemModalData: (data: ModalData) => void;
  setAddEditSectionModalData: (data: ModalData) => void;
  setConfirmModalData: (data: ModalData) => void;
  setItemsToShow: (data: any[]) => void;
  setMainSections: (data: any[]) => void;
  setMetalsApiData: (data: any) => void;
  setSelectedMainSection: (data: any) => void;
  setSelectedSubSection: (data: any) => void;
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
  selectedMainSection: {},
  selectedSubSection: {},
  setAddEditItemModalData: (data) => data,
  setAddEditSectionModalData: (data) => data,
  setConfirmModalData: (data) => data,
  setItemsToShow: () => {},
  setMainSections: () => {},
  setMetalsApiData: () => {},
  setSelectedMainSection: () => {},
  setSelectedSubSection: () => {},
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

  // Selection of items
  const [selectedMainSection, setSelectedMainSection] = useState<any>();
  const [selectedSubSection, setSelectedSubSection] = useState<any>();

  return (
    <DataStoreContext.Provider
      value={{
        addEditItemModalData,
        addEditSectionModalData,
        confirmModalData,
        itemsToShow,
        mainSections,
        metalsApiData,
        selectedMainSection,
        selectedSubSection,
        setAddEditItemModalData,
        setAddEditSectionModalData,
        setConfirmModalData,
        setItemsToShow,
        setMainSections,
        setMetalsApiData,
        setSelectedMainSection,
        setSelectedSubSection,
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
