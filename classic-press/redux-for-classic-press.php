<?php
/*
 * Plugin Name: Redux Adapter for Classic Commerce
 */

# extracts the static css and js chunks and the inline js script from the Redux generated index.html file and enqueue them. 

/*
<link href="/sv-rr/static/css/main.d000d139.chunk.css" rel="stylesheet">
<script src="/sv-rr/static/js/2.6cf4c89b.chunk.js"></script>
<script src="/sv-rr/static/js/main.976ffde3.chunk.js"></script>
 */
    $base_dir = '/var/www/html-cp/sv-rr/';
    $url_prefix = '/sv-rr/static';
    $redux_prefix = 'redux';

    $buffer = file_get_contents($base_dir . 'index.html');
    $handle = NULL;
    add_action('wp_enqueue_scripts', function() use ($buffer, &$handle) {
        if (preg_match_all("#<(link|script)\\s(href|src)=\"$url_prefix(/(.+?)\\.chunk\\.(css|js))\"#", $buffer, $matches)) {
            error_log('files = ' . print_r($matches[3], TRUE));
            $seqno = 0;
            foreach ($matches[3] as $file) {
                error_log('file = ' . $file);
                $seqno = $seqno + 1;
                $redux_handle = $redux_prefix + $seqno;
                if (substr_compare($file, '.css', -4, 4) === 0) {
                    error_log( "$file enqueued" );
                    wp_enqueue_style($redux_handle, $file, [], FALSE);
                } else if (substr_compare($file, '.js', -3, 3) === 0) {
                    error_log( "$file enqueued" );
                    wp_enqueue_script($redux_handle, $file, [], FALSE, TRUE);
                    if ($handle === NULL) {
                        $handle = $redux_handle;
                    }
                }
            }
            preg_match_all("#<script>(.+?)</script>#", $buffer, $matches);
            error_log('inline >>>' . $matches[1][0] . '<<< inline');
            wp_add_inline_script($handle, $matches[1][0], 'before');
        }
    });
?>
