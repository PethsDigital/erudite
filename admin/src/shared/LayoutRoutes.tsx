import React from "react";

export default function LayoutRoutes({
  Element,
}: {
  Element: () => JSX.Element;
}): React.ReactElement {
  return <Element />;
}
