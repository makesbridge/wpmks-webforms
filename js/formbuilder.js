/*
 *Created by : Umair Shahid and Abdullah Tariq
 *Version: 1
 *formbuilder plugin
 *=================================*/
var $ = jQuery;

!function ($) {
        "use strict";
        var formBuilder = function (element, options) {
                this.init(element, options)
        }

        formBuilder.prototype = {

                constructor: formBuilder

                , init: function (element, options) {
                        this.$element = $(element);
                        this.options = this.getOptions(options);
                        this.JSONform = { formEle: "formcontents"   /*Set form id*/ };
                        this.control = {
                                li: null,
                                draggedItem: null,
                                firstLastControl: false,
                                typeChanged: false,
                                fieldTypes: [["textfield", "Text field"], ["textarea", "Text area"], ["selectbox", "Drop Down"], ["radio", "Radio Button"], ["checkbox", "Check box"]],
                                fontFamilies: [["Arial, Helvetica, sans-serif", "Arial"], ["'Arial Black', Gadget, sans-serif", "Arial Black"], ["'Comic Sans MS', cursive, sans-serif", "Comic Sans MS"], ["Impact, Charcoal, sans-serif", "Impact"], ["'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "Lucida Sans Unicode"], ["Tahoma, Geneva, sans-serif", "Tahoma"], ["'Trebuchet MS', Helvetica, sans-serif", "Trebuchet MS"], ["Verdana, Geneva, sans-serif", "Verdana"]],
                                fontSizes: [["30", "30px"], ["28", "28px"], ["26", "26px"], ["24", "24px"], ["22", "22px"], ["20", "20px"], ["18", "18px"], ["16", "16px"], ["14", "14px"], ["12", "12px"],["11","11px"], ["10", "10px"], ["8", "8px"]],
                                fontBold: [["normal", "Normal Text"], ["bold", "Bold"], ["bolder", "Bolder"], ["lighter", "Lighter"], ["100", "100"], ["200", "200"], ["300", "300"], ["400", "400"], ["500", "500"], ["600", "600"], ["700", "700"], ["800", "800"], ["900", "900"]],
                                setting_options: {
                                        "heading": [[{ "name": "Label", "subheading": "Text for your Heading", "type": "textfield", "key": "label" }, { "name": "Background Color", "subheading": "Set heading background color", "type": "color", "key": "bg_color" }, { "name": "Color", "subheading": "Set heading text color", "type": "color", "key": "font_color" }, { "name": "Size", "subheading": "Set size of heading", "type": "selectbox", "options": "this.control.fontSizes", "key": "font_size" }, { "name": "Bold", "subheading": "Set weight of text heading", "type": "selectbox", "options": "this.control.fontBold", "key": "font_weight" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "header": [[{ "name": "Label", "subheading": "Text for your Heading", "type": "textfield", "key": "label" }, { "name": "Background Color", "subheading": "Set heading background color", "type": "color", "key": "bg_color" }, { "name": "Color", "subheading": "Set heading text color", "type": "color", "key": "font_color" }, { "name": "Size", "subheading": "Set size of heading", "type": "selectbox", "options": "this.control.fontSizes", "key": "font_size" }, { "name": "Bold", "subheading": "Set weight of text heading", "type": "selectbox", "options": "this.control.fontBold", "key": "font_weight" }, { "name": "Hidden", "subheading": "Make header Hidden", "type": "radio", "key": "hidden" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "linebreak": [[{ "name": "Height", "subheading": "Height for line break", "type": "textfield", "key": "height" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "hr": [[{ "name": "Height", "subheading": "Height for line", "type": "textfield", "key": "height" }, { "name": "Color", "subheading": "Select color for Horizontal rule", "type": "color", "key": "bg_color" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "text": [[{ "name": "Text", "subheading": "Text to show on form", "type": "textfield", "key": "label" }, { "name": "Align", "subheading": "Align text", "type": "selectbox", "options": [["left", "Left"], ["center", "Center"], ["right", "Right"]], "key": "align" }, { "name": "Font Family", "subheading": "Default Font family for label", "type": "selectbox", "options": "this.control.fontFamilies", "key": "font_family" }, { "name": "Font size", "subheading": "Default Font size for label", "type": "selectbox", "options": "this.control.fontSizes", "key": "font_size" }, { "name": "Color", "subheading": "Set text color", "type": "color", "key": "font_color" }, { "name": "Background Color", "subheading": "Set text background color", "type": "color", "key": "bg_color" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "textfield": [[{ "name": "Label", "subheading": "Text for your Field label", "type": "textfield", "key": "label" }, { "name": "Name", "subheading": "Name for your Field", "type": "label", "key": "name" }, { "name": "Required", "subheading": "Require completing field", "type": "radio", "key": "required" }, { "name": "Require Message", "subheading": "Show error message on require validation", "type": "textfield", "key": "requried_msg" }, { "name": "Type", "subheading": "Type of form field", "type": "selectbox", "options": "this.control.fieldTypes", "key": "type" }, { "name": "Default Value", "subheading": "Pre-populate a value", "type": "textfield", "key": "default_value" }, { "name": "Hidden", "subheading": "Make field Hidden", "type": "radio", "key": "hidden" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "custom_field": [[{ "name": "Label", "subheading": "Text for your Field label", "type": "textfield", "key": "label" }, { "name": "Name", "subheading": "Name for your Field", "type": "textfield", "key": "name" }, { "name": "Required", "subheading": "Require completing field", "type": "radio", "key": "required" }, { "name": "Require Message", "subheading": "Show error message on require validation", "type": "textfield", "key": "requried_msg" }, { "name": "Type", "subheading": "Type of form field", "type": "selectbox", "options": "this.control.fieldTypes", "key": "type" }, { "name": "Default Value", "subheading": "Pre-populate a value", "type": "textfield", "key": "default_value" }, { "name": "Hidden", "subheading": "Make field Hidden", "type": "radio", "key": "hidden" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "textarea": [[{ "name": "Label", "subheading": "Text for your Field label", "type": "textfield", "key": "label" }, { "name": "Name", "subheading": "Name for your Field", "type": "label", "key": "name" }, { "name": "Required", "subheading": "Require completing field", "type": "radio", "key": "required" }, { "name": "Require Message", "subheading": "Show error message on require validation", "type": "textfield", "key": "requried_msg" }, { "name": "Type", "subheading": "Type of form field", "type": "selectbox", "options": "this.control.fieldTypes", "key": "type" }, { "name": "Rows", "subheading": "Number of lines on textarea", "type": "textfield", "key": "rows" }, { "name": "Columns", "subheading": "Width of textarea", "type": "textfield", "key": "cols" }, { "name": "Default Value", "subheading": "Pre-populate a value", "type": "textfield", "key": "default_value" }, { "name": "Hidden", "subheading": "Make field Hidden", "type": "radio", "key": "hidden" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "checkbox": [[{ "name": "Label", "subheading": "Text for your Field label", "type": "textfield", "key": "label" }, { "name": "Name", "subheading": "Name for your Field", "type": "label", "key": "name" }, { "name": "Required", "subheading": "Require completing field", "type": "radio", "key": "required" }, { "name": "Require Message", "subheading": "Show error message on require validation", "type": "textfield", "key": "requried_msg" }, { "name": "Type", "subheading": "Type of form field", "type": "selectbox", "options": "this.control.fieldTypes", "key": "type" }, { "name": "Options", "subheading": "Users can choose from these options", "type": "textarea", "key": "options" }, { "name": "Default Value", "subheading": "Pre-populate a value", "type": "textfield", "key": "default_value" }, { "name": "Hidden", "subheading": "Make field Hidden", "type": "radio", "key": "hidden" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "radio": [[{ "name": "Label", "subheading": "Text for your Field label", "type": "textfield", "key": "label" }, { "name": "Name", "subheading": "Name for your Field", "type": "label", "key": "name" }, { "name": "Required", "subheading": "Require completing field", "type": "radio", "key": "required" }, { "name": "Require Message", "subheading": "Show error message on require validation", "type": "textfield", "key": "requried_msg" }, { "name": "Type", "subheading": "Type of form field", "type": "selectbox", "options": "this.control.fieldTypes", "key": "type" }, { "name": "Options", "subheading": "Users can choose from these options", "type": "textarea", "key": "options" }, { "name": "Default Value", "subheading": "Pre-populate a value", "type": "textfield", "key": "default_value" }, { "name": "Hidden", "subheading": "Make field Hidden", "type": "radio", "key": "hidden" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "selectbox": [[{ "name": "Label", "subheading": "Text for your Field label", "type": "textfield", "key": "label" }, { "name": "Name", "subheading": "Name for your Field", "type": "label", "key": "name" }, { "name": "Required", "subheading": "Require completing field", "type": "radio", "key": "required" }, { "name": "Require Message", "subheading": "Show error message on require validation", "type": "textfield", "key": "requried_msg" }, { "name": "Type", "subheading": "Type of form field", "type": "selectbox", "options": "this.control.fieldTypes", "key": "type" }, { "name": "Options", "subheading": "Users can choose from these options", "type": "textarea", "key": "options" }, { "name": "Default Value", "subheading": "Pre-populate a value", "type": "textfield", "key": "default_value" }, { "name": "Hidden", "subheading": "Make field Hidden", "type": "radio", "key": "hidden" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "button": [[{ "name": "Button Text", "subheading": "Text for submit buton", "type": "textfield", "key": "label" }, { "name": "Color", "subheading": "Set button color", "type": "color", "key": "bg_color" }, { "name": "Background Color", "subheading": "Set button background color", "type": "color", "key": "bg_color_button" }, { "name": "Button Align", "subheading": "Align submit button to left, center or right", "type": "selectbox", "options": [["left", "Left"], ["center", "Center"], ["right", "Right"]], "key": "align" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "default": [[{ "name": "Label", "subheading": "Text for your field", "type": "textfield", "key": "label" }, { "name": "Value", "subheading": "Value for your Field", "type": "label", "key": "default_value" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea" }]],
                                        "capacha": [[], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "form": [[{ "name": "Form Name", "subheading": "Set form name", "type": "textfield", "key": "formname" }, { "name": "Font Family", "subheading": "Default Font family for label", "type": "selectbox", "options": "this.control.fontFamilies", "key": "font_family" }, { "name": "Font size", "subheading": "Default Font size for label", "type": "selectbox", "options": "this.control.fontSizes", "key": "font_size" }, { "name": "Font Color", "subheading": "Set default color of labels", "type": "color", "key": "font_color" }, { "name": "Background Color", "subheading": "Set background color for form", "type": "color", "key": "bg_color" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]],
                                        "hidden": [[{ "name": "Name", "subheading": "Name for your Field", "type": "label", "key": "name" }, { "name": "Value", "subheading": "Value for your Field", "type": "label", "key": "default_value" }], [{ "name": "Style", "subheading": "Inline Style for heading", "type": "textarea", "key": "style" }]]
                                }
                        }
                        this.configure();
                        // Loading html template
                        var c = this.$element;
                        this.showSLoading("Loading Form...", this.$element);

                        if(this.options.pluginType === 'wordpress'){
                          var templateUrl =this.$element.find('#plugin_url').val()+'template.html';
                        }else{
                          var templateUrl ='template.html';
                        }
                        this.$element.load(templateUrl, $.proxy(function (response, status, xhr) {
                                //console.log('response : ' + $(response))
                                this.hideLoading(this.$element.attr('id'));
                                this.options.defaultTemplate['campign_content'] = $(response).find('.campaign-content')[0];
                                this.options.defaultTemplate['create_new'] = $(response).find('.create_new')[0];
                                if (this.options.isPluginOnly) {
                                        this.getFormList();
                                         this.ajaxComplete();
                                        this.$element.find('.mks-webform-listings').scroll($.proxy(this.liveLoading, this));
                                        this.initDialog();
                                        this.reAttachEvents();
                                        this.$element.find('.campaign-content').hide();
                                } else {
                                        this.$element.find('.mks-creat-listing-wrapper').remove();
                                        this.$element.find('.mks-back-listing-btn').hide();
                                        this.loadForm();
                                }


                        }, this));
                },
                /*============================================
                 * Configuration function for cnd,wordpress,mks
                 *=============================================*/
                configure:function(){
                        // CDN
                        if(this.options.pluginType === 'cdn'){
                            this.options.userId =  $.cookie('userId');
                            this.options.BMS_REQ_TK = $.cookie('bmsToken');
                            this.options.ukey = $.cookie('uKey');
                        }else if(this.options.pluginType === 'mks'){
                            //this.options.app
                        }else if(this.options.pluginType === 'wordpress'){
                          this.options.BMS_REQ_TK = this.$element.find('#BMS_REQ_TK').val();
                          this.options.userId = this.$element.find('#userId').val();
                          this.options.ukey = this.$element.find('#user_key').val();
                          var baseUrl = this.$element.find('#baseUrl').val();
                          baseUrl = baseUrl.substring(0, baseUrl.length - 1);
                          this.options.baseUrl = baseUrl;
                        }
                },
                /*============================================================
                 * Complete Ajax Request check after each ajax successful call
                 ===========================================================*/
                 ajaxComplete:function(){
                    var _this = this;
                     $(document).ajaxComplete(function (event, request, settings) {
                        if (request.responseText) {
                           try{
                               var result = jQuery.parseJSON(request.responseText);
                                if (result[0] == "err" && result[1] == "SESSION_EXPIRED") {
                                    var messageObj = {};
                                    messageObj["heading"] = "Session Expired"
                                    messageObj["detail"] = "Your session has expired due to an extended period of inactivity. You will need to login again to access the requested information.";
                                    //alert(messageObj.heading);
                                    if(_this.options.pluginType=="cdn"){
                                      $.cookie('bmsToken','');
                                      //window.location('login.html');
                                      window.location="login.html"
                                    }else if(_this.options.pluginType=="wordpress"){
                                      _this.$element.parents('body').find('#wpf-logout').trigger('click');
                                      _this.showMessage(messageObj.detail,true);
                                    }

                                    // _app.showLoginExpireAlert(messageObj, $("body"));
                                    return false;
                                }else{
                                  //console.log('I have been hit on every ajax complete');
                                }
                           }
                            catch (e) { }


                        }
                    });
                 },
                /*==
                 * param: reqObj
                 * param: callBack
                 * type : CROSS ORIGION CALLS
                 ==*/
                getAjaxCORS: function (reqObj, callBack) {
                        var url = reqObj.url;
                        var dataType = (reqObj.dataType) ? reqObj.dataType : 'json';
                        var callBackOpt = (reqObj.callBack) ? reqObj.callBack : '';
                        if (reqObj.isServerReq) {
                                url = url + '&BMS_REQ_TK=' + this.options.BMS_REQ_TK + '&ukey=' + this.options.ukey + '&isMobileLogin=' + this.options.isMobileLogin + '&userId=' + this.options.userId;
                        }
                        $.ajax({
                                // The 'type' property sets the HTTP method.
                                // A value of 'PUT' or 'DELETE' will trigger a preflight request.
                                type: 'GET',
                                // The URL to make the request to.
                                url: url,
                                contentType: 'text/plain',
                                xhrFields: {
                                        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                                        // This can be used to set the 'withCredentials' property.
                                        // Set the value to 'true' if you'd like to pass cookies to the server.
                                        // If this is enabled, your server must respond with the header
                                        // 'Access-Control-Allow-Credentials: true'.
                                        withCredentials: false
                                },
                                headers: {
                                        // Set any custom headers here.
                                        // If you set any non-simple headers, your server must include these
                                        // headers in the 'Access-Control-Allow-Headers' response header.
                                },
                                success: function (data) {
                                        if (callBack) {
                                                callBack(data);
                                        } else if (callBackOpt) {
                                                callBackOpt(data);
                                        } else {
                                                return data;
                                        }
                                },
                                error: function () {
                                }
                        });
                },
                /*==
                 * param: reqObj
                 * param: callBack
                 * type : get
                 ==*/
                getAjaxCall: function (reqObj, callBack) {
                        var url = reqObj.url;
                        if (reqObj.isServerReq) {
                                url = url + '&BMS_REQ_TK=' + this.options.BMS_REQ_TK + '&ukey=' + this.options.ukey + '&isMobileLogin=' + this.options.isMobileLogin + '&userId=' + this.options.userId;
                        }
                        var async = (reqObj.async) ? reqObj.async : true;
                        var dataType = (reqObj.dataType) ? reqObj.dataType : 'json';
                        var callBackOpt = (reqObj.callBack) ? reqObj.callBack : '';
                        var crossDomain = (reqObj.crossDomain) ? reqObj.crossDomain : false;
                        $.ajax({
                                type: "GET",
                                url: url,
                                data: {},
                                async: false,
                                dataType: dataType, //you may use jsonp for cross origin request
                                crossDomain: crossDomain,
                                success: function (data, status, xhr) {
                                        if (data[0] !== "err") {
                                                if (callBack) {
                                                        callBack(data);
                                                } else if (callBackOpt) {
                                                        callBackOpt(data);
                                                } else {
                                                        return data;
                                                }
                                        } else {
                                                alert(data[1]);
                                        }
                                }
                        });
                        /*$.ajax({
                         url: url,
                         success: $.proxy(function(data,status,xhr){
                         if(callBack){
                         callBack(data);
                         }else if(callBackOpt){
                         callBackOpt(data);
                         }else {
                         return data;
                         }
                         },this),
                         crossDomain:crossDomain,
                         dataType: dataType
                         });*/
                },
                /*==
                 * param: url
                 * param: reqObj
                 * param: callBack
                 * Type: post
                 ==*/
                postAjaxCall: function (url, reqObj, callBack) {
                        var url = url;
                        var dataType = (reqObj.dataType) ? reqObj.dataType : 'json';
                        var callBackOpt = (reqObj.callBack) ? reqObj.callBack : '';
                        /*if(reqObj.isServerReq){
                         reqObj['BMS_REQ_TK']=this.options.BMS_REQ_TK;
                         reqObj['ukey']=this.options.ukey;
                         reqObj['isMobileLogin']=this.options.isMobileLogin;
                         reqObj['userId']=this.options.userId;
                         }*/
                        $.ajax({
                                url: url,
                                dataType: 'json',
                                data: reqObj,
                                async: true,
                                type: 'POST',
                                success: function (data) {
                                        if (data[0] !== "err") {
                                                if (callBack) {
                                                        callBack(data);
                                                } else if (callBackOpt) {
                                                        callBackOpt(data);
                                                } else {
                                                        return data;
                                                }
                                        } else {
                                                return callBack(data);
                                        }
                                }
                        });
                },
                /*=======
                 Request to get a single form using req:form ID
                 ======*/
                loadForm: function () {
                        this.showSLoading("Loading Web Form...", this.$element);
                        var reqObj = { url: this.options.baseUrl + '/io/form/getSignUpFormData/?type=getForms&formId=' + this.options.formId, isServerReq: true }
                        this.getAjaxCORS(reqObj, $.proxy(function (data) {
                                var data = jQuery.parseJSON(data);
                                this.setFormArea(data);
                                if (data) {
                                        this.$element.find("#mformType").val(data.type);
                                        this.$element.find("#fname").val(data.name);
                                        this.$element.find("#mformId").val(data['formId.encode']);
                                        this.$element.find("#mIsCAPTCHA").val(data.isCAPTCHA);
                                        this.$element.find("#mformName").val(data.name);
                                        this.$element.find("#sfEntity").val(data.sfEntity);
                                        this.$element.find("#isSalesforce").val(data.isSalesforce);
                                        this.$element.find("#mpageId").val(this.options.mpageId);
                                        $('body').find('#targetcode .targeturl').val(this.decode(data.formPreviewURL));
                                        $('body').find('#embedcode #frmSnippet').val(this.decode(data.snippet));

                                        if(this.options.pluginType === 'wordpress'){
                                            this.$element.find('#wpshortcode,#wpcsvupload').show();
                                            var shortCode = this.decode(data.formPreviewURL);

                                            var res = shortCode.split('/')[5];
                                            //console.log(res);
                                            $('body').find('#shortcode #shortcodeSnippet').val('[wpmks_form formid="'+res+'" width="300" height="400"]');
                                        }


                                        $('body').find('#targetcode #frmIframeSnippet').val('<iframe src="' + this.decode(data.formPreviewURL) + '" frameborder="0" style="width:400px;height:600px"></iframe>');
                                        this.options.jsonFormHtml = data.formHTML;
                                        this.options.formId = data['formId.encode'];
                                        this.options.formSettings = data;
                                        //this.$element.find("#mformHTML").val(data.formhtml);
                                        this.fillFields();
                                        this.initializingBasicBuilder();
                                        this.ajaxComplete();
                                } else {
                                        return false;
                                }
                        }, this));
                        this.$element.find(".toolbarbtn").button();
                        /* initializing tabs if user exists */
                        this.$element.find("#formtabs").tabs();
                        //console.log(returnJson);
                },
                setFormArea: function (data) {
                        var formAreaWidth = (this.$element.find(".contentRow").width() - this.$element.find(".leftbar").width());
                        this.$element.find(".formarea").css("width", formAreaWidth + "px");
                },
                /*===
                 Initilize the basic fields and all other required functions
                 ===*/
                fillFields: function () {
                        this.showSLoading("Loading Web Form...", this.$element.find('.campaign-content'));
                        var li = "";
                        var url = this.options.baseUrl + '/json/forms.jsp?action=fields';
                        //var url = this.options.baseUrl + '/io/getMetaData/?type=merge_tags';
                        //Request for basic fields
                        this.getAjaxCall({ url: url, dataType: 'json', crossDomain: true, isServerReq: true, async: false }, $.proxy(function (data) {
                                //this.setFormArea(data);
                                this.$element.find('#fieldList li').remove();
                                //this.$element.find('#customFieldList li').remove();
                                if (data && data.Fields.length > 0) {
                                        var fields = eval(data);
                                        var fields = fields.Fields;
                                        for (var i = 0; i < fields.length; i++) {
                                                //console.log(fields[i].type);
                                                if (fields[i].type == "standard") {
                                                        li = '<li id="basic_' + fields[i].personilzationText + '" class="dragme showtooltipd" title="Drag"';
                                                        li += ' fieldIndex="' + i + '"';
                                                        li += '>' + fields[i].fieldName + '</li>';
                                                        this.$element.find('#fieldList').append(li);
                                                } else if (fields[i].type == "custom") {
                                                        li = '<li id="frmFld_' + fields[i].personilzationText + '" class="dragme showtooltipd"  title="Drag"';
                                                        li += ' fieldIndex="' + i + '"';
                                                        li += '>' + fields[i].fieldName + '</li>';
                                                        this.$element.find('#customFieldList').append(li);
                                                }
                                        }
                                        this.$element.find('.campaign-content .contents').css('visibility','unset');
                                        this.initDragDrop();
                                } else {
                                        return false;
                                }
                                /* Attach events for main view*/
                        }, this));
                        //Populate mailing list fields after calling lists
                        /*for(var i in mailLists) {
                         if(mailLists[i].list.indexOf("Bounce_Supress")==-1 && mailLists[i].list.indexOf("Supress_List")==-1){
                         li  = '<li id="list_' + mailLists[i].md5 + '" class="dragme"';
                         li += ' fieldIndex="' + i + '">' + mailLists[i].list + '</li>';
                         $('#mailLists').append(li);
                         }
                         }*/

                },
                /*===
                 Initilize the basic form builder
                 ===*/
                initializingBasicBuilder: function () {
                        /*Initilize the buttons for first form li*/
                        this.initcontrol();
                        this.createAccordion();
                        var dHeight = this.getRHeight();
                        this.$element.find(".formareacontents").css("height", (dHeight + 10) + "px"); /* setting height form builder area*/
                        this.$element.find(".formarea").css("min-height", (dHeight + 10) + "px");

                        if (parseFloat(dHeight) < 450) {
                                var initHeight;
                                if(this.options.pluginType =="wordpress"){
                                  initHeight =560;
                                }else{
                                  initHeight =600;
                                }
                                console.log('InitHeight : ' + initHeight);
                                this.$element.find(".leftbar").css("height", initHeight + "px");
                        }
                        else {
                                this.$element.find(".leftbar").css("height", dHeight + "px");
                        }
                        /* resize accordion area accordiong to height */
                        if($(window).height() > 750){
                                    var accordHeight = $(window).height() - (this.$element.find('.contents').offset().top + this.$element.find('.topbar-fixed').outerHeight()+ 40);
                                    this.$element.find(".leftbar").css("height", accordHeight + "px");
                                    this.$element.find("#accordion-form").accordion("refresh");
                                    //console.log('window height: '+ $(window).height() + 'content Offset : ' +  this.$element.find('.contents').offset().top + 'toolbar height : ' + this.$element.find('.topbar-fixed').outerHeight() + 'total height : ' + accordHeight)
                                }


                        this.$element.find(".contents").css("visibility", "visible");
                        this.imageLoading();


                        this.initDialog();
                        this.loadData();
                        //this.showSLoading('Loading Forms...', $('.mks-webform-listings'));

                        if(this.options.formSettings.submitCount == "0"){
                          this.$element.find('#wpcsvupload').addClass('disabledattr');
                        }else{
                          this.$element.find('#wpcsvupload').removeClass('disabledattr');
                        }
                        this.attachEvents();
                        this.getSalesAssignment();
                        this.$element.find("#accordion-form").accordion("refresh");
                        this.createForm();
                        this.initShowToolTip('showtooltipd');
                        if(this.options.accordionFixed){
                            this.enableAccordion();
                        }
                },
                createAccordion: function () {
                        var _this = this;
                        this.$element.find("#accordion-form").accordion({
                                autoHeight: false,
                                // fillSpace: true,
                                heightStyle: "fill",
                                icons: { "header": false, "headerSelected": false },
                                activate: function (event, ui) {
                                        if(_this.options.defaultflags.lists && ui.newPanel.attr('id') == "mailLists"){
                                            ui.newPanel.find('li').remove();
                                        }
                                        if (ui.newPanel.attr('id') == "mailLists" && ui.newPanel.find('li').length == 0) {
                                                _this.showSLoading('Loading lists...', _this.$element.find('#mailLists'));
                                                _this.options.defaultflags['lists']= false;
                                                _this.loadLists();
                                        }
                                }
                        });
                        this.$element.find("#accordion-form2").accordion({
                                autoHeight: false,
                                icons: { "header": false, "headerSelected": false }
                        });
                        this.$element.find("#accordion-form .ui-accordion-header span.ui-icon").remove();
                }
                ,
                initDragDrop: function () {
                        var _this = this;
                        /*/////////////////////////
                        ///// Drag From Left to Right
                        //////////////////////////*/
                        _this.$element.find(".dragme").draggable({
                                connectToSortable: ".formarea #formcontents",
                                //helper:"clone",
                                revert: "invalid",
                                opacity: 0.95,
                                cursor: "move",
                                scroll: true,
                                appendTo: 'body',
                                helper: function (event) {
                                        var ele_id = $(event.currentTarget).clone();
                                        return ele_id.addClass('moveable-ele moveable-li');
                                },
                                start: function (event) {
                                    _this.$element.find("#formcontents").addClass('my-draggable-class');
                                  //console.log('Drag Started by abdullah');
                                  if(_this.$element.find('.formareacontents #emptyContents').css('display') !== "block"){

                                    $.each(_this.$element.find('#formcontents li'),function(key,value){
                                        $(value).after('<li class="dragme ui-droparea"><span class="drop-one">Drop element here.</span><span class="drop-two">Drop here.</span></li>');
                                    });
                                    _this.$element.find('#formcontents li').eq(0).before('<li class="dragme ui-droparea">Drop element here.</li>');
                                    _this.initDroppable();
                                  }

                                },
                                stop: function (event,ui) {
                                    _this.$element.find('#formcontents li.dragme').remove();
                                    if(ui.helper.attr('id').indexOf("frmFld_customField") !== 0 &&   _this.options.draghandler){

                                      _this.save(true);
                                        _this.options.draghandler = false;
                                    }
                                }
                        });
                        /*/////////////////////////////////////
                        ///// Droppable for emptyContents only
                        ////////////////////////////////////*/
                      _this.$element.find("#emptyContents").droppable({
                                activeClass: "state-default",
                                hoverClass: "state-hover",
                                accept:'.dragme',
                                tolerance: "touch",
                                drop: function (event, ui) {
                                        var currentId = _this.$element.find(ui.draggable).attr("id");
                                        _this.control.li = ui.draggable.removeHighlight();
                                        _this.$element.find("#formcontents").removeClass('my-draggable-class');
                                        //$(ui.draggable).clone.appendTo(this);
                                          _this.create(event,ui);
                                            _this.options.draghandler = true; // Flag set to true if position changed
                                        if (_this.$element.find("#emptyContents").css("display") == "block") {
                                                //control.li = control.createWrapper(ui.draggable.html(),ui.draggable.attr("id"));
                                                //control.draggedItem = ui.draggable;
                                                //control.appendLi();
                                                _this.$element.find("#formfooter").removeClass("new-form");
                                                _this.$element.find("#formcontents").css({ "display": "block" });
                                                _this.$element.find("#emptyContents").css("display", "none");
                                                _this.$element.find("#formcontents").removeClass("startform");
                                        }

                                        setTimeout($.proxy(_this.resizeForm, _this,true), 300);

                                        return false;
                                }
                        });
                        /*_this.$element.find(".formarea #formcontents").sortable({
                                cancel: ".disableSort",
                                handle: '.drag',
                                revert: false,
                                placeholder: 'placeHolder',
                                cursor: "move",
                                receive: $.proxy(_this.create, _this),
                                stop: function (event, ui) {
                                        if (ui.item.attr("id").indexOf("frmFld_customField") !== 0) {
                                                _this.save(true);
                                        }

                                        $(this).removeClass('my-sortable-class');
                                },
                                start: function( event, ui ) {
                                  if(!$(this).hasClass('my-draggable-class')){
                                    $(this).addClass('my-sortable-class');

                                  }


                                }
                        }).enableSelection();*/
                }
                ,
                /*/////////////////////////////////////
                ///// draggable with handler
                ////////////////////////////////////*/
                initDragWithHandler : function(){
                  var _this = this;
                  _this.$element.find("#formcontents li").draggable({
                          connectToSortable: "#formcontents",
                          //helper:"clone",
                          revert: "invalid",
                          opacity: 0.95,
                          cursor: "move",
                          scroll: true,
                          appendTo: 'body',
                          handle:'.drag',
                          //cursorAt: { top: 80},
                          start: function (event,ui) {
                                if(event.pageY > 750){
                                  ui.helper.css('top',(event.pageY + 150) - ui.offset.top);
                                  //console.log((event.pageY + 100) - ui.offset.top);
                              }else{
                                ui.helper.css('top',(event.pageY + 10) - ui.offset.top);
                              }
                              //_this.$element.find("#formcontents").addClass('my-draggable-class');
                            $(this).addClass('drag-handle-active');

                            if(_this.$element.find('.formareacontents #emptyContents').css('display') !== "block"){
                                $.each(_this.$element.find('#formcontents li'),function(key,value){
                                    $(value).after('<li class="draghandme ui-droparea"><span class="drop-one">Drop element here.</span><span class="drop-two">Drop here.</span></li>');
                                });
                                _this.$element.find('#formcontents').addClass('drag-wrap-active');
                                _this.$element.find('#formcontents li').eq(0).before('<li class="draghandme ui-droparea"><span class="drop-one">Drop element here.</span><span class="drop-two">Drop here.</span></li>');
                                $(event.target).prev().remove();
                                $(event.target).next().remove();
                                setTimeout($.proxy(_this.resizeForm, _this), 300);
                                _this.initDropWithHandler();

                           }

                          },
                          stop: function (event,ui) {
                            $(this).removeClass('drag-handle-active');
                            $(this).removeAttr('style');
                              _this.$element.find('#formcontents li.draghandme').remove();
                              _this.$element.find('#formcontents').removeClass('drag-wrap-active');
                              if(ui.helper.attr('id').indexOf("frmFld_customField") !== 0 && _this.options.draghandler){
                                _this.save(true);
                                _this.options.draghandler =false;
                              }
                          }

                  });
                },
                /*/////////////////////////////////////
                ///// Droppable with handler
                ////////////////////////////////////*/
                initDropWithHandler : function(){
                  var _this = this;
                  _this.$element.find("#formcontents .draghandme").droppable({
                    activeClass: "state-default",
                    hoverClass: "state-hover-dropable",
                    tolerance: "touch",
                    //accept:'.draghandme',
                    drop: function (event, ui) {
                            var currentId = _this.$element.find(ui.draggable).attr("id");
                            _this.control.li = ui.helper;
                            var clone_li = $('<li id="'+_this.control.li.attr('id')+'">'+ui.helper.html()+'</li>');
                              $(event.target).before(clone_li);
                              _this.control.li = clone_li;
                              _this.options.draghandler = true; // Flag set to true if position changed
                              _this.addObserver();
                              _this.initDragWithHandler();

                                ui.draggable.remove();
                                ui.helper.remove();

                            //$(ui.draggable).clone.appendTo(this);

                            /*if (_this.$element.find("#emptyContents").css("display") == "block") {
                                    //control.li = control.createWrapper(ui.draggable.html(),ui.draggable.attr("id"));
                                    //control.draggedItem = ui.draggable;
                                    //control.appendLi();
                                    _this.$element.find("#formfooter").removeClass("new-form");
                                    _this.$element.find("#formcontents").css({ "display": "block" });
                                    _this.$element.find("#emptyContents").css("display", "none");
                                    _this.$element.find("#formcontents").removeClass("startform");
                            }
                          _this.$element.find("#formcontents").removeClass('my-draggable-class');*/

                          //_this.create(event,ui);
                          //

                            return false;
                    },
                  })
                },
                /*/////////////////////////////////////
                ///// Droppable for dragme
                ////////////////////////////////////*/
                initDroppable : function(){
                  //console.log('I got hit by droppable');
                  var _this = this;
                  _this.$element.find("#formcontents .ui-droparea").droppable({
                    activeClass: "state-default",
                    hoverClass: "state-hover-dropable",
                    accept:'.dragme',
                    tolerance: "touch",
                    drop: function (event, ui) {
                            var currentId = _this.$element.find(ui.draggable).attr("id");
                            _this.control.li = ui.helper.removeHighlight();

                            //$(ui.draggable).clone.appendTo(this);

                            if (_this.$element.find("#emptyContents").css("display") == "block") {
                                    //control.li = control.createWrapper(ui.draggable.html(),ui.draggable.attr("id"));
                                    //control.draggedItem = ui.draggable;
                                    //control.appendLi();
                                    _this.$element.find("#formfooter").removeClass("new-form");
                                    _this.$element.find("#formcontents").css({ "display": "block" });
                                    _this.$element.find("#emptyContents").css("display", "none");
                                    _this.$element.find("#formcontents").removeClass("startform");
                            }
                          _this.$element.find("#formcontents").removeClass('my-draggable-class');
                          //console.log(event + ui);
                            _this.options.draghandler = true; // Flag set to true if position changed
                          _this.create(event,ui);
                            setTimeout($.proxy(_this.resizeForm, _this), 300);

                            return false;
                    },
                  })
                },
                /*/////////////////////////////////////
                ///// Resize Form
                ////////////////////////////////////*/
                resizeForm: function (dropflag) {

                        this.$element.find('.formareacontents .dragme').remove();
                        this.$element.find(".formareacontents").css("height", "auto");
                        var formHeight = this.$element.find(".formareacontents").height();
                        var ulHeight = this.$element.find(".formarea").height();
                        if (formHeight > ulHeight) {
                                //  this.$element.find(".leftbar").css("height",formHeight+"px");
                        }
                        else {
                                //this.$element.find(".leftbar").css("height",ulHeight+"px");
                                this.$element.find(".formareacontents").css("height", "100%");
                        }

                        //this.$element.find( "#accordion-form").accordion( "refresh");
                },
                /*/////////////////////////////////////
                ///// initialize Dialogs
                ////////////////////////////////////*/
                initDialog: function () {
                        var _this = this;
                        _this.$element.parents('body').find("#elementProperties").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: 700,
                                height: 505,
                                position: { my: "top+10 center", at: "top+10 center", of: window },
                                modal: true,
                                buttons: {
                                        "save": function () {
                                                var s_field = _this.options.fieldsArray[_this.options.selectedField];
                                                if (s_field && s_field.type) {
                                                        if (s_field.type != _this.$element.parents('body').find("#prp_type").val()) {
                                                                _this.control.typeChanged = true;
                                                        }
                                                }
                                                _this.savePropertities();
                                                $('body').find("#prp_type").val(s_field.type);
                                                $(this).dialog("close");
                                        },
                                        "close": function () {
                                                $(this).dialog("close");
                                        }
                                },
                                open: function (event, ui) {

                                        $(this).parent().css('top', '50px');
                                        //$(this).find('#frmSnippet,.targeturl,#frmIframeSnippet').attr('disabled','disabled');
                                },

                                close: function (event, ui) {
                                        // Restore Defaults
                                        var s_field = _this.options.fieldsArray[_this.options.selectedField];
                                        if (s_field && s_field.type) {
                                                s_field.type = $('body').find("#prp_type").val();
                                        }
                                }
                        });
                        _this.$element.find("#embedcode,#targetcode,#shortcode").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: 700,
                                height: 300,
                                modal: true,
                                buttons: {
                                        "close": function () {
                                                $(this).dialog("close");
                                        }
                                },
                                open: function (event, ui) {
                                        if ($(event.target).attr("id") == "targetcode") {
                                                $(event.target).css("height", "80px");
                                        }
                                        $(this).parent().css({'top':'100px'});
                                        //$(this).find('#frmSnippet,.targeturl,#frmIframeSnippet').attr('disabled','disabled');
                                }
                        });
                        _this.$element.find("#embedRowcode").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: 700,
                                height: 300,
                                modal: true,
                                buttons: {
                                        "close": function () {
                                                $(this).dialog("close");
                                        }
                                },
                                open: function (event, ui) { $(this).parent().css({'top':'100px'}); }
                        });
                        _this.$element.find("#shortRowcode").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: 700,
                                height: 300,
                                modal: true,
                                buttons: {
                                        "close": function () {
                                                $(this).dialog("close");
                                        }
                                },
                                open: function (event, ui) { $(this).parent().css({'top':'100px'}); }
                        });
                        _this.$element.find("#targetformurl").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: 700,
                                height: 400,
                                modal: true,
                                buttons: {
                                        "close": function () {
                                                $(this).dialog("close");
                                        }
                                },
                                open: function (event, ui) {
                                        if ($(event.target).attr("id") == "targetformurl") {
                                                $(this).parent().css({'top':'100px'});
                                                $(event.target).css("height", "80px");
                                                $(this).find('#frmSnippet').attr('disabled','disabled');
                                        }
                                }
                        });
                        _this.$element.find("#previewformurl,#previewsingleurl").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: $(document).width()-400,
                                height: 300,
                                modal: true,
                                buttons: {
                                        "close": function () {
                                                $(this).dialog("close");
                                        }
                                },
                                open: function (event, ui) {
                                                //console.log(event);
                                                $(this).parent().css({'top':'20px'});

                                }
                        });

                        _this.$element.find("#createNew").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: 700,
                                height: 300,
                                modal: false,
                                buttons: {
                                        "close": function (event) {
                                                $(this).dialog("close");
                                                _this.$element.parents('body').find('.ui-widget-overlay').remove();
                                        }
                                },
                                close: function (event, ui) {
                                        _this.$element.parents('body').find('.ui-widget-overlay').remove();
                                },
                                open: function (event, ui) {
                                        $(event.target).find('.field-text').val('');
                                        $(this).parent().css({'top':'100px'});
                                        _this.$element.parents('body').append('<div class="ui-widget-overlay" style="width: 1440px; height: 1967px; z-index: 1005;"></div>');
                                }
                        });
                        _this.$element.find("#forwardSettings").dialog({
                                autoOpen: false,
                                resizable: false,
                                width: 700,
                                height: 300,
                                modal: true,
                                buttons: {
                                        "save": function (event) {
                                                //_this.$element.find("#settings_iframe")[0].contentWindow.save();
                                                var URL = _this.options.baseUrl + '/io/form/saveSignUpFormData/';
                                                var isAnyError = false;
                                                var formObj = $(this);
                                                if($(this).find('input[name=isAlert]').prop('checked')){
                                                        if ($(this).find('input[name=isAlert]:checked') && $(this).find('input[name=alertEmail]').val() != "" && _this.isValidEmail($(this).find('input[name=alertEmail]').val())) {
                                                        //console.log('its valid');
                                                        isAnyError = false;
                                                        } else {
                                                                _this.showMessage('Alert email is not a valid email address',true);
                                                                isAnyError = true;
                                                                return false;
                                                        }
                                                }
                                                if($(this).find('input[name=isConfirmation]').prop('checked')){
                                                        if ($(this).find('input[name=isConfirmation]:checked') && $(this).find('input[name=confirmationEmail]').val() != "" && _this.isValidEmail($(this).find('input[name=confirmationEmail]').val())) {

                                                        isAnyError = false;
                                                        } else {
                                                                _this.showMessage('Confirmation email is not a valid email address',true);
                                                                isAnyError = true;
                                                                return false;
                                                        }
                                                }

                                                $(event.target).css('top', '-5px');
                                                $(event.target).find('span').addClass('saving').css('line-height', '30px');
                                                if(formObj.find('form input[name=forwardType]').prop('checked') === true){
                                                            if($.trim(formObj.find('form #surl input').val()) !== ""){
                                                            formObj.find('form #surl input').val(_this.addhttp(formObj.find('form #surl input').val()));
                                                        }else{
                                                            alert('Success Url needs to be filled');
                                                            $(event.target).find('span').removeClass('saving')
                                                            return false;
                                                        }
                                                }
                                                if(formObj.find('form input[name=forwardType]').prop('checked') === true){
                                                        if($.trim(formObj.find('form #furl input').val())!==""){
                                                        formObj.find('form #furl input').val(_this.addhttp(formObj.find('form #furl input').val()));
                                                        }else{
                                                            alert('Failure Url needs to be filled');
                                                            $(event.target).find('span').removeClass('saving')
                                                            return false;
                                                        }
                                                }
                                                var data = $(this).find('form').serialize() + "&type=updateForm&BMS_REQ_TK=" + _this.options.BMS_REQ_TK + "&isMobileLogin=Y&userId=" + _this.options.userId;
                                                //$(this).find('form #surl input').val();

                                                if(formObj.find('form #surl input').val()){
                                                    formObj.find('form #surl input').val(_this.addhttp(formObj.find('form #surl input').val()));
                                                }
                                                if(formObj.find('form #furl input').val()){
                                                    formObj.find('form #furl input').val(_this.addhttp(formObj.find('form #furl input').val()));
                                                }
                                                _this.postAjaxCall(URL, data, function (data) {
                                                        var fields = eval(data);
                                                        if (data[0] == "err") {
                                                                _this.showMessage(data[1],true);
                                                        } else {

                                                                if (parseInt(formObj.find('form input[name=forwardType]:checked').val()) == 1) {
                                                                        _this.options.formSettings['emailSettting'] = formObj.find('form input[name=forwardType]:checked').val();
                                                                        _this.options.formSettings['successURL'] = formObj.find('form #surl input').val();
                                                                        _this.options.formSettings['failureURL'] = formObj.find('form #furl input').val();
                                                                } else if (parseInt(formObj.find('form input[name=forwardType]:checked').val()) == 3) {
                                                                        _this.options.formSettings['emailSettting'] = formObj.find('form input[name=forwardType]:checked').val();
                                                                        _this.options.formSettings['myHTML'] = formObj.find('textarea[name=myHTML]').val();
                                                                } else {
                                                                        _this.options.formSettings['emailSettting'] = formObj.find('form input[name=forwardType]:checked').val();
                                                                }

                                                                if (formObj.find('form input[name=isAlert]').prop("checked")) {
                                                                        _this.options.formSettings['sendAlertEmail'] = 'Y';
                                                                        _this.options.formSettings['alertEmail'] = formObj.find('form input[name=alertEmail]').val();
                                                                }
                                                                if (formObj.find('form input[name=isConfirmation]').prop("checked")) {
                                                                        _this.options.formSettings['sendConfirmationEmail'] = 'Y';
                                                                        _this.options.formSettings['confirmationEmail'] = formObj.find('form input[name=confirmationEmail]').val();
                                                                        _this.options.formSettings['confirmationTEXT'] = formObj.find('form textarea[name=confirmationText]').val();
                                                                }
                                                                _this.showMessage(data[1],false);
                                                                _this.$element.parents('body').find("#forwardSettings").dialog("close");
                                                                $(event.target).removeAttr('style')
                                                                $(event.target).find('span').removeClass('saving');
                                                                $(event.target).find('span').removeAttr('style');
                                                                //self.showSLoading('Loading Form...', $('.mks-webform-listings'));
                                                                //self.getFormList();
                                                        }
                                                });
                                        },
                                        "close": function (event) {
                                                $(this).find('.forwardTypeH input:radio[name=forwardType]').unbind('click');
                                                $(this).find('input:checkbox[name=isAlert]').unbind('click');
                                                $(this).find('input:checkbox[name=isConfirmation]').unbind('click');
                                                $(this).dialog("close");
                                        }

                                },
                                open: function (event, ui) {
                                        $(event.target).find('input[name=ukey]').val(_this.options.ukey);
                                        $(event.target).find('input[name=formId]').val(_this.options.formId);
                                        _this.forwardSettingDialogAttach($(event.target));
                                }
                        });
                        /* Scrolling make basic bar static*/
                        var $win = $(window), $nav = _this.$element.find('.leftbar')
                                , navTop = _this.$element.find('.leftbar').length && _this.$element.find('.leftbar').offset().top
                                , isFixed = 0;
                        if (parseFloat(_this.$element.find(".leftbar").css("height")) > 750) {

                                //_this.$element.find(".leftbar").addClass('header-fixed');
                        }

                        var h = _this.$element.find(".leftbar").height();
                        _this.$element.find(".leftbar").css("height", (h + (_this.options.upperHeight)) + "px");
                        //this.$element.find( "#accordion-form").accordion( "refresh");
                        //$win.on('scroll', processScroll);
                        function processScroll() {
                                var i, scrollTop = $win.scrollTop();
                                if (scrollTop >= navTop && !isFixed) {
                                        isFixed = 1
                                        if (parseFloat($(".leftbar").css("height")) > 450) {
                                                $nav.addClass('header-fixed');
                                        }
                                        var h = _this.$element.find(".leftbar").height();
                                        _this.$element.find(".leftbar").css("height", (h + (_this.options.upperHeight)) + "px");
                                } else if (scrollTop <= navTop && isFixed) {
                                        isFixed = 0;
                                        var h = _this.$element.find(".leftbar").height();
                                        _this.$element.find(".leftbar").css("height", (h - (_this.options.upperHeight)) + "px");
                                        if (parseFloat($(".leftbar").css("height")) > 450) {
                                                $nav.removeClass('header-fixed');
                                        }
                                }

                        };
                        $.fn.jPicker.defaults.images.clientPath = this.options.baseUrl + '/img/';
                },
                forwardSettingDialogAttach: function (obj) {
                        var _this = this;
                        var formSettings = this.options.formSettings
                        if (parseInt(formSettings.emailSettting) == 1) {

                                obj.find('#surl input').val(_this.decode(formSettings.successURL));
                                obj.find('#furl input').val(_this.decode(formSettings.failureURL));
                                setTimeout(function () { obj.find('#F1').trigger('click'); }, 500)
                        } else if (parseInt(formSettings.emailSettting) == 2) {
                                setTimeout(function () { obj.find('#F2').trigger('click'); }, 500)
                        }
                        else if (parseInt(formSettings.emailSettting) == 3) {
                                obj.find('textarea[name=myHTML]').val(_this.decode(formSettings.myHTML));
                                setTimeout(function () { obj.find('#F3').trigger('click'); }, 500)
                        }
                        if (formSettings.sendAlertEmail == "Y") {
                                obj.find('input[name=alertEmail]').removeAttr('disabled').val(formSettings.alertEmail);
                                if (obj.find('form input[name=isAlert]').prop("checked") == false) { obj.find('input:checkbox[name=isAlert]').trigger('click') };
                        }
                        if (formSettings.sendConfirmationEmail == "Y") {
                                obj.find('input[name=confirmationEmail]').removeAttr('disabled').val(formSettings.confirmationEmail);
                                obj.find('textarea[name=confirmationText]').val(formSettings.confirmationTEXT).removeAttr('disabled');
                                if (obj.find('form input[name=isConfirmation]').prop("checked") == false) { obj.find('input:checkbox[name=isConfirmation]').trigger('click') };
                        }

                        obj.find('.forwardTypeH input:radio[name=forwardType]').bind('click', function (event) {
                                if ($(event.target).attr('id') == 'F1') {
                                        obj.find('#surl').show();
                                        obj.find('#surl input').focus();
                                        obj.find('#furl').show();
                                        obj.find('#mhtml').hide();
                                        obj.find('#ftf').hide();
                                } else if ($(event.target).attr('id') == 'F2') {
                                        obj.find('#surl input').val('');
                                        obj.find('#surl').hide();
                                        obj.find('#furl input').val('');
                                        obj.find('#surl input').val('');
                                        obj.find('#furl').hide();
                                        obj.find('#mhtml').hide();
                                        obj.find('#ftf').show();
                                } else {
                                        obj.find('#surl').hide();
                                        obj.find('#furl').hide();
                                        obj.find('#furl input').val('');
                                        obj.find('#surl input').val('');
                                        obj.find('#mhtml').show();
                                        obj.find('#ftf').hide();
                                }
                        });
                        obj.find('input:checkbox[name=isAlert]').bind('click', function (event) {
                                if ($(this).prop("checked")) {
                                        obj.find('input[name=alertEmail]').removeAttr('disabled');
                                } else {
                                        obj.find('input[name=alertEmail]').attr('disabled', 'disabled');
                                }
                        });
                        obj.find('input:checkbox[name=isConfirmation]').bind('click', function (event) {
                                if ($(this).prop("checked")) {
                                        obj.find('input[name=confirmationEmail]').removeAttr('disabled');
                                        obj.find('textarea[name=confirmationText]').removeAttr('disabled');
                                } else {
                                        obj.find('input[name=confirmationEmail]').attr('disabled', 'disabled');
                                        obj.find('textarea[name=confirmationText]').attr('disabled', 'disabled').val('You have successfully subscribed to the services offered.');
                                }
                        });
                },
                loadData: function () {
                        var URL = this.options.baseUrl + "/json/metadata.jsp?type=merge_tags";
                        var _this = this;
                        try {
                                this.getAjaxCORS({ url: URL, isServerReq: true }, $.proxy(function (data) {
                                        //console.log(data);
                                        var result = data;
                                        _this.options.mergeTags = data;
                                        for (var i = 0; i < result.length; i++) {
                                                var category = result[i][2] == 'true' ? "Basic Fields" : "Custom Fields";
                                                _this.options.keyWordsList.push(jQuery.parseJSON("{\"label\":\"" + result[i][1] + "\",\"category\":\"" + category + "\"}"));
                                        }
                                }, this));
                        }
                        catch (e) { }
                        if (_this.$element.find("#sfEntity").val() !== "N") {
                                // $("#salesforce_checkbox").iCheck('check');
                                _this.$element.find("select[name='salesforce']").val((_this.$element.find("#sfEntity").val() == "L") ? "1" : "2");
                                _this.$element.find("select[name='salesforce']").attr("disabled", false);
                                //mainView.loadSalesEntitiesLink();
                        }

                },
                liveLoading: function () {
                        var $w = $(window);
                        var th = 200;
                        var self = this;
                        var inview = self.$element.find(".mks-webform-listings table tr:last").filter(function () {
                                var $e = $(this),
                                        wt = $w.scrollTop(),
                                        wb = wt + $w.height(),
                                        et = $e.offset().top,
                                        eb = et + $e.height();
                                return eb >= wt - th && et <= wb + th;
                        });
                        if (inview.length && inview.attr("data-load") && self.$element.find(".mks-webform-listings").height() > 0) {
                                inview.removeAttr("data-load");
                                //self.type = 'search';
                                self.$element.find(".mks-webform-listings table").append('<tr class="loading-campagins"><td colspan="6"><div class="loadmore"><div class="loading_gif"></div><p>Please wait, loading more forms.</p></div></td></tr>');
                                self.getFormList(self.options.offsetLength);
                        }
                },
                addhttp:function(url) {
                       if (!/^(f|ht)tps?:\/\//i.test(url)) {
                          url = "http://" + url;
                       }
                       return url;
                    },
                listLiveLoading: function () {
                        var $w = $(window);
                        var th = 200;
                        var self = this;
                        var inview = self.$element.find("#mailLists li:last").filter(function () {
                                var $e = $(this),
                                        wt = $w.scrollTop(),
                                        wb = wt + $w.height(),
                                        et = $e.offset().top,
                                        eb = et + $e.height();
                                return eb >= wt - th && et <= wb + th;
                        });
                        if (inview.length && inview.attr("data-load") && self.$element.find("#mailLists").height() > 0) {
                                inview.removeAttr("data-load");
                                //self.type = 'search';
                                self.$element.find("#mailLists").append('<li class="loading-campagins"><div class="loadmore"><div class="loading_gif"></div><p>Please wait, loading more lists.</p></div></li>');
                                self.loadLists(self.options.listoffsetLength);
                        }
                },
                attachSingleRowEvents: function () {
                        var self = this;
                        self.$element.find(".deletelistform").unbind("click");
                        self.$element.find('.deletelistform').bind("click", function (event) {
                                if (this.tagName.toLowerCase() == "i") {
                                        return;
                                        var form_id = $(this).parent().attr('formid');
                                } else {
                                        var form_id = $(this).attr('formid');
                                }
                                var formName = $(this).parents('tr').find('td:first-child').text()
                                var r = confirm("Are you want to delete : " + formName + " form?");
                                if (r == true) {
                                        self.showSLoading('Deleting ' + formName + ' ...', $('.mks-webform-listings'));
                                        self.DeleteForm(form_id);
                                } else {
                                        return false;
                                }

                        });
                        self.$element.find('.edit-form').unbind('click');
                        self.$element.find('.edit-form').bind("click", function (event) {
                                if (this.tagName.toLowerCase() == "i") {
                                        return;
                                        var form_id = $(this).parent().attr('formid');
                                } else {
                                        var form_id = $(this).attr('formid');
                                }
                                self.options.formId = form_id;
                                self.$element.find('.formarea').html('<div class="formareacontents"><div id="emptyContents" class="nocontent div-zone" style="width:412px;display: block;"><div class="empty-text">Drop element here</div></div><ul id="formheader"></ul><ul id="formcontents" class="startform" style="display:none;"></ul><ul id="formfooter"></ul></div>')
                                self.$element.find('.mks-creat-listing-wrapper').hide();
                                if(self.options.defaultflags.hideContent){
                                    self.$element.find('.campaign-content .contents').css('visibility','hidden');
                                    self.options.defaultflags['hideContent']=false;
                                }
                                self.$element.find('.campaign-content').show();
                               // self.$element.find('.mks-back-listing-btn').show();
                                self.resetFormSettings();
                                self.loadForm();
                        });
                        self.$element.find(".showtooltip").tooltip({
                                'placement': 'bottom',
                                delay: { show: 0, hide: 0 },
                                animation: false,
                                tooltipClass: "tooltip bottom in",
                                position: {
                                        my: "center bottom+30",
                                        at: "center bottom",
                                        using: function (position, feedback) {
                                                $(this).css(position);
                                                $("<div>")
                                                        .addClass("tooltip-arrow")
                                                        .addClass(feedback.vertical)
                                                        .addClass(feedback.horizontal)
                                                        .appendTo(this);
                                        }
                                }
                        });
                        self.$element.find(".shortcodelinks").click(function(){
                          if (!$(this).hasClass("ui-button-disabled")) {
                                  self.$element.parents('body').find("#shortRowcode").dialog("open");
                                  var shortCode = '[wpmks_form formid="'+$(this).attr('form-url')+'" width="300" height="400"]';
                                  self.$element.parents('body').find('#shortRowcodeSnippet').val(shortCode);
                          }
                        })
                        self.$element.find(".embed_code").click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.$element.parents('body').find("#embedRowcode").dialog("open");
                                        self.$element.parents('body').find('#CodeSnippet').val($(this).find('textarea').val());
                                }
                        });
                        self.$element.find(".formlinks").click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.$element.parents('body').find("#targetformurl").dialog("open");
                                        self.$element.parents('body').find('#rowLink').val($(this).attr('form-url'));
                                        self.$element.parents('body').find('#frmIframeSnippetRow').val('<iframe src="' + $(this).attr('form-url') + '" frameborder="0" style="width:400px;height:600px"></iframe>');
                                }
                        });

                        self.$element.find(".preview-form").click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {

                                        self.$element.parents('body').find("#previewformurl").dialog({
                                                                                                        title: 'Singup Form : '+$(this).html()
                                                                                                   }).dialog("open");
                                       var purl =  $(this).attr('form-purl');
                                        self.$element.parents('body').find('#previewformurl').html('<iframe src="' + purl + '" frameborder="0" class="email-iframe" style="height: 512px;"></iframe>');
                                }
                        });
                        self.$element.parents('body').find("#frmIframeSnippetRow,#rowLink,#CodeSnippet,#shortRowcodeSnippet").mousedown(function (event) {

                                $(this).select().focus();
                                event.stopPropagation();
                                event.preventDefault();
                        })

                },
                showLoading: function (msg, opt) {
                        var innerWidth = (opt.iWidth) ? 'width:' + opt.iWidth + 'px' : '';
                        return "<div id='" + opt.id + "' class='imgLoading' style='height:" + opt.h + "px; width: " + opt.w + "px;top:0px;left:0px;z-index:100000'><div class='centerpics' style='left:45%;" + innerWidth + "'>" + msg + "&nbsp;<img class='vam' src='/pms/img/newui/processing2.gif'></div></div>"
                },
                hideLoading: function (id) {
                        this.$element.find("#" + id).find('.loading').remove();
                },
                removeLoading: function (container) {
                        this.$element.find('.loading').remove();
                },
                showSLoading: function (message, container) {
                        $('.loading').remove();
                        container.append('<div class="loading"><p style="">' + message + '</p></div>');
                },
                resetFormSettings: function () {
                        this.$element.find('.campaign-content').remove();
                        this.$element.find('.create_new').remove();
                        this.$element.find("#accordion-form").accordion("destroy");
                        this.options.defaultflags['lists'] = true;
                        this.options.defaultflags['hideContent'] = true;
                        this.options.islistLiveLoading = false;
                        this.$element.find('.mks-webform-wrapper').append(this.options.defaultTemplate.campign_content);
                        this.$element.find('.mks-webform-listings').before(this.options.defaultTemplate.create_new);
                },
                hideBox: function () {
                        this.dialog.remove()
                }
                , getOptions: function (options) {
                        options = $.extend({}, $.fn.formbuilder.defaults, options);
                        return options
                },
                attachEvents: function () {
                        var self = this;
                        self.$element.find("#save_form").button({
                                icons: {
                                        primary: "save"
                                }
                        });
                        self.$element.find('.backlist').click(function () {
                                self.$element.find('.campaign-content').hide();
                                self.$element.find('.mks-creat-listing-wrapper').show();

                        });
                        self.$element.find('.serachJList').keyup(function (event) {
                                var search_from_name = $(this).val();
                                if (search_from_name.length > 3) {
                                        self.showSLoading('Searching...', self.$element.find('#mailLists'));
                                        self.loadLists(0, search_from_name);
                                        $(this).parent().find('.clearJsearch').show();
                                } else if (search_from_name.length == 0) {
                                        self.showSLoading('Searching...', self.$element.find('#mailLists'));
                                        self.loadLists(0);
                                        $(this).parent().find('.clearJsearch').hide();
                                }


                        });
                        self.$element.find('.clearJsearch').click(function(){
                            self.$element.find('.serachJList').val('');
                            self.showSLoading('Loading Lists...', self.$element.find('#mailLists'));
                           self.loadLists(0);
                           $(this).hide();
                        })
                        self.$element.find('#clearsearch').click(function () {
                                self.$element.find('#search_form').val('');
                                self.showSLoading('Loading Forms...', $('.mks-webform-listings'));
                                self.getFormList(0);
                                $(this).hide();
                        })

                        self.$element.find("#update_form").button();
                        self.$element.find("#setting_form").bind('click', function () {
                                self.createProperties("form", "_form");
                                if ($(window).height() < 560) {
                                        self.$element.find(".windowcontent").css("height", ($(window).height() - 130) + "px");
                                }
                              self.$element.parents('body').find("#elementProperties").dialog("open");
                        });
                        self.$element.find("#sales_assignment_btn").click(function () {
                                if ($(this).attr('disabled') !== "disabled"); {
                                        self.addSalesAssignment();
                                }

                        });
                        self.$element.find("#embed_form").button({
                                icons: {
                                        primary: "html"
                                }
                                , text: false
                                , disabled: true

                        });
                        self.$element.find("#formcode").click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.$element.parents('body').find("#embedcode").dialog("open");
                                }
                        });
                        self.$element.find("#wpshortcode").click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.$element.parents('body').find("#shortcode").dialog("open");
                                }
                        });
                        self.$element.find("#wpcsvupload").click(function () {
                          if($(this).hasClass('disabledattr')){
                            self.showMessage('You have 0 contacts/submitters for this form',true);
                          }else{
                            var plgsrc = $('#plg-src-path').val();
                            self.$element.find(".csvg").effect("bounce", { times: 5 }, 500);
                            $('body .csviframe').remove();
                            $('body').append('<iframe class="csviframe" src="'+plgsrc+'inc/csv_generator.php?BMS_REQ_TK='+self.options.BMS_REQ_TK+'&userId='+self.options.userId+'&formId='+self.options.formSettings['formId.encode']+'" style="display:none;"></iframe>');
                            $('.csviframe').on('load', function(){
                                  setTimeout(function () {self.$element.find(".csvg").hide()},900);
                                  //console.log('load the iframe')
                              });
                          }

                        });
                        self.$element.find('.previewurldb').unbind('click');
                        self.$element.find(".previewurldb").click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.$element.parents('body').find("#previewsingleurl").dialog({
                                                                                                        title: 'Singup Form : '+ self.options.formSettings.name
                                                                                                   }).dialog("open");
                                       var purl =  self.options.formSettings.formPreviewURL;
                                       //console.log('FOrm Preview url : '+  purl);
                                       if(purl){
                                           self.$element.parents('body').find('#previewsingleurl').html('<iframe src="' + purl + '?preview=Y" frameborder="0" class="email-iframe" style="height: 512px;"></iframe>');

                                       }else{
                                           self.$element.parents('body').find('#previewsingleurl').html('<p>Form is not saved yet! please press save button</p>');
                                       }
                                }
                        });
                        self.$element.find("#target_form").button({
                                icons: {
                                        primary: "link"
                                }
                                , text: false
                                , disabled: true

                        });
                        self.$element.find("#formlink").click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.$element.parents('body').find("#targetcode").dialog("open");
                                }
                        });
                        self.$element.find("#deleteformbtn").button({
                                icons: {
                                        primary: "trash"
                                }
                                , text: false
                                , disabled: true

                        }).click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.delete_form();
                                }
                        });
                        self.$element.find("#preview_form").button({
                                icons: {
                                        primary: "icon-search"
                                },
                                text: false
                                , disabled: true
                        }).click(function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        var link = previewURL;
                                        window.open(link, 'FRM.BLD.PR', 'width=900,height=650,left=50,top=50,screenX=100,screenY=100,scrollbars=yes,resizable=yes,status=yes');
                                }
                        });
                        self.$element.find("#closebtn").button({
                                text: true,
                                icons: {
                                        primary: "ui-icon-close"
                                }
                        }).click(function () {
                                window.close();
                        });
                        self.$element.find("#salesRepPicker").change(function () {
                                if(parseInt($(this).val())== -1){
                                     self.$element.find('#sales_assignment_btn').attr('disabled','disabled')
                                     self.$element.find('#sales_assignment_btn').addClass('ui-button-disabled')
                                }
                                else if ($(this).val() && self.$element.find("#html_salesRep input").val() !== $(this).val()) {
                                        self.$element.find("#sales_assignment_btn").removeAttr("disabled");
                                        self.$element.find("#sales_assignment_btn").removeClass("ui-button-disabled");
                                }
                                else {
                                        self.$element.find("#sales_assignment_btn").attr("disabled", "disabled");
                                        self.$element.find("#sales_assignment_btn").addClass("ui-button-disabled");
                                }
                        });
                        self.$element.find(".save-form").click($.proxy(function () { self.save() }, this)); // NEED to Manage
                        self.$element.find("#update_form").click($.proxy(self.updateLandingPage, self));
                        self.$element.find("#loadformbtn").click($.proxy(self.loadForm, self));
                        self.$element.find("#newformbtn").click($.proxy(self.newForm, self));
                        self.$element.find("#setting_tab").click($.proxy(self.loadSettings, self));
                        self.$element.find("#formbuilder_tab").click($.proxy(self.loadFormBuilder, self));
                        self.$element.parents('body').find("#show_advance").unbind('click');
                        self.$element.parents('body').find("#show_advance").bind('click',function () {
                                if (self.$element.parents('body').find("#advance_settings").css("display") == "none") {
                                        self.$element.parents('body').find("#advance_settings").fadeIn();
                                        self.$element.parents('body').find(this).html("<i class='icon-minus-sign'></i> Hide Advance Settings");
                                }
                                else {
                                        self.$element.parents('body').find("#advance_settings").fadeOut();
                                        $(this).html("<i class='icon-plus-sign'></i> Show Advance Settings");
                                }
                        });
                        self.$element.find("select[name='salesforce']").change($.proxy(self.loadSalesforceFields, self));
                        self.$element.find("#fname").change(function () {
                                if ($(this).val() !== "") {
                                        self.save(true); //NEED to manage
                                }
                        })
                        self.$element.find('input#salesforce_checkbox').click(function () {
                                //checkboxClass: 'checkinput'
                                //}).on("ifChecked",function(e){
                                if ($(this).prop("checked")) {
                                        $("select[name='salesforce'],#salesforce_source").attr("disabled", false);
                                        self.loadSalesEntities();
                                } else {
                                        self.$element.find("select[name='salesforce'],#salesforce_source").attr("disabled", true);
                                        //$("select[name='salesforce']").trigger("chosen:updated");
                                        self.$element.find("#accordion-form li.salesforce_field").remove();
                                        self.$element.find("#sfEntity").val('N');
                                        self.$element.find("#source").val(''); $("#salesforce_source").val("-1");
                                        self.$element.find(".loadFields").remove();
                                }

                        })
                        /*.on("ifUnchecked",function(e){
                         $("select[name='salesforce'],#salesforce_source").attr("disabled",true);
                         $("select[name='salesforce']").trigger("chosen:updated");
                         $("#accordion-form li.salesforce_field").remove();
                         $("#sfEntity").val('N');
                         $("#source").val('');$("#salesforce_source").val("-1");
                         $(".loadFields").remove();
                         })*/

                        //$("select[name='salesforce']").chosen({disable_search_threshold: 5,width:"155px",fixCallBack:mainView.fixShowSelect});
                        //$("select#salesRepPicker").chosen({disable_search_threshold: 5,width:"185px"});

                        self.$element.find("#fwdsettingsbtn").click(function () {
                                if ($(window).height() < 560) {
                                        self.$element.find("#forwardSettingContainer").css("height", ($(window).height() - 130) + "px");
                                }
                                //self.$element.find("#settings_iframe").attr("src",settingURL+$("#mformId").val()+"&isNewBuilder=true");
                                $('body').find("#forwardSettings").dialog("open");
                        });
                        self.$element.find(".serachList").keyup(function () {
                                var container = $(this).attr("data-search");
                                var searchValue = $.trim($(this).val());
                                if (searchValue) {
                                        self.$element.find("#" + container).find("li").hide();
                                        self.$element.find("#" + container).find("li").filter(function () {
                                                if ($(this).text().toLowerCase().indexOf(searchValue) > - 1) {
                                                        return $(this);
                                                }
                                        }).show();
                                        self.$element.find("#" + container).find("li").each(function (i) {
                                                $(this).removeHighlight().highlight(searchValue);
                                        });
                                        self.$element.find("#" + container).find(".clearsearch").show();
                                }
                                else {
                                        self.$element.find("#" + container).find("li").show();
                                        self.$element.find("#" + container).find(".clearsearch").hide();
                                        self.$element.find("#" + container).find("li").each(function (i) {
                                                $(this).removeHighlight()
                                        });
                                }


                        })

                        self.reAttachEvents();
                        self.$element.find(".clearsearch").click(function () {
                                $(this).hide();
                                $(this).prev().val('');
                                var container = $(this).prev().attr("data-search");
                                self.$element.find("#" + container).find("li").show();
                                self.$element.find("#" + container).find("li").each(function (i) {
                                        $(this).removeHighlight()
                                });
                        });
                        self.$element.find(".showtooltip").tooltip({
                                'placement': 'bottom',
                                delay: { show: 0, hide: 0 },
                                animation: false,
                                tooltipClass: "tooltip bottom in",
                                position: {
                                        my: "center bottom+30",
                                        at: "center bottom",
                                        using: function (position, feedback) {
                                                $(this).css(position);
                                                $("<div>")
                                                        .addClass("tooltip-arrow")
                                                        .addClass(feedback.vertical)
                                                        .addClass(feedback.horizontal)
                                                        .appendTo(this);
                                        }
                                }
                        });
                        self.$element.parents('body').find("#frmSnippet,#frmIframeSnippet,.targeturl,#shortcodeSnippet").mousedown(function (event) {

                                $(this).select().focus();
                                event.stopPropagation();
                                event.preventDefault();
                        })

                },
                /////////////////////////////////////////
                //// Tooltip for Left section of builder
                ///////////////////////////////////////
                initShowToolTip : function(classOption){

                  this.$element.find('.'+classOption).tooltip({
                                //'placement': 'right',
                                delay: { show: 0, hide: 0 },
                                animation: false,
                                tooltipClass: "tooltip bottom in hidearrow",
                                track: true,
                                hide:false,
                                position: {
                                        my: "left+30 center",
                                        at: "right center",
                                        using: function (position, feedback) {
                                                $(this).css(position);
                                                $("<div>")
                                                        .addClass("tooltip-arrow")
                                                        .addClass(feedback.vertical)
                                                        .addClass(feedback.horizontal)
                                                        .appendTo(this);
                                        }
                                }
                        });
                },
                /*===========
                 * Reattach Events
                 *===========*/
                reAttachEvents: function () {
                        var self = this;
                        self.$element.parents('body').find(".create-button").unbind('click');
                        self.$element.parents('body').find('.create-button').bind('click', function (event) {
                                var from_name = $(this).parent().find('input.field-text').val();
                                if (!$(this).hasClass('saving')) {
                                    if (from_name) {
                                            $(this).addClass('saving');
                                            self.createNewForm(from_name);
                                            $(this).parents('#createNew').find('.inputcont').removeClass('errorwpf');
                                            $(this).parents('#createNew').find('.errortext').hide();
                                    } else {
                                            $(this).parents('#createNew').find('.inputcont').addClass('errorwpf');
                                            $(this).parents('#createNew').find('.errortext').show();
                                          //  alert("Form name can't be empty");
                                    }
                                }
                        });
                        self.$element.find(".create_new").unbind('click');
                        self.$element.find(".create_new").bind('click', function () {
                                if (!$(this).hasClass("ui-button-disabled")) {
                                        self.$element.parents('body').find("#createNew").dialog("open");
                                }
                        });
                        self.$element.parents('body').find('#createNew').find('input.field-text').unbind('keyup');
                        self.$element.parents('body').find('#createNew').find('input.field-text').bind('keyup', function (event) {
                                if (event.keyCode == 13) {
                                        var from_name = $(this).val();
                                        if(from_name !== ""){
                                          $(this).parents('#createNew').find('.create-button').addClass('saving');
                                          $(this).parents('#createNew').find('.inputcont').removeClass('errorwpf');
                                          $(this).parents('#createNew').find('.errortext').hide();
                                          self.createNewForm(from_name);
                                        }else{
                                          $(this).parents('#createNew').find('.inputcont').addClass('errorwpf');
                                          $(this).parents('#createNew').find('.errortext').show();
                                        }

                                }
                        });
                        self.$element.parents('body').find('#search_form').unbind('keyup');
                        self.$element.find('#search_form').keyup(function (event) {
                                var search_from_name = $(this).parent().find('input.field-text').val();
                                if (search_from_name.length > 3) {
                                        self.showSLoading('Searching...', self.$element.find('.mks-webform-listings'));
                                        self.getFormList(0, search_from_name);
                                        $('#clearsearch').show();
                                } else if (search_from_name.length == 0) {
                                        self.getFormList(0);
                                        $('#clearsearch').hide();
                                }
                      if(self.options.pluginType=="cdn"){
                            self.$element.find('#wpf-logout').unbind('click');
                            self.$element.find('#wpf-logout').bind('click',function(){
                                $.cookie('bmsToken','');
                                window.location="login.html";
                            });
                        }

                        });

                },
                /*====================
                 * ScrollToTop events
                 * ====================*/
                scrollTop:function(){
                     if ($(window).scrollTop()>50) {
                           this.$element.parent().find(".ScrollToTop").fadeIn('slow');
                        } else {
                           this.$element.parent().find(".ScrollToTop").fadeOut('slow');
                     }
                },
                scrollToTop:function(){
                $("html,body").css('height','100%').animate({scrollTop:0},600).css("height","");
                },
                /*====================
                 * Create New Form
                 * ====================*/
                createNewForm: function (fromName) {

                        var URL = this.options.baseUrl + '/io/form/saveSignUpFormData/';
                        var self = this;
                        var data = { 'type': 'create', 'name': fromName, 'BMS_REQ_TK': this.options.BMS_REQ_TK, 'ukey': this.options.ukey, 'isMobileLogin': 'Y', 'userId': this.options.userId }

                        self.postAjaxCall(URL, data, function (data) {
                                var fields = eval(data);
                                if (data[0] == "err") {

                                        self.$element.parents('body').find("#createNew .create-button").removeClass('saving');
                                        //self.$element.parents('body').find("#createNew").dialog("close");
                                        self.showMessage('Form name already exists',true);
                                } else {

                                        self.offsetLength = 0;
                                        self.$element.parents('body').find("#createNew").dialog("close");
                                        self.showSLoading('Loading Form...', $('.mks-webform-listings'));
                                        self.getFormList();
                                        self.$element.find('.mks-back-listing-btn').show();
                                        self.$element.find('.mks-creat-listing-wrapper').hide();
                                        self.$element.find('.formarea').html('<div class="formareacontents"><div id="emptyContents" class="nocontent div-zone" style="width:412px;display: block;"><div class="empty-text">Drop element here</div></div><ul id="formheader"></ul><ul id="formcontents" class="startform" style="display:none;"></ul><ul id="formfooter"></ul></div>')
                                        self.options.formId = data[1];
                                        self.showMessage('New signup form has been created successfuly',false);
                                        self.$element.find('.campaign-content').show();
                                        self.resetFormSettings();
                                        self.loadForm();
                                }
                                self.$element.parents('body').find("#createNew .create-button").removeClass('saving');
                        });
                },
                /*====================
                 * Delete Form
                 *====================*/
                DeleteForm: function (fromId) {
                        if (fromId) {
                                var URL = this.options.baseUrl + '/io/form/saveSignUpFormData/';
                                var self = this;
                                var data = { 'type': 'delete', 'formId': fromId, 'BMS_REQ_TK': this.options.BMS_REQ_TK, 'ukey': this.options.ukey, 'isMobileLogin': 'Y', 'userId': this.options.userId };
                                // console.log(data);
                                self.postAjaxCall(URL, data, function (data) {
                                        var fields = eval(data);
                                        self.offsetLength = 0;
                                        self.showLoading('Loading Form...', self.$element.find('.mks-webform-listings'));
                                        self.getFormList();
                                });
                        }

                },
                imageLoading: function () {
                        var images = ["img/glyphicons-halflings-white.png"];
                        $(images).each(function (i, v) {
                                var image = $('<img />').attr('src', v);
                        });
                },
                /*====================
                 * Get list of froms
                 * ====================*/
                getFormList: function (fcount, searchText) {

                        var tableHTMl;
                        var searchText = (searchText) ? searchText : '';
                        var self = this;
                        if (!fcount) {
                                this.options.offset = 0;
                        } else {
                                this.options.offset = this.options.offsetLength;
                        }
                        //console.log(this.options.offset);
                        if (self.requestFetch) {
                                self.requestFetch.abort();
                        }
                        var URL = this.options.baseUrl + '/io/form/getSignUpFormData/?type=search&searchText=' + searchText + '&offset=' + self.options.offset;
                        this.getAjaxCORS({ url: URL, isServerReq: true }, $.proxy(function (data) {
                                var data = JSON.parse(data);
                                if (data[0] !== "err") {

                                        //console.log(data);
                                        if (parseInt(data.totalCount) > 0) {
                                                self.$element.find('#total_templates .badge').html(data.totalCount);
                                                $.each(data.forms, function (key, formsval) {
                                                        $.each(formsval, function (key, values) {
                                                          var shortCode = values[0]["formPreviewURL"];

                                                          var res = shortCode.split('/')[5];

                                                                if (tableHTMl) {
                                                                        tableHTMl += '<tr><td width="75%"><a form-purl="' + values[0]["formPreviewURL"] + '?preview=Y" class="preview-form showtooltip" title="Click to preivew form">' + values[0].name + '</a></td><td width="25%"><a class="btn-green right edit-form showtooltip" title="Click to edit form" formid=' + values[0]["formId.encode"] + '><i class="icon edit"></i></a><a class="btn-blue right embed_code showtooltip" title="Click to view embed code"  form-snippet=' + values[0]["formId.encode"] + '><textarea  style="display:none;">' + values[0]["snippet"] + '</textarea><i class="icon embed24"></i></a><a class="btn-blue right formlinks showtooltip" form-url ="' + values[0]["formPreviewURL"] + '" title="Click to view form links"><i class="icon link24"></i></a><a style="display:none;" class="btn-blue right shortcodelinks showtooltip" form-url ="'+res+'" title="Click to view form shortcode"><i class="icon shortcode24"></i></a><a class="btn-red right deletelistform showtooltip" title="Click to delete form" formid=' + values[0]["formId.encode"] + '><i class="icon delete"></i></a></td></tr>';
                                                                } else {
                                                                        tableHTMl = '<tr><td width="75%" ><a form-purl="' + values[0]["formPreviewURL"] + '?preview=Y" class="preview-form showtooltip" title="Click to preivew form">' + values[0].name + '</a></td><td width="25%"><a class="btn-green right edit-form showtooltip" title="Click to edit form" formid=' + values[0]["formId.encode"] + '><i class="icon edit"></i></a><a class="btn-blue right embed_code showtooltip" title="Click to view embed code" form-snippet=' + values[0]["formId.encode"] + '><textarea style="display:none;">' + values[0]["snippet"] + '</textarea><i class="icon embed24"></i></a><a class="btn-blue right formlinks showtooltip" form-url ="' + values[0]["formPreviewURL"] + '" title="Click to view form links"><i class="icon link24"></i></a><a style="display:none;" class="btn-blue right shortcodelinks showtooltip" form-url ="'+res+'" title="Click to view form shortcode"><i class="icon shortcode24"></i></a><a class="btn-red right deletelistform showtooltip" title="Click to delete form" formid=' + values[0]["formId.encode"] + '><i class="icon delete"></i></a></td></tr>'
                                                                }

                                                        })
                                                });
                                                self.options.offsetLength = data.nextOffset;
                                                if (self.options.offset == 0) {
                                                        self.$element.find('.mks-webform-listings table').html('');
                                                }

                                                self.$element.find('.mks-webform-listings table').append(tableHTMl);
                                                if(self.options.pluginType=="wordpress"){
                                                  self.$element.find('.mks-webform-listings table .shortcodelinks').show();
                                                }
                                                /*=========Resize height of listings=========*/
                                                var Height = $(document).outerHeight()-(self.$element.find('.mks-webform-listings').offset().top + self.$element.find('#total_templates').outerHeight());
                                                self.$element.find('.mks-webform-listings').css('max-height',Height+'px')
                                                self.removeLoading();
                                                self.attachSingleRowEvents();
                                                self.$element.find('.mks-webform-listings table .loading-campagins').remove();
                                                if (self.$element.find('.mks-webform-listings table tr').length < parseInt(data.totalCount)) {
                                                        self.$element.find(".mks-webform-listings table tr:last-child").attr("data-load", "true");
                                                }
                                                $.each(self.$element.find(".mks-webform-listings table tr td:first-child"), function (key, val) {
                                                        $(val).highlight($.trim(searchText));
                                                })
                                                $(window).scroll(function(){
                                                  self.scrollTop();
                                                })
                                                self.$element.parent().find('.ScrollToTop').click(function(){
                                                  self.scrollToTop();
                                                });
                                        } else {
                                                self.removeLoading();
                                                self.$element.find('.mks-webform-listings table').html('<p class="notfound">No Forms found ' + searchText + '</p>');
                                        }
                                } else {
                                        self.showMessage(data[1],true);
                                }

                                self.removeLoading();
                        }, this))

                },
                /*======================================
                 * Load Lists in Live Loading and Search List
                 * ======================================*/
                loadLists: function (fcount, searchText) {

                        var searchText = (searchText) ? searchText : '';
                        var self = this;
                        if (!fcount) {
                                this.options.listoffset = 0;
                        } else {
                                this.options.listoffset = this.options.listoffsetLength;
                        }

                        if (self.requestFetch) {
                                self.requestFetch.abort();
                        }
                        var li = '';
                        var URL = this.options.baseUrl + "/io/list/getListData/?type=batches&offset=" + self.options.listoffset + "&searchText=" + searchText;
                        this.getAjaxCORS({ url: URL, isServerReq: true }, $.proxy(function (data) {
                                //console.log(data);
                                var data = JSON.parse(data);
                                if (self.options.listoffset == 0) {
                                        self.$element.find('#mailLists li').remove();
                                }
                                if(parseInt(data.totalCount) < 2 && !searchText){
                                    self.createList();
                                    return false;
                                }
                                var listsObj;

                                $.each(data.lists, function (key, listsval) {
                                        $.each(listsval, function (key, values) {
                                                if(values[0].isSupressList=="false"){
                                                    listsObj={'id' : values[0]['listNumber.encode'],'md5': values[0]['listNumber.checksum']};
                                                    self.options.mMailLists.push(listsObj);
                                                    li = '<li id="list_' + values[0]['listNumber.checksum'] + '" class="dragme showtooltipld"  title="Drag"';
                                                    li += ' fieldIndex="' + key + '"';
                                                    li += '>' + values[0].name + '</li>';
                                                    self.$element.find('#mailLists').append(li);
                                                }

                                        });

                                });


                                self.options.listoffsetLength = data.nextOffset;
                                self.$element.find('#mailLists .loading-campagins').remove();

                                self.removeLoading();
                                this.initShowToolTip('showtooltipld');
                                if (self.$element.find('#mailLists li').length < parseInt(data.totalCount)) {
                                        self.$element.find("#mailLists li:last-child").attr("data-load", "true");
                                }
                                self.initDragDrop();

                               if(self.$element.find('.formareacontents input[name=lists]').length > 0){
                                    $.each(self.$element.find('.formareacontents input[name=lists]'),function(key,val){
                                      self.control.draggedItem = $('#list_'+$(val).attr('id'));
                                      if(self.$element.find('#mailLists #list_'+$(val).attr('id')).length > 0){
                                          self.control.draggedItem.draggable("option", "disabled", true);
                                      }
                                    });



                                }
                                $.each(self.$element.find("#mailLists li"), function (key, val) {
                                        $(val).highlight($.trim(searchText));
                                })
                                if (!self.options.islistLiveLoading) {
                                        //console.log(self.options.islistLiveLoading);
                                        self.$element.find('#mailLists').scroll($.proxy(self.listLiveLoading, self));
                                        self.options.islistLiveLoading = true;
                                }


                        }, this));
                },

                /*=====================
                 * Create list if user if registered for first time
                 ====================*/
                 createList: function(){
                        var URL = this.options.baseUrl + '/io/list/saveListData/';

                        var self = this;
                        var data = { 'type': 'create', 'listName':'List_'+this.options.userId.split('@')[0] , 'BMS_REQ_TK': this.options.BMS_REQ_TK, 'ukey': this.options.ukey, 'isMobileLogin': 'Y', 'userId': this.options.userId }
                        self.postAjaxCall(URL, data, function (data) {
                                var fields = eval(data);
                                if (data[0] == "err") {

                                        self.$element.parents('body').find("#createNew .create-button").removeClass('saving');
                                        self.$element.parents('body').find("#createNew").dialog("close");
                                        self.showMessage('Form name already exists',true);
                                } else {

                                        self.loadLists(0);

                                }
                                //self.$element.parents('body').find("#createNew .create-button").removeClass('saving');
                        });
                 },

                /*====================
                 *
                 *
                 * Salesforce Modules
                 *
                 * entities
                 * fields
                 * sources
                 * ====================*/
                loadSalesEntities: function () {
                        var _this = this;
                        if (!_this.options.salesforce_fields) {
                                if (_this.$element.find("#salesforce_source").length == 0) {
                                        _this.loadSalesforceSource();
                                }
                                var c = _this.$element.find("li.salesforce").parent();
                                _this.$element.find(".loadFields").remove();
                                c.css("position", "relative");
                                _this.showSLoading('Loading salesforce...', _this.$element.find("li.salesforce").parent());
                                /*var transport = new easyXDM.Socket({
                                 remote:  window.location.protocol+'//'+SESSION_DOMAIN_NAME+'/pms/json/forms.jsp?action=sf_fields'+bms_token_var,
                                 onReady: function(){

                                 },
                                 onMessage: function(message, origin){
                                 mainView.salesforce_fields = jQuery.parseJSON(message);
                                 helper.hideLoading("salesforce__");
                                 mainView.loadSalesforceFields();
                                 $("iframe[id^='easyXDM_']").remove();
                                 }
                                 });*/
                                var URL = _this.options.baseUrl + "/json/forms.jsp?action=sf_fields&onlyJson=Y";
                                _this.getAjaxCORS({ url: URL, isServerReq: true }, $.proxy(function (data) {
                                        var data = JSON.parse(data);
                                        _this.options.salesforce_fields = data;
                                        _this.loadSalesforceFields();

                                }, this));
                                /* var entitesiframe = $('<iframe src="'+window.location.protocol+'//'+_this.options.formSettings.contentDomain+'/pms/json/forms.jsp?action=sf_fields&BMS_REQ_TK='+_this.options.BMS_REQ_TK+'&ukey='+_this.options.ukey+'&isMobileLogin=Y&userId='+_this.options.userId+'" frameborder="0" scrolling="no" style="width:1px;height:1px;" id="temp_salesforce_iframe"></iframe>');
                                 entitesiframe.load(function(){
                                 _this.hideLoading("salesforce__");
                                 _this.options.salesforce_fields = jQuery.parseJSON($(_this.$element.find("#temp_salesforce_iframe")[0].contentWindow.document.body).text());
                                 _this.loadSalesforceFields();
                                 });*/
                                //$("body").append(entitesiframe);
                        }
                        else {
                                _this.loadSalesforceFields();
                        }
                },
                loadSalesforceFields: function () {
                        var _this = this;
                        var selected_val = _this.$element.find("select[name='salesforce'] option:selected").val();
                        var flag = selected_val == "1" ? "lead" : "contact";
                        _this.$element.find("#sfEntity").val(selected_val == "1" ? 'L' : 'C');
                        var fields_array = _this.options.salesforce_fields;
                        var fields_html = "";
                        var used_salesforce_fields = [];
                        for (var i = 0; i < fields_array.length; i++) {
                                if (fields_array[i].type == flag) {
                                        if (_this.$element.find("#accordion-form #" + fields_array[i].personilzationText).length == 0) {
                                                fields_html += "<li id=\"" + fields_array[i].personilzationText + "\" class=\"dragme salesforce_field showtooltipsfd\"  title='Drag'>" + fields_array[i].fieldName + "</li>";
                                        }

                                        if ($(".formareacontents #" + fields_array[i].personilzationText).length > 0) {
                                                used_salesforce_fields.push(fields_array[i].personilzationText);
                                        }

                                }
                        }
                        _this.$element.find("#accordion-form li.salesforce_field").remove();

                        _this.$element.find("li.salesforce").parent().append($(fields_html));
                          _this.initShowToolTip('showtooltipsfd');
                        _this.$element.find("#accordion-form li.salesforce_field").draggable({
                                connectToSortable: ".formarea #formcontents",
                                //helper:"clone",
                                revert: "invalid",
                                opacity: 0.95,
                                cursor: "move",
                                scroll: true,
                                appendTo: 'body',
                                helper: function (event) {
                                        var ele_id = $(event.currentTarget).clone();
                                        return ele_id.addClass('moveable-ele moveable-li');
                                },
                                start: function (event) {
                                    _this.$element.find("#formcontents").addClass('my-draggable-class');
                                  //console.log('Drag Started by abdullah');
                                  if(_this.$element.find('.formareacontents #emptyContents').css('display') !== "block"){

                                    $.each(_this.$element.find('#formcontents li'),function(key,value){
                                        $(value).after('<li class="dragme ui-droparea">Drop element here.</li>');
                                    });
                                    _this.$element.find('#formcontents li').eq(0).before('<li class="dragme ui-droparea">Drop element here.</li>');
                                    _this.initDroppable();
                                  }

                                },
                                stop: function (event,ui) {
                                    _this.$element.find('#formcontents li.ui-droparea').remove();
                                    if(ui.helper.attr('id').indexOf("frmFld_customField") !== 0){
                                      _this.save(true);
                                    }
                                }
                        });
                        $(used_salesforce_fields).each(function (i, v) {
                                _this.$element.find("#accordion-form #" + v).draggable("option", "disabled", true);
                                _this.removeEle(v);
                        });
                        _this.removeLoading();
                        _this.save(true);
                },
                loadSalesforceSource: function () {
                        var URL = this.options.baseUrl + "/json/forms.jsp?action=sources";
                        var reqObj = { url: URL, isServerReq: true }
                        this.getAjaxCORS(reqObj, $.proxy(function (data) {
                                var result = data;
                                var source_html = "<div><select id=\"salesforce_source\" name=\"salesforce_source\" data-placeholder='Select Source'><option value='-1'>Select...</option>";
                                var select_val = this.$element.find("#source").val();
                                var _source = "";
                                for (var i = 0; i < result.length; i++) {

                                        _source = (select_val && result[i] == select_val) ? "selected='selected'" : "";
                                        source_html += "<option value='" + result[i] + "'  " + _source + ">" + result[i] + "</option>"
                                }
                                source_html += "</select></div>";
                                this.$element.find("li.salesforce div.div-salesforce").append($(source_html));
                                this.removeLoading();
                                //$("#salesforce_source").chosen({disable_search_threshold: 5,width:"231px",fixCallBack: mainView.fixShowSelect});
                                this.$element.find("#salesforce_source").change($.proxy(function () {
                                        if ($(this).val() !== "") {
                                                this.$element.find("#source").val($(this).val());
                                                this.save(true);
                                        }
                                }, this));
                                this.$element.find("li.salesforce").css({ "height": "83px", "margin-bottom": "5px" })
                        }, this));
                }
                ,
                /*
                 * Enable accordion fixed with scroll
                 */
                enableAccordion:function(){
                        var _this = this;
                       $(document).scroll(function(){
                           if(_this.$element.find('.campaign-content').offset().top < $(this).scrollTop()){

                               if(_this.options.pluginType=="wordpress"){var topBar = parseInt(_this.$element.find('.campaign-content').width()) + 20}
                               else{
                                 var topBar = parseInt(_this.$element.find('.campaign-content').width());
                               }
                               if(_this.$element.find('.topbar-fixed').hasClass('wpf-fixed') == false){

                                        _this.$element.find('.topbar-fixed').width(topBar).addClass('wpf-fixed');
                                     _this.$element.find('.leftbar').addClass('wpf-fixed');
                                    if(_this.options.pluginType=='wordpress'){
                                      _this.$element.find('.topbar-fixed').css({'left':'210px','z-index':'99999','top':'32px'});
                                      _this.$element.find('.leftbar').css('top','90px');
                                    } else{
                                      _this.$element.find('.topbar-fixed').css('left','25px');
                                    }
                                }

                               }else{
                                            _this.$element.find('.topbar-fixed').removeClass('wpf-fixed').removeAttr('style');
                                             _this.$element.find('.leftbar').removeClass('wpf-fixed');
                                        }

                                //console.log('Scroll Fix Bar : ' + _this.$element.find('.contents').offset().top + ' Scroll Top of Document : ' + $(this).scrollTop())
                          })
                },
                /*=====================================Dragable and sortable control with delete and edit option========================================================================================================*/
                initcontrol: function () {
                        var _this = this;
                        this.$element.find("#firstli").html(_this.toolbar);
                        this.control.li = this.$element.find("#formcontents li:first");
                        this.addObserver();
                },
                addObserver: function () {
                        var _this = this;
                        _this.control.li.find(".controlButtons .delete").click($.proxy(_this.delMe, _this));
                        _this.control.li.find(".controlButtons .setting").click($.proxy(_this.editControl, _this));
                        _this.control.li.find(".labelEdit").click($.proxy(_this.editLabel, _this));
                },
                delMe: function (event, ui) {
                        this.delControl($(event.target).parents("li"));
                },
                delControl: function (obj) {          /*Delete control li*/
                        var _this = this;
                        obj.hide("drop", 300, function () {
                                $(this).remove();
                                delete _this.options.fieldsArray[$(this).attr("id")];
                                _this.$element.find("#" + $(this).attr("id")).draggable("option", "disabled", false);
                                _this.setNoContents();
                                _this.$element.find("#" + $(this).attr("id")).find(".icon-trash").remove();
                                _this.resizeForm();
                                _this.save(true); // Need to manage
                        });
                },
                setNoContents: function () {
                        if (this.$element.find("#formcontents").children().length == 0) {
                                this.$element.find("#formcontents").css({ "display": "none" });
                                this.$element.find("#emptyContents").css("display", "block");
                                this.$element.find("#formcontents").removeClass("startform");
                        }
                },
                create: function (e, u, opt) {

                        var _this = this;
                        if (u && u.item) {
                                this.control.draggedItem = u.item;
                        }else if(u && u.draggable){
                          this.control.draggedItem = u.draggable;
                        }
                        var _id = (opt) ? opt.id : _this.control.li.attr("id");
                        var _type = (opt) ? opt.type : _this.getType(_id);
                        var _text = _this.control.li.html();
                        if (_id === "basic_dateOfBirth" && _text.indexOf("(yyyy-MM-dd)") == - 1) {
                                _text = _text + " (yyyy-MM-dd)";
                        }

                          if($(e.target)){
                            var clone_li = $('<li id="'+_this.control.li.attr('id')+'"></li>');
                            if($(e.target).attr('id') =="emptyContents"){
                                _this.$element.find('#formcontents').append(clone_li);
                            }else{
                                  $(e.target).before(clone_li);
                            }

                            _this.control.li = clone_li;
                          }




                          _this.control.li.html("");
                          _this.control.li.append(_this.creatHTML(_type, _text, _id));
                          _this.control.li.append(_this.toolbar());


                        _this.addObserver();
                        _this.initDragWithHandler();

                        _this.control.li.removeAttr('style');
                        _this.control.li.removeAttr('class');
                        /*Handle duplicate id's for control*/
                        if (e && u) {
                                var ctrl_id = _this.control.li.attr("id");
                                var controls_length = _this.$element.find("#formcontents [id^='" + ctrl_id + "']").length;
                                if (controls_length >= 2) {
                                        var control_id = 1;
                                        while (_this.$element.find("#formcontents #" + ctrl_id + "_" + control_id).length) {
                                                control_id = control_id + 1;
                                        }
                                        ctrl_id = _this.control.li.attr("id") + "_" + control_id;
                                        _this.control.li.attr("id", ctrl_id);
                                }

                                //Setting object to default
                                _this.options.fieldsArray[ctrl_id] = {};
                                _type = _type == "" ? "textfield" : _type;
                                var setting_obj = _this.control.setting_options[_type];
                                if (setting_obj) {
                                        for (var s = 0; s < setting_obj.length; s++) {
                                                for (var m = 0; m < setting_obj[s].length; m++) {
                                                        if (setting_obj[s][m]['key'] == 'label') {
                                                                _this.options.fieldsArray[ctrl_id][setting_obj[s][m]['key']] = _text;
                                                        }
                                                        else if (_this.options.fieldsArray["_form"][setting_obj[s][m]['key']]) {
                                                                _this.options.fieldsArray[ctrl_id][setting_obj[s][m]['key']] = _this.options.fieldsArray["_form"][setting_obj[s][m]['key']];
                                                        }
                                                        else {
                                                                _this.options.fieldsArray[ctrl_id][setting_obj[s][m]['key']] = "";
                                                        }

                                                }
                                        }
                                        _this.options.fieldsArray[ctrl_id]["type"] = _type;
                                        if (_id.split("_")[0] == "list") {
                                                _this.options.fieldsArray[ctrl_id]["name"] = "lists";
                                                _this.options.fieldsArray[ctrl_id]["default_value"] = _this.getListCode(_id.split("_")[1]);
                                        }
                                        else if (_id.split("_")[0] == "frmFld") {
                                                _this.options.fieldsArray[ctrl_id]["name"] = _id;
                                        }
                                        else {
                                                _this.options.fieldsArray[ctrl_id]["name"] = _id.split("_")[1];
                                        }
                                        if (_type == "heading") {
                                                _this.options.fieldsArray[ctrl_id]['font_size'] = "18";
                                                _this.options.fieldsArray[ctrl_id]['font_weight'] = "bold";
                                        }
                                        else if (_type == "custom_field") {
                                                _this.options.fieldsArray[ctrl_id]["name"] = "customField";
                                        }
                                }

                                if (ctrl_id.indexOf("frmFld_customField") == 0) {
                                        _this.createProperties(_type, ctrl_id);
                                        if ($(window).height() < 560) {
                                                _this.$element.find(".windowcontent").css("height", ($(window).height() - 130) + "px");
                                        }
                                        _this.$element.parents('body').find("#elementProperties").dialog("open");
                                        setTimeout(function () { _this.$element.find("#window_label").focus() }, 300);
                                }

                        }
                },
                createProperties: function (ctr_type, ctr_id) {
                        //Save the selected field id
                        this.options.selectedField = ctr_id;
                        this.$element.parents('body').find("#basic_settings,#advance_settings").children().remove();
                        var prp_fields = this.control.setting_options[ctr_type];
                        if (!prp_fields) {
                                prp_fields = this.control.setting_options["default"];
                        }
                        this.createFieldSettings(prp_fields[0], "basic_settings", ctr_id);
                        this.createFieldSettings(prp_fields[1], "advance_settings", ctr_id);
                        $('body').find("#prp_type").val(ctr_type);
                        var window_title = ctr_type == 'form' ? 'Form Settings' : 'Properties';
                        this.$element.parents('body').find("#ui-dialog-title-elementProperties").html(window_title);
                },
                createFieldSettings: function (fields, container, ctr_id) {
                        var fieldsHTML = "";
                        var field_obj = this.options.fieldsArray[ctr_id];
                        var _this = this;
                        for (var f = 0; f < fields.length; f++) {
                                var textareaHeight = (fields[f].type == "textarea") ? "textareaHeight" : "";
                                var hideControl = "";
                                if (((ctr_id === "basic_email" || ctr_id.substring(0, 4) == "list") && fields[f].key == "type") || (ctr_id.indexOf("frmFld_customField") == 0 && fields[f].key == "type") || (ctr_id.substring(0, 4) == "list" && fields[f].key == "options") || (ctr_id.substring(0, 4) == "list" && fields[f].key == "default_value")) {
                                        hideControl = "style='display:none'";
                                }
                                fieldsHTML += '<div class="control-group ' + textareaHeight + '" ' + hideControl + '><label class="control-label labeldialog">';
                                fieldsHTML += fields[f].name;
                                fieldsHTML += '<span class="prop-table-detail">' + fields[f].subheading + '</span></label>';
                                fieldsHTML += '<div class="controls controldialog">';
                                var val = typeof (field_obj[fields[f].key]) == "undefined" ? "" : field_obj[fields[f].key];
                                fieldsHTML += this.getFieldSetting(fields[f], val);
                                fieldsHTML += '</div>';
                                fieldsHTML += '</div>';
                        }
                        this.$element.parents('body').find("#" + container).html(fieldsHTML);
                        this.$element.parents('body').find("#" + container + " input[name='window_color']").jPicker({
                                window:
                                {
                                        expandable: true,
                                        position:
                                        {
                                                x: 'screenCenter',
                                                y: 'bottom'
                                        }
                                }
                        });
                        this.$element.parents('body').find("#window_default_value").catcomplete({

                                source: _this.options.keyWordsList,
                                minLength: 0,
                                delay: 0,
                                appendTo: "body",
                                select: function (e, ui) {

                                        var str = ui.item.value;
                                        var index = - 1;
                                        if (str !== "") {
                                                for (var i = 0; i < _this.options.mergeTags.length; i++) {
                                                        if (_this.options.mergeTags[i][1].toLowerCase() == str.toLowerCase()) {
                                                                index = i;
                                                                _this.$element.parents('body').find("#window_default_value").val(_this.options.mergeTags[i][0]);
                                                                break;
                                                        }
                                                }
                                        }

                                        return false;
                                }
                        }).focus(function () {
                                $(this).catcomplete("search", "");
                        });
                        _this.$element.parents('body').find(".pickkeywordswrap").click(function (e) {
                                $(this).parent().find("#window_default_value").focus();
                                $(this).parent().find("#window_default_value").catcomplete("search", "");
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                        });
                        _this.$element.parents('body').find("#" + container + " #window_type").change(function () {
                                _this.$element.find("#basic_settings,#advance_settings").children().remove();
                                var ctr_type = $(this).val();
                                var ctr_id = _this.options.selectedField;
                                _this.options.fieldsArray[ctr_id].type = ctr_type;
                                var prp_fields = _this.control.setting_options[ctr_type];
                                _this.createFieldSettings(prp_fields[0], "basic_settings", ctr_id);
                                _this.createFieldSettings(prp_fields[1], "advance_settings", ctr_id);
                        });
                },
                getSalesAssignment: function () {
                        var _this = this;
                        var URL = this.options.baseUrl + "/io/form/getSignUpFormData/?type=sfField";
                        var reqObj = { url: URL, isServerReq: true }

                        this.getAjaxCORS(reqObj, $.proxy(function (data) {

                                    _this.$element.find('#salesRepPicker option').remove();
                                    _this.$element.find('#salesRepPicker').html('<option value="-1">Select Sale Rep</option>')
                                    _this.$element.find('#sales_assignment_btn').attr('disabled','disabled')
                                    _this.$element.find('#sales_assignment_btn').addClass('ui-button-disabled')

                                     var data = JSON.parse(data);
                                   if(data.length > 0){

                                    $.each(data, function (key, val) {
                                            _this.$element.find('#salesRepPicker').append('<option>' + val + '</option>');
                                    })
                                }else{
                                  var accordHeight = 680;
                                  console.log('accordHeight : ' + accordHeight);
                                  this.$element.find(".leftbar").css("height", accordHeight + "px");
                                  this.$element.find("#accordion-form").accordion("refresh");
                                    _this.$element.find('#accordion-form2,.salesforce_a').hide();

                                }

                        }, this));
                },
                addSalesAssignment: function () {
                        var sale_rep_val = this.$element.find("#salesRepPicker").val();
                        if (sale_rep_val && !this.$element.find("#sales_assignment_btn").hasClass("ui-button-disabled")) {
                                if (this.$element.find("#emptyContents").css("display") == "block") {
                                        this.$element.find("#formfooter").removeClass("new-form");
                                        this.$element.find("#emptyContents").css("display", "none");
                                        this.$element.find("#formcontents").removeClass("startform");
                                }
                                if ($("#formcontents #html_salesRep").length) {
                                        this.delCtrl(this.$element.find("#formcontents #html_salesRep"));
                                }
                                this.control.li = this.createWrapper(sale_rep_val, "html_salesRep");
                                this.create(true, true);
                                this.$element.find("#formcontents").append(this.control.li);
                                this.options.fieldsArray["html_salesRep"]["default_value"] = sale_rep_val;
                                this.$element.find("#sales_assignment_btn").attr("disabled", "disabled");
                                this.$element.find("#sales_assignment_btn").addClass("ui-button-disabled");
                                this.save(true); // Need to manage
                        }
                },
                getName: function (id, type, field) {
                        var control = this.$element.find("#formcontents [id='" + id + "'] input");
                        var control_name = "";
                        if (control.length) {
                                control_name = control.attr("name");
                        }
                        control_name = (id.substring(0, 6) == "frmFld") ? id : control_name;
                        if (id.indexOf("frmFld_customField") == 0) {
                                control_name = this.options.fieldsArray[id]["name"];
                        }
                        return control_name;
                },
                getType: function (t) {
                        var returnType = "";
                        if (t.substring(0, 4) == "list") {
                                t = "list";
                        }
                        else if (t == "frmFld_customField" || t.substr(0, 11) == 'customField') {
                                t = "customField";
                        }
                        switch (t) {
                                case 'html_text':
                                        returnType = "text";
                                        break;
                                case 'html_heading':
                                        returnType = "heading";
                                        break;
                                        break;
                                case 'html_header':
                                        returnType = "header";
                                        break;
                                case 'html_break':
                                        returnType = "linebreak";
                                        break;
                                case 'html_hr':
                                        returnType = "hr";
                                        break;
                                case 'html_submit':
                                        returnType = "button";
                                        break;
                                case 'html_captcha':
                                        returnType = "capacha";
                                        break;
                                case 'html_salesRep':
                                        returnType = "hidden";
                                        break;
                                case 'list':
                                        returnType = "checkbox";
                                        break;
                                case 'customField':
                                        returnType = "custom_field";
                                        break;
                                default:
                                        returnType = "";
                                        break;
                        }
                        return returnType;
                },
                removeEle: function (id) {
                        var _this = this;
                        var h = "<div class='rm icon-trash' title='Remove'></div>";
                        var li_forremoveEl = this.$element.find(".leftbar-container [id='" + id + "']");
                        if (li_forremoveEl.find(".rm").length == 0) {
                                li_forremoveEl.append(h);
                                this.$element.find(".leftbar-container [id='" + id + "'] .icon-trash").click(function () {
                                        var li_id = $(this).parents("li").attr("id");
                                        _this.delControl($("#formcontents [id='" + li_id + "']"));
                                });
                        }
                },
                createWrapper: function (val, id) {
                        return $("<li id='" + id + "'>" + val + "</li>");
                },
                appendLi: function () {
                        this.create();
                        this.$element.find("#formcontents").append(this.control.li);
                },
                toolbar: function () {
                        var toolbarHTML = ""
                        if (this.control.firstLastControl) {
                                toolbarHTML += "<div class='controlButtons firstlast_setting'><div class='tool_button setting' title='Show Properties'></div></div>";
                        }
                        else {
                                var controlWidth = (this.control.li.attr("id") == "basic_email") ? "style='width:20px;'" : "";
                                toolbarHTML = "<div class='drag_element'><div class='tool_button drag' title='Drag handle'></div></div><div class='controlButtons' " + controlWidth + ">";
                                toolbarHTML += "<div class='tool_button setting' title='Show Properties'></div>";
                                if (this.control.li.attr("id") !== "basic_email") {
                                        toolbarHTML += "<div class='spacer'></div><div class='tool_button delete icon-trash' title='Delete'></div></div>";
                                }
                        }
                        return toolbarHTML;
                },
                delCtrl: function (obj) {          /*Delete control li*/
                        obj.remove();
                        delete this.options.fieldsArray[obj.attr("id")];
                        this.$element.find("#" + obj.attr("id")).draggable("option", "disabled", false);
                        this.setNoContents();
                        this.$element.find("#" + obj.attr("id")).find(".icon-trash").remove();
                        this.resizeForm();
                },
                editControl: function (event, ui) {
                        var control_type = $(event.target).parents("li").find(":first-child").attr("ctrl_type");
                        var control_id = $(event.target).parents("li").attr("id");
                        this.createProperties(control_type, control_id);
                        if ($(window).height() < 560) {
                                this.$element.find(".windowcontent").css("height", ($(window).height() - 130) + "px");
                        }
                        this.$element.parents('body').find("#elementProperties").dialog("open");
                },
                getFieldSetting: function (field, val) {
                        var fieldHTML = "";

                        switch (field.type) {
                                case "textfield":
                                        fieldHTML += '<div class="input-text">';
                                        var readonly = (field.readonly) ? 'readonly="readonly"' : '';
                                        fieldHTML += '<input type="text"value="' + val.replace("frmFld_", "") + '" ' + readonly + ' id="window_' + field.key + '" />';
                                        if (field.key == "default_value") {
                                                fieldHTML += '<span class="pickkeywordswrap"><b class="caret pickkeywords"></b></span>';
                                        }
                                        fieldHTML += '</div>';
                                        break;
                                case "selectbox":
                                        fieldHTML += '<div class="input-select">';
                                        fieldHTML += '<select id="window_' + field.key + '">';
                                        var isAlreadySelected = false;
                                        var options = eval(field.options);
                                        for (var i = 0; i < options.length; i++) {
                                                var selectopt = (options[i][0] == val) ? 'selected="selected"' : "";
                                                if(field.key == "font_size" && options[i][1]=="11px" && selectopt ==="" && !isAlreadySelected){
                                                fieldHTML += '<option value="' + options[i][0] + '" ' + selectopt + ' selected=selected >' + options[i][1] + '</option>';
                                                }else{
                                                    if(selectopt && field.key=="font_size"){
                                                      isAlreadySelected = true;
                                                    }
                                                    fieldHTML += '<option value="' + options[i][0] + '" ' + selectopt + '  >' + options[i][1] + '</option>';
                                                }

                                        }
                                        fieldHTML += '</select>';
                                        fieldHTML += '</div>';
                                        break;
                                case "radio":
                                        var yesChecked = '';
                                        var noChecked = 'checked="checked"';
                                        if (val) {
                                                yesChecked = (val == 'yes') ? 'checked="checked"' : '';
                                                noChecked = (val == 'no') ? 'checked="checked"' : '';
                                        }
                                        fieldHTML += '<div class="input-radio">';
                                        fieldHTML += '<label class="checkbox inline"><input type="radio" name="window_' + field.key + '" value="yes" ' + yesChecked + ' /> Yes</label>';
                                        fieldHTML += '<label class="checkbox inline"><input type="radio" name="window_' + field.key + '" value="no" ' + noChecked + ' /> No</label>';
                                        fieldHTML += '</div>';
                                        break;
                                case "textarea":
                                        fieldHTML += '<div class="input-textarea">';
                                        var text_val = (field.key == "options") ? val.replace(/_-_/g, "\n") : val;
                                        fieldHTML += '<textarea cols="30" rows="5" id="window_' + field.key + '">' + text_val + '</textarea>';
                                        fieldHTML += '</div>';
                                        break;
                                case "label":
                                        fieldHTML += '<div class="input-label">';
                                        fieldHTML += '<label id="window_' + field.key + '">' + val.replace("frmFld_", "") + '</label>';
                                        fieldHTML += '</div>';
                                        break;
                                case "color":
                                        if (!val) {
                                                val = "#666699";
                                        }
                                        else if (val == "transparent") {
                                                val = "";
                                        }
                                        fieldHTML += '<div class="input-color">';
                                        fieldHTML += '<input type="hidden" id="window_' + field.key + '" name="window_color" value="' + val + '" />';
                                        fieldHTML += '</div>';
                                        break;
                                default:
                                        break;
                        }
                        return fieldHTML;
                },
                editLabel: function (e, u) {
                        var label = $(e.currentTarget);
                        var _this = this;
                        if (label.find("input.editText").length === 0) {
                                label.children().remove();
                                var _text = $.trim(label.text());
                                var inputEdit = $("<input type='text' class='editText' value='" + _text + "' />");
                                var okBtn = $("<i class='icon-ok editlabel'></i>");
                                label.html(inputEdit); label.append(okBtn);
                                inputEdit.focus();
                                inputEdit.blur(function () {
                                        _this.setText(this);
                                });
                                inputEdit.keydown(function (e, u) {
                                        if (e.which == 13 || e.which == 27) {
                                                _this.setText(this);
                                        }
                                });
                                okBtn.click(function () {
                                        var input_obj = $(this).parent().find("input")[0];
                                        _this.setText(input_obj);
                                });
                                inputEdit.click(function (e, ui) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                });
                        }
                },
                setText: function (obj) {
                        var l = $(obj).val();
                        var parent_div = $(obj).parent();
                        $(obj).remove();
                        parent_div.html(l);
                        var _li = parent_div.parents("li");
                        var _id = _li.attr("id");
                        this.options.fieldsArray[_id].label = l;
                        this.applySettings(_id, this.options.fieldsArray[_id].type);
                },
                redrawControl: function () {
                        var _id = this.options.selectedField;
                        var field_obj = this.options.fieldsArray[_id];
                        var _type = field_obj.type;
                        var _text = typeof (field_obj.label) !== "undefined" ? field_obj.label : "";
                        var setting_obj = this.control.setting_options[_type];
                        if (setting_obj) {
                                for (var s = 0; s < setting_obj.length; s++) {
                                        for (var m = 0; m < setting_obj[s].length; m++) {
                                                if (typeof (field_obj[setting_obj[s][m]['key']]) !== "undefined") {
                                                        this.options.fieldsArray[_id][setting_obj[s][m]['key']] = field_obj[setting_obj[s][m]['key']];
                                                }
                                                else {
                                                        this.options.fieldsArray[_id][setting_obj[s][m]['key']] = "";
                                                }

                                        }
                                }
                                this.options.fieldsArray[_id]["type"] = _type;
                                this.options.fieldsArray[_id]["name"] = (_id.indexOf("frmFld_") == - 1) ? _id.split("_")[1] : _id;
                        }

                        this.control.li = this.$element.find("#formcontents [id='" + this.options.selectedField + "']");
                        this.control.li.children().remove();
                        var creatdHTML = this.creatHTML(_type, _text, _id);
                        //console.log(creatdHTML);
                        this.control.li.append(creatdHTML);
                        this.control.li.append(this.toolbar());
                        this.addObserver();
                },
                savePropertities: function () {
                        var field_obj = this.options.fieldsArray[this.options.selectedField];
                        if (this.control.typeChanged === true) {
                                this.redrawControl();
                                this.control.typeChanged = false;
                        }
                        var type = field_obj.type || "form";
                        var field = this.control.setting_options[type];
                        for (var i = 0; i < field.length; i++) {
                                for (var s = 0; s < field[i].length; s++) {
                                        var val = "";
                                        if (field[i][s].type == 'radio') {
                                                val = $("input[name='window_" + field[i][s].key + "']:checked").val();
                                        }
                                        else if (field[i][s].type == 'label') {
                                                val = this.options.fieldsArray[this.options.selectedField].name;
                                        }
                                        else if (field[i][s].key == 'options') {
                                                val = $("#window_" + field[i][s].key).val().replace(/\n/g, "_-_");
                                        }
                                        else {
                                                val = $("#window_" + field[i][s].key).val().replace(/\n/g, "");
                                                if (field[i][s].key.indexOf("_color") > - 1) {
                                                        if (val == "") {
                                                                val = "transparent";
                                                        }
                                                }

                                                //bg_color, font_color
                                        }
                                        if (field[i][s].key == "name" && type == "custom_field") {
                                                if (val.indexOf("frmFld_") == - 1) {
                                                        val = "frmFld_" + val;
                                                }
                                        }
                                        field_obj[field[i][s].key] = val;
                                }
                        }

                        if ($('body').find("#prp_type").val() == "form") {
                                this.applyFSettings(this.options.selectedField);
                        }
                        else {
                                if ($('body').find("#prp_type").val() == "custom_field") {
                                        field_obj["type"] = "custom_field";
                                }
                                this.applySettings(this.options.selectedField, type);
                        }
                        this.save(true); // Need to manage
                },
                /*
                 * Apply Settings on Fields
                 *
                 */
                applySettings: function (id, type) {
                        var field_obj = this.options.fieldsArray[id];
                        var requiredHTML = "";
                        type = (type == "custom_field") ? 'textfield' : type;
                        var requiredMsgHTML = "";
                        var d_val = "";
                        this.$element.find(".formareacontents [id='" + id + "']").find("div").first().removeClass("hide-control");
                        if (field_obj.required && field_obj.required == 'yes') {
                                requiredHTML += "<div class='required'>*</div>";
                                if (field_obj.requried_msg && field_obj.requried_msg !== '') {
                                        requiredMsgHTML += "<div class='required_message'>" + field_obj.requried_msg + "</div>";
                                }
                        }

                        if (type == "checkbox") {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").find(".required,.required_message").remove();
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top .label").html(field_obj.label);
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").append(requiredHTML + requiredMsgHTML);
                        }
                        else if (type == "textfield" || type == "text" || type == "selectbox" || type == "textarea") {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").html(field_obj.label + requiredHTML + requiredMsgHTML);
                                if (field_obj.default_value && field_obj.default_value !== "") {
                                        this.$element.find("#formcontents [id='" + id + "'] .form-input-wide input").val(field_obj.default_value);
                                }
                        }
                        else if (type == 'heading') {
                                this.$element.find("#formcontents [id='" + id + "'] .form-label-top .heading").html(field_obj.label);
                        }
                        else if (type == 'header') {
                                this.$element.find("#formheader [id='" + id + "'] .form-label-top .heading").html(field_obj.label);
                        }
                        else if (type == 'button') {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top button").html(field_obj.label);
                        }
                        else if (type == 'hidden') {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top input").val(field_obj.default_value);
                        }

                        //Set alignment of text or control
                        if (field_obj.align) {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").css("text-align", field_obj.align)
                        }
                        if ((type == 'radio' || type == 'checkbox') && field_obj.options) {
                                var _options = [];
                                if (field_obj.options) {
                                        _options = field_obj.options.split("_-_");
                                }
                                var optionhtml = "";
                                if (field_obj.label && _options.length > 1) {
                                        optionhtml += "<div class='labelEdit'>" + field_obj.label + "</div>";
                                }
                                for (var o = 0; o < _options.length; o++) {
                                        var classMargin = (o > 0) ? 'class=""' : '';
                                        var breakline = (o > 0) ? '<br/>' : '';
                                        optionhtml += breakline + '<input type="' + type + '" ' + classMargin + ' disabled="disabled" name="' + field_obj.name + '" value="' + _options[o] + '" /><span class="label">' + _options[o] + '</span>'
                                }
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").html(optionhtml);
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").find(".labelEdit").click($.proxy(this.editLabel, this));
                        }
                        //Set style of control
                        if (field_obj.style) {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").attr("style", field_obj.style)
                        }
                        //Set hidden property
                        if (field_obj.hidden && field_obj.hidden == 'yes') {
                                this.$element.find(".formareacontents [id='" + id + "']").find("div").first().addClass("hide-control");
                                this.$element.find(".formareacontents [id='" + id + "']").find("input[type='checkbox']").attr("checked", true);
                        }
                        if (field_obj.height) {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top div").css("height", field_obj.height + "px");
                        }
                        if (field_obj.bg_color) {
                                var color = this.getColorCode(field_obj.bg_color);
                                if (type == "button") {
                                        var startColor = this.ColorAdjust(color, 0.077);
                                        this.setColor(startColor, color, $("#formfooter [id='" + id + "'] .form-label-top button"));
                                }
                                else if (type == "header") {
                                        if (color !== "transparent") {
                                                var startColor = this.ColorAdjust(color, 0.077);
                                                this.setColor(startColor, color, $("#formheader li"));
                                        }
                                        else {
                                                this.$element.find(".formareacontents #" + id).css("background", color);
                                        }

                                }
                                else if (type == "heading") {
                                        this.$element.find(".formareacontents [id='" + id + "'] .form-label-top .heading").css("background", color);
                                }
                                else if (type == "text") {
                                        this.$element.find(".formareacontents [id='" + id + "']").css("background", color);
                                }
                                else {
                                        this.$element.find(".formareacontents [id='" + id + "'] .form-label-top div").css("background", color);
                                }
                        }
                        if (field_obj.font_color) {
                                var color = this.getColorCode(field_obj.font_color);
                                if (type == "text") {
                                        this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").css("color", color);
                                }
                                else if (type == "heading" || type == "header") {
                                        this.$element.find(".formareacontents [id='" + id + "'] .form-label-top .heading").css("color", color);
                                }
                        }
                        if (field_obj.bg_color_button) {
                                var color = this.getColorCode(field_obj.bg_color_button);
                                if (type == "button") {
                                        this.$element.find("#formfooter li#html_submit").css("background-color", color);
                                }
                        }
                        if (field_obj.font_size) {
                                if (type == "heading" || type == "header") {
                                        this.$element.find(".formareacontents [id='" + id + "'] .form-label-top .heading").css("font-size", field_obj.font_size + "px");
                                }
                                else {
                                        this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").css("font-size", field_obj.font_size + "px");
                                }
                        }
                        if (field_obj.font_family) {
                                this.$element.find(".formareacontents [id='" + id + "'] .form-label-top").css("font-family", field_obj.font_family);
                        }
                        if (field_obj.font_weight) {
                                if (type == "heading" || type == "header") {
                                        this.$element.find(".formareacontents [id='" + id + "'] .form-label-top .heading").css("font-weight", field_obj.font_weight);
                                }
                        }

                },
                /*
                 * Apply Settings on Form
                 */
                applyFSettings: function (id) {
                        //console.log('Trigger on form settings');
                        var field_obj = this.options.fieldsArray[id];
                        var _this = this;
                        if (field_obj.formname) {
                                //$("#fname").val(field_obj.formname);
                        }
                        else {
                                _this.options.formSaved = true;
                        }
                        if (field_obj.bg_color) {
                                var color = _this.getColorCode(field_obj.bg_color); //field_obj.bg_color.substr(0,1)=="#"?field_obj.bg_color:("#"+field_obj.bg_color);
                                _this.$element.find(".formareacontents").css("background", color);
                        }
                        if (field_obj.style) {
                               _this.$element.find(".formareacontents").attr("style", field_obj.style);
                        }
                        if (field_obj.font_size) {
                                _this.$element.find(".formareacontents .form-label-top").each(function () {
                                        var id = $(this).parents("li").attr("id");
                                        if (_this.options.fieldsArray[id].style.indexOf("font-size") == - 1) {
                                                $(this).css("font-size", field_obj.font_size + "px");
                                        }
                                });
                        }
                        if (field_obj.font_color) {
                                var color = _this.getColorCode(field_obj.font_color);
                                 _this.$element.find(".formareacontents .form-label-top").each(function () {
                                        var id = $(this).parents("li").attr("id");
                                        if (_this.options.fieldsArray[id].style.indexOf("color") == - 1) {
                                                $(this).css("color", color);
                                        }
                                });
                        }
                        if (field_obj.font_family) {
                                 _this.$element.find(".formareacontents .form-label-top").css("font-family", field_obj.font_family);
                        }
                },
                ColorAdjust: function (hex, lum) {
                        hex = String(hex).replace(/[^0-9a-f]/gi, '');
                        if (hex.length < 6) {
                                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                        }
                        lum = lum || 0;
                        var rgb = "#", c, i;
                        for (i = 0; i < 3; i++) {
                                c = parseInt(hex.substr(i * 2, 2), 16);
                                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                                rgb += ("00" + c).substr(c.length);
                        }
                        return rgb;
                },
                setColor: function (startColor, endColor, element) {
                        element.css("background-color", endColor)
                        if ($.browser.mozilla) {
                                element.css("background", "-moz-linear-gradient(top, " + startColor + ", " + endColor + ")");
                        }
                        else if ($.browser.mise) {
                                if (parseInt($.browser.version) <= 9) {
                                        element.css("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + startColor + "', endColorstr='" + endColor + "', GradientType=0)");
                                }
                                else if (parseInt($.browser.version) >= 10) {
                                        element.css("background", "-ms-linear-gradient(top, " + startColor + ", " + endColor + ")");
                                }
                        }
                        else if ($.browser.webkit) {
                                element.css("background", "-webkit-linear-gradient(top, " + startColor + ", " + endColor + ")");
                        }
                        else if ($.browser.opera) {
                                element.css("background", "-o-linear-gradient(top, " + startColor + ", " + endColor + ")");
                        }
                },
                /*///////////////////////////////////////// Helper class that contains all the common function used /////////////////////////////////////////*/
                getRHeight: function () {
                        var contentAreaBordersHeight = 107;
                        var consumedHeight = $(".header").outerHeight(true) + $(".subheader").outerHeight(true) + $("#formtabs ui.ui-tabs-nav").outerHeight(true) + contentAreaBordersHeight;
                        var totalHeight = $(document).find('.postbox').height();
                        var topHeight = ($('#postbox-container-1').length) ? $('#postbox-container-1').height() : 0;
                        return ((totalHeight + topHeight) - consumedHeight);
                },
                showMessage: function (msg, isError) {
                        var self= this;
                        var htmlObj = '';
                        //console.log('isError : '+isError);
                        if(isError){
                              htmlObj= $('<div style="display: none;" class="global_messages messagebox wpferror"><h3>Error</h3><p>'+msg+'</p></div>')
                        }else{
                              htmlObj = $('<div style="display: none;" class="global_messages messagebox success"><h3>Success</h3><p>'+msg+'</p><a class="closebtn"></a></div>')

                        }
                        $('body').append(htmlObj);
                        htmlObj.slideDown("slow",function(){
                          setTimeout(function(){
                              self.hideMessage();
                          },2000);
                        });
                        var obj = self.center(htmlObj);


                        //this.options.remoteCall.postMessage("{\"showMessage\":true,\"msg\":\"" + msg + "\"}");
                },
                hideMessage: function () {
                    $('body').find('.global_messages').slideUp("slow");
                   setTimeout(function(){$('body').find('.global_messages').remove()},500)
                },
                getColorCode: function (color) {
                        var _color = "none";
                        if (color && color != "transparent") {
                                _color = color.substr(0, 1) == "#" ? color : ("#" + color);
                        }
                        else if (color == "transparent") {
                                _color = "transparent";
                        }
                        return _color;
                },
                filter: function (str) {
                        str = str.replace(/&#58;/g, ":");
                        str = str.replace(/&#39;/g, "\'");
                        str = str.replace(/&#34;/g, "\"");
                        str = str.replace(/&#61;/g, "=");
                        str = str.replace(/&#40;/g, "(");
                        str = str.replace(/&#41;/g, ")");
                        str = str.replace(/&lt;/g, "<");
                        str = str.replace(/&gt;/g, ">");
                        str = str.replace(/&quote/g, "\"");
                        return str;
                },
                getListCode: function (md5_code) {
                        var list_code = "";
                        var mMailListsArray = this.options.mMailLists;
                        for (var i = 0; i < mMailListsArray.length; i++) {
                                if (mMailListsArray[i].md5 == md5_code) {
                                        list_code = mMailListsArray[i].id;
                                        break;
                                }
                        }
                        return list_code;
                },
                /*///////////////////////////////////////// Create JSON to save - Create form on load  /////////////////////////////////////////*/
                JsonCreate: function () {          /*Create JSON based on form*/
                        var _this = this;
                        var formContainer = $("#" + _this.JSONform.formEle);
                        var f_name = _this.$element.find("#fname").val();
                        _this.$element.find("#mIsCAPTCHA").val("N");
                        _this.options.fieldsArray['_form'].formname = f_name;
                        var strJSON = '[{';
                        //Embed form settings
                        var field_obj = _this.options.fieldsArray['_form'];
                        var field_prp = _this.control.setting_options["form"];
                        for (var p = 0; p < field_prp.length; p++) {
                                for (var f = 0; f < field_prp[p].length; f++) {
                                        var key = field_prp[p][f].key;
                                        strJSON += '"' + key + '":"' + field_obj[key] + '",';
                                }
                        }
                        strJSON += '"fields":[';
                        _this.$element.find(".formareacontents ul").each(function (ind, value) {
                                formContainer = $(this);
                                for (var c = 0; c < formContainer.children().length; c++) {
                                        var liContainer = formContainer.children().eq(c);
                                        strJSON += '{';
                                        var ctrl_id = liContainer.attr("id");
                                        var ctrl_type = liContainer.find("div").first().attr("ctrl_type");
                                        strJSON += '"li_id":"' + ctrl_id + '",';
                                        strJSON += '"id":"' + ctrl_id + '",';
                                        //Setting propertites according to setting obj
                                        field_obj = _this.options.fieldsArray[ctrl_id];
                                        var type = field_obj.type;
                                        field_prp = _this.control.setting_options[type];
                                        for (var p = 0; p < field_prp.length; p++) {
                                                for (var f = 0; f < field_prp[p].length; f++) {
                                                        var key = field_prp[p][f].key;
                                                        if (key !== "type") {
                                                                strJSON += '"' + key + '":"' + _this.encodeHTML(field_obj[key]) + '",';
                                                        }
                                                }
                                        }
                                        if (type == "capacha") {
                                                $("#mIsCAPTCHA").val("Y");
                                        }
                                        strJSON += '"type":"' + ctrl_type + '",';
                                        strJSON += '"order":' + (c + 1) + '';
                                        strJSON += '}';
                                        if (c < formContainer.children().length - 1) {
                                                strJSON += ',';
                                        }
                                }
                                if (ind < _this.$element.find(".formareacontents ul").length - 1) {
                                        strJSON += ',';
                                }
                        });
                        strJSON += ']}]';
                        return strJSON;
                },
                delete_form: function () {
                        if (confirm("Are you really want to delete this form?")) {
                                var deleteFlag = "&delete=true";
                                $.post(this.$element.find("#form_builder_form").attr("action"), this.$element.find("#form_builder_form").serialize() + deleteFlag, function (data) {
                                        if (data.success) {
                                                window.location.href = newFormURL;
                                        }
                                });
                        }
                },
                save: function (autosave) {
                        var _this = this;
                        if (_this.validate(autosave)) {

                                _this.$element.find("#mformHTML").val(_this.JsonCreate());
                                _this.$element.find("#mformName").val(_this.$element.find("#fname").val());
                                //$("#mIsCAPTCHA").val();
                                if (autosave && _this.options.formSaved) {
                                        _this.$element.find(".autosave").effect("bounce", { times: 5 }, 500);
                                }
                                else if (!autosave) {
                                        var c = $(document.documentElement);
                                        c.append(_this.showSLoading("Saving Form...", _this.$element));
                                }
                                else {
                                        return false;
                                }

                                var newFormFlag = (_this.$element.find("#mformId").val() == "" || _this.options.typeToC) ? "&new=Y" : "";
                                var URL = _this.options.baseUrl + '/landingpages/rFormSaver.jsp';
                                var data = _this.$element.find("#form_builder_form").serialize() + newFormFlag + "&BMS_REQ_TK=" + _this.options.BMS_REQ_TK + "&ukey=" + _this.options.ukey + "&isMobileLogin=Y&userId=" + _this.options.userId;
                                //var data = { 'name':fromName, 'BMS_REQ_TK':_this.options.BMS_REQ_TK, 'ukey':_this.options.ukey, 'isMobileLogin':'Y', 'userId':_this.options.userId}

                                _this.postAjaxCall(URL, data, function (data) {

                                        if (data.error) {
                                                var errorText = data.error;
                                                _this.showMessage(errorText, true);
                                        } else if (data.success && data.success !== "updated.") {
                                                var fid = data.formId;
                                                _this.$element.find("#mformId").val(fid);
                                                _this.createOption(fid);
                                                _this.showMessage("Form Created Successfully.",false);
                                                _this.options.formSaved = true;
                                                _this.options.typeToC = false;
                                                var URL = "/pms/json/forms.jsp?formId=" + fid + "&pageId=" + _this.$element.find("#mpageId").val() + user_key + bms_token_var;
                                                jQuery.getJSON(URL, function (tsv, state, xhr) {
                                                        var result = jQuery.parseJSON(xhr.responseText);
                                                        if (!result.error) {
                                                                _this.$element.find("#preview_form,#embed_form,#target_form,#deleteformbtn").button("enable");
                                                                previewURL = _this.filter(result.formURL) + "?preview=Y";
                                                                _this.$element.find(".targeturl").val(_this.filter(result.formURL));
                                                                _this.$element.find("#frmSnippet").val(_this.filter(result.embedCode));
                                                                if(_this.options.pluginType=="wordpress"){
                                                                  var shortCode = _this.filter(result.formURL);

                                                                  var res = shortCode.split('/')[5];

                                                                  _this.$element.find('#shortcodeSnippet').val('[wpmks_form formid="'+res+'" width="300" height="400"]') // needs to done for creat form
                                                                }

                                                                // _this.options.remoteCall.postMessage("{\"isRefresh\":false,\"formURL\":\"" + _this.filter(result.formURL.replace("http:", "")) + "\",\"formId\":\"" + result.formId + "\"}");
                                                        }
                                                });
                                                return;
                                        } else {
                                                _this.showMessage("Form updated Successfully.",false);
                                                setTimeout(function () { _this.$element.find(".autosave").css("display", "none") }, 300);
                                        }
                                        _this.removeLoading();
                                        if (!data.error) {
                                                //_this.options.remoteCall.postMessage("{\"isRefresh\":true}")
                                        }
                                });
                        }
                },
                validate: function (autosave) {
                        var isValid = true;
                        var f_name = this.$element.find("#fname").val();
                        if (f_name == "") {
                                if (!autosave) {
                                        alert("Form name can't be empty.");
                                }
                                isValid = false;
                        }
                        else if (this.$element.find("input[name='lists']").length == 0) {
                                if (!autosave) {
                                        alert("Please provide at least one target list.");
                                }

                                isValid = false;
                        }
                        this.checkFormList();
                        return isValid;
                },
                checkFormList: function () {
                        if (this.$element.find("input[name='lists']").length !== 0) {
                                this.$element.find(".nolist").hide();
                        }
                        else {
                                this.$element.find(".nolist").show();
                        }
                },
                createOption: function (id) {
                        this.$element.find("#mid_sel").append("<option value='" + id + "'>" + $("#fname").val() + "</option>");
                        this.$element.find("#mid_sel").val(id);
                },
                saveSettings: function () {
                        var c = $(document.documentElement);
                        c.append(this.showLoading("Saving Form Settings", { h: (c.height() - 20), w: (c.width() - 20), id: "settings__" }));
                },
                createForm: function () {
                        var form_type = this.$element.find("#mformType").val();
                        if (form_type === "C") {
                                this.createFormFromJSON(); // tomorrow
                        }
                        else {
                                this.createIframe(form_type); // Umair bhai
                        }

                },
                createFormFromJSON: function () {

                        var form_json = this.options.jsonFormHtml;
                        var formObj = form_json;
                        var _this = this;
                        var isDefaultView = false;
                        if (formObj == null || formObj == "") {
                                formObj = jQuery.parseJSON(_this.options.defaultView);
                                isDefaultView = true;
                        }
                        else {
                                _this.options.formSaved = true;
                                _this.$element.find("#preview_form,#embed_form,#target_form,#deleteformbtn").button("enable");
                        }
                        if (formObj !== null && formObj !== "") {
                                var formFields = formObj[0].fields;
                                //Set form propertites
                                _this.options.fieldsArray["_form"] = {};
                                var setting_obj = _this.control.setting_options["form"];
                                for (var s = 0; s < setting_obj.length; s++) {
                                        for (var m = 0; m < setting_obj[s].length; m++) {
                                                if (formObj[0][setting_obj[s][m]['key']]) {
                                                        _this.options.fieldsArray["_form"][setting_obj[s][m]['key']] = formObj[0][setting_obj[s][m]['key']];
                                                }
                                                else {

                                                        if (setting_obj[s][m]['key'] == "font_color") {
                                                                _this.options.fieldsArray["_form"][setting_obj[s][m]['key']] = "#222222";
                                                        }
                                                        else if (setting_obj[s][m]['key'] == "bg_color") {
                                                                _this.options.fieldsArray["_form"][setting_obj[s][m]['key']] = "#F5F5F5";
                                                        }
                                                        else {
                                                                _this.options.fieldsArray["_form"][setting_obj[s][m]['key']] = "";
                                                        }
                                                }
                                        }
                                }

                                if (formFields && formFields.length) {
                                        if (isDefaultView === false) {
                                                _this.$element.find("#emptyContents").css("display", "none");
                                                _this.$element.find("#formcontents").removeClass("startform");
                                        }
                                        _this.$element.find("#formcontents").css({ "display": "block" });
                                        _this.$element.find("#formcontents").children().remove();
                                        for (var i = 0; i < formFields.length; i++) {
                                                var li_container = $("#formcontents");
                                                _this.control.firstLastControl = (i == 0 || i == formFields.length - 1) ? true : false;
                                                _this.control.li = _this.createWrapper(formFields[i].label, formFields[i].li_id);
                                                if (i == 0) {
                                                        li_container = _this.$element.find("#formheader");
                                                }
                                                else if (i == formFields.length - 1) {
                                                        li_container = _this.$element.find("#formfooter");
                                                }
                                                else {
                                                        li_container = _this.$element.find("#formcontents");
                                                }
                                                _this.control.draggedItem = _this.$element.find("#accordion-form [id='" + formFields[i].li_id + "']");
                                                var opt_obj = { "id": formFields[i].li_id, "type": formFields[i].type };
                                                this.create(false, false, opt_obj);
                                                li_container.append(_this.control.li);
                                                _this.options.fieldsArray[formFields[i].li_id] = {};
                                                var setting_obj = _this.control.setting_options[formFields[i].type];
                                                if (setting_obj) {
                                                        for (var s = 0; s < setting_obj.length; s++) {
                                                                for (var m = 0; m < setting_obj[s].length; m++) {
                                                                        if (formFields[i][setting_obj[s][m]['key']]) {
                                                                                _this.options.fieldsArray[formFields[i].li_id][setting_obj[s][m]['key']] = formFields[i][setting_obj[s][m]['key']]; //formJSON.decodeHTML(
                                                                        }
                                                                        else {
                                                                                _this.options.fieldsArray[formFields[i].li_id][setting_obj[s][m]['key']] = "";
                                                                        }
                                                                }
                                                        }
                                                        _this.options.fieldsArray[formFields[i].li_id]['type'] = formFields[i].type;
                                                        _this.options.fieldsArray[formFields[i].li_id]['name'] = _this.getName(formFields[i].li_id, formFields[i].type);
                                                        if (formFields[i].type == "heading" || formFields[i].type == "header") {
                                                                if (!_this.options.fieldsArray[formFields[i].li_id]['font_size']) {
                                                                        _this.options.fieldsArray[formFields[i].li_id]['font_size'] = "20";
                                                                }
                                                                if (!_this.options.fieldsArray[formFields[i].li_id]['font_weight']) {
                                                                        _this.options.fieldsArray[formFields[i].li_id]['font_weight'] = "bold";
                                                                }
                                                        }
                                                        if (li_container.attr("id") != "formcontents") {
                                                                if (!_this.options.fieldsArray[formFields[i].li_id]['bg_color']) {
                                                                        _this.options.fieldsArray[formFields[i].li_id]['bg_color'] = "#49AFCD";
                                                                }
                                                                if (!_this.options.fieldsArray[formFields[i].li_id]['bg_color_button']) {
                                                                        _this.options.fieldsArray[formFields[i].li_id]['bg_color_button'] = "#CCCCCC";
                                                                }
                                                                if (typeof (_this.options.fieldsArray[formFields[i].li_id]['font_color']) != "undefined" && _this.options.fieldsArray[formFields[i].li_id]['font_color'] == "") {
                                                                        _this.options.fieldsArray[formFields[i].li_id]['font_color'] = "#ffffff";
                                                                }
                                                        }

                                                        _this.applySettings(formFields[i].li_id, formFields[i].type);
                                                }
                                        } //End of fields creation loop
                                        if ($("#mformId").val() !== "") {
                                                _this.resizeForm();
                                        }
                                        if (isDefaultView === true) {

                                                _this.$element.find("#formfooter").addClass("new-form");
                                        }
                                } //End of formFields check
                                if (_this.$element.find("#mformId").val() !== "") {
                                        _this.checkFormList();
                                }
                        }//End of formobj check
                        _this.removeLoading();
                        _this.control.firstLastControl = false;
                        _this.applyFSettings("_form");
                },
                createIframe: function (ftype) {
                        var _this = this;
                        _this.$element.parents("body").append('<iframe src="" frameborder="0" scrolling="no" style="width:1px;height:1px;" id="temp_form_frame"></iframe>');
                        setTimeout(function () { _this.setIFrameHTML(ftype) }, 200);
                },
                setIFrameHTML: function (form_type) {
                        var _this = this;
                        _this.$element.parents('body').find("#temp_form_frame")[0].contentWindow.document.body.innerHTML = this.options.jsonFormHtml;
                        var isError = false;
                        if (form_type === "B") {
                                _this.createJSONFromB();
                        }
                        else if (form_type === "F" || form_type === "A") {
                                _this.createJSONFromF();
                        }
                        else {
                                alert("Unknow form type, cann't display your form. Please create a new form.");
                        }
                        if (isError === false) {
                                _this.saveNewLayout();
                        }
                        _this.$element.find("#temp_form_frame").remove();
                },
                isValidEmail: function (string) {
                        if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != - 1)
                                return true;
                        else
                                return false;
                },
                createJSONFromB: function () {
                        var _this = this;
                        var form_obj = $(_this.$element.parents('body').find("#temp_form_frame")[0].contentWindow.document.body);
                        var c = 1;
                        var header, footer;
                        var strJSON = '[{';
                        strJSON += '"formname":"' + _this.$element.find("#fname").val() + '",';
                        strJSON += '"fields":[';
                        var field_array = form_obj.find("> p,> input");
                        field_array.each(function (ind, value) {
                                var isElement = true;
                                var type = "textfield", li_id, id, name, label, val, req, option_str;
                                if ($(this).find(".formHeading").length) {
                                        header = true;
                                        type = "header";
                                        li_id = "html_header"; id = "html_header";
                                        label = _this.filter($(this).find(".formHeading").text());
                                }
                                else if ($(this).find(".formCaptcha").length) {
                                        type = "capacha";
                                        li_id = "html_captcha"; id = "html_captcha";
                                }
                                else if ($(this).find(".formFieldInput").length) {
                                        var input_field = $(this).find(".formFieldInput");
                                        if (input_field.attr("type") == "text") {
                                                type = "textfield";
                                                name = input_field.attr("name");
                                                label = _this.filter($(this).find(".formFieldLabel").text());
                                                var ctrl_id = (name.indexOf("frmFld_") > - 1) ? name : "basic_" + name;
                                                li_id = id = ctrl_id;
                                                req = ($(this).find(".required").length || $(this).find(".formFieldLabel").text().indexOf("*") != - 1) ? "yes" : "no";
                                                val = input_field.val();
                                        }
                                        else if (input_field.attr("type") == "submit") {
                                                if (ind != field_array.length - 1) {
                                                        isElement = false;
                                                }
                                                else {
                                                        footer = true;
                                                        type = "button";
                                                        label = input_field.attr("value");
                                                        li_id = id = "html_submit";
                                                }
                                        }
                                        else if ($(this).find("input[type='radio']").length > 1 || $(this).find("input[type='checkbox']").length > 1) {
                                                type = $(this).find("input").attr("type");
                                                name = input_field.attr("name");
                                                label = $(this).find(".formFieldLabel").html();
                                                option_str = "";
                                                var multi_option = $(this).find("input[type='" + type + "']");
                                                for (var i = 0; i < multi_option.length; i++) {
                                                        option_str += $(multi_option[i]).val();
                                                        if (i < multi_option.length - 1) {
                                                                option_str += "_-_";
                                                        }
                                                }
                                                var ctrl_id = "_" + name.replace(/_/g, "-").replace(/ /g, "-");
                                                li_id = id = ctrl_id;
                                        }
                                        else if (input_field.attr("type") == "checkbox") {
                                                type = "checkbox";
                                                name = input_field.attr("name");
                                                label = $(this).find(".formFieldLabel .formFieldLabel").html();
                                                var ctrl_id = name + "_" + input_field.attr("value");
                                                li_id = id = ctrl_id;
                                        }
                                        else if (input_field.attr("type") == "radio") {
                                                type = "radio";
                                                name = input_field.attr("name");
                                                label = $(this).find(".formFieldLabel").html();
                                                var ctrl_id = (name.indexOf("frmFld_") > - 1) ? name : "basic_" + name;
                                                li_id = id = ctrl_id;
                                        }
                                        else if (input_field[0].tagName == "SELECT") {
                                                type = "selectbox";
                                                var option_array = $(input_field[0]).find("option");
                                                option_str = "";
                                                for (var i = 0; i < option_array.length; i++) {
                                                        option_str += $(option_array[i]).html();
                                                        if (i < option_array.length - 1) {
                                                                option_str += "_-_";
                                                        }
                                                }
                                                name = input_field.attr("name");
                                                label = _this.filter($(this).find(".formFieldLabel").text());
                                                var ctrl_id = (name.indexOf("frmFld_") > - 1) ? name : "basic_" + name;
                                                li_id = id = ctrl_id;
                                                req = ($(this).find(".required").length || $(this).find(".formFieldLabel").text().indexOf("*") != - 1) ? "yes" : "no";
                                        }
                                }
                                else if ($(this).find(".formLineBreak").length) {
                                        type = "linebreak";
                                        li_id = id = "linebreak" + c;
                                }
                                else if ($(this).find(".formHorizontalRule").length) {
                                        type = "hr";
                                        li_id = id = "hr" + c;
                                }
                                else if (this.tagName == "INPUT" && $(this).attr("type") == "hidden") {
                                        if ($(this).attr("name") == "salesRep") {

                                                li_id = id = "html_salesRep";
                                                name = "salesRep";
                                        }
                                        else {
                                                li_id = id = "html_salesRep";
                                                name = $(this).attr("name");
                                                var ctrl_id = "_" + name.replace(/_/g, "-").replace(/ /g, "-");
                                                li_id = id = ctrl_id;
                                        }
                                        type = "hidden";
                                        val = $(this).val();
                                }
                                else {
                                        isElement = false;
                                }
                                if (isElement) {
                                        if (c == 1 && !header) {
                                                strJSON += '{"li_id":"html_header","id":"html_header","label":"Heading","style":"","type":"header","order":1},';
                                                header = true;
                                        }
                                        strJSON += "{";
                                        strJSON += '"li_id":"' + li_id + '",';
                                        strJSON += '"id":"' + id + '",';
                                        if (label) {
                                                strJSON += '"label":"' + label + '",';
                                        }
                                        if (val) {
                                                strJSON += '"default_value":"' + val + '",';
                                        }
                                        strJSON += '"style":"",';
                                        if (name) {
                                                strJSON += '"name":"' + name + '",';
                                        }
                                        if (req) {
                                                strJSON += '"required":"' + req + '",';
                                        }
                                        if (option_str) {
                                                strJSON += '"options":"' + option_str + '",';
                                        }
                                        strJSON += '"type":"' + type + '",';
                                        strJSON += '"order":' + c + '';
                                        strJSON += "}";
                                        c++;
                                }
                                if (ind < field_array.length - 1) {
                                        if (isElement) {
                                                strJSON += ',';
                                        }
                                }
                                else {
                                        if (!footer) {
                                                var coma = strJSON.substring(strJSON.length - 1) == "," ? "" : ",";
                                                strJSON += coma + '{"li_id":"html_submit","id":"html_submit","label":"Submit","align":"left","style":"","type":"button","order":' + (c + 1) + '}';
                                                footer = true;
                                        }
                                }
                        });
                        strJSON += ']}]';
                        _this.$element.find("#mformHTML").val(strJSON);
                        _this.createFormFromJSON();
                },
                filter: function (str) {
                        str = str.replace(/\n/g, "");
                        str = str.replace(/\*/g, "");
                        str = str.replace(/\"/g, "\\\"");
                        return str;
                },
                createJSONFromF: function () {
                        var _this = this;
                        var form_obj = $(_this.$element.parents('body').find("#temp_form_frame")[0].contentWindow.document.body);
                        var c = 1;
                        var strJSON = '[{';
                        strJSON += '"formname":"' + $("#fname").val() + '",';
                        strJSON += '"fields":[';
                        var field_header = form_obj.find("> table h2");
                        var headr_text = (field_header.length && $.trim(field_header.html()) !== "") ? _this.filter(field_header.text()) : "Sign up Form";
                        strJSON += '{"li_id":"html_header","id":"html_header","label":"' + headr_text + '","style":"","type":"header","order":1},';
                        var field_array = form_obj.find("form table tbody tr");
                        field_array.each(function (ind, value) {
                                var isElement = true;
                                var type = "textfield", li_id, id, name, label, val, req, option_str;
                                if ($(this).find("input[type='text']").length) {
                                        var input_field = $(this).find("input[type='text']");
                                        var name = input_field.attr("name");
                                        if (name == "uText") {
                                                type = "capacha";
                                                li_id = "html_captcha"; id = "html_captcha";
                                        }
                                        else {
                                                type = "textfield";
                                                label = $(this).find("td:first-child").text();
                                                var ctrl_id = (name.indexOf("frmFld_") > - 1) ? name : "basic_" + name;
                                                li_id = id = ctrl_id;
                                                req = label.indexOf("*") > - 1 ? "yes" : "no";
                                                val = input_field.val();
                                                label = label.replace("*", "");
                                        }
                                }
                                else if ($(this).find("select").length) {
                                        var input_field = $(this).find("select");
                                        var name = input_field.attr("name");
                                        type = "selectbox";
                                        var option_array = $(input_field[0]).find("option");
                                        option_str = "";
                                        for (var i = 0; i < option_array.length; i++) {
                                                option_str += $(option_array[i]).html();
                                                if (i < option_array.length - 1) {
                                                        option_str += "_-_";
                                                }
                                        }
                                        var label = _this.filter($(this).find("td:first-child").text());
                                        var ctrl_id = (name.indexOf("frmFld_") > - 1) ? name : "basic_" + name;
                                        li_id = id = ctrl_id;
                                        req = $(this).find("td:first-child").text().indexOf("*") > - 1 ? "yes" : "no";
                                }
                                else if ($(this).find("input[type='checkbox']").length) {
                                        var input_field = $(this).find("input[type='checkbox']");
                                        var name = input_field.attr("name");
                                        type = "checkbox";
                                        label = $(this).find("td:last-child").text();
                                        var ctrl_id = name + "_" + input_field.attr("value");
                                        li_id = id = ctrl_id;
                                }
                                else {
                                        isElement = false;
                                }
                                if (isElement) {
                                        strJSON += "{";
                                        strJSON += '"li_id":"' + li_id + '",';
                                        strJSON += '"id":"' + id + '",';
                                        if (label) {
                                                strJSON += '"label":"' + label + '",';
                                        }
                                        if (val) {
                                                strJSON += '"default_value":"' + val + '",';
                                        }
                                        strJSON += '"style":"",';
                                        if (name) {
                                                strJSON += '"name":"' + name + '",';
                                        }
                                        if (req) {
                                                strJSON += '"required":"' + req + '",';
                                        }
                                        if (option_str) {
                                                strJSON += '"options":"' + option_str + '",';
                                        }
                                        strJSON += '"type":"' + type + '",';
                                        strJSON += '"order":' + c + '';
                                        strJSON += "}";
                                        c++;
                                }
                                if (ind < field_array.length - 1) {
                                        if (isElement) {
                                                strJSON += ',';
                                        }
                                }

                        });
                        var field_button = form_obj.find("form input[type='submit']");
                        var button_text = field_button.length ? field_button.val() : "Submit";
                        strJSON += '{"li_id":"html_submit","id":"html_submit","label":"' + button_text + '","align":"left","style":"","type":"button"}';
                        strJSON += ']}]';
                        _this.$element.find("#mformHTML").val(strJSON);
                        _this.createFormFromJSON();
                },
                saveNewLayout: function () {
                        $("#mformType").val("C");
                        this.options.typeToC = true;
                        this.save(true);
                },
                encodeHTML: function (str) {
                        if (typeof (str) !== "undefined") {
                                str = str.replace(/"/g, "");
                        }
                        else {
                                str = "";
                        }
                        return str;
                }
                , decodeHTML: function (str, lineFeed) {
                        //decoding HTML entites to show in textfield and text area
                        if (typeof (str) !== "undefined") {
                                str = str.replace(/&____;/g, "\"");
                        }
                        else {
                                str = "";
                        }
                        return str;
                },
                decode: function (str, lineFeed) {
                        //decoding HTML entites to show in textfield and text area
                        if (typeof (str) !== "undefined") {
                                str = str.replace(/&amp;/g, "&");
                                str = str.replace(/&#58;/g, ":");
                                str = str.replace(/&#39;/g, "\'");
                                str = str.replace(/&#40;/g, "(");
                                str = str.replace(/&#41;/g, ")");
                                str = str.replace(/&lt;/g, "<");
                                str = str.replace(/&gt;/g, ">");
                                str = str.replace(/&gt;/g, ">");
                                str = str.replace(/&#9;/g, "\t");
                                str = str.replace(/&nbsp;/g, " ");
                                str = str.replace(/&quot;/g, "\"");
                                str = str.replace(/&#8216;/g, "‘");
                                str = str.replace(/&#61;/g, "=");
                                if (lineFeed) {
                                        str = str.replace(/&line;/g, "\n");
                                }
                        }
                        else {
                                str = "";
                        }
                        return str;
                },
                encode: function (str) {
                        if (typeof (str) !== "undefined") {
                                str = str.replace(/:/g, "&#58;");
                                str = str.replace(/\'/g, "&#39;");
                                str = str.replace(/=/g, "&#61;");
                                str = str.replace(/\(/g, "&#40;");
                                str = str.replace(/\)/g, "&#41;");
                                str = str.replace(/</g, "&lt;");
                                str = str.replace(/>/g, "&gt;");
                                str = str.replace(/\"/g, "&quot;");
                                str = str.replace(/\‘/g, "&#8216;");
                                str = str.replace(//g, "");
                        }
                        else {
                                str = "";
                        }
                        return str;
                }
                ,
                createJSONFromA: function () {
                        var form_obj = $(this.$element.parents('body').find("#temp_form_frame")[0].contentWindow.document.body.innerHTML);
                },
                /*///////////////////////////////////////// Actual control creation using HTML /////////////////////////////////////////*/
                creatHTML: function (type, txt, id) {
                        var isCustom = id.substring(0, 7) == "frmFld_" ? true : false;
                        var ctrl_id = id.split("_")[1];
                        var ctrl_name = id;
                        var cHTML = "";
                        switch (type) {
                                case 'heading':
                                        cHTML = this.headingField(txt);
                                        break;
                                case 'header':
                                        cHTML = this.headerField(txt);
                                        break;
                                case 'text':
                                        cHTML = this.wrapper(txt, false, { type: "text", labelEdit: true });
                                        break;
                                case 'linebreak':
                                        cHTML = this.lineBreak();
                                        break;
                                case 'hr':
                                        cHTML = this.horizontalRule();
                                        break;
                                case 'custom_field':
                                        ctrl_name = "customField";
                                        cHTML = this.inputField(ctrl_id, txt, ctrl_name, 'custom_field');
                                        break;
                                case 'button':
                                        cHTML = this.buttonHTML();
                                        this.addLayer();
                                        break;
                                case 'capacha':
                                        cHTML = this.capachaHTML();
                                        this.addLayer();
                                        break;
                                case 'checkbox':
                                        cHTML = this.listHTML(ctrl_id, txt, isCustom);
                                        this.addLayer();
                                        break;
                                case 'radio':
                                        cHTML = this.radioHTML(ctrl_id, txt);
                                        this.addLayer();
                                        break;
                                case 'textarea':
                                        cHTML = this.textareaHTML(ctrl_id, txt);
                                        this.addLayer();
                                        break;
                                case 'selectbox':
                                        cHTML = this.selectField(ctrl_id, txt);
                                        this.addLayer();
                                        break;
                                case 'hidden':
                                        cHTML = this.hiddenField(ctrl_id, txt);
                                        break;
                                default:
                                        cHTML = this.inputField(ctrl_id, txt, ctrl_name);
                                        this.addLayer();
                                        break;
                        }
                        return cHTML;
                },
                addLayer: function () {
                        this.control.draggedItem.draggable("option", "disabled", true);
                        if (this.control.li.attr("id") !== "basic_email" && this.control.li.attr("id") !== "html_submit") {
                                this.removeEle(this.control.draggedItem.attr("id"));
                        }
                }
                ,
                wrapper: function (l, i, opt) {
                        var iHTML = "<div style='display: inline-block; width: 100%;' ctrl_type='" + opt.type + "'>";
                        if (l) {
                                var labelEdit = opt.labelEdit ? "labelEdit" : "";
                                var ctrl_id = this.control.li.attr("id");
                                var form_object = this.options.fieldsArray["_form"];
                                var color = (form_object.font_color && ctrl_id !== "html_header" && ctrl_id !== "html_submit") ? "color:" + this.getColorCode(form_object.font_color) + ";" : "";
                                var fsize = (form_object.font_size && ctrl_id !== "html_header" && ctrl_id !== "html_submit") ? "font-size:" + form_object.font_size + "px;" : "";
                                var ffamily = (form_object.font_family && ctrl_id !== "html_header" && ctrl_id !== "html_submit") ? "font-family:" + form_object.font_family + ";" : "";
                                iHTML += "<div class='form-label-top " + labelEdit + "' style=\"width: 100%;" + color + fsize + ffamily + "\">";
                                iHTML += l;
                                iHTML += "</div>";
                        }
                        if (i) {
                                iHTML += "<div class='form-input-wide'>";
                                iHTML += i;
                                iHTML += "</div>";
                        }
                        iHTML += "</div>";
                        return iHTML;
                },
                textareaHTML: function (id, l) {
                        var fieldHTML = "<textarea name='" + id + "' id='" + id + "' readonly='readonly' placeholder='' rows='5' cols='10'></textarea>";
                        return this.wrapper(l, fieldHTML, { type: "textarea", labelEdit: true });
                },
                inputField: function (id, l, ctrl_name, type) {
                        var _name = ctrl_name.substring(0, 6) == "frmFld" ? ctrl_name : id;
                        var fieldHTML = "<input name='" + _name + "' id='" + id + "' class='form-textbox validate[required]' type='text' size='30' readonly='readonly' placeholder='' />";
                        return this.wrapper(l, fieldHTML, { 'type': type ? type : "textfield", labelEdit: true });
                },
                selectField: function (id, l) {
                        var fieldHTML = "<select name='" + id + "' id='" + id + "' class='form-selectbox validate[required]' ><option value='0'>--Select value---</option></select>";
                        return this.wrapper(l, fieldHTML, { type: "selectbox", labelEdit: true });
                },
                headingField: function (txt) {
                        var iHTML = "<div class='heading'>" + txt + "</div>";
                        return this.wrapper(iHTML, false, { type: "heading", labelEdit: false });
                },
                headerField: function (txt) {
                        var iHTML = "<div class='heading'>" + txt + "</div>";
                        return this.wrapper(iHTML, false, { type: "header", labelEdit: false });
                },
                lineBreak: function () {
                        var breakHTML = "<br/>";
                        return this.wrapper(breakHTML, false, { type: "linebreak" });
                }
                ,
                horizontalRule: function () {
                        var ruleHTML = "<div class='hr'></div>";
                        return this.wrapper(ruleHTML, false, { type: "hr" });
                },
                buttonHTML: function () {
                        var btnHTML = "<button class='btn btn-large btn-info'>Submit</button>";
                        return this.wrapper(btnHTML, false, { type: "button" });
                },
                listHTML: function (id, txt, isCustom) {
                        var lstHTML = "";
                        if (isCustom) {
                                lstHTML = "<input type='checkbox' name='frmFld_" + id + "' id='" + id + "' disabled='disabled' /><span class='label'>" + txt + "</span>";
                        } else {
                                lstHTML = "<input type='checkbox' name='lists' id='" + id + "' disabled='disabled' /><span class='label'>" + txt + "</span>";
                        }

                        return this.wrapper(lstHTML, false, { type: "checkbox" });
                },
                radioHTML: function (id, txt) {
                        var lstHTML = "<input type='radio' name='" + id + "' id='" + id + "' disabled='disabled' /><span class='label'>" + txt + "</span>";
                        return this.wrapper(lstHTML, false, { type: "radio" });
                },
                capachaHTML: function () {
                        var capachaControl = "<div class='capacha'><img src='" + this.options.baseUrl + "/challenge?c=xhDfUo33Rs26Fp17Dk20Ms21Sp30xnHt' border='0'><input type='text' readonly='readonly' placeholder='' style='width:118px;margin-top:3px' / ></div>";
                        return this.wrapper(capachaControl, false, { type: "capacha" });
                },
                hiddenField: function (id, val) {
                        var hiddenHTML = "<input type='text' name='salesRep' id='" + id + "' class='hide-control' disabled='disabled' value='" + val + "' />";
                        return this.wrapper(hiddenHTML, false, { type: "hidden" });
                },
                /**
                 *
                 */
                center:function(obj){
                        //this.css("position","absolute");
                        //obj.css("top", Math.max(0, (($(window).height() - obj.outerHeight()) / 2) +$(window).scrollTop()) + "px");
                        obj.css("top","0px");
                        obj.css("left", Math.max(0, (($(window).width() - obj.outerWidth()) / 2) +
                                                                    $(window).scrollLeft()) + "px");
                        return obj;
                },
                /*===========new custom category widget============*/

                customCatComplete : function(){

                               if($.ui){
                                 $.widget("custom.catcomplete", $.ui.autocomplete, {
                                         _create: function () {
                                                 this._super();
                                                 this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
                                         },
                                         _renderMenu: function (ul, items) {
                                                 var that = this,
                                                         currentCategory = "";
                                                 $.each(items, function (index, item) {
                                                         var li;
                                                         if (item.category != currentCategory) {
                                                                 ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                                                                 currentCategory = item.category;
                                                         }
                                                         li = that._renderItemData(ul, item);
                                                         if (item.category) {
                                                                 li.attr("aria-label", item.category + " : " + item.label);
                                                         }
                                                 });
                                         }
                                 });
                               }
                              else{
                                       setTimeout(function(){loadScrips()},200)
                               }
                       }
                       /*===========new custom category widget============*/
        }




        /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


        /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
        /* FormBuilder PLUGIN DEFINITION
         * ========================= */

        $.fn.formbuilder = function (option) {
                return this.each(function () {
                        var $this = $(this)
                                , data = $this.data('formbuilder')
                                , options = typeof option == 'object' && option
                        if (!data) $this.data('formbuilder', (data = new formBuilder(this, options)))
                        if (typeof option == 'string') data[option]()
                })
        }

        $.fn.formbuilder.Constructor = formBuilder

        $.fn.formbuilder.defaults = {
                template: '',
                app: null,
                addCallBack: null,
                showCallBack: null,
                placeholder_text: '',
                tabActive: 0,
                fieldsArray: {},
                keyWordsList: [],
                mergeTags: null,
                upperHeight: 45,
                selectedField: null,
                salesforce_fields: null,
                remoteCall: null,
                formSaved: false,
                offsetLength: null,
                listoffsetLength: 0,
                formSettings: '', // Complete response from server of single form
                offset: 0,
                listoffset: 0,
                islistLiveLoading: false,
                typeToC: false,
                requestFetch: null,
                jsonFormHtml: null,
                isPluginOnly: true,
                formId: null,
                BMS_REQ_TK: '', //needs dynamic
                ukey: '35Xbbrtr', //needs dynamic
                mpageId: '',
                baseUrl: 'https://test.bridgemailsystem.com/pms', // needs to be dynamic
                isMobileLogin: 'Y',
                defaultTemplate: {},
                mMailLists:[],
                userId: 'babar',
                defaultflags:{},
                draghandler:false,
                accordionFixed:false,
                pluginType:'wordpress',
                defaultView: '[{"formname":"","fields":[{"li_id":"html_header","id":"html_header","label":"Heading","style":"","type":"header","order":1},{"li_id":"basic_email","id":"html_email","label":"Email","name":"email","required":"yes","requried_msg":"This field is required","default_value":"","hidden":"no","style":"","type":"textfield","order":2},{"li_id":"html_submit","id":"html_submit","label":"Submit","align":"","reset":"","print":"","style":"","type":"button","order":3}]}]',
        }

} (jQuery);
/*$.widget("custom.catcomplete", $.ui.autocomplete, {
 _renderMenu: function(ul, items) {
 var that = this,
 currentCategory = "";
 $.each(items, function(index, item) {
 if (item.category != currentCategory) {
 ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
 currentCategory = item.category;
 }
 that._renderItem(ul, item);
 });
 }
 });*/


jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
