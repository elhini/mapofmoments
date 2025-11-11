import posthog from 'posthog-js';

export const Counters = () => {
    if (process.env.NODE_ENV !== 'production') return;

    const metricaHtml = `
        <script type="text/javascript">
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104839442', 'ym');

            ym(104839442, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/104839442" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    `;

    posthog.init('phc_ouqVn1MuqRwPrSqesntEteA0BcxRcxflNtkbUVUt5pN', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-05-24',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    });
    console.log('posthog initialized');

    return <div id="counters" dangerouslySetInnerHTML={{ __html: metricaHtml }} />;
};
