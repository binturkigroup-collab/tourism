import React, {ReactNode} from 'react';
import {Menu} from "@/models/menu/Menu";
import {Container} from "typedi";
import FormService from "@/Services/FormService/FormService";
import CommonService from "@/Services/CommonService/CommonService";
import MenuService from "@/Services/MenuService/MenuService";
import {Link, usePage} from "@inertiajs/react";
import SelectItemsProps from "@/Interfaces/SelectItemsProps";
import selectItemsProps from "@/Interfaces/SelectItemsProps";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, SelectChangeEvent, Stack, Typography} from "@mui/material";
import ValidatedSelect from "@/Components/ValidatedComponents/ValidatedSelect";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import ValidatedSelectWithIcon from "@/Components/ValidatedComponents/ValidatedSelectWithIcon";
import BasicTitleTranslation from "@/Components/Translations/BasicTitleTranslation";
import ValidatedSwitch from "@/Components/ValidatedComponents/ValidatedSwitch";
import CustomButton from "@/Components/Button/CustomButton";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import ContactMenuEnum from "@/Enums/ContactMenuEnum";
import ContactEnum from "@/Enums/ContactEnum";

const ContactLink: React.FC<{category: string, menus: Menu []}> = ({category, menus}) => {
    const formService = Container.get(FormService);
    const commonService = Container.get(CommonService);
    const menuService = Container.get(MenuService);
    const languages = usePage().props.settings.languages;
    const [selectedMenu, setSelectedMenu] = React.useState<Menu>(new Menu({}));
    const [selectedMenus, setSelectedMenus] = React.useState<Menu []>(menus);
    const [linkType, setLinkType] = React.useState<ContactMenuEnum>(ContactMenuEnum.LIST);
    const [file, setFile] = React.useState<File | null>(null);

    const linkTypes: SelectItemsProps [] = Object.values(ContactMenuEnum).map(type => {
        return {
            id: type,
            name: type,
        }
    });

    const iconList: selectItemsProps [] = Object.keys(ContactEnum).map(key => {
        return {
            id: ContactEnum[key],
            name: key,
        }
    })



    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================
    const menuSchema = z.object({
        isActive: z.boolean().default(true),
        menuType: z.object({
            type: z.string(),
            url: z.string(),
        }).refine( ({ type, url}) => {
            return (type !== ContactMenuEnum.LIST && url.length > 0 ||
                type === ContactMenuEnum.LIST)
        }, {
            message: 'Choose correct type!',
            path: ['url', 'type'],
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
                url: selectedMenu.url || '',
                type: ContactMenuEnum.LIST,
                image: selectedMenu.image || 'phone',
            },
            target: selectedMenu.target === '_blank',
            translations: defaultValues,
        }
    });

    const linkTypeChanged = (event: SelectChangeEvent<unknown>, child?: ReactNode) => {
        setLinkType(event.target.value as ContactMenuEnum);
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
        formData.append('type', linkType);
        formData.append('translations', JSON.stringify(methods.getValues('translations')));
        formData.append('url', methods.getValues('menuType.url'));
        formData.append('image', methods.getValues('menuType.image'));
        //Store Menu
        menuService.storeMenu(formData).then(response => {
            methods.reset();
            setSelectedMenus((selectedMenus) => [...selectedMenus, response.data]);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'A new Link has been added', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while storing link', severity: "error" })
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
                        'Add New ' + commonService.toTitleCase(category)
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

                    {linkType !== ContactMenuEnum.LIST &&
                        <Box>
                            <ValidatedInput
                                name="url"
                                id="url"
                                controlName="menuType.url"
                                methods={methods}
                                label="URL"
                                placeholder="email@example.com"
                            ></ValidatedInput>

                            <ValidatedSelectWithIcon
                                control={methods.control}
                                controlName='menuType.image'
                                id="image"
                                label="Icon"
                                placeholder="Facebook"
                                items={iconList}
                                withNone={false}
                            />
                        </Box>}

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
                        <CustomButton task="add" text={commonService.toTitleCase(category)}></CustomButton>
                    </Stack>

                </Box>
            </FormProvider>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>
    );
};

export default ContactLink;
