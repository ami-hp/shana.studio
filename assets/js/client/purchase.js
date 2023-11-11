import * as MyFunc from './functions';


const cart_price = $(".cart-result");
// const gift_wrapping_price = $('#gift_wrapping_price');
let clickState = false;

/**
 * Add To Cart
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
let add_cart = (id) => {
    $.ajax({
        url: "/cart/add",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
        },
        beforeSend: () => {
            MyFunc.loading('start')
        },
        success: () => {
            MyFunc.loading('stop')
            show_cart();
        },
        error: (err) => {
            MyFunc.loading('stop')
            swal({
                'text': 'خطایی رخ داده است',
                'title': false,
                'icon': 'error',
                button: false,
                timer: 2500,
            });
            console.log(err.responseText);
        }
    });
}

/**
 *
 * @param {Number} id `Product ID`
 */
let remove_cart = (id) => {

    $.ajax({
        url: "/cart/remove",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
        },
        beforeSend: (res) => {
            MyFunc.loading('start')
        },
        success: (res) => {
            MyFunc.loading('stop')
            show_cart();
        },
        error: (err) => {
            MyFunc.loading('stop')
            swal({
                'text': 'خطایی رخ داده است',
                'title': false,
                'icon': 'error',
                button: false,
                timer: 2500,
            });
            console.log(err.responseText);
        }
    });
}

/**
 *
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
let delete_cart = (id) => {

    $.ajax({
        url: "/cart/delete",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
        },
        beforeSend: (res) => {
            MyFunc.loading('start')
        },
        success: function (response) {
            MyFunc.loading('stop')
            show_cart();
        },
        error: (err) => {
            MyFunc.loading('stop')
            swal({
                'text': 'خطایی رخ داده است',
                'title': false,
                'icon': 'error',
                button: false,
                timer: 2500,
            });
            console.log(err.responseText);
        }
    });
}

/**
 *
 * @param UnAvailable
 * @param clickState
 */
let unavailableAction = (UnAvailable, clickState = false) => {
    if (UnAvailable.length) {
        $('.cart-content .alert:first').css('display', 'block');

        if (clickState) {
            let cart_element;
            UnAvailable.forEach(element => {
                $.ajax({
                    url: "/cart/delete",
                    type: "POST",
                    dataType: "json",
                    data: {
                        'id': element[0],
                    },
                    beforeSend: function (response) {

                    },
                    success: function (response) {
                        cart_element = $(`.cart-item[data-id="${element[0]}"]`);
                        cart_element.find('svg').remove();
                        cart_element.find('.cart-item-price').html(``);
                        cart_element.find('.cart-item-count').html(``);
                    },
                    error: (err) => {
                        console.log(err.responseText);
                    }
                });
            });
        }
    }
}

let submit_after_show_cart = (UnAvailable) => {
    if(UnAvailable.length){

        swal({
            text: "در مقادیر سبد شما تغییری حاصل شده است. لطفا بازبینی نمایید.",
            'title': false,
            'icon': 'warning',
            button: false,
            timer: 2500,
        });
        $("#steps-buy").modal('hide');
        return;
    }

    if (!order.name || !order.phone || !order.email || !order.code_meli || !order.address || !order.date || !order.time) {
        MyFunc.swal_err();
        return;
    }


        $("input[name=date]").val(order.date);

        if ($("input[name=cart_factor]").is(':checked')) {
            $("input[name=factor]").val(true);
        }
        else {
            $("input[name=factor]").val(false);
        }

        // if ($("input[name=cart_gift_wrapping]").is(':checked')) {
        //     $("input[name=gift_wrapping]").val(true);
        // } else {
        //     $("input[name=gift_wrapping]").val(false);
        // }

        swal({
            icon: 'info',
            title: 'لطفا شکیبا باشید',
            text: 'در حال انتقال به درگاه ...',
            button: false,
            timer: 3000
        })
            .then((value) => {
                $(".order-form").submit();
            });

}

/**
 * List Cart
 */
let show_cart = (submit = false) => {

    let price, total_count, alert_html , UnAvailable , html, filter;
    $.ajax({
        url: "/cart",
        type: "POST",
        dataType: "JSON",
        success: function (response) {

            price = 0;
            total_count = 0;
            alert_html = "";
            UnAvailable = [];
            html = "";
            filter = false;

            if (response.cart.length) {

                let myCart = response.cart
                    .filter((element) => {
                        if(element.exist != true){
                            UnAvailable.push([element.id]);
                            filter = true;
                            return false;
                        }
                        else{
                            return true;
                        }
                    })
                if(filter){
                    alert_html += "<li>موجودی ";
                    alert_html += "برخی از محصولات سبد خرید شما";
                    alert_html += " به پایان رسیده است</li>";
                }

                html += `<div class='alert alert-warning mx-auto mt-2 small' style='display:none; width:95%;'><ul class='text-right p-0 m-0'></ul></div>`;
                // -----------------------------------------------------
                //Basket Items Start
                /**
                 * foreach Sample Start
                 */
                myCart.forEach(object => {
                    price = price + (object.price * object.count);
                    total_count = total_count + object.count;

                    html += `<div class='row m-0 mt-3 mx-auto py-2 position-relative cart-item' data-id='${object.id}'>`;

                    html += `<div class='col-3 align-self-center p-0 pr-2'>`;
                    // Image Start
                    html += `<img src='${object.image}' class='w-100 rounded' alt='${object.image}'>`;
                    // Image ENd
                    html += `</div>`;


                    html += `<div class='col-7 p-0 pr-2'>`;

                    // Title
                    if (object.color) {
                        html += `<div class='limitText-1'>${object.name} | ${object.color} | ${object.warranty}</div>`;
                    } else {
                        html += `<div class='limitText-1'>${object.name}</div>`;
                    }
                    // Title End


                    // Price Start
                    let price2 = parseInt(object.price);
                    html += `<div class="cart-item-price">`
                    html += `<span>قیمت </span>`;
                    html += `<span class='text-success'>${price2.toLocaleString('en')}</span>`;
                    html += `<span class='small'> تومان</span>`;
                    html += `</div>`;
                    // Price END

                    html += `</div>`;

                    html += `<div class='col-2 justify-content-center p-0 cart-item-count'>`;

                    // Plus
                    if (object.count >= object.storage) {
                        html += `<svg class='pointer' style='opacity:0.6' width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.5' cy='11.5' r='11.5' transform='rotate(-180 11.5 11.5)' fill='#0066cc'/><path fill-rule='evenodd' clip-rule='evenodd' d='M11.5002 5.96289C11.9539 5.96289 12.3217 6.34428 12.3217 6.81474V11.074H16.4288C16.8825 11.074 17.2502 11.4554 17.2502 11.9259C17.2502 12.3963 16.8825 12.7777 16.4288 12.7777H12.3217V17.037C12.3217 17.5074 11.9539 17.8888 11.5002 17.8888C11.0466 17.8888 10.6788 17.5074 10.6788 17.037V12.7777H6.57167C6.11801 12.7777 5.75024 12.3963 5.75024 11.9259C5.75024 11.4554 6.11801 11.074 6.57167 11.074H10.6788V6.81474C10.6788 6.34428 11.0466 5.96289 11.5002 5.96289Z' fill='white'/></svg>`;
                    } else {
                        html += `<svg class='pointer cart-plus' data-id='${object.id}' width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.5' cy='11.5' r='11.5' transform='rotate(-180 11.5 11.5)' fill='#0066cc'/><path fill-rule='evenodd' clip-rule='evenodd' d='M11.5002 5.96289C11.9539 5.96289 12.3217 6.34428 12.3217 6.81474V11.074H16.4288C16.8825 11.074 17.2502 11.4554 17.2502 11.9259C17.2502 12.3963 16.8825 12.7777 16.4288 12.7777H12.3217V17.037C12.3217 17.5074 11.9539 17.8888 11.5002 17.8888C11.0466 17.8888 10.6788 17.5074 10.6788 17.037V12.7777H6.57167C6.11801 12.7777 5.75024 12.3963 5.75024 11.9259C5.75024 11.4554 6.11801 11.074 6.57167 11.074H10.6788V6.81474C10.6788 6.34428 11.0466 5.96289 11.5002 5.96289Z' fill='white'/></svg>`;
                    }


                    // Count
                    html += `<div class='text-var-primary-500 py-2 cart-count text-center'>${object.count}</div>`;

                    // Minus
                    if (object.count == 1) {
                        html += `<svg class='pointer' style='opacity:0.6' width='24' height='23' viewBox='0 0 24 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.574' cy='11.5' r='11.5' transform='rotate(-180 11.574 11.5)' fill='#0066cc'/><rect x='5.82397' y='11.0742' width='11.5' height='1.7037' rx='0.851852' fill='white'/></svg>`;
                        // html += `<img src='/images/icon/minus-r.svg' style='opacity:0.6'>`;
                    } else {
                        html += `<svg class='pointer cart-minus' data-id='${object.id}' width='24' height='23' viewBox='0 0 24 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.574' cy='11.5' r='11.5' transform='rotate(-180 11.574 11.5)' fill='#0066cc'/><rect x='5.82397' y='11.0742' width='11.5' height='1.7037' rx='0.851852' fill='white'/></svg>`;
                        // html += `<img src='/images/icon/minus-r.svg' class='cart-minus' data-id='${object.id}'>`;
                    }


                    if (object.storage < object.count) {

                        UnAvailable.push([object.id]);

                        $("#cart-dropdown-btn").data('alert', 'true');

                        alert_html += "<li>موجودی ";

                        if (object.color) {
                            alert_html += "<span class='font-black'>" + object.name + " | " + object.color + " | " + object.warranty + "</span>";
                        } else {
                            alert_html += "<span class='font-black'>" + object.name + "</span>";
                        }

                        alert_html += " به پایان رسیده است</li>";
                    }

                    if (object.tag != 0) {

                        UnAvailable.push([object.id]);

                        $("#cart-dropdown-btn").data('alert', 'true');

                        alert_html += `<li>`;
                        alert_html += `موجودی `;

                        if (object.color) {
                            alert_html += `<span class='font-black'>${object.name} | ${object.color} | ${object.warranty}</span>`;
                        } else {
                            alert_html += `<span class='font-black'>${object.name}</span>`;
                        }

                        alert_html += " به پایان رسیده است";
                        alert_html += `</li>`;
                    }

                    html += `</div>`;
                    // Delete
                    html += `<svg class='pointer cart-delete' data-id='${object.id}' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='4' fill='#0066cc' fill-opacity='0.72'/><path opacity='0.4' d='M18.3694 9.90705C18.3694 9.96371 17.9253 15.581 17.6716 17.9451C17.5127 19.3959 16.5775 20.2759 15.1746 20.3009C14.0966 20.325 13.0414 20.3333 12.0032 20.3333C10.901 20.3333 9.82309 20.325 8.77678 20.3009C7.42088 20.2684 6.4848 19.3709 6.33406 17.9451C6.07309 15.5727 5.63706 9.96371 5.62895 9.90705C5.62085 9.73622 5.67596 9.57373 5.78781 9.44206C5.89803 9.3204 6.05688 9.24707 6.22383 9.24707H17.7826C17.9488 9.24707 18.0995 9.3204 18.2186 9.44206C18.3297 9.57373 18.3856 9.73622 18.3694 9.90705Z' fill='white'/><path d='M19.5 6.98055C19.5 6.63807 19.2301 6.36974 18.9059 6.36974H16.4762C15.9818 6.36974 15.5522 6.01809 15.442 5.52227L15.3059 4.91479C15.1154 4.18065 14.4581 3.6665 13.7206 3.6665H10.2802C9.53458 3.6665 8.88378 4.18065 8.68603 4.95479L8.55879 5.52311C8.44775 6.01809 8.01821 6.36974 7.52464 6.36974H5.09488C4.76988 6.36974 4.5 6.63807 4.5 6.98055V7.29721C4.5 7.63136 4.76988 7.90802 5.09488 7.90802H18.9059C19.2301 7.90802 19.5 7.63136 19.5 7.29721V6.98055Z' fill='white'/></svg>`;

                    html += "</div>";
                });
                /**
                 * foreach Sample end
                 */
                $('.cart-content').html(html);
                $(".cart-box .alert:first ul").html(alert_html);

                    //Basket Items End


                    //Gift Wrapping Start
                let gift_wrapping = parseInt(response.gift_wrapping);
                // if (gift_wrapping_price) {
                //     gift_wrapping_price.html(gift_wrapping.toLocaleString('en'));
                //     gift_wrapping_price.val(gift_wrapping);
                // }
                //Gift Wrapping END

                cart_price.text(price.toLocaleString("en")).data('price', price);

                $("#cart-dropdown-btn").data('param', UnAvailable);
                unavailableAction(UnAvailable, clickState)
                $("#purchase_confirm_box").show();
            }
            else {

                html = "<h6 class='mt-5 text-center'>سبد خرید شما خالی میباشد</h6>";

                $(".cart-content").html(html);
                $("#purchase_confirm_box").hide();

            }

            if (total_count > 0) {
                $('.cart-total-count')
                    .css('display', 'flex')
                    .text(total_count);
            }
            else {
                $('.cart-total-count').css('display', 'none');
            }

// Cart Actions

            $('.cart-plus').on('click', function () {// Cart Plus


                let id = $(this).data('id');
                if (id) {
                    add_cart(id);
                } else {
                    console.error('ID is Null')
                }

            })
            $('.cart-minus').on('click', function () {// Cart Minus

                let id = $(this).data('id');
                // var type = $(this).data('type');
                if (id)
                    remove_cart(id);
                else
                    console.error('ID is Null')

            })
            $('.cart-delete').on("click", function () {// Cart Delete

                swal({
                    text: "آیا از حذف این آیتم اطمینان دارید؟",
                    title: " ",
                    icon: "warning",
                    // buttons: true,
                    buttons: ["خیر", "بله"],
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {

                            let id = $(this).data('id');
                            if (id)
                                delete_cart(id)
                            else
                                console.error('ID is Null')
                        }
                    });
            })
            $('.gift-wrapping').on("click", function () { // Gift Wrapping
                let a;
                let b;
                let price;
                if ($(this).is(':checked')) {
                    a = cart_price.data('price');
                    b = parseInt($(this).val());
                    price = a + b;
                    cart_price.text(price.toLocaleString("en")).data('price', price);
                } else {
                    a = cart_price.data('price');
                    b = parseInt($(this).val());
                    price = a - b;
                    cart_price.text(price.toLocaleString("en")).data('price', price);
                }
            });


            if(submit == true){
                submit_after_show_cart(UnAvailable);
            }

        },
        error: (error) => {
            console.log(error.responseText);
        }
    });


}


// Show Cart Box
$("#cart-dropdown-btn").click(function () {

    let UnAvailable = $(this).data('param');

    clickState = true;

    unavailableAction(UnAvailable, clickState)

});


// Hide Cart Box
// $("#cart-back").click(function () {
//     $(this).css('display', 'none');
//     $("#cart-dropdown > .dropdown-menu").css('display', 'none');
// });

show_cart();

const selected_span = document.getElementById('selected_data');
const cart_btn_section = $("#cart-btn-section");
const cw_data = $("#cw_data");
let get_tag_html = (tag) => {
    let a = null;
    let print = null;
    let phone = "";
    switch (tag) {
        case '1':
            a = `تماس بگیرید`;
            break;

        case '2':
            a = `سفارشی`;
            break;

        case '3':
            a = `توقف تولید`;
            break;

        case '4':
            a = `موجود نیست`;
            break;

        case '5':
            a = `به زودی`;
            break;
    }
    if(a)
        print = `<a href='tel:${phone}' class='text-danger'>${a}</a>`;
    return print;
}
let get_price_html = (price, prev = null) => {

    price = parseInt(price);


    html = `<div class="col-12 col-md-5 text-center addBasketBox f12-mxmd f14-mxlg f16 pointer" style="min-width: 200px" id="add-cart-btn">
<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20.3 20.3"> <g> <path fill="#22c04f" d="M7.4,8.7L7.4,8.7l-0.1,0C6.9,8.7,6.6,9,6.6,9.4c0,0.4,0.3,0.7,0.7,0.7h0l0.1,0c0.4,0,0.6-0.4,0.6-0.7 C8.1,9,7.8,8.7,7.4,8.7z"/> <path fill="#22c04f" d="M13,8.7L13,8.7l-0.1,0c-0.4,0-0.6,0.4-0.6,0.7c0,0.4,0.3,0.7,0.7,0.7h0l0.1,0c0.4,0,0.6-0.4,0.6-0.7 C13.8,9,13.4,8.7,13,8.7z"/> <path fill="#22c04f" d="M19.6,14.2l-0.8-6.1c-0.5-2.3-2-3.6-3.7-3.6H15c-0.3-2.5-2.3-4.4-4.9-4.4c-1.3,0-2.6,0.5-3.5,1.4 c-0.8,0.8-1.3,1.8-1.4,3h0C3.5,4.5,2,5.8,1.5,8.1L0.8,14c-0.6,4.3,1.4,6.2,5.3,6.2h8.1C17.9,20.2,20.1,18,19.6,14.2z M7.7,2.6 c0.7-0.6,1.5-1,2.5-1c1.7,0,3.2,1.3,3.4,2.9H6.7C6.8,3.8,7.2,3.1,7.7,2.6z M14.2,18.7H6.1c-3.1,0-4.4-1.2-3.9-4.5L3,8.3 C3.3,6.8,4.2,6,5.2,6h9.9c1,0,1.9,0.8,2.3,2.4l0.7,5.8C18.6,17.2,17.1,18.7,14.2,18.7z"/> </g> </svg>
<span class="mr-2">افزودن به سبد خرید</span>
</div>`;

    html += '<div class="col-12 col-md-6 d-flex flex-column align-items-end" id="cw_input" >';
    //off price start
    //html += '<div class=""><del>820,000</del> <span class="badge badge-danger">%15</span></div>';
    if (prev) {
        prev = parseInt(prev);
        html += "<small>";
        html += "<del>" + prev.toLocaleString("en") + " تومان</del>";
        html += "</small>";
    } else {
        html += "<del></del>";
    }
    //off price end
    html += '<div>';
    //main price start
    html += '<span class="h5 bold mt-1">' + price.toLocaleString("en") + '<span class="light h6">تومان</span></span>';
    //main price end
    html += '</div>';

    html += '</div>';


    return html;
}
let html, warranties, colorSelect;
let selectWar = (type, colorSelect, selected = null) => {
    $('.color-img').removeClass('active');
    $('.color-name').html(colorSelect.data('name'));
    colorSelect.addClass('active');
    [html, warranties] = ["", colorSelect.data('param')]

    if (warranties) {
        warranties.forEach((warranty, index) => {
            if (type === "1") {
                if (warranty.id == selected.id) {
                    html += "<div class='warranty active' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                }
                else {
                    html += "<div class='warranty' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                }
            }
            else if (type === "2") {
                if (index == 0) {
                    html += "<div class='warranty active' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                }
                else {
                    html += "<div class='warranty' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                }
            }
        });

        $(".warranties").html(html);

        html = "";

        // if (selected.storage == 0) {
        //     html = get_tag_html('4');
        // } else {
        if (type === "2")
            selected = $('.warranty:first').data('param');

        if (selected.tag == "") {
            html = get_tag_html("4");
        } else {
            if (selected.tag == 0) {
                html = get_price_html(selected.price, selected.prev_price);
            } else {
                html = get_tag_html(selected.tag);
            }
        }

        // }

        cw_data.data('id', selected.id);
        cart_btn_section.html(html);
    }

}

if (selected_span != null && selected_span.innerText.trim() === "is") {

    let selected = selected_span.getAttribute('data-params');
    selected = JSON.parse(selected);

    colorSelect = $(`.color-img[data-id='${selected.color}']`);


    selectWar('1', colorSelect, selected);
}


// Select Color
$(document)
    .on("click", '.color-img', function () {
        colorSelect = $(this);
        selectWar('2', colorSelect);
    })
    .on('click', '.warranty', function () {
        // Select Warranty
        let html, data = $(this).data('param');
        $('.warranty').removeClass('active');
        $(this).addClass('active');

        // if (data.storage == 0) {
        //     html = get_tag_html('4');
        // } else {
        if (data.tag == 0) {
            html = get_price_html(data.price, data.prev_price);
        } else {
            html = get_tag_html(data.tag);
        }
        // }

        $("#cw_data").data('id', data.id);
        cart_btn_section.html(html);
    })
    .on('click', '#add-cart-btn', function () {

        $.ajax({
            url: "/cart/add",
            type: "POST",
            dataType: "json",
            data: {
                'id': $("#cw_data").data('id'),
            },
            beforeSend: () => {
                MyFunc.loading('start')
            },
            success: (data) => {
                MyFunc.loading('stop')

                if(data.storage == true){
                    show_cart();
                    swal({
                        'text': 'با موفقیت به سبد خرید اضافه شد',
                        'title': '',
                        'icon': 'success',
                        button: false,
                        timer: 2500,
                    });
                }
                else if(data.storage == "storage"){
                    swal({
                        'text': 'موجودی این محصول به اتمام رسیده است',
                        'title': '',
                        'icon': 'warning',
                        button: false,
                        timer: 2500,
                    });
                }
                else if(data.storage == "storage_plus"){
                    swal({
                        'text': 'تعداد محصول خواسته شده موجود نمی باشد',
                        'title': '',
                        'icon': 'warning',
                        button: false,
                        timer: 2500,
                    });
                }
            },
            error: (err) => {
                MyFunc.loading('stop')
                swal({
                    'text': 'خطایی رخ داده است',
                    'title': false,
                    'icon': 'error',
                    button: false,
                    timer: 2500,
                });
                console.log(err.responseText)
            }
        })

    });



/*======PURCHASE==========*/

let order = {};

// Data Picker
$("#datepicker").persianDatepicker({
    startDate: "today",
    endDate: "1500/01/01",
    formatDate: "ND DD NM YYYY",
    // cellWidth: 36,
    // cellHeight: 30,
    // fontSize: 16,
});

//Address
$(".open-address-modal").click(function () {
    $("#address-modal").modal('show');
});

// Steps Buy
$(".cart-confirm-btn").click(function () {
    $("#steps-buy").modal({ show: true, backdrop: "static" });
});

$(".go-to-step-2").click(function () {
    let name = $('#steps-buy input[name ="name"]').val().trim();
    let phone = $('#steps-buy input[name ="phone"]').val().trim();
    let email = $('#steps-buy input[name ="email"]').val().trim();
    let code_meli = $('#steps-buy input[name ="code_meli"]').val().trim();

    if (name != "" && phone != "" && email != "" && code_meli != "") {
        order.name = name;
        order.phone = phone;
        order.email = email;
        order.code_meli = code_meli;

        $(".step-1").css('display', 'none');
        $(".step-2").css('display', 'block');

    } else {
        MyFunc.swal_err();
    }
});

$(".go-to-step-3").click(function () {
    var address = $('input[name=address]:checked').val();

    if (address != null) {
        order.address = address;

        $(".step-2").css('display', 'none');
        $(".step-3").css('display', 'block');
    } else {
        MyFunc.swal_err();
    }
});

$(".go-to-step-4").click(function () {
    let date = $("#datepicker").data('jdate');
    let time = $('input[name=time]:checked').val();

    if (date != null) {
        order.date = date;
        order.time = time;

        $(".step-3").css('display', 'none');
        $(".step-4").css('display', 'block');
    }
    else {
        MyFunc.swal_err();
    }

});


$(".back-to-step-1").click(function () {
    $(".step-1").css('display', 'block');
    $(".step-2").css('display', 'none');
});

$(".back-to-step-2").click(function () {
    $(".step-2").css('display', 'block');
    $(".step-3").css('display', 'none');
});

$(".back-to-step-3").click(function () {
    $(".step-3").css('display', 'block');
    $(".step-4").css('display', 'none');
});




$("input[name=rules]").change(function () {
    if ($(this).is(':checked')) {
        $('.confirm').attr('disabled', false);
    }
    else {
        $('.confirm').attr('disabled', true);
    }
});

$(".confirm").click(function () {
    //ajax takhfif
    show_cart(true)
});



const disc_btn = $(`.discount-content #discount_confirm_btn`);
const disc_input = $(`.discount-content #discount_input`);
const disc_response = $(`.discount-content #discount_response`);
const disc_input_hide = $(`.discount-content #discount_input_hidden`);

let disc_result = (content , content_hidden = '') => {
    disc_response.html(content)
    disc_input_hide.val(content_hidden)
}

disc_btn.on('click' , function (e) {

    let content , content_hidden;
    let btn = $(this);
    let url = btn.data('action');


    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: {
            'code' : disc_input.val(),
            'total_price' : cart_price.data('price'),
        },
        beforeSend: () => {
            let spinner = `<span class="text-warning"><div class="spinner-border ml-1" role="status"></div>در حال بارگذاری...</span>`;
            disc_response.html(spinner)
        },
        success: (response) => {

            console.log(response);

            /**
             * Code Does'nt Exist
             */
            if(! response.code){
                content = `<span class="text-danger">کد وارد شده موجود نیست.</span>`;
                return disc_result(content);
            }


            /**
             * Basket is Lower than Limit
             */
            if(response.min === 'expired'){
                content = `<span class="text-danger">مبلغ نهایی از محدوده خرید پایین تر است</span>`;
                return disc_result(content);
            }

            /**
             * Basket is Higher than Limit
             */
            if(response.max === 'expired'){
                content = `<span class="text-danger">مبلغ نهایی از محدوده خرید بالاتر است</span>`;
                return disc_result(content);
            }

            /**
             * The Count of Code is 0
             */
            if(response.extant === 'expired'){
                content = `<span class="text-danger">کد وارد شده به اتمام رسیده است.</span>`;
                return disc_result(content);
            }

            /**
             * The Code's Usage Time's Passed
             */
            if(response.expire === 'expired'){
                content = `<span class="text-danger">کد وارد شده منقضی شده است.</span>`;
                return disc_result(content);
            }

            // All Good
            content = `<span class="text-success">کد وارد شده معتبر است و اعمال خواهد شد.</span>`;
            content_hidden = response.code;

            return disc_result(content , content_hidden);
        },
        error: (err) => {

            swal({
                'text': 'خطایی رخ داده است',
                'title': false,
                'icon': 'error',
                button: false,
                timer: 2500,
            })
            console.log(err.responseText)
            return disc_result("");
        }
    })
})
