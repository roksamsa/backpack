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

import styles from "./AddNewCategoryModal.module.scss";

const AddNewCategoryModal = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const {
    isAddingNewCategoryModalVisible,
    mainSections,
    setIsAddingNewCategoryModalVisible,
    setMainSections,
  } = useDataStoreContext();
  const [categoryName, setCategoryName] = React.useState<string>("");
  const [categorySlug, setCategorySlug] = React.useState<string>("");
  const [parentCategory, setParentCategory] = React.useState<string>("");
  const [mainSectionsForDropdown, setMainSectionsForDropdown] = React.useState<
    any[]
  >([]);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const formatSlug = (value: string) => {
    let slug = value
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    slug = slug.replace(/^-/, "");

    return slug;
  };

  useEffect(() => {
    console.log(selectedIcon);
  }, [selectedIcon]);

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

  const handleOnCancel = async () => {
    setIsAddingNewCategoryModalVisible(false);
    setCategoryName("");
    setCategorySlug("");
  };

  const handleOnSave = async () => {
    handleOnCancel();

    try {
      await fetchData({
        url: "/api/categories/create",
        method: "POST",
        body: {
          userId: session?.user?.id,
          name: categoryName,
          link: `/app/${categorySlug}`,
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
              query: { userId: session?.user?.id },
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

  useEffect(() => {
    const selectedMainSection = mainSections.find(
      (section: any) => section.link === pathname,
    );

    setParentCategory(selectedMainSection?.id.toString());
  }, [mainSections, pathname]);

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

  return (
    <Modal
      isOpen={isAddingNewCategoryModalVisible}
      onOpenChange={setIsAddingNewCategoryModalVisible}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new section to your backpack
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
              <IconPicker onSelectIcon={setSelectedIcon} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleOnCancel}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleOnSave}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewCategoryModal;
