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
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

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
            color: "red",
            priority: 10,
          },
        },
        options: {
          onSuccess: async (data) => {
            toast("Successfully added new section!");
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
      console.error("Failed to create category:", error);
    }
  };

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
                incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
                et. Culpa deserunt nostrud ad veniam.
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
