<?php
$uploadDirectory = 'uploads/';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['userfile'])) {
  $uploadedFile = $_FILES['userfile'];
  $destination = $uploadDirectory . basename($uploadedFile['name']);

  if (move_uploaded_file($uploadedFile['tmp_name'], $destination)) {
      header("Location: files.php");
      exit();
  } else {
      $message = "Error uploading file.";
  }
}


function listJSONFiles($dir) {
    $files = glob($dir . "*.json");
    return $files;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Files</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
      <h1>Basket Creator - Manage Files</h1>
</header>
<nav>
      <a href="index.html" class="nav-bar">Home</a>
      <a href="files.php" class="nav-bar">Files</a>
      <a href="help.html" class="nav-bar">Help</a>
</nav>

<main class="file-main">
        <h3>Upload a File</h3>
        <form action="files.php" method="post" enctype="multipart/form-data">
            <input type="file" name="userfile" id="userfile" accept=".json">
            <button type="submit">Upload</button>
        </form>

        <?php if (isset($message)) { ?>
            <p><?php echo $message; ?></p>
        <?php } ?>

        <h3>Avalible Files</h3>
        <ul class="file-list">
            <?php
            $jsonFiles = listJSONFiles($uploadDirectory);
            foreach ($jsonFiles as $file) {
              $filename = basename($file);
              echo "<div class='file-row'>";
              echo "<span class='file-name'>$filename</span>";
              echo "<button class='button download' data-fileurl='$file'>Download</button>";
              echo "<button class='button load' data-filename='$filename'>Load</button>";
              echo "<button class='button delete' data-filename='$filename'>Delete</button>";
              echo "</div>";
            }?>
        </ul>

    </main>
    <script src="files.js"></script>
</body>
</html>
