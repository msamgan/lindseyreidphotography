import EditSvg from "@/Components/svgs/EditSvg.jsx"
import TextInput from "@/Components/TextInput.jsx"
import SaveSvg from "@/Components/svgs/SaveSvg.jsx"

import { useState } from "react"

export default function EditSave({
    className = "",
    displayHtml,
    displayData,
    updateRoute,
    updateId,
    dataUpdateSetter
}) {
    const [data, setData] = useState(displayData)
    const [editing, setEditing] = useState(false)
    const [editStatus, setEditStatus] = useState("")

    const updateData = () => {
        axios
            .post(updateRoute, {
                id: updateId,
                data: data
            })
            .then((response) => {
                dataUpdateSetter(data)
                setEditStatus("Saved!")
            })
            .catch((error) => {
                setEditStatus("Error!")
            })
    }

    return (
        <div className={className}>
            <div className={editing ? "hidden" : "show" + " flex flex-row"}>
                {displayHtml}
                <button title={"Edit"} className="" onClick={() => setEditing(!editing)}>
                    <EditSvg className="w-5 h-5 ml-3" />
                </button>
                <span className="ml-2 mt-4 text-lg text-gray-500">{editStatus}</span>
            </div>
            <div className={editing ? "show" : "hidden" + " flex flex-row"}>
                <TextInput
                    className={"text-2xl w-fit"}
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />

                <button
                    title={"Save"}
                    className=""
                    onClick={() => {
                        setEditing(!editing)
                        updateData()
                        setTimeout(() => {
                            setEditStatus("")
                        }, 2000)
                    }}
                >
                    <SaveSvg className="w-5 h-5 ml-3" />
                </button>
            </div>
        </div>
    )
}
