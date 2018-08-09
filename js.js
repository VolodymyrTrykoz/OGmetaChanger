function shareOverrideOGMeta(overrideTitle, overrideDescription) {
    FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: {
                    'og:title': overrideTitle,
                    'og:description': overrideDescription,
                }
            })
        },
        function (response) {
            // Action after response
        });
}