function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyBcEeJ4KoXHs8nirA6E_OwOop0Ybyo59ms",
    authDomain: "badbankauth-6e7a0.firebaseapp.com",
    projectId: "badbankauth-6e7a0",
    storageBucket: "badbankauth-6e7a0.appspot.com",
    messagingSenderId: "1035938640903",
    appId: "1:1035938640903:web:16e6e7f81ab72b9af866a2",
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  function handle() {
    fetch(`/account/create/${name}/${email}/${password}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);

        promise.catch(({ message }) => console.log(message));
      });

    props.setShow(false);
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
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
        Create Account
      </button>
    </>
  );
}
