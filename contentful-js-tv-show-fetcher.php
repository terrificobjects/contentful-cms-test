<?php
/**
 * Plugin Name: Contentful JS API TV Show Fetcher
 * Description: Fetch and display TV show data from Contentful using the JS Delivery API.
 * Version: 1.0.0
 * Author: Nick L.
 */

class Contentful_JS_API_TV_Show_Fetcher {
    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        //add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets']);
        add_action('admin_menu', [$this, 'admin_menu']);
        add_action('wp_ajax_update_contentful_settings', [$this, 'update_contentful_settings']);
        add_shortcode('contentful_series_title', [$this, 'series_title_shortcode']);
		add_shortcode('contentful_series_page_title', [$this, 'series_title_page_shortcode']);
        add_shortcode('contentful_series_year', [$this, 'series_year_shortcode']);
		add_shortcode('contentful_series_director', [$this, 'series_director_shortcode']);
        add_shortcode('contentful_series_description', [$this, 'series_description_shortcode']);
        add_shortcode('contentful_series_poster', [$this, 'series_poster_shortcode']);
		add_shortcode('contentful_series_clearlogo', [$this, 'series_clearlogo_shortcode']);
		add_shortcode('contentful_series_air_date', [$this, 'series_air_date_shortcode']);
		add_shortcode('contentful_series_language', [$this, 'series_language_shortcode']);
		add_shortcode('contentful_series_actors', [$this, 'series_actors_shortcode']);
    }

    public function enqueue_scripts() {
        wp_enqueue_script('contentful-js', 'https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js', [], null, true);
        wp_enqueue_script('contentful-custom-js', plugin_dir_url(__FILE__) . 'contentful-custom.js', ['contentful-js'], null, true);
        wp_localize_script('contentful-custom-js', 'contentfulSettings', [
            'space_id' => get_option('contentful_space_id'),
            'access_token' => get_option('contentful_access_token')
        ]);
    }    

    public function enqueue_block_editor_assets() {
        wp_enqueue_script(
            'contentful-gutenberg-block',
            plugin_dir_url(__FILE__) . 'contentful-gutenberg-block.js',
            ['wp-blocks', 'wp-element', 'wp-editor'],
            true
        );
    }

    public function admin_menu() {
        add_menu_page('Contentful Settings', 'Contentful Settings', 'manage_options', 'contentful_settings', [$this, 'admin_page']);
    }

    public function admin_page() {
        $space_id_placeholder = get_option('contentful_space_id') ?: 'Enter Space ID';
        $access_token_placeholder = get_option('contentful_access_token') ?: 'Enter Access Token';
        ?>
        <div class="wrap">
            <h1>Contentful API Connection Settings</h1>
            <form id="contentful-settings-form">
                <label for="space_id">Space ID:</label>
                <input type="text" id="space_id" name="space_id" placeholder="<?php echo esc_attr($space_id_placeholder); ?>" style="color: lightgray;">
                <br>
                <label for="access_token">Access Token:</label>
                <input type="text" id="access_token" name="access_token" placeholder="<?php echo esc_attr($access_token_placeholder); ?>" style="color: lightgray;">
                <br>
                <input type="submit" value="Save">
            </form>
            <script>
                jQuery(document).ready(function($) {
                    $('#contentful-settings-form').submit(function(e) {
                        e.preventDefault();
                        $.post(ajaxurl, {
                            action: 'update_contentful_settings',
                            space_id: $('#space_id').val(),
                            access_token: $('#access_token').val()
                        }, function(response) {
                            alert('Settings saved');
                        });
                    });
                });
            </script>
        </div>
        <?php
    }    

    public function update_contentful_settings() {
        update_option('contentful_space_id', sanitize_text_field($_POST['space_id']));
        update_option('contentful_access_token', sanitize_text_field($_POST['access_token']));
        wp_die();
    }

    public function series_title_shortcode() {
        return '<span id="contentful-series-title"></span>';
    }
	
	public function series_title_page_shortcode() {
        return '<span id="contentful-series-page-title"></span>';
    }

    public function series_year_shortcode() {
        return '<span id="contentful-series-year"></span>';
    }
	
	public function series_director_shortcode() {
        return '<span id="contentful-series-director"></span>';
    }

    public function series_description_shortcode() {
        return '<span id="contentful-series-description"></span>';
    }

    public function series_poster_shortcode() {
        return '<img id="contentful-series-poster" />';
    }
	
	public function series_clearlogo_shortcode() {
        return '<img style="height:100px;" id="contentful-series-clearlogo" />';
    }
	
	public function series_language_shortcode() {
        return '<span id="contentful-series-language"></span>';
    }
	
	public function series_air_date_shortcode() {
        return '<span id="contentful-series-air-date"></span>';
    }
	
	public function series_actors_shortcode() {
        return '<span id="contentful-series-actors"></span>';
    }
}

new Contentful_JS_API_TV_Show_Fetcher();