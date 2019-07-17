//Fetch Api 



const form = document.querySelector('form');
const search = document.querySelector('input');
form.addEventListener('submit', (e) => {
    document.querySelector('#p-1').textContent = "Loading...";
    document.querySelector('#p-2').textContent = ''
    document.querySelector('#p-3').textContent = ''
    document.querySelector('#p-4').textContent = ''
    e.preventDefault();
    const searchText = search.value;
    fetch('/weather?address=' + searchText).then((response) => {
        response.json().then((data) => {
            if (data.error)
                document.querySelector('#p-1').textContent = "Error! Enter valid location";
            else {
                document.querySelector('#p-1').textContent = 'Location : ' + data.location
                document.querySelector('#p-2').textContent = 'Temperature : ' + data.temperature
                document.querySelector('#p-3').textContent = 'Timezone : ' + data.timezone
                document.querySelector('#p-4').textContent = "Summary : " + data.summary
            }
        })
    });
})

