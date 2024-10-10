class Portfolio {
	constructor() {
		this.__init();
		this.__initUI();
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
		return $('a', $('li', $('nav')));
	}

	__init() {
		ExtDebug.initTrace(this, this.__init);
	}

	__initUI() {
		ExtDebug.initTrace(this, this.__initUI);

		this.__initEvents();
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

	showAside() {
		this.$aside.addClass("show");
	}

	hideAside() {
		this.$aside.removeClass("show");
	}

	onNavButtonClick(e) {
		ExtDebug.log(e);

		this.$navButtons.removeClass('active');
		$(e.target).addClass('active');
	}
}

// function showAside() {
//   const aside = document.querySelector('aside');
//   aside.classList.add('show');
// }

// const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
// hamburgerBtn.addEventListener('click', showAside);
