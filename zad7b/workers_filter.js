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


function sumLetter()


this.addEventListener('message', function (e) {
    let addressImg = changeSize(e.data["addressImg"]);
    var colorR = changeSize(e.data["colorR"]);
    var colorG = changeSize(e.data["colorG"]);
    var colorB = changeSize(e.data["colorB"]);


    let stringJson = '{"addressImg": "' + addressImg + '", "colorR": "' + colorR + '", "colorG": "' + colorG +
                    '", "colorB": "' + colorB + '", "name": "' + name + '", "surname": "' + surname + '", "email": "' + email +
                    '", "postcode": "' + postcode + '", "phonenumber": "' + phonenumber + '", "address": "' +
                    address +
                    '", "city": "' + city + '", "nipnumber": "' + nipnumber + '", "idnumber": "' + idnumber +'"}';
    let objJson_2 = JSON.parse(stringJson);
    this.postMessage(objJson_2);

}, false);


