import React from 'react';
import TripProps from "@/Interfaces/Site/TripProps";

const NormalTrips: React.FC<{trips: TripProps []}> = ({trips}) => {
    return (
        <div>
            Trips
        </div>
    );
};

export default NormalTrips;
