//Navigation bar effects on scroll
window.addEventListener("scroll", function () {
   const header = document.querySelector("header");
   header.classList.toggle("sticky", window.scrollY > 0);
});

//Service section - Modal
const serviceModals = document.querySelectorAll(".services-modal");
const learnmoreBtns = document.querySelectorAll(".learns-more-btn");
const modalCloseBtns = document.querySelectorAll(".modals-close-btn");

var modal = function (modalClick) {
   serviceModals[modalClick].classList.add("active");
};

learnmoreBtns.forEach((learnmoreBtn, i) => {
   learnmoreBtn.addEventListener("click", () => {
      modal(i);
   });
});

modalCloseBtns.forEach((modalCloseBtn) => {
   modalCloseBtn.addEventListener("click", () => {
      serviceModals.forEach((modalView) => {
         modalView.classList.remove("active");
      });
   });
});

//Project section - Modal
const projectModals = document.querySelectorAll(".project-model");
const imgCards = document.querySelectorAll(".img-card");
const projectCloseBtns = document.querySelectorAll(".project-close-btn");

var modals = function (modalClick) {
   projectModals[modalClick].classList.add("active");
};

imgCards.forEach((imgCard, i) => {
   imgCard.addEventListener("click", () => {
      modals(i);
   });
});

projectCloseBtns.forEach((projectCloseBtn, i) => {
   projectCloseBtn.addEventListener("click", () => {
      projectModals.forEach((projectModalView) => {
         projectModalView.classList.remove("active");
      });
   });
});

//Responsive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItem = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
   navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
   navigation.classList.remove("active");
});

navItem.forEach((navItem) => {
   navItem.addEventListener("click", () => {
      navigation.classList.remove("active");
   });
});

//Scroll reveal animations
//Common reveal options to create reveal animations
ScrollReveal({
   // reset: true,
   distance: "60px",
   duration: 2500,
   delay: 100,
});

//Target elements, and specify options to create reveal animations
ScrollReveal().reveal(".home .info h2, .section-title-01, .section-title-02", { delay: 500, origin: "left" });
ScrollReveal().reveal(".home .info h3, .home .info p, .about-info .btn", { delay: 600, origin: "right" });
ScrollReveal().reveal(".home .info .btn", { delay: 700, origin: "bottom" });
ScrollReveal().reveal(".media-icons i, .contact-left li", { delay: 500, origin: "left", interval: 200 });
ScrollReveal().reveal(".home-img, about-img", { delay: 500, origin: "bottom" });
ScrollReveal().reveal(".about .description, .contact-right", { delay: 600, origin: "right" });
ScrollReveal().reveal(".about .profesional-list li", { delay: 500, origin: "right", interval: 200 });
ScrollReveal().reveal(".skills-description, service-description, .contact-card, contact-left h2", { delay: 700, origin: "left" });
ScrollReveal().reveal(".experience-card, .service-card, .education, .project .img-card", { delay: 800, origin: "bottom", interval: 200 });
ScrollReveal().reveal("footer .group", { delay: 500, origin: "top", interval: 200 });

// Contact Form
const scriptURL = "https://script.google.com/macros/s/AKfycbyZUbXllOqHmwOpk9trXC_uugOjNeGqxPS3AD9nujNZ-onNwCN5L1mEvCWqq70CtGhaKw/exec";
const form = document.forms["Contact-Form"];

if (form) {
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(scriptURL, { method: "POST", body: new FormData(form) })
         .then((response) => {
            console.log("Success!", response);
            Swal.fire({
               title: "Berhasil!",
               text: "Pesan berhasil terkirim",
               icon: "success",
            });
            form.reset();
         })
         .catch((error) => {
            console.error("Error!", error.message);
            Swal.fire({
               title: "Gagal!",
               text: "Pesan gagal terkirim",
               icon: "error",
            });
            form.reset();
         });
   });
} else {
   console.error('Form with name "submit-to-google-sheet" not found.');
}
