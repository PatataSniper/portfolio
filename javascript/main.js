class Portfolio {
	constructor() {
		this.__init();
		this.__initUI();
	}

	get $title() {
		return $("#main-title");
	}

	get $aside() {
		return $("aside");
	}

	get $menuBtn() {
		return $("[id='hamburger-menu-btn']");
	}

	get $closeAsideBtn() {
		return $("[id='close-aside-btn']");
	}

	get $navButtons() {
		return $("a", $("li", $("nav")));
	}

	get $heroCard() {
		return $(".hero-card");
	}

	get $heroCard() {
		return $(".hero-card");
	}

	get $techCards() {
		return $(".tech-card");
	}

	get $techDescriptions() {
		return $(".tech-description");
	}

	__$getTechCards(line) {
		switch (line) {
			case 1:
				return $(".tech-card.first-line");
			case 2:
				return $(".tech-card.second-line");
			case 3:
				return $(".tech-card.third-line");
		}
	}

	__$getMainIconsContainers() {
		return $(".main-icons-container");
	}

	__init() {
		ExtDebug.initTrace(this, this.__init);
	}

	__initUI() {
		ExtDebug.initTrace(this, this.__initUI);

		// Initialize UI related events
		this.__initEvents();

		// Initialize UI animations
		this.__initAnimations();

		// Initialize scroll spy functionality
		this.__initScrollSpy();
	}

	__initEvents() {
		ExtDebug.initTrace(this, this.__initEvents);

		// Add click event listener to hamburguer menu button
		this.$menuBtn.click(this.showAside.bind(this));

		// Add click event listener to close-aside button
		this.$closeAsideBtn.click(this.hideAside.bind(this));

		// Add click event to navigation buttons
		this.$navButtons.click(this.onNavButtonClick.bind(this));
	}

	__initAnimations() {
		ExtDebug.initTrace(this, this.__initAnimations);

		// Set the hero card to be hidden and 100px above its final position,
		// then animate it to its final position and show it
		gsap.set(this.$heroCard, { y: -100, opacity: 0 });
		gsap.to(this.$heroCard, {
			delay: 0.3,
			duration: 1,
			y: 0,
			opacity: 1,
			ease: "back.out(1.7)",
		});

		// Set the initial state of the tech-card elements
		gsap.set(this.$techCards, { y: -100 });
		gsap.set(this.$techDescriptions, { x: 100 });

		let i = 1;
		while (i <= 3) {
			const $techCards = this.__$getTechCards(i);
			gsap.to($techCards, {
				y: 0,
				opacity: 1,
				ease: "back.out(1.7)",
				duration: 0.8,
				stagger: 0.2,
				scrollTrigger: {
					trigger: $techCards,
					start: "center 70%",
					end: "bottom top",
					// markers: true,
					toggleActions: "play none none reverse",
				},
			});

			i++;
		}

		for (const desc of this.$techDescriptions) {
			gsap.to(desc, {
				x: 0,
				opacity: 1,
				ease: "back.out(1.7)",
				duration: 0.8,
				delay: 0.6,
				scrollTrigger: {
					trigger: desc,
					start: "top 70%",
					end: "bottom top",
					// markers: true,
					toggleActions: "play none none reverse",
				},
			});
		}

		// Set the initial state of the works header elements
		gsap.set($(".work-item-header").find(".animate"), { x: -100 });
		// gsap.set($('.work-item-header').find('.date-time-mobile .date-line'), { x: -100 });
		gsap.set($(".work-item-content").find(".animate"), { y: 100 });
		// gsap.set($('.images-grid').find('img'), { y: 100 });

		for (const header of $(".work-item-header")) {
			const $header = $(header);

			gsap.to($header.find(".animate"), {
				x: 0,
				opacity: 1,
				ease: "back.out(1.7)",
				duration: 0.8,
				stagger: 0.2,
				scrollTrigger: {
					trigger: $header,
					start: "top 70%",
					end: "bottom top",
					// markers: true,
					toggleActions: "play none none reverse",
				},
			});

			gsap.to($header.find(".date-line"), {
				opacity: 1,
				duration: 0.8,
				scrollTrigger: {
					trigger: $header,
					start: "top 70%",
					end: "bottom top",
					// markers: true,
					toggleActions: "play none none reverse",
				},
			});

			gsap.to($header.find(".date-line-mobile"), {
				opacity: 1,
				duration: 0.8,
				scrollTrigger: {
					trigger: $header,
					start: "top 70%",
					end: "bottom top",
					// markers: true,
					toggleActions: "play none none reverse",
				},
			});
		}

		for (const content of $(".work-item-content")) {
			const $content = $(content);
			const $para = $content.find("p");
			gsap.to($para, {
				y: 0,
				opacity: 1,
				// ease: "back.out(1.7)",
				duration: 0.8,
				stagger: 0.2,
				scrollTrigger: {
					trigger: $content,
					start: "top 70%",
					end: "bottom top",
					// markers: true,
					toggleActions: "play none none reverse",
				},
			});

			gsap.to($content.find("img"), {
				y: 0,
				opacity: 1,
				// ease: "back.out(1.7)",
				duration: 0.8,
				stagger: 0.2,
				delay: 0.4,
				scrollTrigger: {
					trigger: $content.find(".images-grid"),
					start: "top 70%",
					end: "bottom top",
					// markers: true,
					toggleActions: "play none none reverse",
				},
			});
		}

		// Animate the closing text to appear with a slight delay with no easing
		const $closingText = $(".closing-text-container");
		gsap.set($closingText, { y: 50 });
		gsap.to($closingText, {
			delay: 0.3,
			duration: 1,
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: $closingText,
				start: "center 70%",
				end: "bottom top",
				// markers: true,
				toggleActions: "play none none reverse",
			},
		});

		// Randomize the text content of the title element
		this.__randomizeTitleText();

		// Init main section icons' animation
		this.__initMainIconsAnimation();
	}

	__initMainIconsAnimation() {
		const $containers = this.__$getMainIconsContainers();
		const amplitude = 282;          // horizontal distance in px
		const baseDuration = 10;       	// seconds per swing
		const baseDelay = 4;            // seconds before flipping direction
		const flipStagger = 0.5;        // progressive flip delay between items

		// Create the initial pendulum tweens
		$containers.each((index, el) => {
			const dir = index % 2 === 0 ? -1 : 1; // even -> left, odd -> right
			gsap.set(el, { x: 0 });

			const tween = gsap.to(el, {
				x: dir * amplitude,
				duration: baseDuration,
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1
			});

			// After a few seconds, progressively flip direction for each item
			gsap.delayedCall(baseDelay + index * flipStagger, () => {
				tween.vars.x = -dir * amplitude;   // invert target direction
				tween.invalidate().restart();      // apply new vars cleanly
			});
		});

		// Highlight one icon per container, rotating with random timing
		$containers.each((_, container) => {
			const $icons = $(container).find(".main-icon");
			if ($icons.length === 0) return;

			// Selecciona 3 índices aleatorios únicos
			let current = [];
			while (current.length < 3 && current.length < $icons.length) {
				let idx = Math.floor(Math.random() * $icons.length);
				if (!current.includes(idx)) current.push(idx);
			}

			// helper: aplica highlight a los índices dados
			const applyHighlight = (indices) => {
				$icons.each((i, icon) => {
					icon.classList.remove("highlight");
				});
				indices.forEach(idx => {
					const target = $icons[idx];
					if (target) target.classList.add("highlight");
				});
			};

			// highlight inicial
			applyHighlight(current);

			// rotación aleatoria de íconos
			const scheduleNext = () => {
				let next = [];
				while (next.length < 3 && next.length < $icons.length) {
					let idx = Math.floor(Math.random() * $icons.length);
					if (!next.includes(idx)) next.push(idx);
				}
				current = next;
				applyHighlight(current);

				// tiempo aleatorio entre 2s y 4s
				const nextDelay = 2 + Math.random() * 2;
				gsap.delayedCall(nextDelay, scheduleNext);
			};

			scheduleNext();
		});
	}

	__initScrollSpy() {
		const sections = document.querySelectorAll('section'); // Selecciona todas las secciones
		const navLinks = this.$navButtons; // Selecciona los enlaces de navegación

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Remueve la clase activa de todos los enlaces
						navLinks.removeClass('active');

						// Encuentra el enlace correspondiente a la sección visible
						const activeLink = $(`a[name="nav-to-${entry.target.id}"]`);
						activeLink.addClass('active');
					}
				});
			},
			{
				root: null, // Usa el viewport completo
				threshold: 0.2, // Detecta cuando el 20% de la sección está visible
				// scrollMargin: "0px 0px 50px 0px",
			}
		);

		// Observa cada sección
		sections.forEach((section) => observer.observe(section));
	}

	__randomizeTitleText() {
		// Randomize the text content of the title element, sequentially, for 2000 milliseconds
		Portfolio.randomType(this.$title[0], "10", 4000, true);
	}

	__commonScrollTrigger(triggerElement) {
		return {
			trigger: triggerElement,
			start: "top 20%",
			markers: true,
			toggleActions: "play none none reverse",
		};
	}

	showAside() {
		this.$aside.addClass("show");
	}

	hideAside() {
		this.$aside.removeClass("show");
	}

	onNavButtonClick(e) {
		ExtDebug.log(e);

		this.$navButtons.removeClass("active");
		$(e.target).addClass("active");

		// Hide the aside menu if it's visible (for mobile devices)
		this.hideAside();
	}

	/**
	 * Replaces the text content of an HTML element with random characters for a specified duration.
	 *
	 * @param {HTMLElement} element - The HTML element whose text content will be replaced.
	 * @param {string} characters - A string containing the characters to use for replacement.
	 * @param {number} duration - The duration (in milliseconds) for which the text will be replaced.
	 * @param {boolean} [sequential=false] - If true, replaces characters sequentially; otherwise, replaces all characters at once.
	 */
	static randomType(element, characters, duration, sequential = false) {
		// Store the original text of the element
		const originalText = element.innerText;

		// Convert the original text and characters string to arrays
		let textArray = originalText.split("");
		let charactersArray = characters.split("");

		// Get the start time
		let startTime = new Date().getTime();
		let interval;

		if (sequential) {
			let currentIndex = 0;
			let iterationCount = 0;

			// Set an interval to replace characters sequentially
			interval = setInterval(function () {
				iterationCount++;

				for (let i = 0; i < textArray.length; i++) {
					// Para los caracteres ya revelados, usamos el texto original
					if (i < currentIndex) {
						textArray[i] = originalText[i];
					}
					// Para los caracteres que faltan, usamos caracteres aleatorios
					else {
						textArray[i] =
							charactersArray[
							Math.floor(
								Math.random() * charactersArray.length
							)
							];
					}
				}

				// Update the element's text content
				element.innerText = textArray.join("");

				// Reveal the next character every 3 iterations
				if (iterationCount % 3 === 0) {
					currentIndex++;
				}

				if (currentIndex > textArray.length) {
					currentIndex = textArray.length;
				}

				// Clear the interval and restore the original text if the duration has elapsed
				if (new Date().getTime() - startTime >= duration) {
					clearInterval(interval);
					element.innerText = originalText;
				}
			}, 60);

			return;
		}

		// Set an interval to replace all characters at once
		interval = setInterval(function () {
			for (let i = 0; i < textArray.length; i++) {
				// Replace each character with a random character
				textArray[i] =
					charactersArray[
					Math.floor(Math.random() * charactersArray.length)
					];
			}
			// Update the element's text content
			element.innerText = textArray.join("");
			// Clear the interval and restore the original text if the duration has elapsed
			if (new Date().getTime() - startTime >= duration) {
				clearInterval(interval);
				element.innerText = originalText;
			}
		}, 0);
	}
}