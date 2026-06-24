<?php
$data = json_decode(file_get_contents("php://input"), true);

$file = "meraki_guest_data.csv";

$fields = [
    date("c"),
    $data["base_grant_url"] ?? "",
    $data["user_continue_url"] ?? "",
    $data["node_mac"] ?? "",
    $data["client_ip"] ?? "",
    $data["client_mac"] ?? ""
];

$fileExists = file_exists($file);

$fp = fopen($file, "a");

if (!$fileExists) {
    fputcsv($fp, [
        "timestamp",
        "base_grant_url",
        "user_continue_url",
        "node_mac",
        "client_ip",
        "client_mac"
    ]);
}

fputcsv($fp, $fields);
fclose($fp);

http_response_code(200);
echo "saved";
?>
