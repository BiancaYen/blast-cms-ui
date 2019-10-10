import { useState } from 'react';

const useModal = () => {
    const [active, setActive] = useState(false);
    const [modalData, setModalData] = useState({});

    const openModal = (data) => {
        setModalData(data);
        setActive(true);
    };

    const closeModal = () => {
        setTimeout(() => setModalData({}), 300);
        setActive(false);
    };

    return [active, modalData, openModal, closeModal];
};

export default useModal;
