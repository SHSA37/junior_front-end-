    window.onload = function() {
        if (document.cookie && postJsonLoad == true) {
            let strRezult;
            let loadFile = document.cookie;
            loadFile = loadFile.slice(5);
            let loadJson = JSON.parse(loadFile);
            for(let i=0;i<loadJson.length;i++){
                strRezult += String(''+loadJson[i]['name']); 
                let lengt = loadJson.length -1; if (i<lengt) strRezult += ',';
            }
            strRezult = strRezult.replace(/^undefined/, '');
            document.querySelector('#text-filter').innerHTML = strRezult;
        }
    };

    let postJsonLoad = true;
    document.querySelector('#btnfilter').addEventListener('click', function () {
        document.querySelector('#openfilter').classList.add("open");
        if( postJsonLoad == true ) {
            (async () => {
            const rawResponse = await fetch('https://studika.ru/api/areas', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ })
            });
            const obj = await rawResponse.json();
            let Rezult; 
            function printValues(obj) {
                for(let i=0;i<obj.length;i++) {
                    Rezult += String('<div class="block-sity_id" data-name="'+ obj[i]['name'] +'" data-id="'+ obj[i]['id'] +'" data-type="'+ obj[i]['type'] +'"><span class="block-sity_id-title">'+ obj[i]['name'] +'</span></div>');
                    if (obj[i]['cities']) for(let j=0;j<obj[i]['cities'].length;j++) {
                        Rezult += String('<div class="block-sity_id" data-name="'+ obj[i]['cities'][j]['name'] +'" data-id="'+ obj[i]['cities'][j]['id'] +'" data-type="'+ obj[i]['cities'][j]['type'] +'"><span class="block-sity_id-title">'+ obj[i]['cities'][j]['name'] +'</span><span class="block-sity_id-text">'+ obj[i]['name'] +'</span></div>');
                    }
                }
            };
            printValues(obj);
            Rezult = Rezult.replace(/^undefined/, '');
            document.getElementById("sity_list").innerHTML = Rezult;
            })();
        }
    });

    const targetNodeLoad = document.getElementById('sity_list');
    const configLoad = { childList: true };
    const callbackLoad = (mutationList, observerLoad) => { 
    let sityidLoad = document.querySelectorAll('.block-sity_id');
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            if (document.cookie && postJsonLoad == true) {
                let loadRezult,strRezult;
                let loadFile = document.cookie;
                loadFile = loadFile.slice(5);
                let loadJson = JSON.parse(loadFile);
                let checked = document.querySelectorAll('.block-sity_id');
                for(let i=0;i<loadJson.length;i++){
                    for (let s = 0; s < checked.length; s++) {
                        if (loadJson[i]['id'] == checked[s].dataset.id) 
                        checked[s].classList.add('checked');
                    }
                    loadRezult += String('<div class="city_select" data-name="'+ loadJson[i]['name'] +'" data-id="'+ loadJson[i]['id'] +'" data-type="'+ loadJson[i]['type'] +'">'+ loadJson[i]['name'] +'<img src="img/close_w.svg" class="close_w" loading="lazy" alt="close"></div>');
                }
                loadRezult = loadRezult.replace(/^undefined/, '');
                document.getElementById("sity_select").innerHTML = loadRezult;
                for(let i=0;i<loadJson.length;i++){
                    strRezult += String(''+loadJson[i]['name']); 
                    let lengt = loadJson.length -1; if (i<lengt) strRezult += ',';
                }
                strRezult = strRezult.replace(/^undefined/, '');
                document.querySelector('#text-filter').innerHTML = strRezult;
            }
            postJsonLoad = false;
        } 
    }};
    const observerLoad = new MutationObserver(callbackLoad);
    observerLoad.observe(targetNodeLoad, configLoad);

    document.addEventListener( 'click', (e) => {
        const withinBoundaries = e.composedPath().includes(document.querySelector('.top-left_wrapper-sity'));
        if ( ! withinBoundaries ) {
            document.querySelector('#openfilter').classList.remove("open");
        }
    });

    filter.oninput=function(){
        let filter = document.querySelector('#filter');
        let city = document.querySelectorAll('.block-sity_id-title');
        let block_сity = document.querySelectorAll('.block-sity_id');
        for(let i=0;i<city.length;i++){
            let oldstr = city[i].innerText;
            let startstr = oldstr.toLowerCase().search(RegExp(filter.value.toLowerCase()));
            let endstr = filter.value.toLowerCase().length;
            let minstr = oldstr.substr(startstr, endstr);
            let newstr = "<em>" + minstr + "</em>";
            let str = oldstr.replace(minstr, newstr);
        if(~city[i].innerText.toLowerCase().indexOf(filter.value.toLowerCase())) {
            block_сity[i].classList.remove('off'); 
            city[i].innerHTML = str;
            } else {
                block_сity[i].classList.add('off');
                oldstr.replace("<em>", ""); oldstr.replace("</em>", "");
                city[i].innerHTML = oldstr;
            }
    }}
    function clearOninput() { 
        let city = document.querySelectorAll('.block-sity_id-title');
        let block_сity = document.querySelectorAll('.block-sity_id');
        for(let i=0;i<city.length;i++){
            let oldstr = city[i].innerText;
            block_сity[i].classList.remove('off');
            oldstr.replace("<em>", ""); oldstr.replace("</em>", "");
            city[i].innerHTML = oldstr;
        }
    }
       
    const targetNode = document.getElementById('sity_list');
    const config = { childList: true };
    const callback = (mutationList, observer) => { 
    let sityidLoad = document.querySelectorAll('.block-sity_id');
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            for (let i = 0; i < sityidLoad.length; i++) {
                sityidLoad[i].addEventListener('click', (e) => {
                    if (sityidLoad[i].classList.contains('checked')) {
                        sityidLoad[i].classList.remove('checked');
                        document.querySelector('[data-id="'+ sityidLoad[i].dataset.id +'"]').remove();
                    } else {
                        sityidLoad[i].classList.add('checked');
                        document.getElementById("sity_select").innerHTML += String('<div class="city_select" data-name="'+ sityidLoad[i].dataset.name +'" data-id="'+ sityidLoad[i].dataset.id +'" data-type="'+ sityidLoad[i].dataset.type +'">'+ sityidLoad[i].dataset.name +'<img src="img/close_w.svg" class="close_w" loading="lazy" alt="close"></div>');
                    }
                });
            }
        } 
    }};
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    const targetNode2 = document.getElementById('sity_select');
    const config2 = { childList: true };
    const callback2 = (mutationList, observer2) => { 
    let sityidClose = document.querySelectorAll('.close_w');
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            for (let i = 0; i < sityidClose.length; i++) {
                sityidClose[i].addEventListener('click', (e) => {
                    let data_id = sityidClose[i].parentElement.dataset.id;
                    let data_selector = document.querySelector('.block-sity_id[data-id="'+data_id+'"]');
                    data_selector.classList.remove('checked');
                    sityidClose[i].parentElement.remove();
                });
            }
        } 
    }};
    const observer2 = new MutationObserver(callback2);
    observer2.observe(targetNode2, config2);
        
    document.querySelector('.block-sity_button').addEventListener('click', function () {
        let city = document.querySelectorAll('.city_select');
        let Rezult = '', SaveFile = ''; 
        if (city.length) {
            for(let i=0;i<city.length;i++){
                let innerstr = city[i].innerText;
                Rezult += String(''+innerstr); 
                let lengt = city.length -1; if (i<lengt) Rezult += ',';
            }
            document.querySelector('#text-filter').innerHTML = Rezult;
            document.querySelector('#openfilter').classList.remove("open");
            
            SaveFile += '['; for(let i=0;i<city.length;i++){
                SaveFile += String('{"name":"'+ city[i].dataset.name +'",'); 
                SaveFile += String('"id":"'+ city[i].dataset.id +'",'); 
                SaveFile += String('"type":"'+ city[i].dataset.type +'"}');
                let lengt = city.length -1; if (i<lengt) SaveFile += ',';
            } SaveFile += ']';
                document.cookie = String('user='+SaveFile);
                Upload(SaveFile);
        }
    });

    function Upload(SaveFile) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) { alert("Upload File"); }
        };
        xhttp.open("POST", "http://webservis.beget.tech/", true);
        xhttp.send(SaveFile);
    }

    document.querySelector('[href="#openModal"]').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        document.querySelector('#openModal').classList.add("open");
    });
    document.querySelector('[href="#close"]').addEventListener('click', function () {
        document.body.style.overflow = 'visible';
        document.querySelector('#openModal').classList.remove("open");
    });
    document.querySelector('[href="#openModalphone"]').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        document.querySelector('#openModal').classList.add("open");
    });
    document.querySelector('[href="#close"]').addEventListener('click', function () {
        document.body.style.overflow = 'visible';
        document.querySelector('#openModal').classList.remove("open");
    });

    let Settings = {
        navBarTravelling: false,
        navBarTravelDirection: "",
        navBarTravelDistance: 150
    };
    let BtnLeft = document.getElementById("menuBtnLeft");
    let BtnRight = document.getElementById("menuBtnRight");
    let menu_viewer = document.getElementById("menu_viewer");
    let menu_content = document.getElementById("menu_content");
    let scroll_position = 0;
    let ticking = false;
    menu_viewer.setAttribute("data-overflowing", determineOverflow(menu_content, menu_viewer));
    function doSomething(scroll_pos) {
    menu_viewer.setAttribute("data-overflowing", determineOverflow(menu_content, menu_viewer));
    }
    menu_viewer.addEventListener("scroll", function () {
    scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
        doSomething(scroll_position);
        ticking = false;
        });
    } ticking = true;
    });

    BtnLeft.addEventListener("click", function () {
        if (Settings.navBarTravelling === true) return;
        if (determineOverflow(menu_content, menu_viewer) === "left" || determineOverflow(menu_content, menu_viewer) === "both") {
            let availableScrollLeft = menu_viewer.scrollLeft;
            if (availableScrollLeft < Settings.navBarTravelDistance * 2) {
                menu_content.style.transform = "translateX(" + availableScrollLeft + "px)";
            } else {
                menu_content.style.transform = "translateX(" + Settings.navBarTravelDistance + "px)";
            }
            menu_content.classList.remove("no-transition");
            Settings.navBarTravelDirection = "left";
            Settings.navBarTravelling = true;
        }
        menu_viewer.setAttribute("data-overflowing", determineOverflow(menu_content, menu_viewer));
    });

    BtnRight.addEventListener("click", function () {
        if (Settings.navBarTravelling === true) return;
        if (determineOverflow(menu_content, menu_viewer) === "right" || determineOverflow(menu_content, menu_viewer) === "both") {
            let navBarRightEdge = menu_content.getBoundingClientRect().right;
            let navBarScrollerRightEdge = menu_viewer.getBoundingClientRect().right;
            let availableScrollRight = Math.floor( navBarRightEdge - navBarScrollerRightEdge );
            if (availableScrollRight < Settings.navBarTravelDistance * 2) {
                menu_content.style.transform = "translateX(-" + availableScrollRight + "px)";
            } else {
                menu_content.style.transform = "translateX(-" + Settings.navBarTravelDistance + "px)";
            }
            menu_content.classList.remove("no-transition");
            Settings.navBarTravelDirection = "right";
            Settings.navBarTravelling = true;
        }
        menu_viewer.setAttribute("data-overflowing", determineOverflow(menu_content, menu_viewer));
    });

    menu_content.addEventListener("transitionend", function () {
        let styleOfTransform = window.getComputedStyle(menu_content, null);
        let tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
        let amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
        menu_content.style.transform = "none";
        menu_content.classList.add("no-transition");
        if (Settings.navBarTravelDirection === "left") {
            menu_viewer.scrollLeft = menu_viewer.scrollLeft - amount;
        } else {
            menu_viewer.scrollLeft = menu_viewer.scrollLeft + amount;
        }
        Settings.navBarTravelling = false;
    },
    false
    );
    function determineOverflow(content, container) {
        let containerMetrics = container.getBoundingClientRect();
        let containerMetricsRight = Math.floor(containerMetrics.right);
        let containerMetricsLeft = Math.floor(containerMetrics.left);
        let contentMetrics = content.getBoundingClientRect();
        let contentMetricsRight = Math.floor(contentMetrics.right);
        let contentMetricsLeft = Math.floor(contentMetrics.left);
        if ( containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight ) {
            return "both";
        } else if (contentMetricsLeft < containerMetricsLeft) {
            return "left";
        } else if (contentMetricsRight > containerMetricsRight) {
            return "right";
        } else {
            return "none";
        }
    }