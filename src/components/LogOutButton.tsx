'use client'
import React from 'react'
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
// import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { logOutAction } from '@/actions/users'
// import { toast } from 'sonner';
// import { Toast } from '@radix-ui/react-toast'
// import { useSonner } from 'sonner'
const LogOutButton = () => {
    // const toast = useSonner()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleLogout = async () => {
        setLoading(true)
        const { errorMessage } = await logOutAction()
        if (!errorMessage) {
            toast.success('success')
            // toast({ title: 'logged out', description: 'successfully logged out', variant: 'success' })
            router.push('/')
        } else {
            // toast({ title: 'error', description: 'errorMessage', variant: 'destructive' })
        }

        setLoading(false)
    }
    return (
        <Button disabled={loading} variant='outline' onClick={handleLogout} className="w-24">{loading ? <Loader2 className="animate-spin"></Loader2> : 'log out'}</Button>
    )
}
export default LogOutButton


