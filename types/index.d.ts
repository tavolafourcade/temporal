import { ComponentType } from "react";

export interface SidebarLink {
  icon: ComponentType<{ isActive: boolean }>;
  route: string;
  label: string;
}

export interface LeftSidebarIconProps {
  isActive: boolean;
}

export interface Filter {
  name: string;
  value: string;
}

export interface User {
  name: string;
  email: string;
  id: string;
  avatar: string;
  phone: string;
}

export interface Conversation {
  id: string;
  lead_name: string;
  summary: string;
  takeover: boolean;
  final_nudge: boolean;
  all_messages_read: boolean;
  claimed_by: string;
  timestamps: unknown[];
  messages: unknown[];
  last_updated: Timestamp;
  marked_starred?: boolean;
}

export interface ContactActionBarIconProps {
  isActive: boolean;
}

export interface InputIcons {
  icon: ComponentType;
  label: string;
}

export interface ContactActionBarLink {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
}

export interface ChatMessage {
  userName: string;
  userImage: string;
  hour: string;
  message: string;
  read: boolean;
  aiGenerated: boolean;
  thumbsUp: boolean;
}
