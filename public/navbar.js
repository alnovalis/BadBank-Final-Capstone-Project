function NavBar() {
  const ctx = React.useContext(UserContext);
  const user = ctx.user[0];
  const loginStatus = ctx.login.isLoggedIn;

  function logout() {
    alert(`User ${user.name} is logged out.`);
    ctx.user[0].name = null;
    ctx.user[0].email = null;
    ctx.user[0].password = null;
    ctx.user[0].balance = 0;
    ctx.login.isLoggedIn = false;
    // console.log(user);
    window.location.href = "#/";
  }

  function transactionWithdraw() {
    ctx.transactionType.withdraw = true;
  }

  function transactionDeposit() {
    ctx.transactionType.withdraw = false;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        BadBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {loginStatus ? (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#/account/">
                  Account
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#/deposit/"
                  onClick={transactionDeposit}
                >
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#/withdraw"
                  onClick={transactionWithdraw}
                >
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/allData/">
                  All Data
                </a>
              </li>
            </ul>
            <span className="navbar-text ml-auto">
              Welcome {user.name} &nbsp;&nbsp;
            </span>
            <button className="btn btn-outline-dark" onClick={logout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#/CreateAccount/">
                  Create Account
                </a>
              </li>
            </ul>
            <button
              className="btn btn-outline-dark ml-auto"
              onClick={() => (window.location.href = "#/login/")}
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
