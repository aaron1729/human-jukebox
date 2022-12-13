type StyleObj = {
    buttonBig: string
};


const styles: StyleObj = {
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
    ].join(" ")
}

export {styles};