import React from 'react';

const ImageLayout: React.FC<{src: string, alt: string, classes: string}> = ({src, alt, classes}) => {
    const isSVGUrl = (url: string): boolean => {
        return url.toLowerCase().endsWith('.svg');
    }
    return (
        isSVGUrl(src || '') ? (
                <object className={classes} data={src || ''} type="image/svg+xml" width="100%" height="100%">
                    {/* Fallback if object fails */}
                    <img src={src || ''} width={'160px'} height={'160px'} alt="svg fallback" />
                </object>
            ) :
            <img
                src={src}
                alt={alt}
                className={classes}
            />
    );
};

export default ImageLayout;
