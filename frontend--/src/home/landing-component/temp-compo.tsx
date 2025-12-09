import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const TempCompo = () => {

    const navigate = useNavigate()
    useEffect(() => {
        navigate("/home")
    }, [])
    return (
        <div>
        </div>
    )
}