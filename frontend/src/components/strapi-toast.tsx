"use client";

import React from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { ModalBody, ModalHeader } from "@nextui-org/react";

export function StrapiToast({
  isOpen,
  toastMessage,
}: {
  isOpen: boolean;
  readonly toastMessage: string;
}) {
  const { onOpen, onOpenChange } = useDisclosure();

  if (!toastMessage) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
        backdrop="opaque"
        size="3xl"
        onOpenChange={onOpenChange}
        placement="bottom-center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p>{toastMessage}</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
