import Image from "next/image";

import { LeadSource } from "@/constants";

interface AvatarProps {
  name?: string;
  avatarUrl?: string;
  source?: string;
  isOnline?: boolean;
  leadProfile?: boolean;
  actionBar?: boolean;
}

const Avatar = ({
  name,
  avatarUrl,
  source,
  isOnline,
  leadProfile,
  actionBar,
}: AvatarProps) => {
  const getInitials = (name?: string) => {
    const initials = name?.split(" ")[0][0].toUpperCase();
    return initials;
  };

  const getSourceLogo = (source?: string) => {
    switch (source) {
      case LeadSource.INSTAGRAM:
        return "/assets/icons/igLogo.svg";
      case LeadSource.FACEBOOK:
        return "/assets/icons/fbChat.svg";
      case LeadSource.WHATSAPP:
        return "/assets/icons/messengerChat.svg";
      default:
        return null;
    }
  };

  const sourceLogo = getSourceLogo(source);

  return (
    <div className="relative">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Profile picture"
          className="w-12 h-12 rounded-full object-cover"
          width={48}
          height={48}
        />
      ) : (
        <div
          className={`bg-secondary text-white rounded-full flex items-center justify-center font-bold ${leadProfile ? "w-16 h-16 text-2xl" : "w-12 h-12 text-xl"}`}
        >
          {getInitials(name)}
        </div>
      )}
      {sourceLogo && (
        <div className="absolute bottom-0 left-8 w-6 h-6 p-1.5 bg-white border-secondary rounded-full border">
          <Image
            src={sourceLogo}
            alt={`${source} logo`}
            width={16}
            height={16}
          />
        </div>
      )}
      {isOnline && (
        <div className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-white bg-active"></div>
      )}

      {!isOnline && !sourceLogo && !leadProfile && !actionBar && (
        <div className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-white bg-grey-neutral"></div>
      )}
    </div>
  );
};

export default Avatar;
