export function numberwithThousandsSeparator(x) {
    try {
        let parts = x.toString().split(",");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    } catch (e) {
        console.warn(e);
        return x;
    }
}