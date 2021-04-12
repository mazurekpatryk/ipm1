$(document).ready(function(){

	var request = indexedDB.open('customermanager',1);
	
	request.onupgradeneeded = function(e){
		var db = e.target.result;
		
		if(!db.objectStoreNames.contains('customers')){
			var os = db.createObjectStore('customers',{keyPath: "id", autoIncrement:true});

			os.createIndex('name','name',{unique:false});
		}
	};
	

	request.onsuccess = function(e){
		console.log('Success: Opened Database...');
		db = e.target.result;

		showCustomers();
	};
	

	request.onerror = function(e){
		console.log('Error: Could Not Open Database...');
	};
});


function addCustomer(){
	var name = $('#name').val();
	var email = $('#email').val();
    var surname = $('#surname').val();
	var postcode = $('#postcode').val();
    var phonenumber = $('#phonenumber').val();
	
	
	var transaction = db.transaction(["customers"],"readwrite");

	var store = transaction.objectStore("customers");
	

	var customer = {
		name: name,
		email: email,
        surname: surname,
        postcode: postcode,
        phonenumber: phonenumber
	};
	
	var request = store.add(customer);
	
	request.onsuccess = function(e){
		window.location.href="index.html";
	};
	
	request.onerror = function(e){
		alert("Sorry, the customer was not added");
		console.log('Error', e.target.error.name);
	};
}

function showCustomers(e){
	var transaction = db.transaction(["customers"],"readonly");
	var store = transaction.objectStore("customers");
	var index = store.index('name');
	
	var output = '';
	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if(cursor){
			output += "<tr id='customer_"+cursor.value.id+"'>";
			output += "<td>"+cursor.value.id+"</td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='name' data-id='"+cursor.value.id+"'>"+cursor.value.name+"</span></td>";
            output += "<td><span class='cursor customer' contenteditable='true' data-field='surname' data-id='"+cursor.value.id+"'>"+cursor.value.surname+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='email' data-id='"+cursor.value.id+"'>"+cursor.value.email+"</span></td>";
            output += "<td><span class='cursor customer' contenteditable='true' data-field='phonenumber' data-id='"+cursor.value.id+"'>"+cursor.value.phonenumber+"</span></td>";
            output += "<td><span class='cursor customer' contenteditable='true' data-field='postcode' data-id='"+cursor.value.id+"'>"+cursor.value.postcode+"</span></td>";
			output += "<td><a onclick='removeCustomer("+cursor.value.id+")' href=''>Delete</a></td>";
			output += "</tr>";
			cursor.continue();
		}
		$('#customers').html(output);
	};
}

function removeCustomer(id){
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	
	var request = store.delete(id);
	
	request.onsuccess = function(){
		console.log('customer '+id+' Deleted');
		$('.customer_'+id).remove();
	};
	
	request.onerror = function(e){
		alert("Sorry, the customer was not removed");
		console.log('Error', e.target.error.name);
	};
}

function clearCustomers(){
	indexedDB.deleteDatabase('customermanager');
	window.location.href="index.html";
}

$('#customers').on('blur','.customer',function(){
	var newText = $(this).html();
	var field = $(this).data('field');
	var id = $(this).data('id');
	
	var transaction = db.transaction(["customers"],"readwrite");
	var store = transaction.objectStore("customers");
	
	var request = store.get(id);
	
	request.onsuccess = function(){
		var data = request.result;
		if(field == 'name'){
			data.name = newText;
		} else if(field == 'email'){
			data.email = newText;
		}
		
		var requestUpdate = store.put(data);
		
		requestUpdate.onsuccess = function(){
			console.log('Customer field updated...');
		};
		
		requestUpdate.onerror = function(){
			console.log('Error: Customer field NOT updated...');
		};
	};
});



