export default function Slider() {
    const slides = [
        "/slider/img1.jpeg",
        "/slider/img2.jpeg",
        "/slider/img3.jpeg",
        "/slider/img4.jpeg",
        "/slider/img5.jpeg",
        "/slider/img6.jpeg",
        "/slider/img7.jpeg",
        "/slider/img8.jpeg"
    ]

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll">
                {slides.map((slide, index) => {
                    return (
                        <li key={index}>
                            <img
                                src={slide}
                                alt={"image" + index}
                                className={"object-cover object-center bg-gray-500 h-96"}
                            />
                        </li>
                    )
                })}
            </ul>
            <ul
                className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll"
                aria-hidden="true"
            >
                {slides.map((slide, index) => {
                    return (
                        <li key={index}>
                            <img
                                src={slide}
                                alt={"image" + index}
                                className={"object-cover object-center bg-gray-500 h-96"}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
