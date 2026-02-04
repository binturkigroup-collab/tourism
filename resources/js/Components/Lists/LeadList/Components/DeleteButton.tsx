import React from 'react';
import Lead from "@/models/lead/Lead";
import CustomButton from "@/Components/Button/CustomButton";
import {
    Box, Modal, Stack, Typography,
} from "@mui/material";
import styles from "./styles.module.scss";
import {Container} from "typedi";
import "reflect-metadata";
import LeadService from "@/Services/LeadService/LeadService";
import {router} from "@inertiajs/react";
import BlockCategories from "@/Enums/BlockCategories";

const DeleteButton = (props: Lead, deleteCallback: (lead: Lead) => void) => {
    const leadService = Container.get(LeadService);
    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    // const {deleteFn} = useBlocksContext();

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleDeleteLead = () => {
        setOpenModal(false);
        deleteCallback(props);
    }

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
                        <CustomButton task="delete" text="" onClick={handleDeleteLead}></CustomButton>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default DeleteButton;
