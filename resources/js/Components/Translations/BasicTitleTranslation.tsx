import React from "react";
import {usePage} from "@inertiajs/react";
import {Box, Typography} from "@mui/material";
import Language from "@/models/language/Language";
import SettingProps from "@/Interfaces/SettingProps";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import BasicTranslationProps from "@/Interfaces/BasicTranslationProps";
import {Container} from "typedi";
import FormService from "@/Services/FormService/FormService";

//This component is used to generate only name fields for translation:

const BasicTitleTranslation: React.FC<BasicTranslationProps<any>> = ({
    methods,
    category,
    }) => {
    const {languages} = usePage().props.settings;
    const formService = Container.get(FormService);

    return (
        <Box>
            {
                languages.map((language, index) => (

                    <Box key={index}>
                        <ValidatedInput
                            controlName={formService.generateControllerName('translations') + language.code + '.name'}
                            name={language.code + '-name'}
                            id={language.code + '-name'}
                            label={`${language.name} ${category} Name`}
                            placeholder={`${language.name} ${category} Name`}
                            control={methods.control}
                        />
                    </Box>
                ))
            }
        </Box>
    );
}

export default BasicTitleTranslation;
