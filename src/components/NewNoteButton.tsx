'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'
// import toast from "react-hot-toast"
import { toast } from "sonner"
import { createNoteAction } from "@/actions/notes"
type Props = {
    user: User | null
}
function NewNoteButton({ user }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleClickNewNoteButton = async () => {
        if (!user) {
            router.push('/login')
        } else {
            setLoading(true)
            const uuid = uuidv4()
            await createNoteAction(uuid)
            router.push(`/?noteId=${uuid}`)
            toast('new note')
            // toast({ title: 'new note created', description: 'you must be logged in', variant: 'success' })
            setLoading(false)
        }
    }
    console.log(user?.email)
    return (
        <Button onClick={(handleClickNewNoteButton)} variant='secondary' className="w-24" disabled={loading}>
            {loading ? <Loader2 className="animate-spin"></Loader2> : 'new note'}
        </Button>
    )
}

export default NewNoteButton







// "use client";

// import { User } from "@supabase/supabase-js";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
// // import { createNoteAction } from "@/actions/notes";

// type Props = {
//     user: User | null;
// };

// function NewNoteButton({ user }: Props) {
//     const router = useRouter();

//     const [loading, setLoading] = useState(false);

//     const handleClickNewNoteButton = async () => {
//         if (!user) {
//             router.push("/login");
//         } else {
//             setLoading(true);

//             const uuid = uuidv4();
//             // await createNoteAction(uuid);
//             router.push(`/?noteId=${uuid}&toastType=newNote`);

//             setLoading(false);
//         }
//     };

//     return (
//         <Button
//             onClick={handleClickNewNoteButton}
//             variant="secondary"
//             className="w-24"
//             disabled={loading}
//         >
//             {loading ? <Loader2 className="animate-spin" /> : "New Note"}
//         </Button>
//     );
// }

// export default NewNoteButton;