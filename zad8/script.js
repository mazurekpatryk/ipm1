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

	var transaction = db.transaction(["customers"], "readwrite");

	var store = transaction.objectStore("customers");


	var customer = {
		name: name,
		email: email,
		surname: surname,
		postcode: postcode,
		phonenumber: phonenumber,
		address: address,
		city: city,
		nipnumber: nipnumber,
		idnumber: idnumber
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
	let random = txt[Math.floor(Math.random() * (txt.length-1))];
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




