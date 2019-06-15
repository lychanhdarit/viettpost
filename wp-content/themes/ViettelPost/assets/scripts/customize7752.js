jQuery(function () {
    console.log(jQuery('#btn_submit_tracking_order'));
    jQuery('#btn_submit_tracking_order').click(function () {
	if(0){
         grecaptcha.execute('6LeblqEUAAAAACSKHHgl8kQoUEmxf7U6hJBaSkqm', {action: 'contact'}).then(function (token) {
             console.log('click');
             var idOrders = document.getElementById('orders').value;
             var tokenOrders = document.getElementById('_wpnonce').value;
             console.log(idOrders);
             idOrders = idOrders.replace(/\s/g, '');
             tokenOrders = tokenOrders.replace(/\s/g, '');
             window.location.href = '../tra-cuu-don-hang?orders='+idOrders+'&access_token='+tokenOrders + '&token=' + token;
        //
         });
         return false;

        } else {
	var idOrders = document.getElementById('orders').value.trim();
        if (idOrders) {
            idOrders = idOrders.replace(/\s/g, '');
            window.location.href = 'https://old.viettelpost.com.vn/Tracking?KEY=' + idOrders;
        } else {
            alert('Vui lòng nhập mã phiếu gửi');
            return false;
        }
	}
    });
});
