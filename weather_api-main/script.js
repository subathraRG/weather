let result = document.querySelector(".result>h1")

let btn = document.querySelector("button")

if (document.cookie.split("=")[0] != "name") {
    let name = prompt("Enter your name ")
    document.cookie = `name=${name}; Max-Age=10`
}

document.addEventListener("keydown", e => {
    if (e.key == "Enter" && e.code == "NumpadEnter") run()
})

btn.addEventListener("click", run)

function run() {
    let inp = document.querySelector("input").value

    if (inp == "") inp = "coimbatore"

    let obj = {
        userName: document.cookie.split("=")[1],
        location: inp
    }

    if (!obj.userName||obj.userName=="null") {
        alert("session expired")
        location.assign("http://localhost:8066")
    }
    else {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
                let dat = JSON.parse(xhr.responseText)
                if (dat.cod == 404) alert("error")
                else result.innerHTML = Math.round((dat.main.temp_min - 273)) + " &deg;C";
            }
        }
        xhr.open("post", "post");
        xhr.send(JSON.stringify(obj))
    }
}