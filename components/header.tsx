"use client"

import { useState, useEffect } from "react"
// components
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import Menu from "@/components/menu"
import Login from "@/components/login"
import { toast } from "sonner"
// store
import { Button } from "./ui/button"
// utils
import Cookies from "js-cookie"

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logout = () => {
        Cookies.remove("token")
        setIsLoggedIn(false)

        if (!Cookies.get("token")) {
            toast.success("Logged out", {
                description: "Successfully!",
            })
        } else {
            toast.error("Logout failed", {
                description: "Please try again.",
            })
        }
    }

    useEffect(() => {
        const token = Cookies.get("token")
        setIsLoggedIn(!!token)
    }, [])

    return (
        <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
            <Link href="/">
                Blog + JWT
            </Link>
            {isLoggedIn ? <Menu /> : <div />}
            <div>
                {isLoggedIn ? (
                    <Button
                        type="button"
                        variant="link"
                        onClick={logout}
                    >
                        logout
                    </Button>)
                    : (<Login />)}
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header
