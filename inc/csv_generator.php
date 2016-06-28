<?php
/////////////////////////////////
////// CSV Generator
////////////////////////////////
// Get cURL resource
require('config.php');
$curl = curl_init();
// Set some options - we are passing in a useragent too here
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $baseUrl.'/io/form/getSignUpFormData/?BMS_REQ_TK='.$_GET['BMS_REQ_TK'].'&userId='.$_GET['userId'].'&formId='.$_GET['formId'].'&type=getSubmissions&isMobileLogin=Y&isEmail=Y',
    CURLOPT_USERAGENT => 'Makesbridge Form Plugin Request',
));
// Send the request & save response to $resp
$resp = curl_exec($curl);
if(!$resp){
    die('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
}else{
$resp = str_replace(array( '[', ']' ), '', $resp);
$emailIDs =  explode(',', trim(str_replace(array( '"', '"' ), '', $resp)));
array_unshift($emailIDs, "EMAIL_ADDR");
//print_r($emailIDs);
wpmks_webform_generateCSV($emailIDs);
//echo $integerIDs[count($integerIDs)-1];
//echo str_replace (']', '', $integerIDs[15]);
}
// Close request to clear up some resources
curl_close($curl);

function wpmks_webform_generateCSV($emailIDs){
  header('Content-Type: application/csv');
  header('Content-Disposition: attachment; filename="contacts.csv";');
  $output = fopen('php://output', 'w');


  foreach ($emailIDs as $line)
   {
   fputcsv($output,explode(',',$line));
   }
  fclose($output);
}


?>
