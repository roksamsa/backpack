import { useDataStoreContext } from "@/context/DataStoreProvider";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import React, { useState } from "react";

import styles from "./AddNewCategoryModal.module.scss";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

const AddNewCategoryModal = () => {
  const {
    setIsAddingNewCategoryModalVisible,
    isAddingNewCategoryModalVisible,
  } = useDataStoreContext();

  const [categoryName, setCategoryName] = React.useState<string>("");
  const [categorySlug, setCategorySlug] = React.useState<string>("");
  const [parentCategory, setParentCategory] = React.useState<string>("");

  return (
    <Modal
      isOpen={isAddingNewCategoryModalVisible}
      onOpenChange={setIsAddingNewCategoryModalVisible}
    >
      <ModalContent>
        {(onClose) => (
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
                label="Category name"
                placeholder="Enter category name"
                value={categoryName}
                onValueChange={setCategoryName}
              />
              <Input
                type="text"
                label="URL slug"
                placeholder="Enter slug for new category"
                value={categorySlug}
                onValueChange={setCategorySlug}
              />
              <Select
                label="Parent category"
                placeholder="Select parent category"
                className="max-w-xs"
                selectedKeys={[parentCategory]}
                onChange={(e) => setParentCategory(e.target.value)}
              >
                <SelectItem key="334324">Test</SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
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
