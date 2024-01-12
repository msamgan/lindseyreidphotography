import Slider from "@/Components/Front/Homne/Slide.jsx"
import FrontLayout from "@/Layouts/FrontLayout.jsx"
import Introduction from "@/Components/Front/Homne/Introduction.jsx"

export default function Welcome({ auth }) {
    return (
        <FrontLayout title={"Welcome"}>
            <Slider />
            <Introduction />
        </FrontLayout>
    )
}
