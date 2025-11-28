"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Cookies from "js-cookie"
// api
import api from "@/app/(server)/auth-api"
// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
// icons
import { Mail, KeyRound, ShieldCheck } from "lucide-react"

const formSchema = z.object({
    email: z.email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

const Login = () => {
    const [isDirty, setIsDirty] = useState(false)
    const [formType, setFormType] = useState<"login" | "register" | "password_reset">("login")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsDirty(false)
        const { email, password } = values
        const body = { email }
        if (formType !== "password_reset") Object.assign(body, { password })

        try {
            const res = await api.post("/" + formType, body)
            Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: 'strict' })
            toast.success(formType, {
                description: "Success!",
            })
        } catch (err) {
            toast.error(formType, {
                description: "Error!",
            })
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="link">
                    login
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader className="my-8">
                        <DrawerTitle className="capitalize text-2xl">
                            <div className="flex justify-center">
                                <ShieldCheck />
                            </div>
                            {formType !== "password_reset" ? (formType) : "Reset password"} form
                        </DrawerTitle>
                        <DrawerDescription className="text-lg">
                            Please enter your {formType !== "password_reset" ? (formType) : "email"} details below.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                    id="login-form"
                                >
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <Mail />
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        autoComplete="off"
                                                        onInput={() => !isDirty && setIsDirty(true)}
                                                        placeholder="Email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter your email.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {formType !== "password_reset" && (
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <KeyRound />
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            autoComplete="new-password"
                                                            onInput={() => !isDirty && setIsDirty(true)}
                                                            placeholder="Password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Enter your password.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                    <div className="flex justify-between my-4">
                                        <Button
                                            type="button"
                                            variant="link"
                                            onClick={() => setFormType((prev) => prev === "login" ? "register" : "login")}
                                        >
                                            sign-{formType === "login" ? "up" : "in"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="link"
                                            onClick={() => setFormType("password_reset")}
                                        >
                                            forget password?
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                    <DrawerFooter>
                        <div className="flex justify-between my-12">
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            <Button type="submit" form="login-form" disabled={!(isDirty || formType === "password_reset")} className="capitalize">
                                {formType !== "password_reset" ? (formType) : "Reset password"}
                            </Button>
                        </div>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default Login
