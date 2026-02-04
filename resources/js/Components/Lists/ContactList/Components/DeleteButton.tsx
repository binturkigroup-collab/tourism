import React from 'react';
import CustomButton from "@/Components/Button/CustomButton";
import {
    Box, Modal, Stack, Typography,
} from "@mui/material";
import styles from "./styles.module.scss";
import {useContactsContext} from "../ContactsContext";
import {ContactGridProps} from "@/Components/Lists/Interfaces/ContactProps";

const EditButton = (props: ContactGridProps) => {
    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const {deleteFn} = useContactsContext();

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleDeleteCategory = () => {
        deleteFn(props.id);
        setOpenModal(false);
    }

    // =========================================================================================
    return (
        <Box className="py-[8px]">
            <CustomButton
                task="delete"
                text=""
                onClick={handleOpenModal}
            ></CustomButton>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
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
                        Are you sure that you want to delete {props.name}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <CustomButton task="delete" text="" onClick={handleDeleteCategory}></CustomButton>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default EditButton;
