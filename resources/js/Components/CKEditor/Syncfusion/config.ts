export const items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];

export const quickToolbarSettings: object = {
    image: ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
        'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension']
}

export const pasteCleanupSettings = {
    allowedStyleProps: ['background', 'background-color',
        'border', 'border-bottom', 'border-left', 'border-radius', 'border-right',
        'border-style', 'border-top', 'border-width',
        'clear', 'color', 'cursor', 'direction', 'display', 'float',
        'font', 'font-family', 'font-size', 'font-weight', 'font-style',
        'text-align', 'text-decoration', 'text-indent',
        'height', 'left', 'line-height', 'top', 'width',
        'margin', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom',
        'max-height', 'max-width', 'min-height', 'min-width',
        'overflow', 'overflow-x', 'overflow-y',
        'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top',
        'position', 'right', 'table-layout',
        'vertical-align', 'visibility', 'white-space'],
    deniedAttrs: ['class', 'title', 'id'],
    deniedTags: ['a'],
    keepFormat: false,
    plainText: false,
    prompt: true
};

export const iframeSetting: object = { enable: true };

const rtlCodeArray = ['ar'];

export const enableRtl = (code: string) => rtlCodeArray.includes(code);
