export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const ROLE = "role";

export const HOME_PATH = "/";
export const SIGN_IN_PATH = "/sign-in";
export const INVESTOR_SIGN_UP_PATH = "/sign-up";
export const LOG_OUT_PATH = "/logout";
export const BUSINESS_REGISTER_PATH = "/business-register";
export const EXPLORATION_PAGE_PATH = "/explore";
export const INVESTOR_PROFILE_PATH = "/investor-profile";
export const BUSINESS_PROFILE_PATH = "/business-profile";
export const NOT_AUTH_PATH = "/not-authorized";
export const NOT_FOUND_PATH = "*";
export const PASSWORD_REQUEST = "/password/request";
export const PASSWORD_RESET = "/password/reset/:token";

export const REFRESH_API = "/api/token/refresh/";
export const SIGN_IN_API = "/api/login/";
export const BUSINESS_CARD_API = "/api/business/card/";
export const BUSINESS_REGISTER_API = "/api/business/register/";
export const INVESTOR_REGISTER_API = "/api/investor/register/";
export const INVEST_API = "/api/invest/";
export const INVESTOR_PROFILE_API = "/api/investor/profile/";
export const INVESTOR_PROFILE_UPDATE_API = "/api/investor/update/";
export const INVESTOR_INVESTMENT_API = "/api/investor/investment/";
export const BUSINESS_PROFILE_API = "/api/business/profile/";
export const BUSINESS_INVESTMENT_API = "/api/business/fundraise/";

export const PASSWORD_REQUEST_API = "/api/password/request/";
export const PASSWORD_RESET_API = "/api/password/reset/";

export const COUNTRY_CHOICES = [
    ['AF', 'Afghanistan'],
    ['AL', 'Albania'],
    ['DZ', 'Algeria'],
    ['AS', 'American Samoa'],
    ['AD', 'Andorra'],
    ['AO', 'Angola'],
    ['AI', 'Anguilla'],
    ['AQ', 'Antarctica'],
    ['AG', 'Antigua and Barbuda'],
    ['AR', 'Argentina'],
    ['AM', 'Armenia'],
    ['AW', 'Aruba'],
    ['AU', 'Australia'],
    ['AT', 'Austria'],
    ['AZ', 'Azerbaijan'],
    ['BS', 'Bahamas'],
    ['BH', 'Bahrain'],
    ['BD', 'Bangladesh'],
    ['BB', 'Barbados'],
    ['BY', 'Belarus'],
    ['BE', 'Belgium'],
    ['BZ', 'Belize'],
    ['BJ', 'Benin'],
    ['BM', 'Bermuda'],
    ['BT', 'Bhutan'],
    ['BO', 'Bolivia'],
    ['BA', 'Bosnia and Herzegovina'],
    ['BW', 'Botswana'],
    ['BV', 'Bouvet Island'],
    ['BR', 'Brazil'],
    ['IO', 'British Indian Ocean Territory'],
    ['BN', 'Brunei Darussalam'],
    ['BG', 'Bulgaria'],
    ['BF', 'Burkina Faso'],
    ['BI', 'Burundi'],
    ['CV', 'Cabo Verde'],
    ['KH', 'Cambodia'],
    ['CM', 'Cameroon'],
    ['CA', 'Canada'],
    ['KY', 'Cayman Islands'],
    ['CF', 'Central African Republic'],
    ['TD', 'Chad'],
    ['CL', 'Chile'],
    ['CN', 'China'],
    ['CX', 'Christmas Island'],
    ['CC', 'Cocos (Keeling) Islands'],
    ['CO', 'Colombia'],
    ['KM', 'Comoros'],
    ['CG', 'Congo'],
    ['CD', 'Congo, Democratic Republic of the'],
    ['CK', 'Cook Islands'],
    ['CR', 'Costa Rica'],
    ['CI', "Côte d’Ivoire"],
    ['HR', 'Croatia'],
    ['CU', 'Cuba'],
    ['CY', 'Cyprus'],
    ['CZ', 'Czech Republic'],
    ['DK', 'Denmark'],
    ['DJ', 'Djibouti'],
    ['DM', 'Dominica'],
    ['DO', 'Dominican Republic'],
    ['EC', 'Ecuador'],
    ['EG', 'Egypt'],
    ['SV', 'El Salvador'],
    ['GQ', 'Equatorial Guinea'],
    ['ER', 'Eritrea'],
    ['EE', 'Estonia'],
    ['SZ', 'Eswatini'],
    ['ET', 'Ethiopia'],
    ['FK', 'Falkland Islands (Malvinas)'],
    ['FO', 'Faroe Islands'],
    ['FJ', 'Fiji'],
    ['FI', 'Finland'],
    ['FR', 'France'],
    ['GF', 'French Guiana'],
    ['PF', 'French Polynesia'],
    ['TF', 'French Southern Territories'],
    ['GA', 'Gabon'],
    ['GM', 'Gambia'],
    ['GE', 'Georgia'],
    ['DE', 'Germany'],
    ['GH', 'Ghana'],
    ['GI', 'Gibraltar'],
    ['GR', 'Greece'],
    ['GL', 'Greenland'],
    ['GD', 'Grenada'],
    ['GP', 'Guadeloupe'],
    ['GU', 'Guam'],
    ['GT', 'Guatemala'],
    ['GG', 'Guernsey'],
    ['GN', 'Guinea'],
    ['GW', 'Guinea-Bissau'],
    ['GY', 'Guyana'],
    ['HT', 'Haiti'],
    ['HM', 'Heard Island and McDonald Islands'],
    ['VA', 'Holy See'],
    ['HN', 'Honduras'],
    ['HK', 'Hong Kong'],
    ['HU', 'Hungary'],
    ['IS', 'Iceland'],
    ['IN', 'India'],
    ['ID', 'Indonesia'],
    ['IR', 'Iran (Islamic Republic of)'],
    ['IQ', 'Iraq'],
    ['IE', 'Ireland'],
    ['IM', 'Isle of Man'],
    ['IL', 'Israel'],
    ['IT', 'Italy'],
    ['JM', 'Jamaica'],
    ['JP', 'Japan'],
    ['JE', 'Jersey'],
    ['JO', 'Jordan'],
    ['KZ', 'Kazakhstan'],
    ['KE', 'Kenya'],
    ['KI', 'Kiribati'],
    ['KP', 'Korea (Democratic People\'s Republic of)'],
    ['KR', 'Korea (Republic of)'],
    ['KW', 'Kuwait'],
    ['KG', 'Kyrgyzstan'],
    ['LA', 'Lao People\'s Democratic Republic'],
    ['LV', 'Latvia'],
    ['LB', 'Lebanon'],
    ['LS', 'Lesotho'],
    ['LR', 'Liberia'],
    ['LY', 'Libya'],
    ['LI', 'Liechtenstein'],
    ['LT', 'Lithuania'],
    ['LU', 'Luxembourg'],
    ['MO', 'Macao'],
    ['MG', 'Madagascar'],
    ['MW', 'Malawi'],
    ['MY', 'Malaysia'],
    ['MV', 'Maldives'],
    ['ML', 'Mali'],
    ['MT', 'Malta'],
    ['MH', 'Marshall Islands'],
    ['MQ', 'Martinique'],
    ['MR', 'Mauritania'],
    ['MU', 'Mauritius'],
    ['YT', 'Mayotte'],
    ['MX', 'Mexico'],
    ['FM', 'Micronesia (Federated States of)'],
    ['MD', 'Moldova (Republic of)'],
    ['MC', 'Monaco'],
    ['MN', 'Mongolia'],
    ['ME', 'Montenegro'],
    ['MS', 'Montserrat'],
    ['MA', 'Morocco'],
    ['MZ', 'Mozambique'],
    ['MM', 'Myanmar'],
    ['NA', 'Namibia'],
    ['NR', 'Nauru'],
    ['NP', 'Nepal'],
    ['NL', 'Netherlands'],
    ['NC', 'New Caledonia'],
    ['NZ', 'New Zealand'],
    ['NI', 'Nicaragua'],
    ['NE', 'Niger'],
    ['NG', 'Nigeria'],
    ['NU', 'Niue'],
    ['NF', 'Norfolk Island'],
    ['MK', 'North Macedonia'],
    ['NO', 'Norway'],
    ['OM', 'Oman'],
    ['PK', 'Pakistan'],
    ['PW', 'Palau'],
    ['PS', 'Palestine, State of'],
    ['PA', 'Panama'],
    ['PG', 'Papua New Guinea'],
    ['PY', 'Paraguay'],
    ['PE', 'Peru'],
    ['PH', 'Philippines'],
    ['PN', 'Pitcairn'],
    ['PL', 'Poland'],
    ['PT', 'Portugal'],
    ['PR', 'Puerto Rico'],
    ['QA', 'Qatar'],
    ['RO', 'Romania'],
    ['RU', 'Russian Federation'],
    ['RW', 'Rwanda'],
    ['RE', 'Réunion'],
    ['BL', 'Saint Barthélemy'],
    ['SH', 'Saint Helena, Ascension and Tristan da Cunha'],
    ['KN', 'Saint Kitts and Nevis'],
    ['LC', 'Saint Lucia'],
    ['MF', 'Saint Martin (French part)'],
    ['PM', 'Saint Pierre and Miquelon'],
    ['VC', 'Saint Vincent and the Grenadines'],
    ['WS', 'Samoa'],
    ['SM', 'San Marino'],
    ['ST', 'Sao Tome and Principe'],
    ['SA', 'Saudi Arabia'],
    ['SN', 'Senegal'],
    ['RS', 'Serbia'],
    ['SC', 'Seychelles'],
    ['SL', 'Sierra Leone'],
    ['SG', 'Singapore'],
    ['SX', 'Sint Maarten (Dutch part)'],
    ['SK', 'Slovakia'],
    ['SI', 'Slovenia'],
    ['SB', 'Solomon Islands'],
    ['SO', 'Somalia'],
    ['ZA', 'South Africa'],
    ['GS', 'South Georgia and the South Sandwich Islands'],
    ['SS', 'South Sudan'],
    ['ES', 'Spain'],
    ['LK', 'Sri Lanka'],
    ['SD', 'Sudan'],
    ['SR', 'Suriname'],
    ['SJ', 'Svalbard and Jan Mayen'],
    ['SE', 'Sweden'],
    ['CH', 'Switzerland'],
    ['SY', 'Syrian Arab Republic'],
    ['TW', 'Taiwan, Province of China'],
    ['TJ', 'Tajikistan'],
    ['TZ', 'Tanzania, United Republic of'],
    ['TH', 'Thailand'],
    ['TL', 'Timor-Leste'],
    ['TG', 'Togo'],
    ['TK', 'Tokelau'],
    ['TO', 'Tonga'],
    ['TT', 'Trinidad and Tobago'],
    ['TN', 'Tunisia'],
    ['TR', 'Turkey'],
    ['TM', 'Turkmenistan'],
    ['TC', 'Turks and Caicos Islands'],
    ['TV', 'Tuvalu'],
    ['UG', 'Uganda'],
    ['UA', 'Ukraine'],
    ['AE', 'United Arab Emirates'],
    ['GB', 'United Kingdom'],
    ['US', 'United States'],
    ['UM', 'United States Minor Outlying Islands'],
    ['UY', 'Uruguay'],
    ['UZ', 'Uzbekistan'],
    ['VU', 'Vanuatu'],
    ['VE', 'Venezuela (Bolivarian Republic of)'],
    ['VN', 'Viet Nam'],
    ['VG', 'Virgin Islands (British)'],
    ['VI', 'Virgin Islands (U.S.)'],
    ['WF', 'Wallis and Futuna'],
    ['EH', 'Western Sahara'],
    ['YE', 'Yemen'],
    ['ZM', 'Zambia'],
    ['ZW', 'Zimbabwe'],
];
