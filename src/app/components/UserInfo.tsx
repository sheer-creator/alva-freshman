import svgPaths from "@/data/svg-guyqw4in5w";
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

const USER_NAME = 'YGGYLL';
const API_KEYS_PAGE_HASH = 'api-keys';

function Avatar() {
  const initial = USER_NAME.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...USER_NAME].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: 48, height: 48, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 48 * 0.44, color: '#fff', lineHeight: 1, letterSpacing: 0, fontFamily: "'Delight', sans-serif" }}>
        {initial}
      </span>
    </div>
  );
}

function EditL() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="edit-l1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="edit-l1">
          <path d={svgPaths.p3c865280} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex h-[26px] items-center relative shrink-0" data-name="Icon">
      <EditL />
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">YGGYLL</p>
      <Icon />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[5%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.6003 12.6">
        <g id="Group">
          <path d={svgPaths.p1336a380} fill="var(--fill-0, #4285F4)" id="Vector" />
          <path d={svgPaths.p1ab03700} fill="var(--fill-0, #34A853)" id="Vector_2" />
          <path d={svgPaths.p21044080} fill="var(--fill-0, #FBBC05)" id="Vector_3" />
          <path d={svgPaths.p1b002980} fill="var(--fill-0, #EB4335)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function LogoSocial() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Logo/Social">
      <Group />
    </div>
  );
}

function Login() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Login">
      <LogoSocial />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-pre-wrap">sheer@alva.xyz</p>
    </div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-h-px min-w-px relative" data-name="Info">
      <Name />
      <Login />
    </div>
  );
}

function BasicInfo() {
  return (
    <div className="content-stretch flex gap-[12px] items-start py-[20px] relative shrink-0 w-full" data-name="Basic Info">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.07)] border-b border-solid inset-0 pointer-events-none" />
      <Avatar />
      <Info />
    </div>
  );
}

function CreditL() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="credit-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="credit-l">
          <path d={svgPaths.p285bff80} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ListItemR() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="List Item/R">
      <CreditL />
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Item">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Credits Records</p>
    </div>
  );
}

function ListItemL() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[22px] items-center min-h-px min-w-px relative" data-name="List Item/L">
      <ListItemR />
      <Item />
    </div>
  );
}

function ArrowRightL() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="arrow-right-l2">
          <path d={svgPaths.p370d6700} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function ListItemR1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="List Item/R">
      <p className="font-['Delight',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#49a3a6] text-[14px] tracking-[0.14px]">12000</p>
      <ArrowRightL />
    </div>
  );
}

function ListItemMain() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[12px] relative shrink-0 w-full" data-name="List Item/Main">
      <ListItemL />
      <ListItemR1 />
    </div>
  );
}

function ApiKeysL() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="api-keys-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path
          d="M12.4987 4.16675C14.5702 4.16675 16.2497 5.8463 16.2497 7.91777C16.2497 9.98923 14.5702 11.6688 12.4987 11.6688C11.7423 11.6688 11.038 11.4449 10.4489 11.0598L7.45581 14.0539V16.2501H5.25964V18.3334H2.75964V15.5338L8.97979 9.31361C8.76522 8.8817 8.74774 8.45129 8.74774 7.91777C8.74774 5.8463 10.4273 4.16675 12.4987 4.16675ZM12.4987 5.83341C11.3477 5.83341 10.4144 6.76675 10.4144 7.91777C10.4144 9.06878 11.3477 10.0021 12.4987 10.0021C13.6498 10.0021 14.5831 9.06878 14.5831 7.91777C14.5831 6.76675 13.6498 5.83341 12.4987 5.83341Z"
          fill="var(--fill-0, black)"
          fillOpacity="0.9"
        />
      </svg>
    </div>
  );
}

function ListItemRApiKeys() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="List Item/R">
      <ApiKeysL />
    </div>
  );
}

function ItemApiKeys() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Item">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">API Keys</p>
    </div>
  );
}

function ListItemLApiKeys() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[22px] items-center min-h-px min-w-px relative" data-name="List Item/L">
      <ListItemRApiKeys />
      <ItemApiKeys />
    </div>
  );
}

function ListItemMainApiKeys() {
  return (
    <button
      type="button"
      className="content-stretch flex gap-[8px] items-center py-[12px] px-[4px] -mx-[4px] relative shrink-0 rounded-[6px] w-[calc(100%+8px)] text-left transition-colors hover:bg-[rgba(0,0,0,0.03)]"
      data-name="List Item/Main"
      onClick={() => {
        window.location.hash = API_KEYS_PAGE_HASH;
      }}
    >
      <ListItemLApiKeys />
      <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="List Item/R">
        <ArrowRightL1 />
      </div>
    </button>
  );
}

function LanguageL() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="language-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="language-l">
          <path d={svgPaths.p7706980} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ListItemR2() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="List Item/R">
      <LanguageL />
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Item">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Language</p>
    </div>
  );
}

function ListItemL1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[22px] items-center min-h-px min-w-px relative" data-name="List Item/L">
      <ListItemR2 />
      <Item1 />
    </div>
  );
}

function ArrowRightL1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="arrow-right-l2">
          <path d={svgPaths.p370d6700} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function ListItemR3() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="List Item/R">
      <ArrowRightL1 />
    </div>
  );
}

function ListItemMain1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[12px] relative shrink-0 w-full" data-name="List Item/Main">
      <ListItemL1 />
      <ListItemR3 />
    </div>
  );
}

function LogoutL() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="logout-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="logout-l">
          <path d={svgPaths.p982ba80} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ListItemR4() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="List Item/R">
      <LogoutL />
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Item">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Log Out</p>
    </div>
  );
}

function ListItemL2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[22px] items-center min-h-px min-w-px relative" data-name="List Item/L">
      <ListItemR4 />
      <Item2 />
    </div>
  );
}

function ArrowRightL2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="arrow-right-l2">
          <path d={svgPaths.p370d6700} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function ListItemR5() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="List Item/R">
      <ArrowRightL2 />
    </div>
  );
}

function ListItemMain2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[12px] relative shrink-0 w-full" data-name="List Item/Main">
      <ListItemL2 />
      <ListItemR5 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[480px] min-w-[180px] py-[8px] relative shrink-0 w-full" data-name="List">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.07)] border-b border-solid inset-0 pointer-events-none" />
      <ListItemMain />
      <ListItemMainApiKeys />
      <ListItemMain1 />
      <ListItemMain2 />
    </div>
  );
}

function ProjectDiscordL() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="project-discord-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="project-discord-l">
          <path d={svgPaths.p1705fd00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">
          <ProjectDiscordL />
        </div>
      </div>
    </div>
  );
}

function ProjectTelegramL() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="project-telegram-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="project-telegram-l">
          <path d={svgPaths.p30e25500} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">
          <ProjectTelegramL />
        </div>
      </div>
    </div>
  );
}

function LogoSocial1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Logo/Social">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Logo/Social">
          <path d={svgPaths.p1a857180} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">
          <LogoSocial1 />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="20">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="20">
          <path d={svgPaths.p1ae3a8f0} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <button
      type="button"
      onClick={() => { window.location.hash = 'docs'; }}
      className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px] cursor-pointer hover:bg-[rgba(0,0,0,0.03)] transition-colors"
    >
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">
          <Component />
        </div>
      </div>
    </button>
  );
}

function Social() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[20px] relative rounded-[6px] shrink-0 w-full" data-name="Social">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

export default function UserInfo() {
  return (
    <div className="bg-white relative rounded-[6px] size-full" data-name="User Info">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[20px] relative rounded-[inherit] size-full">
        <BasicInfo />
        <List />
        <Social />
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.04)]" />
    </div>
  );
}
