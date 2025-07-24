"use client"

import Link from 'next/link'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

const menu = [
    {
        label: "Home",
        url: "/",
    },
    {
        label: "About",
        url: "/about",
    },
    {
        label: "Blog",
        url: "/blog",
    }
]

function Menu() {

    return (
        <Menubar>
            {menu.map((item, index) => (
                <MenubarMenu key={index}>
                    <MenubarTrigger>
                        <Link href={item.url}>
                            {item.label}
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
            ))}
        </Menubar>
    )
}

export default Menu
