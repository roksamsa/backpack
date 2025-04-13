import { ToastPosition } from "react-hot-toast";

const danfossMainColor = 'rgb(215, 25, 32)';
const greenColor = 'rgb(0, 128, 0)';

export const typesForDropdown = [];

export const defaultEmptyModalData = {
    data: null,
    isVisible: false,
    type: "",
};

export const toastOptions = {
    duration: 5000,
    error: {
        iconTheme: {
            primary: 'white',
            secondary: danfossMainColor,
        },
        style: {
            backgroundColor: danfossMainColor,
            color: 'white',
        },
    },
    success: {
        iconTheme: {
            primary: 'white',
            secondary: greenColor,
        },
        style: {
            backgroundColor: greenColor,
            color: 'white',
        },
    },
    position: 'bottom-center' as ToastPosition,
};
