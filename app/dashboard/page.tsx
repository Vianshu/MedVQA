"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Paperclip, SendHorizonal, Menu, ChevronLeft, 
  X, Plus, Trash2, Settings, User, Sparkles, 
  LogOut
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";

interface Message {
  id: string;
  chatId: string;
  content: string;
  attachments: UploadedFile[];
  userId: string;
  createdAt: Date;
  user: { name: string; avatar?: string };
}

interface UploadedFile {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
}

interface Chat {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [chats, setChats] = useState<Chat[]>([{ id: "chat1", name: "Empty" }]);
  const [activeChat, setActiveChat] = useState<string>("chat1");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth/login");
  }, [isAuthenticated, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && attachments.length === 0) {
      toast.warning("Message or attachment required");
      return;
    }

    const localAttachments: UploadedFile[] = attachments.map(file => ({
      id: Date.now().toString() + Math.random().toString(),
      fileName: file.name,
      fileType: file.type,
      url: URL.createObjectURL(file),
    }));

    const tempMessage: Message = {
      id: Date.now().toString(),
      chatId: activeChat,
      content: newMessage,
      attachments: localAttachments,
      userId: user?.uid || "unknown",
      createdAt: new Date(),
      user: { 
        name: user?.displayName || "User", 
        avatar: user?.photoURL || undefined 
      },
    };

    setMessages(prev => [...prev, tempMessage]);
    setNewMessage("");
    setAttachments([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: `chat${Date.now()}`,
      name: `Chat ${chats.length + 1}`,
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    if (chats.length === 0) {
      toast.warning("You need at least one chat");
      return;
    }
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (chatId === activeChat) {
      setActiveChat(chats[0].id);
    }
  };

  const filteredMessages = messages.filter(msg => msg.chatId === activeChat);

  return (
    <div className="h-screen flex">
      <div className={`fixed left-0 top-0 h-full bg-background border-r z-10 transition-all duration-300 ${sidebarExpanded ? "w-64" : "w-16"}`}>
        <div className="flex flex-col h-full">
          {/* Top Section */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              {sidebarExpanded && <span className="font-bold text-lg">Med-VQA+</span>}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarExpanded(prev => !prev)}
                className="h-8 w-8"
              >
                {sidebarExpanded ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
              
          {/* Chat List - Only visible when expanded */}
          {sidebarExpanded && (
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <Button
                onClick={createNewChat}
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
              {chats.map(chat => (
                <div key={chat.id} className="flex items-center gap-1 group">
                  <Button
                    variant={activeChat === chat.id ? "secondary" : "ghost"}
                    onClick={() => setActiveChat(chat.id)}
                    className="w-full justify-start px-4"
                  >
                    {chat.name}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 invisible group-hover:visible"
                    onClick={() => deleteChat(chat.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Section */}
          <div className="mt-auto border-t p-2">
            <div className="flex flex-col gap-2">
              {/* Profile Section */}
              <div className={`flex items-center ${sidebarExpanded ? "gap-3 px-2" : "justify-center"}`}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                {sidebarExpanded && (
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{user?.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                )}
              </div>
              
              {/* Settings & Logout */}
              <div className={`flex ${sidebarExpanded ? "flex-col gap-1" : "flex-col items-center gap-2"}`}>
                <Button
                  variant="ghost"
                  size={sidebarExpanded ? "default" : "icon"}
                  className={`w-full ${!sidebarExpanded && "h-10 w-10"}`}
                  onClick={() => toast.info("Settings coming soon")}
                >
                  <Settings className="h-4 w-4" />
                  {sidebarExpanded && <span className="ml-2">Settings</span>}
                </Button>
              
                <Button
                  variant="ghost"
                  size={sidebarExpanded ? "default" : "icon"}
                  className={`w-full ${!sidebarExpanded && "h-10 w-10"}`}
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  {sidebarExpanded && <span className="ml-2">Logout</span>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarExpanded ? "ml-64" : "ml-16"
      } pt-16`}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
          {filteredMessages.map(message => {
            const isUser = message.userId === (user?.uid || "unknown");
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={message.user.avatar} />
                    <AvatarFallback>
                      {message.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-4 ${
                    isUser
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-background"
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">{message.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(message.createdAt, "HH:mm")}
                      </span>
                    </div>
                  )}
                  {message.content && <p className="text-sm mb-2">{message.content}</p>}
                  {message.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {message.attachments.map(file => (
                        <a
                          key={file.id}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 bg-muted/50 rounded border text-sm hover:bg-muted/30"
                        >
                          {file.fileType.startsWith("image/") ? (
                            <img
                              src={file.url}
                              alt={file.fileName}
                              className="h-16 w-16 object-cover rounded"
                            />
                          ) : (
                            <>
                              <Paperclip className="h-4 w-4" />
                              <span className="truncate max-w-[120px]">{file.fileName}</span>
                            </>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                  {isUser && (
                    <div className="mt-2 text-xs text-muted-foreground text-right">
                      {format(message.createdAt, "HH:mm")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <form onSubmit={handleSendMessage} className="border-t p-4 bg-background sticky bottom-0">
          <div className="flex flex-col gap-2">
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-muted/20 rounded-full text-sm"
                  >
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate max-w-[120px]">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}