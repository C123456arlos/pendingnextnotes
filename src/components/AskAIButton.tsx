'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Fragment, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "./ui/textarea"
import { ArrowUpIcon } from "lucide-react"
import { askAiAboutNotesAction } from "@/actions/notes"
import '@/styles/ai-response.css'
type Props = {
    user: User | null
}

function AskAIButton({ user }: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const [questionText, setQuestionText] = useState('')
    const [questions, setQuestions] = useState<string[]>([])
    const [responses, setResponses] = useState<string[]>([])
    const handleOnOpenChange = (isOpen: boolean) => {
        if (!user) {
            router.push('/login')
        } else {
            if (isOpen) {
                setQuestionText('');
                setQuestions([]);
                setResponses([]);

            }
            setOpen(isOpen)
        }
    }
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const handleInput = () => {
        const textarea = textareaRef.current
        if (!textarea) return
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }
    const handleClickInput = () => {
        textareaRef?.current?.focus()
    }
    const handleSubmit = () => {
        if (!questionText.trim()) return
        const newQuestions = [...questions, questionText]
        setQuestions(newQuestions)
        setQuestionText('')
        setTimeout(scrollToBottom, 100)
        startTransition(async () => {
            const response = await askAiAboutNotesAction(newQuestions, responses)
            setResponses(prev => [...prev, response])
            setTimeout(scrollToBottom, 100)
        })
    }
    const scrollToBottom = () => {
        contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }
    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="secondary">ask ai</Button>
                </DialogTrigger>
                <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto" ref={contentRef}>
                    <DialogHeader>
                        <DialogTitle>ask ai about your notes</DialogTitle>
                        <DialogDescription>
                            our ai can answer questions about all your notes
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex flex-col gap-8">{questions.map((question, index) => (
                        <Fragment key={index}>
                            <p className="ml-autp mx-w-[60%] rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground">
                                {question}
                            </p>
                            {responses[index] &&
                                (<p className="bot-response text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: responses[index] }}></p>)
                            }
                        </Fragment>
                    ))}
                        {isPending && <p className="animate-pulse text-sm">thinking</p>}
                    </div>
                    <div className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
                        onClick={handleClickInput}>
                        <Textarea ref={textareaRef} placeholder="ask me anything about your notes" className="resize-none rounded-none
                            border-none bg-transparent p-0 shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                            rows={1} onInput={handleInput} onKeyDown={handleKeyDown} value={questionText} onChange={(e) => setQuestionText(e.target.value)} style={{ minHeight: '0', lineHeight: 'normal' }}
                        ></Textarea>
                        <Button className="ml-auto size-8 rounded-full">
                            <ArrowUpIcon className="text-background"></ArrowUpIcon>
                        </Button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default AskAIButton

