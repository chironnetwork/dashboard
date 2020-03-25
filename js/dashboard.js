async function init() {

    window.ethereum.on('accountsChanged', function (accounts) {
        location.reload();
    })

    document.getElementById("userAddress").innerText = trimAdd(web3.eth.accounts[0]);

    web3.eth.getBalance(web3.eth.accounts[0], function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.fromWei(result, "ether")).toFixed(2)+" ETH";
    })

    refreshUI();
    setInterval(updateStats, 10000);
}

async function updateStats(){
    fetch('https://corona.lmao.ninja/all')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById('statCases').innerText = data['cases'];
        document.getElementById('statDeaths').innerText = data['deaths'];
        document.getElementById('statRecovered').innerText = data['recovered'];
        console.log(data);
    });
}

async function refreshUI(){
    await updateStats();
}

function checkResult(event){
    event.preventDefault();
    const submitBtn = document.getElementById("submit");

    submitBtn.innerText = "Crunching Numbers";
    submitBtn.disabled = true;

    var xhr = new XMLHttpRequest();
    let fever = parseInt(document.getElementById('fever').value);
    let feverDays = parseInt(document.getElementById('feverDays').value);
    let age = parseInt(document.getElementById('age').value);
    let tiredness = parseInt(document.getElementById('tiredness').value);
    let cough = parseInt(document.getElementById('cough').value);

    let testURL = `${TESTER_NODE}?fever=${fever}&feverDays=${feverDays}&age=${age}&tiredness=${tiredness}&cough=${cough}`
    console.log(testURL);
    xhr.open("POST", testURL, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function(e) {
        if(xhr['status'] == 200 && xhr['readyState'] == 4){

            console.log(xhr);
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Your Model has Started Training 🗺',
            //     html: `You can now track you Model's progress.`,
            //     backdrop: `rgba(0,0,123,0.4)
            //         url("/img/landing/nyan-cat.gif")
            //         left top
            //         no-repeat
            //     `,
            //     confirmButtonColor: '#0016b9',
            //     confirmButtonText: 'Track Progress'
            // }).then((result) => {
            //     if (result.value) {
            //         location = `/tasks.html?taskID=${taskID}`;
            //     }
            // });
            submitBtn.innerText = "Let's check 🤞";
            submitBtn.disabled = false;
        }
    }
    xhr.send();

}
