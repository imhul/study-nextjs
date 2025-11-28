"use client"

import { create, StateCreator } from "zustand"
// middleware
import { devtools } from "zustand/middleware"

interface AuthSlice {
    loggedIn: boolean
    setLoggedIn: (loggedIn: boolean) => void
}

export type Store = AuthSlice

type CreateAuthSliceType = StateCreator<
    Store,
    [["zustand/devtools", never]],
    [],
    AuthSlice
>

const createAuthSlice: CreateAuthSliceType = (set) => ({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
})

export const useStore = create<Store>()(
    devtools((...args) => ({
        ...createAuthSlice(...args),
    })),
)
