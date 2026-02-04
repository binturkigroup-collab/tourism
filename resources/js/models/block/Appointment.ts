class Appointment {
    id: number;
    blockId: number;
    trip: string;
    startDate: string;
    maxGuests: string;
    minAge: string;
    availableSpots: string;
    isActive: boolean;

    constructor({
                    id = -1,
        blockId = -1,
                    trip = '',
                    startDate = '',
                    isActive = false,
                    maxGuests = '0',
                    minAge = '0',
                    availableSpots = '0',
                }) {
        this.id = id;
        this.blockId = blockId;
        this.trip = trip;
        this.startDate = startDate;
        this.maxGuests = maxGuests;
        this.minAge = minAge;
        this.availableSpots = availableSpots;
        this.isActive = isActive;

    }
}

export default Appointment;
