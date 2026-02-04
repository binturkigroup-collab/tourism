import React from 'react';
import Lead from "@/models/lead/Lead";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import {Head, Link, router} from "@inertiajs/react";

import Contact from "@/models/Contact/Contact";
import {Card, CardContent, CardHeader, MenuItem} from "@mui/material";
import { CardTitle } from "@/Pages/Site/components/ui/card";
import {ArrowLeft, FileText, Mail, Phone, User, Copy, Check, BellElectric, UserSearch} from "lucide-react";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import LeadService from "@/Services/LeadService/LeadService";
import {Container} from "typedi";
import "reflect-metadata";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import DeleteModal from "@/Components/DeleteModal/DeleteModal";
import CustomButton from "@/Components/Button/CustomButton";
import BlockService from "@/Services/BlockService/BlockService";
import {Button} from "@/Pages/Site/components/ui/button";
import {Block} from "@/models/block/Block";
import {Select} from "@mui/material";

const LeadDetails: React.FC<{lead: Lead, agents: Block []}> = ({lead, agents}) => {
    const leadService = Container.get(LeadService);
    const blockService = Container.get(BlockService);
    const [agent, setAgent] = React.useState<number>(lead.agentId || -1);
    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }
    // =========================================================================================
    // Handle Copy

    const [copiedField, setCopiedField] = React.useState<string | null>(null);

    const handleCopy = async (value: string, field: string) => {
        await navigator.clipboard.writeText(value);
        setCopiedField(field);
        // toast({ title: "Copied!", description: `${field} copied to clipboard.` });
        setSnackbar(snackbarState =>
            ({ ...snackbarState, open: true, message: 'Copied!', severity: "success" })
        );
        setTimeout(() => setCopiedField(null), 2000);
    };

    // =========================================================================================

    // Handle delete block

    const deleteLead = () => {
        setOpenModal(false);
        const formData = new FormData();
        formData.append('id', lead.id.toString());
        leadService.delete(formData, lead.id)
            .then(response => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'contact has been deleted!', severity: "success" })
                );
                router.get('/admin/leads');
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting contact!', severity: "error" })
                );
            })
    }

    const handleAgent = async (event:  React.ChangeEvent<Omit<HTMLInputElement, "value"> & {
        value: number
    }> | (Event & {
        target: {
            value: number
            name: string
        }
    })) => {
        setAgent(event.target.value)
        if (event.target.value > 0) {
            const formData = new FormData();
            formData.append('agentId', event.target.value.toString());
            leadService.agent(formData, lead.id)
                .then(() => {
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'An agent has been assigned!', severity: "success" })
                    );
                })
                .catch(() => {
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'error while assigning agent!', severity: "success" })
                    );
                })
        }
    }

    // =========================================================================================


    return (
        <AdminLayout>
            <Head title="Lead"></Head>
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex justify-start items-center">
                            <ArrowLeft className="h-4 w-4" />
                            <Link href="/admin/leads" className="gap-2">
                                Back to Leads
                            </Link>
                        </div>

                        <CustomButton task="delete" onClick={handleOpenModal}></CustomButton>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Lead Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Name */}
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="text-lg font-medium">{lead.name}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-medium">{lead.phone}</p>
                                        <Button
                                            variant="link"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleCopy(lead.phone, "Phone")}
                                        >
                                            {copiedField === "Phone" ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            {lead.email && (
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-lg font-medium">{lead.email}</p>
                                            <Button
                                                variant="link"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleCopy(lead.email!, "Email")}
                                            >
                                                {copiedField === "Email" ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            {lead.message && (
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Notes</p>
                                        <p className="text-base">{lead.message}</p>
                                    </div>
                                </div>
                            )}

                            {lead.action && (
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        {/*<FileText className="h-5 w-5 text-primary" />*/}
                                        <BellElectric className="h-5 w-5 text-primary"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Action</p>
                                        <p className="text-base">{lead.action}</p>
                                    </div>
                                </div>
                            )}

                        {/*    Agent*/}

                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <UserSearch className="h-5 w-5 text-primary"/>
                                </div>
                                <div>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={agent}
                                        label="Agent"
                                        onChange={(event, child) => handleAgent(event)}
                                    >
                                        <MenuItem value={-1} selected>Agent</MenuItem>
                                        {agents.map((agent, key) => (
                                            <MenuItem value={agent.id} key={agent.id}>{blockService.getBlockName(agent)}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
            <DeleteModal
                open={openModal}
                onClose={handleCloseModal}
                message={`Are you sure that you want to delete this contact?`}
                confirmDelete={deleteLead}
            ></DeleteModal>
        </AdminLayout>
    );
};

export default LeadDetails;
