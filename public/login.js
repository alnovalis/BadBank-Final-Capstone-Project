function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyCaWCxpOkw6LfwYUqCsTcwNqH5rFQIO_YM",
    authDomain: "badbankauth.firebaseapp.com",
    projectId: "badbankauth",
    storageBucket: "badbankauth.appspot.com",
    messagingSenderId: "990411176555",
    appId: "1:990411176555:web:721c45f070e698d6124f2e",
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  function handle() {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    console.log("two");
    props.setStatus("");
    props.setShow(false);

    promise.catch((e) => {
      props.setStatus("Login Failure!");
    });
  }

  // function handle(){
  //   const user = ctx.users.find((user) => user.email == email);
  //   console.log(user);
  //   console.log(email, password);
  //   if (!user) {
  //     console.log('one')
  //     props.setStatus('fail!')
  //     return;
  //   }
  //   if (user.password == password) {
  //     console.log('two')
  //     props.setStatus('');
  //     props.setShow(false);
  //     return;
  //   }
  //   console.log('three')
  //   props.setStatus('fail!');
  // }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Login
      </button>
    </>
  );
}
