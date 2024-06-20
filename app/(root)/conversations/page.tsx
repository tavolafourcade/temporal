import ChatInputField from "@/components/shared/conversation/ChatInputField";
import ContactActionBar from "@/components/shared/conversation/ContactActionbar";
import ConversationSection from "@/components/shared/conversation/ConversationSection";

export default function Page() {
  return (
    <section className="w-full flex flex-col h-screen bg-whispering-white">
      <ContactActionBar />
      <ConversationSection />
      <ChatInputField />
    </section>
  );
}
