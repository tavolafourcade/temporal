import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "@/components/shared/Avatar";
import { useLeadContext } from "@/context/LeadContext";
import NoNotesAvailable from "@/components/NoNotesAvailable";

const LeadProfile = () => {
  const { leadProfileOpen, handleLeadProfileOpen } = useLeadContext();

  const data = false;

  return leadProfileOpen ? (
    <section
      className={`w-[368px] h-full border-l border-border text-ttwilight-navy ease-in duration-300 ${
        leadProfileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-full h-[210px] border-b border-border p-6 gap-4 flex flex-col">
        <Image
          src={"/assets/icons/close.svg"}
          alt="close icon"
          width={24}
          height={24}
          className="hover:cursor-pointer self-end"
          onClick={handleLeadProfileOpen}
        />
        <div className="flex flex-col justify-center items-center gap-3">
          <Avatar name="Benjamin Smith" leadProfile />
          <p className="text-xl leading-[30px] font-medium">Benjamin Smith</p>
        </div>
      </div>
      <div className="w-full h-auto  border-b border-border p-6 flex flex-col gap-6">
        <p className="uppercase text-xs leading-[18px] tracking-widest font-semibold">
          Profile
        </p>
        <div className="text-base flex flex-col gap-4">
          <div className="flex items-center justify-between ">
            <p className="text-grey-subtext tracking-wide">Phone number</p>
            <p>+1 555-234-5678</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-grey-subtext tracking-wide">Email</p>
            <p>ben@mail.com</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-grey-subtext tracking-wide">Assignee</p>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row border border-border rounded-lg justify-center items-center h-10 p-3">
                <Image
                  src={"/assets/images/avatarImg.png"}
                  alt="avatar img"
                  width={24}
                  height={24}
                />
                <p className="ml-2 mr-4 tracking-1p">Max Gonzales</p>
                <Image
                  src={"/assets/icons/chevronDown.svg"}
                  alt="avatar img"
                  width={16}
                  height={16}
                />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="w-full h-auto  border-b border-border p-6 flex flex-col gap-6">
        <p className="uppercase text-xs leading-[18px] tracking-widest font-semibold">
          Source
        </p>
        <div className="w-fit flex flex-row border border-border rounded-lg items-center h-10 px-3 py-2 gap-2 hover:cursor-pointer">
          <Image
            src={"/assets/icons/igLogo.svg"}
            alt="Instagram Logo"
            width={24}
            height={24}
          />
          <p>Instagram</p>
        </div>
      </div>
      <div className="w-full h-auto p-6 flex flex-col gap-6">
        <p className="uppercase text-xs leading-[18px] tracking-widest font-semibold">
          Notes
        </p>
        {!data && <NoNotesAvailable />}
      </div>
    </section>
  ) : null;
};

export default LeadProfile;
