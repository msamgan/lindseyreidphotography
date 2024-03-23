import { useEffect, useState } from "react"

export default function Slider() {
    const [sliderGallery, setSliderGallery] = useState({})
    const [galleryImages, setGalleryImages] = useState([])

    const getPortfolioGallery = () => {
        axios({
            method: "GET",
            url: route("gallery.portfolio")
        })
            .then((response) => {
                setSliderGallery(response.data)
                setGalleryImages(response.data.images)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getPortfolioGallery()
    }, [])

    const SliderImage = ({ image, index }) => {
        return (
            <img
                src={image.thumbnail_link}
                alt={"image" + index}
                className={"object-cover object-center bg-gray-500 h-64"}
            />
        )
    }

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll">
                {galleryImages.length > 0 &&
                    galleryImages.map((image, index) => {
                        return (
                            <li key={index}>
                                <SliderImage image={image} index={index} />
                            </li>
                        )
                    })}
            </ul>
            <ul
                className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll"
                aria-hidden="true"
            >
                {galleryImages.length > 0 &&
                    galleryImages.map((image, index) => {
                        return (
                            <li key={index}>
                                <SliderImage image={image} index={index} />
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
