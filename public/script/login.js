const loginForm = document.getElementById('login-form');

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const loginFormData = new FormData(loginForm);
  const loginPayload = Object.fromEntries(loginFormData);

  try {
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(loginPayload)
    });
    const { access_token } = await response.json();
    window.localStorage.setItem('token', access_token);
    window.location.href = '/profile';
  }
  catch(error) {
    console.log(error);
    window.location.href = '/';
  }
})