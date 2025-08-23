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
		return $('.hero-card');
	}

	get $heroCard() {
		return $('.hero-card');
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
		gsap.to(this.$heroCard, { delay: 0.3, duration: 1, y: 0, opacity: 1, ease: "back.out(1.7)" });

		// Randomize the text content of the title element
		this.__randomizeTitleText();
	}

	__randomizeTitleText() {
		// Randomize the text content of the title element, sequentially, for 2000 milliseconds
		Portfolio.randomType(this.$title[0], "10", 4000, true);
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
															Math.floor(Math.random() * charactersArray.length)
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

// function showAside() {
//   const aside = document.querySelector('aside');
//   aside.classList.add('show');
// }

// const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
// hamburgerBtn.addEventListener('click', showAside);
