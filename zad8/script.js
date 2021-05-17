$(document).ready(function () {

	var request = indexedDB.open('customermanager', 1);

	request.onupgradeneeded = function (e) {
		var db = e.target.result;

		if (!db.objectStoreNames.contains('customers')) {
			var os = db.createObjectStore('customers', {
				keyPath: "id",
				autoIncrement: true
			});

			os.createIndex('name', 'name', {
				unique: false
			});
		}
	};


	request.onsuccess = function (e) {
		console.log('Sukces: Uruchomiana baza danych...');
		db = e.target.result;

		showCustomers();
	};


	request.onerror = function (e) {
		console.log('Błąd: Nie można uruchomic bazy danych...');
	};
});

function createCanvas(addressImg) {

}


function sumLetter(txt) { let newtxt = ""; let sum = 0; if(txt != null) for (let i = 0; i < txt.length; ++i) { var value = txt.charAt(i); if(value == 'a'){ sum += 1; }else if(value == 'b'){ sum += 2; }else if(value == 'c'){ sum += 3; }else if(value == 'd'){ sum += 4; }else if(value == 'e'){ sum += 5; }else if(value == 'f'){ sum += 6; }else if(value == 'g'){ sum += 7; }else if(value == 'h'){ sum += 8; }else if(value == 'i'){ sum += 9; }else if(value == 'j'){ sum += 10; }else if(value == 'k'){ sum += 11; }else if(value == 'l'){ sum += 12; }else if(value == 'm'){ sum += 13; }else if(value == 'n'){ sum += 14; }else if(value == 'o'){ sum += 15; }else if(value == 'p'){ sum += 16; }else if(value == 'q'){ sum += 17; }else if(value == 'r'){ sum += 18; }else if(value == 's'){ sum += 19; }else if(value == 't'){ sum += 20; }else if(value == 'u'){ sum += 21; }else if(value == 'v'){ sum += 22; }else if(value == 'w'){ sum += 23; }else if(value == 'x'){ sum += 24; }else if(value == 'y'){ sum += 25; }else if(value == 'z'){ sum += 26; }else if(value == 'A'){ sum += 31; }else if(value == 'B'){ sum += 32; }else if(value == 'C'){ sum += 33; }else if(value == 'D'){ sum += 34; }else if(value == 'E'){ sum += 35; }else if(value == 'F'){ sum += 36; }else if(value == 'G'){ sum += 37; }else if(value == 'H'){ sum += 38; }else if(value == 'I'){ sum += 39; }else if(value == 'J'){ sum += 40; }else if(value == 'K'){ sum += 41; }else if(value == 'L'){ sum += 42; }else if(value == 'M'){ sum += 43; }else if(value == 'N'){ sum += 44; }else if(value == 'O'){ sum += 45; }else if(value == 'P'){ sum += 46; }else if(value == 'Q'){ sum += 47; }else if(value == 'R'){ sum += 48; }else if(value == 'S'){ sum += 49; }else if(value == 'T'){ sum += 50; }else if(value == 'U'){ sum += 51; }else if(value == 'V'){ sum += 52; }else if(value == 'W'){ sum += 53; }else if(value == 'X'){ sum += 54; }else if(value == 'Y'){ sum += 55; }else if(value == 'Z'){ sum += 56; } } return sum; }


function addCustomer() {
	var name = $('#name').val();
	var email = $('#email').val();
	var surname = $('#surname').val();
	var postcode = $('#postcode').val();
	var phonenumber = $('#phonenumber').val();
	var address = $('#address').val();
	var city = $('#city').val();
	var nipnumber = $('#nipnumber').val();
	var idnumber = $('#idnumber').val();
	var addressImg = $('#addressImg').val();

	var transaction = db.transaction(["customers"], "readwrite");

	var store = transaction.objectStore("customers");


	let sum = 0;
    sum += sumLetter(name);
	sum += sumLetter(email);
	sum += sumLetter(surname);
	sum += sumLetter(postcode);
	sum += sumLetter(phonenumber);
	sum += sumLetter(address);
	sum += sumLetter(city);
	sum += sumLetter(nipnumber);
	sum += sumLetter(idnumber);
	sum += sumLetter(addressImg);
    
    var colorR = sum % 255;
    var colorG = 255 - (sum % 255);
    var colorB = (0.5*colorR>125)?99:199;
	let rgba_filter = "rgba(" + colorR + ", " + colorG + ", " + colorB + ", 0.5)";
	

	//canvas

	// var canvas = document.getElementById('raed');
	// var ctx = canvas.getContext("2d");

	// var img = new Image();
	// img.src = 'https://jazz.pl/wp-content/uploads/Best-top-desktop-beautiful-nature-wallpapers-hd-nature-wallpaper-picture-image-photo-61.jpg';
	// ctx.drawImage(img, 10, 10);
	// var dataURL = canvas.toDataURL("image/jpeg");
	// console.log(dataURL);

	// //2

	// var canvas = document.getElementById('show');
	// var ctx = canvas.getContext('2d');
	// var myImage = new Image();
	// myImage.src = dataURL;
	// ctx.drawImage(myImage, 0, 0);
	//////

	var customer = {
		name: name,
		email: email,
		surname: surname,
		postcode: postcode,
		phonenumber: phonenumber,
		address: address,
		city: city,
		nipnumber: nipnumber,
		idnumber: idnumber,
		addressImg: addressImg,
		rgba_filter: rgba_filter
	};

	var request = store.add(customer);

	request.onsuccess = function (e) {
		window.location.href = "index.html";
	};

	request.onerror = function (e) {
		alert("Klient nie został dodany");
		console.log('Error', e.target.error.name);
	};
}

function showCustomers(e) {
	var transaction = db.transaction(["customers"], "readonly");
	var store = transaction.objectStore("customers");
	var index = store.index('name');

	var output = '';
	index.openCursor().onsuccess = function (e) {
		var cursor = e.target.result;
		if (cursor) {
			output += "<tr id='customer_" + cursor.value.id + "'>";
			output += "<td>" + cursor.value.id + "</td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='name' data-id='" + cursor.value.id + "'>" + cursor.value.name + "</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='surname' data-id='" + cursor.value.id + "'>" + cursor.value.surname + "</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='email' data-id='" + cursor.value.id + "'>" + cursor.value.email + "</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='phonenumber' data-id='" + cursor.value.id + "'>" + cursor.value.phonenumber + "</span></td>";

			output += "<td><span class='cursor customer' contenteditable='true' data-field='address' data-id='" + cursor.value.id + "'>" + cursor.value.address + "</span></td>";

			output += "<td><span class='cursor customer' contenteditable='true' data-field='nipnumber' data-id='" + cursor.value.id + "'>" + cursor.value.nipnumber + "</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='idnumber' data-id='" + cursor.value.id + "'>" + cursor.value.idnumber + "</span></td>";

			output += "<td><span class='cursor customer' contenteditable='true' data-field='postcode' data-id='" + cursor.value.id + "'>" + cursor.value.postcode + "</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='city' data-id='" + cursor.value.id + "'>" + cursor.value.city + "</span></td>";
			//output += "<td><span class='cursor customer' contenteditable='true' data-field='city' data-id='" + cursor.value.id + "'>" + cursor.value.rgba_filter + "</span></td>";
			output += '<td><div id="image"' + 'style="background-color: '+cursor.value.rgba_filter+';"><img src=' + cursor.value.addressImg +'" alt="" style="width:100px;height:100px; opacity: 0.5;">' + "</td>";
			output += "<td><a onclick='removeCustomer(" + cursor.value.id + ")' href=''>Delete</a></td>";
			output += "</tr>";
			cursor.continue();
		}
		$('#customers').html(output);
	};
}

function removeCustomer(id) {
	var transaction = db.transaction(["customers"], "readwrite");
	var store = transaction.objectStore("customers");

	var request = store.delete(id);

	request.onsuccess = function () {
		console.log('customer ' + id + ' Deleted');
		$('.customer_' + id).remove();
	};

	request.onerror = function (e) {
		alert("Klient nie został usunięty");
		console.log('Error', e.target.error.name);
	};
}

function clearCustomers() {
	indexedDB.deleteDatabase('customermanager');
	window.location.href = "index.html";
}




function searchCustomers() {

	$('#customers').html(output);
	var transaction = db.transaction(["customers"], "readwrite");
	var store = transaction.objectStore("customers");
	var keyword = $('#searchClient').val().toLowerCase();
	var request = store.openCursor();
	var output = '';
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			console.log(cursor.value.id)
			if (cursor.value.name.toLowerCase().includes(keyword) || cursor.value.surname.toLowerCase().includes(keyword) || cursor.value.email.toLowerCase().includes(keyword) || cursor.value.phonenumber.toLowerCase().includes(keyword) || cursor.value.idnumber.toLowerCase().includes(keyword) || cursor.value.nipnumber.toLowerCase().includes(keyword) || cursor.value.city.toLowerCase().includes(keyword) || cursor.value.address.toLowerCase().includes(keyword) || cursor.value.postcode.toLowerCase().includes(keyword)) {
				output += "<tr id='customer_" + cursor.value.id + "'>";
				output += "<td>" + cursor.value.id + "</td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='name' data-id='" + cursor.value.id + "'>" + cursor.value.name + "</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='surname' data-id='" + cursor.value.id + "'>" + cursor.value.surname + "</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='email' data-id='" + cursor.value.id + "'>" + cursor.value.email + "</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='phonenumber' data-id='" + cursor.value.id + "'>" + cursor.value.phonenumber + "</span></td>";

				output += "<td><span class='cursor customer' contenteditable='true' data-field='address' data-id='" + cursor.value.id + "'>" + cursor.value.address + "</span></td>";

				output += "<td><span class='cursor customer' contenteditable='true' data-field='nipnumber' data-id='" + cursor.value.id + "'>" + cursor.value.nipnumber + "</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='idnumber' data-id='" + cursor.value.id + "'>" + cursor.value.idnumber + "</span></td>";

				output += "<td><span class='cursor customer' contenteditable='true' data-field='postcode' data-id='" + cursor.value.id + "'>" + cursor.value.postcode + "</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='city' data-id='" + cursor.value.id + "'>" + cursor.value.city + "</span></td>";
				output += "<td><a onclick='removeCustomer(" + cursor.value.id + ")' href=''>Delete</a></td>";
				output += "</tr>";

			}
			cursor.continue();
		}
		$('#customers_s').html(output);
	};
}

$('#customers').on('blur', '.customer', function () {
	var newText = $(this).html();
	var field = $(this).data('field');
	var id = $(this).data('id');

	var transaction = db.transaction(["customers"], "readwrite");
	var store = transaction.objectStore("customers");

	var request = store.get(id);

	request.onsuccess = function () {
		var data = request.result;
		if (field == 'name') {
			data.name = newText;
		} else if (field == 'surname') {
			data.surname = newText;
		} else if (field == 'email') {
			data.email = newText;
		} else if (field == 'phonenumber') {
			data.phonenumber = newText;
		} else if (field == 'address') {
			data.address = newText;
		} else if (field == 'nipnumber') {
			data.nipnumber = newText;
		} else if (field == 'idnumber') {
			data.idnumber = newText;
		} else if (field == 'postcode') {
			data.postcode = newText;
		} else if (field == 'city') {
			data.city = newText;
		}

		var requestUpdate = store.put(data);

		requestUpdate.onsuccess = function () {
			console.log('Nie można zaaktualizować pola...');
		};

		requestUpdate.onerror = function () {
			console.log('Bład: klient nie został zaaktualizowany...');
		};
	};
});

function makeid(length) {
	var result = [];
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return result.join('');
}

function makeText(txt) {
	let random = txt[Math.floor(Math.random() * (txt.length - 1))];
	return random;
}

if (document.getElementById('genrateData') != null) {
	document.getElementById('genrateData').onclick = function (e) {
		document.getElementById('name').value = makeText(['Paweł', 'Krzysiek', 'Marta', 'Krystyna', 'Janusz', 'Danuta']);
		document.getElementById('surname').value = makeText(['Malinowska', 'Kowlaska', 'Rydz', 'Kania', 'Mazur', 'Krzak']);
		document.getElementById('email').value = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5) + '@' + Math.random().toString(36).substring(2, 5) + '.com';
		document.getElementById('address').value = makeText(['Lewa', 'Prawa', 'Długa', 'Kryształowa', 'Mazowiecka', 'Warszawska']) + ' ' + (Math.floor(Math.random() * 89 + 10)).toString();
		document.getElementById('postcode').value = (Math.floor(Math.random() * 89 + 10) + '-' + Math.floor(Math.random() * 899 + 100)).toString();
		document.getElementById('city').value = makeText(['Kalisz', 'Szczecin', 'Warszawa', 'Gdynia', 'Łódź', 'Wolbórz']);
		document.getElementById('phonenumber').value = Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 899 + 100).toString();
		document.getElementById('nipnumber').value = Math.floor(Math.random() * 899 + 100).toString() + '-' + Math.floor(Math.random() * 89 + 10).toString() + '-' + Math.floor(Math.random() * 89 + 10).toString() + '-' + Math.floor(Math.random() * 899 + 100).toString();
		document.getElementById('idnumber').value = makeid(3) + ' ' + Math.floor(Math.random() * 899999 + 100000).toString();
	}

}

const input = document.getElementById('searchClient');

if (input != null) {
	input.addEventListener('input', (e) => {
		$('#customers').html(output);
		var transaction = db.transaction(["customers"], "readwrite");
		var store = transaction.objectStore("customers");
		var keyword = $('#searchClient').val().toLowerCase();
		var request = store.openCursor();
		var output = '';
		request.onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				console.log(cursor.value.id)
				if (cursor.value.name.toLowerCase().includes(keyword) || cursor.value.surname.toLowerCase().includes(keyword) || cursor.value.email.toLowerCase().includes(keyword) || cursor.value.phonenumber.toLowerCase().includes(keyword) || cursor.value.idnumber.toLowerCase().includes(keyword) || cursor.value.nipnumber.toLowerCase().includes(keyword) || cursor.value.city.toLowerCase().includes(keyword) || cursor.value.address.toLowerCase().includes(keyword) || cursor.value.postcode.toLowerCase().includes(keyword)) {
					output += "<tr id='customer_" + cursor.value.id + "'>";
					output += "<td>" + cursor.value.id + "</td>";
					output += "<td><span class='cursor customer' contenteditable='true' data-field='name' data-id='" + cursor.value.id + "'>" + cursor.value.name + "</span></td>";
					output += "<td><span class='cursor customer' contenteditable='true' data-field='surname' data-id='" + cursor.value.id + "'>" + cursor.value.surname + "</span></td>";
					output += "<td><span class='cursor customer' contenteditable='true' data-field='email' data-id='" + cursor.value.id + "'>" + cursor.value.email + "</span></td>";
					output += "<td><span class='cursor customer' contenteditable='true' data-field='phonenumber' data-id='" + cursor.value.id + "'>" + cursor.value.phonenumber + "</span></td>";

					output += "<td><span class='cursor customer' contenteditable='true' data-field='address' data-id='" + cursor.value.id + "'>" + cursor.value.address + "</span></td>";

					output += "<td><span class='cursor customer' contenteditable='true' data-field='nipnumber' data-id='" + cursor.value.id + "'>" + cursor.value.nipnumber + "</span></td>";
					output += "<td><span class='cursor customer' contenteditable='true' data-field='idnumber' data-id='" + cursor.value.id + "'>" + cursor.value.idnumber + "</span></td>";

					output += "<td><span class='cursor customer' contenteditable='true' data-field='postcode' data-id='" + cursor.value.id + "'>" + cursor.value.postcode + "</span></td>";
					output += "<td><span class='cursor customer' contenteditable='true' data-field='city' data-id='" + cursor.value.id + "'>" + cursor.value.city + "</span></td>";
					output += "<td><a onclick='removeCustomer(" + cursor.value.id + ")' href=''>Delete</a></td>";
					output += "</tr>";

				}
				cursor.continue();
			}
			$('#customers_s').html(output);
		};
	});

}



function workerFunctionReadLink() {

	let w;
	let colorR = 0;
	let colorG = 0;
	let colorB = 0;

	document.getElementById('addImage').onclick = function (e) {
		let addressImg = $('#addressImg').val();
		colorR = 0;
		colorG = 0;
		colorB = 0;
		let name = $('#name').val();
		var email = $('#email').val();
		var surname = $('#surname').val();
		var postcode = $('#postcode').val();
		var phonenumber = $('#phonenumber').val();
		var address = $('#address').val();
		var city = $('#city').val();
		var nipnumber = $('#nipnumber').val();
		var idnumber = $('#idnumber').val();

// var canvas = document.getElementById('raed');
				// var ctx = canvas.getContext("2d");

				// var img = new Image();
				// img.src = addressImg;
				// ctx.drawImage(img, 0, 0);
				// var dataURL = canvas.toDataURL("image/jpeg");
				// console.log(dataURL);


		let txt = '{"addressImg": "' + addressImg + '", "colorR": "' + colorR + '", "colorG": "' + colorG +
			'", "colorB": "' + colorB + '", "name": "' + name + '", "surname": "' + surname +
			'", "email": "' + email +
			'", "postcode": "' + postcode + '", "phonenumber": "' + phonenumber + '", "address": "' +
			address +
			'", "city": "' + city + '", "nipnumber": "' + nipnumber + '", "idnumber": "' + idnumber + '"}';
		let objJson = JSON.parse(txt);
		console.log(objJson);


		if (typeof (Worker) !== "undefined") {
			if (typeof (w) == "undefined") {
				w = new Worker("workers_filter.js");
			} else {
				console.log("Tuuu!");
			}

			w.addEventListener('message', function (e) {
				colorR = e.data["colorR"];
				colorG = e.data["colorG"];
				colorB = e.data["colorB"];
				document.getElementById("filter").style.backgroundColor = "rgba(" + colorR + ", " +
					colorG + ", " + colorB + ", 0.5)";
				let url = "url('" + addressImg + "')";
				document.getElementById("image").style.backgroundImage = url;


			}, false);
			w.postMessage(objJson);

		} else {
			console.log("Sorry, your browser does not support Web Workers...");
		}


	}

}


function workerFunction() {

	let w;

	document.getElementById('change').onclick = function (e) {
		let name = $('#name').val();
		var email = $('#email').val();
		var surname = $('#surname').val();
		var postcode = $('#postcode').val();
		var phonenumber = $('#phonenumber').val();
		var address = $('#address').val();
		var city = $('#city').val();
		var nipnumber = $('#nipnumber').val();
		var idnumber = $('#idnumber').val();

		let txt = '{"name": "' + name + '", "surname": "' + surname + '", "email": "' + email +
			'", "postcode": "' + postcode + '", "phonenumber": "' + phonenumber + '", "address": "' +
			address +
			'", "city": "' + city + '", "nipnumber": "' + nipnumber + '", "idnumber": "' + idnumber + '"}';
		let objJson = JSON.parse(txt);
		console.log(objJson);

		///
		if (typeof (Worker) !== "undefined") {
			if (typeof (w) == "undefined") {
				w = new Worker("demo_workers.js");
			} else {
				console.log("Tuuu!");
			}

			w.addEventListener('message', function (e) {
				$('#name').val(e.data["name"]);
				$('#email').val(e.data["email"]);
				$('#surname').val(e.data["surname"]);
				$('#postcode').val(e.data["postcode"]);
				$('#phonenumber').val(e.data["phonenumber"]);
				$('#address').val(e.data["address"]);
				$('#city').val(e.data["city"]);
				$('#nipnumber').val(e.data["nipnumber"]);
				$('#idnumber').val(e.data["idnumber"]);
			}, false);
			w.postMessage(objJson);

		} else {
			console.log("Sorry, your browser does not support Web Workers...");
		}
	}

}