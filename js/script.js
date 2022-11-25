    document.querySelectorAll('a[href^="#"').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = 48;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries. forEach((entry) => {
            if (entry.isIntersecting) {
                document. querySelectorAll('.nav-menu__link').forEach((link) => {
                    link. classList.toggle('active',
                    link. getAttribute('href').replace('#', '') === entry.target.id
                    );
                });
            }
        });
    },{ threshold: 0.6, });
    document. querySelectorAll('.scroling').forEach(
    (section) => observer.observe(section),
    );

    const tabs = document.querySelector('.tabs');
    const tabsBtn = document.querySelectorAll('.row-tab__li');
    const tabsContent = document.querySelectorAll('.row-tab-content__li');

    if (tabs) {
        tabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('row-tab__li')) {
            const tabsPath = e.target.dataset.tabsPath;
            tabsBtn.forEach(el => {el.classList.remove('active')});
            document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('active');
            tabsHandler(tabsPath);
        }
        });
    }

    const tabsHandler = (path) => {
        tabsContent.forEach(el => {el.classList.remove('active')});
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('active');
    };

    const selectSingle = document.querySelector('.select');
    const selectSingle_title = selectSingle.querySelector('.select__title');
    const selectSingle_labels = selectSingle.querySelectorAll('.select__label');

    selectSingle_title.addEventListener('click', () => {
        if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');
        } else {
            selectSingle.setAttribute('data-state', 'active');
        }
    });

    for (let i = 0; i < selectSingle_labels.length; i++) {
        selectSingle_labels[i].addEventListener('click', (evt) => {
            selectSingle_title.value = evt.target.textContent;
            selectSingle.setAttribute('data-state', '');
        });
    }

    document.addEventListener( 'click', (e) => {
        const withinBoundaries = e.composedPath().includes(selectSingle);
        if ( ! withinBoundaries ) {
            selectSingle.setAttribute('data-state', '');
        }
    })

    let acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    document.querySelector('[href="#openModal"]').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        document.querySelector('#openModal').classList.add("open");
    });
    document.querySelector('[href="#close"]').addEventListener('click', function () {
        document.body.style.overflow = 'visible';
        document.querySelector('#openModal').classList.remove("open");
    });