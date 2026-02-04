<?php

namespace App\Enums;

use function PHPUnit\Framework\exactly;

enum ProjectTypeEnum: string
{
    case Apartment = 'Apartment';
    case Villa = 'Villa';
    case TownHouse = 'Town House';
    case VillaCompound = 'Villa Compound';
    case Land = 'Land';
    case Building = 'Building';
    case PentHouse = 'Pent House';
    case HotelApartment = 'Hotel Apartment';
    case Floor = 'Floor';
    case Office = 'Office';
    case Shop = 'Shop';
    case Warehouse = 'Warehouse';
    case LabourCamp = 'Labour Camp';
    case BulkUnit = 'Bulk Unit';
    case Factory = 'Factory';
    case IndustrialLand = 'Industrial Land';
    case MixedUsedLand = 'Mixed Used Land';
    case Showroom = 'Showroom';
    case OtherCommercial = 'Other Commercial';
}
