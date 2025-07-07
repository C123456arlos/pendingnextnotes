'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"
import { deleteNoteAction } from "@/actions/notes"

type Props = {
    noteId: string,
    deleteNoteLocally: (noteId: string) => void
}
// const toast = useToast()
const DeleteNoteButton = ({ noteId, deleteNoteLocally }: Props) => {
    const noteIdParam = useSearchParams().get('noteId') || ''
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const handleDeleteNote = () => {
        startTransition(async () => {
            const { errorMessage } = await deleteNoteAction(noteId)
            if (!errorMessage) {
                // toast({ title: 'note deleted', description: 'note deleted successfully', variant: 'success' })
                toast('success deleting note')
                deleteNoteLocally(noteId)
                if (noteId === noteIdParam) {
                    router.replace('/')
                }
            } else {
                toast('error')
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 size-7 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
                    variant='ghost'>
                    <Trash2></Trash2>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this note</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteNote} className="w-24 background-destructive text-destructive-foreground
                    hover:bg-destructive/90">{isPending ? <Loader2 className="animate-spin"></Loader2> : 'delete'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteNoteButton



