import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Plus, Link } from "lucide-react";
import { useState } from "react";

interface NavBarProps {
    onAddItem: () => void;
}

export default function NavBar({ onAddItem }: NavBarProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyURL = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy URL:', error);
        }
    };

    return (
        <nav className="border-b">
            <div className="flex mx-auto px-4 py-1 w-full justify-between">
                <div className="flex justify-start">
                    <NavigationMenu className="w-full">
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <button
                                    onClick={onAddItem}
                                    className="p-1 hover:bg-accent rounded"
                                    title="Add Chart"
                                >
                                    <Plus className="size-5" />
                                </button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <button
                                    onClick={handleCopyURL}
                                    className={`p-1 hover:bg-accent rounded transition-colors ${copied ? 'text-green-500' : ''}`}
                                    title="Copy Share URL"
                                >
                                    <Link className="size-5" />
                                </button>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex justify-end">
                    <NavigationMenu className="">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <ModeToggle />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </nav>
    )
}
