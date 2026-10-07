const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});
/* Close mobile menu after clicking */
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
         navMenu.classList.remove("active");
         });
});
/* =========================================
   COUNTDOWN
========================================= */
/*
   Change this date whenever your actual
   event date is finalized.
*/
const eventDate = new Date("December 20, 2026 09:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const difference = eventDate - now;
    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
}
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );
    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}
setInterval(updateCountdown, 1000);
updateCountdown();
/* =========================================
   EVENT SEARCH
========================================= */
const eventSearch = document.getElementById("eventSearch");
const categoryFilter = document.getElementById("categoryFilter");
const eventCards =
    document.querySelectorAll(".event-card");
function filterEvents() {
    const searchText =
        eventSearch.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;
        eventCards.forEach(card => {
            const title =
            card.querySelector("h3")
                .textContent
                .toLowerCase();
                const category =
            card.dataset.category;
         const matchesSearch =
            title.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;
            if (matchesSearch && matchesCategory) {

            card.style.display = "block";

        } 
        else
             {

            card.style.display = "none";

        }

    });

}


eventSearch.addEventListener("input", filterEvents);

categoryFilter.addEventListener(
    "change",
    filterEvents
);


/* =========================================
   EVENT REGISTER BUTTONS
========================================= */

const eventButtons =
    document.querySelectorAll(".event-register");

const eventSelect =
    document.getElementById("event");


eventButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedEvent =
            button.dataset.event;


        eventSelect.value = selectedEvent;


        document
            .getElementById("register")
            .scrollIntoView({
                behavior: "smooth"
            });


        createConfetti();

    });

});


/* =========================================
   REGISTRATION FORM
========================================= */

const form =
    document.getElementById("registrationForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();


    clearErrors();


    const name =
        document.getElementById("studentName")
            .value.trim();

    const email =
        document.getElementById("email")
            .value.trim();

    const phone =
        document.getElementById("phone")
            .value.trim();

    const college =
        document.getElementById("college")
            .value.trim();

    const selectedEvent =
        document.getElementById("event")
            .value;

    const terms =
        document.getElementById("terms")
            .checked;


    let valid = true;


    /* NAME */

    if (name.length < 3) {

        document.getElementById("nameError")
            .textContent =
            "⚠️ Please enter your full name.";

        valid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        document.getElementById("emailError")
            .textContent =
            "⚠️ Please enter a valid email.";

        valid = false;

    }


    /* PHONE */

    const phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        document.getElementById("phoneError")
            .textContent =
            "⚠️ Enter a valid 10-digit phone number.";

        valid = false;

    }


    /* COLLEGE */

    if (college.length < 3) {

        document.getElementById("collegeError")
            .textContent =
            "⚠️ Please enter your college name.";

        valid = false;

    }
/* EVENT */
if (selectedEvent === "") {

        document.getElementById("eventError")
            .textContent =
            "⚠️ Please select an event.";

        valid = false;

    }


    /* TERMS */

    if (!terms) {

        document.getElementById("termsError")
            .textContent =
            "⚠️ Please accept the event rules.";

        valid = false;

    }


    if (!valid) {

        return;

    }


    /* =====================================
       GENERATE REGISTRATION ID
    ===================================== */

    const registrationId =
        "EDU-2026-" +
        Math.floor(1000 + Math.random() * 9000);


    /* =====================================
       SAVE REGISTRATION
    ===================================== */

    const registrationData = {

        name: name,

        email: email,

        phone: phone,

        college: college,

        event: selectedEvent,

        message:
            document.getElementById("message")
                .value.trim(),

        registrationId:
            registrationId,

        date:
            new Date().toLocaleString()

    };


    localStorage.setItem(
        "edufestRegistration",
        JSON.stringify(registrationData)
    );


    /* =====================================
       SHOW SUCCESS
    ===================================== */

    document.getElementById("successName")
        .textContent = name;

    document.getElementById("successEvent")
        .textContent = selectedEvent;

    document.getElementById("registrationId")
        .textContent = registrationId;


    form.style.display = "none";

    document.getElementById("successCard")
        .style.display = "block";


    createConfetti();


    document.getElementById("successCard")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    document.querySelectorAll(".error")
        .forEach(error => {

            error.textContent = "";

        });

}


/* =========================================
   REGISTER AGAIN
========================================= */

document
    .getElementById("newRegistration")
    .addEventListener("click", () => {

        form.reset();

        form.style.display = "block";

        document.getElementById("successCard")
            .style.display = "none";

        clearErrors();

        document.getElementById("register")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );


    const colors = [

        "#ff477e",
        "#6c2cff",
        "#ffd43b",
        "#4dabf7",
        "#69db7c",
        "#ff922b",
        "#da77f2"

    ];


    for (let i = 0; i < 100; i++) {
        const piece =
            document.createElement("div");
 piece.classList.add("confetti");
        piece.style.left =
            Math.random() * 100 + "%";
        piece.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];
        piece.style.animationDuration =
            (2 + Math.random() * 2) + "s";
        piece.style.animationDelay =
            Math.random() * 0.8 + "s";
        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;
        container.appendChild(piece);
        setTimeout(() => {
            piece.remove();
        }, 4500);
    }
}
/* =========================================
   BUTTON CLICK EFFECT
========================================= */
document
    .querySelectorAll(".btn, .event-register")
    .forEach(button => {
        button.addEventListener("click", () => {
            createConfetti();
        });
 });