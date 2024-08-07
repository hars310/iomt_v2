"use client"
import { EthereumProvider } from "@/contexts/EthereumContext"
import { SessionProvider } from "next-auth/react"

export const Providers = ({children}:{children:React.ReactNode}) =>{
    return (
        <SessionProvider>
            <EthereumProvider>
            {children}
            </EthereumProvider>
        </SessionProvider>
    )
}