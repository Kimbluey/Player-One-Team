// Form validation for user login and sign up
function validate2() {
	valCheck = true;
	var image1 = getImage(emailCheck(document.forms["entries"]["email"].value), "email");
	document.getElementById("Email").appendChild(image1);
	
	var image2 = getImage(alphaNumCheck(document.forms["entries"]["password"].value), "password");
	document.getElementById("Password").appendChild(image2);
	
	var image3 = getImage(nameCheck(document.forms["entries"]["fname"].value), "fname");
	document.getElementByID("FName").appendChild(image3);
	
	var image4 = getImage(nameCheck(document.forms["entries"]["lname"].value), "lname");
	document.getElementByID("LName").appendChild(image4);
	
	if (emailCheck(document.forms["entries"]["email"].value) && alphaNumCheck(document.forms["entries"]["password"].value)
	    && nameCheck(document.forms["entries"]["fname"].value) && nameCheck(document.forms["entries"]["lname"].value)) {
		
		window.location.href = "index.html";
	}
}

// Images to display for valid (correct.png) and invalid (wrong.png) entries
function getImage(bool, ID) {
	var image = document.getElementById("image" + ID);
	if (image == null) {
		image = new Image(15, 15);
		image.id = "image" + ID;
	}
	image.src = bool ? './correct.png' : './wrong.png';
	return image;
}

// Check for valid email
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

// Check for valid name values
function nameCheck(entry) {
	let regex = /^[A-Z]+$/i;
	if (entry != null && entry.match(regex)) {
		return true;
	} else {
		return false;
	}
}

// Check for valid alphanumeric values
function alphaNumCheck(entry) {
	let regex = /^[a-z0-9]+$/i;
	if (entry != null && entry.match(regex)) {
		return true;
	} else {
		return false;
	}
}

// Check for valid numeric values
function numCheck(entry) {
	let regex = /^[0-9]+$/i;
	if (entry != null && entry.match(regex)) {
		return true;
	} else {
		return false;
	}
}

// Check for valid password
function passwordCheck(password){
	// Can't have password of length zero
	if(password.length == 0){
		return true;
	}
	// Password must be of length 10 and numeric
	if(password.length == 10 && numCheck(password)){
		return true;
	}
	atSplit=password.split('-');
	if(atSplit.length== 3 && numCheck(atSplit[0]) && numCheck(atSplit[1]) && numCheck(atSplit[2]) && atSplit[0].length==3 && atSplit[1].length== 3 && atSplit[2].length==4)
	{
		return true;
	}
	valCheck=false;
	return false;
}

// Delete cookies
function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

