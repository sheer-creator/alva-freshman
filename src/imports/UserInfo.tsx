import svgPaths from "./svg-guyqw4in5w";
import imgAvatar from "figma:asset/13cfcc8363d46d8e6a81daeb285c9348de3c8bad.png";
import imgImage from "figma:asset/b6ec6224880e49a1fd078b50b5b248ac0bdaff74.png";

function Avatar() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[48px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar} />
      <div className="absolute left-0 rounded-[100px] size-[48px] top-0" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage} />
      </div>
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
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">YGGYLL</p>
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
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-pre-wrap">sheer@alva.xyz</p>
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
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Credits Records</p>
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
      <p className="font-['Delight:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#49a3a6] text-[14px] tracking-[0.14px]">12000</p>
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
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Language</p>
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
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Log Out</p>
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
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">
          <Component />
        </div>
      </div>
    </div>
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