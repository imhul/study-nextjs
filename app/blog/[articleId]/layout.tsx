export const dynamicParams = true

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-3xl mx-auto p-4">
            {children}
        </div>
    )
}
