<?php

namespace App\Enums;

enum BlockCategoryEnum: string
{
    case MAIN_SECTION = "Main Section";
    case ABOUT = "About Us";
    case OUR_BOARD_OF_DIRECTORS = "Our Board Of Directors";
    case TURN_OUR_VISION_INTO_VALUE = "Turn Our Vision Into Value";
    case OUR_STORY = "Our Story";
    case OUR_MISSION = "Our Mission";
    case OUR_VISION = "Our Vision";
    case OUR_CREATIVE_TALENTS = "Our Creative Talents";
    case CONTACT = "Contact";
    case CITY = "Cities";
    case PRIVACY = "Privacy Policy";
    case CONDITION = "Conditions And Terms";
    case CAREER = "Careers";
    case TAG = "Tag";
    case TRIP = "Trip";

    case APPOINTMENT = "Appointment";

    case PACKAGE = "Package";
    case CALENDAR = "Calendar";

    case BLOG = "Blog";
}
