import React from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AddressComponent,
    PlusCode,
    Location,
    Coordinates,
    MapResponse
} from "@/Interfaces/Site/MapResponse/MapResponse";
import MapService from "@/Services/MapService/MapService";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";

const mapService = ServiceContainer.get(MapService);

const initialState: Location = {
    coordinates: null,
    results: [] as {address_components: AddressComponent [], formatted_address: string} [],
    plus_code: {
        compound_code: '',
        global_code: '',
    } as PlusCode,
}

const MapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<MapResponse>) => {
            return {...state, results: action.payload.results, plus_code: action.payload.plus_code};
        },

        setCoordinates: (state, action: PayloadAction<Coordinates>) => {
            state.coordinates = action.payload;
        },

        setAll: (state, action: PayloadAction<Location>) => {
            return {...state,
                coordinates: action.payload.coordinates,
                results: action.payload.results,
                plus_code: action.payload.plus_code,
            }
        }
    },
});

export const {
    setLocation,
    setCoordinates,
    setAll,
} = MapSlice.actions;

export default MapSlice.reducer;
