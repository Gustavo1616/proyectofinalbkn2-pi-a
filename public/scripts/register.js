document.querySelector("#register").addEventListener("click", async () => {
  try {
    const data = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      Credential: "include",
    };
    const url = "/api/auth/register";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
      location.replace("/verify");
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
});