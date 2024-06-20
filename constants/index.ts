/* eslint-disable no-unused-vars */
import {
  Ellipsis,
  FolderInput,
  MessageSquareText,
  Paperclip,
  Phone,
  Smile,
  WandSparkles,
} from "lucide-react";

import {
  BotIcon,
  ChartIcon,
  ConversationIcon,
  SettingsIcon,
} from "@/components/icons";
import { ContactActionBarLink, InputIcons, SidebarLink } from "@/types";

export const sidebarLinks: SidebarLink[] = [
  {
    icon: ConversationIcon,
    route: "/conversations",
    label: "Conversations",
  },
  {
    icon: ChartIcon,
    route: "/analytics",
    label: "Analytics",
  },
  {
    icon: BotIcon,
    route: "/workflow-automations",
    label: "Workflow Automations",
  },
  {
    icon: SettingsIcon,
    route: "/settings",
    label: "Settings",
  },
];

export const ConversationsFilters = [
  { name: "Active", value: "active" },
  { name: "NGMI", value: "ngmi" },
  { name: "Completed", value: "completed" },
];

export enum LeadSource {
  INSTAGRAM = "instagram",
  FACEBOOK = "facebook",
  WHATSAPP = "whatsapp",
}

export const contactBarLinks: ContactActionBarLink[] = [
  {
    icon: Phone,
    label: "Phone icon",
  },
  {
    icon: FolderInput,
    label: "Move to folder icon",
  },
  {
    icon: Ellipsis,
    label: "More options icon",
  },
];

export const inputIcons: InputIcons[] = [
  {
    icon: Paperclip,
    label: "Clip attachment icon",
  },
  {
    icon: Smile,
    label: "Emoji icon",
  },
  {
    icon: MessageSquareText,
    label: "Message icon",
  },
  {
    icon: WandSparkles,
    label: "Voice message icon",
  },
];

export enum LastUpdateRange {
  HOURS_24 = "24-hours",
  HOURS_24_TO_72 = "24-to-72-hours",
  UP_2_WEEKS = "2-weeks",
  ALL_TIME = "all-time",
}
