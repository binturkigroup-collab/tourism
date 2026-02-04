import React from 'react';
import CustomButton from "@/Components/Button/CustomButton";
import {
    Box, Modal, Stack, Typography,
} from "@mui/material";
import styles from "./styles.module.scss";
import {BlockGridProps} from "../../Interfaces";
import {useBlocksContext} from "../BlocksContext";

const EditButton = (props: BlockGridProps) => {
    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const {deleteFn} = useBlocksContext();

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleDeleteCategory = () => {
        deleteFn(props.id, props.category);
        setOpenModal(false);
    }

    // =========================================================================================
    return (
        <Box>
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
