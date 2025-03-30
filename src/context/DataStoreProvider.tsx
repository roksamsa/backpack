import { ModalData } from "@/interfaces/interfaces";
import { defaultEmptyModalData } from "@/utils/globals";
import { Category, UserSchemaStructure } from "@/utils/interfaces";
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
    selectedMainSection: Category;
    selectedSubSection: any;
    setAddEditItemModalData: (data: ModalData) => void;
    setAddEditSectionModalData: (data: ModalData) => void;
    setConfirmModalData: (data: ModalData) => void;
    setItemsToShow: (data: any[]) => void;
    setMainSections: (data: any[]) => void;
    setMetalsApiData: (data: any) => void;
    setSelectedMainSection: (data: Category) => void;
    setSelectedSubSection: (data: any) => void;
    setSubSections: (data: any[]) => void;
    setUserSchemaStructure: (data: UserSchemaStructure) => void;
    subSections: any[];
    userSchemaStructure: any;
}

const initialState: DataStoreProviderType = {
    addEditItemModalData: defaultEmptyModalData,
    addEditSectionModalData: defaultEmptyModalData,
    confirmModalData: defaultEmptyModalData,
    itemsToShow: [],
    mainSections: [],
    metalsApiData: {},
    selectedMainSection: {} as Category,
    selectedSubSection: {},
    setAddEditItemModalData: (data) => data,
    setAddEditSectionModalData: (data) => data,
    setConfirmModalData: (data) => data,
    setItemsToShow: () => { },
    setMainSections: () => { },
    setMetalsApiData: () => { },
    setSelectedMainSection: () => { },
    setSelectedSubSection: () => { },
    setSubSections: () => { },
    setUserSchemaStructure: () => { },
    subSections: [],
    userSchemaStructure: {},
};

const DataStoreContext = createContext<DataStoreProviderType>(initialState);

export const DataStoreProvider = ({ children }: { children: ReactNode; }) => {
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

    const [userSchemaStructure, setUserSchemaStructure] = useState<UserSchemaStructure>({} as UserSchemaStructure);

    // Selection of items
    const [selectedMainSection, setSelectedMainSection] = useState<Category>({} as Category);
    const [selectedSubSection, setSelectedSubSection] = useState<any[]>([]);

    useEffect(() => {
        console.log("selectedSubSection", selectedSubSection);
        console.log("selectedMainSection", selectedMainSection);
    }, [selectedMainSection, selectedSubSection]);

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
                setUserSchemaStructure,
                subSections,
                userSchemaStructure,
            }}
        >
            {children}
        </DataStoreContext.Provider>
    );
};

export const useDataStoreContext = () => {
    return useContext(DataStoreContext);
};
