import React from "react";
import DeleteModalProps from "@/Interfaces/DeleteModalProps";
import {Box, Modal, Stack, Typography} from "@mui/material";
import styles from "./styles.module.scss";
import CustomButton from "@/Components/Button/CustomButton";

const DeleteModal : React.FC<DeleteModalProps> = ({
    open,
    onClose,
    message = '',
    confirmDelete,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.modalStyle} sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                border: `2px solid`
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirm Deletion Message
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {/*Are you sure that you want to delete {productService.getProductName(selectedProduct)}*/}
                    {message}
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    className="m-[8px]"
                >
                    <CustomButton task="delete" text="" onClick={confirmDelete}></CustomButton>
                </Stack>
            </Box>
        </Modal>
    );
}

export default DeleteModal;
