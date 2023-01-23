function AllData() {
  const [data, setData] = React.useState("");

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

  React.useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((idToken) => {
        fetch("/accounts/all", {
          method: "GET",
          headers: {
            Authorization: idToken,
          },
        })
          .then((response) => response.json())
          .then((info) => {
            console.log(info);
            setData(JSON.stringify(info));
          });
      });

    fetch("/accounts/all")
      .then((response) => response.json())
      .then((info) => {
        console.log(info);
        setData(JSON.stringify(info));
      });
  });

  return (
    <>
      <h5>All Data in Store</h5>
      {data}
      <br />
    </>
  );
}
