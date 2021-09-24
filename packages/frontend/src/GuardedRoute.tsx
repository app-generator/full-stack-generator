import { Route, Redirect } from "react-router-dom";

export default function GuardedRoute({
  predicate,
  redirect,
  children,
  ...rest
}: {
  [key: string]: any;
}) {
  return (
    <Route
      {...rest}
      render={() => {
        return predicate() === true ? (
          children
        ) : (
          <Redirect to={redirect || "/"} />
        );
      }}
    />
  );
}
