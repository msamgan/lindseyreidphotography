import FrontLayout from "@/Layouts/FrontLayout.jsx"
import { useEffect, useState } from "react"
import { Gallery } from "react-grid-gallery"
import Lightbox from "yet-another-react-lightbox"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Loader from "@/Components/Loader.jsx"
import "yet-another-react-lightbox/styles.css"

export default function ViewGallery({ gallery }) {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [lightBoxImages, setLightBoxImages] = useState([])
    const [index, setIndex] = useState(-1)

    const getImages = () => {
        axios(
            route("gallery.images", {
                gallery: gallery.uuid
            })
        ).then((response) => {
            setLoading(false)
            setImages(response.data.images)
            setLightBoxImages(
                response.data.images.map((image) => {
                    return {
                        src: image.original,
                        width: image.width,
                        height: image.height
                    }
                })
            )
        })
    }

    const handleClickedImage = (index, image) => {
        console.log(image)
        console.log(index)
        setIndex(index)
    }

    useEffect(() => {
        setLoading(true)
        getImages()
    }, [])

    return <FrontLayout title={gallery.name}>
        <section className="bg-white text-gray-800">
            <div className="container px-4 mx-auto">
                <section className="py-6">
                    {
                        loading ? <Loader /> : <>
                            <Gallery
                                images={images}
                                enableImageSelection={false}
                                rowHeight={400}
                                margin={5}
                                onClick={handleClickedImage}
                            />

                            <Lightbox
                                slides={lightBoxImages}
                                plugins={[Fullscreen, Zoom]}
                                open={index >= 0}
                                index={index}
                                close={() => setIndex(-1)}
                            />
                        </>
                    }
                </section>
            </div>
        </section>
    </FrontLayout>
}
