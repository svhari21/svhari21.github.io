$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Custom error handling can be added here
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            var fullMessage = `Hello! I received a new message from the contact form:\n\n` +
                              `👤 Name: ${name}\n📧 Email: ${email}\n📌 Subject: ${subject}\n📝 Message: ${message}`;

            var whatsappNumber = "919092311430"; // Replace with your WhatsApp number (in international format, no +)
            var whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');

            $('#success').html("<div class='alert alert-success'>")
                .find('.alert-success')
                .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                .append("<strong>Your message has been prepared to send on WhatsApp, " + name + ".</strong>")
                .parent()
                .append('</div>');

            $('#contactForm').trigger("reset");

            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);
            setTimeout(function () {
                $this.prop("disabled", false);
            }, 1000);
        },
        filter: function () {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });

    $('#name').focus(function () {
        $('#success').html('');
    });
});
