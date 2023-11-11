/**
 * Loader
 * @param {String} status `start` , `stop`
 */
function loading(status = "toggle") {

    if (status === "start") $(".loader").css('display', 'flex')
    else if (status === "stop") $(".loader").css('display', 'none')
    else if (status === "toggle") $(".loader").fadeToggle()
}

/**
 *
 * @param {*} selector
 * @param {*} limit
 * @param {*} alertHeight
 * @param {*} property
 * @param {*} parent
 * @param {*} getWidth
 */
function limitHeight(selector, limit, alertHeight = false, property = null, parent = null, getWidth = false) {
    let parentVal;
    if (getWidth === true) {
        parentVal = $(window).width();
    }
    if (parent == null) {
        parentVal = $(window).height();
    } else {
        parentVal = $(parent).height();
    }
    if (property == null) {
        property = "height";
    }
    if (alertHeight === true) {
        // alert(parentVal + ' - ' + limit + ' = ' + (parentVal - limit + "px"));
    }

    return $(selector).css(property, parentVal - limit + "px");
}

/**
 * Sweet Alert Error
 */
function swal_err() {
    swal({
        icon: 'error',
        title: 'خطا',
        text: 'لطفا همه اطلاعات را وارد نمایید',
        button: false,
        timer: 3000
    });
}

/**
 *
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
function add_cart(id, type) {

    $.ajax({
        url: "/cart/add",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
            'type': type,
        },
        success: function () {
            show_cart();
        }
    });
}

/**
 *
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
function remove_cart(id, type) {

    $.ajax({
        url: "/cart/remove",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
            'type': type,
        },
        success: function () {
            show_cart();
        }
    });
}

/**
 *
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
function delete_cart(id, type) {

    $.ajax({
        url: "/cart/delete",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
            'type': type,
        },
        success: function (response) {
            show_cart();
        }
    });
}

/**
 * Copy to Clipboard
 */
function clipboard() {

    $("#copy-link").click(function () {
        var copyText = document.getElementById("clipboard-input");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        $("#copy-link span").text('کپی شد');

        setTimeout(function () {
            $("#copy-link span").text('کپی کردن');
        }, 3000);
    });

}

// Lazy Load Images using Intersection Observer
function lazy_load() {

    let observer = new IntersectionObserver(onIntersect);

    document.querySelectorAll("[data-lazy]").forEach((img) => {
        observer.observe(img);
    });

    function onIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.target.getAttribute("data-processed") || !entry.isIntersecting)
                return true;
            entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
            entry.target.setAttribute("data-processed", true);
        });
    }

}
function lazyImage(selector){
    //var param = $(selector).data("lazy-param");
    $(selector).each(function () {
        if (this.complete) {
            let src = $(this).data("lazy-src");
            $(this).attr("src", src);
            $(this).removeAttr("data-lazy-src");
        }
    });
}

function limitStyle(selector, limit, alertHeight = false, property = null, parent = null, getWidth = false) {
    let parentVal;
    if (getWidth === true) {
        parentVal = $(window).width();
    }
    if (parent == null) {
        parentVal = $(window).height();
    } else {
        parentVal = $(parent).height();
    }
    if (property == null) {
        property = "height";
    }
    if (alertHeight === true) {
        alert(parentVal + ' - ' + limit + ' = ' + (parentVal - limit + "px"));
    }

    return $(selector).css(property, parentVal - limit + "px");
}


function fixNumbers (str) {
    var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    if(typeof str === 'string')
    {
        for(var i=0; i < 10; i++)
        {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
}
function getMaxHeight(selector, height = 0) {
    $(selector).css({"max-height": pageHeight - height + "px"});
}
function cssMinHeight(selector, height = 0) {
    $(selector).css({"min-height": window.innerHeight - height + "px"});
}
function cssMaxWidth(selector, width = 0) {
    $(selector).css({"max-width": window.innerWidth - width + "px"});
}
function getMinWidth(selector, width = 0) {
    $(selector).css({"min-width": pageWidth - width + "px"});
}

function addEvent(selector , eventName , callback){
    let elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
        el.addEventListener(eventName , callback)
    });
    return elements;
}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(cls) > -1;
    // return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}



$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    }
});



lazy_load();
lazyImage("img[data-lazy-src]");//for swiper



//? === Come and Go Start === //
let containsAll = (query , className) => {
    query.forEach((el) => {
        if (el.classList.contains(className)) {
            return true;
        }
    });
    return null;
}

let deactivate = (baits = null , effect = null ,parent = null) => {

    if(! baits){
        baits = document.querySelectorAll(`[data-bait]`);
        //! Close All
    }
    if(parent){
        parent = document.querySelectorAll(`[data-parent='${parent}']`);
        //! Close for Parents
    }


    baits.forEach((el) => {
        if(hasClass(el , "activated")){

            let filter = el.className.split(" ").filter((css) => {
                return css.match(/(^|\s)activated\S+/g);
            });

            el.classList.remove(...filter);
        }
    });

}

let baits = (attr , parent = null) => {
    if(parent){
        return document.querySelectorAll(`[data-bait='${attr}'][data-parent='${parent}']`);
    }
    return document.querySelectorAll(`[data-bait='${attr}']`);
}

addEvent('[data-kill]' , 'click' , function () {

    let attr = this.dataset.kill.split(',');

    attr.forEach((kill) => {
        deactivate(baits(kill.trim()));
    });

});

addEvent('[data-hunt]' , 'click' , function () {

    let hunt     = this.dataset.hunt.trim().split(',') ?? [];
    let parent   = this.dataset.parent ?? null;
    let gun      = this.dataset.gun.trim().split(',') ?? [];
    let bait_div;

    hunt.forEach((val , i) => {
        bait_div = baits(val , parent);
        //! Close All Activated
        if(! containsAll(bait_div , "activated-" + gun[i].trim())){
            let actives = document.querySelectorAll("[class*='activated']");
            deactivate(actives);
        }
    })

    hunt.forEach((val , i) => {
        bait_div = baits(val , parent);

        //? Open The Selected Bait
        bait_div.forEach((el) => {
            el.classList.toggle("activated-" + gun[i].trim());
        });

    });

});

addEvent(`[data-kill] [data-merci]` , 'click' , function (e) {
    //! Stop
    e.stopPropagation();
});

//? === Come and Go End === //


//? === Menu Collapse === //
let coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {

    coll[i].addEventListener("click", function() {

        let listItemAttr = "data-collapse";
        let listBoxAttr = "data-accordion";
        let li = this.closest(`[${listItemAttr}]`);
        let ul = this.closest(`[${listBoxAttr}]`);
        let content = li.nextElementSibling;
        let box;

        ul.querySelectorAll('.active').forEach((unOrder)=>{

            if(unOrder === li) return;

            unOrder.classList.remove('active');

            box = unOrder.nextElementSibling;

            if (box.style.height) box.style.height = null;

        });

        if(content.hasAttribute(listBoxAttr)){
            if (content.style.height) {
                content.style.height = null;
                li.classList.remove("active");
            }
            else {
                // content.style.height = content.scrollHeight + "px";
                content.style.height = "max-content";
                li.classList.add("active");
            }
        }

    });

}




// ? livewire events
window.addEventListener('swal-subscribe' , () => {

    Swal.fire({
        icon: "success",
        title: ' ',
        text: 'Email\'s Been Sent Successfully',
        backdrop: true,
        // showClass: {
        //     popup: 'swal2-noanimation',
        //     backdrop: 'swal2-noanimation'
        // },

        // hideClass: {
        //     popup: '',
        //     backdrop: ''
        // },
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })

});


document.querySelectorAll('.swiper-container.notToBe').forEach((swiper) => {

    swiper.style.cssText = "position: unset!important;visibility: visible;opacity: 1;";

});



let showSearch = () => {
    $("header").animate({'opacity':0} ,  'fast', function () {
        $(".search-shadow").addClass('visible z-on2');
        $(".search-box").animate({ 'top': 0 , 'opacity' : 1},  400, function () {
            $(".search-box input").val('');
            $(".search-input").focus();
        });
    });
}
let removeActive = (selector = document) => {
    $(selector).find("[class*='activated']:not('.no')").removeClass(function (index, css) {
        return (css.match(/(^|\s)activated\S+/g) || []).join(' ');
    });
}
let hideSearch = () => {
    $(".search-shadow").removeClass('visible z-on2');
    $(".search-result").html('');

    $(".search-box").animate({ 'top': '-100%' , 'opacity' : 0},  400, function(){
        $("header").animate({'opacity':1},  'fast');
    })
}

// Show Search
$(document).on('click' , "#search-btn", function() {
    showSearch()
    removeActive();
});

// Hide Search
$(document).on('click' , "#close-search-box , .search-shadow", function() {
    hideSearch()
})
