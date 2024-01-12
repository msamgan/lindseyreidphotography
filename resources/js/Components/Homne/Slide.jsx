export default function Slider() {

    const slides = [
        'https://cdn.zenfolio.com/cdn2/pub/txwtz40bifg3/0/null/mh/hrt_v7q5us08mjnh_irh/s/v-10/p3814611253-4.jpg?ts=8U1&tk=R4CX4efcCqzlpoXkc75rZbuIAAxEM-VJKV8k_DID5Bg=&v=2&visitor=4cmcW9jCiU8Vrc-NASHxt6xEXpFGLAqaGd729nvDPjRf&auth=exp=1705190399~acl=%2Fcdn2%2Fpub%2Ftxwtz40bifg3%2F%2A~hmac=e17a343a7a0ceacdb87db534400e1dc2&quot;',
        'https://cdn.zenfolio.com/cdn2/pub/pb46q8flaazn/0/null/mh/ayhdnl5ztsg1fpuchgn5/s/v-10/p3549992922-4.jpg?ts=8U1&tk=XpQ_IQtWNbFog7yCbcBWFx42w-d0cw7Ba0cRnqa2XPM=&v=2&visitor=mfs9jTQXcT2-OkPH5WmszaxGbq4mAQBIOpddtw1-sb-T&auth=exp=1705190399~acl=%2Fcdn2%2Fpub%2Fpb46q8flaazn%2F%2A~hmac=1203334a184015fd6b2bff5e6516c149&quot;',
        'https://cdn.zenfolio.com/cdn2/pub/pb46q8flaazn/0/null/mh/zaikywmhh6r-et-vyvge/s/v-10/p3552394959-4.jpg?ts=8U1&tk=ZSbpLznXlQwgD-WlILfleK7sALSQSTB1gS85oKCAsXc=&v=2&visitor=mfs9jTQXcT2-OkPH5WmszaxGbq4mAQBIOpddtw1-sb-T&auth=exp=1705190399~acl=%2Fcdn2%2Fpub%2Fpb46q8flaazn%2F%2A~hmac=1203334a184015fd6b2bff5e6516c149&quot;',
        'https://cdn.zenfolio.com/cdn2/pub/pb46q8flaazn/0/null/mh/vxmnzhgkyuur_yrae8la/s/v-10/p3549990993-4.jpg?ts=8U1&tk=QChJcDlcA-8GQ_O-ptna9j7vuvF6--Tk9TqUFW_cgOs=&v=2&visitor=mfs9jTQXcT2-OkPH5WmszaxGbq4mAQBIOpddtw1-sb-T&auth=exp=1705190399~acl=%2Fcdn2%2Fpub%2Fpb46q8flaazn%2F%2A~hmac=1203334a184015fd6b2bff5e6516c149&quot;',
        'https://cdn.zenfolio.com/cdn2/pub/pb46q8flaazn/0/null/mh/xmvc8olruddvpqtmhgzb/s/v-10/p3814609405-4.jpg?ts=8U1&tk=5aaKV_A2zqFlUiKFZO6SZJ7z21Omp0TNhLaAvn9Se8I=&v=2&visitor=mfs9jTQXcT2-OkPH5WmszaxGbq4mAQBIOpddtw1-sb-T&auth=exp=1705190399~acl=%2Fcdn2%2Fpub%2Fpb46q8flaazn%2F%2A~hmac=1203334a184015fd6b2bff5e6516c149&quot;',
        'https://cdn.zenfolio.com/cdn2/pub/pb46q8flaazn/0/null/mh/me2iatlntz_h3pm7igj6/s/v-10/p3552394527-4.jpg?ts=8U1&tk=MZzlhVvjDMXnqXRGe_UyR1KfP21lQUzBGOnn2cp7KYM=&v=2&visitor=mfs9jTQXcT2-OkPH5WmszaxGbq4mAQBIOpddtw1-sb-T&auth=exp=1705190399~acl=%2Fcdn2%2Fpub%2Fpb46q8flaazn%2F%2A~hmac=1203334a184015fd6b2bff5e6516c149&quot;'
    ]

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll">
                {
                    slides.map((slide, index) => {
                        return (
                            <li key={index}>
                                <img src={slide} alt={"image" + index}
                                     className={'object-cover object-center bg-gray-500 h-96 aspect-square'}/>
                            </li>
                        )
                    })
                }
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll"
                aria-hidden="true">
                {
                    slides.map((slide, index) => {
                        return (
                            <li key={index}>
                                <img src={slide} alt={"image" + index}
                                     className={'object-cover object-center bg-gray-500 h-96 aspect-square'}/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
