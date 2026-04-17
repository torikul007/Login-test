function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      window.location.href = "dashboard.html";
    } else {
      alert("Wrong credentials");
    }
  });
}
