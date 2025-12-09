// WorkForm.tsx
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Trash2,
    Upload,
    X,
    Palette,
    Sparkles,
    Image as ImageIcon,
    Calendar,
    Users,
    Target,
    Cpu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export const serviceData = [
    {
        id: 1,
        title: "Social Media Management",
        color: "from-amber-500 to-yellow-500",
        bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
        icon: "📱",
    },
    {
        id: 2,
        title: "Video Production",
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10",
        icon: "🎥",
    },
    {
        id: 3,
        title: "UGC Creation",
        color: "from-amber-600 to-yellow-600",
        bgColor: "bg-gradient-to-br from-amber-600/10 to-yellow-600/10",
        icon: "✨",
    },
    {
        id: 4,
        title: "TV Commercials",
        color: "from-yellow-600 to-amber-600",
        bgColor: "bg-gradient-to-br from-yellow-600/10 to-amber-600/10",
        icon: "📺",
    },
    {
        id: 5,
        title: "Graphic Design",
        color: "from-amber-700 to-yellow-700",
        bgColor: "bg-gradient-to-br from-amber-700/10 to-yellow-700/10",
        icon: "🎨",
    },
    {
        id: 6,
        title: "Personal Branding",
        color: "from-yellow-700 to-amber-700",
        bgColor: "bg-gradient-to-br from-yellow-700/10 to-amber-700/10",
        icon: "🌟",
    },
    {
        id: 7,
        title: "Influencer Marketing",
        color: "from-amber-800 to-yellow-800",
        bgColor: "bg-gradient-to-br from-amber-800/10 to-yellow-800/10",
        icon: "📢",
    },
    {
        id: 8,
        title: "Website Development",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
        icon: "🌐",
    },
    {
        id: 9,
        title: "App Development",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
        icon: "📱",
    },
] as const;

const workSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
    client: z.string().min(1, "Client name is required"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description too long"),
    categoryId: z.number().min(1).max(9, "Select a valid category"),
    results: z
        .array(z.string().min(1, "Result cannot be empty"))
        .min(1, "At least one result is required"),
    image: z.instanceof(File).optional().or(z.string()),
    color: z.string(),
    bgColor: z.string(),
    duration: z.string().min(1, "Duration is required"),
    tech: z
        .array(z.string().min(1, "Technology cannot be empty"))
        .min(1, "At least one technology is required"),
});

export type WorkFormData = z.infer<typeof workSchema>;
type Service = (typeof serviceData)[number];

function FormSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black px-3 py-4">
            <div className="mx-auto max-w-lg">
                <Card className="border-neutral-800 bg-neutral-950/80 shadow-xl shadow-black/50">
                    <CardHeader className="space-y-2 border-b border-neutral-800/60 pb-4">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-4 w-52" />
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </div>
                        ))}
                        <div className="flex gap-3 pt-2">
                            <Skeleton className="h-10 flex-1 rounded-lg" />
                            <Skeleton className="h-10 w-28 rounded-lg" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

interface WorkFormProps {
    initialData?: Partial<WorkFormData>;
    onSubmit: (data: WorkFormData) => void | Promise<void>;
    isEditing?: boolean;
    externalSubmitting?: boolean; // from parent (AddWorkPage)
}

const WorkForm = ({
    initialData,
    onSubmit,
    isEditing = false,
    externalSubmitting = false,
}: WorkFormProps) => {
    const [techInput, setTechInput] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<WorkFormData>({
        resolver: zodResolver(workSchema),
        defaultValues: initialData || {
            title: "",
            client: "",
            description: "",
            categoryId: 1,
            results: [""],
            color: "from-amber-500 to-yellow-500",
            bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
            duration: "2-4 weeks",
            tech: [""],
            image: "",
        },
    });

    const results = watch("results") || [""];
    const tech = watch("tech") || [""];
    const categoryId = watch("categoryId");

    // Auto select service theme
    useEffect(() => {
        const service = serviceData.find((s) => s.id === categoryId);
        if (service) {
            setSelectedService(service);
            setValue("color", service.color);
            setValue("bgColor", service.bgColor);
        }
    }, [categoryId, setValue]);

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            return;
        }

        setIsImageUploading(true);
        await new Promise((resolve) => setTimeout(resolve, 300)); // small UX delay

        setValue("image", file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        setIsImageUploading(false);
    };

    const addResult = () => {
        if (results.length >= 10) return;
        setValue("results", [...results, ""]);
    };

    const removeResult = (index: number) => {
        if (results.length <= 1) return;
        const updated = results.filter((_, i) => i !== index);
        setValue("results", updated);
    };

    const updateResult = (index: number, value: string) => {
        const updated = [...results];
        updated[index] = value;
        setValue("results", updated);
    };

    const addTech = () => {
        if (!techInput.trim() || tech.length >= 10) return;
        const cleaned = tech.filter((t) => t.trim() !== "");
        setValue("tech", [...cleaned, techInput.trim()]);
        setTechInput("");
    };

    const removeTech = (index: number) => {
        const updated = tech.filter((_, i) => i !== index);
        setValue("tech", updated.length ? updated : [""]);
    };

    const handleReset = () => {
        reset();
        setTechInput("");
        setImagePreview(null);
    };

    const onSubmitForm = async (data: WorkFormData) => {
        setLocalLoading(true);
        try {
            await onSubmit(data);
        } finally {
            setLocalLoading(false);
        }
    };

    const loading = localLoading || isSubmitting || externalSubmitting;

    if (loading && !imagePreview && !initialData) {
        // only show skeleton on very first submit or load
        return <FormSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black px-3 py-4">
            <div className="mx-auto w-full max-w-lg mt-12 sm:mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <Card className="border border-neutral-800/70 bg-neutral-950/90 shadow-xl shadow-black/40">
                        <CardHeader className="space-y-2 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-sm">
                                    <Sparkles className="h-4 w-4 text-black/80" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold text-white">
                                        {isEditing ? "Edit Project" : "Add New Project"}
                                    </CardTitle>
                                    <CardDescription className="text-xs text-neutral-400">
                                        Keep it short, sharp and client-ready.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5 pb-4">
                            <form
                                onSubmit={handleSubmit(onSubmitForm)}
                                className="space-y-6"
                            >
                                {/* BASIC INFO */}
                                <section className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900">
                                            <Users className="h-3.5 w-3.5 text-amber-300" />
                                        </div>
                                        <p className="text-xs font-medium text-neutral-300">
                                            Basic details
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Title */}
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="title"
                                                className="text-xs font-medium text-neutral-300"
                                            >
                                                Project title *
                                            </Label>
                                            <Input
                                                id="title"
                                                {...register("title")}
                                                className="h-10 rounded-md border-neutral-800 bg-neutral-950 text-sm text-white placeholder:text-neutral-500"
                                                placeholder="Ex: Reel package for café launch"
                                            />
                                            {errors.title && (
                                                <p className="text-[11px] text-red-400">
                                                    {errors.title.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Client */}
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="client"
                                                className="text-xs font-medium text-neutral-300"
                                            >
                                                Client name *
                                            </Label>
                                            <Input
                                                id="client"
                                                {...register("client")}
                                                className="h-10 rounded-md border-neutral-800 bg-neutral-950 text-sm text-white placeholder:text-neutral-500"
                                                placeholder="Ex: Urban Brew Café"
                                            />
                                            {errors.client && (
                                                <p className="text-[11px] text-red-400">
                                                    {errors.client.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="description"
                                                className="text-xs font-medium text-neutral-300"
                                            >
                                                Short description *
                                            </Label>
                                            <Textarea
                                                id="description"
                                                {...register("description")}
                                                className="min-h-[80px] rounded-md border-neutral-800 bg-neutral-950 text-sm text-white placeholder:text-neutral-500"
                                                placeholder="What was the core problem and how did you solve it?"
                                            />
                                            <div className="flex items-center justify-between text-[11px] text-neutral-500">
                                                <span>Max 500 characters</span>
                                                <span>{watch("description")?.length || 0}/500</span>
                                            </div>
                                            {errors.description && (
                                                <p className="text-[11px] text-red-400">
                                                    {errors.description.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* CATEGORY + DURATION */}
                                <section className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900">
                                            <Palette className="h-3.5 w-3.5 text-amber-300" />
                                        </div>
                                        <p className="text-xs font-medium text-neutral-300">
                                            Category & duration
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {/* Category */}
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-medium text-neutral-300">
                                                Service category *
                                            </Label>
                                            <Controller
                                                name="categoryId"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        value={field.value?.toString()}
                                                        onValueChange={(value) =>
                                                            field.onChange(parseInt(value))
                                                        }
                                                    >
                                                        <SelectTrigger className="h-10 rounded-md border-neutral-800 bg-neutral-950 text-sm text-white">
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent className="border-neutral-800 bg-neutral-950 text-sm text-neutral-100">
                                                            {serviceData.map((service) => (
                                                                <SelectItem
                                                                    key={service.id}
                                                                    value={service.id.toString()}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-base">
                                                                            {service.icon}
                                                                        </span>
                                                                        <span>{service.title}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors.categoryId && (
                                                <p className="text-[11px] text-red-400">
                                                    {errors.categoryId.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Duration */}
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-medium text-neutral-300">
                                                Duration *
                                            </Label>
                                            <div className="relative">
                                                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
                                                <Input
                                                    {...register("duration")}
                                                    className="h-10 rounded-md border-neutral-800 bg-neutral-950 pl-9 text-sm text-white placeholder:text-neutral-500"
                                                    placeholder="Ex: 2–4 weeks"
                                                />
                                            </div>
                                            {errors.duration && (
                                                <p className="text-[11px] text-red-400">
                                                    {errors.duration.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Service preview chip */}
                                    {selectedService && (
                                        <div
                                            className={`flex items-center gap-2 rounded-md border border-neutral-800 px-3 py-2 text-xs ${selectedService.bgColor}`}
                                        >
                                            <span className="text-base">{selectedService.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-medium text-neutral-50">
                                                    {selectedService.title}
                                                </p>
                                                <p className="text-[11px] text-neutral-400">
                                                    Theme auto-applied for this project.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <input type="hidden" {...register("color")} />
                                    <input type="hidden" {...register("bgColor")} />
                                </section>

                                {/* RESULTS */}
                                <section className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900">
                                                <Target className="h-3.5 w-3.5 text-amber-300" />
                                            </div>
                                            <p className="text-xs font-medium text-neutral-300">
                                                Key results
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 rounded-full border-neutral-700 text-neutral-200"
                                            onClick={addResult}
                                            disabled={results.length >= 10}
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <AnimatePresence>
                                            {results.map((result, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="relative flex-1">
                                                        <Input
                                                            value={result}
                                                            onChange={(e) =>
                                                                updateResult(index, e.target.value)
                                                            }
                                                            className="h-9 rounded-md border-neutral-800 bg-neutral-950 pl-8 text-xs text-white placeholder:text-neutral-500"
                                                            placeholder="Ex: +40% engagement in 30 days"
                                                        />
                                                        <div className="pointer-events-none absolute left-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 text-[11px] font-semibold text-black">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    {results.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-8 w-8 rounded-full text-neutral-400 hover:text-red-400"
                                                            onClick={() => removeResult(index)}
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {errors.results && (
                                            <p className="text-[11px] text-red-400">
                                                {errors.results.message as string}
                                            </p>
                                        )}
                                        <p className="text-[11px] text-neutral-500">
                                            Add clear, metric-based outcomes ({results.length}/10)
                                        </p>
                                    </div>
                                </section>

                                {/* TECH */}
                                <section className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900">
                                                <Cpu className="h-3.5 w-3.5 text-amber-300" />
                                            </div>
                                            <p className="text-xs font-medium text-neutral-300">
                                                Technologies used
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] text-neutral-400">
                                            {tech.filter((t) => t.trim() !== "").length}/10
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Cpu className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
                                                <Input
                                                    value={techInput}
                                                    onChange={(e) => setTechInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addTech();
                                                        }
                                                    }}
                                                    className="h-9 rounded-md border-neutral-800 bg-neutral-950 pl-9 text-xs text-white placeholder:text-neutral-500"
                                                    placeholder="Ex: Premiere Pro, After Effects, Meta Ads"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                size="icon"
                                                className="h-9 w-9 rounded-full"
                                                onClick={addTech}
                                                disabled={!techInput.trim()}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                            <AnimatePresence>
                                                {tech
                                                    .filter((t) => t.trim() !== "")
                                                    .map((item, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                        >
                                                            <Badge className="flex max-w-[150px] items-center gap-1 rounded-full bg-neutral-900 px-2 py-1 text-[11px] font-normal">
                                                                <Cpu className="h-3 w-3" />
                                                                <span className="truncate">{item}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeTech(index)}
                                                                    className="ml-1 text-neutral-400 hover:text-red-400"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                            </AnimatePresence>
                                        </div>
                                        {errors.tech && (
                                            <p className="text-[11px] text-red-400">
                                                {errors.tech.message as string}
                                            </p>
                                        )}
                                    </div>
                                </section>

                                {/* IMAGE */}
                                <section className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900">
                                            <ImageIcon className="h-3.5 w-3.5 text-amber-300" />
                                        </div>
                                        <p className="text-xs font-medium text-neutral-300">
                                            Cover image
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {(imagePreview ||
                                            (typeof initialData?.image === "string" &&
                                                initialData.image)) && (
                                                <div className="relative overflow-hidden rounded-md border border-neutral-800">
                                                    <img
                                                        src={
                                                            imagePreview ||
                                                            (initialData?.image as string | undefined)
                                                        }
                                                        alt="Preview"
                                                        className="h-40 w-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-neutral-200 hover:bg-black/80"
                                                        onClick={() => {
                                                            setImagePreview(null);
                                                            setValue("image", "");
                                                        }}
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            )}

                                        <div className="rounded-md border border-dashed border-neutral-800 bg-neutral-950/70 px-3 py-4 text-center text-xs">
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={isImageUploading}
                                            />
                                            <Label htmlFor="image" className="cursor-pointer">
                                                <div className="flex flex-col items-center gap-2">
                                                    {isImageUploading ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                                                            <p className="text-[11px] text-amber-300">
                                                                Uploading image...
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900">
                                                                <Upload className="h-4 w-4 text-amber-300" />
                                                            </div>
                                                            <div className="space-y-0.5">
                                                                <p className="text-xs font-medium text-neutral-100">
                                                                    Upload project image
                                                                </p>
                                                                <p className="text-[11px] text-neutral-500">
                                                                    JPG, PNG – Max 5MB
                                                                </p>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="mt-1 h-8 rounded-full border-neutral-700 text-[11px]"
                                                            >
                                                                Choose file
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </Label>
                                        </div>
                                    </div>
                                </section>

                                {/* ACTIONS */}
                                <div className="flex flex-col gap-2 border-t border-neutral-800 pt-4">
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleReset}
                                            disabled={loading || isImageUploading}
                                        >
                                            Reset form
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="h-9 flex-1 rounded-md text-xs font-semibold"
                                            disabled={loading || isImageUploading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    <span>Saving…</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <Sparkles className="h-3.5 w-3.5" />
                                                    <span>{isEditing ? "Update project" : "Create project"}</span>
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-neutral-500">
                                        Your project will show up on the “Our Work” section once saved.
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default WorkForm;
