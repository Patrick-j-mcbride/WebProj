document.addEventListener("DOMContentLoaded", () => {
  const downloadButtons = document.querySelectorAll(".download");
  const loadButtons = document.querySelectorAll(".load");
  const deleteButtons = document.querySelectorAll(".delete");

  downloadButtons.forEach((downloadBtn) => {
    downloadBtn.addEventListener("click", (event) => {
      const fileUrl = event.target.getAttribute("data-fileurl");
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  loadButtons.forEach((loadBtn) => {
    loadBtn.addEventListener("click", (event) => {
      const fileUrl = event.currentTarget.getAttribute("data-filename");
      console.log(fileUrl);
      window.location.href = `index.html?load=${encodeURIComponent(fileUrl)}`;
    });
  });

  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const filename = event.target.getAttribute("data-filename");

      fetch("delete.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `filename=${"uploads/" + filename}`,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
});
