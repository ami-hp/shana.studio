let old_html, text = "";

let resultBox = document.querySelector('.search-result');

$('.search-input').on('input', delay(function() {

    if (text != this.value.trim()) {
        search(this.value.trim());
    }

    text = this.value.trim();

}, 500));

// Delay
function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, ms || 0);
    };
}

// Search
function search(text) {

    if (text.length < 2) {

        $(".search-result").html("");
        // console.log(resultBox);
        resultBox.style.display = "none";

    }
    else {
        resultBox.style.display = "flex";

        $.ajax({
            url: "/search",
            type: 'POST',
            data: { "text" : text },
            beforeSend: function (){
                $(".search-result").html("<div class='text-center my-3'><div class='spinner-border text-light'></div></div>");
            },
            success: function(response) {


                let html = "";
                let svgSearch = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11.7669" cy="11.7666" r="8.98856" stroke="var(--color-primary-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.4" d="M18.0186 18.4851L21.5426 22" stroke="var(--color-primary-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

                let results = JSON.parse(response);
                let obj;
                for (let i in results) {

                    let page = results[i]['results'];
                    if(page.length > 0){
                        // console.log(page);
                        for (let j = 0; j < page.length ;j++) {
                            obj = page[j];

                            html += `<a class="search-item" href='${obj.link}'>
                                     <div class='d-flex px-2 py-2 align-items-center'>
                                         <div>
                                            ${svgSearch}
                                         </div>
                                         <div class='pl-2'>
                                             <div class='title text-dark c:limitText-1'>${obj.title}</div>
                                             <div class='type  text-dark'>${obj.type}</div>
                                         </div>
                                     </div>
                                 </a>`;

                        }
                    }
                }



                // if (html != old_html) {
                //     old_html = html;
                $(".search-result").html(html);
                // }

                $(".spinner-border").parent().remove();

                if (html.trim().length == 0) {
                    html = "<div class='text-center text-var-primary-500 m-3 w3-animate-right'>Nothing Found</div>";
                    $(".search-result").html(html);
                }

            },
            error: function (response) {
                console.log(response.responseText);
            }
        });

    }

}

