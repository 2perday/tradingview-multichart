import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Plus } from "lucide-react";

interface NavBarProps {
    onAddItem: () => void;
}

export default function NavBar({ onAddItem }: NavBarProps) {
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
