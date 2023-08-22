import React from "react";

export default function Signup() {
  const [usernameState, setUsernameState] = React.useState<undefined | string>(
    undefined,
  );
  const [passwordState, setPasswordState] = React.useState<undefined | string>(
    undefined,
  );

  const [secondPasswordState, setSecondPasswordState] = React.useState<
    undefined | string
  >(undefined);

  const [emailState, setEmailState] = React.useState<undefined | string>(
    undefined,
  );

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsernameState(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordState(e.target.value);
  }

  function handleSecondPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSecondPasswordState(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailState(e.target.value);
  }

  function handleSignup() {
    fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameState,
        password: passwordState,
        second_password: secondPasswordState,
        email: emailState,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="mt-8 text-xl font-bold">Signup</h1>
        <form className="mt-16 flex w-[50vw] flex-col items-center justify-center gap-8">
          <div>
            <label className="mr-4" htmlFor="username">
              Username:
            </label>
            <input
              className="border-[1px] border-black p-[4px]"
              type="text"
              name="username"
              id="username"
              placeholder="Your username.."
              onChange={(e) => handleUsernameChange(e)}
              value={usernameState}
            />
          </div>
          <div>
            <label className="mr-4" htmlFor="username">
              Email:
            </label>
            <input
              className="border-[1px] border-black p-[4px]"
              type="email"
              name="email"
              id="email"
              placeholder="Your email address.."
              onChange={(e) => handleEmailChange(e)}
              value={emailState}
            />
          </div>
          <div>
            <label htmlFor="password" className="mr-4">
              Password:
            </label>
            <input
              className="border-[1px] border-black p-[4px]"
              type="password"
              name="password"
              id="password"
              placeholder="Your password.."
              onChange={(e) => handlePasswordChange(e)}
              value={passwordState}
            />
          </div>
          <div>
            <label htmlFor="second-password" className="mr-4">
              Comfirmation Password:
            </label>
            <input
              className="border-[1px] border-black p-[4px]"
              type="password"
              name="second-password"
              id="second-password"
              placeholder="Enter your password again.."
              onChange={(e) => handleSecondPasswordChange(e)}
              value={secondPasswordState}
            />
          </div>
          <input
            type="submit"
            value="Signup"
            className="rounded border-[1px] border-black bg-blue-200 p-2"
            onClick={handleSignup}
          />
        </form>
        <p className="mt-8">
          Already have an account?
          <a
            className="font-semibold text-blue-800 underline hover:relative hover:top-[1px]"
            href="/login"
          >
            Login!
          </a>
        </p>
      </div>
    </div>
  );
}
