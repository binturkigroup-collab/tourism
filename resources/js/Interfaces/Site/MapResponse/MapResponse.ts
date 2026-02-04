export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string [];
}

export interface PlusCode {
    compound_code: string;
    global_code: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface MapResponse {
    results: {address_components: AddressComponent [], formatted_address: string } [];
    plus_code: PlusCode;
}

export interface Location {
    coordinates: Coordinates | null;
    results: {address_components: AddressComponent [], formatted_address: string } [];
    plus_code: PlusCode;
}


