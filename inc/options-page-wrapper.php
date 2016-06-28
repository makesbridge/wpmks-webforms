<div class="wrap wpmks-webform-body-wrapper">
	<input type="hidden" id="userInfoExists" value="<?php echo $isUser_registered; ?>" />
	<div id="icon-options-general" class="icon32"></div>
	<h1><?php esc_attr_e( 'Makesbridge Form Builder', 'wp_admin_style' ); ?></h1>
	<div id="poststuff">
		<div id="post-body" class="metabox-holder columns-1">
			<!-- sidebar -->
			<div id="postbox-container-1" class="postbox-container" style="display:none;">
				<div class="meta-box-sortables">
					<?php if(isset($wpmks_webforms_userinfo->{'bmsToken'}) && !empty($wpmks_webforms_userinfo->{'bmsToken'}) && $isUser_registered==true):  ?>
					<div class="postbox">
						<div class="handlediv" title="Click to toggle"><br></div>
							<h2 class="hndle"><span><?php esc_attr_e(
										'User information', 'wp_admin_style'
								); ?></span></h2>
						<div class="inside">
							<form name="wpmks_username_form" method="post" action="">
											<input type="hidden" name="wpmks_webform_submitted" value="Y" />
											<input type="hidden" name="wpmks_webform_logout" value="Y" />
											<p><label for="wpmks_webform_username">Username</label></p>
											<p><input type="text" id="wpmks_webform_username" name="wpmks_webform_username" value="<?php echo $wpmks_webform_username; ?>" placeholder="" /></p>
											<p><label for="wpmks_webform_password">Password</label></p>
											<p><input type="password" name="wpmks_webform_password" id="wpmks_webform_password" value="<?php echo $wpmks_webform_password; ?>" placeholder="" /></p>
											<p><input class="button-primary" type="submit" name="wpmks_username_submit" value="Update" /></p>
										</form>
							</div>
						<!-- .inside -->
					</div>
					<!-- .postbox -->
				<?php endif; ?>
				</div>
				<!-- .meta-box-sortables -->
			</div>
			<!-- #postbox-container-1 .postbox-container -->
			<!-- main content -->
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortable">
					<!-- ========== Login Form ========== -->

						<?php if(!isset($wpmks_webforms_userinfo->{'bmsToken'}) && empty($wpmks_webforms_userinfo->{'bmsToken'}) && $isUser_registered==false): ?>
									<?php if(isset($wpmks_webforms_userinfo)){ ?>
											<?php if(empty($wpmks_webforms_userinfo->{'bmsToken'})) : ?>
												<?php if ($hidden_field_logout !== 'Y' && isset($_POST['wpmks_webform_username'])) : ?><div class="notice notice-error"><p> <?php echo $wpmks_webforms_userinfo->{'errorDetail'}; ?></p></div><?php endif; ?>
												<div class="notice notice-success" style="display:none;"><p></p></div>
											<?php endif; ?>
									<?php } ?>
					<div class="postbox" id="Login-form">
						<div class="handlediv" title="Click to toggle"><br></div>
						<!-- Toggle -->
						<h2 class="hndle"><span>Please provide your bridgemail system login credentials</span>
						</h2>
						<div class="inside">
							<form method="POST" action="" name="wpmks_webform" id="wpmks_webform_login">
								<div class="notice notice-error" style="display:none;" id="login-webform-error"><p></p></div>
							<table class="form-table">
									<input type="hidden" name="wpmks_webform_submitted" value="Y" />
									<tr>
										<td><label for="wpmks_webform_username">Username</label></td>
										<td><input type="text" name="wpmks_webform_username" id="wpmks_webform_username" value="" placeholder="Enter your makesbridge username" class="regular-text" /></td>
									</tr>
									<tr valign="top">
										<td scope="row">
											<label for="wpmks_webform_password">Password</label>
										</td>
										<td>
											<input type="password" name="wpmks_webform_password" id="wpmks_webform_password" value="" placeholder="Enter your makesbridge password" class="regular-text" />
										</td>
									</tr>
								</table>
								<p>
									<input class="button-primary" type="submit" id="wpmks-req-login" name="wpmks_webform_submit" value="<?php esc_attr_e( 'Login' ); ?>" />
									<input class="button-primary" type="button" id="signup-trial" name="wpmks_webform_submit" value="<?php esc_attr_e( 'New Signup' ); ?>" />
								</p>
							</form><!-- form -->
						</div>
						<!-- .inside -->
					</div>
						 <!-- END OF JSON OBJ -->
					<!-- .postbox -->
					<div class="postbox" id="New-Signup-form" style="position:relative;display:none;">
						<div class="notice notice-error response-error" style="display:none;"><p> </p></div>
						<div class="handlediv" title="Click to toggle"><br></div>
						<!-- Toggle -->
						<h2 class="hndle"><span>Signup for Makesbridge</span>
						</h2>
						<div class="inside">
							<form method="POST" action="" id="signup_form" name="signup_form" style="clear:both;">
								<i style="float:left;clear:both;">Note: Gmail,Yahoo,Hotmail or any other free mail services are not valid</i>
								<input type="hidden" id="admin-src-path" value="<?php echo $siteUrl;?>" />
								<input type="hidden" name="formId" value="BzAEqwsFl20Ej21Tp30Xq33BdTMyio">
	                            <input type="hidden" name="pageId" value="">
	                              <input id="source" type="hidden" value="<?php echo $source; ?>" name="source">
	                              <input id="action" type="hidden" value="webforms_createuser" name="action">
							<table class="form-table" style="float:left;">
									<input type="hidden" name="wpmks_webform_submitted" value="Y" />
									<tr>
										<td><label for="wpmks_webform_username">First Name <i>*</i></label></td>
										<td><input type="text" id="fname" name="fname" id="wpmks_webform_username" value="" placeholder="" class="regular-text" /><div class="tooltip">First Name is required</div></td>
									</tr>
									<tr>
										<td><label for="wpmks_webform_username">Last Name <i>*</i></label></td>
										<td><input type="text" id="lname" name="lname" id="wpmks_webform_username" value="" placeholder="" class="regular-text" /><div class="tooltip">Last Name is required</div></td>
									</tr>
									<tr>
										<td><label for="wpmks_webform_username">Work Email <i>*</i></label></td>
										<td><input type="text" id="email" name="email" id="wpmks_webform_username" value="" placeholder="" class="regular-text" /><div class="tooltip">Email is required</div></td>
									</tr>
									<tr>
										<td><label for="wpmks_webform_username">Phone Number <i>*</i></label></td>
										<td><input type="text" id="phone" name="phone" id="wpmks_webform_username" value="" placeholder="" class="regular-text" /><div class="tooltip">Phone number is required</div></td>
									</tr>
									<tr>
										<td><label for="wpmks_webform_username">Password <i>*</i></label></td>
										<td><input type="password" name="pwd" id="pwd" value="" placeholder="" class="regular-text" /><div class="tooltip">Password is required</div></td>
									</tr>
									<tr>
										<td><label for="wpmks_webform_username">Confirm Password <i>*</i></label></td>
										<td><input type="password" name="pwd2" id="pwd2" value="" placeholder="" class="regular-text" /><div class="tooltip">Password not matched</div></td>
									</tr>
									<tr>
										<td><label for="wpmks_webform_username">Security Code <i>*</i></label></td>
										<td><img border="1" src="<?php echo $prodUrl; ?>/challenge?c=_DEFAULT" alt="" id="image"
                                                          style="margin-bottom:10px;"></div>
                                                        <div class="row">
                                                            <input type="text" id="uText" placeholder="" name="uText" value="" class="regular-text">
																														<div class="tooltip" style="">Captcha is required.</div>
                                                            <input type="hidden" value="_DEFAULT" name="chValue" id="chValue">
                                                            <input type="hidden" id="pgsrc" name="src" value="mksignup">
                                                            <input type="checkbox" style="display:none;" value="qcWWk30Wh33qDF" id="26657d5ff9020d2abefe558796b99584" name="lists" checked="checked">
                                                           <span data-original-title="" data-container="body" data-placement="right" data-trigger="hover" data-toggle="popover" title="" id="uText_erroricon" class="erroricon popOver"></span>
                                                        </div> <!--  row  -->
                                                    </td>
									</tr>
								</table>
								<p>
									<input class="button-primary" type="button" id="signUpButtonTrial" name="wpmks_webform_submit" value="<?php esc_attr_e( 'Register' ); ?>" />
									<input class="button-primary" type="button" id="wp-Login" name="wp-Login" value="<?php esc_attr_e( 'Login' ); ?>" />
								</p>
							</form><!-- form -->
						</div>
						<!-- .inside -->
					</div>
						 <!-- END OF JSON OBJ -->
					<!-- .postbox -->
					<!-- ========== End Login AND Signup Form========== -->
				<?php else: ?>
						<!-- ========== Web Form builder ========== -->
					<div class="postbox" style="min-height:800px;">
						<div class="handlediv" title="Click to toggle"><br></div>
						<!-- Toggle -->
						<h2 class="hndle"><span>Builder Panel</span><a id="wpf-logout">Log out</a> <span style="float:right;">User : <?php echo $wpmks_webform_username; ?></span>
						</h2>
						<input type="hidden" id="plg-src-path" value="<?php echo $plugin_url; ?>" />
						<input type="hidden" id="admin_src_path" value="<?php echo $siteUrl;?>" />
						<div class="inside" id="webform_builder" style="width:98%;">

							<input type="hidden" id="BMS_REQ_TK" name="name" value="<?php echo $wpmks_webforms_userinfo->{'bmsToken'}; ?>">
							<input type="hidden" id="userId" name="name" value="<?php echo $wpmks_webforms_userinfo->{'userId'}; ?>">
							<input type="hidden" id="user_key" name="name" value="<?php echo $wpmks_webforms_userinfo->{'userKey'}; ?>">
							<input type="hidden" id="plugin_url" name="name" value="<?php echo $plugin_url; ?>/">
							<input type="hidden" id="baseUrl" name="name" value="<?php echo $baseUrl; ?>/">
							<!-- Clean Code from this function -->
							<?php //wpmks_webforms_builder($wpmks_webforms_userinfo); ?>
						</div>
						<button style="" type="button" class="ScrollToTop scroll-summary" style="dispaly:none;"></button>
						<!-- .inside -->
					</div>
					<!-- .postbox -->
				<?php endif; ?>
				<?php if($display_json == true) : ?>
						<!-- ==========Json Feed Form========== -->
							<div class="postbox">
									<h2 class="hndle"><span><?php esc_attr_e(
									'JSON Feeds', 'wp_admin_style'
								); ?></span></h2>
									<div class="inside">
										<pre>
											<code>
												<?php var_dump($wpmks_webforms_userinfo); ?>
											</code>
										</pre>
									</div>
									<!-- .inside -->
								</div>
								<!-- .postbox -->
						<?php endif; ?>
				</div>
				<!-- .meta-box-sortables .ui-sortable -->
			</div>
			<!-- post-body-content -->
		</div>
		<!-- #post-body .metabox-holder .columns-2 -->
		<br class="clear">
	</div>
	<!-- #poststuff -->
</div> <!-- .wrap -->
