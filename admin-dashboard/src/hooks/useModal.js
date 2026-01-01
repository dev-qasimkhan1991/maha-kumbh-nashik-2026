import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const openModal = (type, id = null) => {
    setModalType(type);
    setEditingId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setEditingId(null);
  };

  return { isOpen, modalType, editingId, openModal, closeModal };
};