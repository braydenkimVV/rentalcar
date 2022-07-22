let clients = [];
let xml = new XMLHttpRequest();
window.addEventListener("load", registerListeners, false);
var asynchrequest;

document.getElementById("now").innerHTML = time();

function time() {
    let time= new Date();
    let month = time.getMonth() + 1;
    document.getElementById("now").innerHTML = time.getDate() + '/' + month + '/' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    setInterval("time()",1000);
}
function showclientbylastname() {
    fetch("rentalclients.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        const input = document.getElementById("bylastname");
        document.getElementById("printtable").innerHTML = "";
        clients = [];
        for (const row of data) {
            let html = '<tr>';
            let include = false;
            if(row.last_name.substr(0, input.value.length).toUpperCase() == input.value.toUpperCase()) {
                html += '<td scope="row">' + row.last_name + '</td><td>' + row.first_name + '</td><td><input type="radio" name="select" class="checked " onclick="showrentalpage()"></input></td></tr>';
                include = true;
                let lastname = row.last_name;
                let firstname = row.first_name;
                let address = row.address;
                let state = row.state_prov;
                let email = row.email;
                let phone = row.phone;
                let client = {
                    lastname,
                    firstname,
                    address,
                    state,
                    email,
                    phone
                }
                clients.push(client);
            }
            if (include){
                document.getElementById("printtable").innerHTML += html;
            }
        }
    });
}
function showrentalpage() {
    const checkedclient = document.getElementsByClassName('checked');
    for (let i = 0; i < clients.length; i++){
        if (checkedclient[i].checked == true) {
            let lastname = document.getElementById('lastname');
            let firstname = document.getElementById('firstname');
            let address = document.getElementById('address');
            let state = document.getElementById('state');
            let email = document.getElementById('email');
            let phone = document.getElementById('phone');
            let days = document.getElementById('days');

            lastname.value = clients[i].lastname;
            firstname.value = clients[i].firstname;
            address.value = clients[i].address;
            state.value = clients[i].state;
            email.value = clients[i].email;
            phone.value = clients[i].phone;

            lastname.disabled = false;
            firstname.disabled = false;
            address.disabled = false;
            state.disabled = false;
            email.disabled = false;
            phone.disabled = false;
            days.disabled = false;
        }
    }
}
function registerListeners(){
    var img;
    img=document.getElementById("pic1");
    img.addEventListener("mouseover", function () { getContent("place1.html");}, false);
    img.addEventListener("mouseout", clearContent, false);
    img=document.getElementById("pic2");
    img.addEventListener("mouseover", function () { getContent("place2.html");}, false);
    img.addEventListener("mouseout", clearContent, false);
    img=document.getElementById("pic3");
    img.addEventListener("mouseover", function () { getContent("place3.html");}, false);
    img.addEventListener("mouseout", clearContent, false);
    img=document.getElementById("pic4");
    img.addEventListener("mouseover", function () { getContent("place4.html");}, false);
    img.addEventListener("mouseout", clearContent, false);
}
function getContent(infopage){
    asynchrequest= new XMLHttpRequest();
    asynchrequest.onreadystatechange = function() {
if (asynchrequest.readyState == 4 && asynchrequest.status == 200) {
  document.getElementById("detail").innerHTML = asynchrequest.responseText;
}
};
asynchrequest.open("GET", infopage, true);
asynchrequest.send();
}

function clearContent(){
    document.getElementById("detail").innerHTML="";
}
function printresult() {
    let lastname = document.getElementById('lastname');
    let firstname = document.getElementById('firstname');
    let address = document.getElementById('address');
    let state = document.getElementById('state');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let days = document.getElementById('days');

    let result = "";
    let total = 0;
    result += '<p>Name : ' + lastname.value + ' ' + firstname.value + '</p><p>Address : '
                + address.value + '</p><p>State/prov : ' + state.value + '</p><p>Email : ' + email.value + '</p><p>phone : '
                + phone.value + '</p><br>';

    if (document.getElementById('compact').checked) {
        result += '<p>Vehicle : Compact $15/day * ' + days.value + 'day(s) = $' + 15*days.value + '</p>';
        total += 15*days.value;
    }else if (document.getElementById('mid').checked) {
        result += '<p>Vehicle : Mid-size $20/day * ' + days.value + 'day(s) = $' + 20*days.value + '</p>';
        total += 20*days.value;
    }else if (document.getElementById('luxury').checked) {
        result += '<p>Vehicle : Luxury $35/day * ' + days.value + 'day(s) = $' + 35*days.value + '</p>';
        total += 35*days.value;
    }else if (document.getElementById('van').checked) {
        result += '<p>Vehicle : Van/Truck $40/day * ' + days.value + 'day(s) = $' + 40*days.value + '</p>';
        total += 40*days.value;
    }

    if (document.getElementById('roofrack').checked) {
        result += '<p>Roof Rack or Bicycle Rack extra $5/day * ' + days.value + 'day(s) = $' + 5*days.value + '</p>';
        total += 5*days.value;
    }
    if (document.getElementById('gps').checked) {
        result += '<p>GPS extra $10</p>';
        total += 10;
    }
    if (document.getElementById('childseat').checked) {
        result += '<p>Child Seat free</p>';
    }

    result += '<p></p>Total : $' + total;




    document.getElementById('result').innerHTML = result;
}

// var xhr = new XMLHttpRequest();
// var r;
// window.onload = loaddata;
// function loaddata() {
// 	document.getElementById("search").addEventListener("keyup", function () { searchInput(this.value); }, false);
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState == 4 && xhr.status == 200) {
// 			r = JSON.parse(xhr.responseText);
// 		}
// 	};
// 	xhr.open("GET", "rentalclients.json", true);
// 	xhr.send();
// }
// function searchInput(search) {
// 	var output = "";
// 	var searchfirstname;
// 	var searchlastname;
	
// 	for (var i = 0; i < r.length; i++) {
// 		var obj = r[i];
// 		searchfirstname = obj.first_name;
// 		searchlastname = obj.last_name;
// 		if (searchlastname.toLowerCase().startsWith(search)) {
// 			output += "<tr><td>"
// 			output += obj.first_name
// 			output += "</td><td>"
// 			output += obj.last_name
// 			output += "</td><td>"
// 			// output += '<input class="form-check-input" type="radio" name="client" id="client" value="client1" onchange="Choice()">'
// 			output += '</td><td><input type="radio" name="select" class="checked" onclick="showrentalpage()">Select</input></td></tr>'
// 			output += "</td></tr>";
			
// 		}
		
// 	}
// 	document.getElementById("clientRows").innerHTML = output;
// }
// function Choice() {
//     let updateElement = document.getElementById("rentalForm");
//     let searchName = (document.getElementById('search').value).toLowerCase();
//     let output = "";
//     for (let i =0; i<r.length; i++){
//         if((r[i].last_name).toLowerCase().startsWith(searchName)){
//             output = r[i].first_name + r[i].last_name + r[i].address + r[i].state_prov + r[i].email + r[i].phone;
// 			if(document.getElementById(client)==true){
// 				console.log('asd');
// 			}
//         }
//     }
// 	updateElement.innerHTML = output;
// }