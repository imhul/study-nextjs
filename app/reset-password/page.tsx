"use client"

import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// api
import api from "@/app/(server)/auth-api"
// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
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
import { KeyRound } from "lucide-react"

const formSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirm: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

const ResetPassword = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""
    const token = searchParams.get("token") || ""

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirm: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { confirm, password } = values

        if (confirm !== password) {
            toast.error("New Password", {
                description: "Passwords do not match!",
            })
            return
        }

        try {
            await api.post(
                "/set_password",
                { email, new_password: password, token }
            )

            toast.success("New Password", {
                description: "Success!",
            })
        } catch (err) {
            toast.error("New Password", {
                description: "Error!",
            })
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                <p className="text-gray-600">Please enter your new password below.</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                        id="login-form"
                    >
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
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <KeyRound />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="Confirm Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Confirm your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            Set new password
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ResetPassword
