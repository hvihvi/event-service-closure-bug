import * as React from "react";
import { EVENT_SERVICE } from "./events/eventService";

export const App = () => {
  const [val, setVal] = React.useState(0);

  React.useEffect(
    () =>
      EVENT_SERVICE.listen(event => {
        switch (event) {
          case "INCREMENT":
            setVal(val + 1);
        }
      }),
    []
  );

  return (
    <div>
      <div>{val}</div>
      <Button />
    </div>
  );
};

const Button = () => {
  return <button onClick={() => EVENT_SERVICE.event("INCREMENT")}>+</button>;
};
