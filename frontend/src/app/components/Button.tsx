"use client"
import { Button } from "@/components/ui/button"

export const PrimaryButton = ({children,onClick}:{
    children:React.ReactNode,
    onClick:()=>void
})=>{
    return (
        <Button onClick={onClick}>
            {children}
        </Button>
    )
}