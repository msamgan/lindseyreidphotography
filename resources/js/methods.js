export const dateFormatter = (date) => {
    return new Date(date).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
