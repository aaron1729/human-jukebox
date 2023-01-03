type StyleObj = {
    buttonSmall: string
    buttonBig: string
    textButtonForDbUpdates: string
    searchField: string
    textArea: string
    altFade: string
};

// other possible button styles:
    // className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow'

const styles: StyleObj = {
    buttonSmall: [
        "border-2",
        "border-black",
        "rounded",
        "font-bold",
        "text-fuchsia-700",
        "mx-100",
        "my-5",
        "px-2",
        "rounded-full"
    ].join(" "),
    buttonBig: [
        "bg-green-500",
        "hover:bg-green-400",
        "text-black",
        "font-bold",
        "py-2",
        "px-4",
        "mt-5",
        "mb-10",
        "rounded-full"
    ].join(" "),
    textButtonForDbUpdates: "text-blue-800",
    // textButtonForDbUpdates: 'bg-white hover:bg-gray-200 text-gray-800 font-semibold border border-gray-400 rounded shadow',
    searchField: [
        "border",
        "border-blue-700",
        "rounded",
        "px-1",
        "mr-2"
    ].join(" "),
    textArea: [
        "block",
        // "p-2.5",
        "w-full",
        "h-96",
        "text-sm",
        "text-gray-900",
        "bg-gray-50",
        "rounded-lg",
        "border",
        "border-gray-300",
        // "focus:ring-blue-500",
        // "focus:border-blue-500",
    ].join(" "),
    altFade: [
        "bg-gradient-to-r",
        "from-red-400",
        "to-blue-500"
    ].join(" ")
}

export { styles };