import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Mail,
    Phone,
    Clock,
    CheckCircle2,
    ReplyAll,
    AlertCircle,
    MessageSquare,
    User,
    Calendar,
    Inbox,
    Eye,
    Loader2,
    ChevronRight,
} from "lucide-react";
import SEO from "@/components/seo";
import { BACKEND_URL } from "@/constant";
import { Button } from "@/components/ui/button";


// --- Types based on your Schema ---
interface Reply {
    subject: string;
    body: string;
    date_time: string;
}

interface Message {
    id: number;
    name: string;
    email: string;
    phone?: string;
    description: string;
    seen: boolean;
    reply: Reply | null;
    date_time: string;
}

// --- Mock Data Generator (Simplified for brevity) ---
const mockFetch = (): Promise<{ data: Message[] }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        id: 1,
                        name: "Alice Johnson",
                        email: "alice@example.com",
                        phone: "123-456-7890",
                        description: "I am having trouble with the login page. It keeps refreshing every time I try to access my account. This has been happening for the past 2 days.",
                        seen: false,
                        reply: null,
                        date_time: new Date().toISOString(),
                    },
                    {
                        id: 2,
                        name: "Bob Smith",
                        email: "bob@example.com",
                        description: "Just wanted to say the new UI looks amazing! The dark theme and smooth animations really enhance the user experience. Great job team!",
                        seen: true,
                        reply: null,
                        date_time: new Date(Date.now() - 86400000).toISOString(),
                    },
                    {
                        id: 3,
                        name: "Charlie Brown",
                        email: "charlie@example.com",
                        phone: "555-123-4567",
                        description: "When will my order #9921 be shipped? I placed the order 3 days ago and haven't received any shipping confirmation yet. Can you provide an update?",
                        seen: true,
                        reply: {
                            subject: "Order #9921 Update",
                            body: "Hi Charlie, thank you for reaching out. Your order has been processed and was shipped this morning via FedEx. You should receive tracking information within 24 hours. We appreciate your patience!",
                            date_time: new Date().toISOString(),
                        },
                        date_time: new Date(Date.now() - 172800000).toISOString(),
                    },
                    {
                        id: 4,
                        name: "David Wilson",
                        email: "david.wilson@business.com",
                        description: "Interested in your enterprise pricing plans for teams of 50+ users. Could you send me detailed information about features and pricing tiers?",
                        seen: false,
                        reply: null,
                        date_time: new Date(Date.now() - 3600000).toISOString(),
                    },
                    {
                        id: 5,
                        name: "Emma Garcia",
                        email: "emma.g@designstudio.com",
                        phone: "444-555-6666",
                        description: "Loving the new dashboard features! The analytics section is particularly helpful for tracking our team's performance metrics.",
                        seen: true,
                        reply: {
                            subject: "Thank you for your feedback!",
                            body: "Hi Emma, we're thrilled to hear you're enjoying the new dashboard features! Our team worked hard on the analytics section, and we're glad it's helping your team. We have more updates coming soon!",
                            date_time: new Date(Date.now() - 43200000).toISOString(),
                        },
                        date_time: new Date(Date.now() - 259200000).toISOString(),
                    },
                ],
            });
        }, 1500);
    });
};

export default function MessageInbox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("unread");
    const [error, _setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/get-my-messages`);
            setMessages(response.data.data || []);
        } catch (err) {
            console.error(err);
            const m = await mockFetch();
            setMessages(m.data);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMarkAsRead = async (id: number) => {
        try {
            await axios.put(`${BACKEND_URL}/update-message-to-read`, { id });
            setMessages(prev => prev.map(msg =>
                msg.id === id ? { ...msg, seen: true } : msg
            ));
        } catch (error) {
            alert(error)
            console.error("Failed to mark as read:", error);
        }
    };

    // --- Filtering Logic ---
    const unreadMessages = messages?.filter((m) => !m.seen && !m.reply);
    const pendingMessages = messages?.filter((m) => m.seen && !m.reply);
    const repliedMessages = messages?.filter((m) => m.reply !== null);


    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-4 md:pt-8">
                <div className="max-w-6xl mx-auto p-3 md:p-8">
                    <div className="p-6 md:p-8 text-center bg-gradient-to-r from-red-900/20 to-red-950/20 rounded-2xl border border-red-800/50 backdrop-blur-sm">
                        <AlertCircle className="mx-auto h-10 md:h-12 w-10 md:w-12 mb-3 md:mb-4 text-red-400" />
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Connection Error</h3>
                        <p className="text-red-300 text-sm md:text-base">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-4 md:pt-8">
            <SEO
                title="Message Inbox | Vyaktify Media Dashboard"
                description="View and manage customer messages."
            />
            <div className="max-w-6xl mx-auto p-3 md:p-8 mt-20">
                {/* Header with Mobile Optimization */}
                <div className="mb-6 md:mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg">
                            <Inbox className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold text-white">Message Inbox</h1>
                            <p className="text-gray-400 text-sm md:text-base">Manage customer inquiries and responses</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={fetchData}
                            disabled={refreshing}
                            className="ml-auto"
                        >
                            {refreshing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Refresh"
                            )}
                        </Button>
                    </div>


                </div>

                <Card className="shadow-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-3 md:p-6">
                        {loading ? (
                            <MessageSkeleton />
                        ) : (
                            <Tabs
                                defaultValue="unread"
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full"
                            >
                                <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg md:rounded-xl border border-gray-700/50">
                                    <TabsTrigger
                                        value="unread"
                                        className="relative text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/30 data-[state=active]:to-blue-700/30 data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-500/30 rounded transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-1 md:gap-2">
                                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${activeTab === 'unread' ? 'bg-blue-400' : 'bg-gray-500'}`} />
                                            <span className="hidden sm:inline text-white">Unread</span>
                                            <span className="sm:hidden text-white">New</span>
                                            {unreadMessages.length > 0 && (
                                                <span className="ml-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-[8px] md:text-[10px] text-white font-bold">
                                                    {unreadMessages.length}
                                                </span>
                                            )}
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="pending"
                                        className="text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600/30 data-[state=active]:to-yellow-700/30 data-[state=active]:text-yellow-400 data-[state=active]:border data-[state=active]:border-yellow-500/30 rounded transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-1 md:gap-2">
                                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${activeTab === 'pending' ? 'bg-yellow-400' : 'bg-gray-500'}`} />
                                            <span className="hidden sm:inline text-white">Pending</span>
                                            <span className="sm:hidden text-white">Pending</span>
                                            <span className="ml-1 text-[10px] text-gray-400">
                                                ({pendingMessages.length})
                                            </span>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="replied"
                                        className="text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600/30 data-[state=active]:to-green-700/30 data-[state=active]:text-green-400 data-[state=active]:border data-[state=active]:border-green-500/30 rounded transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-1 md:gap-2">
                                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${activeTab === 'replied' ? 'bg-green-400' : 'bg-gray-500'}`} />
                                            <span className="hidden sm:inline text-white">Replied</span>
                                            <span className="sm:hidden text-white">Done</span>
                                            <span className="ml-1 text-[10px] text-gray-400">
                                                ({repliedMessages.length})
                                            </span>
                                        </div>
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="unread" className="animate-fade-in">
                                    <MessageList
                                        data={unreadMessages}
                                        type="unread"
                                        onMarkAsRead={handleMarkAsRead}
                                    />
                                </TabsContent>

                                <TabsContent value="pending" className="animate-fade-in">
                                    <MessageList
                                        data={pendingMessages}
                                        type="pending"
                                        onMarkAsRead={handleMarkAsRead}
                                    />
                                </TabsContent>

                                <TabsContent value="replied" className="animate-fade-in">
                                    <MessageList
                                        data={repliedMessages}
                                        type="replied"
                                        onMarkAsRead={handleMarkAsRead}
                                    />
                                </TabsContent>
                            </Tabs>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// --- Sub-Component: The Message List & Accordion ---
function MessageList({
    data,
    type,
    onMarkAsRead
}: {
    data: Message[];
    type: "unread" | "pending" | "replied";
    onMarkAsRead: (id: number) => Promise<void>;
}) {
    const [markingAsRead, setMarkingAsRead] = useState<number | null>(null);

    const handleMarkRead = async (id: number) => {
        setMarkingAsRead(id);
        try {
            await onMarkAsRead(id);
        } finally {
            setMarkingAsRead(null);
        }
    };

    if (data.length === 0) {
        return (
            <div className="text-center py-10 md:py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl md:rounded-2xl border-2 border-dashed border-gray-700/50 backdrop-blur-sm">
                <div className="inline-flex p-3 md:p-4 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-full mb-3 md:mb-4">
                    <Mail className="h-8 w-8 md:h-12 md:w-12 text-gray-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-400 mb-2">
                    No {type} messages
                </h3>
                <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto px-4">
                    {type === 'unread'
                        ? 'All messages have been read'
                        : type === 'pending'
                            ? 'No pending messages requiring action'
                            : 'No replies have been sent yet'
                    }
                </p>
            </div>
        );
    }

    return (
        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
            {data.map((msg) => (
                <AccordionItem
                    key={msg.id}
                    value={`item-${msg.id}`}
                    className="border border-gray-700/50 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm data-[state=open]:from-gray-700/40 data-[state=open]:to-gray-800/40 transition-all duration-300 hover:border-gray-600/50"
                >
                    <AccordionTrigger className="hover:no-underline py-3 md:py-5 px-3 md:px-6 hover:bg-gray-700/20 transition-colors group">
                        <div className="flex w-full text-left items-start gap-3 md:gap-4 pr-2 md:pr-4">
                            {/* Status Indicator - Mobile Optimized */}
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className={`
                                    w-2.5 h-2.5 md:w-3 md:h-3 rounded-full animate-pulse
                                    ${type === "unread" ? "bg-blue-500 ring-2 md:ring-4 ring-blue-900/30" : ""}
                                    ${type === "pending" ? "bg-yellow-500 ring-2 md:ring-4 ring-yellow-900/30" : ""}
                                    ${type === "replied" ? "bg-green-500 ring-2 md:ring-4 ring-green-900/30" : ""}
                                `} />
                                <div className="p-1.5 md:p-2 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg">
                                    <User className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Sender Info - Mobile Optimized */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`text-sm md:text-base font-bold truncate ${type === "unread" ? "text-white" : "text-gray-300"}`}>
                                                {msg.name}
                                            </h4>
                                            <p className="text-xs md:text-sm text-gray-400 truncate flex items-center gap-1">
                                                <Mail className="h-2.5 w-2.5 md:h-3 md:w-3 flex-shrink-0" />
                                                <span className="truncate">{msg.email}</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            {/* Date & Time - Mobile */}
                                            <div className="flex items-center gap-1 text-[10px] md:text-xs text-gray-500 whitespace-nowrap">
                                                <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                                {format(new Date(msg.date_time), "MMM d")}
                                            </div>
                                            {!msg.seen && type !== "replied" && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-[8px] md:text-xs px-1.5 py-0.5 bg-blue-900/20 border-blue-700/30 text-blue-300"
                                                >
                                                    New
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message Preview - Mobile */}
                                    <p className="text-xs md:text-sm text-gray-500 mt-2 line-clamp-2 md:line-clamp-1">
                                        {msg.description.substring(0, 60)}...
                                    </p>
                                </div>
                            </div>

                            {/* Chevron Icon */}
                            <ChevronRight className="h-4 w-4 text-gray-500 group-data-[state=open]:rotate-90 transition-transform ml-1" />
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-4 md:pb-6 px-3 md:px-6 pt-2">
                        <div className="grid gap-4 md:gap-5 border-t border-gray-700/50 pt-4">
                            {/* Contact Details - Mobile Optimized */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-lg md:rounded-xl border border-gray-700/30">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="p-1.5 md:p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg">
                                        <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                        <p className="text-xs md:text-sm font-medium text-white truncate">{msg.email}</p>
                                    </div>
                                </div>
                                {msg.phone && (
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="p-1.5 md:p-2 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg">
                                            <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                                            <p className="text-xs md:text-sm font-medium text-white">{msg.phone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Message Content */}
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 md:p-2 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-lg">
                                        <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Customer Message
                                    </span>
                                </div>
                                <div className="p-3 md:p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg md:rounded-xl border border-gray-700/30">
                                    <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                        {msg.description}
                                    </p>
                                </div>
                            </div>

                            {/* Reply Section */}
                            {msg.reply && (
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 md:p-2 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg">
                                            <ReplyAll className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-400" />
                                        </div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
                                            Your Reply
                                        </span>
                                        <span className="text-[9px] md:text-[10px] ml-auto text-gray-500">
                                            {format(new Date(msg.reply.date_time), "PP 'at' p")}
                                        </span>
                                    </div>
                                    <div className="p-3 md:p-4 bg-gradient-to-br from-green-900/10 to-green-950/10 rounded-lg md:rounded-xl border border-green-800/30">
                                        <h5 className="font-medium text-white mb-1 md:mb-2 text-sm md:text-base">{msg.reply.subject}</h5>
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                            {msg.reply.body}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons - Mobile Optimized */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 md:pt-4 border-t border-gray-700/50">
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    <span className="hidden sm:inline">Received</span>
                                    {format(new Date(msg.date_time), "MMM d 'at' h:mm a")}
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    {/* Status Badge */}
                                    <Badge
                                        variant="outline"
                                        className={`
                                            px-2 md:px-4 py-1 md:py-1.5 font-medium text-xs md:text-sm
                                            ${type === "unread"
                                                ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-500/30 text-blue-400"
                                                : type === "replied"
                                                    ? "bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500/30 text-green-400"
                                                    : "bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 border-yellow-500/30 text-yellow-400"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            {type === "unread" && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400 animate-pulse" />}
                                            {type === "pending" && <Clock className="w-3 h-3 md:w-3 md:h-3" />}
                                            {type === "replied" && <CheckCircle2 className="w-3 h-3 md:w-3 md:h-3" />}
                                            <span className="hidden xs:inline">
                                                {type === "unread" ? "Unread" : type === "replied" ? "Resolved" : "Pending"}
                                            </span>
                                        </div>
                                    </Badge>

                                    {/* Mark as Read Button - Show only for unread messages */}
                                    {!msg.seen && type !== "replied" && (
                                        <Button
                                            size="sm"
                                            onClick={() => handleMarkRead(msg.id)}
                                            disabled={markingAsRead === msg.id}
                                            className="flex-1 sm:flex-none bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white border-0"
                                        >
                                            {markingAsRead === msg.id ? (
                                                <>
                                                    <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin mr-1.5" />
                                                    <span className="text-xs md:text-sm">Marking...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1.5" />
                                                    <span className="text-xs md:text-sm">Mark as Read</span>
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

// --- Loading Skeleton ---
function MessageSkeleton() {
    return (
        <div className="space-y-3 md:space-y-4">
            <div className="flex gap-3 md:gap-4 mb-4 md:mb-6">
                <Skeleton className="h-10 md:h-12 flex-1 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-lg md:rounded-xl" />
                <Skeleton className="h-10 md:h-12 flex-1 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-lg md:rounded-xl" />
                <Skeleton className="h-10 md:h-12 flex-1 bg-gradient-to-r from-gray-700 to-gray-800/50 rounded-lg md:rounded-xl" />
            </div>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="h-16 md:h-20 w-full rounded-lg md:rounded-xl bg-gradient-to-r from-gray-700 to-gray-800/50" />
                </div>
            ))}
        </div>
    );
}