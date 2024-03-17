import TextInput from "@/Components/TextInput.jsx"
import { useState } from "react"

export default function GalleryForm({ data, setData }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const [isDownloadDurationVisible, setIsDownloadDurationVisible] = useState(true)

    return (
        <section className="p-6 bg-gray-100 text-gray-900">
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="name" className="text-sm">
                            Gallery name
                            <sup className="text-red-600 ml-1">*</sup>
                        </label>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Gallery name"
                            required={true}
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            className="w-full mt-1 rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                        />
                    </div>
                    <div className="col-span-full mt-4">
                        <TextInput
                            id="public-access"
                            type="radio"
                            placeholder=""
                            checked={isPasswordVisible}
                            name={"access"}
                            onChange={() => setIsPasswordVisible(true)}
                            className="rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                        />
                        <label htmlFor="public-access" className="text-xl ml-3 cursor-pointer">
                            Public
                        </label>

                        <input
                            id="private-access"
                            type="radio"
                            placeholder=""
                            name={"access"}
                            onChange={() => setIsPasswordVisible(false)}
                            className="rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900 ml-3"
                        />
                        <label htmlFor="private-access" className="text-xl ml-3 cursor-pointer">
                            Private
                        </label>
                    </div>

                    <div className={isPasswordVisible ? "hidden" : "" + " col-span-full sm:col-span-3 mt-4"}>
                        <label htmlFor="password" className="text-sm">
                            Password
                            <sup className="text-red-600 ml-1">*</sup>
                        </label>
                        <TextInput
                            id="password"
                            type="password"
                            required={!isPasswordVisible}
                            placeholder="Password"
                            onChange={(e) => setData("password", e.target.value)}
                            value={data.password}
                            className="w-full mt-1 rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                        />
                    </div>

                    <div className="col-span-full mt-4">
                        <TextInput
                            id="download"
                            type="checkbox"
                            placeholder=""
                            name={"download"}
                            onChange={(e) => {
                                setData("can_download", e.target.checked)
                                setIsDownloadDurationVisible(!isDownloadDurationVisible)
                            }}
                            className="rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                        />
                        <label htmlFor="download" className="text-xl ml-3">
                            Can download
                        </label>
                    </div>
                    <div className={isDownloadDurationVisible ? "hidden" : "" + " col-span-full sm:col-span-3"}>
                        <label htmlFor="download-duration" className="text-sm">
                            Download Duration
                            <sup className="text-red-600 ml-1">*</sup>
                        </label>
                        <select
                            id="download-duration"
                            required={!isDownloadDurationVisible}
                            onChange={(e) => setData("download_duration", e.target.value)}
                            className={
                                "w-full mt-1 rounded-md focus:ring focus:ring-opacity-75 focus:ring-black border-gray-300 text-gray-900"
                            }
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
