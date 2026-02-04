import React from "react";
import {usePage} from "@inertiajs/react";
import {Box, Typography} from "@mui/material";
import Language from "@/models/language/Language";
import SettingProps from "@/Interfaces/SettingProps";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import ValidatedTextEditor from "@/Components/ValidatedComponents/ValidatedTextEditor";
import BasicTranslationProps from "@/Interfaces/BasicTranslationProps";
import {Container} from "typedi";
import FormService from "@/Services/FormService/FormService";

//This component is used to generate name and description fields for translation:

const BasicTranslation: React.FC<BasicTranslationProps<any>> = ({
    methods,
    category,
    maxLength = 2000,
    withDetails = true,
    withBrief = true,
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

                        {withBrief && <ValidatedTextEditor
                            controlName={formService.generateControllerName('translations') + language.code + '.brief'}
                            methods={methods}
                            name={language.code + '-brief'}
                            id={language.code + '-brief'}
                            label={`${language.name} ${category} Brief`}
                            placeholder={`${language.name} ${category} Brief`}
                            control={methods.control}
                            multiline={true}
                            rows={4}
                            languageCode={language.code}
                            maxLength={maxLength}
                        />}

                        {withDetails && <ValidatedTextEditor
                            controlName={formService.generateControllerName('translations') + language.code + '.description'}
                            methods={methods}
                            name={language.code + '-description'}
                            id={language.code + '-description'}
                            label={`${language.name} ${category} Description`}
                            placeholder={`${language.name} ${category} Description`}
                            control={methods.control}
                            multiline={true}
                            rows={4}
                            languageCode={language.code}
                            maxLength={maxLength}
                        />}

                    </Box>
                    )
                )
            }
        </Box>
    );
}

export default BasicTranslation;
