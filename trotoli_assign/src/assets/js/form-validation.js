/*function sendOTP() {
	console.log("sadasd")
	event.preventDefault();
	$.get('/customer/send_otp/?next=/', function(data) {
		console.log('asdasdasd')
	});
}*/


function validateEmail(valueToTest) {
	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	return testEmail.test(valueToTest);
}

function matchPasswords(password1, password2) {
	return (password1 === password2);
}

function validateNumber(valueToTest) {
	testNumber = /^[0-9-+]+$/;
	return testNumber.test(valueToTest)
}

var recaptchaCallbackRecieved = false;
var isSuEmailFieldValid = false;
var doPasswordsMatch = false;
var isPhoneNumberFieldValid = false;

function validateSignUpForm() {
	if(isSuEmailFieldValid && doPasswordsMatch) {
		$('#signup_button').prop('disabled', false);
		$("#signup_button").removeClass("disabled-btn");
		$("#signup_button").addClass("login-btn");
	}else {
		$('#signup_button').prop('disabled', true);
		$("#signup_button").removeClass("login-btn");
		$("#signup_button").addClass("disabled-btn");
	}
}

function validateUserDetailsForm() {
	if(recaptchaCallbackRecieved  && isPhoneNumberFieldValid) {
		$('#ud_submit').prop('disabled', false);
		$("#ud_submit").removeClass("disabled-btn");
		$("#ud_submit").addClass("login-btn");
	}else {
		$('#ud_submit').prop('disabled', true);
		$("#ud_submit").removeClass("login-btn");
		$("#ud_submit").addClass("disabled-btn");
	}
}

function setRecaptchaKey() {
	recaptchaCallbackRecieved = true;
	validateUserDetailsForm()
}

function validatePhoneNumber() {
	if(validateNumber($('#phone_number').val())) {
		isPhoneNumberFieldValid = true;
		$('#phone_number').removeClass('invalid-input');
	}else {
		isPhoneNumberFieldValid = false;
		$('#phone_number').addClass('invalid-input');
	}
}

//Sign up Form validation
$('#signup').on('shown.bs.modal', function () {
	
	function validateSignUpEmailField() {
		if(validateEmail($('#su_email').val())) {
			isSuEmailFieldValid = true;
			$('#su_email').removeClass('invalid-input');
		}else {
			isSuEmailFieldValid = false;
			$('#su_email').addClass('invalid-input');
		}
	}
	
	function matchSignUpPasswords() {
		if(matchPasswords($('#password1').val(), $('#password2').val())) {
			doPasswordsMatch = true;
			$('#password2').removeClass('invalid-input');
		}else {
			doPasswordsMatch = false;
			$('#password2').addClass('invalid-input');
		}
	}
	
	if($('#su_email').val() !== '') {
		validateSignUpEmailField();
	}
	
	if($('#password1').val() !== '' && $('#password2').val() !== '') {
		matchSignUpPasswords();
	}
	
	validateSignUpForm();
	
	$('#su_email').on('input', function() {
		validateSignUpEmailField();
	});
	
	$('#password1, #password2').on('input', function() {
		matchSignUpPasswords();
	});
	
	$('#su_email, #password1, #password2').on('input', function() {
		validateSignUpForm();
	});
});

//Login Form validation
$('#login').on('shown.bs.modal', function () {
	var isLgEmailFieldValid = false;
	var isPasswordFieldEmpty = true;
	
	function validateLoginEmailField() {
		if(validateEmail($('#lg_email').val())) {
			isLgEmailFieldValid = true;
			$('#lg_email').removeClass('invalid-input');
		}else {
			isLgEmailFieldValid = false;
			$('#lg_email').addClass('invalid-input');
		}
	}
	
	if($('#lg_email').val() !== '') {
		validateLoginEmailField();
	}
	
	if($('#password').val() !== '') {
		isPasswordFieldEmpty = false;
	}

	if(isLgEmailFieldValid && !isPasswordFieldEmpty) {
		$('#login_btn').prop('disabled', false);
		$("#login_btn").removeClass("disabled-btn");
		$("#login_btn").addClass("login-btn");
	}else {
		$('#login_btn').prop('disabled', true);
		$("#login_btn").removeClass("login-btn");
		$("#login_btn").addClass("disabled-btn");
	}
	
	$('#lg_email').on('input', function() {
		validateLoginEmailField();
	});
	
	$('#password').on('input', function() {
		if($('#password').val() !== '') {
			isPasswordFieldEmpty = false;
			$('#password').removeClass('invalid-input')
		}else {
			isPasswordFieldEmpty = true;
			$('#password').addClass('invalid-input')
		}
	});
	
	$('#lg_email, #password').on('input', function() {
		if(isLgEmailFieldValid && !isPasswordFieldEmpty) {
			$('#login_btn').prop('disabled', false);
			$("#login_btn").removeClass("disabled-btn");
			$("#login_btn").addClass("login-btn");
		}else {
			$('#login_btn').prop('disabled', true);
			$("#login_btn").removeClass("login-btn");
			$("#login_btn").addClass("disabled-btn");
		}
	});
});

//User Details Form Validation
$('#user_details').on('shown.bs.modal', function () {
	validateUserDetailsForm();	
	$('#phone_number').on('input', function() {
		validatePhoneNumber();
		validateUserDetailsForm();
	});
});

// Phone password validation
$('#password_phone').on('shown.bs.modal', function () {
	var formValid = false;
	
	function validatePhoneField() {
		if(validateNumber($('#forgot_phone').val())) {
			$('#forgot_phone').removeClass('invalid-input');
			formValid = true;
		}else {
			console.log('andar')
			$('#forgot_phone').addClass('invalid-input');
			formValid = false;
		}
	}
	$('#forgot_phone').on('input', function () {
		validatePhoneField();
		if(formValid) {
			$('#forgot_phone_submit').prop('disabled', false);
			$('#forgot_phone_submit').removeClass('disabled-btn');
			$('#forgot_phone_submit').addClass('verify-btn');
		}else {
			$('#forgot_phone_submit').prop('disabled', true);
			$('#forgot_phone_submit').removeClass('verify-btn');
			$('#forgot_phone_submit').addClass('disabled-btn');
		}
	});
})