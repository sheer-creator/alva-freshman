/**
 * [INPUT]: AppShell
 * [OUTPUT]: 首页 — 1:1 翻译 mono-meta OpenAlvaHero.tsx
 * [POS]: 页面层 — Home
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import UserInfo from '@/app/components/UserInfo';
import { AppShell } from '@/app/components/shell/AppShell';
import { FeaturedPlaybooks } from '@/app/components/FeaturedPlaybooks';
import homepageBg from '@/assets/homepage-bg.webp';
import homepageBgMobile from '@/assets/homepage-bg-mobile.webp';

/* ========== Config (from mono-meta config.ts) ========== */

const INSTALL_COMMAND = 'npx skills add https://github.com/alva-ai/skills';
const GITHUB_URL = 'https://github.com/alva-ai/skills';

const INSTALL_PROMPT = `Install Alva skill by running: ${INSTALL_COMMAND}
Important: Use the skill directory that belongs to the current agent.`;

/* ========== Icons (exact SVGs from @repo/icons) ========== */

function IconKeyL({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={`[&_path]:fill-current ${className || ''}`}>
      <path fill="#000" d="M12.5 2a5.5 5.5 0 0 1 0 11 5.48 5.48 0 0 1-3.783-1.51L6.206 14 7.5 15.298a1 1 0 0 1 0 1.413l-1.294 1.295a1 1 0 0 1-1.414 0l-1.295-1.297-.644.645a.5.5 0 0 1-.707-.707l5.908-5.91A5.5 5.5 0 0 1 12.5 2M4.206 16.002 5.5 17.299l1.293-1.295-1.295-1.296zM12.5 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9" />
    </svg>
  );
}

function IconSocialGithub({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={`[&_path]:fill-current ${className || ''}`}>
      <path fill="#fff" d="M8.586 13.876c-2.364-.287-4.03-1.987-4.03-4.19 0-.895.323-1.862.86-2.506-.233-.591-.197-1.845.072-2.365.716-.089 1.683.287 2.256.806.68-.215 1.397-.321 2.274-.321s1.594.106 2.238.304c.555-.502 1.54-.878 2.256-.789.25.485.287 1.738.054 2.346.573.681.877 1.594.877 2.525 0 2.203-1.665 3.868-4.064 4.172.609.394 1.02 1.253 1.02 2.238v1.863c0 .536.448.841.985.626 3.241-1.236 5.784-4.476 5.784-8.487 0-5.068-4.119-9.203-9.185-9.203-5.068 0-9.15 4.135-9.15 9.203a9.03 9.03 0 0 0 5.926 8.505c.484.179.95-.144.95-.627v-1.432a2.3 2.3 0 0 1-.86.179c-1.182 0-1.88-.644-2.381-1.844-.198-.484-.413-.77-.825-.824-.215-.018-.286-.107-.286-.215 0-.215.358-.376.716-.376.52 0 .967.322 1.433.985.358.519.734.752 1.182.752s.734-.162 1.145-.573c.305-.304.538-.573.753-.752" />
    </svg>
  );
}

function IconCopyL({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={`[&_path]:fill-current ${className || ''}`}>
      <path fill="#000" fillRule="evenodd" d="M16.502 5.64a1.1 1.1 0 0 1 1.1 1.1v9.762a1.1 1.1 0 0 1-1.1 1.1H6.741a1.1 1.1 0 0 1-1.1-1.1V6.74a1.1 1.1 0 0 1 1.1-1.1zm-9.761 1a.1.1 0 0 0-.1.1v9.762a.1.1 0 0 0 .1.1h9.761a.1.1 0 0 0 .1-.1V6.74a.1.1 0 0 0-.1-.1zm7.198-4.242a1.1 1.1 0 0 1 1.1 1.1v.856a.5.5 0 0 1-1 0v-.856a.1.1 0 0 0-.1-.1H3.498a.1.1 0 0 0-.1.1V13.94a.1.1 0 0 0 .1.1h.855a.5.5 0 0 1 0 1h-.855a1.1 1.1 0 0 1-1.1-1.1V3.498a1.1 1.1 0 0 1 1.1-1.1z" clipRule="evenodd" />
    </svg>
  );
}

/* Platform icons (raw = true → 保持原色不 fill-current) */

function IconSocialLangChain({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <g clipPath="url(#social-lang-chain_svg__a)">
        <path fill="#FF4D4D" d="M10 2.435c-5 0-7.5 4.167-7.5 7.5s2.5 6.667 5 7.5v1.667h1.667v-1.667s.833.334 1.666 0v1.667H12.5v-1.667c2.5-.833 5-4.166 5-7.5s-2.5-7.5-7.5-7.5" />
        <path fill="#FF4D4D" d="M3.333 8.268c-2.5-.833-3.333.833-2.5 2.5s2.5.833 3.334-.833c.5-1.167 0-1.667-.833-1.667Zm13.334 0c2.5-.833 3.333.833 2.5 2.5s-2.5.833-3.334-.833c-.5-1.167 0-1.667.834-1.667" />
        <path stroke="#FF4D4D" strokeLinecap="round" strokeWidth={2} d="M7.5 3.268Q5.834 1.602 5 2.101m7.5 1.167q1.666-1.666 2.5-1.167" />
        <path fill="#000" d="M7.5 7.601a1 1 0 1 0 0-2 1 1 0 0 0 0 2m5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        <path fill="#00E5CC" d="M7.667 6.768a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667m5 0a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667" />
      </g>
      <defs>
        <clipPath id="social-lang-chain_svg__a"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath>
      </defs>
    </svg>
  );
}

function IconSocialCrewAi({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <path fill="#000" d="M17.97 5.016 10.393.642a.79.79 0 0 0-.787 0L2.03 5.016a.66.66 0 0 0-.331.573v8.822c0 .236.126.455.33.573l7.578 4.374c.243.14.543.14.786 0l7.577-4.374a.66.66 0 0 0 .331-.573V5.589a.66.66 0 0 0-.33-.573zm-.476.927L10.18 18.612c-.05.085-.18.05-.18-.049v-8.295a.47.47 0 0 0-.233-.402L2.584 5.718c-.086-.05-.05-.18.048-.18h14.629a.27.27 0 0 1 .233.405" />
    </svg>
  );
}

function IconSocialAsterisk({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <g fill="#D97757" clipPath="url(#social-asterisk_svg__a)">
        <path d="m19.11 7.92.693.397v.297l-.198.693-8.416 1.98-.791-1.966 8.712-1.4Z" />
        <path d="m15.962 2.097.969.203.257.317.245.76-.101.484-5.648 7.723-1.881-1.881 5.208-6.835z" />
        <path d="m11.09.891.594-.396.495.198.495.693-1.356 8.151-.921-.626-.396-1.09.693-6.138z" />
        <path d="m4.739 1.022.61-.78.398-.09.79.115.39.305 2.84 6.298 1.028 2.992-1.202.668L5.01 2.216l-.27-1.194Z" />
        <path d="m1.783 5.347-.198-.793.594-.693.693.1h.198L7.23 7.03l1.287.99 1.782 1.386-.99 1.683-.891-.693-.594-.594-5.743-4.06z" />
        <path d="M.595 10.495.147 10v-.44l.448-.154 5.05.297 4.95.396-.16.986-9.444-.49z" />
        <path d="M3.565 15.648h-.99l-.393-.453v-.542l1.68-1.188 6.834-4.35.691 1.182z" />
        <path d="m5.447 18.416-.396.099-.594-.297.099-.495L10.397 10l.792 1.09-4.356 5.742z" />
        <path d="m10.397 19.406-.297.396-.594.198-.495-.396-.297-.594 1.485-8.02.891.1z" />
        <path d="M15.447 17.228v.792l-.1.297-.395.198-.693-.092-4.76-7.083 1.889-1.44 1.584 2.872.15 1.04 2.326 3.415Z" />
        <path d="m17.724 16.039.099.495-.297.396-.297-.099-1.683-1.188-2.575-2.277-1.98-1.386.594-1.881.99.594.594 1.089z" />
        <path d="m16.437 10.99 2.475.198.594.396.396.594v.428l-1.089.463-5.544-1.386-2.278-.099.594-2.08 1.584 1.189z" />
      </g>
      <defs>
        <clipPath id="social-asterisk_svg__a"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath>
      </defs>
    </svg>
  );
}

function IconSocialHuggingFace({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <g fill="#000" clipPath="url(#social-hugging-face_svg__a)">
        <path d="M13.643 11.55a.727.727 0 0 1 0 1.454h-2.732a.727.727 0 0 1 0-1.454zM6.438 7.1a.727.727 0 0 1 .997.25L8.8 9.625a.73.73 0 0 1 0 .749l-1.366 2.277a.728.728 0 0 1-1.247-.749L7.33 10 6.188 8.097a.727.727 0 0 1 .25-.997" />
        <path fillRule="evenodd" d="M8.91.982a4.93 4.93 0 0 1 3.193 1.172 4.933 4.933 0 0 1 5.656 3.6c.186.699.215 1.43.086 2.142a4.946 4.946 0 0 1-2.1 7.848 4.94 4.94 0 0 1-7.848 2.101 5 5 0 0 1-.88.081 4.944 4.944 0 0 1-4.862-5.823A4.92 4.92 0 0 1 .99 9.163l-.008-.255a4.95 4.95 0 0 1 3.273-4.654A4.95 4.95 0 0 1 8.909.982Zm0 1.451a3.5 3.5 0 0 0-3.375 2.588.73.73 0 0 1-.514.514 3.495 3.495 0 0 0-1.563 5.843.73.73 0 0 1 .186.7 3.492 3.492 0 0 0 4.28 4.279l.094-.02a.72.72 0 0 1 .604.206 3.495 3.495 0 0 0 5.844-1.565l.03-.09a.72.72 0 0 1 .483-.423 3.5 3.5 0 0 0 2.589-3.373c0-.964-.392-1.838-1.024-2.47a.72.72 0 0 1-.186-.7 3.496 3.496 0 0 0-4.281-4.278.72.72 0 0 1-.7-.187 3.5 3.5 0 0 0-2.287-1.02z" clipRule="evenodd" />
      </g>
      <defs>
        <clipPath id="social-hugging-face_svg__a"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath>
      </defs>
    </svg>
  );
}

function IconSocialVercelLike({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <mask id="social-vercel-like_svg__a" width={20} height={18} x={0} y={1} maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
        <path fill="#000" d="M17.415 18.023c1.02.765 2.548.255 1.147-1.146-4.204-4.076-3.312-15.284-8.534-15.284s-4.33 11.208-8.534 15.284c-1.528 1.529.127 1.91 1.146 1.146 3.949-2.674 3.694-7.387 7.388-7.387s3.439 4.713 7.387 7.387" />
      </mask>
      <g mask="url(#social-vercel-like_svg__a)">
        <g filter="url(#social-vercel-like_svg__b)"><path fill="#FFE432" d="M.101-2.202c-.31 2.73 2.043 5.24 5.256 5.604 3.212.365 6.068-1.553 6.378-4.283s-2.043-5.24-5.256-5.604C3.267-6.85.411-4.932.101-2.202" /></g>
        <g filter="url(#social-vercel-like_svg__c)"><path fill="#FC413D" d="M12.486 6.724c.805 3.465 4.328 5.607 7.87 4.785s5.76-4.299 4.955-7.764-4.328-5.607-7.87-4.785-5.76 4.299-4.955 7.764" /></g>
        <g filter="url(#social-vercel-like_svg__d)"><path fill="#00B95C" d="M-8.588 9.048c1.017 3.576 5.597 5.407 10.23 4.09S9.207 7.852 8.19 4.276 2.592-1.131-2.04.187s-7.565 5.284-6.548 8.86Z" /></g>
        <g filter="url(#social-vercel-like_svg__e)"><path fill="#00B95C" d="M-8.588 9.048c1.017 3.576 5.597 5.407 10.23 4.09S9.207 7.852 8.19 4.276 2.592-1.131-2.04.187s-7.565 5.284-6.548 8.86Z" /></g>
        <g filter="url(#social-vercel-like_svg__f)"><path fill="#00B95C" d="M-4.911 12.013c2.55 2.604 6.94 2.44 9.807-.367s3.124-7.193.574-9.797-6.94-2.44-9.807.367-3.124 7.193-.574 9.797" /></g>
        <g filter="url(#social-vercel-like_svg__g)"><path fill="#3186FF" d="M8.427 21.834c.791 3.408 4.094 5.553 7.376 4.791s5.302-4.143 4.51-7.552-4.094-5.554-7.377-4.791-5.301 4.143-4.51 7.552Z" /></g>
        <g filter="url(#social-vercel-like_svg__h)"><path fill="#FBBC04" d="M2.83-5.391c-1.657 3.693.157 8.104 4.052 9.852s8.396.173 10.054-3.52-.156-8.104-4.051-9.852-8.397-.173-10.055 3.52" /></g>
        <g filter="url(#social-vercel-like_svg__i)"><path fill="#3186FF" d="M-1.61 30.25c-4.013-1.575 2.845-14.537 4.55-18.881 1.706-4.345 6.342-6.59 10.355-5.014s8.77 10.253 7.065 14.597C18.654 25.297 2.403 31.826-1.61 30.25" /></g>
        <g filter="url(#social-vercel-like_svg__j)"><path fill="#749BFF" d="M22.707 14.118c-1.075 1.254-3.879.615-6.263-1.428s-3.446-4.715-2.371-5.97c1.074-1.253 3.878-.614 6.262 1.429s3.446 4.715 2.372 5.97Z" /></g>
        <g filter="url(#social-vercel-like_svg__k)"><path fill="#FC413D" d="M14.686 7.736c4.42 2.989 9.508 3.185 11.366.438S25.834.777 21.415-2.212c-4.419-2.99-9.507-3.186-11.366-.439s.218 7.397 4.637 10.387" /></g>
        <g filter="url(#social-vercel-like_svg__l)"><path fill="#FFEE48" d="M.18 2.874c-1.095 2.64-.738 5.298.798 5.934s3.668-.988 4.763-3.629.737-5.298-.798-5.934S1.274.233.179 2.874Z" /></g>
      </g>
      <defs>
        <filter id="social-vercel-like_svg__b" width={14.58} height={12.868} x={-1.372} y={-7.976} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={0.723} /></filter>
        <filter id="social-vercel-like_svg__c" width={27.135} height={26.881} x={5.331} y={-8.206} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={3.495} /></filter>
        <filter id="social-vercel-like_svg__d" width={29.065} height={25.69} x={-14.732} y={-6.183} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.971} /></filter>
        <filter id="social-vercel-like_svg__e" width={29.065} height={25.69} x={-14.732} y={-6.183} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.971} /></filter>
        <filter id="social-vercel-like_svg__f" width={25.778} height={25.75} x={-12.61} y={-5.944} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.971} /></filter>
        <filter id="social-vercel-like_svg__g" width={23.524} height={23.945} x={2.608} y={8.481} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.824} /></filter>
        <filter id="social-vercel-like_svg__h" width={25.569} height={25.035} x={-2.901} y={-14.743} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.559} /></filter>
        <filter id="social-vercel-like_svg__i" width={32.708} height={33.779} x={-7.421} y={1.281} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.285} /></filter>
        <filter id="social-vercel-like_svg__j" width={17.652} height={16.861} x={9.564} y={1.989} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.045} /></filter>
        <filter id="social-vercel-like_svg__k" width={24.273} height={21.61} x={5.914} y={-8.043} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={1.727} /></filter>
        <filter id="social-vercel-like_svg__l" width={15.381} height={18.39} x={-4.73} y={-5.168} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_460_40599" stdDeviation={2.138} /></filter>
      </defs>
    </svg>
  );
}

function IconSocialOpenAi({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <mask id="social-open-ai_svg__a" width={16} height={20} x={2} y={0} maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' as const }}>
        <path fill="#fff" d="M18 0H2v20h16z" />
      </mask>
      <g mask="url(#social-open-ai_svg__a)">
        <path fill="#4B4646" d="M14 16H6V8h8z" />
        <path fill="#F1ECEC" d="M14 4H6v12h8zm4 16H2V0h16z" />
      </g>
    </svg>
  );
}

const PLATFORM_ICONS = [
  IconSocialLangChain,
  IconSocialCrewAi,
  IconSocialAsterisk,
  IconSocialHuggingFace,
  IconSocialVercelLike,
  IconSocialOpenAi,
] as const;

/* ==========================================================
 * 以下 1:1 翻译 OpenAlvaHero.tsx 结构
 * 把 design token 替换为对应的 px 值：
 *   px-m → px-[16px]       px-xxl → px-[28px]
 *   pt-xxxxxl → pt-[56px]  mt-xs → mt-[16px]
 *   mt-m → mt-[24px]       mt-xxl → mt-[40px]
 *   mt-l → mt-[28px]       mt-xxxl → mt-[48px]
 *   mt-s → mt-[20px]       px-s → px-[12px]
 *   px-l → px-[20px]       py-m → py-[16px]
 *   gap-m → gap-[20px]     gap-s → gap-[16px]
 *   gap-l → gap-[24px]     gap-xs → gap-[12px]
 *   px-xxxxl → px-[40px]
 *   text-n9 → text-[rgba(0,0,0,0.9)]
 *   text-n7 → text-[rgba(0,0,0,0.7)]
 *   text-n10 → text-black
 *   text-n-r10 → text-white
 *   text-m1 → text-[rgb(135,94,183)]
 *   bg-b10 → bg-white
 *   bg-b-r10 → bg-black
 *   border-l9 → border-[rgba(0,0,0,0.9)]
 *   border-l3 → border-[rgba(0,0,0,0.3)]
 *   rounded-ct-xl → rounded-none (0px)
 *   rounded-btn-m → rounded-[2px]
 *   shadow-l → (omit, minimal)
 * ========================================================== */

const HeroDecor = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 h-[200px] overflow-hidden md:h-[400px]"
  >
    <div
      className="absolute inset-0 bg-no-repeat md:hidden"
      style={{ backgroundImage: `url(${homepageBgMobile})`, backgroundSize: '768px 200px', backgroundPosition: 'center top' }}
    />
    <div
      className="absolute inset-0 hidden bg-no-repeat md:block"
      style={{ backgroundImage: `url(${homepageBg})`, backgroundSize: 'max(100%, 2280px) auto', backgroundPosition: 'center top' }}
    />
    <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-b from-transparent to-white md:h-[200px]" />
  </div>
);

const HeroAction = ({
  href,
  icon: Icon,
  children,
  external = false,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: string;
  external?: boolean;
}) => {
  const linkProps = external
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href };

  return (
    <a
      {...linkProps}
      className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors cursor-pointer border-[0.5px] border-[rgba(0,0,0,0.3)] text-[rgba(0,0,0,0.9)] hover:bg-[rgba(0,0,0,0.03)] active:bg-[rgba(0,0,0,0.05)] h-[48px] px-[20px] text-base rounded-[6px] min-w-0 flex-1 gap-[6px] md:w-[200px] md:flex-none"
    >
      <Icon className="size-[16px] shrink-0 md:size-[18px]" />
      <span className="whitespace-nowrap">{children}</span>
    </a>
  );
};

const InstallPrompt = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-[28px] w-full max-w-[748px] md:mt-[28px]">
      <button
        type="button"
        onClick={handleCopy}
        className="group block w-full text-left cursor-pointer"
      >
        <span className="relative block overflow-hidden rounded-[12px] border-[0.5px] border-[rgba(0,0,0,0.9)] bg-white px-[12px] pb-0 pt-[12px] md:px-0">
          <span className="block text-center text-[14px] font-medium leading-[22px] text-black md:px-[40px] md:text-[16px] md:leading-[26px]">
            Copy the prompt below and tell your agent:
          </span>

          <span className="-mx-[12px] mt-[12px] flex items-center gap-[20px] rounded-[12px] bg-black px-[16px] py-[16px] md:mx-0 md:mt-[12px] md:px-[20px]">
            <code className="min-w-0 flex-1 text-[14px] leading-[22px] text-white md:tracking-normal" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span className="block truncate">
                Install Alva skill by running: {INSTALL_COMMAND}
              </span>
              <span className="block truncate text-white">
                Important: Use the skill directory that belongs to the current
                agent.
              </span>
            </code>

            <IconCopyL className="size-[20px] shrink-0 text-white" />
          </span>
        </span>
      </button>
    </div>
  );
};

const PlatformIcons = () => (
  <div className="mt-[28px] flex items-center justify-center gap-[20px] md:mt-[28px] md:gap-[24px]">
    {PLATFORM_ICONS.map((Icon, index) => (
      <span
        key={index}
        className="flex size-[20px] items-center justify-center"
      >
        <Icon className="size-[20px]" />
      </span>
    ))}
  </div>
);

/* ========== OpenAlvaHero (1:1 翻译) ========== */

const OpenAlvaHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white px-[16px] pt-[56px] text-center md:px-[28px] md:pt-[80px]">
      <HeroDecor />

      <div className="relative z-10 mx-auto flex w-full flex-col items-center">
        <h1 className="max-w-[760px] text-[24px] font-normal leading-[34px] tracking-[0.01em] text-[rgba(0,0,0,0.9)] md:max-w-[520px] md:text-[32px] md:leading-[42px]">
          Ideas in. <span className="text-[#49A3A6]">Alpha</span> out.
        </h1>

        <p className="mt-[8px] max-w-[760px] text-[13px] leading-[20px] tracking-[0.01em] text-[rgba(0,0,0,0.7)] md:mt-[8px] md:max-w-[820px] md:text-[12px] md:leading-[20px]">
          One skill. Data, backtesting, visualization, live signals —
          everything your agent needs to ship an investing playbook.
        </p>

        <InstallPrompt />

        <div className="mt-[28px] flex w-full flex-row items-center gap-[16px] md:mt-[28px] md:max-w-none md:justify-center">
          <HeroAction href="#api-keys" icon={IconKeyL}>
            API Keys
          </HeroAction>

          <HeroAction href={GITHUB_URL} icon={IconSocialGithub} external>
            Quick Start
          </HeroAction>
        </div>

        <PlatformIcons />
      </div>
    </section>
  );
};

/* ========== Home Page ========== */

export default function Home({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <>
      <AppShell
        activePage="home"
        onNavigate={onNavigate!}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="no-scrollbar block h-full w-full overflow-y-auto">
          <OpenAlvaHero />
          <div className="mx-auto w-full max-w-[1200px] mb-[32px] px-0 md:px-[28px]">
            <div className="flex flex-col gap-y-[24px] pt-[56px] px-[16px] md:pt-[56px] md:px-0">
              <FeaturedPlaybooks />
            </div>
          </div>
        </div>
      </AppShell>
      {isUserInfoOpen && (
        <div
          className="fixed bottom-[56px] left-[8px] w-[320px] z-[9999]"
          onMouseEnter={() => setIsUserInfoOpen(true)}
          onMouseLeave={() => setIsUserInfoOpen(false)}
        >
          <UserInfo />
        </div>
      )}
    </>
  );
}
