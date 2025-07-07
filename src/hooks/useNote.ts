'use client'

import { NoteProviderContext } from "@/providers/NoteProvider"
import { useContext } from "react"

function useNote() {
    const context = useContext(NoteProviderContext)
    if (!context) throw Error('useNote must be used with provider')
    return context
}
export default useNote