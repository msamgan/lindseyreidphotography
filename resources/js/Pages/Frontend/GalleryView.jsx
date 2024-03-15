import FrontLayout from "@/Layouts/FrontLayout.jsx"
import { useEffect, useState } from "react"

export default function GalleryView({ gallery }) {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    return (<FrontLayout title={gallery.name}>
        
    </FrontLayout>)
}
