import React, {ReactNode, useState} from 'react';
import {Menu} from "@/models/menu/Menu";
import {Container} from "typedi";
import FormService from "@/Services/FormService/FormService";
import CommonService from "@/Services/CommonService/CommonService";
import MenuService from "@/Services/MenuService/MenuService";
import {Link, router, usePage} from "@inertiajs/react";
import SelectItemsProps from "@/Interfaces/SelectItemsProps";
import selectItemsProps from "@/Interfaces/SelectItemsProps";
import BlockCategories from "@/Enums/BlockCategories";
import SocialEnum from "@/Enums/SocialEnum";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, SelectChangeEvent, Stack, Typography} from "@mui/material";
import ValidatedSelect from "@/Components/ValidatedComponents/ValidatedSelect";
import AddFileButton from "@/Components/AddFileButton/AddFileButton";
import BasicTitleTranslation from "@/Components/Translations/BasicTitleTranslation";
import ValidatedSwitch from "@/Components/ValidatedComponents/ValidatedSwitch";
import CustomButton from "@/Components/Button/CustomButton";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import DeleteModal from "@/Components/DeleteModal/DeleteModal";
import MainMenuTypesEnum from "@/Enums/MainMenuTypesEnum";

const MainLinkUpdate: React.FC<{category: string, menus: Menu [], menu: Menu}> = (
    {category, menus, menu}
) => {
    const formService = Container.get(FormService);
    const commonService = Container.get(CommonService);
    const menuService = Container.get(MenuService);
    const languages = usePage().props.settings.languages;
    const [selectedMenu, setSelectedMenu] = React.useState<Menu>(menu);
    const [selectedMenus, setSelectedMenus] = React.useState<Menu []>(menus);
    const [linkType, setLinkType] = React.useState<MainMenuTypesEnum>(selectedMenu.type as MainMenuTypesEnum);
    const [file, setFile] = React.useState<File | null>(null);
    console.log('category: ', category);

    const linkTypes: SelectItemsProps [] = Object.values(MainMenuTypesEnum).map(type => {
        return {
            id: type,
            name: type,
        }
    });

    const blockTypes: selectItemsProps [] = Object.values(BlockCategories).map(type => {
        return {
            id: type,
            name: type,
        }
    });

    const iconList: selectItemsProps [] = Object.keys(SocialEnum).map(key => {
        return {
            id: SocialEnum[key],
            name: key,
        }
    })



    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    // =========================================================================================
    const menuSchema = z.object({
        isActive: z.boolean().default(true),
        menuType: z.object({
            type: z.string(),
            blockType: z.string(),
        }).refine( ({type, blockType}) => {
            return (type === MainMenuTypesEnum.BLOCK && blockType.length) ||
                type === MainMenuTypesEnum.FILE ||
                type === MainMenuTypesEnum.LIST ||
                type === MainMenuTypesEnum.HOME
        }, {
            message: 'Choose correct type!',
            path: ['blockType', 'type'],
        }),

        // Record key is "ar" or "en" of length 2:
        translations: z.record(z.string().length(2),z.object({
            name: z.string().min(3, {message: 'Name should be at least 3 characters!'}),
        })),

    });

    type menuSchemaType = z.infer<typeof menuSchema>;

    const defaultValues = selectedMenu.id < 0 ?
        formService.generateDefaultTitles(languages) :
        menuService.getTranslationsDetails(selectedMenu.translations);

    //TODO: comply methods with z.infer type:
    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(menuSchema),
        defaultValues: {
            parent: selectedMenu.parentId,
            isActive: selectedMenu.isActive,
            // name: selectedMenu.name,
            menuType: {
                type: selectedMenu.type || '',
                blockType: selectedMenu.blockType || '',
                // image: selectedMenu.image || 'facebook',
            },
            target: selectedMenu.target === '_blank',

            file: selectedMenu.file ? selectedMenu.file.name : null,
            // image: (selectedBlock.images[0].url as (File | string)),
            translations: defaultValues,
        }
    });

    const linkTypeChanged = (event: SelectChangeEvent<unknown>, child?: ReactNode) => {
        setLinkType(event.target.value as MainMenuTypesEnum);
        setFile(null);
    }

    const fileChanged = (file: File | null) => {
        setFile(file);
        if(file) {
            methods.setValue('file', file.name);
        }

        //Upload Selected File:
        const formData = new FormData();
        formData.append('fileId', String(selectedMenu.file?.id || '-1'));
        formData.append('file', file as Blob);
        formData.append('type', linkType);
        menuService.updateFile(formData, selectedMenu.id).then(response => {
            setSelectedMenu(response.data)
            setSelectedMenus((selectedMenus) => (
                selectedMenus.map(menu => {
                    if (menu.id === selectedMenu.id) return response.data
                    else return menu;
                })
            ));
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'File has been uploaded', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while updating file', severity: "error" })
            );
        })
    }

    const onSubmit = () => {
        const formData = new FormData();
        const target = methods.getValues('target') ? '_blank' : '_self';
        formData.append('parentId', String(methods.getValues('parent')));
        formData.append('category', category);
        formData.append('name', category + '-menu');
        formData.append('order', '1');
        formData.append('target', target);
        formData.append('isActive', String(methods.getValues('isActive')));
        formData.append('type', methods.getValues('menuType.type'));
        formData.append('translations', JSON.stringify(methods.getValues('translations')));
        if (linkType === MainMenuTypesEnum.BLOCK) {
            formData.append('blockType', methods.getValues('menuType.blockType'));
        }

        if(linkType === MainMenuTypesEnum.FILE) {
            formData.append('file', file as Blob);
        }

        if (linkType === MainMenuTypesEnum.FILE && !file) return;

        //Update basic info
        menuService.updateMenu(formData, selectedMenu.id).then(response => {
            setSelectedMenu(response.data)
            setSelectedMenus((selectedMenus) => (
                selectedMenus.map(menu => {
                    if (menu.id === selectedMenu.id) return response.data
                    else return menu;
                })
            ));
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Link has been updated', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while updating link', severity: "error" })
            );
        })

    }

    const deleteMenu = () => {
        setOpenModal(false);
        menuService.deleteMenu(menu.id)
            .then(response => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Link has been deleted!', severity: "success" })
                );
                router.get('/admin/get-menu/' + menu.category);
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting Link!', severity: "error" })
                );
            })
    }

    // =========================================================================================
    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                className="m-[8px]"
            >
                <Typography variant="h5">
                    {
                        'Update ' + menuService.getMenuName(selectedMenu)
                    }
                </Typography>
                <Link href={`/admin/get-menu/${category}`}>
                    <Typography variant="h5">
                        Back
                    </Typography>
                </Link>
            </Stack>

            <FormProvider {...methods}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >

                    <ValidatedSelect
                        control={methods.control}
                        controlName='parent'
                        id="parent"
                        label="Parent Link"
                        placeholder="Parent Link"
                        items={menuService.getAllTranslations(selectedMenus, true)}
                    />

                    <ValidatedSelect
                        control={methods.control}
                        controlName='menuType.type'
                        id="type"
                        label="Link Type"
                        placeholder="Link Type"
                        items={linkTypes}
                        withNone={false}
                        selectChanged={linkTypeChanged}
                    />

                    {
                        linkType === MainMenuTypesEnum.BLOCK &&
                        <ValidatedSelect
                            control={methods.control}
                            controlName='menuType.blockType'
                            id="blockType"
                            label="Block Type"
                            placeholder="Block Type"
                            items={blockTypes}
                            withNone={false}
                        />
                    }

                    {
                        linkType === MainMenuTypesEnum.FILE &&
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                            className="m-[8px]"
                        >
                            <Box className="m-[8px]">
                                <AddFileButton
                                    fileChanged={fileChanged}
                                    text="Customized"
                                    type="button"
                                ></AddFileButton>
                            </Box>
                            {file && <Typography variant="subtitle2">{file?.name}</Typography>}
                        </Stack>

                    }

                    <BasicTitleTranslation
                        methods={methods}
                        category={commonService.toTitleCase(category)}
                    />

                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <ValidatedSwitch
                            controlName="isActive"
                            name="isActive"
                            id="isActive"
                            color="secondary"
                            methods={methods}
                            label="Is Active?"
                        />

                        <ValidatedSwitch
                            controlName="target"
                            name="target"
                            id="target"
                            color="secondary"
                            methods={methods}
                            label="Open in a new tab?"
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <CustomButton task="update" text={commonService.toTitleCase(category)}></CustomButton>
                        <CustomButton type="button" task="delete" text={commonService.toTitleCase(category)} onClick={handleOpenModal}></CustomButton>
                    </Stack>

                </Box>
            </FormProvider>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />

            <DeleteModal
                open={openModal}
                onClose={handleCloseModal}
                message={`Are you sure that you want to delete ${menuService.getMenuName(selectedMenu)}`}
                confirmDelete={deleteMenu}
            ></DeleteModal>
        </Box>
    );
};

export default MainLinkUpdate;
