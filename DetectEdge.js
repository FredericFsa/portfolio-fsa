<script>
    const ua = navigator.userAgent;

    if (ua.includes("Edg/") || ua.includes("Edge/")) {
      window.location.href = "index_edge.html";
    } else {
      window.location.href = "index.html";  // ou autre version complète
    }
</script>