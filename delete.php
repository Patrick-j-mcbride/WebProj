<?php
if (isset($_POST['filename'])) {
    $filename = $_POST['filename'];

    if (file_exists($filename)) {
        unlink($filename);
        echo "File deleted successfully.";
    } else {
        echo "Error: File not found.";
    }
} else {
    echo "Error: No file specified.";
}
?>
