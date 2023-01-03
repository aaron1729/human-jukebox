type StyleObj = {
    buttonSmall: string
    buttonBig: string
    textButtonForDbUpdates: string
    searchField: string
    textArea: string
    helperText: string
    altFade: string
};

// other possible button styles:
    // className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow'

const styles: StyleObj = {
    buttonSmall: [
        "border-2",
        "border-black",
        // "border-fuchsia-700",
        "rounded",
        "font-bold",
        "text-fuchsia-700",
        "mx-5",
        "my-5",
        "px-2",
        "rounded-full",
        // "hover:bg-fuchsia-200",
        "hover:bg-cyan-400"
        // "hover:bg-green-500"
    ].join(" "),
    buttonBig: [
        "bg-green-500",
        "hover:bg-green-400",
        "text-black",
        "font-bold",
        "py-2",
        "px-4",
        "rounded-full"
    ].join(" "),
    textButtonForDbUpdates: [
        // "hover:bg-gray-400",
        // "hover:bg-fuchsia-200",
        "hover:bg-cyan-400",
        "p-0.5",
        "text-xs",
        "text-fuchsia-700",
        "border",
        // "border-gray-900",
        "border-fuchsia-700",
        "rounded shadow"
    ].join(" "),
    searchField: [
        "border",
        "border-blue-700",
        "rounded",
        "px-1",
        "mr-2"
    ].join(" "),
    textArea: [
        "block",
        "w-full",
        "h-64",
        "text-sm",
        "text-gray-900",
        "bg-gray-50",
        "rounded-lg",
        "border",
        "border-gray-300",
    ].join(" "),
    helperText: [
        "text-xs",
        "font-normal",
        "py-1"
    ].join(" "),
    altFade: [
        "bg-gradient-to-r",
        "from-red-400",
        "to-blue-500"
    ].join(" ")
}

export { styles };