"use client"

import Link from 'next/link'
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { config } from "@/lib/config"

function Menu() {
    return (
        <Menubar>
            {config.menu.map((item, index) => (
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
