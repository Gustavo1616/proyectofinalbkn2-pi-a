const selector = document.querySelector("#opts");


const isOnline = async () => {
  try {
    const url = "/api/auth/online";
    let response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
        `;
      return;
    }
    let parsedResponse = await response.json();
    if (parsedResponse.response && parsedResponse.response.online && parsedResponse.response.user && parsedResponse.response.user.user_id) {
      const user_id = parsedResponse.response.user.user_id;
      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/profile/${user_id}">Profile</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/cart/${user_id}">Cart</a>
        <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>
        `;
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const urlSignout = "/api/auth/signout";
          await fetch(urlSignout, { method: 'GET' });
          localStorage.removeItem("token");
          location.replace("/");
        } catch (error) {
          console.log("Error during signout:", error);
        }
      });
    } else {
      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
        `;
      }
  } catch (error) {
    console.log("Error en isOnline (catch general):", error);
    selector.innerHTML = `
      <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
      <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
      `;
    }
};

isOnline();