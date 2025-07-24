'use client'

const ErrorLayout = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">An error occurred</h1>
                <p className="text-gray-600">Please try again later.</p>
            </div>
        </div>
    )
}

export default ErrorLayout