function changeSize(txt) {
    let newtxt = "";

    for (let i = 0; i < txt.length; ++i) {
        var value = txt.charAt(i);
        if (value == value.toUpperCase()) {
            newtxt += txt.charAt(i).toLowerCase();
        } else {
            newtxt += txt.charAt(i).toUpperCase();
        }
    }

    return newtxt;

}


this.addEventListener('message', function (e) {
    let name = changeSize(e.data["name"]);
    var email = changeSize(e.data["email"]);
    var surname = changeSize(e.data["surname"]);
    var postcode = changeSize(e.data["postcode"]);
    var phonenumber = changeSize(e.data["phonenumber"]);
    var address = changeSize(e.data["address"]);
    var city = changeSize(e.data["city"]);
    var nipnumber = changeSize(e.data["nipnumber"]);
    var idnumber = changeSize(e.data["idnumber"]);


    let stringJson = '{"name": "' + name + '", "surname": "' + surname + '", "email": "' + email +
        '", "postcode": "' + postcode + '", "phonenumber": "' + phonenumber + '", "address": "' + address +
        '", "city": "' + city + '", "nipnumber": "' + nipnumber + '", "idnumber": "' + idnumber + '"}';
    let objJson_2 = JSON.parse(stringJson);
    this.postMessage(objJson_2);

}, false);


