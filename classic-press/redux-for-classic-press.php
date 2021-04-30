<?php

# php7.4 redux-for-classic-press.php ../build/index.html
# extracts the static css and js chunks and the inline js script from the Redux generated index.html file. 

/*
<link href="/sv-rr/static/css/main.d000d139.chunk.css" rel="stylesheet">
<script src="/sv-rr/static/js/2.6cf4c89b.chunk.js"></script>
<script src="/sv-rr/static/js/main.976ffde3.chunk.js"></script>
 */
    $url_prefix = '/sv-rr/static';
    $buffer = file_get_contents($argv[1]);
    preg_match_all("#<(link|script)\\s(href|src)=\"$url_prefix/((.+?)\\.chunk\\.(css|js))\"#", $buffer, $matches);
    print_r($matches[3]);
    preg_match_all("#<script>(.+?)</script>#", $buffer, $matches);
    echo 'inline >>>';
    print_r($matches[1][0]);
    echo "<<< inline\n";
?>
