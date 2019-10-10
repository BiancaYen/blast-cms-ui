import React from 'react';

/* eslint-disable */
const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
        <defs>
            <path id="b" d="M0 0h283v60H0z" />
            <filter id="a" width="104.9%" height="123.3%" x="-2.5%" y="-8.3%" filterUnits="objectBoundingBox">
                <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0.196078431 0 0 0 0 0.196078431 0 0 0 0 0.196078431 0 0 0 0.1 0" />
            </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
            <g transform="translate(-20 -20)">
                <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                <use fill="#FFF" xlinkHref="#b" />
            </g>
            <path fill="#EDA91A" fillRule="nonzero" d="M12.053 1.106l8.264 16.528a2 2 0 0 1-1.79 2.894H2a2 2 0 0 1-1.789-2.894L8.475 1.106a2 2 0 0 1 3.578 0zm-1.81 6.046a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm0 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </g>
    </svg>
);

export default WarningIcon;
