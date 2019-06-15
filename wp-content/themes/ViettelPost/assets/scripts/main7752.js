(function($) {
    // Main JS
    jQuery(document).ready(function($) {
        // ----------------
        // DEFINE FUNCTIONS
        // ----------------
        var viewportWidth = $(window).width();
        var viewportHeight = $(window).height();


        // When resize window browsers
        var resizeWindow = function (e) {
            //initSelect2();
        }


        // Orders Tracking Toggle
        var trackOrdersToggle = function () {
            var trackOrders = $('.trackorders__table');
            var trackOrder = trackOrders.children('tbody.order');
            var trackOrderInfo = trackOrder.children('.order__info');

            trackOrder.off('click').on('click', '.order__info', function(e) {
                e.preventDefault();

                if ( $(this).closest('tbody').is('.is-active') ) {
                    $(this).find('.order__action').html('Chi tiết').closest('tbody').removeClass('is-active');
                } else {
                    $(this).find('.order__action').html('Thu gọn').closest('tbody').addClass('is-active');
                }
            });

            trackOrder.each(function (i) {
                if ($(this).is(':first-of-type')) {
                    $(this).find('.order__info').trigger('click');
                }
            });
        }

        $('.section__tracking-forms').append('<span class="scrollto-next-section"></span>');
        $('.scrollto-next-section').on('click', function(e) {
            e.preventDefault();

            var scrollTop = $(this).closest('.fusion-fullwidth').next().offset().top - $('.fusion-header-wrapper').height();

            $('html, body').stop().animate({
                scrollTop: scrollTop
            }, 400);
        });


        // init select2
        var initSelect2 = function () {
            $('.js-select').select2();
        }


        // Estimate weight ranges
        var estimateWeightRanges = function () {
            var typingTimer;
            var typingInterval = 250;
            var $element = $('.js-order-weight');
            var weightRanges = $('.weight-ranges');

            $element.on('keyup', function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(_estimate.bind(null, $(this)), typingInterval);
            });

            $element.on('keydown', function () {
                clearTimeout(typingTimer);
            });

            function _estimate (input) {
                var val = input.val();
                if (val && !isNaN(val)) {
                    val = parseFloat(val);
                }

                var index;
                weightRanges.children('li').each(function (i) {
                    var weight = $(this).data('weight');

                    if (weight && !isNaN(weight)) {
                        weight = parseFloat(weight);
                    }

                    if (val && weight &&  val >= weight) {
                        index = i;
                    }
                });

                $('.orders-estimate__services').remove();
                weightRanges.children('li').removeClass('is-active');
                if (index >= 0) {
                    weightRanges.children('li').eq(index).addClass('is-active');
                }
            }

            weightRanges.on('click', 'li', function (e) {
                e.preventDefault();
                var orderWeight = $(this).data('order-weight');

                weightRanges.children('li').removeClass('is-active');
                $(this).addClass('is-active');
                $('.js-order-weight').attr('value', orderWeight);
                $('.orders-estimate__services').remove();
            });
        }


        // ----------------
        // RUN FUNCTIONS
        // ----------------
        trackOrdersToggle();
        estimateWeightRanges();
        $(window).on("resize", resizeWindow);

        // ----------------
        // Add more JS
        // ----------------
        // Remove empty p tags
        $('p:empty').remove();

        // External links
        $('a').filter(function () {
            return this.hostname && this.hostname !== location.hostname;
        }).attr('target', '_blank');

        // Custom heading in the content
        var heading = $('#main').find('h1, h2, h3, h4, h5, h6');
        heading.each(function () {
            var $this = $(this);
            var tag = $this.prop("tagName").toLowerCase();
            var $el_class = 'heading heading-' + tag;
            $this.addClass($el_class);

            if ($this.find('>span').length === 0) {
                $this.wrapInner('<span class="heading__inner"></span>');
            }
        });

        // Sidebar and Content
        var sidebar = $('#sidebar');
        var content = $('#content');
        if (sidebar.length > 0) {
            content.removeClass('full-width').css({'width': ''});
        }

        // Gravity Forms
        var gformWrapper = $('.gform_wrapper');
        if (gformWrapper.length > 0) {
            gformWrapper.find('.gform_button').addClass('button__orange');
            gformWrapper.find('input').addClass('input');

            if(gformWrapper.find('.ginput_container').find('input, textarea').val().trim() !== ''){
                gformWrapper.find('.ginput_container').find('input, textarea').closest('.gfield').addClass('input-focused');
            }

            gformWrapper.find('.ginput_container').find('input, textarea').on('focus change', function() {
                if (!($(this).closest('.gfield').hasClass('select') && $(this).val() === '')) {
                    $(this).closest('.gfield').addClass('input-focused');
                }
            }).on('blur change', function() {
                if ($(this).val().trim() === '') {
                    $(this).closest('.gfield').removeClass('input-focused');
                }
            }).on('change keypress', function() {
                $(this).closest('.invalid').removeClass('invalid');
            });

            var gform = gformWrapper.find('form');
            gform.on( 'submit', function() {
                setInterval(function() {
                    gform.find( 'input[type="email"], input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="month"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="week"], input[type="url"], input[type=radio]:checked, textarea, .et_pb_contact_select' ).each(function() {
                        if ($(this).is('.input_error, .LV_invalid_field')) {
                            $(this).closest('.gfield').addClass('gfield_error');
                        }
                        else {
                            $(this).closest('.gfield').removeClass('gfield_error');
                        }
                    });
                }, 50);
            });
        }

        // Testimonials Carousel
        $('.testimonial__carousel').slick();

        // init select2
        $('.js-select').select2();

        $('.js-select-global').on('change', function() {
            var provinceTo = $('.js-province-to');
            var nationalProvinceTo = $('.js-national-province-to');
            var districtTo = $('.js-district-to');
            var global = $(this).val();

            switch(global) {
                case '1':
                    provinceTo.closest('.field').removeClass('is-hidden');
                    nationalProvinceTo.closest('.field').addClass('is-hidden');
                    districtTo.closest('.field').removeClass('is-hidden');
                    break;

                default:
                    provinceTo.closest('.field').addClass('is-hidden');
                    nationalProvinceTo.closest('.field').removeClass('is-hidden');
                    districtTo.closest('.field').addClass('is-hidden');
            }
        });
        initializeGlobal('.js-select-global')
        function initializeGlobal(glabalClass){
            var provinceTo = $('.js-province-to');
            var nationalProvinceTo = $('.js-national-province-to');
            var districtTo = $('.js-district-to');
            var global = $(glabalClass).val();

            switch(global) {
                case '1':
                    provinceTo.closest('.field').removeClass('is-hidden');
                    nationalProvinceTo.closest('.field').addClass('is-hidden');
                    districtTo.closest('.field').removeClass('is-hidden');
                    break;

                default:
                    provinceTo.closest('.field').addClass('is-hidden');
                    nationalProvinceTo.closest('.field').removeClass('is-hidden');
                    districtTo.closest('.field').addClass('is-hidden');
            }
        }

        function parseComments(getContainerId){
            var container = document.getElementById(getContainerId);
            if(container){
                var nodes = container.childNodes;
                // console.log(nodes)
                for(var i=0;i<nodes.length;i++){
                    if(nodes[i].nodeType===8){
                        var virtualCont = document.createElement('DIV');
                        var getContent = nodes[i].textContent;
                        virtualCont.innerHTML = getContent;
                        container.removeChild(nodes[i]);
                        if(nodes[i]){
                            container.insertBefore(virtualCont.children[0],nodes[i]);
                        } else {
                            container.appendChild(virtualCont.children[0]);
                        }
                    }
                }
            }

        }

        $("#province_to").change(function () {
            if ($('#district').data('select2')) {
               $('#district').select2('destroy');
            }
            let selectedProvince = $(this).find('option:selected').val();
            parseComments("district");
            $("#district").find('option').each(function () {
                let provinceId = $(this).data('province');
                let comment = document.createComment($(this).get(0).outerHTML);
                if(provinceId != selectedProvince){
                    $(this).replaceWith(comment);
                }
            });
            $('#district').select2();
        });
        // initializeDistrict("#province_to");
        // function initializeDistrict(current) {
        //     var selectedProvince = $(current).find('option:selected').val();
        //     parseComments("district");
        //     $("#district").find('option').each(function () {
        //         var provinceId = $(this).data('province');
        //         var comment = document.createComment($(this).get(0).outerHTML);
        //         if(provinceId != selectedProvince){
        //             $(this).replaceWith(comment);
        //         }
        //     });
        // }
        // initializeDistrictFr('#province_from');
        // function initializeDistrictFr(current) {
        //     var selectedProvince = $(current).find('option:selected').val();
        //     parseComments("district_from");
        //     $("#district_from").find('option').each(function () {
        //         var provinceId = $(this).data('province');
        //         var comment = document.createComment($(this).get(0).outerHTML);
        //         if(provinceId != selectedProvince){
        //             $(this).replaceWith(comment);
        //         }
        //     });
        // }
        // $("#district").change(function () {
        //     var selectedDistrict = $(this).find('option:selected').val();
        //     $("#district_selected").val(selectedDistrict);
        // });
        // $("#district_from").change(function () {
        //     var selectedDistrict = $(this).find('option:selected').val();
        //     $("#districtf_selected").val(selectedDistrict);
        // });
        $("#asl-storelocator").find("#auto-complete-search").attr('placeholder', 'Nhập địa chỉ cần tìm');
        $("#asl-storelocator").find(".heading__inner").text(function(index,text){
            return text.replace('Use my location to find the closest Service Provider near me','Sử dụng vị trí của tôi để tìm bưu cục gần nhất');
        });

        $("#asl-storelocator").find("#asl-btn-geolocation").text(function(index,text){
            return text.replace('USE LOCATION','Sử dụng vị trí');
        });

        $("#asl-storelocator").find(".s-direction").text(function(index,text){
            return text.replace('Directions','Chỉ Đường');
        });
        $('#province_from').change(function () {
            if ($('#district_from').data('select2')) {
               $("#district_from").select2("destroy");
             }
            
            let selectedProvince = $(this).find('option:selected').val();
            parseComments("district_from");
            $("#district_from").find('option').each(function () {
                let provinceId = $(this).data('province');
                let comment = document.createComment($(this).get(0).outerHTML);

                if(provinceId != selectedProvince){
                    $(this).replaceWith(comment);
                }
            });
            $("#district_from").select2();
        });
        
        $('#province_from').select2({
            templateSelection: function (data) {
                if (data.id === '') { // adjust for custom placeholder values
                    return 'Chọn Tỉnh/TP';
                }

                return data.text;
            }
        });
        $('#province_to').select2({
            templateSelection: function (data) {
                if (data.id === '') { // adjust for custom placeholder values
                    return 'Chọn Tỉnh/TP';
                }

                return data.text;
            }
        });

        // $("#province_from").on("select2:close", function (e) {
        //     $(this).valid();
        // });
        $('.estimate_home').click(function (){
            var  result = true;
           var selectedProvince = $("#province_from").find('option:selected').val();
           if(selectedProvince == '' || selectedProvince == 'undefined' ){
               $('.province_from_check').addClass('province_from_check_error');
               $('.province_from_error').removeClass('error_hide');
               result = false;
           }
           else{
               $('.province_from_check').removeClass('province_from_check_error');
               $('.province_from_error').addClass('error_hide');
           }

            var selectedProvinceTo = $("#province_to").find('option:selected').val();
            if(selectedProvinceTo == '' || selectedProvinceTo == 'undefined' ){
                $('.province_to_check').addClass('province_from_check_error');
                $('.province_to_error').removeClass('error_hide');
                result = false;
            }
            else{
                $('.province_to_check').removeClass('province_from_check_error');
                $('.province_to_error').addClass('error_hide');

            }
            var weight = $('.order_weight_home').val();
            if(weight < 0 || weight == ''){
                $('.weight_check').addClass('province_from_check_error');
                $('.weight_error').removeClass('error_hide');
                result = false;
            }
            else{
                $('.weight_check').removeClass('province_from_check_error');
                $('.weight_error').addClass('error_hide');
            }
            return result;
        });
        $('.tracking_home').click(function (){
            var  result = true;
            var order = $('.tracking_home_check').val();
            order = $.trim(order);
            if(order == ''){
                $('.tracking_home_check').addClass('province_from_check_error');
                $('.tracking_home_error').removeClass('error_hide');
                result = false;
            }
            else{
                $('.tracking_home_check').removeClass('province_from_check_error');
                $('.tracking_home_error').addClass('error_hide');
            }
            return result;
        });

        $('#trackorders__form').submit(function () {
            let str = $('#orders').val().trim();
            if (str.length == 0) {
                return false;
            }
            if (str.split(',').length > 30) {
                alert('Số Bill không được vượt quá 30 !');
                return false;
            }
        })

        $("#orders").keyup(function (event) {
            if (event.keyCode == 13) {
                if ($('#btn_submit_tracking_order').length > 0) {
                    $("#btn_submit_tracking_order").trigger('click');
                    return false;
                }
                if ($('#btn_trackorders__form').length > 0) {
                    $("#btn_trackorders__form").trigger('click');
                    return false;
                }
            }
        });

    });
})(jQuery);