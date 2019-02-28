import React from "react";

const SearchIcon = () => (
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

        <defs>
            <path d="M19.9900125,18.7425 L14.8464419,13.5925 C16.0049938,12.1575 16.6991261,10.335 16.6991261,8.35 C16.701623,3.7475 12.9588015,0 8.35955056,0 C3.75780275,0 0.0149812734,3.7475 0.0149812734,8.3525 C0.0149812734,12.9575 3.75780275,16.705 8.35705368,16.705 C10.3370787,16.705 12.1598002,16.01 13.5930087,14.85 L18.7365793,20 L19.9900125,18.7425 Z M8.35955056,14.9275 C4.73907615,14.9275 1.79275905,11.9775 1.79275905,8.3525 C1.79275905,4.7275 4.73907615,1.7775 8.35955056,1.7775 C11.980025,1.7775 14.9263421,4.7275 14.9263421,8.3525 C14.9263421,11.9775 11.980025,14.9275 8.35955056,14.9275 Z M2.85642946,7.9975 L4.63171036,7.9975 C4.63171036,6.135 6.14481898,4.62 8.00499376,4.62 L8.00499376,2.8425 C5.16604245,2.8425 2.85642946,5.155 2.85642946,7.9975 Z" id="path-1"></path>
        </defs>
        <g id="Layout" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Home" transform="translate(-758.000000, -20.000000)">
                <g id="Icon/Search" transform="translate(758.000000, 20.000000)">
                    <mask id="mask-2" fill="white">
                        <use xlinkHref="#path-1"></use>
                    </mask>
                    <g id="search" fillRule="nonzero"></g>
                    <g id="Color/Black" mask="url(#mask-2)" fill="#444444" fillRule="evenodd">
                        <rect id="Base" x="0" y="0" width="20" height="20"></rect>
                    </g>
                </g>
            </g>
        </g>
    </svg >
);

// export default React.memo(PlusIcon);
export default SearchIcon;