import React, {useState} from 'react';
import Trip from "@/models/block/Trip";
import {Container} from "typedi";
import FormService from "@/Services/FormService/FormService";
import BlockService from "@/Services/BlockService/BlockService";
import CommonService from "@/Services/CommonService/CommonService";
import {Link, router, usePage} from "@inertiajs/react";
import {Block} from "@/models/block/Block";
import DurationEnum from "@/Enums/DurationEnum";
import PackageEnum from "@/Enums/PackageEnum";
import BlockCategories from "@/Enums/BlockCategories";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Breadcrumbs, Chip, SelectChangeEvent, Stack, Typography} from "@mui/material";
import ValidatedImage from "@/Components/ValidatedComponents/ValidatedImage";
import ValidatedCheckbox from "@/Components/ValidatedComponents/ValidatedCheckbox";
import ValidatedSelect from "@/Components/ValidatedComponents/ValidatedSelect";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import BasicTranslation from "@/Components/Translations/BasicTranslation";
import CustomButton from "@/Components/Button/CustomButton";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import ValidatedSwitch from "@/Components/ValidatedComponents/ValidatedSwitch";
import DeleteModal from "@/Components/DeleteModal/DeleteModal";

const BasicInfo: React.FC<{category: string, block: Trip, handleBlockChange: (block: Trip) => void}> = ({category, block, handleBlockChange}) => {
    const formService = Container.get(FormService);
    const blockService = Container.get(BlockService);
    const commonService = Container.get(CommonService);
    const languages = usePage().props.settings.languages;
    const [selectedBlock, setSelectedBlock] = useState<Trip>({...block});
    const [tags, setTags] = React.useState<Block []>([]);
    const [chosenSTags, setChosenTags] = React.useState<number[]>(block.tags.map(tg => tg.id));
    const [cities, setCities] = React.useState<Block []>([]);

    const durationUnits = Object.entries(DurationEnum).map(([key, value]) => {
        return {
            id: key,
            name: value,
        }
    });

    const packages = Object.entries(PackageEnum).map(([key, value]) => {
        return {
            id: key,
            name: value,
        }
    })

    //==========================================================================================
    // Get the skills and libraries:
    React.useEffect(() => {
        async function fetchData() {
            try {
                const [tagRes, citRes] = await Promise.all([
                    blockService.getActiveBlocks(commonService.toSnakeCase(BlockCategories.TAG)),
                    blockService.getActiveBlocks(commonService.toSnakeCase(BlockCategories.CITY)),
                ]);

                const [tagsData, citiesData] = await Promise.all([
                    tagRes.data,
                    citRes.data,
                ]);

                setTags(tagsData);
                setCities(citiesData);
            } catch(error) {
                console.log("Error fetching data", error);
            }
        }

        fetchData();
    }, []);
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

    const tripSchema = z.object({
        isActive: z.boolean().default(true),
        // Record key is "ar" or "en" of length 2:
        translations: z.record(z.string().length(2),z.object({
            name: z.string().min(3, {message: 'Title should be at least 3 characters!'}),
            // brief: z.string().min(10),
            description: z.string().max(20000, {message: " Description shouldn't exceed 20000 characters!"})
            // description: z.string().min(10),
        })),

        tags: z.array(z.number()).min(1, "You must choose at least one tag!"),

        price: z.string().default('0')
            .refine((val) => formService.isNumeric(val), {
                message: "Estimated value must be a number"
            })
            .refine((val) => formService.isPositive(val), {
                message: "Estimated value must be a positive number"
            }),

        maxGuests: z.string().default('0')
            .refine((val) => formService.isNumeric(val), {
                message: "Estimated value must be a number"
            })
            .refine((val) => formService.isPositive(val), {
                message: "Estimated value must be a positive number"
            })
            .refine((val) => formService.isInteger(val), {
                message: "Estimated value must be an integer"
            }),

        minAge: z.string().default('0')
            .refine((val) => formService.isNumeric(val), {
                message: "Estimated value must be a number"
            })
            .refine((val) => formService.isPositive(val), {
                message: "Estimated value must be a positive number"
            }),

        duration: z.string().default('0')
            .refine((val) => formService.isNumeric(val), {
                message: "Estimated value must be a number"
            })
            .refine((val) => formService.isPositive(val), {
                message: "Estimated value must be a positive number"
            }),
    });

    type blockSchemaType = z.infer<typeof tripSchema>;

    //TODO: comply methods with z.infer type:
    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(tripSchema),
        defaultValues: {
            isActive: selectedBlock.isActive,
            image: (null as (File | null)),
            translations: blockService.getTranslationsDetails(selectedBlock.translations),
            tags: chosenSTags,
            cityId: selectedBlock.cityId,
            maxGuests: selectedBlock.maxGuests,
            minAge: selectedBlock.minAge,
            price: selectedBlock.price,
            duration: selectedBlock.duration,
            // package: '',
            unit: selectedBlock.unit as DurationEnum,
            package: selectedBlock.tripPackage ? block.tripPackage : '',
        }
    });

    // // =========================================================================================
    // // Handle image upload:
    //
    const onUpload = () => {
        const imageId = selectedBlock.images.find(img => img.isCover)?.id || -1;
        const formData = new FormData();
        formData.append('image', (methods.getValues('image') as Blob));
        formData.append('imageId', String(imageId));
        blockService.uploadImage(formData, block.id).then(response => {
            setSelectedBlock(response.data as Trip);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Image has been updated!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while uploading image!', severity: "error" })
            );
        })
    }

    // =========================================================================================
    // Handle delete block

    const deleteBlock = () => {
        setOpenModal(false);
        blockService.deleteBlock(block.id)
            .then(response => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Block has been deleted!', severity: "success" })
                );
                router.get('/admin/get-block/' + block.category);
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting block!', severity: "error" })
                );
            })
    }

    // =========================================================================================
    // Handle Switch button:

    const receiveSwitchState = (value: boolean) => {
        const formData = new FormData();
        formData.append('isActive', String(value));

        blockService.blockActivation(formData, block.id).then(response => {
            setSelectedBlock(response.data as Trip);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Block status has been successfully updated!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while updating block status!', severity: "error" })
            );
        })
    }

    const onSubmit =  () => {
        // console.log(methods.getValues('image'));
        // if (methods.getValues('image') === null) return;
        const formData = new FormData();
        formData.append('category', category);
        // formData.append('parentId', '-1');
        // formData.append('image', (methods.getValues('image') as Blob));
        formData.append('isActive', String(methods.getValues('isActive')));
        formData.append('translations', JSON.stringify(methods.getValues('translations')));
        formData.append('isImage', 'true');
        formData.append('isCover', 'true');
        formData.append('cityId', methods.getValues('cityId').toString());
        formData.append('blockId', String(block.id));
        if (methods.getValues('package') !== '') {
            formData.append('package', methods.getValues('package'));
        }

        chosenSTags.forEach(id => formData.append('tags[]', id.toString()));

        formData.append('price', methods.getValues('price').toString());
        formData.append('maxGuests', methods.getValues('maxGuests').toString());
        formData.append('minAge', methods.getValues('minAge').toString());
        formData.append('duration', methods.getValues('duration').toString());
        formData.append('unit', methods.getValues('unit'));
        formData.append('package', methods.getValues('package'));

        blockService.updateBlock(formData, block.id).then(response => {
            setSelectedBlock(response.data as Trip);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'The block has been updated', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while updating block', severity: "error" })
            );
        })
    }

    const handleTagsChange = (event: SelectChangeEvent<unknown>) => {
        setChosenTags(event.target.value as number[]);
    }

    React.useEffect(() => {
        methods.getValues('image');
    }, [methods]);
    return (
        <Box>

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
                    <ValidatedImage
                        controllerName="image"
                        methods={methods}
                        image={blockService.getBlockImage(block)}
                        onUpload={onUpload}
                    />

                    <ValidatedSwitch
                        controlName="isActive"
                        name="isActive"
                        id="isActive"
                        color="secondary"
                        methods={methods}
                        label="Is Active"
                        sendSwitchState={(value) => receiveSwitchState(value)}
                    />

                    {cities.length > 0 && <ValidatedSelect
                        control={methods.control}
                        controlName='cityId'
                        id="cityId"
                        label="Choose City"
                        placeholder="City"
                        withNone={false}
                        // items={blockService.getAllTranslations(selectedCategories)}
                        items={cities.map(cit => ({
                            id: cit.id,
                            name: blockService.getBlockName(cit),
                        }))}

                    />}

                    {tags.length > 0 && <ValidatedSelect
                        control={methods.control}
                        controlName='tags'
                        id="tags"
                        label="Tags"
                        placeholder="Tags"
                        selectChanged={handleTagsChange}
                        multiple={true}
                        withNone={false}
                        value={chosenSTags}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as number []).map((value) => (
                                    <Chip key={value} label={blockService.getBlockNameById(value, tags)} />
                                ))}
                            </Box>
                        )}
                        items={
                            tags.map(
                                skill => ({
                                    id: skill.id,
                                    name: blockService.getBlockName(skill),
                                })
                            )
                        }
                    />}

                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <ValidatedInput
                            controlName="price"
                            name="price"
                            id="price"
                            label="Price"
                            placeholder="Price"
                            control={methods.control}
                            adornment="AED"
                        />

                        <ValidatedInput
                            controlName="maxGuests"
                            name="maxGuests"
                            id="maxGuests"
                            label="Max Guests"
                            placeholder="Max Guests"
                            control={methods.control}
                        />

                        <ValidatedInput
                            controlName="minAge"
                            name="minAge"
                            id="minAge"
                            label="Minimum Age"
                            placeholder="Minimum Age"
                            control={methods.control}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <ValidatedInput
                            controlName="duration"
                            name="duration"
                            id="duration"
                            label="Duration"
                            placeholder="Duration"
                            control={methods.control}
                        />

                        {durationUnits.length > 0 && <ValidatedSelect
                            control={methods.control}
                            controlName='unit'
                            id="unit"
                            label="Unit"
                            placeholder="unit"
                            withNone={false}
                            items={
                                durationUnits.map(type => ({id: type.name, name: type.name}))
                            }

                        />}

                        {packages.length > 0 && <ValidatedSelect
                            control={methods.control}
                            controlName='package'
                            id="package"
                            label="Package"
                            placeholder="Package"
                            withNone={true}
                            items={
                                packages.map(pk => ({id: pk.name, name: pk.name}))
                            }

                        />}
                    </Stack>

                    <BasicTranslation
                        methods={methods}
                        category={commonService.toTitleCase(category)}
                        // withDetails={false}
                        withBrief={false}
                    />



                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <CustomButton task="update" text={commonService.toTitleCase(category)}></CustomButton>
                        <CustomButton task="delete" text={commonService.toTitleCase(category)} onClick={handleOpenModal}></CustomButton>
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
                message={`Are you sure that you want to delete ${blockService.getBlockName(selectedBlock)}`}
                confirmDelete={deleteBlock}
            ></DeleteModal>
        </Box>
    );
};

export default BasicInfo;
