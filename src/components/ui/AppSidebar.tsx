import { getUser } from "@/auth/server"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma"
import { Note } from "@prisma/client"
import Link from "next/link"
import SidebarGroupContent from "../SidebarGroupContent"

async function AppSidebar() {
    const user = await getUser()
    let notes: Note[] = []
    if (user) {
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
    }
    return (
        <Sidebar>
            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2 mt-2 text-lg">
                        {user ? 'your notes' : <p><Link
                            href='/login' className="underline">log in</Link>to see your notes</p>}
                    </SidebarGroupLabel>
                    {user && <SidebarGroupContent notes={notes}></SidebarGroupContent>}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
export default AppSidebar




// import { getUser } from "@/auth/server";
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarGroupLabel,
// } from "@/components/ui/sidebar";
// import { prisma } from "@/db/prisma";
// import { Note } from "@prisma/client";
// import Link from "next/link";
// import SidebarGroupContent from "../SidebarGroupContent";

// async function AppSidebar() {
//     const user = await getUser();

//     let notes: Note[] = [];

//     if (user) {
//         notes = await prisma.note.findMany({
//             where: {
//                 authorId: user.id,
//             },
//             orderBy: {
//                 updatedAt: "desc",
//             },
//         });
//     }

//     return (
//         <Sidebar>
//             <SidebarContent className="custom-scrollbar">
//                 <SidebarGroup>
//                     <SidebarGroupLabel className="mb-2 mt-2 text-lg">
//                         {user ? (
//                             "Your Notes"
//                         ) : (
//                             <p>
//                                 <Link href="/login" className="underline">
//                                     Login
//                                 </Link>{" "}
//                                 to see your notes
//                             </p>
//                         )}
//                     </SidebarGroupLabel>
//                     {user && <SidebarGroupContent notes={notes} />}
//                 </SidebarGroup>
//             </SidebarContent>
//         </Sidebar>
//     );
// }

// export default AppSidebar;