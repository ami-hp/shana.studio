



/**
 * Loader
 * @param {String} status `start` , `stop`
 */
export function loading(status = "toggle") {

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
export function swal_err() {
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
export function lazy_load() {

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
export function lazyImage(selector){
    //var param = $(selector).data("lazy-param");
    $(selector).each(function () {
        if (this.complete) {
            let src = $(this).data("lazy-src");
            $(this).attr("src", src);
            $(this).removeAttr("data-lazy-src");
        }
    });
}

export function limitStyle(selector, limit, alertHeight = false, property = null, parent = null, getWidth = false) {
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


export function fixNumbers (str) {
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
export function getMaxHeight(selector, height = 0) {
    $(selector).css({"max-height": pageHeight - height + "px"});
}
export function cssMinHeight(selector, height = 0) {
    $(selector).css({"min-height": window.innerHeight - height + "px"});
}
export function cssMaxWidth(selector, width = 0) {
    $(selector).css({"max-width": window.innerWidth - width + "px"});
}
export function getMinWidth(selector, width = 0) {
    $(selector).css({"min-width": pageWidth - width + "px"});
}

export function addEvent(selector , eventName , callback){
    let elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
        el.addEventListener(eventName , callback)
    });
    return elements;
}
export function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(cls) > -1;
    // return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
