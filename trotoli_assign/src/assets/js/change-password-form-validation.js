var doPasswordsMatch = false;
var oldPasswordFilled = false;

function matchPasswords(password1, password2) {
	return (password1 === password2 && password1 != '');
}

function validateForm() {
	if(doPasswordsMatch && oldPasswordFilled) {
		$('#cp_submit').prop('disabled', false);
		$("#cp_submit").removeClass("disabled-btn");
	}else {
		$('#cp_submit').prop('disabled', true);
		$("#cp_submit").addClass("disabled-btn");
	}
}

$('#id_password1, #id_password2, #id_oldpassword').on('input', function() {
	if(matchPasswords($('#id_password1').val(), $('#id_password2').val())) {
		doPasswordsMatch = true;
		$('#id_password2').removeClass('invalid-input');
	}else {
		doPasswordsMatch = false;
		$('#id_password2').addClass('invalid-input');
	}
	if($('#id_oldpassword').val() !== '') {
		oldPasswordFilled = true;
		$('#id_oldpassword').removeClass('invalid-input');
	}else {
		oldPasswordFilled = false;
		$('#id_oldpassword').addClass('invalid-input');
	}
	validateForm();
});
