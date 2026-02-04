<?php

namespace App\Enums;

enum MenuTypeEnum: string
{
//    Main Menu Types:
    case HOME = 'Home';
    case LIST = 'List';
    case FILE = 'File';
    case BLOCK = 'Block';

//    Social Menu Types:
    case SOCIAL = 'SOCIAL';

//    Contact Menu Types:
    case PHONE = 'Phone';
    case MOBILE = 'Mobile';
    case EMAIL = 'Email';
    case WHATSAPP = 'WhatsApp';
    case FAX = 'Fax';
    case BOX = 'Box';
}
