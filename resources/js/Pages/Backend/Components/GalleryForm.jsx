import TextInput from "@/Components/TextInput.jsx"
import { useState } from "react"
import InputLabel from "@/Components/InputLabel.jsx"

export default function GalleryForm({ data, setData, isPublic = true }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(isPublic ? "hidden" : "")
    const [isDownloadDurationVisible, setIsDownloadDurationVisible] = useState(
        data.can_download ? "" : "hidden"
    )

    return (
        <section className="p-6 bg-gray-100 text-gray-900">
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4">
                    <div className="col-span-full sm:col-span-4">
                        <InputLabel htmlFor="name" className="">
                            Gallery name
                            <sup className="text-red-600 ml-1">*</sup>
                        </InputLabel>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Gallery name"
                            required={true}
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            className="w-full mt-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                        />
                    </div>
                    <div className="col-span-full mt-4 flex">
                        <div className="flex items-center">
                            <TextInput
                                id="public-access"
                                type="radio"
                                placeholder=""
                                checked={isPasswordVisible === "hidden"}
                                name={"access"}
                                onChange={() => setIsPasswordVisible("hidden")}
                                className="rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                            />
                            <InputLabel htmlFor="public-access" className="ml-3 cursor-pointer">
                                Public
                            </InputLabel>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="private-access"
                                type="radio"
                                placeholder=""
                                checked={isPasswordVisible === ""}
                                name={"access"}
                                onChange={() => setIsPasswordVisible("")}
                                className="rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900 ml-3"
                            />
                            <InputLabel htmlFor="private-access" className="ml-3 cursor-pointer">
                                Private
                            </InputLabel>
                        </div>
                    </div>

                    <div className={isPasswordVisible + " col-span-full sm:col-span-4 mt-4"}>
                        <InputLabel htmlFor="password" className="">
                            Password
                            <sup className="text-red-600 ml-1">*</sup>
                        </InputLabel>
                        <TextInput
                            id="password"
                            type="password"
                            required={isPasswordVisible === ""}
                            placeholder="Password"
                            onChange={(e) => setData("password", e.target.value)}
                            value={data.password}
                            className="w-full mt-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                        />
                    </div>

                    <div className="col-span-full mt-4">
                        <div className="flex items-center">
                            <TextInput
                                id="download"
                                type="checkbox"
                                placeholder=""
                                checked={isDownloadDurationVisible === ""}
                                name={"download"}
                                onChange={(e) => {
                                    setData("can_download", e.target.checked)
                                    setIsDownloadDurationVisible(
                                        isDownloadDurationVisible === "" ? "hidden" : ""
                                    )
                                }}
                                className="rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                            />
                            <InputLabel htmlFor="download" className="ml-3">
                                Can download
                            </InputLabel>
                        </div>
                    </div>
                    <div className={isDownloadDurationVisible + " col-span-full sm:col-span-4"}>
                        <InputLabel htmlFor="download-duration" className="">
                            Download Duration
                            <sup className="text-red-600 ml-1">*</sup>
                        </InputLabel>
                        <select
                            id="download-duration"
                            required={isDownloadDurationVisible === ""}
                            onChange={(e) => setData("download_duration", e.target.value)}
                            className={
                                "w-full mt-2 text-2xl rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                            }
                            defaultValue={data.download_duration - 1}
                        >
                            <option value="">Select duration</option>
                            <option value={3652}>Indefinite</option>
                            <option value={1}>1 day</option>
                            <option value={7}>7 days</option>
                            <option value={30}>30 days</option>
                            <option value={183}>6 months</option>
                            <option value={365}>1 year</option>
                        </select>
                    </div>
                </div>
            </fieldset>
        </section>
    )
}
