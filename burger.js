class Fullburger {
    constructor(t, e) {
        var i, o, l, a;
        let s = {
            marker: this.marker,
            dropdown: {
                click: this.click,
                hover: this.hover
            },
            fixed: {
                defaultValue: this.defaultValue,
                scrolling: this.scrolling
            },
            breakpoint: 768,
            offsetSize: {
                maxHeight: "100vh",
                maxWidth: "100vw"
            },
            whichSide: {
                top: !0,
                bottom: this.bottom,
                left: this.left,
                right: this.right
            },
            position: {
                top: !0,
                bottom: this.bottom,
                left: this.left,
                right: this.right
            },
            speed: 900,
            overlay: !1
        };
        this.options = Object.assign(s, e), this.header = document.querySelector(t), this.headerContainer = this.header.querySelector(".fullburger-container"), this.logo = document.querySelector(".fullburger-logo"), this.nav = (i = this.header) == null ? void 0 : i.querySelector(".fullburger-nav"), this.navList = (o = this.nav) == null ? void 0 : o.querySelector(".fullburger-list"), this.navItems = (l = this.nav) == null ? void 0 : l.querySelectorAll(".fullburger-item"), this.navSubItems = (a = this.navList) == null ? void 0 : a.querySelectorAll(".fullburger-sub-item"), this.burger = document.querySelector(".fullburger-button"), this.mediaQuery = window.matchMedia(`(min-width: ${this.options.breakpoint}px)`), this.elemsClassNameActive = {
            nav: "fullburger-nav_open",
            burger: "fullburger-button_active"
        }, document.body.style.setProperty("--burger-speed", `${this.options.speed}ms`), this.documentEventKey = this.documentEventKey.bind(this), this.handleMediaChange = this.handleMediaChange.bind(this), this.mediaQuery.addEventListener("change", this.handleMediaChange), this.headerClick = this.headerHandle.bind(this), this.header.addEventListener("click", this.headerClick), this.burgerHandle(), this.logoHandle(), (window.matchMedia("(pointer:coarse)").matches || this.options.dropdown.click && !this.options.dropdown.hover) && (this.drop = this.dropdownHandle.bind(this), this.navList.addEventListener("click", this.drop)), window.matchMedia("(pointer: fine) and (hover: hover)").matches && this.options.dropdown.hover && (this.dropdowns = this.navList.querySelectorAll(".dropdown"), this.dropdowns.forEach((r) => {
            r.classList.add("dropdown-hover");
        })), this.setWhichSide(!0), this.getFixed(), this.initMedia();
    }
    disableScroll() {
        const t = document == null ? void 0 : document.querySelectorAll("[data-fixed-block]"), e = window.scrollY, s = `${window.innerWidth - document.body.offsetWidth}px`;
        document.documentElement.style.scrollBehavior = "auto", t.forEach((i) => {
            i.style.paddingRight = s;
        }), document.body.style.paddingRight = s, document.body.classList.add("dis-scroll"), document.body.dataset.position = e, document.querySelector(".fullburger").style.top = `${e}px`, document.body.style.top = `-${e}px`;
    }
    enableScroll() {
        const t = document == null ? void 0 : document.querySelectorAll("[data-fixed-block]"), e = parseInt(document.body.dataset.position, 10);
        t.forEach((s) => {
            s.style.paddingRight = "0";
        }), document.body.style.paddingRight = "0px", document.body.style.top = "", document.querySelector(".fullburger").style.top = 0, document.body.classList.remove("dis-scroll"), window.scroll({
            top: e,
            left: 0
        }), document.body.removeAttribute("data-position"), getComputedStyle(document.documentElement).scrollBehavior == "smooth" && (document.documentElement.style.scrollBehavior = "smooth");
    }
    calcBurgerSize(t) {
        const e = this.burger.querySelectorAll("span");
        e[0].style.transform = t ? `translateY(${this.burger.offsetHeight / 2 - e[0].offsetHeight / 2}px) rotate(45deg)` : "translateY(0) rotate(0)", e[2].style.transform = t ? `translateY(${this.burger.offsetHeight / -2 - e[2].offsetHeight / -2}px) rotate(-45deg)` : "translateY(0) rotate(0)";
    }
    navToggle(t) {
        var e, s, i, o;
        this.calcBurgerSize(t), this.header.classList.toggle("fullburger_active", t), (e = this.burger) == null || e.classList.toggle(this.elemsClassNameActive.burger, t), (s = this.nav) == null || s.classList.toggle(this.elemsClassNameActive.nav, t), (i = this.burger) == null || i.setAttribute("aria-expanded", t.toString()), (o = this.burger) == null || o.setAttribute("aria-label", t ? "Close menu" : "Open menu");
    }
    navShow() {
        this.navToggle(!0), this.disableScroll(), document.body.addEventListener("keydown", this.documentEventKey), this.setWhichSide(!1), this.setPosition();
    }
    navHide() {
        this.navToggle(!1), this.enableScroll(), document.body.removeEventListener("keydown", this.documentEventKey), this.setWhichSide(!0), this.setPosition();
    }
    getOffsetSize(t) {
        if (t) {
            this.nav.style.setProperty("--max-height", this.options.offsetSize.maxHeight), this.nav.style.setProperty("--max-width", this.options.offsetSize.maxWidth);
            return;
        }
    }
    setWhichSide(t) {
        const { top: e, bottom: s, right: i, left: o } = this.options.whichSide;
        e && this.nav.style.setProperty("inset", ` ${t ? "-100%" : 0} 0 ${t ? "100%" : 0} 0`), s && this.nav.style.setProperty("inset", ` ${t ? "100%" : 0} 0 ${t ? "-100%" : 0} 0`), o && this.nav.style.setProperty("inset", `0 ${t ? "100%" : 0} 0 ${t ? "-100%" : 0}`), i && this.nav.style.setProperty("inset", `0 ${t ? "-100%" : 0} 0 ${t ? "100%" : 0}`);
    }
    setPosition() {
        const { top: t, bottom: e, right: s, left: i } = this.options.position;
        t && this.nav.style.setProperty("bottom", "auto"), e && this.nav.style.setProperty("top", "auto"), i && this.nav.style.setProperty("right", "auto"), s && this.nav.style.setProperty("left", "auto");
    }
    getFixed() {
        const { scrolling: t, defaultValue: e } = this.options.fixed;
        e && this.enableFixed(), t && (window.scrollY > t ? this.enableFixed() : this.disableFixed(), window.onscroll = () => window.scrollY > t ? this.enableFixed() : this.disableFixed());
    }
    enableFixed() {
        this.header.classList.add("fullburger_fixed"), this.header.setAttribute("data-fixed-block", ""), document.body.style.paddingTop = this.header.offsetHeight + "px";
    }
    disableFixed() {
        this.header.style.setProperty("padding-right", "0"), this.header.classList.remove("fullburger_fixed"), this.header.removeAttribute("data-fixed-block"), document.body.style.paddingTop = "";
    }
    mobileVersion() {
        this.getOffsetSize(!0), this.getOverlay(!0), this.setPosition(), this.header.classList.remove("fullburger_desktop"), this.burger.classList.add("fullburger-button_show"), this.nav.classList.remove("fullburger-nav_desktop"), this.burger.classList.contains(this.elemsClassNameActive.burger) && this.nav.classList.contains(this.elemsClassNameActive.nav) && this.disableScroll(), this.nav.style.paddingTop = this.nav.closest(".fullburger").offsetHeight + "px", this.nav.setAttribute("data-fixed-block", "");
    }
    desktopVersion() {
        this.header.classList.add("fullburger_desktop"), this.nav.classList.add("fullburger-nav_desktop"), this.burger.classList.remove("fullburger-button_show"), this.nav.style.paddingTop = "", this.enableScroll(), this.getOffsetSize(!1), this.getOverlay(!1);
    }
    initMedia() {
        this.mediaQuery.matches ? this.desktopVersion() : this.mobileVersion();
    }
    handleMediaChange(t) {
        t.matches ? this.desktopVersion() : this.mobileVersion();
    }
    documentEventKey(t) {
        t.key === "Escape" && this.navHide();
    }
    getOverlay(t) {
        var s, i, o, l;
        if (!this.options.overlay)
            return;
        const e = document.createElement("div");
        e.classList.add("fullburger-overlay"), this.headerContainer = (s = this.header) == null ? void 0 : s.querySelector(".fullburger-container"), !t && ((o = (i = this.header) == null ? void 0 : i.querySelector(".fullburger-overlay")) == null || o.remove()), t && ((l = this.headerContainer) == null || l.append(e));
    }
    dropdownHandle(t) {
        if (!t.target.closest(".dropdown-button"))
            return;
        const e = t.target.closest(".dropdown").querySelector(".dropdown-list");
        s(e), t.target.closest(".dropdown").classList.toggle("dropdown-active"), t.target.classList.toggle("dropdown-button-active"), e.classList.toggle("dropdown-list-active");
        function s(o = null) {
            const l = [];
            if (o) {
                let r = o.parentNode;
                for (; r && !r.classList.contains("fullburger-list");)
                    r.nodeName === "UL" && l.push(r), r = r.parentNode;
            }
            document.querySelectorAll(".fullburger-list ul").forEach((r) => {
                if (r != o && !l.includes(r)) {
                    r.classList.remove("dropdown-list-active");
                    const n = r.parentNode.querySelector(".dropdown-button");
                    n && !r.classList.contains("dropdown-list-active") && (n.classList.remove("dropdown-button-active"), r.parentNode.classList.remove("dropdown-active"));
                }
            });
        }
        const i = (o) => {
            o.target.closest(".fullburger-list") || (s(), document.removeEventListener("click", i));
        };
        document.addEventListener("click", i);
    }
    // controlDropdownHaveArrowKey(event) {
    //     const buttonIndex = Array.from(this.navSubItems).indexOf(event.target);
    //     const offset = event.code === 'ArrowUp' ? -1 : event.code === 'ArrowDown' ? 1 : 0;
    //     const nextIndex = (buttonIndex + offset + this.navSubItems.length) % this.navSubItems.length;
    //     this.navSubItems[nextIndex].focus();
    // }
    burgerHandle() {
        this.burger.addEventListener("click", () => {
            this.burger.classList.contains(this.elemsClassNameActive.burger) && this.nav.classList.contains(this.elemsClassNameActive.nav) ? this.navHide() : this.navShow();
        });
    }
    logoHandle() {
        this.logo.addEventListener("click", () => this.navHide());
    }
    headerHandle(t) {
        const e = t.target.closest(".fullburger-item");
        if (t.target.closest(".fullburger-link")) {
            this.options.marker && (this.navItems.forEach((l) => l.classList.remove("fullburger-item_active")), e.classList.add("fullburger-item_active"));
            const i = document.querySelectorAll(".dropdown-list");
            this.navList.querySelectorAll(".dropdown-button").forEach((l) => l.classList.remove("dropdown-button-active")), i.forEach((l) => l.classList.remove("dropdown-list-active")), this.navHide();
        }
        t.target.closest(".fullburger-overlay") && this.navHide();
    }
}
