$(document).ready(function(){
    window.fbAsyncInit = function() {
        FB.init({
            appId            : '2160146270936955',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
        });
        FB.AppEvents.logPageView();
    };
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    let day;
    let month;
    $('button').on('click', submitAndShare);
    function submitAndShare() {
        let rate = $('input').val();
        let title = `User Petro thinks that ${day}  of  ${month} rate will be ${rate}`;
        console.log(title);
        let description = 'Отакої, а як думаєш ти?';
        shareOverrideOGMeta(window.location.href, title, description);
        return false;
    }
    function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage) {
        FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object: {
                        'og:url': overrideLink,
                        'og:title': overrideTitle,
                        'og:description': overrideDescription,
                        'og:image': overrideImage
                    }
                })
            },
            function (response) {
                // Action after response
        });
    }
    function runCalendar() {
        let cal = $('#calendar').calendario( {
                onDayClick : function( $el, $contentEl, dateProperties ) {
                    showPopUp();
                    for( var key in dateProperties ) {
                        console.log( key + ' = ' + dateProperties[ key ] );
                        day = dateProperties.day;
                        month = dateProperties.monthname
                    }
                },
                caldata : codropsEvents
            } ),
            $month = $( '#custom-month' ).html( cal.getMonthName() ),
            $year = $( '#custom-year' ).html( cal.getYear() );

        $( '#custom-next' ).on( 'click', function() {
            cal.gotoNextMonth( updateMonthYear );
        } );
        $( '#custom-prev' ).on( 'click', function() {
            cal.gotoPreviousMonth( updateMonthYear );
        } );
        $( '#custom-current' ).on( 'click', function() {
            cal.gotoNow( updateMonthYear );
        } );

        function updateMonthYear() {
            $month.html( cal.getMonthName() );
            $year.html( cal.getYear() );
        }
    }

    runCalendar();

    function showPopUp(){
        $('.popUp').removeClass('invisible').addClass('visible');
        $('.close, button').on('click', ()=>{
            $('.popUp').removeClass('visible').addClass('invisible');
        })
    }

});