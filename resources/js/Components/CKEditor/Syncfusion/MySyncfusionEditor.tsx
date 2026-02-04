import {
    HtmlEditor, Image, Inject, Link, QuickToolbar,
    RichTextEditorComponent, Toolbar, ToolbarType, Count,
} from "@syncfusion/ej2-react-richtexteditor";
import "./styles.scss";
import React, {ChangeEvent, JSXElementConstructor, LabelHTMLAttributes, ReactElement, ReactNode, useRef} from "react";
import {InputLabel} from "@mui/material";

import {items, quickToolbarSettings, pasteCleanupSettings, iframeSetting, enableRtl} from "./config";
import {FieldError} from "react-hook-form";

interface ISyncfusionEditor {
    id: string;
    name: string;
    placeholder: string;
    inputRef: React.Ref<any>;
    value: string;
    onBlur: (event: string) => void;
    error: FieldError | undefined;
    label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null;
    languageCode?: string;
    maxLength?: number;
}

const MySyncfusionEditor: React.FC<ISyncfusionEditor> = ({
    id,
    name,
    value,
    onBlur,
    label,
    error,
    languageCode = 'en',
    maxLength = 100,
}) => {
    const richTextRef = useRef<RichTextEditorComponent | null>(null);
    //Rich Text Editor ToolbarSettings
    const toolbarSettings = {
        type: ToolbarType.MultiRow,
        items,
        enableFloating: false
    };

    React.useEffect(() => {
        const onRTBlur = (event: ChangeEvent) => {
            onBlur(richTextRef.current?.value || '');
        }
        richTextRef.current?.addEventListener('blur', onRTBlur);
    }, [richTextRef.current?.value]);

    return (
        <div className="py-[16px]">
            <InputLabel>{label}</InputLabel>
            <RichTextEditorComponent
                className="cke-box-shadow"
                height={450}
                id={id}
                name={name}
                // placeholder={placeholder}
                toolbarSettings={toolbarSettings}
                quickToolbarSettings={quickToolbarSettings}
                enableRtl={enableRtl(languageCode)}
                value={value}
                ref={richTextRef}
                iframeSettings={iframeSetting}
                pasteCleanupSettings={pasteCleanupSettings}
                showCharCount={true}
                maxLength={maxLength}
            >
                <Inject services={[HtmlEditor, Image, Link, QuickToolbar, Toolbar, Count]} />
            </RichTextEditorComponent>
        </div>
    )
};

export default MySyncfusionEditor;
