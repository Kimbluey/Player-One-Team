function validate2() {
    valCheck = true;
    var image1 = getImage(emailCheck(document.forms["contact information"]["email"].value), "email");
    document.getElementById("Email").appendChild(image1);
	var imagel2 = getImage(alphaNumCheck(document.forms["contact information"]["phone"].value), "phone");
    document.getElementById("Phone").appendChild(imagel2);
	
if(emailCheck(document.forms["contact information"]["email"].value) && alphaNumCheck(document.forms["contact information"]["phone"].value))
  window.location.href = "index.html";
}


function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}
function addressCheck(address) {
    atSplit = address.split(',');
	if(atSplit.length==2)
		return true;
	
    
    return false;
}

function emailCheck(email) {
    atSplit = email.split('@');
    if (atSplit.length == 2 && alphaNumCheck(atSplit[0])) {
        periodSplit = atSplit[1].split('.')
        if (periodSplit.length == 2 && alphaNumCheck(periodSplit[0] + periodSplit[1])) {
            return true;
        }
    }
    valCheck = false;
    return false;
}


function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}
function numCheck(entry) {
    let regex = /^[0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}
function phoneCheck(phone){
	if(phone.length==0){
	return true;}
	if(phone.length== 10&& numCheck(phone)){
		return true;
	}
	atSplit=phone.split('-');
	if(atSplit.length== 3 && numCheck(atSplit[0]) && numCheck(atSplit[1]) && numCheck(atSplit[2]) && atSplit[0].length==3 && atSplit[1].length== 3 && atSplit[2].length==4)
	{
	
	return true;
	}
	valCheck=false;
	return false;
}

function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



