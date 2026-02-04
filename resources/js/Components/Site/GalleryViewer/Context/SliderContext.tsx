import React, {PropsWithChildren} from 'react';
import {number} from "zod";

// This context is responsible to control the slider (auto-play, zoom-in, zoom-out, ...etc).
interface SliderContextProps {
    controls: {
        autoplay: boolean;
        zoom: number; //true: zoom-in, false: zoom-out.
        mapIn: boolean; //True: map-in, false: map-out.
    },
    setControls:  React.Dispatch<React.SetStateAction<{autoplay: boolean, zoom: number, mapIn: boolean}>> | null,

    changeAutoPlay: () => void;
    zoomIn: () => void;
    zoomOut: () => void;

    changeMap: (value: boolean) => void;
}

const defaultValues: SliderContextProps = {
    controls: {
        autoplay: false,
        zoom: 1,
        mapIn: false,
    },
    setControls: null,
    changeAutoPlay: () => {},
    // changeZoom: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    changeMap: (value: boolean) => {},
}
const SliderContext = React.createContext(defaultValues);

const SliderProvider: React.FC<PropsWithChildren<{value: SliderContextProps}>> =
    ({children, value}) => (
        <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
    );

const useSliderContext = () => {
    const data = React.useContext(SliderContext);
    if (data === undefined){
        throw Error('Component should be inside the corresponding provider!');
    }

    return data;
}

export {useSliderContext, SliderProvider};
