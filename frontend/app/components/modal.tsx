"use client";

import React from "react";
import { ProductFormatted } from "@/shared/types";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";

interface ProductModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedProduct: ProductFormatted;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onOpenChange,
  selectedProduct,
}: ProductModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      size="3xl"
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">test</ModalHeader>
            <ModalBody>test</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
