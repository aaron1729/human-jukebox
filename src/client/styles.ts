type StyleObj = {
    buttonSmall: string
    buttonBig: string
    searchField: string
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
    searchField: ["border",
    "border-blue-700",
    "rounded",
    "px-1",
    "mr-2"
    ].join(" "),
    altFade: [
        "bg-gradient-to-r",
        "from-red-400",
        "to-blue-500"
    ].join(" ")
}

export { styles };