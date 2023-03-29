<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $fileName = $_GET['fileName'] ?? 'serializedData.dat';
  $data = $_GET['data'] ?? '';

  if (!empty($data)) {
    $file = fopen($fileName, 'w');
    fwrite($file, $data);
    fclose($file);

    echo 'Data saved to file: ' . $fileName;
  } else {
    echo 'No data to save';
  }
}
?>


