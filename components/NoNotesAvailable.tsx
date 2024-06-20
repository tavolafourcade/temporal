import Image from "next/image";

import { Button } from "@/components/ui/button";

const NoNotesAvailable = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl leading-[30px]">No notes here yet</p>
      <p className="text-base text-grey-subtext mb-2">
        Click the plus to add a note.
      </p>
      <Button size="icon" className="hover:cursor-pointer">
        <Image
          src={"assets/icons/btnAdd.svg"}
          alt="add icon"
          width={16}
          height={16}
          className="text-white"
        />
      </Button>
    </div>
  );
};

export default NoNotesAvailable;
