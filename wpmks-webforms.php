<?php
/*
Plugin Name: Webforms Plugin By Makesbirdge
Plugin URI: http://makesbridge.com/
Description: Easy drag and drop to build any kind of form.The official Makesbridge drag and drop form builder plugin.
Version: 1.0
Author: Makesbridge Dev Team
Author URI: http://makesbridge.com/
License: GPLv2 or later
*/

/*
* require all variables and common functions
*
*
*/
require('inc/config.php');
$plugin_url = plugin_dir_url( __FILE__ );
$siteUrl = get_site_url()."/wp-admin/admin-ajax.php";

/*
* Use the add_menu_page function
* add_menu_page( $page_title, $menu_title , $capability,$menu-slug,$function)
*
*/
function wpmks_webforms_menu(){
			add_menu_page(
					'Official Makesbridge Webforms Plugin',
					'MKS Webforms',
					'manage_options',
					'wpmks-webforms',
					'wpmks_webforms_options_page',
					plugin_dir_url( __FILE__ ) . 'img/logo.png'
				);
}
function wpmks_webforms_options_page(){
	if(!current_user_can('manage_options')){
		wp_die('You do not have sufficient permission to access this page.');
	}
	// Global Variables
	global $plugin_url; // available on options-page-wrapper
	global $options;
	global $display_json;
	global $isUser_registered;
	global $baseUrl;
	global $wpmks_webforms_userinfo;
	global $siteUrl;
  global $hidden_field_logout;
	global $contentUrl;
	global $bms_user_token;
	global $prodUrl;
	if(isset($_POST['wpmks_webform_submitted'])){
		$hidden_field = esc_html($_POST['wpmks_webform_submitted']);
    $hidden_field_logout = esc_html($_POST['wpmks_webform_logout']);
		if($hidden_field == 'Y' && isset($_POST['wpmks_webform_username']) && isset($_POST['wpmks_webform_password'])){
			$wpmks_webform_username = sanitize_user($_POST['wpmks_webform_username']);
			$wpmks_webform_password = $_POST['wpmks_webform_password'];
			$wpmks_webforms_userinfo = wpmks_webforms_get_userinfo($wpmks_webform_username,$wpmks_webform_password);
			if(!empty($wpmks_webforms_userinfo->{'bmsToken'})){
				$options['wpmks_webform_username'] = $wpmks_webform_username;
				$options['wpmks_webform_password'] = $wpmks_webform_password;
				$options['wpmks_webform_basicfields'] = $wpmks_webforms_getBasicFields;
				$options['wpmks_webform_mergetags'] = $wpmks_webforms_getMergeTags;
				update_option('wpmks_webforms_userinfo',$options);
        $hidden_field_logout = 'Y';
			}else{
				delete_option('wpmks_webforms_userinfo');
				$isUser_registered = false;
			}
		}
	}
	$options = get_option('wpmks_webforms_userinfo');
	if($options != ''){
			$wpmks_webform_username = $options['wpmks_webform_username'];
			$wpmks_webform_password = $options['wpmks_webform_password'];
			$wpmks_webforms_userinfo = wpmks_webforms_get_userinfo($wpmks_webform_username,$wpmks_webform_password);
			$bms_user_token = $wpmks_webforms_userinfo->{'bmsToken'};
			if(isset($bms_user_token)){
				$isUser_registered = true;
			}
	}else{
		delete_option('wpmks_webforms_userinfo');
		session_unset();
	 	$isUser_registered = false;
	}

	require('inc/options-page-wrapper.php');
}
/*=========Create New User=========*/
function wpmks_webforms_post_newuser($fields_list){
	global $baseUrl;
	global $contentUrl;
	global $prodUrl;
	$json_login_url =$prodUrl.'/trial';
	//url-ify the data for the POST
	foreach($fields_list as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
			rtrim($fields_string,'&');
	$response = wp_remote_post( $json_login_url, array(
		'method' => 'POST',
		'timeout' => 45,
		'redirection' => 5,
		'httpversion' => '1.0',
		'blocking' => true,
		'headers' => array(),
		'body' => $fields_string
		)
	);
	if ( is_wp_error( $response ) ) {
		$error_message = $response->get_error_message();
		echo "Something went wrong: $error_message";
	} else {

		$wpmks_webforms_decodeinfo = json_decode($response['body'],true) ;
		return $wpmks_webforms_decodeinfo;
	}
}
/*=========Get User Information from admin panel=========*/
function wpmks_webforms_get_userinfo($wpmks_username,$wpmks_password){
	global $baseUrl;
	$json_login_url = $baseUrl.'/mobile/mobileService/mobileLogin';
	$response = wp_remote_post( $json_login_url, array(
		'method' => 'POST',
		'timeout' => 45,
		'redirection' => 5,
		'httpversion' => '1.0',
		'blocking' => true,
		'headers' => array(),
		'body' => array( 'userId' => $wpmks_username, 'password' => $wpmks_password )
		)
	);
	if ( is_wp_error( $response ) ) {
		$error_message = $response->get_error_message();
		echo "Something went wrong: $error_message";
	} else {
		$wpmks_webforms_decodeinfo = json_decode($response['body']) ;
		return $wpmks_webforms_decodeinfo;
	}
}
/*
* Create Short Code for Form builder
* parameters : formID
*/
function wpmks_webforms_shortcode($atts,$contents = null){
      global $post;
			global $baseUrl;
      extract( shortcode_atts( array(
          'preview'=> 'Y',
          'formurl'=>$baseUrl.'/vform/',
          'formid'=>'',
          'width'=>'300',
          'height'=>'400',
          'id'=>'mkswebform',
          'class'=>'mskwebform'
      ) , $atts ));
      if($formid !== ''){
        ob_start();
        require('inc/front-end.php');
        $content = ob_get_clean();
        return $content;
      }else{
        echo 'Short code is broken';
      }
}
add_shortcode('wpmks_form','wpmks_webforms_shortcode');


/*
* Ajax Call from admin page
* Save new user
*/
function wpmks_webforms_create_user_callback(){
	global $wpdb; // this is how you get access to the database
	extract($_POST);
	$fields = array(
			  'email'=>urlencode($email),
			  'pwd'=>urlencode($pwd),
			  'userID'=>urlencode($email),
			  'lastName'=>urlencode($lname),
			  'firstName'=>urlencode($fname),
			  'company'=>'singup_plugin',
			  'phone'=>urlencode($phone),
			  'uText'=>urlencode($uText),
			  'chValue'=>urlencode($chValue),
			  'type'=>'cr',
			  'isPluginUser'=>'Y',
			  'frmFld_lead_source'=>urlencode($src),
			  'frmFld_Current Provider'=>urlencode('Web Form Builder WP'),
			  'frmFld_Other Text'=>urlencode('Singup Pluign Form'),
			  'frmFld_MKS Package'=>urlencode('signup plugin'),
			  'frmFld_Bundle Choice'=>urlencode(''),
			  'frmFld_Monthly Volume'=>urlencode('0-500'),
			  'frmFld_CRM Tool'=>urlencode('None'),
			  'frmFld_Number of Sales Reps'=>urlencode('1 - 4'),
			  'frmFld_Topic of Interest'=>urlencode('Singup Form'),
			  'frmFld_Source'=>urlencode(''),
			  'sourceType'=>urlencode('wordpress'),
			  'pluginSource'=>urlencode('wordpressPlugin')
			);
	$returnval = wpmks_webforms_post_newuser($fields);
	foreach ( $returnval as $key => $value) {
			$arrayN['key_value'] = $key;
			$arrayN['response'] = $value;
	}
	echo json_encode($arrayN);
	wp_die(); // this is required to terminate immediately and return a proper response
}

/*
* Actions for the plugin
*/
add_action('admin_menu','wpmks_webforms_menu');
add_action('admin_print_styles','wpmks_webforms_styles');
add_action('admin_enqueue_scripts','wpmks_webforms_scripts');
add_action( 'wp_ajax_webforms_createuser', 'wpmks_webforms_create_user_callback' );

/*
* Providing all css files for admin area
*/
function wpmks_webforms_styles(){

	wp_enqueue_style('wpmks_webforms_formbuilder',plugins_url('css/formbuilder.css', __FILE__ ));
	wp_enqueue_style('wpmks_webforms_wfstyle',plugins_url('css/wfstyle.css',__FILE__ ));
	wp_enqueue_style('wpmks_webforms_icons',plugins_url('css/icons.css', __FILE__ ));
	wp_enqueue_style('wpmks_webforms_jPicker',plugins_url('css/jPicker-1.1.6.min.css', __FILE__ ));
}
/*
* Providing all script files for admin area
*/
function wpmks_webforms_scripts(){
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-ui-widget');
	wp_enqueue_script('jquery-ui-core');
	wp_enqueue_script('jquery-ui-dialog');
	wp_enqueue_script('jquery-ui-tooltip');
	wp_enqueue_script('jquery-ui-autocomplete');
	wp_enqueue_script('jquery-ui-accordion');
	wp_enqueue_script('jquery-ui-tabs');
	wp_enqueue_script('jquery-ui-draggable');
	wp_enqueue_script('jquery-ui-droppable');
	wp_enqueue_script('jquery-ui-sortable');
	wp_enqueue_script('jquery-effects-core');
	wp_enqueue_script('jquery-effects-blind');
	wp_enqueue_script('jquery-effects-bounce');
	wp_enqueue_script('jquery-effects-clip');
	wp_enqueue_script('jquery-effects-drop');
	wp_enqueue_script('jquery-effects-explode');
	wp_enqueue_script('jquery-effects-fade');
	wp_enqueue_script('jquery-effects-fold');
	wp_enqueue_script('jquery-effects-highlight');
	wp_enqueue_script('jquery-effects-pulsate');
	wp_enqueue_script('jquery-effects-scale');
	wp_enqueue_script('jquery-effects-shake');
	wp_enqueue_script('jquery-effects-slide');
	wp_enqueue_script('jquery-effects-transfer');
	wp_enqueue_script('jquery-ui-tooltip');
	wp_enqueue_script('jquery-ui-mouse');
	wp_enqueue_script('jquery-ui-position');
	wp_enqueue_script('jquery-ui-resizable');
	wp_enqueue_script('jquery-effects-bounce');
	wp_enqueue_script('jquery-ui-selectable');
	wp_enqueue_script('jquery-ui-button');
	wp_enqueue_script('jquery-ui-slider');
	wp_enqueue_script('jquery-ui-progressbar');
	wp_enqueue_script('jquery-ui-datepicker');
	wp_enqueue_script('wpmks_webforms_formbuilder',plugins_url('js/formbuilder.js', __FILE__ ));
	wp_enqueue_script('wpmks_webforms_mks_wf_script',plugins_url('js/mks_wf_script.js', __FILE__ ));
	wp_enqueue_script('wpmks_webforms_jpicker',plugins_url('js/jpicker-1.1.6.min.js', __FILE__ ));
	wp_enqueue_script('wpmks_webforms_highlight',plugins_url('js/jquery.highlight.js',__FILE__));
}
?>
