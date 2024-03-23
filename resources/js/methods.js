export const dateFormatter = (date) => {
    return new Date(date).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

/**
 *
 * @param fromData
 * @param toDate
 * @returns {number} - number of days between two dates
 */
export const dateToNumberOfDays = (fromData, toDate) => {
    const date1 = new Date(fromData)
    const date2 = new Date(toDate)
    const diffTime = Math.abs(date2 - date1)

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * @returns {string}  - returns the uuid of the portfolio gallery
 */
export const getPortfolioUuId = () => {
    return "30691678-8fe9-4b5b-b866-667595344824"
}
