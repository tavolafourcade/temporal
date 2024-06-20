import Image from "next/image";

import { Button } from "@/components/ui/button";

type Props = {
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  title?: string;
  type?: string;
  subtitle: string;
  btnIcon?: string;
  btnIconWidth?: number;
  btnIconHeight?: number;
  btnContent?: string;
};

const NoMessagesAvailable = ({
  image = "/assets/images/bird.svg",
  imageWidth = 320,
  imageHeight = 262,
  title = "No messages here yet...",
  type = "image",
  subtitle,
  btnIcon,
  btnIconWidth,
  btnIconHeight,
  btnContent,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div
          className={`flex flex-col items-center gap-6 ${type === "avatar" ? "rounded-full bg-primary-light p-3" : ""}`}
        >
          <Image
            src={image}
            alt={title}
            width={imageWidth}
            height={imageHeight}
          />
        </div>
        <h2 className="text-center text-xl font-medium text-ttwilight-navy">
          {title}
        </h2>
      </div>
      <p className="pb-6 text-center text-base text-grey-subtext">{subtitle}</p>
      {btnIcon && (
        <Button className="gap-2 bg-ttwilight-navy cursor-pointer text-white">
          <Image
            src={btnIcon}
            alt="btn Icon"
            width={btnIconWidth}
            height={btnIconHeight}
          />
          {btnContent}
        </Button>
      )}
    </div>
  );
};

export default NoMessagesAvailable;
