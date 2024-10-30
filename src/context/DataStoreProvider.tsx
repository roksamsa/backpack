import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataStoreProviderType {
  itemsSections: any[];
  itemsToShow: any[];
  mainSections: any[];
  metalsApiData: {};
  selectedMainSection: any;
  selectedSubSection: any;
  setItemsSections: (data: any[]) => void;
  setItemsToShow: (data: any[]) => void;
  setMainSections: (data: any[]) => void;
  setMetalsApiData: (data: any) => void;
  setSelectedMainSection: (data: any) => void;
  setSelectedSubSection: (data: any) => void;
  setSubSections: (data: any[]) => void;
  subSections: any[];
}

const initialState: DataStoreProviderType = {
  itemsSections: [],
  itemsToShow: [],
  mainSections: [],
  metalsApiData: {},
  selectedMainSection: {},
  selectedSubSection: {},
  setItemsSections: () => {},
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
  const [itemsToShow, setItemsToShow] = useState<any[]>([]);
  const [mainSections, setMainSections] = useState<any[]>([]);
  const [subSections, setSubSections] = useState<any[]>([]);
  const [itemsSections, setItemsSections] = useState<any[]>([]);
  const [metalsApiData, setMetalsApiData] = useState<any[]>([]);

  // Selection of items
  const [selectedMainSection, setSelectedMainSection] = useState<any>();
  const [selectedSubSection, setSelectedSubSection] = useState<any>();

  return (
    <DataStoreContext.Provider
      value={{
        itemsSections,
        itemsToShow,
        mainSections,
        metalsApiData,
        selectedMainSection,
        selectedSubSection,
        setItemsSections,
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
