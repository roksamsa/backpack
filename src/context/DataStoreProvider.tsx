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
    selectedContentView: 'rows' | 'grid';
    selectedMainSection: Category;
    selectedMainSectionId: string;
    selectedSubSection: any;
    selectedSubSectionId: string;
    setAddEditItemModalData: (data: ModalData) => void;
    setAddEditSectionModalData: (data: ModalData) => void;
    setConfirmModalData: (data: ModalData) => void;
    setItemsToShow: (data: any[]) => void;
    setMainSections: (data: any[]) => void;
    setMetalsApiData: (data: any) => void;
    setSelectedContentView: (data: 'rows' | 'grid') => void;
    setSelectedMainSection: (data: Category) => void;
    setSelectedMainSectionId: (data: string) => void;
    setSelectedSubSection: (data: any) => void;
    setSelectedSubSectionId: (data: string) => void;
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
    selectedContentView: 'rows',
    selectedMainSection: {} as Category,
    selectedMainSectionId: "",
    selectedSubSection: {},
    selectedSubSectionId: "",
    setAddEditItemModalData: (data) => data,
    setAddEditSectionModalData: (data) => data,
    setConfirmModalData: (data) => data,
    setItemsToShow: () => { },
    setMainSections: () => { },
    setMetalsApiData: () => { },
    setSelectedContentView: () => { },
    setSelectedMainSection: () => { },
    setSelectedMainSectionId: () => { },
    setSelectedSubSection: () => { },
    setSelectedSubSectionId: () => { },
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
    const [selectedSubSection, setSelectedSubSection] = useState<Category>({} as Category);
    const [selectedMainSectionId, setSelectedMainSectionId] = useState<string>("");
    const [selectedSubSectionId, setSelectedSubSectionId] = useState<string>("");

    const [selectedContentView, setSelectedContentView] = useState<'rows' | 'grid'>('rows');

    useEffect(() => {
        if (!userSchemaStructure?.schema) return;

        if (selectedMainSectionId) {
            const mainCategory = userSchemaStructure.schema?.find(
                (mainCategory: Category) => mainCategory.link === selectedMainSectionId,
            ) as Category;

            if (mainCategory) setSelectedMainSection(mainCategory);

            if (mainCategory && selectedSubSectionId) {
                const subCategory = mainCategory.children?.find(
                    (subCategory: any) => subCategory.link === selectedSubSectionId,
                ) as Category;

                if (subCategory) {
                    setSelectedSubSection(subCategory);
                } else {
                    setSelectedSubSection({} as Category);
                }
            }
        }
    }, [userSchemaStructure, selectedMainSectionId, selectedSubSectionId]);

    return (
        <DataStoreContext.Provider
            value={{
                addEditItemModalData,
                addEditSectionModalData,
                confirmModalData,
                itemsToShow,
                mainSections,
                metalsApiData,
                selectedContentView,
                selectedMainSection,
                selectedMainSectionId,
                selectedSubSection,
                selectedSubSectionId,
                setAddEditItemModalData,
                setAddEditSectionModalData,
                setConfirmModalData,
                setItemsToShow,
                setMainSections,
                setMetalsApiData,
                setSelectedContentView,
                setSelectedMainSection,
                setSelectedMainSectionId,
                setSelectedSubSection,
                setSelectedSubSectionId,
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
