
// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.getElementById('nav-menu');
	if (navToggle && navMenu) {
		navToggle.addEventListener('click', function () {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', !expanded);
			navMenu.classList.toggle('open');
		});
	}

	// Lightbox functionality
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = document.querySelector('.lightbox-img');
	const lightboxCaption = document.querySelector('.lightbox-caption');
	const lightboxDetails = document.querySelector('.lightbox-details');
	const lightboxClose = document.querySelector('.lightbox-close');
	const projectCards = document.querySelectorAll('.project-card');

	projectCards.forEach(card => {
		card.addEventListener('click', function () {
			const img = card.querySelector('.project-img');
			const title = card.querySelector('h3').textContent;
			const detailsList = card.querySelector('ul');
			if (img && lightbox && lightboxImg && lightboxCaption && lightboxDetails) {
				lightboxImg.src = img.src;
				lightboxImg.alt = img.alt;
				lightboxCaption.textContent = title;
				// Copy project details (bullets)
				lightboxDetails.innerHTML = '';
				if (detailsList) {
					Array.from(detailsList.children).forEach(li => {
						const clone = li.cloneNode(true);
						lightboxDetails.appendChild(clone);
					});
				}
				lightbox.hidden = false;
				lightbox.focus();
				document.body.style.overflow = 'hidden';
			}
		});
		card.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				card.click();
			}
		});
	});

	function closeLightbox() {
		if (lightbox) {
			lightbox.hidden = true;
			lightboxImg.src = '';
			document.body.style.overflow = '';
		}
	}

	if (lightboxClose) {
		lightboxClose.addEventListener('click', closeLightbox);
	}
	if (lightbox) {
		lightbox.addEventListener('click', function (e) {
			if (e.target === lightbox) closeLightbox();
		});
		lightbox.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') closeLightbox();
		});
	}
	// Contact form validation
	const contactForm = document.querySelector('.contact-form');
		if (contactForm) {
			contactForm.addEventListener('submit', function (e) {
				// Remove previous errors and success messages
				contactForm.querySelectorAll('.form-error, .form-success').forEach(el => el.remove());
				let valid = true;

				// Name validation
				const nameInput = contactForm.querySelector('input[name="name"]');
				if (nameInput && !nameInput.value.trim()) {
					showError(nameInput, 'Name is required.');
					valid = false;
				}

				// Email validation
				const emailInput = contactForm.querySelector('input[name="email"]');
				if (emailInput) {
					const emailVal = emailInput.value.trim();
					if (!emailVal) {
						showError(emailInput, 'Email is required.');
						valid = false;
					} else if (!/^\S+@\S+\.\S+$/.test(emailVal)) {
						showError(emailInput, 'Please enter a valid email address.');
						valid = false;
					}
				}

				// Message validation
				const messageInput = contactForm.querySelector('textarea[name="message"]');
				if (messageInput && !messageInput.value.trim()) {
					showError(messageInput, 'Message is required.');
					valid = false;
				}

				if (!valid) {
					e.preventDefault();
				} else {
					e.preventDefault();
					// Show fake success message and reset form
					const success = document.createElement('div');
					success.className = 'form-success';
					success.textContent = 'Thank you! Your message has been sent.';
					success.style.color = '#2b8a3e';
					success.style.fontSize = '1.05rem';
					success.style.marginTop = '12px';
					success.style.textAlign = 'center';
					success.setAttribute('role', 'status');
					contactForm.appendChild(success);
					contactForm.reset();
				}
			});

			function showError(input, message) {
				const error = document.createElement('div');
				error.className = 'form-error';
				error.textContent = message;
				error.style.color = '#ef233c';
				error.style.fontSize = '0.95rem';
				error.style.marginTop = '4px';
				error.setAttribute('role', 'alert');
				input.parentNode.insertBefore(error, input.nextSibling);
			}
		}
});
