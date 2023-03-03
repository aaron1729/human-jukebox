let baseUrl = "https://human-jukebox.etale.site/";

const queryString = window.location.search.substring(1);

console.log('queryString is:', queryString);

const params = (new URL(document.location)).searchParams;
const displayName = params.get("displayName");
const handle = params.get("handle");

console.log("displayName is:", displayName);
console.log("handle is:", handle);



const qrCodeElement = `<qr-code
            contents="${baseUrl + "?handle=" + handle}"
            style="
                width:250px;
                height:250px;
            "
        ></qr-code>`;

const qrDiv = document.getElementById("qr-code");
qrDiv.innerHTML = qrCodeElement;

const displayNameDiv = document.getElementById("display-name");
displayNameDiv.innerText = displayName;