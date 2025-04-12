const selector = document.querySelector("#opts");
const token = localStorage.getItem("token");

const isOnline = async () => {
  try {
    const opts = {
      method: "POST",
    };
    const url = "/api/auth/online";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.response?.user?.user_id) {
      const uid = response.response.user.user_id;
      selector.innerHTML = `
          <a class="btn btn-success py-1 px-2 m-1" href="/profile/${uid}">Profile</a>
          <a class="btn btn-success py-1 px-2 m-1" href="/cart/${uid}">Cart</a>
          <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>
        `;
      document
        .querySelector("#signout")
        .addEventListener("click", async () => {
          try {
            await fetch("/api/auth/signout", {
              method: "GET",
            });
            location.replace("/");
          } catch (error) {
            console.log(error);
          }
        });
    } else {
      selector.innerHTML = `
          <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
          <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
        `;
    }
  } catch (error) {
    console.log(error);
  }
};

isOnline();