import { useDataStoreContext } from "@/context/DataStoreProvider";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import React, { useEffect, useState } from "react";

import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { usePathname } from "next/navigation";

import toast from "react-hot-toast";
import IconPicker from "@/components/icon-selector/IconSelector";
import { ModalType } from "@/utils/enums";
import { CustomSession } from "@/utils/interfaces";

const AddNewCategoryModal = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const {
    addEditSectionModalData,
    mainSections,
    selectedMainSection,
    setAddEditSectionModalData,
    setMainSections,
    setSubSections,
    subSections,
  } = useDataStoreContext();
  const [modalTitle, setModalTitle] = useState<string>("Add");
  const [saveButtonText, setSaveButtonText] = useState<string>("Save");
  const [cancelButtonText, setCancelButtonText] = useState<string>("Cancel");
  const [categoryName, setCategoryName] = useState<string>("");
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [preSelectedIcon, setPreSelectedIcon] = useState<string>("");
  const [parentCategory, setParentCategory] = useState<string>("");
  const [mainSectionsForDropdown, setMainSectionsForDropdown] = useState<any[]>(
    [],
  );
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] =
    useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  const formatSlug = (value: string) => {
    let slug = value
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    slug = slug.replace(/^-/, "");

    return slug;
  };

  const handleCategoryNameChange = (value: string) => {
    setCategoryName(value);

    if (!isSlugManuallyEdited) {
      setCategorySlug(formatSlug(value));
    }
  };

  const handleCategorySlugChange = (value: string) => {
    setIsSlugManuallyEdited(true);
    setCategorySlug(formatSlug(value));
  };

  const handleOnCancel = () => {
    setAddEditSectionModalData({
      ...addEditSectionModalData,
      isVisible: false,
    });
    setCategoryName("");
    setCategorySlug("");
  };

  const handleModalOpenChange = (event: any) => {
    setAddEditSectionModalData({
      ...addEditSectionModalData,
      isVisible: event,
    });
  };

  const addNewSectionApiCall = async (addingNewSubSection: boolean) => {
    const customSession = session as CustomSession;
    console.log("customSession", customSession);

    try {
      await fetchData({
        url: "/api/categories/create",
        method: "POST",
        body: {
          userId: customSession?.user?.id,
          name: categoryName,
          link: categorySlug,
          parentId: +parentCategory,
          properties: {
            icon: selectedIcon,
          },
        },
        options: {
          onSuccess: async (data) => {
            if (addingNewSubSection) {
              toast.success("Successfully added new sub section!");
              await fetchData({
                url: "/api/categories/getSectionsByParent",
                query: {
                  userId: customSession?.user?.id,
                  parentId: selectedMainSection?.id,
                },
                method: "GET",
                options: {
                  onSuccess: (data) => {
                    setSubSections(data);
                  },
                },
              });
            } else {
              toast.success("Successfully added new section!");
              await fetchData({
                url: "/api/categories/getMainSections",
                query: { userId: customSession?.user?.id },
                method: "GET",
                options: {
                  onSuccess: (data) => {
                    setMainSections(data);
                  },
                },
              });
            }
          },
        },
      });
    } catch (error) {
      toast.success("Failed to create new section!");
      console.error("Failed to create category:", error);
    }
  };

  const editSectionApiCall = async () => {
    const customSession = session as CustomSession;
    try {
      await fetchData({
        url: "/api/categories/edit",
        method: "PUT",
        body: {
          id: addEditSectionModalData?.data?.id,
          userId: customSession?.user?.id,
          name: categoryName,
          link: categorySlug,
          parentId: +parentCategory,
          properties: {
            icon: selectedIcon,
          },
        },
        options: {
          onSuccess: async (data) => {
            toast.success("Successfully added new section!");
            await fetchData({
              url: "/api/categories/getMainSections",
              query: { userId: customSession?.user?.id },
              method: "GET",
              options: {
                onSuccess: (data) => {
                  setMainSections(data);
                },
              },
            });
          },
        },
      });
    } catch (error) {
      toast.success("Failed to create new section!");
      console.error("Failed to create category:", error);
    }
  };

  const handleOnSave = async () => {
    handleOnCancel();

    switch (addEditSectionModalData?.type) {
      case ModalType.ADD_MAIN_SECTION:
        addNewSectionApiCall(false);
        break;

      case ModalType.ADD_SUB_SECTION:
        addNewSectionApiCall(true);
        break;

      case ModalType.ADD_ITEMS_SECTION:
        addNewSectionApiCall(true);
        break;

      case ModalType.EDIT_MAIN_SECTION:
        editSectionApiCall();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const mainSectionsWithNoneSection = [
      {
        id: null,
        name: "No parent section",
      },
      ...mainSections,
    ];
    setMainSectionsForDropdown(mainSectionsWithNoneSection);
  }, [mainSections]);

  useEffect(() => {
    switch (addEditSectionModalData.type) {
      case ModalType.ADD_MAIN_SECTION:
        setModalTitle("Add new main section to your backpack");
        setSaveButtonText("Add new main section");
        setParentCategory("");
        setCategoryName("");
        setCategorySlug("");
        setPreSelectedIcon("");
        break;

      case ModalType.ADD_SUB_SECTION:
        const selectedMainSection = mainSections.find((section: any) =>
          pathname.includes(section.link),
        );
        setModalTitle("Add new sub section to your backpack");
        setSaveButtonText("Add new sub section");
        setParentCategory(selectedMainSection?.id.toString() || "");
        setCategoryName("");
        setCategorySlug("");
        setPreSelectedIcon("");
        break;

      case ModalType.ADD_ITEMS_SECTION:
        const selectedSubSection = mainSections.find((section: any) =>
          pathname.includes(section.link),
        );
        setModalTitle("Add new items section to your backpack");
        setSaveButtonText("Add new items section");
        setParentCategory(selectedSubSection?.id.toString() || "");
        setCategoryName("");
        setCategorySlug("");
        setPreSelectedIcon("");
        setMainSectionsForDropdown(subSections);
        break;

      case ModalType.EDIT_MAIN_SECTION:
        console.log("addEditSectionModalData", addEditSectionModalData);
        setModalTitle("Edit main section");
        setSaveButtonText("Save");
        setCategoryName(addEditSectionModalData?.data?.name || "");
        setCategorySlug(addEditSectionModalData?.data?.link || "");
        setPreSelectedIcon(addEditSectionModalData?.data?.iconName);
        setParentCategory("");
        break;

      default:
        break;
    }
  }, [addEditSectionModalData, mainSections, subSections, pathname]);

  return (
    <Modal
      isOpen={addEditSectionModalData?.isVisible}
      onOpenChange={handleModalOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modalTitle}
            </ModalHeader>
            <ModalBody>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat
                consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                incididunt cillum quis.
              </p>
              <Input
                type="text"
                label="Section name"
                placeholder="Enter section name"
                value={categoryName}
                onValueChange={handleCategoryNameChange}
              />
              <Input
                type="text"
                label="URL slug"
                placeholder="Enter slug for new section"
                value={categorySlug}
                onValueChange={handleCategorySlugChange}
              />
              <Select
                label="Parent section"
                placeholder="Select parent section"
                className="max-w-xs"
                selectedKeys={[parentCategory]}
                onChange={(e) => setParentCategory(e.target.value)}
              >
                {mainSectionsForDropdown.map((section: any) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </Select>
              {addEditSectionModalData.type !== ModalType.ADD_SUB_SECTION && (
                <IconPicker
                  onSelectIcon={setSelectedIcon}
                  preSelectedIcon={preSelectedIcon}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleOnCancel}>
                {cancelButtonText}
              </Button>
              <Button color="primary" onPress={handleOnSave}>
                {saveButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewCategoryModal;
