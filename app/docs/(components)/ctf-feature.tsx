'use client';

import type { FC } from 'react';

import { Puzzle } from 'lucide-react';

const CTFFeature: FC = () => {
  const flagWidth = (128 * 264) / 412;
  const flagX = 256 - flagWidth;
  const strokeLength = 104 - flagWidth;
  const strokeDash = strokeLength / 8;
  const strokeDasharray = `${strokeDash / 2},${(strokeDash.toString() + ',').repeat(7)}${
    strokeDash / 2
  }`;

  return (
    <svg
      width="256"
      height="128"
      viewBox="0 0 256 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="fill-gray-600" width={flagWidth} height="128" rx="4" />
      <text className="text-gray-100" x="2" y="12" fontSize="8">
        Puzzle
      </text>
      <g>
        <rect className="fill-gray-350" width="36" height="6" x="4" y="16" rx="1" />
        <rect className="fill-gray-350" width={flagWidth - 11} height="6" x="4" y="24" rx="1" />
        <rect className="fill-gray-350" width="28" height="6" x="4" y="32" rx="1" />
        <rect className="fill-gray-350" width="36" height="6" x="4" y="40" rx="1" />
        <rect className="fill-gray-350" width="56" height="6" x="4" y="48" rx="1" />
        <rect className="fill-gray-350" width={flagWidth - 11} height="6" x="4" y="56" rx="1" />
        <rect className="fill-gray-350" width="20" height="6" x="4" y="64" rx="1" />
        <rect className="fill-gray-350" width="64" height="6" x="4" y="72" rx="1" />
        <rect className="fill-gray-350" width="48" height="6" x="4" y="80" rx="1" />
        <rect className="fill-gray-350" width="36" height="6" x="4" y="88" rx="1" />
        <rect className="fill-gray-350" width="20" height="6" x="4" y="96" rx="1" />
        <rect className="fill-gray-350" width="28" height="6" x="4" y="104" rx="1" />
        <rect className="fill-gray-350" width="24" height="6" x="4" y="112" rx="1" />
        <rect className="fill-gray-350" width="16" height="6" x="4" y="120" rx="1" />
        <rect className="fill-gray-350" width="44" height="6" x="4" y="128" rx="1" />
        <rect className="fill-gray-350" width="48" height="6" x="4" y="136" rx="1" />
        <rect className="fill-gray-350" width="36" height="6" x="4" y="144" rx="1" />
        <rect className="fill-gray-350" width="20" height="6" x="4" y="152" rx="1" />
        <rect className="fill-gray-350" width="28" height="6" x="4" y="160" rx="1" />
        <rect className="fill-gray-350" width="24" height="6" x="4" y="168" rx="1" />
        <rect className="fill-gray-350" width="16" height="6" x="4" y="176" rx="1" />
        <rect className="fill-gray-350" width="44" height="6" x="4" y="184" rx="1" />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 0;0 -66;0 -66;0 0;0 0"
          keyTimes="0;0.1;0.5;0.6;1"
          begin="0s"
          dur="10s"
          repeatCount="indefinite"
          fill="freeze"
        />
      </g>
      <rect className="fill-gray-250" width="2" height="72" rx="1" x={flagWidth - 5} y="15.5">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 0;0 37;0 37;0 0;0 0"
          keyTimes="0;0.1;0.5;0.6;1"
          begin="0s"
          dur="10s"
          repeatCount="indefinite"
          fill="freeze"
        />
      </rect>
      <rect className="fill-gray-600" width={flagWidth} height="13" rx="4" />
      <rect className="fill-gray-250" width="6" height="6" x="4" y="4" rx="1" />
      <rect className="fill-gray-250" width="36" height="6" x="12" y="4" rx="1" />
      <rect className="fill-gray-250" width="6" height="6" x={flagWidth - 10} y="4" rx="1" />
      <line className="stroke-stroke" x1="0" y1="13" x2={flagWidth} y2="13" />
      <rect className="stroke-stroke" width={flagWidth - 1} height="127" x="0.5" y="0.5" rx="4" />
      <line
        className="stroke-stroke"
        x1={flagWidth}
        y1="63.5"
        x2={flagWidth + strokeLength}
        y2="63.5"
        strokeDasharray={strokeDasharray}
      />
      <line
        className="stroke-stroke"
        x1={flagWidth + strokeLength + 48}
        y1="63.5"
        x2={flagWidth + 2 * strokeLength + 48}
        y2="63.5"
        strokeDasharray={strokeDasharray}
      />
      <circle className="stroke-stroke" r="23" cx="128" cy="64" strokeWidth="2" />
      <circle className="fill-gray-600" r="23" cx="128" cy="64" />
      <g transform="translate(116 52)">
        <Puzzle className="text-gray-200" />
      </g>
      <g transform={`translate(${flagX} 0)`}>
        <svg
          className="transition-colors"
          xmlns="http://www.w3.org/2000/svg"
          width={(128 * 264) / 412}
          height="128"
          viewBox="0 0 264 412"
          role="img"
        >
          <style>
            {`@font-face{
          font-family:"A";
          src:url(data:font/ttf;charset=utf-8;base64,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AAAAAAAA/wAAAAAA/6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/ZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/5gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/qAAD/Hf96AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/5AAAP8A/6D/oP+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/5gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/vAAAAAgAIAAEAEAAAABMAFQAQABgAGAATABwAHAAUAB4AHgAVACEAIQAWACQAOAAXAEEAQQAsAAEAAQBBAAMABwAIAAIABQAPAAsABgAAAAEACQANABAAEwAMABEAAAAAABQADAANAAAAAAAOAAAAAAAA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)
        }
        @font-face{
          font-family:"B";
          src:url(data:font/ttf;utf-8;base64,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)
        }
        rect{transition:fill 0.15s cubic-bezier(0.4,0,0.2,1)}
        path{transition:stroke 0.15s cubic-bezier(0.4,0,0.2,1)}
        text,tspan{dominant-baseline:central;transition:fill 0.15s cubic-bezier(0.4,0,0.2,1)}
        text.a,tspan.a{font-family:A;fill:#F0F6FC;letter-spacing:-.05em}
        text.b{font-family:B;fill:#94A3B3}
        text.c{font-size:16px}
        text.d,tspan.d{font-size:12px}}
        text,tspan{dominant-baseline:central}
        text.a,tspan.a{font-family:A;fill:#F0F6FC;letter-spacing:-.05em}
        text.b{font-family:B;fill:#94A3B3}
        text.c{font-size:16px}
        text.d,tspan.d{font-size:12px}`}
          </style>
          <mask xmlns="http://www.w3.org/2000/svg" id="m">
            <rect width="20" height="20" rx="0.370370" fill="#FFF" />
          </mask>
          <rect width="264" height="412" fill="#27303D" rx="8" />
          <rect x="4" y="4" width="256" height="404" fill="#181E28" rx="4" />
          <text className="a" x="20" y="32" fontSize="20">
            Puzzle #1
          </text>
          <text x="20" y="52">
            <tspan className="b d" style={{ fontFamily: 'B', fill: '#94A3B3' }}>
              Created by{' '}
            </tspan>
            <tspan className="a d">
              {'0xA85572Cd96f1643458f17340b6f0D6549Af482F5'.slice(2, 9).toUpperCase()}
            </tspan>
          </text>
          <rect x="176" y="28" width={64} height={24} fill="#F0F6FC" rx={12} />
          <g transform="translate(184 32)">
            <path
              d="M7.192 2.14c.299-.718 1.317-.718 1.616 0l1.388 3.338 3.603.289c.776.062 1.09 1.03.5 1.536l-2.746 2.352.838 3.515c.181.757-.642 1.355-1.306.95L8 12.236 4.915 14.12c-.664.405-1.487-.193-1.306-.95l.838-3.515-2.745-2.352c-.591-.506-.277-1.474.5-1.536l3.602-.289 1.388-3.337z"
              fill="#181E28"
            />
          </g>
          <g transform="translate(200 32)">
            <path
              d="M7.192 2.14c.299-.718 1.317-.718 1.616 0l1.388 3.338 3.603.289c.776.062 1.09 1.03.5 1.536l-2.746 2.352.838 3.515c.181.757-.642 1.355-1.306.95L8 12.236 4.915 14.12c-.664.405-1.487-.193-1.306-.95l.838-3.515-2.745-2.352c-.591-.506-.277-1.474.5-1.536l3.602-.289 1.388-3.337z"
              fill="#181E28"
            />
          </g>
          <g transform="translate(216 32)">
            <path
              d="M7.192 2.14c.299-.718 1.317-.718 1.616 0l1.388 3.338 3.603.289c.776.062 1.09 1.03.5 1.536l-2.746 2.352.838 3.515c.181.757-.642 1.355-1.306.95L8 12.236 4.915 14.12c-.664.405-1.487-.193-1.306-.95l.838-3.515-2.745-2.352c-.591-.506-.277-1.474.5-1.536l3.602-.289 1.388-3.337z"
              fill="#181E28"
            />
          </g>
          <rect x="20" y="68" width="224" height="224" fill="rgba(0,0,0,0.2)" rx="8" />
          <g
            xmlns="http://www.w3.org/2000/svg"
            transform="translate(24 72) scale(10.8)"
            mask="url(#m)"
          >
            <rect width="1" height="1" x="0" y="0" fill="#333399" />
            <rect width="1" height="1" x="1" y="0" fill="#333399" />
            <rect width="1" height="1" x="2" y="0" fill="#333399" />
            <rect width="1" height="1" x="3" y="0" fill="#333399" />
            <rect width="1" height="1" x="4" y="0" fill="#333399" />
            <rect width="1" height="1" x="5" y="0" fill="#333399" />
            <rect width="1" height="1" x="6" y="0" fill="#333399" />
            <rect width="1" height="1" x="7" y="0" fill="#333399" />
            <rect width="1" height="1" x="8" y="0" fill="#333399" />
            <rect width="1" height="1" x="9" y="0" fill="#333399" />
            <rect width="1" height="1" x="10" y="0" fill="#333399" />
            <rect width="1" height="1" x="11" y="0" fill="#333399" />
            <rect width="1" height="1" x="12" y="0" fill="#333399" />
            <rect width="1" height="1" x="13" y="0" fill="#333399" />
            <rect width="1" height="1" x="14" y="0" fill="#333399" />
            <rect width="1" height="1" x="15" y="0" fill="#333399" />
            <rect width="1" height="1" x="16" y="0" fill="#333399" />
            <rect width="1" height="1" x="17" y="0" fill="#333399" />
            <rect width="1" height="1" x="18" y="0" fill="#333399" />
            <rect width="1" height="1" x="19" y="0" fill="#333399" />
            <rect width="1" height="1" x="0" y="1" fill="#333399" />
            <rect width="1" height="1" x="1" y="1" fill="#333399" />
            <rect width="1" height="1" x="2" y="1" fill="#333399" />
            <rect width="1" height="1" x="3" y="1" fill="#333399" />
            <rect width="1" height="1" x="4" y="1" fill="#333399" />
            <rect width="1" height="1" x="5" y="1" fill="#333399" />
            <rect width="1" height="1" x="6" y="1" fill="#333399" />
            <rect width="1" height="1" x="7" y="1" fill="#333399" />
            <rect width="1" height="1" x="8" y="1" fill="#333399" />
            <rect width="1" height="1" x="9" y="1" fill="#333399" />
            <rect width="1" height="1" x="10" y="1" fill="#333399" />
            <rect width="1" height="1" x="11" y="1" fill="#333399" />
            <rect width="1" height="1" x="12" y="1" fill="#333399" />
            <rect width="1" height="1" x="13" y="1" fill="#333399" />
            <rect width="1" height="1" x="14" y="1" fill="#333399" />
            <rect width="1" height="1" x="15" y="1" fill="#333399" />
            <rect width="1" height="1" x="16" y="1" fill="#333399" />
            <rect width="1" height="1" x="17" y="1" fill="#333399" />
            <rect width="1" height="1" x="18" y="1" fill="#333399" />
            <rect width="1" height="1" x="19" y="1" fill="#333399" />
            <rect width="1" height="1" x="0" y="2" fill="#333399" />
            <rect width="1" height="1" x="1" y="2" fill="#333399" />
            <rect width="1" height="1" x="2" y="2" fill="#333399" />
            <rect width="1" height="1" x="3" y="2" fill="#333399" />
            <rect width="1" height="1" x="4" y="2" fill="#333399" />
            <rect width="1" height="1" x="5" y="2" fill="#333399" />
            <rect width="1" height="1" x="6" y="2" fill="#333399" />
            <rect width="1" height="1" x="7" y="2" fill="#333399" />
            <rect width="1" height="1" x="8" y="2" fill="#333399" />
            <rect width="1" height="1" x="9" y="2" fill="#333399" />
            <rect width="1" height="1" x="10" y="2" fill="#333399" />
            <rect width="1" height="1" x="11" y="2" fill="#333399" />
            <rect width="1" height="1" x="12" y="2" fill="#333399" />
            <rect width="1" height="1" x="13" y="2" fill="#333399" />
            <rect width="1" height="1" x="14" y="2" fill="#333399" />
            <rect width="1" height="1" x="15" y="2" fill="#333399" />
            <rect width="1" height="1" x="16" y="2" fill="#333399" />
            <rect width="1" height="1" x="17" y="2" fill="#333399" />
            <rect width="1" height="1" x="18" y="2" fill="#333399" />
            <rect width="1" height="1" x="19" y="2" fill="#333399" />
            <rect width="1" height="1" x="0" y="3" fill="#333399" />
            <rect width="1" height="1" x="1" y="3" fill="#333399" />
            <rect width="1" height="1" x="2" y="3" fill="#333399" />
            <rect width="1" height="1" x="3" y="3" fill="#333399" />
            <rect width="1" height="1" x="4" y="3" fill="#333399" />
            <rect width="1" height="1" x="5" y="3" fill="#333399" />
            <rect width="1" height="1" x="6" y="3" fill="#333399" />
            <rect width="1" height="1" x="7" y="3" fill="#333399" />
            <rect width="1" height="1" x="8" y="3" fill="#333399" />
            <rect width="1" height="1" x="9" y="3" fill="#333399" />
            <rect width="1" height="1" x="10" y="3" fill="#333399" />
            <rect width="1" height="1" x="11" y="3" fill="#333399" />
            <rect width="1" height="1" x="12" y="3" fill="#333399" />
            <rect width="1" height="1" x="13" y="3" fill="#333399" />
            <rect width="1" height="1" x="14" y="3" fill="#333399" />
            <rect width="1" height="1" x="15" y="3" fill="#333399" />
            <rect width="1" height="1" x="16" y="3" fill="#333399" />
            <rect width="1" height="1" x="17" y="3" fill="#333399" />
            <rect width="1" height="1" x="18" y="3" fill="#333399" />
            <rect width="1" height="1" x="19" y="3" fill="#333399" />
            <rect width="1" height="1" x="0" y="4" fill="#333399" />
            <rect width="1" height="1" x="1" y="4" fill="#333399" />
            <rect width="1" height="1" x="2" y="4" fill="#333399" />
            <rect width="1" height="1" x="3" y="4" fill="#333399" />
            <rect width="1" height="1" x="4" y="4" fill="#333399" />
            <rect width="1" height="1" x="5" y="4" fill="#333399" />
            <rect width="1" height="1" x="6" y="4" fill="#333399" />
            <rect width="1" height="1" x="7" y="4" fill="#333399" />
            <rect width="1" height="1" x="8" y="4" fill="#333399" />
            <rect width="1" height="1" x="9" y="4" fill="#333399" />
            <rect width="1" height="1" x="10" y="4" fill="#333399" />
            <rect width="1" height="1" x="11" y="4" fill="#333399" />
            <rect width="1" height="1" x="12" y="4" fill="#333399" />
            <rect width="1" height="1" x="13" y="4" fill="#333399" />
            <rect width="1" height="1" x="14" y="4" fill="#333399" />
            <rect width="1" height="1" x="15" y="4" fill="#333399" />
            <rect width="1" height="1" x="16" y="4" fill="#333399" />
            <rect width="1" height="1" x="17" y="4" fill="#333399" />
            <rect width="1" height="1" x="18" y="4" fill="#333399" />
            <rect width="1" height="1" x="19" y="4" fill="#333399" />
            <rect width="1" height="1" x="0" y="5" fill="#333399" />
            <rect width="1" height="1" x="1" y="5" fill="#333399" />
            <rect width="1" height="1" x="2" y="5" fill="#333399" />
            <rect width="1" height="1" x="3" y="5" fill="#333399" />
            <rect width="1" height="1" x="4" y="5" fill="#333399" />
            <rect width="1" height="1" x="5" y="5" fill="#333399" />
            <rect width="1" height="1" x="6" y="5" fill="#333399" />
            <rect width="1" height="1" x="7" y="5" fill="#333399" />
            <rect width="1" height="1" x="8" y="5" fill="#333399" />
            <rect width="1" height="1" x="9" y="5" fill="#333399" />
            <rect width="1" height="1" x="10" y="5" fill="#333399" />
            <rect width="1" height="1" x="11" y="5" fill="#333399" />
            <rect width="1" height="1" x="12" y="5" fill="#333399" />
            <rect width="1" height="1" x="13" y="5" fill="#333399" />
            <rect width="1" height="1" x="14" y="5" fill="#333399" />
            <rect width="1" height="1" x="15" y="5" fill="#333399" />
            <rect width="1" height="1" x="16" y="5" fill="#333399" />
            <rect width="1" height="1" x="17" y="5" fill="#333399" />
            <rect width="1" height="1" x="18" y="5" fill="#333399" />
            <rect width="1" height="1" x="19" y="5" fill="#333399" />
            <rect width="1" height="1" x="0" y="6" fill="#333399" />
            <rect width="1" height="1" x="1" y="6" fill="#333399" />
            <rect width="1" height="1" x="2" y="6" fill="#333399" />
            <rect width="1" height="1" x="3" y="6" fill="#333399" />
            <rect width="1" height="1" x="4" y="6" fill="#333399" />
            <rect width="1" height="1" x="5" y="6" fill="#333399" />
            <rect width="1" height="1" x="6" y="6" fill="#333399" />
            <rect width="1" height="1" x="7" y="6" fill="#333399" />
            <rect width="1" height="1" x="8" y="6" fill="#333399" />
            <rect width="1" height="1" x="9" y="6" fill="#333399" />
            <rect width="1" height="1" x="10" y="6" fill="#333399" />
            <rect width="1" height="1" x="11" y="6" fill="#333399" />
            <rect width="1" height="1" x="12" y="6" fill="#333399" />
            <rect width="1" height="1" x="13" y="6" fill="#333399" />
            <rect width="1" height="1" x="14" y="6" fill="#333399" />
            <rect width="1" height="1" x="15" y="6" fill="#333399" />
            <rect width="1" height="1" x="16" y="6" fill="#333399" />
            <rect width="1" height="1" x="17" y="6" fill="#333399" />
            <rect width="1" height="1" x="18" y="6" fill="#333399" />
            <rect width="1" height="1" x="19" y="6" fill="#333399" />
            <rect width="1" height="1" x="0" y="7" fill="#333399" />
            <rect width="1" height="1" x="1" y="7" fill="#333399" />
            <rect width="1" height="1" x="2" y="7" fill="#333399" />
            <rect width="1" height="1" x="3" y="7" fill="#333399" />
            <rect width="1" height="1" x="4" y="7" fill="#333399" />
            <rect width="1" height="1" x="5" y="7" fill="#333399" />
            <rect width="1" height="1" x="6" y="7" fill="#333399" />
            <rect width="1" height="1" x="7" y="7" fill="#333399" />
            <rect width="1" height="1" x="8" y="7" fill="#0393F9" />
            <rect width="1" height="1" x="9" y="7" fill="#333399" />
            <rect width="1" height="1" x="10" y="7" fill="#333399" />
            <rect width="1" height="1" x="11" y="7" fill="#0393F9" />
            <rect width="1" height="1" x="12" y="7" fill="#333399" />
            <rect width="1" height="1" x="13" y="7" fill="#0393F9" />
            <rect width="1" height="1" x="14" y="7" fill="#333399" />
            <rect width="1" height="1" x="15" y="7" fill="#333399" />
            <rect width="1" height="1" x="16" y="7" fill="#333399" />
            <rect width="1" height="1" x="17" y="7" fill="#333399" />
            <rect width="1" height="1" x="18" y="7" fill="#333399" />
            <rect width="1" height="1" x="19" y="7" fill="#333399" />
            <rect width="1" height="1" x="0" y="8" fill="#333399" />
            <rect width="1" height="1" x="1" y="8" fill="#333399" />
            <rect width="1" height="1" x="2" y="8" fill="#333399" />
            <rect width="1" height="1" x="3" y="8" fill="#333399" />
            <rect width="1" height="1" x="4" y="8" fill="#333399" />
            <rect width="1" height="1" x="5" y="8" fill="#333399" />
            <rect width="1" height="1" x="6" y="8" fill="#333399" />
            <rect width="1" height="1" x="7" y="8" fill="#23D36D" />
            <rect width="1" height="1" x="8" y="8" fill="#333399" />
            <rect width="1" height="1" x="9" y="8" fill="#333399" />
            <rect width="1" height="1" x="10" y="8" fill="#23D36D" />
            <rect width="1" height="1" x="11" y="8" fill="#333399" />
            <rect width="1" height="1" x="12" y="8" fill="#91735E" />
            <rect width="1" height="1" x="13" y="8" fill="#333399" />
            <rect width="1" height="1" x="14" y="8" fill="#B7F08A" />
            <rect width="1" height="1" x="15" y="8" fill="#333399" />
            <rect width="1" height="1" x="16" y="8" fill="#0393F9" />
            <rect width="1" height="1" x="17" y="8" fill="#333399" />
            <rect width="1" height="1" x="18" y="8" fill="#333399" />
            <rect width="1" height="1" x="19" y="8" fill="#333399" />
            <rect width="1" height="1" x="0" y="9" fill="#333399" />
            <rect width="1" height="1" x="1" y="9" fill="#333399" />
            <rect width="1" height="1" x="2" y="9" fill="#333399" />
            <rect width="1" height="1" x="3" y="9" fill="#333399" />
            <rect width="1" height="1" x="4" y="9" fill="#333399" />
            <rect width="1" height="1" x="5" y="9" fill="#333399" />
            <rect width="1" height="1" x="6" y="9" fill="#B7F08A" />
            <rect width="1" height="1" x="7" y="9" fill="#333399" />
            <rect width="1" height="1" x="8" y="9" fill="#0393F9" />
            <rect width="1" height="1" x="9" y="9" fill="#333399" />
            <rect width="1" height="1" x="10" y="9" fill="#333399" />
            <rect width="1" height="1" x="11" y="9" fill="#91735E" />
            <rect width="1" height="1" x="12" y="9" fill="#333399" />
            <rect width="1" height="1" x="13" y="9" fill="#FFFFFF" />
            <rect width="1" height="1" x="14" y="9" fill="#333399" />
            <rect width="1" height="1" x="15" y="9" fill="#DBD186" />
            <rect width="1" height="1" x="16" y="9" fill="#333399" />
            <rect width="1" height="1" x="17" y="9" fill="#333399" />
            <rect width="1" height="1" x="18" y="9" fill="#333399" />
            <rect width="1" height="1" x="19" y="9" fill="#333399" />
            <rect width="1" height="1" x="0" y="10" fill="#333399" />
            <rect width="1" height="1" x="1" y="10" fill="#333399" />
            <rect width="1" height="1" x="2" y="10" fill="#333399" />
            <rect width="1" height="1" x="3" y="10" fill="#333399" />
            <rect width="1" height="1" x="4" y="10" fill="#333399" />
            <rect width="1" height="1" x="5" y="10" fill="#23D36D" />
            <rect width="1" height="1" x="6" y="10" fill="#333399" />
            <rect width="1" height="1" x="7" y="10" fill="#B7F08A" />
            <rect width="1" height="1" x="8" y="10" fill="#333399" />
            <rect width="1" height="1" x="9" y="10" fill="#333399" />
            <rect width="1" height="1" x="10" y="10" fill="#0393F9" />
            <rect width="1" height="1" x="11" y="10" fill="#333399" />
            <rect width="1" height="1" x="12" y="10" fill="#DBD186" />
            <rect width="1" height="1" x="13" y="10" fill="#333399" />
            <rect width="1" height="1" x="14" y="10" fill="#B5A09C" />
            <rect width="1" height="1" x="15" y="10" fill="#333399" />
            <rect width="1" height="1" x="16" y="10" fill="#0393F9" />
            <rect width="1" height="1" x="17" y="10" fill="#333399" />
            <rect width="1" height="1" x="18" y="10" fill="#333399" />
            <rect width="1" height="1" x="19" y="10" fill="#333399" />
            <rect width="1" height="1" x="0" y="11" fill="#333399" />
            <rect width="1" height="1" x="1" y="11" fill="#333399" />
            <rect width="1" height="1" x="2" y="11" fill="#333399" />
            <rect width="1" height="1" x="3" y="11" fill="#333399" />
            <rect width="1" height="1" x="4" y="11" fill="#333399" />
            <rect width="1" height="1" x="5" y="11" fill="#333399" />
            <rect width="1" height="1" x="6" y="11" fill="#23D36D" />
            <rect width="1" height="1" x="7" y="11" fill="#333399" />
            <rect width="1" height="1" x="8" y="11" fill="#333399" />
            <rect width="1" height="1" x="9" y="11" fill="#333399" />
            <rect width="1" height="1" x="10" y="11" fill="#333399" />
            <rect width="1" height="1" x="11" y="11" fill="#0393F9" />
            <rect width="1" height="1" x="12" y="11" fill="#333399" />
            <rect width="1" height="1" x="13" y="11" fill="#23D36D" />
            <rect width="1" height="1" x="14" y="11" fill="#333399" />
            <rect width="1" height="1" x="15" y="11" fill="#91735E" />
            <rect width="1" height="1" x="16" y="11" fill="#333399" />
            <rect width="1" height="1" x="17" y="11" fill="#0393F9" />
            <rect width="1" height="1" x="18" y="11" fill="#333399" />
            <rect width="1" height="1" x="19" y="11" fill="#333399" />
            <rect width="1" height="1" x="0" y="12" fill="#333399" />
            <rect width="1" height="1" x="1" y="12" fill="#333399" />
            <rect width="1" height="1" x="2" y="12" fill="#333399" />
            <rect width="1" height="1" x="3" y="12" fill="#333399" />
            <rect width="1" height="1" x="4" y="12" fill="#333399" />
            <rect width="1" height="1" x="5" y="12" fill="#333399" />
            <rect width="1" height="1" x="6" y="12" fill="#333399" />
            <rect width="1" height="1" x="7" y="12" fill="#0393F9" />
            <rect width="1" height="1" x="8" y="12" fill="#333399" />
            <rect width="1" height="1" x="9" y="12" fill="#333399" />
            <rect width="1" height="1" x="10" y="12" fill="#333399" />
            <rect width="1" height="1" x="11" y="12" fill="#333399" />
            <rect width="1" height="1" x="12" y="12" fill="#0393F9" />
            <rect width="1" height="1" x="13" y="12" fill="#333399" />
            <rect width="1" height="1" x="14" y="12" fill="#DBD186" />
            <rect width="1" height="1" x="15" y="12" fill="#333399" />
            <rect width="1" height="1" x="16" y="12" fill="#23D36D" />
            <rect width="1" height="1" x="17" y="12" fill="#333399" />
            <rect width="1" height="1" x="18" y="12" fill="#0393F9" />
            <rect width="1" height="1" x="19" y="12" fill="#333399" />
            <rect width="1" height="1" x="0" y="13" fill="#333399" />
            <rect width="1" height="1" x="1" y="13" fill="#333399" />
            <rect width="1" height="1" x="2" y="13" fill="#333399" />
            <rect width="1" height="1" x="3" y="13" fill="#333399" />
            <rect width="1" height="1" x="4" y="13" fill="#23D36D" />
            <rect width="1" height="1" x="5" y="13" fill="#333399" />
            <rect width="1" height="1" x="6" y="13" fill="#0393F9" />
            <rect width="1" height="1" x="7" y="13" fill="#333399" />
            <rect width="1" height="1" x="8" y="13" fill="#333399" />
            <rect width="1" height="1" x="9" y="13" fill="#333399" />
            <rect width="1" height="1" x="10" y="13" fill="#333399" />
            <rect width="1" height="1" x="11" y="13" fill="#0393F9" />
            <rect width="1" height="1" x="12" y="13" fill="#333399" />
            <rect width="1" height="1" x="13" y="13" fill="#333399" />
            <rect width="1" height="1" x="14" y="13" fill="#333399" />
            <rect width="1" height="1" x="15" y="13" fill="#23D36D" />
            <rect width="1" height="1" x="16" y="13" fill="#333399" />
            <rect width="1" height="1" x="17" y="13" fill="#23D36D" />
            <rect width="1" height="1" x="18" y="13" fill="#333399" />
            <rect width="1" height="1" x="19" y="13" fill="#333399" />
            <rect width="1" height="1" x="0" y="14" fill="#333399" />
            <rect width="1" height="1" x="1" y="14" fill="#333399" />
            <rect width="1" height="1" x="2" y="14" fill="#333399" />
            <rect width="1" height="1" x="3" y="14" fill="#0393F9" />
            <rect width="1" height="1" x="4" y="14" fill="#333399" />
            <rect width="1" height="1" x="5" y="14" fill="#23D36D" />
            <rect width="1" height="1" x="6" y="14" fill="#333399" />
            <rect width="1" height="1" x="7" y="14" fill="#333399" />
            <rect width="1" height="1" x="8" y="14" fill="#333399" />
            <rect width="1" height="1" x="9" y="14" fill="#333399" />
            <rect width="1" height="1" x="10" y="14" fill="#333399" />
            <rect width="1" height="1" x="11" y="14" fill="#333399" />
            <rect width="1" height="1" x="12" y="14" fill="#0393F9" />
            <rect width="1" height="1" x="13" y="14" fill="#333399" />
            <rect width="1" height="1" x="14" y="14" fill="#333399" />
            <rect width="1" height="1" x="15" y="14" fill="#333399" />
            <rect width="1" height="1" x="16" y="14" fill="#333399" />
            <rect width="1" height="1" x="17" y="14" fill="#333399" />
            <rect width="1" height="1" x="18" y="14" fill="#0393F9" />
            <rect width="1" height="1" x="19" y="14" fill="#333399" />
            <rect width="1" height="1" x="0" y="15" fill="#333399" />
            <rect width="1" height="1" x="1" y="15" fill="#333399" />
            <rect width="1" height="1" x="2" y="15" fill="#333399" />
            <rect width="1" height="1" x="3" y="15" fill="#333399" />
            <rect width="1" height="1" x="4" y="15" fill="#333399" />
            <rect width="1" height="1" x="5" y="15" fill="#333399" />
            <rect width="1" height="1" x="6" y="15" fill="#23D36D" />
            <rect width="1" height="1" x="7" y="15" fill="#333399" />
            <rect width="1" height="1" x="8" y="15" fill="#333399" />
            <rect width="1" height="1" x="9" y="15" fill="#23D36D" />
            <rect width="1" height="1" x="10" y="15" fill="#333399" />
            <rect width="1" height="1" x="11" y="15" fill="#0393F9" />
            <rect width="1" height="1" x="12" y="15" fill="#333399" />
            <rect width="1" height="1" x="13" y="15" fill="#333399" />
            <rect width="1" height="1" x="14" y="15" fill="#333399" />
            <rect width="1" height="1" x="15" y="15" fill="#333399" />
            <rect width="1" height="1" x="16" y="15" fill="#333399" />
            <rect width="1" height="1" x="17" y="15" fill="#333399" />
            <rect width="1" height="1" x="18" y="15" fill="#333399" />
            <rect width="1" height="1" x="19" y="15" fill="#333399" />
            <rect width="1" height="1" x="0" y="16" fill="#333399" />
            <rect width="1" height="1" x="1" y="16" fill="#333399" />
            <rect width="1" height="1" x="2" y="16" fill="#333399" />
            <rect width="1" height="1" x="3" y="16" fill="#333399" />
            <rect width="1" height="1" x="4" y="16" fill="#333399" />
            <rect width="1" height="1" x="5" y="16" fill="#0393F9" />
            <rect width="1" height="1" x="6" y="16" fill="#333399" />
            <rect width="1" height="1" x="7" y="16" fill="#23D36D" />
            <rect width="1" height="1" x="8" y="16" fill="#DBD186" />
            <rect width="1" height="1" x="9" y="16" fill="#333399" />
            <rect width="1" height="1" x="10" y="16" fill="#DBD186" />
            <rect width="1" height="1" x="11" y="16" fill="#333399" />
            <rect width="1" height="1" x="12" y="16" fill="#333399" />
            <rect width="1" height="1" x="13" y="16" fill="#333399" />
            <rect width="1" height="1" x="14" y="16" fill="#333399" />
            <rect width="1" height="1" x="15" y="16" fill="#333399" />
            <rect width="1" height="1" x="16" y="16" fill="#333399" />
            <rect width="1" height="1" x="17" y="16" fill="#333399" />
            <rect width="1" height="1" x="18" y="16" fill="#333399" />
            <rect width="1" height="1" x="19" y="16" fill="#333399" />
            <rect width="1" height="1" x="0" y="17" fill="#333399" />
            <rect width="1" height="1" x="1" y="17" fill="#333399" />
            <rect width="1" height="1" x="2" y="17" fill="#333399" />
            <rect width="1" height="1" x="3" y="17" fill="#333399" />
            <rect width="1" height="1" x="4" y="17" fill="#333399" />
            <rect width="1" height="1" x="5" y="17" fill="#333399" />
            <rect width="1" height="1" x="6" y="17" fill="#0393F9" />
            <rect width="1" height="1" x="7" y="17" fill="#B7F08A" />
            <rect width="1" height="1" x="8" y="17" fill="#23D36D" />
            <rect width="1" height="1" x="9" y="17" fill="#91735E" />
            <rect width="1" height="1" x="10" y="17" fill="#333399" />
            <rect width="1" height="1" x="11" y="17" fill="#0393F9" />
            <rect width="1" height="1" x="12" y="17" fill="#333399" />
            <rect width="1" height="1" x="13" y="17" fill="#333399" />
            <rect width="1" height="1" x="14" y="17" fill="#333399" />
            <rect width="1" height="1" x="15" y="17" fill="#333399" />
            <rect width="1" height="1" x="16" y="17" fill="#333399" />
            <rect width="1" height="1" x="17" y="17" fill="#333399" />
            <rect width="1" height="1" x="18" y="17" fill="#333399" />
            <rect width="1" height="1" x="19" y="17" fill="#333399" />
            <rect width="1" height="1" x="0" y="18" fill="#333399" />
            <rect width="1" height="1" x="1" y="18" fill="#333399" />
            <rect width="1" height="1" x="2" y="18" fill="#333399" />
            <rect width="1" height="1" x="3" y="18" fill="#333399" />
            <rect width="1" height="1" x="4" y="18" fill="#333399" />
            <rect width="1" height="1" x="5" y="18" fill="#333399" />
            <rect width="1" height="1" x="6" y="18" fill="#23D36D" />
            <rect width="1" height="1" x="7" y="18" fill="#0393F9" />
            <rect width="1" height="1" x="8" y="18" fill="#DBD186" />
            <rect width="1" height="1" x="9" y="18" fill="#0393F9" />
            <rect width="1" height="1" x="10" y="18" fill="#333399" />
            <rect width="1" height="1" x="11" y="18" fill="#333399" />
            <rect width="1" height="1" x="12" y="18" fill="#333399" />
            <rect width="1" height="1" x="13" y="18" fill="#333399" />
            <rect width="1" height="1" x="14" y="18" fill="#333399" />
            <rect width="1" height="1" x="15" y="18" fill="#333399" />
            <rect width="1" height="1" x="16" y="18" fill="#333399" />
            <rect width="1" height="1" x="17" y="18" fill="#333399" />
            <rect width="1" height="1" x="18" y="18" fill="#333399" />
            <rect width="1" height="1" x="19" y="18" fill="#333399" />
            <rect width="1" height="1" x="0" y="19" fill="#333399" />
            <rect width="1" height="1" x="1" y="19" fill="#333399" />
            <rect width="1" height="1" x="2" y="19" fill="#333399" />
            <rect width="1" height="1" x="3" y="19" fill="#333399" />
            <rect width="1" height="1" x="4" y="19" fill="#333399" />
            <rect width="1" height="1" x="5" y="19" fill="#0393F9" />
            <rect width="1" height="1" x="6" y="19" fill="#0393F9" />
            <rect width="1" height="1" x="7" y="19" fill="#23D36D" />
            <rect width="1" height="1" x="8" y="19" fill="#0393F9" />
            <rect width="1" height="1" x="9" y="19" fill="#0393F9" />
            <rect width="1" height="1" x="10" y="19" fill="#333399" />
            <rect width="1" height="1" x="11" y="19" fill="#333399" />
            <rect width="1" height="1" x="12" y="19" fill="#333399" />
            <rect width="1" height="1" x="13" y="19" fill="#333399" />
            <rect width="1" height="1" x="14" y="19" fill="#333399" />
            <rect width="1" height="1" x="15" y="19" fill="#333399" />
            <rect width="1" height="1" x="16" y="19" fill="#333399" />
            <rect width="1" height="1" x="17" y="19" fill="#333399" />
            <rect width="1" height="1" x="18" y="19" fill="#333399" />
            <rect width="1" height="1" x="19" y="19" fill="#333399" />
          </g>
          <g transform="translate(-143 -69)">
            <path
              fill="none"
              stroke="#94A3B3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M176.988 387.483A4.992 4.992 0 0 0 173 385.5a4.992 4.992 0 0 0-3.988 1.983m7.975 0a6 6 0 1 0-7.975 0m7.975 0A5.977 5.977 0 0 1 173 389a5.977 5.977 0 0 1-3.988-1.517M175 381.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
            />
          </g>
          <text className="a c" x="44" y="314">
            A85572C
          </text>
          <text className="b d" x="44" y="334">
            Captured by
          </text>
          <g transform="translate(-143 -69)">
            <path
              fill="none"
              stroke="#94A3B3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m285.5 380 2 1.5-2 1.5m3 0h2m-6 5.5h9a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5v8a1.5 1.5 0 0 0 1.5 1.5z"
            />
          </g>
          <text className="a c" x="160" y="314">
            A91094E
          </text>
          <text className="b d" x="160" y="334">
            Solution
          </text>
          <g transform="translate(-143 -69)">
            <path
              fill="none"
              stroke="#94A3B3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M176 437.5h-6m6 0a2 2 0 0 1 2 2h-10a2 2 0 0 1 2-2m6 0v-2.25a.75.75 0 0 0-.75-.75h-.58m-4.67 3v-2.25a.75.75 0 0 1 .75-.75h.581m3.338 0h-3.338m3.338 0a4.97 4.97 0 0 1-.654-2.115m-2.684 2.115a4.97 4.97 0 0 0 .654-2.115m-3.485-4.561c-.655.095-1.303.211-1.944.347a4.002 4.002 0 0 0 3.597 3.314m-1.653-3.661V428a4.49 4.49 0 0 0 1.653 3.485m-1.653-3.661v-1.01a32.226 32.226 0 0 1 4.5-.314c1.527 0 3.03.107 4.5.313v1.011m-7.347 3.661a4.484 4.484 0 0 0 1.832.9m5.515-4.561V428a4.49 4.49 0 0 1-1.653 3.485m1.653-3.661a30.88 30.88 0 0 1 1.944.347 4.002 4.002 0 0 1-3.597 3.314m0 0a4.484 4.484 0 0 1-1.832.9m0 0a4.515 4.515 0 0 1-2.03 0"
            />
          </g>
          <text>
            <tspan className="a c" x="44" y="364" style={{ fontSize: '16px' }}>
              16{' '}
            </tspan>
            <tspan className="d" y="366" fontFamily="A" fill="#94A3B3">
              / 221
            </tspan>
          </text>
          <text className="b d" x="44" y="384">
            Rank
          </text>
          <g transform="translate(-143 -69)">
            <path
              fill="none"
              stroke="#94A3B3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M289 429v4h3m3 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"
            />
          </g>
          <text className="a c" x="160" y="364">
            43:59:12
          </text>
          <text className="b d" x="160" y="384">
            Solve time
          </text>
        </svg>
      </g>
    </svg>
  );
};

export default CTFFeature;
