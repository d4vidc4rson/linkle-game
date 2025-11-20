// @ts-nocheck
import React from 'react';

export const AchievementIcon = (props) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200" 
      fill="none" 
      {...props}
    >
      {/* Shadow layer - same as avatar */}
      <path 
        d="M160 50.5C176.569 50.5 190 63.9315 190 80.5V130.5C190 158.115 167.615 180.5 140 180.5H60C43.4315 180.5 30 167.069 30 150.5V100.5C30 72.8858 52.3858 50.5 80 50.5H160Z" 
        fill="#2D2A32"
      />
      
      {/* Badge background - same as avatar */}
      <path 
        d="M150 40.5C166.569 40.5 180 53.9315 180 70.5V120.5C180 148.115 157.615 170.5 130 170.5H50C33.4315 170.5 20 157.069 20 140.5V90.5C20 62.8858 42.3858 40.5 70 40.5H150Z" 
        fill="#b3a7fe" 
        stroke="#2E2E2E" 
        strokeWidth="6"
      />
      
      {/* Gold Star - scaled and centered */}
      <path 
        d="M100 65L112.5 92.5L140 98L117.5 115L125 145L100 128L75 145L82.5 115L60 98L87.5 92.5L100 65Z" 
        fill="#FFD93D"
        stroke="#2E2E2E"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      
      {/* Star accent line */}
      <path 
        d="M108 85L112 95" 
        stroke="#2E2E2E" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
    </svg>
);

export const ThemeToggleIcon = ({ theme, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" {...props}>
        {/* Light mode square */}
        <rect x="1" y="8" width="10" height="10" rx="2" fill="#E9E2FF" />

        {/* Dark mode square */}
        <rect x="15" y="8" width="10" height="10" rx="2" fill="#2E2E2E" />

        {/* Active state outline */}
        <rect 
            x={theme === 'light' ? 0.5 : 14.5} 
            y="7.5" 
            width="11" 
            height="11" 
            rx="2.5" 
            stroke="var(--primary-text)" 
            strokeWidth="1"
            style={{ transition: 'x 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
    </svg>
);

export const TitleGraphic = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 192 67.499998"
        preserveAspectRatio="xMidYMid meet"
    >
        <defs>
        <clipPath id="d680647aad">
            <path d="M 0.707031 0 L 191.292969 0 L 191.292969 67.003906 L 0.707031 67.003906 Z M 0.707031 0 " clipRule="nonzero"/>
        </clipPath>
        <clipPath id="b7aacdb2ec">
            <path d="M 50 0 L 87 0 L 87 62 L 50 62 Z M 50 0 " clipRule="nonzero"/>
        </clipPath>
        <clipPath id="7c4f6738fa">
            <path d="M 158 0 L 191.292969 0 L 191.292969 62 L 158 62 Z M 158 0 " clipRule="nonzero"/>
        </clipPath>
        <clipPath id="7b432968d9">
            <rect x="0" width="192" y="0" height="68"/>
        </clipPath>
        </defs>
        <g clipPath="url(#d680647aad)">
        <g transform="matrix(1, 0, 0, 1, 0.000000000000000111, 0)">
            <g clipPath="url(#7b432968d9)">
            <g fill="currentColor" fillOpacity="1">
                <g transform="translate(-0.356723, 61.211963)">
                <g>
                    <path d="M 31.25 0 L 3.328125 0 C 2.210938 0 1.65625 -0.597656 1.65625 -1.796875 L 1.65625 -58.78125 C 1.65625 -60.007812 2.210938 -60.625 3.328125 -60.625 L 15.796875 -60.625 C 16.878906 -60.625 17.421875 -60.007812 17.421875 -58.78125 L 17.421875 -14.1875 L 31.25 -14.1875 C 31.75 -14.1875 32.082031 -14.046875 32.25 -13.765625 C 32.425781 -13.484375 32.515625 -13.050781 32.515625 -12.46875 L 32.515625 -1.796875 C 32.515625 -1.210938 32.425781 -0.765625 32.25 -0.453125 C 32.082031 -0.148438 31.75 0 31.25 0 Z M 31.25 0 "/>
                </g>
                </g>
            </g>
            <g fill="currentColor" fillOpacity="1">
                <g transform="translate(31.431942, 61.211963)">
                <g>
                    <path d="M 17.421875 -58.78125 L 17.421875 -1.796875 C 17.421875 -0.597656 16.878906 0 15.796875 0 L 3.328125 0 C 2.210938 0 1.65625 -0.597656 1.65625 -1.796875 L 1.65625 -58.78125 C 1.65625 -60.007812 2.210938 -60.625 3.328125 -60.625 L 15.796875 -60.625 C 16.878906 -60.625 17.421875 -60.007812 17.421875 -58.78125 Z M 17.421875 -58.78125 "/>
                </g>
                </g>
            </g>
            <g clipPath="url(#b7aacdb2ec)">
                <g fill="currentColor" fillOpacity="1">
                <g transform="translate(49.302937, 61.211963)">
                    <g>
                    <path d="M 35.71875 0 L 23.015625 0 C 22.578125 0 22.210938 -0.1875 21.921875 -0.5625 C 21.628906 -0.945312 21.484375 -1.375 21.484375 -1.84375 L 21.484375 -44.46875 C 21.484375 -45.195312 21.34375 -45.867188 21.0625 -46.484375 C 20.789062 -47.097656 20.234375 -47.40625 19.390625 -47.40625 C 18.546875 -47.40625 17.976562 -47.097656 17.6875 -46.484375 C 17.394531 -45.867188 17.25 -45.195312 17.25 -44.46875 L 17.25 -1.84375 C 17.25 -1.34375 17.160156 -0.910156 16.984375 -0.546875 C 16.804688 -0.179688 16.425781 0 15.84375 0 L 2.671875 0 C 2.347656 0 2.066406 -0.1875 1.828125 -0.5625 C 1.597656 -0.945312 1.484375 -1.375 1.484375 -1.84375 L 1.484375 -45.390625 C 1.484375 -47.640625 1.960938 -49.75 2.921875 -51.71875 C 3.890625 -53.6875 5.203125 -55.414062 6.859375 -56.90625 C 8.523438 -58.394531 10.429688 -59.550781 12.578125 -60.375 C 14.722656 -61.207031 16.976562 -61.625 19.34375 -61.625 C 21.707031 -61.625 23.96875 -61.207031 26.125 -60.375 C 28.289062 -59.550781 30.203125 -58.394531 31.859375 -56.90625 C 33.523438 -55.414062 34.835938 -53.6875 35.796875 -51.71875 C 36.765625 -49.75 37.25 -47.640625 37.25 -45.390625 L 37.25 -1.84375 C 37.25 -1.375 37.113281 -0.945312 36.84375 -0.5625 C 36.582031 -0.1875 36.207031 0 35.71875 0 Z M 35.71875 0 "/>
                    </g>
                </g>
                </g>
            </g>
            <g fill="currentColor" fillOpacity="1">
                <g transform="translate(86.781217, 61.211963)">
                <g>
                    <path d="M 31.171875 -30.765625 C 33.472656 -28.722656 35.265625 -26.265625 36.546875 -23.390625 C 37.828125 -20.515625 38.46875 -17.253906 38.46875 -13.609375 L 38.46875 -2.09375 C 38.46875 -1.65625 38.335938 -1.195312 38.078125 -0.71875 C 37.816406 -0.238281 37.347656 0 36.671875 0 L 25.125 0 C 24.507812 0 23.953125 -0.195312 23.453125 -0.59375 C 22.960938 -0.988281 22.71875 -1.550781 22.71875 -2.28125 L 22.71875 -11.6875 C 22.71875 -13.550781 22.578125 -15.21875 22.296875 -16.6875 C 22.023438 -18.164062 21.507812 -19.414062 20.75 -20.4375 C 19.988281 -21.457031 18.878906 -22.171875 17.421875 -22.578125 L 17.421875 -1.796875 C 17.421875 -0.597656 16.878906 0 15.796875 0 L 3.328125 0 C 2.210938 0 1.65625 -0.597656 1.65625 -1.796875 L 1.65625 -58.78125 C 1.65625 -60.007812 2.210938 -60.625 3.328125 -60.625 L 15.796875 -60.625 C 16.878906 -60.625 17.421875 -60.007812 17.421875 -58.78125 L 17.421875 -38.34375 C 19.234375 -39.101562 20.421875 -40.414062 20.984375 -42.28125 C 21.554688 -44.144531 21.84375 -46.363281 21.84375 -48.9375 L 21.84375 -58.34375 C 21.84375 -59.101562 22.085938 -59.671875 22.578125 -60.046875 C 23.078125 -60.429688 23.648438 -60.625 24.296875 -60.625 L 35.796875 -60.625 C 36.472656 -60.625 36.941406 -60.378906 37.203125 -59.890625 C 37.460938 -59.410156 37.59375 -58.953125 37.59375 -58.515625 L 37.59375 -47.015625 C 37.59375 -43.628906 37.023438 -40.570312 35.890625 -37.84375 C 34.753906 -35.113281 33.179688 -32.753906 31.171875 -30.765625 Z M 31.171875 -30.765625 "/>
                </g>
                </g>
            </g>
            <g fill="currentColor" fillOpacity="1">
                <g transform="translate(125.222354, 61.211963)">
                <g>
                    <path d="M 31.25 0 L 3.328125 0 C 2.210938 0 1.65625 -0.597656 1.65625 -1.796875 L 1.65625 -58.78125 C 1.65625 -60.007812 2.210938 -60.625 3.328125 -60.625 L 15.796875 -60.625 C 16.878906 -60.625 17.421875 -60.007812 17.421875 -58.78125 L 17.421875 -14.1875 L 31.25 -14.1875 C 31.75 -14.1875 32.082031 -14.046875 32.25 -13.765625 C 32.425781 -13.484375 32.515625 -13.050781 32.515625 -12.46875 L 32.515625 -1.796875 C 32.515625 -1.210938 32.425781 -0.765625 32.25 -0.453125 C 32.082031 -0.148438 31.75 0 31.25 0 Z M 31.25 0 "/>
                </g>
                </g>
            </g>
            <g clipPath="url(#7c4f6738fa)">
                <g fill="currentColor" fillOpacity="1">
                <g transform="translate(157.011019, 61.211963)">
                    <g>
                    <path d="M 17.421875 -14.1875 L 32.78125 -14.1875 C 33.6875 -14.1875 34.140625 -13.613281 34.140625 -12.46875 L 34.140625 -1.703125 C 34.140625 -0.566406 33.6875 0 32.78125 0 L 3.328125 0 C 2.210938 0 1.65625 -0.597656 1.65625 -1.796875 L 1.65625 -58.78125 C 1.65625 -60.007812 2.210938 -60.625 3.328125 -60.625 L 32.4375 -60.625 C 33.28125 -60.625 33.703125 -60.007812 33.703125 -58.78125 L 33.703125 -48.140625 C 33.703125 -46.953125 33.28125 -46.359375 32.4375 -46.359375 L 17.421875 -46.359375 L 17.421875 -37.421875 L 29.1875 -37.421875 C 29.65625 -37.421875 30.023438 -37.273438 30.296875 -36.984375 C 30.578125 -36.691406 30.71875 -36.238281 30.71875 -35.625 L 30.71875 -25 C 30.71875 -23.820312 30.207031 -23.234375 29.1875 -23.234375 L 17.421875 -23.234375 Z M 17.421875 -14.1875 "/>
                    </g>
                </g>
                </g>
            </g>
            </g>
        </g>
        </g>
    </svg>
);

export const LinkleAvatarIcon = (props) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200" 
      fill="none" 
      {...props}
    >
      {/* Shadow layer */}
      <path 
        d="M160 50.5C176.569 50.5 190 63.9315 190 80.5V130.5C190 158.115 167.615 180.5 140 180.5H60C43.4315 180.5 30 167.069 30 150.5V100.5C30 72.8858 52.3858 50.5 80 50.5H160Z" 
        fill="#2D2A32"
      />
      
      {/* Badge background */}
      <path 
        d="M150 40.5C166.569 40.5 180 53.9315 180 70.5V120.5C180 148.115 157.615 170.5 130 170.5H50C33.4315 170.5 20 157.069 20 140.5V90.5C20 62.8858 42.3858 40.5 70 40.5H150Z" 
        fill="#b3a7fe" 
        stroke="#2E2E2E" 
        strokeWidth="6"
      />
      
      {/* Character */}
      <g id="character">
        {/* Left holder arm */}
        <path 
          d="M75 70C75 70 65 55 55 60" 
          stroke="#2E2E2E" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        {/* Right holder arm */}
        <path 
          d="M125 70C125 70 135 55 145 60" 
          stroke="#2E2E2E" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        {/* Left holder accent */}
        <circle 
          cx="55" 
          cy="60" 
          r="7" 
          fill="#FFD93D" 
          stroke="#2E2E2E" 
          strokeWidth="4"
        />
        {/* Right holder accent */}
        <circle 
          cx="145" 
          cy="60" 
          r="7" 
          fill="#FFD93D" 
          stroke="#2E2E2E" 
          strokeWidth="4"
        />
        {/* Face */}
        <path 
          d="M145 115C145 139.853 124.853 160 100 160C75.1472 160 55 139.853 55 115C55 90.1472 70 70 100 70C130 70 145 90.1472 145 115Z" 
          fill="#FFFFFF" 
          stroke="#2E2E2E" 
          strokeWidth="6"
        />
        {/* Left eye */}
        <circle cx="85" cy="110" r="6" fill="#2E2E2E"/>
        {/* Right eye */}
        <circle cx="115" cy="110" r="6" fill="#2E2E2E"/>
        {/* Smile */}
        <path 
          d="M88 125Q100 135 112 125" 
          stroke="#2E2E2E" 
          strokeWidth="5" 
          strokeLinecap="round"
        />
        {/* Face highlight */}
        <path 
          d="M80 85Q95 80 110 85" 
          stroke="#FFFFFF" 
          strokeWidth="4" 
          strokeLinecap="round" 
          opacity="0.6"
        />
      </g>
    </svg>
);

export const CloseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ShareIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

export const StreakIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 95.999999" preserveAspectRatio="xMidYMid meet" {...props}>
        <defs>
            <filter x="0%" y="0%" width="100%" height="100%" id="7f22279fd8">
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" colorInterpolationFilters="sRGB" />
            </filter>
            <clipPath id="98ce95e41b">
                <path d="M 12 2.128906 L 84 2.128906 L 84 93.628906 L 12 93.628906 Z M 12 2.128906 " clipRule="nonzero" />
            </clipPath>
            <clipPath id="f4c57b17e4">
                <path d="M 26.445312 30.25 C 26.011719 34.863281 25.707031 43.035156 28.441406 46.511719 C 28.441406 46.511719 27.15625 37.539062 38.707031 26.277344 C 43.355469 21.746094 44.433594 15.578125 42.808594 10.957031 C 41.886719 8.335938 40.199219 6.171875 38.734375 4.660156 C 37.882812 3.773438 38.539062 2.308594 39.78125 2.359375 C 47.296875 2.695312 59.484375 4.773438 64.660156 17.710938 C 66.929688 23.390625 67.097656 29.261719 66.015625 35.230469 C 65.332031 39.042969 62.890625 47.515625 68.457031 48.554688 C 72.429688 49.300781 74.351562 46.15625 75.210938 43.894531 C 75.570312 42.953125 76.8125 42.714844 77.484375 43.46875 C 84.195312 51.066406 84.765625 60.019531 83.378906 67.726562 C 80.695312 82.625 65.542969 93.46875 50.492188 93.46875 C 31.691406 93.46875 16.722656 82.753906 12.84375 63.359375 C 11.28125 55.53125 12.074219 40.042969 24.195312 29.109375 C 25.097656 28.289062 26.566406 29.019531 26.445312 30.25 Z M 26.445312 30.25 " clipRule="nonzero" />
            </clipPath>
            <radialGradient gradientTransform="matrix(-0.759295, -0.00328168, -0.00541377, 1.240686, 99.965453, -60.922833)" gradientUnits="userSpaceOnUse" r="70.880149" cx="69.170081" id="a19c44d93b" cy="124.8112205" fx="69.170081" fy="124.812205">
                <stop stopOpacity="1" stopColor="rgb(100%, 59.609985%, 0%)" offset="0" />
                <stop stopOpacity="1" stopColor="rgb(100%, 59.609985%, 0%)" offset="0.25" />
                <stop stopOpacity="1" stopColor="rgb(100%, 59.550476%, 0%)" offset="0.296875" />
                <stop stopOpacity="1" stopColor="rgb(100%, 59.303284%, 0%)" offset="0.316406" />
                <stop stopOpacity="1" stopColor="rgb(100%, 58.924866%, 0%)" offset="0.324219" />
                <stop stopOpacity="1" stopColor="rgb(100%, 58.546448%, 0%)" offset="0.332031" />
                <stop stopOpacity="1" stopColor="rgb(100%, 58.16803%, 0%)" offset="0.339844" />
                <stop stopOpacity="1" stopColor="rgb(100%, 57.789612%, 0%)" offset="0.347656" />
                <stop stopOpacity="1" stopColor="rgb(100%, 57.411194%, 0%)" offset="0.355469" />
                <stop stopOpacity="1" stopColor="rgb(100%, 57.032776%, 0%)" offset="0.363281" />
                <stop stopOpacity="1" stopColor="rgb(100%, 56.654358%, 0%)" offset="0.371094" />
                <stop stopOpacity="1" stopColor="rgb(100%, 56.27594%, 0%)" offset="0.386719" />
                <stop stopOpacity="1" stopColor="rgb(100%, 55.519104%, 0%)" offset="0.394531" />
                <stop stopOpacity="1" stopColor="rgb(100%, 55.13916%, 0%)" offset="0.402344" />
                <stop stopOpacity="1" stopColor="rgb(100%, 54.760742%, 0%)" offset="0.410156" />
                <stop stopOpacity="1" stopColor="rgb(100%, 54.382324%, 0%)" offset="0.417969" />
                <stop stopOpacity="1" stopColor="rgb(100%, 54.003906%, 0%)" offset="0.425781" />
                <stop stopOpacity="1" stopColor="rgb(100%, 53.625488%, 0%)" offset="0.433594" />
                <stop stopOpacity="1" stopColor="rgb(100%, 53.24707%, 0%)" offset="0.441406" />
                <stop stopOpacity="1" stopColor="rgb(100%, 52.868652%, 0%)" offset="0.449219" />
                <stop stopOpacity="1" stopColor="rgb(100%, 52.490234%, 0%)" offset="0.457031" />
                <stop stopOpacity="1" stopColor="rgb(100%, 52.111816%, 0%)" offset="0.464844" />
                <stop stopOpacity="1" stopColor="rgb(100%, 51.733398%, 0%)" offset="0.472656" />
                <stop stopOpacity="1" stopColor="rgb(100%, 51.35498%, 0%)" offset="0.480469" />
                <stop stopOpacity="1" stopColor="rgb(100%, 50.976562%, 0%)" offset="0.488281" />
                <stop stopOpacity="1" stopColor="rgb(100%, 50.598145%, 0%)" offset="0.496094" />
                <stop stopOpacity="1" stopColor="rgb(100%, 50.314331%, 0%)" offset="0.503906" />
                <stop stopOpacity="1" stopColor="rgb(100%, 50.125122%, 0%)" offset="0.507812" />
                <stop stopOpacity="1" stopColor="rgb(100%, 49.935913%, 0%)" offset="0.511719" />
                <stop stopOpacity="1" stopColor="rgb(100%, 49.746704%, 0%)" offset="0.515625" />
                <stop stopOpacity="1" stopColor="rgb(100%, 49.557495%, 0%)" offset="0.519531" />
                <stop stopOpacity="1" stopColor="rgb(100%, 49.368286%, 0%)" offset="0.523438" />
                <stop stopOpacity="1" stopColor="rgb(100%, 48.989868%, 0%)" offset="0.53125" />
                <stop stopOpacity="1" stopColor="rgb(100%, 48.800659%, 0%)" offset="0.535156" />
                <stop stopOpacity="1" stopColor="rgb(100%, 48.61145%, 0%)" offset="0.539062" />
                <stop stopOpacity="1" stopColor="rgb(100%, 48.420715%, 0%)" offset="0.542969" />
                <stop stopOpacity="1" stopColor="rgb(100%, 48.231506%, 0%)" offset="0.546875" />
                <stop stopOpacity="1" stopColor="rgb(100%, 48.042297%, 0%)" offset="0.550781" />
                <stop stopOpacity="1" stopColor="rgb(100%, 47.853088%, 0%)" offset="0.554688" />
                <stop stopOpacity="1" stopColor="rgb(100%, 47.663879%, 0%)" offset="0.558594" />
                <stop stopOpacity="1" stopColor="rgb(100%, 47.47467%, 0%)" offset="0.5625" />
                <stop stopOpacity="1" stopColor="rgb(100%, 47.285461%, 0%)" offset="0.566406" />
                <stop stopOpacity="1" stopColor="rgb(100%, 47.096252%, 0%)" offset="0.570312" />
                <stop stopOpacity="1" stopColor="rgb(100%, 46.907043%, 0%)" offset="0.574219" />
                <stop stopOpacity="1" stopColor="rgb(100%, 46.717834%, 0%)" offset="0.578125" />
                <stop stopOpacity="1" stopColor="rgb(100%, 46.528625%, 0%)" offset="0.582031" />
                <stop stopOpacity="1" stopColor="rgb(100%, 46.339417%, 0%)" offset="0.585938" />
                <stop stopOpacity="1" stopColor="rgb(100%, 46.150208%, 0%)" offset="0.589844" />
                <stop stopOpacity="1" stopColor="rgb(100%, 45.960999%, 0%)" offset="0.59375" />
                <stop stopOpacity="1" stopColor="rgb(100%, 45.77179%, 0%)" offset="0.597656" />
                <stop stopOpacity="1" stopColor="rgb(100%, 45.582581%, 0%)" offset="0.601562" />
                <stop stopOpacity="1" stopColor="rgb(100%, 45.393372%, 0%)" offset="0.605469" />
                <stop stopOpacity="1" stopColor="rgb(100%, 45.204163%, 0%)" offset="0.609375" />
                <stop stopOpacity="1" stopColor="rgb(100%, 45.014954%, 0%)" offset="0.613281" />
                <stop stopOpacity="1" stopColor="rgb(100%, 44.825745%, 0%)" offset="0.617188" />
                <stop stopOpacity="1" stopColor="rgb(100%, 44.636536%, 0%)" offset="0.621094" />
                <stop stopOpacity="1" stopColor="rgb(100%, 44.447327%, 0%)" offset="0.625" />
                <stop stopOpacity="1" stopColor="rgb(100%, 44.163513%, 0%)" offset="0.628906" />
                <stop stopOpacity="1" stopColor="rgb(100%, 43.785095%, 0%)" offset="0.636719" />
                <stop stopOpacity="1" stopColor="rgb(100%, 43.406677%, 0%)" offset="0.644531" />
                <stop stopOpacity="1" stopColor="rgb(100%, 43.028259%, 0%)" offset="0.652344" />
                <stop stopOpacity="1" stopColor="rgb(99.984741%, 42.738342%, 0.0701904%)" offset="0.660156" />
                <stop stopOpacity="1" stopColor="rgb(99.943542%, 42.5354%, 0.273132%)" offset="0.664062" />
                <stop stopOpacity="1" stopColor="rgb(99.888611%, 42.327881%, 0.540161%)" offset="0.667969" />
                <stop stopOpacity="1" stopColor="rgb(99.835205%, 42.120361%, 0.80719%)" offset="0.671875" />
                <stop stopOpacity="1" stopColor="rgb(99.780273%, 41.912842%, 1.074219%)" offset="0.675781" />
                <stop stopOpacity="1" stopColor="rgb(99.725342%, 41.705322%, 1.339722%)" offset="0.679688" />
                <stop stopOpacity="1" stopColor="rgb(99.671936%, 41.497803%, 1.60675%)" offset="0.683594" />
                <stop stopOpacity="1" stopColor="rgb(99.617004%, 41.290283%, 1.873779%)" offset="0.6875" />
                <stop stopOpacity="1" stopColor="rgb(99.563599%, 41.082764%, 2.140808%)" offset="0.691406" />
                <stop stopOpacity="1" stopColor="rgb(99.508667%, 40.873718%, 2.407837%)" offset="0.695312" />
                <stop stopOpacity="1" stopColor="rgb(99.453735%, 40.666199%, 2.674866%)" offset="0.699219" />
                <stop stopOpacity="1" stopColor="rgb(99.40033%, 40.458679%, 2.941895%)" offset="0.703125" />
                <stop stopOpacity="1" stopColor="rgb(99.345398%, 40.25116%, 3.208923%)" offset="0.707031" />
                <stop stopOpacity="1" stopColor="rgb(99.291992%, 40.04364%, 3.475952%)" offset="0.710938" />
                <stop stopOpacity="1" stopColor="rgb(99.237061%, 39.836121%, 3.742981%)" offset="0.714844" />
                <stop stopOpacity="1" stopColor="rgb(99.182129%, 39.628601%, 4.01001%)" offset="0.71875" />
                <stop stopOpacity="1" stopColor="rgb(99.128723%, 39.421082%, 4.275513%)" offset="0.722656" />
                <stop stopOpacity="1" stopColor="rgb(99.073792%, 39.213562%, 4.542542%)" offset="0.726562" />
                <stop stopOpacity="1" stopColor="rgb(99.020386%, 39.006042%, 4.80957%)" offset="0.730469" />
                <stop stopOpacity="1" stopColor="rgb(98.965454%, 38.798523%, 5.076599%)" offset="0.734375" />
                <stop stopOpacity="1" stopColor="rgb(98.910522%, 38.589478%, 5.343628%)" offset="0.738281" />
                <stop stopOpacity="1" stopColor="rgb(98.857117%, 38.381958%, 5.610657%)" offset="0.742188" />
                <stop stopOpacity="1" stopColor="rgb(98.802185%, 38.174438%, 5.877686%)" offset="0.746094" />
                <stop stopOpacity="1" stopColor="rgb(98.748779%, 37.966919%, 6.144714%)" offset="0.75" />
                <stop stopOpacity="1" stopColor="rgb(98.693848%, 37.759399%, 6.411743%)" offset="0.753906" />
                <stop stopOpacity="1" stopColor="rgb(98.638916%, 37.55188%, 6.678772%)" offset="0.757812" />
                <stop stopOpacity="1" stopColor="rgb(98.58551%, 37.34436%, 6.944275%)" offset="0.761719" />
                <stop stopOpacity="1" stopColor="rgb(98.530579%, 37.136841%, 7.211304%)" offset="0.765625" />
                <stop stopOpacity="1" stopColor="rgb(98.477173%, 36.929321%, 7.478333%)" offset="0.769531" />
                <stop stopOpacity="1" stopColor="rgb(98.422241%, 36.721802%, 7.745361%)" offset="0.773438" />
                <stop stopOpacity="1" stopColor="rgb(98.368835%, 36.512756%, 8.01239%)" offset="0.777344" />
                <stop stopOpacity="1" stopColor="rgb(98.313904%, 36.305237%, 8.279419%)" offset="0.78125" />
                <stop stopOpacity="1" stopColor="rgb(98.258972%, 36.097717%, 8.546448%)" offset="0.785156" />
                <stop stopOpacity="1" stopColor="rgb(98.205566%, 35.890198%, 8.813477%)" offset="0.789062" />
                <stop stopOpacity="1" stopColor="rgb(98.150635%, 35.682678%, 9.080505%)" offset="0.792969" />
                <stop stopOpacity="1" stopColor="rgb(98.097229%, 35.475159%, 9.347534%)" offset="0.796875" />
                <stop stopOpacity="1" stopColor="rgb(98.042297%, 35.267639%, 9.614563%)" offset="0.800781" />
                <stop stopOpacity="1" stopColor="rgb(97.987366%, 35.06012%, 9.880066%)" offset="0.804688" />
                <stop stopOpacity="1" stopColor="rgb(97.93396%, 34.8526%, 10.147095%)" offset="0.808594" />
                <stop stopOpacity="1" stopColor="rgb(97.879028%, 34.645081%, 10.414124%)" offset="0.8125" />
                <stop stopOpacity="1" stopColor="rgb(97.825623%, 34.437561%, 10.681152%)" offset="0.816406" />
                <stop stopOpacity="1" stopColor="rgb(97.770691%, 34.228516%, 10.948181%)" offset="0.820312" />
                <stop stopOpacity="1" stopColor="rgb(97.715759%, 34.020996%, 11.21521%)" offset="0.824219" />
                <stop stopOpacity="1" stopColor="rgb(97.662354%, 33.813477%, 11.482239%)" offset="0.828125" />
                <stop stopOpacity="1" stopColor="rgb(97.607422%, 33.605957%, 11.749268%)" offset="0.832031" />
                <stop stopOpacity="1" stopColor="rgb(97.554016%, 33.398438%, 12.016296%)" offset="0.835938" />
                <stop stopOpacity="1" stopColor="rgb(97.499084%, 32.983398%, 12.550354%)" offset="0.84375" />
                <stop stopOpacity="1" stopColor="rgb(97.444153%, 32.775879%, 12.815857%)" offset="0.847656" />
                <stop stopOpacity="1" stopColor="rgb(97.38916%, 32.568359%, 13.082886%)" offset="0.851562" />
                <stop stopOpacity="1" stopColor="rgb(97.334229%, 32.36084%, 13.349915%)" offset="0.855469" />
                <stop stopOpacity="1" stopColor="rgb(97.279297%, 32.15332%, 13.616943%)" offset="0.859375" />
                <stop stopOpacity="1" stopColor="rgb(97.225952%, 31.944275%, 13.883972%)" offset="0.863281" />
                <stop stopOpacity="1" stopColor="rgb(97.171021%, 31.736755%, 14.151001%)" offset="0.867188" />
                <stop stopOpacity="1" stopColor="rgb(97.116089%, 31.529236%, 14.41803%)" offset="0.871094" />
                <stop stopOpacity="1" stopColor="rgb(97.062744%, 31.321716%, 14.685059%)" offset="0.875" />
                <stop stopOpacity="1" stopColor="rgb(96.954346%, 30.906677%, 15.219116%)" offset="0.882812" />
                <stop stopOpacity="1" stopColor="rgb(96.847534%, 30.491638%, 15.751648%)" offset="0.890625" />
                <stop stopOpacity="1" stopColor="rgb(96.739197%, 30.076599%, 16.285706%)" offset="0.898438" />
                <stop stopOpacity="1" stopColor="rgb(96.630859%, 29.660034%, 16.819763%)" offset="0.90625" />
                <stop stopOpacity="1" stopColor="rgb(96.520996%, 29.244995%, 17.353821%)" offset="0.914062" />
                <stop stopOpacity="1" stopColor="rgb(96.412659%, 28.829956%, 17.887878%)" offset="0.921875" />
                <stop stopOpacity="1" stopColor="rgb(96.304321%, 28.414917%, 18.42041%)" offset="0.929688" />
                <stop stopOpacity="1" stopColor="rgb(96.195984%, 27.999878%, 18.954468%)" offset="0.9375" />
                <stop stopOpacity="1" stopColor="rgb(96.087646%, 27.584839%, 19.488525%)" offset="0.945312" />
                <stop stopOpacity="1" stopColor="rgb(95.977783%, 27.168274%, 20.022583%)" offset="0.953125" />
                <stop stopOpacity="1" stopColor="rgb(95.869446%, 26.753235%, 20.556641%)" offset="0.960938" />
                <stop stopOpacity="1" stopColor="rgb(95.761108%, 26.33667%, 21.090698%)" offset="0.96875" />
                <stop stopOpacity="1" stopColor="rgb(95.689392%, 26.269531%, 21.179199%)" offset="1" />
            </radialGradient>
            <clipPath id="2de7418e0e">
                <rect x="0" width="74" y="0" height="92" />
            </clipPath>
            <pattern id="340d65fc05" patternUnits="userSpaceOnUse" width="74" patternTransform="matrix(1, 0, 0, -1, 11, 93.919999)" preserveAspectRatio="xMidYMid meet" viewBox="0 0 74 92" height="92" x="0" y="0">
                <g>
                    <g clipPath="url(#2de7418e0e)" />
                </g>
            </pattern>
        </defs>
        <g clipPath="url(#98ce95e41b)">
            <g clipPath="url(#f4c57b17e4)">
                <path fill="url(#a19c44d93b)" d="M 85.164062 2.308594 L 84.765625 93.785156 L 10.90625 93.464844 L 11.304688 1.988281 Z M 85.164062 2.308594 " fillRule="nonzero" />
            </g>
        </g>
        <g clipPath="url(#bafe85a46e)">
            <g clipPath="url(#7d7c2b1991)">
                <path fill="url(#340d65fc05)" d="M 30.1875 34.015625 L 71.597656 34.015625 L 71.597656 93.476562 L 30.1875 93.476562 Z M 30.1875 34.015625 " fillRule="nonzero" />
            </g>
        </g>
    </svg>
);