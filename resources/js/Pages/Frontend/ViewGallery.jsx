import FrontLayout from "@/Layouts/FrontLayout.jsx"
import { useEffect, useState } from "react"
import { Gallery } from "react-grid-gallery"
import Lightbox from "yet-another-react-lightbox"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Loader from "@/Components/Loader.jsx"
import "yet-another-react-lightbox/styles.css"
import Download from "yet-another-react-lightbox/plugins/download"

export default function ViewGallery({ gallery }) {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [lightBoxImages, setLightBoxImages] = useState([])
    const [index, setIndex] = useState(-1)
    const [plugins, setPlugins] = useState([Fullscreen, Zoom])

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
                        height: image.height,
                        downloadUrl: image.original
                    }
                })
            )

            if (response.data.gallery.can_download) {
                setPlugins([...plugins, Download])
            }
        })
    }

    const handleClickedImage = (index, image) => {
        setIndex(index)
    }

    useEffect(() => {
        setLoading(true)
        getImages()
    }, [])

    return (
        <FrontLayout title={gallery.name}>
            <section className="bg-white text-gray-800">
                <div className="container px-4 mx-auto">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold sunydale">
                            {gallery.name} | {images.length}
                        </h1>
                    </div>
                    <section className="py-6">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <Gallery
                                    images={images}
                                    enableImageSelection={false}
                                    rowHeight={400}
                                    margin={5}
                                    onClick={handleClickedImage}
                                />

                                <Lightbox
                                    slides={lightBoxImages}
                                    plugins={plugins}
                                    open={index >= 0}
                                    index={index}
                                    close={() => setIndex(-1)}
                                />
                            </>
                        )}
                    </section>
                </div>
            </section>
        </FrontLayout>
    )
}
