"use client";

import React, { use, useState } from "react";
import { signIn, SignInOptions, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Props = {
    searchParams: Promise<SignInOptions>
};

const formSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(2)
});

export default function Page(props: Props) {
    const callbackUrl = use(props.searchParams).callbackUrl || "/";

    const [error, setError] = useState<string | null>(null);

    const { status } = useSession();
    if (status === "authenticated") { redirect(callbackUrl); }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { username: "", password: "" }
    });
 
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const resp = await signIn("login", { ...values, redirect: false });

            if (!resp) {
                setError("Login Internal Error");
                return;
            }

            if (!resp.ok) {
                setError(resp.error || "Unknown Error");
                return;
            }
        } catch (e) {
            setError(e as string);
            return;
        }

        redirect(callbackUrl);
    };

    return (
        <div className="w-full flex flex-col items-center pt-10">
            <h1 className="font-bold text-3xl mb-5">Login</h1>
            { error &&
                <div className="w-30 mb-8">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            { error }
                        </AlertDescription>
                    </Alert>
                </div>
            }

            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="w-1/4 space-y-8">
                    <FormField
                        control={ form.control }
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" { ...field } />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={ form.control }
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password" { ...field } />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Login</Button>
                    <FormDescription>Don't have an account? <Link href={{ pathname: "/auth/register", query: { callbackUrl } }} className="text-blue-600 underline underline-offset-2">Register</Link></FormDescription>
                </form>
            </Form>
        </div>
    );
}
