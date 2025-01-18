import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/auth";
import Logout from "./Logout";

type Props = { type: "index", tasks: number }
           | { type: "editor", title: string };

export default async function Header(props: Props) {
    const session = await getServerSession(authOptions);

    return (
        <div className="w-full h-12 border-b-2 border-black flex items-center justify-between px-6 pb-2">
            <div className="flex items-center">
                <strong className="text-2xl mr-8"><Link href="/">Translate</Link></strong>
                { props.type === "index"
                ? <span className="text-xl">{ `${props.tasks} tasks` }</span>
                : <span className="text-xl mr-5">{ props.title }</span>
                }
            </div>
            <div className="flex items-center">
                <span className="text-lg mr-6">{ session?.user?.name }</span>
                <Logout />
            </div>
        </div>
    );
}
