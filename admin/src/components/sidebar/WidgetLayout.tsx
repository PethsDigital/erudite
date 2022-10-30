import React from "react";
import { WidgetHeading } from "../general";

interface IWIdgetLayoutProps {
  title: string;
  View: () => JSX.Element;
}

export default function WidgetLayout({ title, View }: IWIdgetLayoutProps) {
  return (
    <div>
      <WidgetHeading title={title} />

      <View />
    </div>
  );
}
