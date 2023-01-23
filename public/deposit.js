function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMsg setShow={setShow} />
        )
      }
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

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
    console.log(email, amount);

    firebase
      .auth()
      .currentUser.getIdToken()
      .then((idToken) => {
        fetch(`/account/update/${email}/${amount}`, {
          method: "GET",
          headers: {
            Authorization: idToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            props.setStatus("");
            props.setShow(false);
          });
      });

    fetch(`/account/update/${email}/${amount}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setStatus("");
        props.setShow(false);
      });
  }

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
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Deposit
      </button>
    </>
  );
}
