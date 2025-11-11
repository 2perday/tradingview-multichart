import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/theme/mode-toggle"

export default function NavBar() {
    return (
        <div>
            <nav className="border-b">
                <div className="flex mx-auto px-4 py-1 w-full justify-between">
                    <div className="flex justify-start">
                        {/* <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem className="">
                                    <NavigationMenuTrigger className="text-xs">Settings</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu> */}
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
        </div>
    )
}
