import React from 'react';
import GoogleMapReact from "google-map-react";
import styles from "./styles.module.scss";
import {
    Box,
} from "@mui/material";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import MapService from "@/Services/MapService/MapService";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {red} from "@mui/material/colors";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {setAll} from "@/Redux/Reducers/MapSlice/MapSlice";

const GoogleMap = () => {
    const {coordinates} = useAppSelector(state => state.map);
    const dispatch = useAppDispatch();
    const mapService = ServiceContainer.get(MapService);

    const handleCoordinationChanges = (lat: number, lng: number) => {
        mapService.getLocationData(lng, lat)
            .then((response) => {
                dispatch(setAll({
                    ...response.data,
                    coordinates: {lat, lng},
                }))
            }).catch((error) => console.log(error));
    }

    return (
        <Box className={styles.mapContainer}>
            {
                coordinates && <GoogleMapReact
                    bootstrapURLKeys={{key: import.meta.env.VITE_GOOGLE_MAP}}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={14}
                    margin={[50, 50, 50, 50]}
                    options={''}
                    onClick={ ({lat, lng}) =>  handleCoordinationChanges(lat, lng)}
                >
                    <LocationOnIcon sx={{color: red[400], transform: 'translate(-50%, -50%)'}} fontSize="large"></LocationOnIcon>
                </GoogleMapReact>
            }
        </Box>

    );
};

export default GoogleMap;
