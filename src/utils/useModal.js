import { useState } from 'react';

const useModal = (initialData = {}) => {
    const [active, setActive] = useState(false);
    const [modalData, setModalData] = useState(initialData);

    const openModal = (data) => {
        setModalData(data);
        setActive(true);
    };

    const closeModal = () => {
        setTimeout(() => setModalData(initialData), 300);
        setTimeout(() => setActive(false), 300);
    };

    return [active, modalData, openModal, closeModal];
};

export default useModal;
