import {ModalProps} from "@mui/material/Modal";

interface DeleteModalProps {
    open: boolean;
    onClose?: {
        bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
    }['bivarianceHack'];
    message: string;
    confirmDelete: () => void;
}

export default DeleteModalProps;
