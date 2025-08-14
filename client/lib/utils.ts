
export const formatDate = (datestring?: string) => {

    const date = new Date(datestring!);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric"
    })
}