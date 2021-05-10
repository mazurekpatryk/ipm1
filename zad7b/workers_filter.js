function sumLetter(txt) {
    let newtxt = "";

    for (let i = 0; i < txt.length; ++i) {
        var value = txt.charAt(i);
        let sum = 0;

        if(value == 'a'){
            sum += 1;
        }else if(value == 'b'){
            sum += 2;
        }else if(value == 'c'){
            sum += 3;
        }else if(value == 'd'){
            sum += 4;
        }else if(value == 'e'){
            sum += 5;
        }else if(value == 'f'){
            sum += 6;
        }else if(value == 'g'){
            sum += 7;
        }else if(value == 'h'){
            sum += 8;
        }else if(value == 'i'){
            sum += 9;
        }else if(value == 'j'){
            sum += 10;
        }else if(value == 'k'){
            sum += 11;
        }else if(value == 'l'){
            sum += 12;
        }else if(value == 'm'){
            sum += 13;
        }else if(value == 'n'){
            sum += 14;
        }else if(value == 'o'){
            sum += 15;
        }else if(value == 'p'){
            sum += 16;
        }else if(value == 'q'){
            sum += 17;
        }else if(value == 'r'){
            sum += 18;
        }else if(value == 's'){
            sum += 19;
        }else if(value == 't'){
            sum += 20;
        }else if(value == 'u'){
            sum += 21;
        }else if(value == 'v'){
            sum += 22;
        }else if(value == 'w'){
            sum += 23;
        }else if(value == 'x'){
            sum += 24;
        }else if(value == 'y'){
            sum += 25;
        }else if(value == 'z'){
            sum += 26;
        }else if(value == 'A'){
            sum += 31;
        }else if(value == 'B'){
            sum += 32;
        }else if(value == 'C'){
            sum += 33;
        }else if(value == 'D'){
            sum += 34;
        }else if(value == 'E'){
            sum += 35;
        }else if(value == 'F'){
            sum += 36;
        }else if(value == 'G'){
            sum += 37;
        }else if(value == 'H'){
            sum += 38;
        }else if(value == 'I'){
            sum += 39;
        }else if(value == 'J'){
            sum += 40;
        }else if(value == 'K'){
            sum += 41;
        }else if(value == 'L'){
            sum += 42;
        }else if(value == 'M'){
            sum += 43;
        }else if(value == 'N'){
            sum += 44;
        }else if(value == 'O'){
            sum += 45;
        }else if(value == 'P'){
            sum += 46;
        }else if(value == 'Q'){
            sum += 47;
        }else if(value == 'R'){
            sum += 48;
        }else if(value == 'S'){
            sum += 49;
        }else if(value == 'T'){
            sum += 50;
        }else if(value == 'U'){
            sum += 51;
        }else if(value == 'V'){
            sum += 52;
        }else if(value == 'W'){
            sum += 53;
        }else if(value == 'X'){
            sum += 54;
        }else if(value == 'Y'){
            sum += 55;
        }else if(value == 'Z'){
            sum += 56;
        }
    }

    return sum;

}



this.addEventListener('message', function (e) {
    let addressImg = changeSize(e.data["addressImg"]);
    var colorR = changeSize(e.data["colorR"]);
    var colorG = changeSize(e.data["colorG"]);
    var colorB = changeSize(e.data["colorB"]);
    let name = changeSize(e.data["name"]);
    var email = changeSize(e.data["email"]);
    var surname = changeSize(e.data["surname"]);
    var postcode = changeSize(e.data["postcode"]);
    var phonenumber = changeSize(e.data["phonenumber"]);
    var address = changeSize(e.data["address"]);
    var city = changeSize(e.data["city"]);
    var nipnumber = changeSize(e.data["nipnumber"]);
    var idnumber = changeSize(e.data["idnumber"]);



    let stringJson = '{"addressImg": "' + addressImg + '", "colorR": "' + colorR + '", "colorG": "' + colorG +
                    '", "colorB": "' + colorB + '", "name": "' + name + '", "surname": "' + surname + '", "email": "' + email +
                    '", "postcode": "' + postcode + '", "phonenumber": "' + phonenumber + '", "address": "' +
                    address +
                    '", "city": "' + city + '", "nipnumber": "' + nipnumber + '", "idnumber": "' + idnumber +'"}';
    
    let objJson_2 = JSON.parse(stringJson);
    this.postMessage(objJson_2);

}, false);


