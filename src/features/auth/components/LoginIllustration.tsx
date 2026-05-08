import { Box } from "@mui/material";

export function LoginIllustration() {
    return (
        <Box
            aria-hidden="true"
            component="svg"
            viewBox="0 0 760 860"
            preserveAspectRatio="xMidYMid slice"
            sx={{
                position: "relative",
                display: { xs: "none", md: "block" },
                width: "100%",
                minHeight: "100dvh",
                borderRadius: 0,
                overflow: "hidden",
            }}
        >
            <defs>
                <linearGradient id="isp-bg" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#dff7ff" />
                    <stop offset="45%" stopColor="#a9e2f6" />
                    <stop offset="100%" stopColor="#0b9ed3" />
                </linearGradient>
                <linearGradient id="router" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#c8effb" />
                </linearGradient>
                <filter id="soft-shadow" colorInterpolationFilters="sRGB">
                    <feDropShadow
                        dx="0"
                        dy="20"
                        stdDeviation="18"
                        floodColor="#005a8c"
                        floodOpacity="0.22"
                    />
                </filter>
                <pattern
                    id="wave-lines"
                    width="34"
                    height="34"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(-18)"
                >
                    <path
                        d="M 0 17 C 9 5 25 5 34 17"
                        fill="none"
                        stroke="#49b7e4"
                        strokeOpacity="0.35"
                        strokeWidth="2"
                    />
                </pattern>
            </defs>

            <rect width="760" height="860" fill="url(#isp-bg)" />
            <rect
                width="760"
                height="360"
                fill="url(#wave-lines)"
                opacity="0.75"
            />
            <path
                d="M0 704 C128 640 214 742 342 686 C482 624 565 560 760 622 L760 860 L0 860 Z"
                fill="#ffffff"
                opacity="0.88"
            />
            <path
                d="M-42 172 C68 110 151 118 255 170 C363 224 458 218 562 152 C641 101 694 88 808 114"
                fill="none"
                stroke="#70c9eb"
                strokeOpacity="0.45"
                strokeWidth="5"
            />

            <g filter="url(#soft-shadow)">
                <circle cx="506" cy="326" r="204" fill="#f8fbfd" />
                <path
                    d="M326 418 A204 204 0 0 1 686 238"
                    fill="none"
                    stroke="url(#gauge-ring)"
                    strokeLinecap="round"
                    strokeWidth="38"
                />
                <path
                    d="M505 326 L625 230"
                    stroke="#0060a8"
                    strokeLinecap="round"
                    strokeWidth="24"
                />
                <circle cx="505" cy="326" r="44" fill="#d3f3ff" />
                <circle cx="505" cy="326" r="17" fill="#0060a8" />
                {[
                    [506, 162, 506, 203],
                    [421, 184, 442, 220],
                    [359, 244, 396, 265],
                    [337, 326, 377, 326],
                    [360, 409, 396, 388],
                    [421, 470, 442, 433],
                    [506, 491, 506, 451],
                    [588, 470, 568, 433],
                    [650, 409, 614, 388],
                    [674, 326, 634, 326],
                    [650, 244, 614, 265],
                    [588, 184, 568, 220],
                ].map(([x1, y1, x2, y2], index) => (
                    <line
                        key={index}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#006bb6"
                        strokeLinecap="round"
                        strokeOpacity="0.74"
                        strokeWidth="12"
                    />
                ))}
            </g>

            <g filter="url(#soft-shadow)">
                <rect
                    x="76"
                    y="415"
                    width="260"
                    height="126"
                    rx="24"
                    fill="url(#router)"
                    stroke="#006bb6"
                    strokeWidth="6"
                />
                <path
                    d="M128 415 L128 348 M284 415 L284 348"
                    stroke="#006bb6"
                    strokeLinecap="round"
                    strokeWidth="8"
                />
                <circle
                    cx="136"
                    cy="478"
                    r="19"
                    fill="#c9f2ff"
                    stroke="#006bb6"
                    strokeWidth="6"
                />
                <path
                    d="M186 479 L218 479 M238 479 L270 479"
                    stroke="#006bb6"
                    strokeLinecap="round"
                    strokeWidth="8"
                />
                <circle cx="300" cy="479" r="9" fill="#8cc63f" />
                <path
                    d="M153 332 C184 301 226 301 257 332 M174 360 C191 344 219 344 236 360"
                    fill="none"
                    stroke="#006bb6"
                    strokeLinecap="round"
                    strokeWidth="8"
                />
            </g>

            <g
                fill="none"
                stroke="#006bb6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
                opacity="0.78"
            >
                <path d="M116 274 L116 230 L154 198 L192 230 L192 274 Z" />
                <path d="M145 274 L145 240 L163 240 L163 274" />
                <path d="M100 209 C127 184 181 184 208 209" />
                <path d="M88 640 L88 564 M88 564 C111 535 153 535 176 564 M88 564 C65 535 23 535 0 564" />
                <path d="M623 558 L684 558 L684 618 L623 618 Z" />
                <path d="M653 558 L653 618 M623 588 L684 588" />
                <path d="M704 572 C733 550 765 550 794 572 M718 599 C738 584 760 584 780 599" />
            </g>

            <g filter="url(#soft-shadow)">
                <rect
                    x="126"
                    y="636"
                    width="218"
                    height="132"
                    rx="20"
                    fill="#ffffff"
                />
                <rect
                    x="154"
                    y="674"
                    width="30"
                    height="58"
                    rx="8"
                    fill="#d9f5ff"
                />
                <rect
                    x="204"
                    y="649"
                    width="30"
                    height="83"
                    rx="8"
                    fill="#9adbf5"
                />
                <rect
                    x="254"
                    y="615"
                    width="30"
                    height="117"
                    rx="8"
                    fill="#006bb6"
                />
                <path
                    d="M144 744 L304 744"
                    stroke="#073e73"
                    strokeLinecap="round"
                    strokeWidth="7"
                />
                <circle cx="310" cy="662" r="28" fill="#f6c400" />
                <path
                    d="M310 640 L310 684 M288 662 L332 662"
                    stroke="#006bb6"
                    strokeLinecap="round"
                    strokeWidth="6"
                />
            </g>

            <g filter="url(#soft-shadow)">
                <rect
                    x="458"
                    y="640"
                    width="178"
                    height="104"
                    rx="20"
                    fill="#ffffff"
                />
                <path
                    d="M498 710 C528 672 568 672 598 710"
                    fill="none"
                    stroke="#006bb6"
                    strokeLinecap="round"
                    strokeWidth="16"
                />
                <path
                    d="M522 710 C538 692 558 692 574 710"
                    fill="none"
                    stroke="#00a9e8"
                    strokeLinecap="round"
                    strokeWidth="13"
                />
                <circle cx="548" cy="714" r="10" fill="#8cc63f" />
            </g>

            <g stroke="#006bb6" strokeLinecap="round" strokeWidth="5">
                <path
                    d="M235 542 C277 582 335 600 410 589"
                    fill="none"
                    strokeDasharray="10 16"
                />
                <path
                    d="M525 530 C482 584 477 612 547 640"
                    fill="none"
                    strokeDasharray="10 16"
                />
                <circle cx="235" cy="542" r="10" fill="#ffffff" />
                <circle cx="410" cy="589" r="10" fill="#ffffff" />
                <circle cx="525" cy="530" r="10" fill="#ffffff" />
            </g>

            <text
                x="90"
                y="130"
                fill="#005aa8"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="46"
                fontWeight="800"
            >
                Fast Internet
            </text>
            <text
                x="92"
                y="174"
                fill="#4f7f98"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="22"
                fontWeight="600"
            >
                stable connection for every device
            </text>
        </Box>
    );
}
