import { toast } from "sonner"

const Toast = () => {
    toast.error("No article found", {
        description: "Sorry, we couldn't find the article you were looking for.",
    })

    return null
}

export default Toast
