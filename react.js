export let a;
function myClick() {
    a = document.querySelector('url').value
    alert(a)
}

window.addEventListener("DOMContentLoaded", onload = () => {
    document.querySelector('button').onclick = myClick;
})

